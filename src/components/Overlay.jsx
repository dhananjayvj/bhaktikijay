import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { gpuLayerStyle } from '../constants/motion.js'
import { curtainEase, CURTAIN_DURATION } from '../constants/revealMotion.js'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import WeddingDoodles from './WeddingDoodles.jsx'
import { playSealBreakFeedback } from '../utils/sealFeedback.js'
import ganeshImg from '../../images/Ganesh.jpeg'

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E")`

function CurtainOrnament({ side }) {
  const flip = side === 'right'
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* inner gold border */}
      <div className="absolute inset-3 rounded-[0.9rem] border-2 border-[#D4AF37]/55 shadow-[inset_0_0_12px_rgba(212,175,55,0.12)]" />
      <div className="absolute inset-[18px] rounded-[0.85rem] border border-[#7A2E3F]/22" />

      {/* corner filigree */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute top-3 ${flip ? 'right-3' : 'left-3'} h-24 w-24 opacity-[0.48]`}
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path
          d="M20 40c26-14 54-16 76 2 10 8 16 18 18 31-15-12-32-18-50-17 16 10 28 24 33 44-16-10-33-14-52-11 10 8 18 18 22 32-22-18-44-22-71-15 6-18 11-33 24-46-18 0-34 6-50 18 4-20 12-36 26-48 6-6 14-11 24-15Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 58c22-10 44-10 61 4"
          fill="none"
          stroke="#E2725B"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 200 200"
        className={`absolute bottom-3 ${flip ? 'left-3' : 'right-3'} h-24 w-24 opacity-[0.44]`}
        style={{ transform: flip ? 'scaleX(-1) rotate(180deg)' : 'rotate(180deg)' }}
      >
        <path
          d="M20 40c26-14 54-16 76 2 10 8 16 18 18 31-15-12-32-18-50-17 16 10 28 24 33 44-16-10-33-14-52-11 10 8 18 18 22 32-22-18-44-22-71-15 6-18 11-33 24-46-18 0-34 6-50 18 4-20 12-36 26-48 6-6 14-11 24-15Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* side watermark */}
      <div
        className={`absolute top-1/2 ${side === 'left' ? 'left-3' : 'right-3'} h-[70%] w-[42%] -translate-y-1/2 opacity-[0.16]`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.28), transparent 55%), radial-gradient(circle at 70% 65%, rgba(226,114,91,0.22), transparent 58%)',
          filter: 'blur(0.2px)',
        }}
      />
    </div>
  )
}

/** Static shadows only — animating box-shadow every frame causes layout/paint jank on mobile. */
function curtainPaperShadowStatic(side) {
  const edge =
    side === 'left'
      ? 'inset -12px 0 32px 2px rgba(0,0,0,0.1)'
      : 'inset 12px 0 32px 2px rgba(0,0,0,0.1)'
  return [
    edge,
    '0 22px 48px rgba(0, 0, 0, 0.14)',
    '0 8px 20px rgba(0, 0, 0, 0.08)',
    'inset 0 1px 0 rgba(255, 255, 255, 0.45)',
  ].join(', ')
}

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
          backgroundImage: 'url(/doodle-pattern-elegant.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '420px 420px',
          backgroundPosition: 'center',
          opacity: 0.22,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% 45%, transparent 0%, transparent 42%, rgba(12, 14, 20, 0.55) 100%)',
        }}
      />
      <WeddingDoodles position="absolute" />
    </motion.div>
  )
}

/** Single organic seal at the curtain seam — visual + hit target aligned */
function WaxSealCenter({ size, idle, pressed, onSealPress, onPressChange }) {
  const wrapClass = pressed ? 'wax-seal-wrap wax-seal-wrap--pressed' : 'wax-seal-wrap'

  return (
    <button
      type="button"
      data-no-sparkle="true"
      disabled={!idle}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (idle) onSealPress()
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        if (idle) onPressChange(true)
      }}
      onPointerUp={() => onPressChange(false)}
      onPointerLeave={() => onPressChange(false)}
      onPointerCancel={() => onPressChange(false)}
      className={`wax-seal-hit-target absolute left-1/2 top-1/2 z-[30] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center border-0 bg-transparent p-0 outline-none ${wrapClass}`}
      style={{
        width: size,
        height: size * 0.94,
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label="Tap to open the invitation"
    >
      <span className="wax-seal-face" aria-hidden="true">
        <span
          className={`wax-monogram-gold font-cinzel text-[clamp(1.55rem,5.5vw,2.05rem)] leading-none ${
            idle && !pressed ? 'wax-monogram-shimmer' : ''
          }`}
        >
          B
        </span>
        <span
          className={`wax-monogram-gold font-cinzel text-[clamp(1.55rem,5.5vw,2.05rem)] leading-none ${
            idle && !pressed ? 'wax-monogram-shimmer' : ''
          }`}
        >
          D
        </span>
      </span>
    </button>
  )
}

function CurtainPaper({ side, children }) {
  return (
    <div
      className={`paper-parchment relative z-[1] h-full w-full overflow-hidden border-2 border-invite-wine/28 bg-[linear-gradient(168deg,#faf6ef_0%,#f0e9dc_52%,#e8dfd2_100%)] ${
        side === 'left' ? 'rounded-l-xl border-r-0' : 'rounded-r-xl border-l-0'
      }`}
      style={{ boxShadow: curtainPaperShadowStatic(side) }}
    >
      <CurtainOrnament side={side} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38] mix-blend-multiply"
        style={{
          backgroundImage: noiseSvg,
          backgroundSize: '140px 140px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(122,46,63,0.02) 3px, rgba(122,46,63,0.02) 4px)',
        }}
      />
      {children}
    </div>
  )
}

function CurtainReveal({ phase, onSealPress, curtainProgress }) {
  const idle = phase === 'closed'
  const [sealPressed, setSealPressed] = useState(false)

  const waxSize = 108

  const xLeft = useTransform(curtainProgress, [0, 1], ['0%', '-100%'])
  const xRight = useTransform(curtainProgress, [0, 1], ['0%', '100%'])
  const rotLeft = useTransform(curtainProgress, [0, 1], [0, -4])
  const rotRight = useTransform(curtainProgress, [0, 1], [0, 4])
  const zLift = useTransform(curtainProgress, [0, 1], [0, 18])

  // Keep inner lighting static during reveal to avoid flicker/jitter.

  return (
    <div className="envelope-stage mx-auto w-full max-w-[min(96vw,28rem)] px-1">
      <div className="envelope-card relative min-h-0">
        <div
          className="pointer-events-none absolute -inset-2 z-0 rounded-[1.35rem] opacity-[0.95]"
          style={{
            background:
              'radial-gradient(ellipse 90% 75% at 50% 38%, rgba(255, 250, 242, 0.28) 0%, rgba(255, 245, 236, 0.08) 45%, transparent 70%)',
            mixBlendMode: 'soft-light',
          }}
          aria-hidden="true"
        />

        <div
          className="relative z-[1] mx-auto h-full min-h-0 w-full overflow-hidden rounded-xl ring-2 ring-[#D4AF37]/35 ring-offset-2 ring-offset-transparent"
          style={{
            boxShadow:
              '0 4px 0 rgba(0,0,0,0.03), 0 0 0 1px rgba(122,46,63,0.12), 0 18px 40px rgba(0,0,0,0.12)',
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
          }}
        >
        {/* Background behind curtains is the full-screen Ganesh/beige layer (outside this card). */}

        <motion.div
          className="curtain-3d-panel absolute inset-y-0 left-0 z-[4] w-1/2"
          style={{
            x: xLeft,
            rotateY: rotLeft,
            z: zLift,
            transformOrigin: 'right center',
            transformPerspective: 1400,
            ...gpuLayerStyle,
          }}
        >
          <CurtainPaper side="left" />
        </motion.div>

        <motion.div
          className="curtain-3d-panel absolute inset-y-0 right-0 z-[4] w-1/2"
          style={{
            x: xRight,
            rotateY: rotRight,
            z: zLift,
            transformOrigin: 'left center',
            transformPerspective: 1400,
            ...gpuLayerStyle,
          }}
        >
          <CurtainPaper side="right" />
        </motion.div>

        {idle ? (
          <WaxSealCenter
            size={waxSize}
            idle={idle}
            pressed={sealPressed}
            onPressChange={setSealPressed}
            onSealPress={onSealPress}
          />
        ) : null}
        </div>
      </div>

      <p
        className={`relative z-[4] shrink-0 py-3 text-center font-cormorant text-sm italic tracking-[0.2em] text-white/70 sm:py-4 ${
          idle ? 'opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-[400ms]`}
      >
        Tap to open
      </p>
    </div>
  )
}

function SpotlightVignette({ hidden, curtainProgress }) {
  const edgeDim = useTransform(curtainProgress, [0, 0.5, 1], [0.38, 0.28, 0.2])
  const bg = useTransform(
    edgeDim,
    (d) =>
      `radial-gradient(ellipse 75% 65% at 50% 42%, transparent 0%, transparent 38%, rgba(12, 10, 18, ${d}) 100%)`,
  )

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-multiply"
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: curtainEase }}
      style={{
        background: bg,
        willChange: 'opacity',
      }}
    />
  )
}

