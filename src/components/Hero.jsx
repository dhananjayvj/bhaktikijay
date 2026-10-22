import React, { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import InviteHeroCopy from './InviteHeroCopy.jsx'
import { backdropImageUrl } from '../utils/preloadRevealAssets.js'
import { easeOutCubic, gpuLayerStyle } from '../constants/motion.js'

const BACKDROP_MOUNT_DELAY_MS = 650
const BACKDROP_FADE_SEC = 1

const heroShellClass =
  'relative z-[2] mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-center sm:px-8 sm:pb-16 sm:pt-10 md:px-12 md:pb-20 md:pt-12'

function HeroParchmentLayers({ backdropOn }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="hero-paper-surface pointer-events-none absolute inset-x-2 top-4 bottom-4 z-0 overflow-hidden sm:inset-x-4 sm:top-8 sm:bottom-8"
      />
      {backdropOn ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-4 bottom-4 z-0 overflow-hidden rounded-[4px] sm:inset-x-4 sm:top-8 sm:bottom-8"
          style={gpuLayerStyle}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: BACKDROP_FADE_SEC, ease: easeOutCubic }}
            style={{
              backgroundImage: `url(${backdropImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="hero-photo-wash absolute inset-0" />
        </motion.div>
      ) : null}
    </>
  )
}

function Hero({ inviteRevealed = false, textActive = false }) {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('Copied!')
  const [backdropOn, setBackdropOn] = useState(false)
  const [compositeActive, setCompositeActive] = useState(true)

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
      className="relative flex min-h-[100svh] flex-col items-stretch justify-start overflow-x-hidden sm:items-center sm:justify-center"
      style={{ perspective: '1000px' }}
    >
      {!inviteRevealed ? (
        <div className="min-h-[100svh] w-full" aria-hidden="true" />
      ) : (
        <>
          <div className="absolute inset-0 bg-invite-paper" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />
          <HeroParchmentLayers backdropOn={backdropOn} />
          <motion.div
            className={`${heroShellClass} hero-typography w-full`}
            style={
              compositeActive
                ? {
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }
                : {
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setCompositeActive(false)}
          >
            <Toast message={toastMsg} open={toastOpen} onClose={() => setToastOpen(false)} />
            {textActive ? (
              <div className="w-full max-w-5xl">
                <InviteHeroCopy variant="full" />
                <a href="#couple" className="hero-scroll-cue motion-reduce:hidden">
                  <span>Explore</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 5v14M6 13l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ) : null}
          </motion.div>
        </>
      )}
    </section>
  )
}

export default memo(Hero)
