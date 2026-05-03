import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

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

const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'
const MAPS_CLUBHOUSE = 'https://maps.app.goo.gl/vyDCL9iZnM9jVQpb9'

export default function Venue() {
  const calendarHref = useMemo(
    () =>
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bhakti%20%26%20Dhananjay%20%E2%80%94%20Wedding&dates=20270225/20270315&details=Celebrations%20Feb%2025%E2%80%93Mar%2014%2C%202027.%20Haldi%20%26%20Mehendi%3A%20Prestige%20Lake%20Ridge%20clubhouse.%20Sangeet%2C%20Baraat%2C%20Muhurtham%20%26%20Reception%3A%20Sri%20Dharmastala%20Manjunatha%20Swamy%20Kalyana%20Mantapa%2C%20Basavanagudi.%20https%3A%2F%2Fbhaktikijay.fyi&location=Sri%20Dharmastala%20Manjunatha%20Swamy%20Kalyana%20Mantapa%2C%20Bull%20Temple%20Rd%2C%20Basavanagudi%2C%20Bengaluru',
    [],
  )

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
          <p className="mx-auto mt-4 max-w-2xl font-cormorant text-stone-800/75 text-base leading-relaxed">
            Sangeet, baraat, muhurtham, and reception at Sri Dharmastala Manjunatha Swamy Kalyana Mantapa,
            Basavanagudi. Haldi and mehendi at the Prestige Lake Ridge clubhouse.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-8 md:mt-12 md:flex-row md:items-stretch md:justify-center">
          {[
            {
              title: 'Sri Dharmastala Manjunatha Swamy Kalyana Mantapa',
              lines: ['Bull Temple Road, Basavanagudi', 'Bengaluru'],
              mapsHref: MAPS_KALYANA,
              note: 'Sangeet · Baraat · Muhurtham · Reception',
            },
            {
              title: 'Prestige Lake Ridge — clubhouse',
              lines: ['Haldi · Mehendi'],
              mapsHref: MAPS_CLUBHOUSE,
              note: null,
            },
          ].map((block) => (
            <motion.div
              key={block.title}
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
                <div className="text-center">
                  <div className="font-playfair text-stone-900 text-xl font-black tracking-wide md:text-2xl">
                    {block.title}
                  </div>
                  {block.lines.map((line) => (
                    <div key={line} className="mt-2 font-lato text-stone-800/70 text-sm">
                      {line}
                    </div>
                  ))}
                  {block.note ? (
                    <div className="mt-3 font-cormorant text-stone-800/80 text-sm italic">{block.note}</div>
                  ) : null}
                </div>

                <div className="flex justify-center">
                  <VenueCTA href={block.mapsHref} variant="filled">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Open in Maps
                  </VenueCTA>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
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
    </motion.section>
  )
}
