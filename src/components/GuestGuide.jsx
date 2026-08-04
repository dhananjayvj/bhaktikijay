import React, { memo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { GUEST_GUIDE } from '../constants/siteContent.js'
import { springSilk } from '../constants/motion.js'

function GuestGuide() {
  return (
    <SectionReveal
      id="guide"
      className="relative overflow-hidden border-t border-border bg-mint/50 px-4 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">{GUEST_GUIDE.eyebrow}</p>
          <h2 className="section-display mt-2">{GUEST_GUIDE.title}</h2>
        </RevealItem>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {GUEST_GUIDE.sections.map((section) => (
            <RevealItem key={section.title} variant="scale">
              <motion.article
                className="soft-card h-full p-5 md:p-6"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={springSilk}
              >
                <h3 className="font-cinzel text-sm font-bold tracking-wide text-terra">{section.title}</h3>
                <p className="mt-3 font-cormorant text-base font-medium leading-[1.75] text-stone-700">{section.body}</p>
              </motion.article>
            </RevealItem>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default memo(GuestGuide)
