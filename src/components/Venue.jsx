import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'
const SITE_URL = 'https://bhakti-dhananjay.life/'

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
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
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
    const details = [
      'Celebrations Mar 11–14, 2027.',
      'Haldi & Mehendi: Prestige Lake Ridge clubhouse (map on site timeline).',
      'Sangeet, Baraat, Muhurtham & Reception: Sri Dharmastala Manjunatha Swamy Kalyana Mantapa, Basavanagudi.',
      SITE_URL.trim(),
    ].join(' ')
    const location = 'Sri Dharmastala Manjunatha Swamy Kalyana Mantapa, Bull Temple Rd, Basavanagudi, Bengaluru'
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Bhakti & Dhananjay — Wedding',
      dates: '20270311/20270315',
      details,
      location,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [])

  return (
    <motion.section
      id="venue"
      className="defer-heavy-section reveal border-t border-gold/20 bg-cream px-4 py-16 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="font-cinzel text-terra text-3xl font-bold tracking-wide md:text-4xl">
            Venue &amp; logistics
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-gold/35 bg-invite-paper/80 px-5 py-5 text-left shadow-sm md:px-8 md:py-6">
          <p className="font-lato text-[0.7rem] font-bold uppercase tracking-[0.2em] text-terra/90">Pro-tip</p>
          <p className="mt-3 font-cormorant text-stone-800/90 text-[0.98rem] leading-relaxed">
            Bull Temple Road is easy by auto, app cab, or private car. Nearest metro is{' '}
            <strong className="font-semibold text-stone-900">National College</strong> on the Green Line, about{' '}
            <strong className="font-semibold text-stone-900">2 km</strong> from the hall and roughly{' '}
            <strong className="font-semibold text-stone-900">15 to 20 minutes</strong> by road in normal traffic.{' '}
            <strong className="font-semibold text-stone-900">Lalbagh</strong> on the same line may work better from some parts of town.
            Sundays and peak evenings need extra time. Parking is tight, so come a bit early if you drive.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center md:mt-12">
          <motion.div
            className="relative w-full max-w-xl rounded-2xl border border-gold/35 bg-cream/70 p-6 shadow-lg md:p-8"
            style={{ willChange: 'transform' }}
          >
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
              <p className="text-center font-cormorant text-stone-800/90 text-[1.05rem] leading-snug md:text-[1.12rem]">
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
        </div>
      </div>
    </motion.section>
  )
}
