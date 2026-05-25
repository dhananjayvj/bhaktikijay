import React, { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import Countdown from './Countdown.jsx'
import { backdropImageUrl } from '../utils/preloadRevealAssets.js'
import {
  easeOutCubic,
  gpuLayerStyle,
  heroLineRevealDuration,
  heroLineRisePx,
  layoutHandoff,
  staggerChildren,
} from '../constants/motion.js'
import {
  BHAKTI_PARENT_LINE,
  COUNTDOWN_INTRO,
  DHANANJAY_PARENT_LINE,
  INVITE_CELEBRATION,
  INVITE_HEADER,
  INVITE_OPENING_VERSE,
} from '../constants/inviteCopy.js'
import { CEREMONY_DATE_HEADLINE } from '../constants/wedding.js'

const lineReveal = {
  hidden: { opacity: 0, y: heroLineRisePx },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: heroLineRevealDuration, ease: easeOutCubic },
  },
}

const kolamReveal = {
  hidden: { opacity: 0, y: heroLineRisePx },
  show: { opacity: 1, y: 0, transition: { duration: heroLineRevealDuration, ease: easeOutCubic } },
}

const instant = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren: 0.15 },
  },
}

const BACKDROP_MOUNT_DELAY_MS = 2600
const BACKDROP_FADE_SEC = 3

function Hero({ inviteRevealed = false, skipIntro = false }) {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('Copied!')
  const [backdropOn, setBackdropOn] = useState(false)

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 12% 20%, rgba(122,46,63,0.08) 0%, rgba(122,46,63,0) 52%), radial-gradient(circle at 88% 16%, rgba(139,107,122,0.10) 0%, rgba(139,107,122,0) 50%), radial-gradient(circle at 50% 100%, rgba(233,216,221,0.35) 0%, rgba(250,247,242,0) 45%)',
    }),
    [],
  )

  useEffect(() => {
    if (!inviteRevealed) {
      setBackdropOn(false)
      return
    }
    const t = window.setTimeout(() => setBackdropOn(true), BACKDROP_MOUNT_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [inviteRevealed])

  return (
    <section
      id="invitation"
      className="relative min-h-[100svh] overflow-x-hidden overflow-y-visible"
    >
      <div className="absolute inset-0 bg-invite-paper" style={bgStyle} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />

      {!inviteRevealed ? (
        <div className="relative min-h-dvh min-h-[100svh]" aria-hidden="true" />
      ) : (
        <motion.div
          className="relative mx-auto grid min-h-[100svh] w-full max-w-5xl grid-rows-[auto_auto_auto] gap-y-5 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] text-center sm:gap-y-6 sm:px-6 sm:pb-16 sm:pt-10 md:gap-y-8 md:px-12 md:pb-24 md:pt-14"
          initial={skipIntro ? 'show' : 'hidden'}
          animate="show"
          variants={heroStagger}
        >
          <div
            aria-hidden="true"
            className="paper-parchment pointer-events-none absolute inset-x-3 top-8 bottom-8 z-0 overflow-hidden rounded-3xl border border-invite-wine/12 bg-[linear-gradient(168deg,#faf6ef_0%,#f0e9dc_52%,#e8dfd2_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.10)] ring-1 ring-[#D4AF37]/10 sm:inset-x-4"
          />

          {backdropOn ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 top-8 bottom-8 z-0 overflow-hidden rounded-3xl sm:inset-x-4"
              style={gpuLayerStyle}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.34 }}
                transition={{ duration: BACKDROP_FADE_SEC, ease: easeOutCubic }}
                style={{
                  backgroundImage: `url(${backdropImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'saturate(1.15) contrast(1.08)',
                  willChange: 'opacity',
                }}
              />
              <div className="absolute inset-0 bg-[#faf6ef]/40 sm:bg-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ef]/97 via-[#f0e9dc]/60 to-[#e8dfd2]/98 sm:from-[#faf6ef]/92 sm:via-[#f0e9dc]/44 sm:to-[#e8dfd2]/94" />
            </motion.div>
          ) : null}

          <div className="relative z-[2] flex flex-col items-center gap-5 sm:gap-6">
            <motion.div variants={kolamReveal} className="w-full">
              <div className="mt-0 md:mt-1">
                <KolamWaveDivider compact />
              </div>
            </motion.div>

            <Toast message={toastMsg} open={toastOpen} onClose={() => setToastOpen(false)} />

            <motion.div variants={lineReveal} className="meta-stationery letterpress-ink px-2">
              <span className="select-none not-italic text-invite-wine/35" aria-hidden="true">
                ||
              </span>
              <span className="px-2">{INVITE_HEADER}</span>
              <span className="select-none not-italic text-invite-wine/35" aria-hidden="true">
                ||
              </span>
            </motion.div>

            <motion.div variants={lineReveal} className="w-full px-2">
              <p className="letterpress-ink mx-auto max-w-xl font-cormorant text-lg italic leading-loose text-invite-wine/90 whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
                {INVITE_OPENING_VERSE}
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={lineReveal}
            className="relative z-[2] flex min-h-0 w-full flex-col items-center justify-center px-2 pt-2 sm:pt-4"
          >
            <div className="grid w-full max-w-4xl grid-cols-1 items-center justify-center gap-4 sm:gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
              <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-bhakti"
                    className="letterpress-ink font-playfair font-semibold text-invite-wine"
                    style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: 0.95, ...gpuLayerStyle }}
                    transition={layoutHandoff}
                  >
                    Bhakti
                  </motion.div>
                </motion.div>
                <motion.div variants={lineReveal}>
                  <p className="letterpress-ink max-w-[26rem] font-cormorant text-base italic leading-relaxed tracking-wide text-invite-mauve sm:text-lg">
                    {BHAKTI_PARENT_LINE}
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center justify-center py-1 md:pt-4">
                <motion.div variants={instant}>
                  <motion.div layoutId="invite-line-amp" transition={layoutHandoff} style={gpuLayerStyle}>
                    <span className="letterpress-ink inline-block translate-y-2 font-script text-6xl text-invite-mauve md:mx-2">
                      &amp;
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-dhananjay"
                    className="letterpress-ink font-playfair font-semibold text-invite-wine"
                    style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: 0.95, ...gpuLayerStyle }}
                    transition={layoutHandoff}
                  >
                    Dhananjay
                  </motion.div>
                </motion.div>
                <motion.div variants={lineReveal}>
                  <p className="letterpress-ink max-w-[26rem] font-cormorant text-base italic leading-relaxed tracking-wide text-invite-mauve sm:text-lg">
                    {DHANANJAY_PARENT_LINE}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={lineReveal}
            className="relative z-[2] flex flex-col items-center gap-4 px-3 sm:gap-5 sm:px-4"
          >
            <motion.div variants={lineReveal} className="w-full">
              <p className="letterpress-ink mx-auto max-w-lg font-cormorant text-lg italic leading-loose tracking-wide text-invite-wine/90 whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
                {INVITE_CELEBRATION}
              </p>
            </motion.div>

            <motion.div variants={instant} className="flex flex-col items-center gap-2 pt-1">
              <motion.div
                layoutId="invite-line-date"
                className="meta-stationery letterpress-ink px-2"
                style={gpuLayerStyle}
                transition={layoutHandoff}
              >
                {CEREMONY_DATE_HEADLINE}
              </motion.div>
            </motion.div>

            <motion.div variants={lineReveal} className="w-full pt-1">
              <Countdown dense intro={COUNTDOWN_INTRO} targetIso="2027-03-14T08:48:00+05:30" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default memo(Hero)
