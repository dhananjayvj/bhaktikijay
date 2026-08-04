import React, { memo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { CELEBRATION_DAYS } from '../constants/siteContent.js'
import { springSilk } from '../constants/motion.js'

function CelebrationOverview() {
  return (
    <SectionReveal
      id="overview"
      className="relative overflow-hidden border-t border-border bg-cream px-4 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">Three days of joy</p>
          <h2 className="section-display-light mt-2">Celebration overview</h2>
          <p className="section-lead mt-3">
            Mar 11–14, 2027 — a journey from intimate pre-wedding rituals to the sacred muhurtham and reception.
          </p>
        </RevealItem>

        <div className="mt-12 space-y-5">
          {CELEBRATION_DAYS.map((day, i) => (
            <RevealItem key={day.day} variant="scale">
              <motion.article
                className="soft-card grid gap-4 p-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] md:items-center md:gap-8 md:p-7"
                whileHover={{ y: -3 }}
                transition={springSilk}
              >
                <div>
                  <p className="meta-stationery">{day.day}</p>
                  <h3 className="mt-2 font-playfair text-2xl font-bold text-primary-deep">{day.title}</h3>
                  <p className="mt-1 font-lato text-sm font-semibold text-terra">{day.events}</p>
                </div>
                <div className="border-t border-gold/20 pt-4 md:border-t-0 md:border-l md:pl-8 md:pt-0">
                  <p className="font-lato text-xs font-semibold uppercase tracking-[0.2em] text-muted-fg">Venue</p>
                  <p className="mt-1 font-cormorant text-lg font-medium text-stone-800">{day.venue}</p>
                  <p className="mt-3 font-cormorant text-base leading-relaxed text-stone-600">{day.tone}</p>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default memo(CelebrationOverview)
