import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeddingDoodles from './WeddingDoodles.jsx'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import { WEDDING_DATE_LINE } from '../constants/wedding.js'

const layoutSpring = { type: 'spring', stiffness: 360, damping: 32, mass: 0.9 }
const easeSmooth = [0.77, 0, 0.175, 1]

/** Imported tile patterns (see /public/*.svg) + corner ornaments — outside the letter only */
function OutsideAreaDoodles({ hidden }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/doodle-pattern-light.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '280px 280px',
          opacity: 0.4,
          mixBlendMode: 'soft-light',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/doodle-pattern-rsvp.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
          backgroundPosition: '60px 40px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />
      <WeddingDoodles position="absolute" />
    </motion.div>
  )
}

/** Animated front: SAVE THE DATE → B&D → full names → date → tap */
function LetterClosedFront({ phase, onIntroReady }) {
  const [step, setStep] = useState(1)
  /** Inline parent callbacks change every render — must not live in effect deps or the intro restarts in a loop. */
  const onIntroReadyRef = useRef(onIntroReady)
  onIntroReadyRef.current = onIntroReady

  useEffect(() => {
    if (phase !== 'closed') return
    setStep(1)
    const ids = [
      setTimeout(() => setStep(2), 850),
      setTimeout(() => setStep(3), 1950),
      setTimeout(() => setStep(4), 3100),
      setTimeout(() => setStep(5), 4200),
      setTimeout(() => onIntroReadyRef.current?.(), 4350),
    ]
    return () => ids.forEach(clearTimeout)
  }, [phase])

  const showTap = step >= 5 && phase === 'closed'
  const opening = phase === 'opening'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-invite-wine/30 bg-invite-ivory shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'linear-gradient(168deg, rgba(252,249,241,1) 0%, rgba(245,241,234,1) 45%, rgba(233,216,221,0.45) 100%)',
        }}
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-8">
        <div className="flex w-full max-w-[19rem] flex-col items-center gap-5 md:max-w-[21rem] md:gap-6">
          <motion.div
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="shrink-0"
          >
            <p className="font-lato text-invite-wine text-[11px] font-bold tracking-[0.35em] md:text-xs">SAVE THE DATE</p>
          </motion.div>

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="flex w-full flex-col items-center gap-3"
            >
              <div className="flex min-h-[4rem] w-full items-center justify-center md:min-h-[4.25rem]">
                <AnimatePresence mode="wait">
                    {step < 3 ? (
                      <motion.div
                        key="card-initials"
                        className="flex flex-nowrap items-baseline justify-center gap-[0.35em] px-1"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(6px)' }}
                        transition={{ duration: 0.28, ease: easeSmooth }}
                      >
                        <span
                          className="font-script shrink-0 text-invite-wine"
                          style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)', lineHeight: 1 }}
                        >
                          B
                        </span>
                        <span
                          className="font-script shrink-0 italic text-invite-mauve"
                          style={{ fontSize: 'clamp(1.15rem, 4.5vw, 2rem)', lineHeight: 1, paddingBottom: '0.15em' }}
                        >
                          &amp;
                        </span>
                        <span
                          className="font-script shrink-0 text-invite-wine"
                          style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)', lineHeight: 1 }}
                        >
                          D
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="card-fullnames"
                        className="flex flex-nowrap items-baseline justify-center gap-[0.35em] px-1"
                        initial={{ opacity: 0, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.5, ease: easeSmooth }}
                      >
                        <span
                          className="font-script shrink-0 text-invite-wine"
                          style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)', lineHeight: 1 }}
                        >
                          Bhakti
                        </span>
                        <span
                          className="font-script shrink-0 italic text-invite-mauve"
                          style={{ fontSize: 'clamp(1.15rem, 4.5vw, 2rem)', lineHeight: 1, paddingBottom: '0.15em' }}
                        >
                          &amp;
                        </span>
                        <span
                          className="font-script shrink-0 text-invite-wine"
                          style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)', lineHeight: 1 }}
                        >
                          Dhananjay
                        </span>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <p className="font-cormorant max-w-[18ch] text-invite-ink-soft text-sm italic leading-snug md:text-base">
                are getting married
              </p>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="font-cinzel shrink-0 font-bold tracking-[0.12em] text-invite-wine"
              style={{ fontSize: 'clamp(0.88rem, 3vw, 1.2rem)' }}
            >
              {WEDDING_DATE_LINE}
            </motion.div>
          )}

          {(showTap || opening) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeSmooth }}
              className="shrink-0"
            >
              <div className="rounded-full border border-invite-wine/45 bg-invite-wine px-5 py-2.5 shadow-md">
                <div className="font-lato text-invite-paper text-[10px] font-bold tracking-widest md:text-xs">
                  {opening ? 'Opening…' : 'Tap to open invite'}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Open letter: same narrative as Hero (kolam → names → date) for seamless handoff */
