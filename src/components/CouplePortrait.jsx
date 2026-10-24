import React, { memo } from 'react'
import { motion } from 'framer-motion'
import couplePortraitSmall from '../../images/couple-560.webp'
import couplePortraitLarge from '../../images/couple-900.webp'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'

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
        <RevealItem className="mx-auto mt-6 max-w-xl">
          <p className="font-cormorant text-2xl italic leading-snug text-primary-deep md:text-3xl">
            Hand in hand, with all of you beside us.
          </p>
        </RevealItem>
        <RevealItem className="mx-auto mt-5 max-w-prose">
          <p className="font-cormorant text-base font-medium leading-[1.85] text-pretty text-stone-700 md:text-lg">
            We're so happy to share this moment with the people who mean the most to us. Your warmth and blessings
            have meant everything to us both. Thank you, from the bottom of our hearts. We can't wait to celebrate
            with you.
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
                src={couplePortraitLarge}
                srcSet={`${couplePortraitSmall} 560w, ${couplePortraitLarge} 900w`}
                sizes="(max-width: 640px) calc(100vw - 32px), 768px"
                alt="Bhakti and Dhananjay"
                width="900"
                height="1501"
                loading="lazy"
                decoding="async"
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
