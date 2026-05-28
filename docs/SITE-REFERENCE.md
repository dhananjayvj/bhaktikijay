# Bhakti & Dhananjay — Wedding Site Reference

Complete rebuild reference: stack, structure, content, components, deployment, and integrations.

**Live site:** [https://bhakti-dhananjay.life/](https://bhakti-dhananjay.life/)  
**Repository:** [https://github.com/dhananjayvj/bhaktikijay](https://github.com/dhananjayvj/bhaktikijay)

---

## 1. Tech stack

| Layer | Technology | Version (approx.) |
|-------|------------|-------------------|
| Runtime | Node.js | 24 (CI) |
| Bundler | Vite | 8.x |
| UI | React | 19.x |
| Animation | Framer Motion | 12.x |
| Styling | Tailwind CSS | 3.4.x |
| CSS processing | PostCSS + Autoprefixer | — |
| Language | JavaScript (ES modules) | `"type": "module"` |
| Hosting | GitHub Pages | `gh-pages` branch from `dist/` |
| RSVP backend | Google Apps Script Web App → Google Sheets | see `docs/rsvp-google-sheets.md` |

**Not used:** Next.js, React Router, Redux, CSS-in-JS libraries, backend server (static SPA only).

---

## 2. NPM scripts

```bash
npm install          # install dependencies
npm run dev          # local dev → http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview dist on port 4173
npm run lint         # eslint
```

---

## 3. Project structure

```
bhaktikijay/
├── index.html                 # shell, meta, Google Fonts
├── vite.config.js             # React plugin, framer-motion chunk split
├── tailwind.config.js         # colors, fonts
├── postcss.config.js
├── calendar.ics               # downloadable / linkable ICS (root)
├── CNAME                      # GitHub Pages custom domain
├── package.json
├── .github/workflows/
│   └── deploy-pages.yml       # build → push dist to gh-pages
├── public/
│   ├── CNAME                  # copied to dist on build
│   ├── favicon.svg
│   ├── doodle-pattern-light.svg
│   └── doodle-pattern-rsvp.svg
├── images/                    # Vite-imported assets (hashed in build)
│   ├── backdrop.jpeg          # Hero parchment photo wash
│   ├── bhakti-dhananjay.jpg   # Couple portrait section
│   └── flute.mp3              # ambient loop after reveal
├── docs/
│   ├── SITE-REFERENCE.md      # this file
│   └── rsvp-google-sheets.md  # Apps Script setup
└── src/
    ├── main.jsx               # React mount + legacy DOM cleanup
    ├── App.jsx                # layout, overlay, sparkles, audio, lazy sections
    ├── index.css              # Tailwind + custom layers
    ├── constants/
    │   ├── inviteCopy.js      # invitation text
    │   ├── wedding.js         # date headlines / RSVP line
    │   └── revealMotion.js    # curtain duration + easing
    ├── utils/
    │   └── sealFeedback.js    # haptic/audio on wax seal break
    └── components/            # see §6
```

---

## 4. Site content & data

### 4.1 Couple & branding

| Field | Value |
|-------|--------|
| Names | Bhakti & Dhananjay |
| Hashtag | **JayKiBhakti** (invite pill, RSVP admission card, footer) |
| Domain | `bhakti-dhananjay.life` (`CNAME` + `public/CNAME`) |

### 4.2 Invitation copy (`src/constants/inviteCopy.js`)

| Constant | Text |
|----------|------|
| `INVITE_HEADER` | Shri Neera Narasimha Prasanna |
| `INVITE_OPENING_VERSE` | Blessed by grace and family love, we are stepping into our new life together. Please join us to share our joy and witness the union that was always meant to be. |
| `INVITE_CELEBRATION` | Please join us for love, laughter, and tradition / as we celebrate our new beginning |
| `COUNTDOWN_INTRO` | The celebration begins in... |
| `BHAKTI_PARENT_LINE` | Daughter of Medini and Manoj Tolmatti |
| `DHANANJAY_PARENT_LINE` | Son of Pratibha and Vinod Jahagirdar |

### 4.3 Dates (`src/constants/wedding.js`)

| Constant | Value |
|----------|--------|
| `WEDDING_DATE_LINE` | Celebrations Mar 11–14, 2027 · Muhurtham Sunday, March 14, 8:48 AM |
| `WEDDING_DATE_HEADLINE` | SUNDAY, MARCH 14, 2027 — 8:48 AM |
| `CEREMONY_DATE_LINE` | Sunday, March 14, 2027 |
| `CEREMONY_DATE_HEADLINE` | SUNDAY, MARCH 14, 2027 |

**Countdown target (Hero + mirror):** `2027-03-14T08:48:00+05:30` (IST)

### 4.4 Celebration timeline (`src/components/Timeline.jsx`)

Events are defined in the `events` `useMemo` array. Each event object:

| Field | Purpose |
|-------|---------|
| `dayPill` | Date + weekday badge |
| `title` | Event name |
| `icon` | `haldi` \| `mehendi` \| `sangeet` \| `baraat` \| `mandap` \| `reception` |
| `time` | Display time |
| `subtitle` | Short description |
| `mapsHref` | Google Maps short link for pin |
| `pinLabel` | Small label under pin |
| `burst` | Sparkle symbols on hover/click |

| Order | dayPill | Event | Time | pinLabel | Maps |
|-------|---------|-------|------|----------|------|
| 1 | Mar 11 · Thursday | Haldi | 3:30 PM | PLR Clubhouse | Prestige Lake Ridge |
| 2 | Mar 11 · Thursday | Mehendi | 5:30 PM | PLR Clubhouse | Prestige Lake Ridge |
| 3 | Mar 13 · Saturday | Sangeet | 2:00 PM | SDM convention hall | Kalyana Mantapa |
| 4 | Mar 13 · Saturday | Baraat | 5:00 PM | SDM convention hall | Kalyana Mantapa |
| 5 | Mar 14 · Sunday | Muhurtham | 8:48 AM | SDM convention hall | Kalyana Mantapa |
| 6 | Mar 14 · Sunday | Reception | 12:30 PM | SDM convention hall | Kalyana Mantapa |

**Map URLs**

- **SDM / Kalyana Mantapa:** `https://maps.app.goo.gl/p7yrs8a2dHogMKHp9`
- **Prestige Lake Ridge clubhouse (Haldi / Mehendi):** `https://maps.app.goo.gl/vyDCL9iZnM9jVQpb9`

**Venue address (main wedding):** Sri Dharmastala Manjunatha Swamy Kalyana Mantapa · Bull Temple Road · Basavanagudi · Bengaluru

### 4.5 Venue pro-tip (`src/components/Venue.jsx`)

> Bull Temple Road is easy by auto, cab, or private car. Nearest metro is National College/LalBagh on the Green Line, about 2 km from the hall and roughly 15 to 20 minutes by road in normal traffic. Sundays and peak evenings need extra time. Parking is limited, so come a bit early if you drive.

### 4.6 Couple message (`src/components/CouplePortrait.jsx`)

> We are truly overjoyed to share this milestone with the people who have shaped our lives. The warmth and blessings we have received from each of you have been deeply moving and have touched us both beyond words. As we prepare for this new beginning, we want to thank you most sincerely for your kindness and support. We are so looking forward to celebrating this day with you

### 4.7 Footer (`src/components/Footer.jsx`)

- Closing: *With love, blessings, and joyful anticipation.*
- Hashtag pill: `#JayKiBhakti`
- Gear joke about building the site
- *Made with ♥️*

### 4.8 RSVP (`src/components/RSVP.jsx`)

| Setting | Value |
|---------|--------|
| Section id | `#rsvp` |
| Respond-by date | January 15, 2027 |
| Admission hashtag | JayKiBhakti |
| Closing line on card | See you soon! |
| Selectable events | Mehendi, Haldi, Baraat, Sangeet, Muhurtham, Reception |

**Default endpoint (overridable via env):**

```
https://script.google.com/macros/s/AKfycbyFeYqxfN2JYEZGtwizjTIBNbwE8KDbkn7OQJYmxJMkzB1_g0RgVseq8DrOt80WOjk2/exec
```

**Environment variable:** `VITE_RSVP_ENDPOINT` — set at build time (e.g. GitHub Actions secret or `.env`).

**POST payload (JSON):**

```json
{
  "submittedAt": "ISO-8601 string",
  "name": "string",
  "guests": "1" | "2" | ...,
  "guestNames": "string",
  "events": ["Haldi", "Muhurtham", ...],
  "eventTags": "comma-separated string",
  "message": "string",
  "userAgent": "string"
}
```

Submission uses `navigator.sendBeacon` when available, else `fetch` with `mode: 'no-cors'`.

### 4.9 Calendar

**`calendar.ics` (root)**

- All-day: `DTSTART` 20270314, `DTEND` 20270315
- `SUMMARY`: Bhakti & Dhananjay — Wedding, March 14, 2027
- `DESCRIPTION` / `LOCATION`: maps short link only

**Google Calendar template (Venue “Add to Calendar”)**

- `text`: Bhakti & Dhananjay — Wedding, March 14, 2027
- `dates`: `20270314/20270315`
- `details` + `location`: `https://maps.app.goo.gl/p7yrs8a2dHogMKHp9`

### 4.10 HTML meta (`index.html`)

| Meta | Content |
|------|---------|
| Title | Bhakti & Dhananjay \| Mar 2027 |
| Description | Festivities Mar 11–14, 2027; muhurtham Sunday, March 14, 8:48 AM, Bengaluru |
| `og:url` | https://bhakti-dhananjay.life/ |

---

## 5. Design system

### 5.1 Tailwind colors (`tailwind.config.js`)

| Token | Hex | Usage |
|-------|-----|--------|
| `terra` | `#E2725B` | CTAs, accents, RSVP section |
| `cream` | `#FCF9F1` | Page background |
| `gold` | `#D4AF37` | Borders, dividers |
| `gold-light` | `#F0D060` | — |
| `gold-dark` | `#A8861A` | — |
| `brown` | `#3B1F0A` | Footer background |
| `invite-night` | `#0c0e14` | Overlay curtains |
| `invite-paper` | `#faf7f2` | Hero parchment |
| `invite-wine` | `#7a2e3f` | Invitation typography |
| `invite-mauve` | `#8b6b7a` | Ampersand script |
| `invite-blush` | `#e9d8dd` | RSVP card gradient |

### 5.2 Fonts (Google Fonts in `index.html`)

| Tailwind class | Family |
|----------------|--------|
| `font-playfair` | Playfair Display |
| `font-cormorant` | Cormorant Garamond |
| `font-cinzel` | Cinzel Decorative |
| `font-lato` | Lato |
| `font-script` | Great Vibes |
| `font-hand` | Caveat |

(Pinyon Script is loaded but rarely used in components.)

### 5.3 Custom CSS classes (`src/index.css`)

| Class | Purpose |
|-------|---------|
| `.viewport-fill` | Stable mobile viewport height |
| `.curtain-3d-panel` | 3D curtain panels in overlay |
| `.defer-heavy-section` | `content-visibility: auto` for scroll perf |
| `.wax-monogram-shimmer` | Idle shimmer on wax seal |
| `.paper-parchment` | Grain/linen texture on invite card |

### 5.4 Sparkle interaction (`App.jsx`)

- Click on main card (when overlay closed) spawns 5 particles: `✦`, `✧`, `✸` in gold/terra
- Ignored on `a`, `button`, `input`, `[data-no-sparkle="true"]`

---

## 6. Components catalog

### 6.1 Page flow (mounted in `App.jsx`)

```
App
├── Overlay (until dismissed)
│   ├── WeddingDoodles + outside doodle background
│   ├── Curtains + wax seal
│   ├── Full-screen Ganesh layer (beige paper) revealed by curtains
│   └── 3-step handoff: Ganesh fades out → Hero fades in → overlay closes
├── Scroll progress bar (Framer useScroll)
└── mainCardRef
    ├── Hero (#invitation)
    ├── CouplePortrait (#couple)
    ├── Timeline (#timeline)        [lazy]
    ├── Venue (#venue)              [lazy]
    ├── RSVP (#rsvp)                [lazy]
    ├── Footer                      [lazy]
    └── Sparkle particles (absolute)
```

### 6.2 Component reference

| File | Role | Key dependencies |
|------|------|------------------|
| **App.jsx** | Root state: overlay, 3-step reveal gating, sparkles, flute audio | Overlay, Hero, AmbientFlute |
| **Overlay.jsx** | Curtain intro; wax seal; reveals Ganesh (beige paper) then fades out for Hero | revealMotion, Ganesh.jpeg, sealFeedback |
| **Hero.jsx** | Main invitation after reveal; backdrop fade; delayed text mount for perf | InviteHeroCopy, Countdown, backdrop.jpeg |
| **InviteHeroCopy.jsx** | Shared invite markup (Hero copy) | inviteCopy, Countdown |
| **CouplePortrait.jsx** | Message + couple photo | bhakti-dhananjay.jpg |
| **Timeline.jsx** | Vertical timeline, alternating cards on md+, event icons, map pins | EventIcons, MandapArchIcon, framer-motion |
| **Venue.jsx** | Pro-tip, address card, Maps + Google Calendar CTAs | framer-motion |
| **RSVP.jsx** | Form, event checkboxes, admission card, Sheets POST | ParticleCanvas, wedding constants |
| **Footer.jsx** | Kolam SVG, hashtag, joke | framer-motion |
| **Countdown.jsx** | Days/hours/minutes/seconds to `targetIso` | framer-motion digit animation |
| **KolamWaveDivider.jsx** | Decorative wave/kolam under header | SVG + motion |
| **Toast.jsx** | Ephemeral message (Hero copy actions if wired) | framer-motion |
| **ParticleCanvas.jsx** | Canvas burst on RSVP submit | canvas API |
| **WeddingDoodles.jsx** | Floating SVG doodles on overlay | motion |
| **EventIcons.jsx** | Haldi, Mehendi, Sangeet, Baraat, Reception SVG icons | — |
| **MandapArchIcon.jsx** | Mandap arch for Muhurtham | — |

---

## 7. Key behaviors & timings

### 7.1 Overlay reveal (`Overlay.jsx`)

| Constant | Location | Value |
|----------|----------|--------|
| `CURTAIN_DURATION` | `revealMotion.js` | 1.15s |
| Curtain easing | `revealMotion.js` | `[0.4, 0, 0.2, 1]` |

**3-step flow (luxury stationery handoff):**

1. User taps seal (“Tap to open”).
2. Curtains open to reveal **Ganesh** on full-screen beige paper (`bg-[#F4E8DB]`).
3. After curtains fully open, wait **300ms**, then fade out the Ganesh/beige layer.
4. While Ganesh fades out, the Hero section fades in.
5. After the fade completes, the overlay closes.

### 7.2 Hero backdrop (`Hero.jsx`)

| Constant | Value |
|----------|--------|
| `BACKDROP_MOUNT_DELAY_MS` | 50ms after `inviteRevealed` |
| `BACKDROP_FADE_SEC` | 3s opacity 0 → 0.34 |
| Image | `images/backdrop.jpeg` |

### 7.3 Audio (`App.jsx`)

- Starts when `heroReveal` becomes true (once per session)
- File: `images/flute.mp3`, loop, volume `0.28`
- Autoplay may be blocked until user interaction (seal break counts)

### 7.4 Timeline UX

- **Mobile:** Title + subtitle stack; time + pin + label in row below with top border
- **md+:** Side-by-side columns; timeline rail centered; cards alternate left/right
- Pin: emoji link under time; `data-no-sparkle` prevents card sparkle burst

---

## 8. Build & deployment

### 8.1 Local development

```bash
git clone https://github.com/dhananjayvj/bhaktikijay.git
cd bhaktikijay
npm install
npm run dev
```

### 8.2 Production build

```bash
npm run build
# Output: dist/ with hashed assets under dist/assets/
```

`vite.config.js` splits `framer-motion` into its own chunk for caching.

### 8.3 GitHub Pages

Every **push to `main`** runs `.github/workflows/deploy-pages.yml` and republishes the live site (no manual deploy step).

1. Workflow: `npm ci` → `npm run build` → verify `dist/index.html` loads hashed `/assets/*.js`
2. Uploads `dist/` as a Pages artifact (`actions/upload-pages-artifact@v4`)
3. Deploys via `actions/deploy-pages@v4` (official GitHub Pages)
4. **Pages settings (one-time):** Settings → Pages → **Source: GitHub Actions**
5. Custom domain: `bhakti-dhananjay.life` via `public/CNAME` → `dist/CNAME`
6. Check **Actions** tab for `Deploy site to GitHub Pages` after each push to `main`

### 8.4 Optional: RSVP endpoint at build time

Create `.env` (not committed if in `.gitignore`):

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Rebuild so Vite inlines the value.

---

## 9. Rebuild checklist

Use this order to recreate the site from scratch:

1. **Scaffold:** `npm create vite@latest` → React + JS; add Tailwind, Framer Motion, `@vitejs/plugin-react`.
2. **Copy design tokens** from `tailwind.config.js` and fonts from `index.html`.
3. **Add constants:** `src/constants/inviteCopy.js`, `src/constants/wedding.js` (§4).
4. **Add assets:** `images/backdrop.jpeg`, `bhakti-dhananjay.jpg`, `flute.mp3`; `public/favicon.svg`, doodle SVGs.
5. **Implement sections** in order: Overlay → Hero (+ mirror) → CouplePortrait → Timeline → Venue → RSVP → Footer.
6. **Wire App.jsx:** overlay state, `heroReveal`, lazy imports, sparkles, scroll bar, audio.
7. **RSVP:** Apps Script per `docs/rsvp-google-sheets.md`; set `VITE_RSVP_ENDPOINT`.
8. **Calendar:** `calendar.ics` + Venue Google template URLs (§4.9).
9. **Deploy:** GitHub Actions workflow + `CNAME` + Pages config (§8).
10. **Verify:** production `index.html` loads `/assets/*.js`, not `/src/main.jsx`.

---

## 10. Section anchors (deep links)

| id | Section |
|----|---------|
| `#invitation` | Hero |
| `#couple` | Couple portrait |
| `#timeline` | Celebration timeline |
| `#venue` | Venue & logistics |
| `#rsvp` | RSVP form |

---

## 11. Related documentation

- **RSVP / Google Sheets:** `docs/rsvp-google-sheets.md` (Apps Script, sheet ID, CORS notes)

---

*Last aligned with repository `main` branch content: Mar 2027 wedding, JayKiBhakti hashtag, dual-venue timeline pins, single-day calendar for March 14.*
