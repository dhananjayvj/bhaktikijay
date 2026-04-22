import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import WeddingDoodles from './WeddingDoodles.jsx'
import HeroInvitationMirror from './HeroInvitationMirror.jsx'
import { playSealBreakFeedback } from '../utils/sealFeedback.js'

/** Premium curtain motion (Material-style) */
const curtainEase = [0.4, 0, 0.2, 1]
const CURTAIN_DURATION = 1.15
const EXPAND_AFTER_MS = 1400

/** Matches Hero section paper lighting */
const invitePaperBg = {
  backgroundImage:
    'radial-gradient(circle at 12% 20%, rgba(122,46,63,0.08) 0%, rgba(122,46,63,0) 52%), radial-gradient(circle at 88% 16%, rgba(139,107,122,0.10) 0%, rgba(139,107,122,0) 50%), radial-gradient(circle at 50% 100%, rgba(233,216,221,0.35) 0%, rgba(250,247,242,0) 45%)',
}

const waxOrganicRadius = '48% 52% 47% 53% / 52% 48% 51% 49%'

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E")`

function CurtainOrnament({ side }) {
  const flip = side === 'right'
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* inner gold border */}
      <div className="absolute inset-3 rounded-[0.9rem] border border-[#D4AF37]/35" />
      <div className="absolute inset-[18px] rounded-[0.85rem] border border-[#7A2E3F]/10" />

      {/* corner filigree */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute top-3 ${flip ? 'right-3' : 'left-3'} h-24 w-24 opacity-[0.32]`}
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path
          d="M20 40c26-14 54-16 76 2 10 8 16 18 18 31-15-12-32-18-50-17 16 10 28 24 33 44-16-10-33-14-52-11 10 8 18 18 22 32-22-18-44-22-71-15 6-18 11-33 24-46-18 0-34 6-50 18 4-20 12-36 26-48 6-6 14-11 24-15Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.4"
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
        className={`absolute bottom-3 ${flip ? 'left-3' : 'right-3'} h-24 w-24 opacity-[0.28]`}
        style={{ transform: flip ? 'scaleX(-1) rotate(180deg)' : 'rotate(180deg)' }}
      >
        <path
          d="M20 40c26-14 54-16 76 2 10 8 16 18 18 31-15-12-32-18-50-17 16 10 28 24 33 44-16-10-33-14-52-11 10 8 18 18 22 32-22-18-44-22-71-15 6-18 11-33 24-46-18 0-34 6-50 18 4-20 12-36 26-48 6-6 14-11 24-15Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.4"
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

/** Beveled wax: layered inset highlights + deep shadow */
function WaxBlobHalf({ side, size }) {
  const halfW = size * 0.5
  return (
    <div
      className="relative h-full overflow-hidden"
      style={{
        width: halfW,
        height: size * 0.88,
        borderRadius: waxOrganicRadius,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 h-full"
        style={{
          width: size,
          [side === 'left' ? 'left' : 'right']: 0,
          borderRadius: waxOrganicRadius,
          background: `
            radial-gradient(ellipse 72% 62% at 38% 26%, rgba(200, 115, 130, 0.55) 0%, transparent 50%),
            radial-gradient(ellipse 88% 82% at 50% 100%, rgba(35, 6, 12, 0.5) 0%, transparent 46%),
            linear-gradient(158deg, #9b3348 0%, #6e1f30 36%, #4a1520 70%, #2c0a10 100%)
          `,
          boxShadow: `
            inset 3px 3px 8px rgba(255, 248, 235, 0.2),
            inset -4px -5px 12px rgba(0, 0, 0, 0.42),
            inset -2px -10px 18px rgba(0, 0, 0, 0.38),
            inset 0 2px 10px rgba(255, 230, 220, 0.08),
            inset 0 -12px 22px rgba(0, 0, 0, 0.45),
            ${side === 'left' ? '6px' : '-6px'} 0 14px rgba(0, 0, 0, 0.32)
          `,
        }}
      />
    </div>
  )
}

function WaxOnCurtain({ side, size, letter, shimmer }) {
  const engraved =
    side === 'left'
      ? '0 1px 0 rgba(255,255,255,0.12), 0 -1px 2px rgba(0,0,0,0.5), 2px 3px 4px rgba(0,0,0,0.35)'
      : '0 1px 0 rgba(255,255,255,0.12), 0 -1px 2px rgba(0,0,0,0.5), -2px 3px 4px rgba(0,0,0,0.35)'
  return (
    <div
      className={`pointer-events-none absolute top-1/2 z-[14] flex -translate-y-1/2 items-center ${
        side === 'left' ? 'right-0' : 'left-0'
      }`}
    >
      <div className="relative flex" style={{ width: size * 0.5, height: size * 0.88 }}>
        <WaxBlobHalf side={side} size={size} />
        <span
          className={`pointer-events-none absolute inset-0 flex items-center justify-center select-none text-[clamp(1.75rem,6vw,2.2rem)] leading-none ${
            shimmer ? 'wax-monogram-shimmer' : 'text-[#efd9d2]'
          }`}
          style={{
            fontFamily: "'Pinyon Script', 'Great Vibes', cursive",
            paddingLeft: side === 'left' ? '0.12em' : 0,
            paddingRight: side === 'right' ? '0.1em' : 0,
            ...(shimmer ? {} : { textShadow: engraved }),
          }}
        >
          {letter}
        </span>
      </div>
    </div>
  )
}

function CurtainPaper({ side, children }) {
  return (
    <div
      className={`paper-parchment relative z-[1] h-full w-full overflow-hidden border border-invite-wine/15 bg-[linear-gradient(168deg,#faf6ef_0%,#f0e9dc_52%,#e8dfd2_100%)] ${
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

  const waxSize = 108

  const xLeft = useTransform(curtainProgress, [0, 1], ['0%', '-100%'])
  const xRight = useTransform(curtainProgress, [0, 1], ['0%', '100%'])
  const rotLeft = useTransform(curtainProgress, [0, 1], [0, -4])
  const rotRight = useTransform(curtainProgress, [0, 1], [0, 4])
  const zLift = useTransform(curtainProgress, [0, 1], [0, 18])

  const innerScale = useTransform(curtainProgress, [0, 1], [0.985, 1])
  /** Cheap “brightening”: opacity on a white wash — avoids filter: brightness() repaints */
  const innerGlowOpacity = useTransform(curtainProgress, [0, 0.45, 1], [0, 0.06, 0.1])

  return (
    <div className="relative mx-auto w-full max-w-[min(96vw,28rem)] px-1">
      <div
        className="pointer-events-none absolute -inset-[min(10%,80px)] z-0 rounded-[1.5rem] opacity-[0.95]"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 38%, rgba(255, 250, 242, 0.2) 0%, rgba(255, 245, 236, 0.06) 45%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-[1] mx-auto flex min-h-0 w-full flex-col overflow-visible rounded-xl"
        style={{
          height: 'min(88svh, 44rem)',
          maxHeight: 'calc(100svh - 2.5rem)',
          boxShadow: '0 4px 0 rgba(0,0,0,0.03)',
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl border border-invite-wine/12 bg-invite-paper"
          style={{
            scale: innerScale,
          }}
        >
          <div className="absolute inset-0" style={invitePaperBg} />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-invite-blush/20"
            style={{ opacity: innerGlowOpacity }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-multiply"
            style={{
              backgroundImage: noiseSvg,
              backgroundSize: '160px 160px',
            }}
          />
          <div className="relative z-[2] flex h-full min-h-0 flex-col items-stretch overflow-y-auto overflow-x-hidden px-1 py-2 sm:px-2 sm:py-3">
            <HeroInvitationMirror />
          </div>
        </motion.div>

        <motion.div
          className="curtain-3d-panel absolute inset-y-0 left-0 z-[4] w-1/2"
          style={{
            x: xLeft,
            rotateY: rotLeft,
            z: zLift,
            transformOrigin: 'right center',
            transformPerspective: 1400,
          }}
        >
          <CurtainPaper side="left">
            <WaxOnCurtain side="left" size={waxSize} letter="B" shimmer={idle} />
          </CurtainPaper>
        </motion.div>

        <motion.div
          className="curtain-3d-panel absolute inset-y-0 right-0 z-[4] w-1/2"
          style={{
            x: xRight,
            rotateY: rotRight,
            z: zLift,
            transformOrigin: 'left center',
            transformPerspective: 1400,
          }}
        >
          <CurtainPaper side="right">
            <WaxOnCurtain side="right" size={waxSize} letter="D" shimmer={idle} />
          </CurtainPaper>
        </motion.div>

        {idle && (
          <button
            type="button"
            data-no-sparkle="true"
            onClick={(e) => {
              e.stopPropagation()
              onSealPress()
            }}
            className="absolute left-1/2 top-1/2 z-[20] min-h-[112px] min-w-[min(72%,200px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation rounded-full border-0 bg-transparent p-0 outline-none transition-transform hover:scale-[0.96] active:scale-[0.92]"
            style={{ borderRadius: waxOrganicRadius, WebkitTapHighlightColor: 'transparent' }}
            aria-label="Break the wax seal to open the invitation"
          />
        )}
      </div>

      <p
        className={`relative z-[4] mt-10 text-center font-cormorant text-sm italic text-invite-ink-soft/90 ${
          idle ? 'opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-[400ms]`}
      >
        Tap the seal to part the curtains
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
      }}
    />
  )
}

export default function Overlay({ onClose, onExpandingStart }) {
  const [phase, setPhase] = useState('closed')
  const [petals, setPetals] = useState([])
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
    if (phase !== 'opening') return
    const expandT = window.setTimeout(() => {
      setPhase('expanding')
    }, EXPAND_AFTER_MS)
    return () => {
      window.clearTimeout(expandT)
    }
  }, [phase])

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

  const handleSealPress = useCallback(() => {
    if (phase !== 'closed') return
    playSealBreakFeedback()
    curtainAnimRef.current?.stop()
    curtainProgress.set(0)
    curtainAnimRef.current = animate(curtainProgress, 1, {
      duration: CURTAIN_DURATION,
      ease: curtainEase,
    })
    setPhase('opening')
    requestAnimationFrame(() => {
      onExpandingStart?.()
    })
  }, [phase, onExpandingStart])

  const finishAndClose = () => {
    if (notified) return
    setNotified(true)
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = ''
    document.body.style.overscrollBehavior = ''
    onClose()
  }

  const ambientHidden = phase === 'expanding' || phase === 'exiting'
  const tapTarget = phase === 'closed' || phase === 'opening'

  return (
    <motion.div
      className={`viewport-fill fixed inset-0 z-50 touch-manipulation overflow-x-hidden overflow-y-hidden ${
        tapTarget ? 'cursor-default' : 'pointer-events-none'
      }`}
      aria-label="Invitation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: phase === 'exiting' ? 0.5 : 0.2 }}
      onAnimationComplete={() => {
        if (phase === 'exiting') finishAndClose()
      }}
    >
      <SpotlightVignette hidden={ambientHidden} curtainProgress={curtainProgress} />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(122, 46, 63, 0.22), transparent 55%), linear-gradient(165deg, #0c0e14 0%, #141822 45%, #0a0c10 100%)',
        }}
        initial={false}
        animate={{ opacity: ambientHidden ? 0 : 1 }}
        transition={{ duration: 0.55, ease: curtainEase }}
      />

      <OutsideAreaDoodles hidden={ambientHidden} />

      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute z-[1]"
          style={{ left: `${p.left}%`, top: '-10dvh', opacity: p.opacity }}
          initial={{ y: -40, x: 0, rotate: 0 }}
          animate={{
            y: ['-18dvh', '118dvh'],
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

      <div className="pointer-events-auto absolute inset-0 z-[30] flex items-center justify-center overflow-x-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
        <motion.div
          className="relative flex w-[min(94vw,400px)] max-w-full flex-col items-center justify-center"
          initial={false}
          animate={{
            scale: phase === 'expanding' || phase === 'exiting' ? 1.04 : 1,
            opacity: phase === 'exiting' || phase === 'expanding' ? 0 : 1,
          }}
          transition={{
            duration: phase === 'expanding' ? 0.88 : 0.42,
            ease: curtainEase,
          }}
          onAnimationComplete={() => {
            if (phase === 'expanding') setPhase('exiting')
          }}
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