function LetterOpenFace({ overlayOwnsLayoutIds }) {
  const nameBlock = (layoutIdKey) =>
    overlayOwnsLayoutIds ? (
      <motion.div
        layoutId={layoutIdKey}
        className="font-script font-normal text-invite-wine"
        transition={layoutSpring}
        style={{ fontSize: 'clamp(1.85rem, 7vw, 3rem)', lineHeight: 0.95 }}
      >
        {layoutIdKey === 'invite-line-bhakti' ? 'Bhakti' : 'Dhananjay'}
      </motion.div>
    ) : (
      <div className="font-script font-normal text-invite-wine" style={{ fontSize: 'clamp(1.85rem, 7vw, 3rem)', lineHeight: 0.95 }}>
        {layoutIdKey === 'invite-line-bhakti' ? 'Bhakti' : 'Dhananjay'}
      </div>
    )

  const ampBlock = overlayOwnsLayoutIds ? (
    <motion.div
      layoutId="invite-line-amp"
      className="font-script italic font-normal text-invite-mauve"
      transition={layoutSpring}
      style={{ fontSize: 'clamp(1.25rem, 5vw, 2.4rem)', lineHeight: 1 }}
    >
      &amp;
    </motion.div>
  ) : (
    <div className="font-script italic font-normal text-invite-mauve" style={{ fontSize: 'clamp(1.25rem, 5vw, 2.4rem)', lineHeight: 1 }}>
      &amp;
    </div>
  )

  const dateBlock = overlayOwnsLayoutIds ? (
    <motion.div
      layoutId="invite-line-date"
      className="font-cinzel font-bold tracking-wide text-invite-wine"
      transition={layoutSpring}
      style={{ fontSize: 'clamp(0.88rem, 2.8vw, 1.2rem)' }}
    >
      {WEDDING_DATE_LINE}
    </motion.div>
  ) : (
    <div className="font-cinzel font-bold tracking-wide text-invite-wine" style={{ fontSize: 'clamp(0.88rem, 2.8vw, 1.2rem)' }}>{WEDDING_DATE_LINE}</div>
  )

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-4 py-3 text-center sm:gap-5 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeSmooth }}
        className="w-full max-w-[min(100%,20rem)] shrink-0 opacity-90"
      >
        <KolamWaveDivider compact />
      </motion.div>

      <div className="grid w-full max-w-[22rem] grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
        <div className="flex flex-col items-center gap-1.5 text-center">
          {nameBlock('invite-line-bhakti')}
          <p className="font-cormorant max-w-[14rem] text-invite-ink-soft text-[clamp(0.72rem,2.6vw,0.82rem)] leading-snug">
            Daughter of Medini and Manoj Tolmatti
          </p>
        </div>

        <div className="flex justify-center py-0.5 sm:pt-2">{ampBlock}</div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          {nameBlock('invite-line-dhananjay')}
          <p className="font-cormorant max-w-[14rem] text-invite-ink-soft text-[clamp(0.72rem,2.6vw,0.82rem)] leading-snug">
            Son of Pratibha and Vinod Jahagirdar
          </p>
        </div>
      </div>

      <div className="mt-1 shrink-0">{dateBlock}</div>
    </div>
  )
}

