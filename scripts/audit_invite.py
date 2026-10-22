"""Capture local invitation screenshots and basic interaction/performance checks."""
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

PHASE = sys.argv[1] if len(sys.argv) > 1 else "before"
URL = os.environ.get("AUDIT_URL", "http://127.0.0.1:5173/")
OUT = Path("docs/audit") / PHASE
OUT.mkdir(parents=True, exist_ok=True)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path=CHROME, args=["--no-sandbox"])
    report = {"phase": PHASE, "screens": {}, "checks": {}}
    for width in (360, 390, 768, 1440):
        page = browser.new_page(viewport={"width": width, "height": 850}, device_scale_factor=1)
        page.add_init_script("""(() => {
          window.__vitals = {lcp: 0, cls: 0, inp: 0};
          new PerformanceObserver(list => list.getEntries().forEach(e => window.__vitals.lcp = e.startTime)).observe({type:'largest-contentful-paint', buffered:true});
          new PerformanceObserver(list => list.getEntries().forEach(e => {if (!e.hadRecentInput) window.__vitals.cls += e.value})).observe({type:'layout-shift', buffered:true});
          try {new PerformanceObserver(list => list.getEntries().forEach(e => window.__vitals.inp = Math.max(window.__vitals.inp, e.duration))).observe({type:'event', buffered:true, durationThreshold:16})} catch {}
        })()""")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(URL, wait_until="networkidle")
        page.screenshot(path=str(OUT / f"{width}-closed.png"), full_page=False)
        page.get_by_role("button", name="Tap to open the invitation").click()
        page.wait_for_timeout(2500)
        page.screenshot(path=str(OUT / f"{width}-open.png"), full_page=True)
        if width in (390, 1440):
            for section in ("couple", "timeline", "guide", "rsvp"):
                page.locator(f"#{section}").scroll_into_view_if_needed()
                page.wait_for_timeout(900)
                page.screenshot(path=str(OUT / f"{width}-{section}.png"))
            page.locator('#couple figure').last.scroll_into_view_if_needed()
            page.wait_for_timeout(650)
            page.screenshot(path=str(OUT / f"{width}-hands.png"))
        data = page.evaluate("""() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          bodyText: document.body.innerText.slice(0, 350),
          navigation: performance.getEntriesByType('navigation')[0]?.toJSON(),
          resources: performance.getEntriesByType('resource').map(r => ({name:r.name.split('/').pop(), bytes:r.transferSize, duration:r.duration})),
          links: [...document.querySelectorAll('a')].map(a => ({text:a.innerText.trim(), href:a.href}))
          ,vitals: window.__vitals
        })""")
        report["screens"][str(width)] = {"status": response.status if response else None, "overflow": data["width"] - data["viewport"], "errors": errors, "data": data}
        if width == 390:
            report["checks"]["opened"] = page.locator("#timeline").count() > 0 and page.locator(".overlay-envelope-lock").count() == 0
            report["checks"]["rsvp"] = page.locator("#rsvp").count() > 0
            report["checks"]["calendar_download"] = page.get_by_role("link", name="Download calendar file").get_attribute("href") == "/calendar.ics"
            report["checks"]["venue_links"] = page.locator('a[href^="https://maps.app.goo.gl/"]').count() >= 4
            page.locator("#rsvp").scroll_into_view_if_needed()
            page.get_by_role("button", name="Submit RSVP").click()
            report["checks"]["rsvp_required_name"] = not page.locator("#rsvp-name").evaluate("e => e.validity.valid")
            page.route('https://script.google.com/**', lambda route: route.fulfill(status=204, body=''))
            page.locator('#rsvp-name').fill('Test Guest')
            page.get_by_role("button", name="Haldi & Mehendi").click()
            page.get_by_role("button", name="Submit RSVP").click()
            page.get_by_text('Submitted.', exact=True).wait_for(timeout=5000)
            report["checks"]["rsvp_mock_success"] = page.get_by_text('Test Guest', exact=True).count() > 0
        page.close()
    skipped = browser.new_page()
    skipped.goto(URL, wait_until='networkidle')
    skipped.get_by_role('button', name='Skip animation').click()
    report['checks']['skip_animation'] = skipped.locator('.overlay-envelope-lock').count() == 0 and skipped.locator('#invitation h1').count() > 0
    skipped.close()
    reduced = browser.new_page(reduced_motion='reduce')
    reduced.goto(URL, wait_until='networkidle')
    report['checks']['reduced_motion_access'] = reduced.locator('.overlay-envelope-lock').count() == 0 and reduced.locator('#invitation').count() == 1
    reduced.close()
    no_js = browser.new_page(java_script_enabled=False)
    no_js.goto(URL, wait_until='domcontentloaded')
    report['checks']['no_js_details'] = '8:48 AM' in no_js.locator('body').inner_text()
    no_js.close()
    browser.close()
    (OUT / "report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps({"phase": PHASE, "screens": {k: {"status": v["status"], "overflow": v["overflow"], "errors": v["errors"]} for k,v in report["screens"].items()}, "checks": report["checks"]}, indent=2))
