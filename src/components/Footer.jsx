import React from 'react'
import { motion } from 'framer-motion'

function GearJoke() {
  return (
    <div className="mx-auto mt-6 max-w-2xl px-2 text-center font-lato text-cream/70 text-sm leading-relaxed">
      <motion.span
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
        className="inline-block align-middle mr-2 text-gold/80"
        aria-hidden="true"
      >
        ⚙️
      </motion.span>
      Note: This website was built with 10% inspiration and 90% technical troubleshooting.
    </div>
  )
}

function KolamFooterMark() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="50" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1" />
      <circle cx="60" cy="60" r="30" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1" />
      <path
        d="M60 20v20M60 80v20M20 60h20M80 60h20"
        stroke="#D4AF37"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 42c7-8 19-8 26 0 7 8 7 20 0 28-7 8-19 8-26 0-7-8-7-20 0-28Z"
        stroke="#D4AF37"
        strokeOpacity="0.65"
        strokeWidth="1"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <motion.footer
      className="reveal bg-brown px-4 py-16 text-center md:px-10 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          >
            <KolamFooterMark />
          </motion.div>
        </div>

        <div className="mt-5 font-playfair italic text-gold text-xl leading-relaxed">
          With love, blessings, and joyful anticipation.
        </div>

        <div className="mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-brown/50 px-5 py-2 font-lato text-sm font-semibold tracking-widest text-gold">
            <span aria-hidden="true">#</span>
            BhaktiKiJay
          </div>
        </div>

        <GearJoke />

        <div className="mt-8 font-lato text-xs text-cream/55">
          bhaktikijay.fyi · Made with ♥️ in Bengaluru
        </div>
      </div>
    </motion.footer>
  )
}

