# Wedding invitation production audit

Audited 23 October 2026. The public site was compared with the local Vite build; its HTML referenced the same original asset hashes. The source is a React 19 single page invitation with Tailwind, Framer Motion, a wax seal overlay, three event days, venue guide, and a Google Apps Script RSVP.

## Initial findings and priority

Ranked by guest impact and likely performance benefit:

1. **Opening paint:** A full curtain noise SVG became the mobile LCP element. Removed the paint-heavy layer; the paper CSS still supplies texture.
2. **Portrait delivery:** The below-fold portrait was an eager 1.9 MB JPEG. Replaced it with reserved-size, lazy 62/134 KB WebP sources.
3. **New couple image:** `hold_hands.jpg` was 3.9 MB. Placed an intimate, responsive 39/106 KB WebP detail below the portrait.
4. **Guest access:** The full invitation required completing the seal sequence. Added Skip animation, immediate reduced-motion access, and a no-JavaScript summary.
5. **Font dependency:** Six Google font families and many unused weights blocked rendering. Self-hosted the five used families in Latin WOFF2, with one opening font preloaded.
6. **Motion repetition:** Long, staggered section reveals and a three-second hero backdrop fade made content appear blank during scrolling. Shortened the entrance motion and reduced stagger.
7. **Editorial composition:** Timeline cards and nested venue cards repeated the same treatment. Changed these to restrained ruled sections with clearer hierarchy.
8. **Calendar clarity:** The page linked only to Google Calendar, and the ICS used a map URL as its location. Added a downloadable ICS, venue address, and muhurtham note.
9. **Share preview:** Live HTML had no `og:image`. Added a 1200 × 630 JPEG social card and image metadata for WhatsApp and other link previews.
10. **RSVP resilience and touch:** A failed RSVP showed the guest pass and hid the form. Errors now leave the form available for retry; event controls, nav items, and wear tips meet 44 px touch height.

All wedding dates, times, venue names, directions, and RSVP fields remain in place. The existing warm cream, teal, terracotta, wax, and stationery identity is preserved.

## Visual evidence

- Opening, 390 px: [before](before/390-closed.png) · [after](after/390-closed.png)
- Couple section, 390 px: [before](before/390-couple.png) · [after](after/390-couple.png) · [new hand holding detail](after/390-hands.png)
- Events, 390 px: [before](before/390-timeline.png) · [after](after/390-timeline.png)
- Venue, 390 px: [before](before/390-guide.png) · [after](after/390-guide.png)
- Desktop couple detail: [after](after/1440-hands.png)
- Opening screenshots also cover [360](after/360-closed.png), [768](after/768-closed.png), and [1440 px](after/1440-closed.png).

## Measured performance

Lighthouse 13.5 mobile simulated conditions. The baseline is the public GitHub Pages site; the final run is the local production preview, so network and server conditions differ. Scores are a directional comparison, not a controlled experiment.

- **Public baseline:** Performance 65; LCP 30.7 s; FCP 4.0 s; CLS 0; TBT 0 ms. [Raw result](before/lighthouse-live-mobile.json)
- **Local production:** Performance 83; LCP 3.75 s; FCP 2.64 s; CLS 0.08; TBT 0 ms. [Raw result](after/lighthouse-production-mobile.json)
- **Build assets:** Main JS 253 KB (80 KB gzip); Framer Motion 148 KB (49 KB gzip); CSS 53 KB (11 KB gzip). The 4.6 MB flute stays in the build, but loads only after the seal interaction.
- **Targets at the initial audit checkpoint:** CLS ≤ 0.1 met; simulated LCP ≤ 2.5 s and Lighthouse ≥ 90 were unmet. INP requires field data; a lab interaction check cannot establish its field value. A subsequent controlled optimization is documented below.

## Regression checks

The production browser test passed at 360, 390, 768, and 1440 px with no page errors or horizontal overflow. It exercised the seal, skip control, reduced motion access, no-JavaScript fallback, event and venue navigation, calendar download, required RSVP name, and a mocked successful RSVP. The RSVP test intercepted the external endpoint, so it did not send guest data.

A separate 390 px mobile Chromium pass used a WhatsApp iPhone user agent, 4× CPU throttling, and 1.6 Mbps / 150 ms network throttling. The invitation and RSVP stayed accessible, the calendar returned HTTP 200, and no page errors occurred. This emulates an in-app browser; it is not a device test inside WhatsApp. Both venue map short links redirected to the intended Google Maps places and returned HTTP 200. The new OG preview can be checked in WhatsApp only after deployment; the live site still serves the original metadata.

Run the browser checks with `PYTHONPATH=<playwright-install> python3 scripts/audit_invite.py after` and `python3 scripts/mobile_smoke.py` against a local production preview. Set `AUDIT_URL` if the preview is not at `http://127.0.0.1:4173/`.

## Focused performance follow-up

The current opening LCP element is the **“Tap to open”** text under the envelope. It has no image request; it appears after the React opening screen, its CSS, and opening fonts are available. The previous initial-load waterfall also contained below-fold images, event chunks, and several body fonts. Under Lighthouse simulated mobile conditions, those transfers and JavaScript compete with opening paint. The raw trace's element render delay is about 97 ms, while Lighthouse's throttled LCP estimate is 3.7 s; these figures come from different timing models and should not be added together.

The three highest-priority actions were:

1. Defer below-fold React sections and images until the invitation begins opening. **Implemented.** This removed the couple photos, event chunks, and related fonts from the closed-envelope load.
2. Shrink the preloaded hero backdrop. **Implemented.** A visually checked WebP reduced it from 237 KB to 145 KB while preserving the original opening artwork.
3. Further split the opening animation's JavaScript if the first two changes were insufficient. **Held.** The target was reached without altering the ceremonial animation or adding code complexity.

Three baseline and three optimized runs used the same Lighthouse 13.5 command, local production preview, mobile form factor, and simulated throttling. [Raw runs](final-performance/).

- **Baseline:** scores 86 / 86 / 86; LCP 3.75 / 3.75 / 3.68 s; median 3.75 s; CLS 0.080.
- **Optimized:** scores 94 / 95 / 95; LCP 2.48 / 2.48 / 2.48 s; median 2.48 s; CLS 0.080.
- **Initial load:** 26 requests and about 939 KB in the baseline run; 12 requests and about 360 KB in the optimized run.

The optimized production browser pass passed at 360, 390, 768, and 1440 px, with no horizontal overflow or page errors. It checked the seal, skip, reduced motion, no-JavaScript fallback, venue and calendar links, required RSVP fields, and a mocked successful RSVP. The production HTTP server returned 200 for the calendar, social image, preloaded font, and built JS/CSS URLs. [Final screenshots and browser report](final/). A real WhatsApp preview and live Core Web Vitals remain to be checked after deployment.