export default function Overlay({ onClose, onExpandingStart }) {
  const [phase, setPhase] = useState('closed')
  const [petals, setPetals] = useState([])
  const [notified, setNotified] = useState(false)
  const [introReady, setIntroReady] = useState(false)
  const handleIntroReady = useCallback(() => {
    setIntroReady(true)
  }, [])

  const overlayOwnsLayoutIds = phase === 'opening'

  useEffect(() => {
    const prev = document.body.style.overflow || ''
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev || 'auto'
    }
  }, [])

  useEffect(() => {
    if (phase !== 'opening') return
    const id = window.setTimeout(() => {
      onExpandingStart?.()
      setPhase('expanding')
    }, 1080)
    return () => window.clearTimeout(id)
  }, [phase, onExpandingStart])

  useEffect(() => {
    const next = Array.from({ length: 14 }).map((_, i) => {
      const left = Math.random() * 100
      const delay = Math.random() * 0.8 + i * 0.03
      const duration = 6.5 + Math.random() * 6
      const xDrift = (Math.random() - 0.5) * 120
      const rotate = (Math.random() - 0.5) * 40
      const size = 10 + Math.random() * 18
      const opacity = 0.25 + Math.random() * 0.25
      return { id: `petal-${i}`, left, delay, duration, xDrift, rotate, size, opacity }
    })
    setPetals(next)
  }, [])

  const handleOpen = () => {
    if (phase !== 'closed' || !introReady) return
    setPhase('opening')
  }

  const finishAndClose = () => {
    if (notified) return
    setNotified(true)
    document.body.style.overflow = 'auto'
    onClose()
  }

  const flipOpen = phase !== 'closed'
  const ambientHidden = phase === 'expanding' || phase === 'exiting'
  const tapTarget = phase === 'closed' || phase === 'opening'

  return (
    <motion.div
      className={`fixed inset-0 z-50 overflow-hidden ${
        tapTarget && (phase !== 'closed' || introReady) ? 'cursor-pointer' : 'cursor-default'
      }`}
      aria-label="Open the invitation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: phase === 'exiting' ? 0.5 : 0.2 }}
      onClick={tapTarget ? handleOpen : undefined}
      onAnimationComplete={() => {
        if (phase === 'exiting') finishAndClose()
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(122, 46, 63, 0.22), transparent 55%), linear-gradient(165deg, #0c0e14 0%, #141822 45%, #0a0c10 100%)',
        }}
        initial={false}
        animate={{ opacity: ambientHidden ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />

      <OutsideAreaDoodles hidden={ambientHidden} />

      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute z-[1]"
          style={{ left: `${p.left}%`, top: '-10vh', opacity: p.opacity }}
          initial={{ y: -40, x: 0, rotate: 0 }}
          animate={{
            y: ['-20vh', '120vh'],
            x: [0, p.xDrift],
            rotate: [0, p.rotate],
            opacity: ambientHidden ? 0 : [0, p.opacity, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: 'easeInOut',
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 100 100" fill="none">
            <path
              d="M50 10c-10 18-10 35 0 53 10-18 10-35 0-53z"
              stroke="#9a4a5c"
              strokeOpacity="0.5"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      ))}

      <div className="absolute inset-0 z-[2] flex items-center justify-center p-4">
        <div className="relative w-[min(88vw,380px)] max-h-[min(78vh,560px)] min-h-[320px]">
          <div className="relative mx-auto h-[min(72vh,520px)] w-full" style={{ perspective: 1400 }}>
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{ rotateY: flipOpen ? 180 : 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(1px)',
                }}
              >
                <LetterClosedFront phase={phase} onIntroReady={handleIntroReady} />
              </div>

              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(1px)',
                }}
              >
                <motion.div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-invite-wine/25 bg-invite-paper shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                  style={{
                    boxShadow:
                      'inset 0 0 0 1px rgba(122, 46, 63, 0.1), 0 28px 90px rgba(0,0,0,0.35)',
                    transformOrigin: 'center center',
                  }}
                  initial={false}
                  animate={{
                    scale: phase === 'expanding' || phase === 'exiting' ? 1.02 : 1,
                    opacity: phase === 'exiting' ? 0 : 1,
                  }}
                  transition={{
                    duration: phase === 'expanding' ? 0.85 : 0.4,
                    ease: [0.77, 0, 0.175, 1],
                  }}
                  onAnimationComplete={() => {
                    if (phase === 'expanding') setPhase('exiting')
                  }}
                >
                  <div
                    className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-9"
                    style={{
                      background:
                        'linear-gradient(175deg, rgba(252,249,241,1) 0%, rgba(250,247,242,1) 55%, rgba(245,241,234,1) 100%)',
                    }}
                  >
                    <LetterOpenFace overlayOwnsLayoutIds={overlayOwnsLayoutIds} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
