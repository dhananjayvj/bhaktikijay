import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import GaneshMark from './GaneshMark.jsx'
import SubtleGoldDivider from './SubtleGoldDivider.jsx'
import Countdown from './Countdown.jsx'
import {
  BHAKTI_PARENT_LINE,
  COUNTDOWN_INTRO,
  DHANANJAY_PARENT_LINE,
  INVITE_CELEBRATION,
  INVITE_HEADER,
  INVITE_OPENING_VERSE,
} from '../constants/inviteCopy.js'
import { CEREMONY_DATE_HEADLINE } from '../constants/wedding.js'

const easeSmooth = [0.77, 0, 0.175, 1]

/** Opacity + soft rise — reliable across browsers (avoids blank clip-path bugs). */
function fadeLine(delay) {
  return {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: easeSmooth, delay },
    },
  }
}

const kolamReveal = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSmooth, delay: 0 } },
}

/** Instantly “on” so layoutId names don’t wait on stagger */
const instant = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0 } },
}

const countdownReveal = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSmooth, delay: 1.15 } },
}

const layoutSpring = { type: 'spring', stiffness: 380, damping: 34, mass: 0.85 }

export default function Hero({ inviteRevealed = false, skipIntro = false }) {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('Copied!')

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 12% 20%, rgba(122,46,63,0.08) 0%, rgba(122,46,63,0) 52%), radial-gradient(circle at 88% 16%, rgba(139,107,122,0.10) 0%, rgba(139,107,122,0) 50%), radial-gradient(circle at 50% 100%, rgba(233,216,221,0.35) 0%, rgba(250,247,242,0) 45%)',
    }),
    [],
  )

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
          className="relative mx-auto grid min-h-[100svh] w-full max-w-5xl grid-rows-[auto_auto_auto] gap-y-3 px-3 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(0.25rem,env(safe-area-inset-top))] text-center sm:gap-y-4 sm:px-4 sm:pb-14 sm:pt-8 md:gap-y-5 md:px-10 md:pb-20 md:pt-12"
          initial={skipIntro ? 'show' : 'hidden'}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0, delayChildren: 0 },
            },
          }}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <motion.div variants={fadeLine(0.02)} className="w-full">
              <GaneshMark className="opacity-85" />
            </motion.div>

            <motion.div variants={kolamReveal} className="w-full">
              <div className="mt-0 md:mt-1">
                <KolamWaveDivider compact />
              </div>
            </motion.div>

            <Toast message={toastMsg} open={toastOpen} onClose={() => setToastOpen(false)} />

            <motion.div
              variants={fadeLine(0.12)}
              className="font-cinzel text-center text-[clamp(0.92rem,2.2vw,1.18rem)] italic leading-snug tracking-[0.08em] text-invite-wine"
            >
              <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
                ||
              </span>
              <span className="px-1.5 sm:px-2.5">{INVITE_HEADER}</span>
              <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
                ||
              </span>
            </motion.div>

            <motion.div variants={fadeLine(0.18)} className="max-w-2xl px-0.5">
              <p className="mx-auto max-w-md font-cormorant text-[clamp(0.88rem,2vw,1.08rem)] italic leading-relaxed text-invite-ink-soft whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
                {INVITE_OPENING_VERSE}
              </p>
            </motion.div>

            <motion.div variants={fadeLine(0.26)} className="w-full">
              <SubtleGoldDivider className="opacity-80" />
            </motion.div>
          </div>

          <div className="flex min-h-0 w-full flex-col items-center justify-center py-0.5 sm:py-2">
            <div className="grid w-full grid-cols-1 items-center justify-center gap-2 sm:gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-x-8">
              <div className="flex flex-col items-center text-center">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-bhakti"
                    className="font-script font-normal text-invite-wine"
                    style={{ fontSize: 'clamp(2.35rem, 9vw, 7.2rem)', lineHeight: 0.95 }}
                    transition={layoutSpring}
                  >
                    Bhakti
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeLine(0.42)} className="mt-2 max-w-[26rem] sm:mt-3">
                  <p className="font-cormorant text-invite-ink-soft text-[clamp(0.88rem,1.9vw,1.08rem)] leading-relaxed">
                    {BHAKTI_PARENT_LINE}
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center justify-center py-0.5 md:pt-3">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-amp"
                    className="font-script italic font-normal text-invite-mauve"
                    style={{ fontSize: 'clamp(1.65rem, 5.5vw, 3.8rem)', lineHeight: 1 }}
                    transition={layoutSpring}
                  >
                    &amp;
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center text-center">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-dhananjay"
                    className="font-script font-normal text-invite-wine"
                    style={{ fontSize: 'clamp(2.35rem, 9vw, 7.2rem)', lineHeight: 0.95 }}
                    transition={layoutSpring}
                  >
                    Dhananjay
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeLine(0.52)} className="mt-2 max-w-[26rem] sm:mt-3">
                  <p className="font-cormorant text-invite-ink-soft text-[clamp(0.88rem,1.9vw,1.08rem)] leading-relaxed">
                    {DHANANJAY_PARENT_LINE}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2.5 sm:gap-3.5">
            <motion.div variants={fadeLine(0.58)} className="max-w-2xl px-0.5">
              <p className="mx-auto max-w-md font-cormorant text-[clamp(0.88rem,2vw,1.06rem)] italic leading-relaxed text-invite-ink-soft whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
                {INVITE_CELEBRATION}
              </p>
            </motion.div>

            <motion.div variants={instant} className="flex flex-col items-center gap-1.5">
              <motion.div
                layoutId="invite-line-date"
                className="flex flex-col items-center gap-1.5 text-invite-wine"
                transition={layoutSpring}
              >
                <div
                  className="font-cinzel font-bold uppercase tracking-[0.14em] text-invite-wine"
                  style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.45rem)' }}
                >
                  {CEREMONY_DATE_HEADLINE}
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={countdownReveal} className="w-full">
              <Countdown dense intro={COUNTDOWN_INTRO} targetIso="2027-02-26T08:50:00+05:30" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
