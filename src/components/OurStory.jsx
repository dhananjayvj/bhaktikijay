import React, { memo } from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { OUR_STORY } from '../constants/siteContent.js'
import { springSilk } from '../constants/motion.js'

function OurStory() {
  return (
    <SectionReveal
      id="story"
      className="relative overflow-hidden border-t border-border bg-sand/40 px-4 py-16 md:px-10 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 10% 20%, rgba(15,118,110,0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(217,119,6,0.08) 0%, transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">{OUR_STORY.eyebrow}</p>
          <h2 className="section-display mt-2">{OUR_STORY.title}</h2>
        </RevealItem>

        <RevealItem className="mx-auto mt-6 max-w-prose space-y-4">
          {OUR_STORY.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="font-cormorant text-lg font-medium leading-[1.85] text-pretty text-stone-700">
              {p}
            </p>
          ))}
        </RevealItem>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {OUR_STORY.milestones.map((m, i) => (
            <RevealItem key={m.year} variant="scale">
              <motion.article
                className="soft-card h-full p-5 md:p-6"
                whileHover={{ y: -4 }}
                transition={springSilk}
              >
                <p className="font-playfair text-3xl font-bold text-primary">{m.year}</p>
                <h3 className="mt-2 font-cinzel text-sm font-bold tracking-wide text-terra">{m.label}</h3>
                <p className="mt-2 font-cormorant text-base leading-relaxed text-stone-600">{m.detail}</p>
              </motion.article>
            </RevealItem>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default memo(OurStory)
