import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { springGentle } from '../constants/motion.js'

const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'

function VenueCTA({ href, children, variant }) {
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
        'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-lato text-sm font-semibold',
        className,
      ].join(' ')}
    >
      {children}
    </motion.a>
  )
}

export default function Venue() {
  const calendarHref = useMemo(() => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Bhakti & Dhananjay — Wedding, March 14, 2027',
      dates: '20270314/20270315',
      details: MAPS_KALYANA,
      location: MAPS_KALYANA,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [])

  return (
    <SectionReveal
      id="venue"
      className="defer-heavy-section reveal border-t border-gold/20 bg-cream px-4 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">Getting there</p>
          <h2 className="section-display-light mt-2">Venue &amp; logistics</h2>
        </RevealItem>

        <RevealItem className="mx-auto mt-8 max-w-prose">
          <div className="soft-card px-5 py-5 text-left md:px-8 md:py-6">
            <p className="meta-stationery">Pro-tip</p>
            <p className="mt-3 font-cormorant text-stone-800 text-[1rem] font-medium leading-[1.75] text-pretty">
              Bull Temple Road is easy by auto, cab, or private car. Nearest metro is National College/LalBagh on the
              Green Line, about 2 km from the hall and roughly 15 to 20 minutes by road in normal traffic. Sundays and
              peak evenings need extra time. Parking is limited, so come a bit early if you drive.
            </p>
          </div>
        </RevealItem>

        <RevealItem variant="scale" className="mt-10 flex flex-col items-center md:mt-12">
          <motion.div className="soft-card relative w-full max-w-xl p-6 md:p-8" whileHover={{ y: -3 }} transition={springGentle}>
            <motion.div
              className="absolute -inset-2 z-[-1] rounded-[1.25rem] opacity-70 blur-md"
              style={{
                background:
                  'conic-gradient(from 90deg, rgba(240,208,96,0.55), rgba(226,114,91,0.45), rgba(212,175,55,0.55), rgba(240,208,96,0.55))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex flex-col gap-6">
              <p className="text-center font-cormorant text-stone-800 text-[1.05rem] font-medium leading-[1.65] text-pretty md:text-[1.12rem]">
                Sri Dharmastala Manjunatha Swamy Kalyana Mantapa · Bull Temple Road · Basavanagudi · Bengaluru
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <VenueCTA href={MAPS_KALYANA} variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Navigate to Venue
                </VenueCTA>

                <VenueCTA href={calendarHref} variant="outline">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M3 9h18M8 5V3M16 5V3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add to Calendar
                </VenueCTA>
              </div>
            </div>
          </motion.div>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}
