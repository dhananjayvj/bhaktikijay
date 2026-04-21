import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useScroll } from 'framer-motion'
import Overlay from './components/Overlay.jsx'
import Hero from './components/Hero.jsx'
import CouplePortrait from './components/CouplePortrait.jsx'

const Timeline = React.lazy(() => import('./components/Timeline.jsx'))
const Venue = React.lazy(() => import('./components/Venue.jsx'))
const RSVP = React.lazy(() => import('./components/RSVP.jsx'))
const Footer = React.lazy(() => import('./components/Footer.jsx'))

const sparkleChars = ['✦', '✧', '✸']
const sparkleColors = ['#D4AF37', '#E2725B']

function isInteractiveTarget(target) {
  if (!target || !target.closest) return false
  return Boolean(
    target.closest('a,button,input,textarea,select,label,form,[role="button"],[data-no-sparkle="true"]'),
  )
}

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(true)
  /** True once the letter zoom starts so Hero can render under the fading backdrop (avoids blank gap). */
  const [heroReveal, setHeroReveal] = useState(false)
  const [sparkles, setSparkles] = useState([])
  const mainCardRef = useRef(null)

  const { scrollYProgress } = useScroll()

  const progressBarStyle = useMemo(
    () => ({
      background: 'linear-gradient(90deg, #D4AF37, #E2725B)',
    }),
    [],
  )

  const removeSparkle = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const spawnSparklesAt = useCallback(
    (clientX, clientY) => {
      const el = mainCardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const now = Date.now()
      const newOnes = Array.from({ length: 5 }).map((_, i) => {
        const char = sparkleChars[Math.floor(Math.random() * sparkleChars.length)]
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
        return {
          id: `${now}-${i}-${Math.random().toString(16).slice(2)}`,
          x,
          y,
          char,
          color,
        }
      })

      setSparkles((prev) => [...prev, ...newOnes])
    },
    [],
  )

  const onMainCardClick = useCallback(
    (e) => {
      if (!overlayOpen) {
        if (isInteractiveTarget(e.target)) return
        spawnSparklesAt(e.clientX, e.clientY)
      }
    },
    [overlayOpen, spawnSparklesAt],
  )

  useEffect(() => {
    const el = mainCardRef.current
    if (!el) return
    const handler = (e) => onMainCardClick(e)
    el.addEventListener('click', handler)
    return () => {
      el.removeEventListener('click', handler)
    }
  }, [onMainCardClick])

  return (
    <LayoutGroup id="invite">
      <div className="relative min-h-dvh min-h-[100svh] w-full bg-cream">
        <AnimatePresence>
          {overlayOpen && (
            <Overlay
              onClose={() => setOverlayOpen(false)}
              onExpandingStart={() => setHeroReveal(true)}
            />
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          title="Scroll progress"
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left shadow-[0_1px_6px_rgba(212,175,55,0.35)]"
          style={{ ...progressBarStyle, scaleX: scrollYProgress }}
        />

        <div ref={mainCardRef} className="relative z-[2]">
          <Hero inviteRevealed={heroReveal || !overlayOpen} skipIntro={heroReveal} />
          <CouplePortrait />

          <Suspense fallback={null}>
            <Timeline />
            <Venue />
            <RSVP />
            <Footer />
          </Suspense>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {sparkles.map((s) => (
              <motion.span
                key={s.id}
                className="absolute select-none text-2xl leading-none"
                style={{
                  left: s.x,
                  top: s.y,
                  color: s.color,
                  willChange: 'transform',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onAnimationComplete={() => removeSparkle(s.id)}
              >
                {s.char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </LayoutGroup>
  )
}

