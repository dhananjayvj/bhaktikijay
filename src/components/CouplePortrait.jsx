import React, { memo } from 'react'
import { motion } from 'framer-motion'
import couplePortrait from '../../images/bhakti-dhananjay.jpg'
import { COUPLE_PORTRAIT_VERSION } from '../constants/assetVersions.js'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'

const portraitSrc = `${couplePortrait}?v=${COUPLE_PORTRAIT_VERSION}`

function CouplePortrait() {
  return (
    <SectionReveal
      id="couple"
      className="relative overflow-hidden border-t border-gold/20 px-4 py-16 md:px-10 md:py-24"
    >
      <SectionDoodleBackdrop variant="cream" />

      <div className="relative z-[1] mx-auto max-w-5xl text-center">
        <RevealItem>
          <p className="section-eyebrow">From us, with gratitude</p>
          <h2 className="mt-2 font-playfair text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight tracking-tight text-primary-deep text-balance">
            A message from the couple
          </h2>
        </RevealItem>
        <RevealItem className="mx-auto mt-5 max-w-prose">
          <p className="font-cormorant text-base font-medium leading-[1.85] text-pretty text-stone-700 md:text-lg">
            We are truly overjoyed to share this milestone with the people who have shaped our lives. The warmth and
            blessings we have received from each of you have been deeply moving and have touched us both beyond words. As
            we prepare for this new beginning, we want to thank you most sincerely for your kindness and support. We are
            so looking forward to celebrating this day with you
          </p>
        </RevealItem>

        <RevealItem variant="scale" className="mx-auto mt-10 max-w-3xl">
          <motion.figure
            className="overflow-hidden rounded-2xl border-[3px] border-gold/55 bg-stone-100 shadow-premium ring-1 ring-gold/20"
            whileHover={{ scale: 1.012, y: -4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(165deg, rgba(28,24,20,0.25) 0%, rgba(18,16,14,0.12) 100%)',
                }}
              />
              <img
                src={portraitSrc}
                alt="Bhakti and Dhananjay"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full object-cover object-center"
              />
            </div>
          </motion.figure>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}

export default memo(CouplePortrait)
