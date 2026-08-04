import React, { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import InviteHeroCopy from './InviteHeroCopy.jsx'
import { backdropImageUrl } from '../utils/preloadRevealAssets.js'
import { easeOutCubic, gpuLayerStyle } from '../constants/motion.js'

const BACKDROP_MOUNT_DELAY_MS = 50
const BACKDROP_FADE_SEC = 3

const gridClass =
  'relative z-[2] mx-auto grid w-full max-w-5xl grid-rows-[auto_auto_auto] gap-y-5 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] text-center sm:gap-y-6 sm:px-6 sm:pb-16 sm:pt-10 md:gap-y-8 md:px-12 md:pb-24 md:pt-14'

function HeroParchmentLayers({ backdropOn }) {
  return (
    <>
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
          <div className="absolute inset-0 bg-[#faf6ef]/55 sm:bg-[#faf6ef]/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ef]/98 via-[#f0e9dc]/72 to-[#e8dfd2]/99 sm:from-[#faf6ef]/94 sm:via-[#f0e9dc]/58 sm:to-[#e8dfd2]/96" />
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

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 12% 20%, rgba(15,118,110,0.1) 0%, rgba(15,118,110,0) 52%), radial-gradient(circle at 88% 16%, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0) 50%), radial-gradient(circle at 50% 100%, rgba(236,253,245,0.5) 0%, rgba(255,251,235,0) 45%)',
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-x-hidden overflow-y-visible"
      style={{ perspective: '1000px' }}
    >
      {!inviteRevealed ? (
        <div className="min-h-[100svh] w-full" aria-hidden="true" />
      ) : (
        <>
          <div className="absolute inset-0 bg-invite-paper" style={bgStyle} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />
          <HeroParchmentLayers backdropOn={backdropOn} />
          <motion.div
            className={`${gridClass} hero-typography`}
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
              <div
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
              >
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
