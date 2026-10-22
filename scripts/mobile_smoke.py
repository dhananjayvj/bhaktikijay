"""Exercise the production invite with a constrained WhatsApp-like mobile context."""
import json
import os
from playwright.sync_api import sync_playwright

url = os.environ.get('AUDIT_URL', 'http://127.0.0.1:4173/')
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args=['--no-sandbox'])
    context = browser.new_context(
        viewport={'width': 390, 'height': 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WhatsApp/2.24.0',
    )
    page = context.new_page()
    cdp = context.new_cdp_session(page)
    cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})
    cdp.send('Network.enable')
    cdp.send('Network.emulateNetworkConditions', {'offline': False, 'latency': 150, 'downloadThroughput': 200000, 'uploadThroughput': 90000})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(url + '?source=whatsapp', wait_until='networkidle')
    page.get_by_role('button', name='Skip animation').click()
    page.locator('#rsvp').scroll_into_view_if_needed()
    calendar = context.request.get(url + 'calendar.ics')
    result = {
        'invite_visible': page.locator('#invitation h1').count() > 0,
        'rsvp_visible': page.locator('#rsvp').count() > 0,
        'horizontal_overflow_px': page.evaluate('document.documentElement.scrollWidth - innerWidth'),
        'calendar_status': calendar.status,
        'calendar_contains_muhurtham': '8:48 AM' in calendar.text(),
        'page_errors': errors,
        'profile': '390px mobile Chromium, WhatsApp iPhone user agent, 4x CPU, 1.6 Mbps / 150 ms network',
    }
    print(json.dumps(result, indent=2))
    context.close()
    browser.close()
