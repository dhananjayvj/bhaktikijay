const SHEET_ID = '1ZpPIUYJr7cU0FtEU9zlfbCAMXaTwr3AzsHMcfJnEysI'
const TAB_NAME = 'Sheet1'

const RSVP_COLUMNS = [
  'submittedAt',
  'name',
  'guests',
  'guestNames',
  'events',
  'eventTags',
  'message',
  'songRequest',
  'userAgent',
]

function ensureHeader_(sheet) {
  const width = Math.max(sheet.getLastColumn(), RSVP_COLUMNS.length)
  const existing =
    width > 0
      ? sheet
          .getRange(1, 1, 1, width)
          .getValues()[0]
          .map((v) => String(v || '').trim())
      : []

  const isEmpty = existing.length === 0 || existing.every((v) => v === '')

  if (isEmpty) {
    sheet.getRange(1, 1, 1, RSVP_COLUMNS.length).setValues([RSVP_COLUMNS])
    return RSVP_COLUMNS.slice()
  }

  const header = existing.filter(Boolean)
  let changed = false

  RSVP_COLUMNS.forEach((column) => {
    if (!header.includes(column)) {
      header.push(column)
      changed = true
    }
  })

  if (changed) {
    sheet.getRange(1, 1, 1, header.length).setValues([header])
  }

  return header
}

function rowFromPayload_(data, header) {
  const values = {
    submittedAt: data.submittedAt || new Date().toISOString(),
    name: (data.name || '').toString(),
    guests: (data.guests || '').toString(),
    guestNames: (data.guestNames || '').toString(),
    events: Array.isArray(data.events) ? data.events.join(', ') : (data.events || '').toString(),
    eventTags: (data.eventTags || '').toString(),
    message: (data.message || '').toString(),
    songRequest: (data.songRequest || '').toString(),
    userAgent: (data.userAgent || '').toString(),
  }

  return header.map((column) => values[column] ?? '')
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
    const row = rowFromPayload_(data, header)

    sheet.appendRow(row)

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: (err && err.message) || String(err) })
  }
}
