import React, { memo, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import couplePortraitSmall from '../../images/couple-560.webp'
import couplePortraitLarge from '../../images/couple-900.webp'
import templePlaceholder from '../../images/gallery-temple-placeholder.webp'
import stationeryPlaceholder from '../../images/gallery-stationery-placeholder.webp'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'

const PHOTOS = [
  { src: couplePortraitLarge, srcSet: `${couplePortraitSmall} 560w, ${couplePortraitLarge} 900w`, width: 900, height: 1501, alt: 'Bhakti and Dhananjay together', label: 'Bhakti & Dhananjay' },
  { src: templePlaceholder, width: 700, height: 875, alt: 'Preview artwork of a temple corridor and flowers', label: 'Photoshoot preview · Melukote' },
  { src: stationeryPlaceholder, width: 700, height: 875, alt: 'Preview artwork of an invitation and jasmine flowers', label: 'Photoshoot preview · The invitation' },
]

function CouplePortrait() {
  const carouselRef = useRef(null)
  const inView = useInView(carouselRef, { amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!inView || paused || reduceMotion) return undefined
    const timer = window.setInterval(() => setActive((index) => (index + 1) % PHOTOS.length), 6000)
    return () => window.clearInterval(timer)
  }, [active, inView, paused, reduceMotion])

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
        <RevealItem className="mx-auto mt-5 max-w-prose">
          <p className="font-cormorant text-base font-medium leading-[1.85] text-pretty text-stone-700 md:text-lg">
            We're so happy to share this moment with the people who mean the most to us. Your warmth and blessings
            have meant everything to us both. Thank you, from the bottom of our hearts. We can't wait to celebrate
            with you.
          </p>
        </RevealItem>

        <RevealItem className="mx-auto mt-9 max-w-3xl">
          <p className="meta-stationery">Our photo story</p>
          <p className="mt-2 font-cormorant text-lg italic text-stone-700">More portraits from our photoshoot are coming soon.</p>
          <div
            ref={carouselRef}
            className="gallery-carousel mx-auto mt-6"
            role="region"
            aria-roledescription="carousel"
            aria-label="Bhakti and Dhananjay photo gallery"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}
          >
            <div className="gallery-carousel-viewport">
              {PHOTOS.map((photo, index) => (
                <figure key={photo.src} className={`gallery-carousel-slide${index === active ? ' is-active' : ''}`} aria-hidden={index !== active}>
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(max-width: 640px) calc(100vw - 64px), 420px"
                    alt={index === active ? photo.alt : ''}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
            <div className="gallery-carousel-controls">
              <button type="button" onClick={() => setActive((index) => (index + PHOTOS.length - 1) % PHOTOS.length)} aria-label="Previous photo">‹</button>
              <span className="gallery-carousel-caption">{PHOTOS[active].label}</span>
              <button type="button" onClick={() => setActive((index) => (index + 1) % PHOTOS.length)} aria-label="Next photo">›</button>
            </div>
            <div className="gallery-carousel-dots" aria-label="Choose a photo">
              {PHOTOS.map((photo, index) => (
                <button key={photo.src} type="button" className={index === active ? 'is-active' : ''} aria-label={`Show photo ${index + 1}: ${photo.label}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} />
              ))}
            </div>
          </div>
        </RevealItem>

      </div>
    </SectionReveal>
  )
}

export default memo(CouplePortrait)
