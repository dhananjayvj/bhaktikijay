## Secure RSVP collection into Google Sheets

You shared a sheet that is currently “anyone with the link can edit”. Do **not** keep it that way for RSVPs.

### Why we can’t “hide the sheet link” on a public website

- Any value the browser needs (sheet link, endpoint URL, keys) can be seen via DevTools / “Inspect Element” / Network tab.
- So **hiding** the link isn’t a security feature.
- The secure pattern is: **site → server endpoint → private sheet**.

This project already supports posting RSVPs to an endpoint via `VITE_RSVP_ENDPOINT`.

### Recommended setup (Google Apps Script Web App)

1. Open your Google Sheet: `https://docs.google.com/spreadsheets/d/1ZpPIUYJr7cU0FtEU9zlfbCAMXaTwr3AzsHMcfJnEysI/edit?usp=sharing`
2. In the sheet, go to **Extensions → Apps Script**.
3. Paste the script below into `Code.gs`, replacing any existing content.
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL and set it as `VITE_RSVP_ENDPOINT`.

### Your deployed Web App URL

Use this as the value for `VITE_RSVP_ENDPOINT`:

`https://script.google.com/macros/s/AKfycbyFeYqxfN2JYEZGtwizjTIBNbwE8KDbkn7OQJYmxJMkzB1_g0RgVseq8DrOt80WOjk2/exec`

### Apps Script (`Code.gs`)

```javascript
const SHEET_ID = '1ZpPIUYJr7cU0FtEU9zlfbCAMXaTwr3AzsHMcfJnEysI'
const TAB_NAME = 'Sheet1'

function ensureHeader_(sheet) {
  const header = [
    'submittedAt',
    'name',
    'guests',
    'guestNames',
    'events',
    'eventTags',
    'message',
    'userAgent',
  ]
  const firstRow = sheet.getRange(1, 1, 1, header.length).getValues()[0]
  const isEmpty = firstRow.every((v) => String(v || '').trim() === '')
  if (isEmpty) sheet.getRange(1, 1, 1, header.length).setValues([header])
  return header
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function doGet() {
  return json_({ ok: true, message: 'RSVP endpoint is running. Use POST to submit.' })
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : '{}'
    const data = JSON.parse(body)

    const ss = SpreadsheetApp.openById(SHEET_ID)
    const sheet = ss.getSheetByName(TAB_NAME) || ss.insertSheet(TAB_NAME)
    const header = ensureHeader_(sheet)

    const row = [
      data.submittedAt || new Date().toISOString(),
      (data.name || '').toString(),
      (data.guests || '').toString(),
      (data.guestNames || '').toString(),
      Array.isArray(data.events) ? data.events.join(', ') : (data.events || '').toString(),
      (data.eventTags || '').toString(),
      (data.message || '').toString(),
      (data.userAgent || '').toString(),
    ]

    sheet.appendRow(row)

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: (err && err.message) || String(err) })
  }
}
```

### Local configuration

Create `.env.local` (do **not** commit it) with:

```bash
VITE_RSVP_ENDPOINT="https://script.google.com/macros/s/AKfycbyFeYqxfN2JYEZGtwizjTIBNbwE8KDbkn7OQJYmxJMkzB1_g0RgVseq8DrOt80WOjk2/exec"
```

Then run:

```bash
npm run dev
```

### Production (GitHub Pages)

GitHub Pages is static — it can’t keep secrets. Your Apps Script endpoint can still be used, but:

- The endpoint URL will be visible to visitors (that’s fine).
- To reduce spam, we can add an **anti-spam token** and validate it in Apps Script (ask if you want this).
