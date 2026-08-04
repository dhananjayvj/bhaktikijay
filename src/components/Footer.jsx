import React from 'react'
import { motion } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { springGentle } from '../constants/motion.js'

function GearJoke() {
  return (
    <RevealItem className="mx-auto mt-6 max-w-prose px-2 text-center font-lato text-cream/85 text-sm leading-relaxed">
      <motion.span
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
        className="inline-block align-middle mr-2 text-gold-light/90"
        aria-hidden="true"
      >
        ⚙️
      </motion.span>
      Note: This website was built with 10% inspiration and 90% technical troubleshooting.
    </RevealItem>
  )
}

function KolamFooterMark() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="50" stroke="#E8C547" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="60" cy="60" r="30" stroke="#E8C547" strokeOpacity="0.38" strokeWidth="1" />
      <path
        d="M60 20v20M60 80v20M20 60h20M80 60h20"
        stroke="#E8C547"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 42c7-8 19-8 26 0 7 8 7 20 0 28-7 8-19 8-26 0-7-8-7-20 0-28Z"
        stroke="#E8C547"
        strokeOpacity="0.7"
        strokeWidth="1"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <SectionReveal
      as="footer"
      className="defer-heavy-section reveal border-t border-border bg-gradient-to-b from-primary-deep to-brown px-4 py-16 text-center md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <RevealItem className="mx-auto flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          >
            <KolamFooterMark />
          </motion.div>
        </RevealItem>

        <RevealItem>
          <p className="section-eyebrow-on-dark mt-5">Until we meet</p>
          <p className="mt-2 font-playfair text-xl font-medium italic leading-relaxed text-gold-light md:text-2xl">
            With love, blessings, and joyful anticipation.
          </p>
        </RevealItem>

        <RevealItem className="mt-5">
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={springGentle}
            className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-brown/40 px-5 py-2 font-lato text-sm font-semibold tracking-widest text-gold-light"
          >
            <span aria-hidden="true">#</span>
            JayKiBhakti
          </motion.div>
        </RevealItem>

        <GearJoke />

        <RevealItem className="mt-8 font-lato text-xs font-medium text-cream/80">Made with ♥️</RevealItem>
      </div>
    </SectionReveal>
  )
}
