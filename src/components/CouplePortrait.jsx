import React, { memo } from 'react'
import templePlaceholder from '../../images/gallery-temple-placeholder.webp'
import stationeryPlaceholder from '../../images/gallery-stationery-placeholder.webp'
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
          <h2 className="mt-2 font-playfair text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight tracking-tight text-[#63353a] text-balance">
            A message from the couple
          </h2>
        </RevealItem>
        <RevealItem className="mx-auto mt-6 max-w-xl">
          <p className="font-cormorant text-2xl italic leading-snug text-[#63353a] md:text-3xl">
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

        <RevealItem className="mx-auto mt-9 max-w-3xl">
          <p className="meta-stationery">Our photo story</p>
          <p className="mt-2 font-cormorant text-lg italic text-stone-700">Portraits from our photoshoot are coming soon.</p>
          <div className="photo-gallery mt-6" aria-label="Photoshoot preview gallery">
            <figure className="gallery-photo">
              <img src={templePlaceholder} alt="Placeholder: temple corridor and wedding flowers" width="700" height="875" loading="lazy" decoding="async" />
            </figure>
            <figure className="gallery-photo">
              <img src={stationeryPlaceholder} alt="Placeholder: invitation and jasmine flowers" width="700" height="875" loading="lazy" decoding="async" />
            </figure>
          </div>
        </RevealItem>

      </div>
    </SectionReveal>
  )
}

export default memo(CouplePortrait)
