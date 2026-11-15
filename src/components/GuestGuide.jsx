import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'
import { GUEST_GUIDE } from '../constants/siteContent.js'
import { COUNTDOWN_INTRO } from '../constants/inviteCopy.js'
import { springGentle } from '../constants/motion.js'
import Countdown from './Countdown.jsx'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MARCH_2027_DAYS = Array.from({ length: 31 }, (_, index) => index + 1)
const MAP_PREVIEW_URL = `https://www.google.com/maps?q=${encodeURIComponent('Sri Dharmastala Manjunatha Swamy Kalyana Mantapa, Bull Temple Road, Basavanagudi, Bengaluru')}&z=16&output=embed`

function WeddingCalendar() {
  return (
    <div className="guide-calendar" aria-label="March 2027 calendar">
      <p className="meta-stationery">The wedding month</p>
      <h3 className="guide-calendar-title">March <span>2027</span></h3>
      <ol className="guide-calendar-grid" aria-label="March 2027 dates">
        {WEEKDAYS.map((day, index) => (
          <li key={`weekday-${index}`} className="guide-calendar-weekday" aria-hidden="true">{day}</li>
        ))}
        <li aria-hidden="true" />
        {MARCH_2027_DAYS.map((day) => (
          <li key={day} className={day === 14 ? 'guide-calendar-day guide-calendar-day--wedding' : 'guide-calendar-day'}>
            <time dateTime={`2027-03-${String(day).padStart(2, '0')}`} aria-label={day === 14 ? 'Wedding day, Sunday 14 March 2027' : undefined}>{day}</time>
            {day === 14 && (
              <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <path d="M22 39C16.8 35.1 5 27 5 17.2 5 11.4 9.2 7 15 7c3.2 0 5.8 1.7 7 4.1C23.2 8.7 25.8 7 29 7c5.8 0 10 4.4 10 10.2C39 27 27.2 35.1 22 39Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <p className="guide-calendar-caption">14 March · Our wedding day</p>
      <Countdown dense heroReadable className="calendar-countdown" intro={COUNTDOWN_INTRO} targetIso="2027-03-14T08:48:00+05:30" />
    </div>
  )
}

function GuideCTA({ href, children, variant }) {
  const className =
    variant === 'filled'
      ? 'bg-terra text-cream border border-terra shadow-md'
      : 'bg-transparent text-stone-900 border border-gold/70'

  return (
    <motion.a
      data-no-sparkle="true"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={springGentle}
      className={[
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-8 py-4 font-lato text-sm font-semibold',
        className,
      ].join(' ')}
    >
      {children}
    </motion.a>
  )
}

function GuestGuide() {
  const calendarHref = useMemo(() => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: GUEST_GUIDE.calendar.text,
      dates: GUEST_GUIDE.calendar.dates,
      details: GUEST_GUIDE.mapsHref,
      location: `${GUEST_GUIDE.venueName}, ${GUEST_GUIDE.venueAddress.replaceAll(' · ', ', ')}`,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [])

  return (
    <SectionReveal
      id="guide"
      className="relative overflow-hidden border-t border-border px-4 py-16 md:px-10 md:py-20"
    >
      <SectionDoodleBackdrop variant="mint" />
      <div className="mx-auto max-w-5xl relative z-[1]">
        <RevealItem>
          <motion.article className="guest-guide-editorial p-5 md:p-8">
            <div className="text-center">
              <p className="section-eyebrow">{GUEST_GUIDE.eyebrow}</p>
              <h2 className="section-display mt-2">{GUEST_GUIDE.title}</h2>
            </div>

            <div className="mt-8 text-center">
              <h3 className="guide-venue-name">{GUEST_GUIDE.venueName}</h3>
              <p className="guide-venue-address">{GUEST_GUIDE.venueAddress}</p>
            </div>

            <div className="guide-visuals mt-6">
              <WeddingCalendar />
              <div className="guide-map">
                <iframe
                  title="Google Maps preview of SDM Kalyana Mantapa, Basavanagudi"
                  src={MAP_PREVIEW_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <GuideCTA href={GUEST_GUIDE.mapsHref} variant="filled">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Navigate to Venue
              </GuideCTA>

              <GuideCTA href={calendarHref} variant="outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3 9h18M8 5V3M16 5V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Add to Calendar
              </GuideCTA>
            </div>

            <div className="mt-8 border-t border-gold/35 px-1 pt-6 md:px-8">
              <p className="meta-stationery">{GUEST_GUIDE.proTipLabel}</p>
              <p className="mt-2 font-cormorant text-base font-medium leading-[1.75] text-stone-800">
                {GUEST_GUIDE.proTip}
              </p>
            </div>
          </motion.article>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}

export default memo(GuestGuide)
