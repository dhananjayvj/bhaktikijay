import React from 'react'
import { motion } from 'framer-motion'
import couplePortrait from '../../images/bhakti-dhananjay.jpeg'

export default function CouplePortrait() {
  return (
    <motion.section
      id="couple"
      className="relative overflow-hidden border-t border-gold/20 bg-cream px-4 py-16 md:px-10 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(226,114,91,0.12) 0%, rgba(226,114,91,0) 55%), radial-gradient(circle at 85% 10%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0) 55%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="font-playfair text-2xl font-semibold text-stone-800 md:text-3xl">Together</h2>
        <p className="mx-auto mt-3 max-w-2xl font-cormorant text-sm leading-relaxed text-stone-600 md:text-base">
          Grateful for family, friends, and the path that brought us here.
        </p>

        <motion.figure
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border-[3px] border-gold/50 bg-stone-100 shadow-xl ring-1 ring-gold/15"
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
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
              src={couplePortrait}
              alt="Bhakti and Dhananjay"
              loading="lazy"
              decoding="async"
              className="w-full object-cover object-center"
            />
          </div>

          <figcaption className="px-5 py-4 text-center font-cormorant italic text-gold-dark/90">
            Bhakti &amp; Dhananjay
          </figcaption>
        </motion.figure>
      </div>
    </motion.section>
  )
}