function Overlay({ onClose, onHeroShellStart, onHeroTextStart, onRevealStart }) {
  const [phase, setPhase] = useState('closed')
  const [notified, setNotified] = useState(false)

  const curtainProgress = useMotionValue(0)
  const curtainAnimRef = useRef(null)

  useEffect(() => {
    const prevBody = document.body.style.overflow || ''
    const prevHtml = document.documentElement.style.overflow || ''
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    return () => {
      document.body.style.overflow = prevBody || 'auto'
      document.documentElement.style.overflow = prevHtml || ''
      document.body.style.overscrollBehavior = ''
    }
  }, [])

  useEffect(() => {
    return () => curtainAnimRef.current?.stop()
  }, [])

  useEffect(() => {
    if (phase !== 'open') return
    const t = window.setTimeout(() => {
      setPhase('handoff')
      onHeroShellStart?.()
      // Let Ganesh/beige fade finish before mounting heavy Hero text.
      window.setTimeout(() => {
        onHeroTextStart?.()
      }, 500)
    }, 300)
    return () => window.clearTimeout(t)
  }, [phase, onHeroShellStart, onHeroTextStart])

  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const handleSealPress = useCallback(() => {
    if (phaseRef.current !== 'closed') return
    playSealBreakFeedback()
    onRevealStart?.()
    curtainAnimRef.current?.stop()
    curtainProgress.set(0)
    setPhase('opening')
    curtainAnimRef.current = animate(curtainProgress, 1, {
      duration: CURTAIN_DURATION,
      ease: curtainEase,
      onComplete: () => {
        setPhase('open')
      },
    })
  }, [curtainProgress, onRevealStart])

  const finishAndClose = () => {
    if (notified) return
    setNotified(true)
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = ''
    document.body.style.overscrollBehavior = ''
    onClose()
  }

  const tapTarget = phase === 'closed' || phase === 'opening'
  const ganeshOpacity = phase === 'handoff' ? 0 : phase === 'opening' || phase === 'open' ? 1 : 0

  return (
    <motion.div
      className={`overlay-envelope-lock viewport-fill fixed inset-0 z-50 overflow-hidden ${
        tapTarget ? 'cursor-default' : 'pointer-events-none'
      }`}
      aria-label="Invitation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'handoff' ? 0 : 1 }}
      transition={{ duration: phase === 'handoff' ? 0.5 : 0.2, ease: [0.33, 1, 0.68, 1] }}
      onAnimationComplete={() => {
        if (phase === 'handoff') finishAndClose()
      }}
    >
      <SpotlightVignette hidden={false} curtainProgress={curtainProgress} />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(122, 46, 63, 0.22), transparent 55%), linear-gradient(165deg, #0c0e14 0%, #141822 45%, #0a0c10 100%)',
        }}
        initial={false}
        animate={{ opacity: phase === 'handoff' ? 0 : 1 }}
        transition={{ duration: 0.55, ease: curtainEase }}
      />

      <OutsideAreaDoodles hidden={phase === 'handoff'} />

      {/* Step 1/2: Beige paper + Ganesh revealed by curtains, then fades out for handoff */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[6] bg-[#F4E8DB]"
        initial={false}
        animate={{ opacity: ganeshOpacity }}
        transition={{ duration: phase === 'handoff' ? 0.5 : 0.2, ease: [0.33, 1, 0.68, 1] }}
        aria-hidden="true"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={ganeshImg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-auto object-contain"
          decoding="async"
          loading="eager"
          style={{ willChange: 'transform, opacity' }}
        />
      </motion.div>

      <div className="pointer-events-auto absolute inset-0 z-[30] flex items-center justify-center overflow-hidden p-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4">
        <motion.div
          className="relative flex w-[min(94vw,400px)] max-w-full flex-col items-center justify-center"
          initial={false}
          animate={{
            opacity: phase === 'handoff' ? 0 : 1,
          }}
          transition={{
            duration: phase === 'handoff' ? 0.65 : 0.25,
            ease: curtainEase,
          }}
          style={gpuLayerStyle}
        >
          <CurtainReveal
            phase={phase}
            onSealPress={handleSealPress}
            curtainProgress={curtainProgress}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default memo(Overlay)
