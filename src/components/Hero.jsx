import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import { WEDDING_DATE_LINE } from '../constants/wedding.js'

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

function AnimatedDigit({ value, className, digitKey }) {
  return (
    <motion.span
      key={digitKey}
      className={className}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: easeSmooth }}
    >
      {value}
    </motion.span>
  )
}

function Countdown({ targetIso }) {
  const target = useMemo(() => new Date(targetIso), [targetIso])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds } = useMemo(() => {
    const diffMs = Math.max(0, target.getTime() - now)
    const totalSeconds = Math.floor(diffMs / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { days, hours, minutes, seconds }
  }, [now, target])

  const daysStr = String(days).padStart(2, '0')
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
      {[
        { label: 'Days', str: daysStr },
        { label: 'Hours', str: hoursStr },
        { label: 'Minutes', str: minutesStr },
        { label: 'Seconds', str: secondsStr },
      ].map((part, idx) => (
        <div key={part.label} className="text-center">
          <div className="flex items-baseline justify-center gap-0.5">
            {part.str.split('').map((d, digitIdx) => (
              <AnimatedDigit
                key={`${part.label}-${d}-${digitIdx}`}
                value={d}
                digitKey={`${idx}-${digitIdx}-${d}`}
                className="font-playfair font-black text-invite-wine tabular-nums text-[clamp(1.2rem,4vw,2.2rem)] leading-none"
              />
            ))}
          </div>
          <div className="mt-1 font-lato text-invite-ink-soft/85 text-xs font-semibold tracking-widest uppercase">
            {part.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero({ inviteRevealed = false }) {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('Copied!')

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 12% 20%, rgba(122,46,63,0.08) 0%, rgba(122,46,63,0) 52%), radial-gradient(circle at 88% 16%, rgba(139,107,122,0.10) 0%, rgba(139,107,122,0) 50%), radial-gradient(circle at 50% 100%, rgba(233,216,221,0.35) 0%, rgba(250,247,242,0) 45%)',
    }),
    [],
  )

  const onCopyHashtag = async () => {
    try {
      await navigator.clipboard.writeText('#BhaktiKiJay')
      setToastMsg('Copied #BhaktiKiJay')
      setToastOpen(true)
    } catch {
      setToastMsg('Copy failed — please copy manually')
      setToastOpen(true)
    }
  }

  return (
    <section id="invitation" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-invite-paper" style={bgStyle} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />

      {!inviteRevealed ? (
        <div className="relative min-h-[100svh]" aria-hidden="true" />
      ) : (
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
          <motion.div
            className="mx-auto flex w-full flex-col items-center text-center"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0, delayChildren: 0 },
              },
            }}
          >
            <motion.div variants={kolamReveal} className="w-full">
              <div className="mt-8">
                <KolamWaveDivider />
              </div>
            </motion.div>

            <motion.div variants={fadeLine(0.06)} className="mt-8 flex justify-center">
              <motion.button
                data-no-sparkle="true"
                onClick={onCopyHashtag}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-invite-wine/50 bg-white/60 px-5 py-2.5 font-lato text-sm font-semibold tracking-wider text-invite-wine shadow-sm backdrop-blur-sm transition-colors hover:bg-invite-wine hover:text-invite-paper"
                aria-label="Copy BhaktiKiJay hashtag"
              >
                <span aria-hidden="true">#</span>
                <span>BhaktiKiJay</span>
              </motion.button>
            </motion.div>

            <Toast message={toastMsg} open={toastOpen} onClose={() => setToastOpen(false)} />

            <motion.div variants={fadeLine(0.14)} className="mt-5 max-w-2xl">
              <p className="font-cormorant italic text-invite-ink-soft text-[clamp(1rem,2.3vw,1.15rem)] leading-relaxed">
                With the blessings of our elders and the grace of the Almighty, we invite you to witness the union of
                hearts.
              </p>
            </motion.div>

            <div className="mt-6 grid w-full grid-cols-1 items-center justify-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-x-8">
              <div className="flex flex-col items-center text-center">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-bhakti"
                    className="font-script font-normal text-invite-wine"
                    style={{ fontSize: 'clamp(3rem, 10vw, 7.2rem)', lineHeight: 0.95 }}
                    transition={layoutSpring}
                  >
                    Bhakti
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeLine(0.42)} className="mt-3 max-w-[26rem]">
                  <p className="font-cormorant text-invite-ink-soft text-[clamp(0.98rem,2vw,1.08rem)] leading-relaxed">
                    Daughter of Medini and Manoj Tolmatti
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center justify-center md:pt-3">
                <motion.div variants={instant}>
                  <motion.div
                    layoutId="invite-line-amp"
                    className="font-script italic font-normal text-invite-mauve"
                    style={{ fontSize: 'clamp(2.0rem, 6vw, 3.8rem)', lineHeight: 1 }}
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
                    style={{ fontSize: 'clamp(3rem, 10vw, 7.2rem)', lineHeight: 0.95 }}
                    transition={layoutSpring}
                  >
                    Dhananjay
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeLine(0.52)} className="mt-3 max-w-[26rem]">
                  <p className="font-cormorant text-invite-ink-soft text-[clamp(0.98rem,2vw,1.08rem)] leading-relaxed">
                    Son of Pratibha and Vinod Jahagirdar
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div variants={instant} className="mt-8 flex flex-col items-center gap-2">
              <motion.div
                layoutId="invite-line-date"
                className="font-cinzel font-bold tracking-wide text-invite-wine"
                style={{ fontSize: 'clamp(1.05rem, 2.6vw, 1.6rem)' }}
                transition={layoutSpring}
              >
                {WEDDING_DATE_LINE}
              </motion.div>
            </motion.div>

            <motion.div variants={countdownReveal} className="w-full">
              <Countdown targetIso="2027-02-14T09:30:00+05:30" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
