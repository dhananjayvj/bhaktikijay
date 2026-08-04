import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'
import { GUEST_GUIDE } from '../constants/siteContent.js'
import { springGentle } from '../constants/motion.js'

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
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
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
      location: GUEST_GUIDE.mapsHref,
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
          <motion.article className="soft-card p-5 md:p-8" whileHover={{ y: -3 }} transition={springGentle}>
            <div className="text-center">
              <p className="section-eyebrow">{GUEST_GUIDE.eyebrow}</p>
              <h2 className="section-display mt-2">{GUEST_GUIDE.title}</h2>
            </div>

            <div className="mt-6 rounded-xl border border-gold/25 bg-cream/70 px-4 py-4 md:px-5">
              <p className="meta-stationery">{GUEST_GUIDE.proTipLabel}</p>
              <p className="mt-2 font-cormorant text-base font-medium leading-[1.75] text-stone-800">{GUEST_GUIDE.proTip}</p>
            </div>

            <p className="mt-6 text-center font-cormorant text-[1.05rem] font-medium leading-[1.65] text-stone-800 md:text-[1.12rem]">
              {GUEST_GUIDE.address}
            </p>

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
          </motion.article>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}

export default memo(GuestGuide)
