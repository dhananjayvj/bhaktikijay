/** Sentence case — RSVP, calendar copy, secondary UI */
import { IS_COLLEAGUE_INVITE } from './audience.js'

export const WEDDING_DATE_LINE =
  IS_COLLEAGUE_INVITE
    ? 'Wedding & reception · Sunday, 14 March 2027 · Muhurtham 8:48 AM'
    : 'Celebrations 11, 13 & 14 March 2027 · Muhurtham Sunday, March 14, 8:48 AM'

/** Multi-day headline — all caps */
export const WEDDING_DATE_HEADLINE = 'SUNDAY, MARCH 14, 2027 · 8:48 AM'

/** Ceremony day (Hero) — short and specific */
export const CEREMONY_DATE_LINE = 'Sunday, March 14, 2027'

/** Ceremony day (Hero) — all caps */
export const CEREMONY_DATE_HEADLINE = 'SUNDAY, MARCH 14, 2027'
