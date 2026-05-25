import React, { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Toast from './Toast.jsx'
import InviteHeroCopy from './InviteHeroCopy.jsx'
import { backdropImageUrl } from '../utils/preloadRevealAssets.js'
import { REVEAL_ORIGIN } from '../constants/revealMotion.js'
import { useInviteRevealTransform } from '../hooks/useInviteRevealTransform.js'
import {
  easeOutCubic,
  gpuLayerStyle,
  heroLineRevealDuration,
  heroLineRisePx,
  staggerChildren,
} from '../constants/motion.js'

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

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren: 0.15 },
  },
}

const BACKDROP_MOUNT_DELAY_MS = 2600
const BACKDROP_FADE_SEC = 3

const gridClass =
  'relative mx-auto w-full max-w-5xl px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] text-center sm:px-6 sm:pb-16 sm:pt-10 md:px-12 md:pb-24 md:pt-14'

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

function Hero({
  inviteRevealed = false,
  skipIntro = false,
  syncReveal = false,
  curtainProgress,
}) {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('Copied!')
  const [backdropOn, setBackdropOn] = useState(false)
  const { contentScale, contentY } = useInviteRevealTransform(curtainProgress)

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 12% 20%, rgba(122,46,63,0.08) 0%, rgba(122,46,63,0) 52%), radial-gradient(circle at 88% 16%, rgba(139,107,122,0.10) 0%, rgba(139,107,122,0) 50%), radial-gradient(circle at 50% 100%, rgba(233,216,221,0.35) 0%, rgba(250,247,242,0) 45%)',
    }),
    [],
  )

  useEffect(() => {
    if (!inviteRevealed || syncReveal) {
      if (!inviteRevealed) setBackdropOn(false)
      return
    }
    const t = window.setTimeout(() => setBackdropOn(true), BACKDROP_MOUNT_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [inviteRevealed, syncReveal])

  const revealLayerStyle = syncReveal
    ? {
        scale: contentScale,
        y: contentY,
        transformOrigin: REVEAL_ORIGIN,
        ...gpuLayerStyle,
      }
    : undefined

  const inviteBody = (
    <>
      {!syncReveal ? <HeroParchmentLayers backdropOn={backdropOn} /> : null}
      <Toast message={toastMsg} open={toastOpen} onClose={() => setToastOpen(false)} />
      <InviteHeroCopy variant="full" />
    </>
  )

  return (
    <>
      {syncReveal ? <div className="min-h-[100svh] w-full" aria-hidden="true" /> : null}
      <section
        id="invitation"
        className={`overflow-x-hidden overflow-y-visible ${
          syncReveal ? 'pointer-events-none fixed inset-0 z-[45] flex min-h-0 items-center justify-center' : 'relative min-h-[100svh]'
        }`}
      >
      {!syncReveal ? (
        <>
          <div className="absolute inset-0 bg-invite-paper" style={bgStyle} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-invite-paper/0 via-invite-paper/0 to-invite-ivory/80" />
        </>
      ) : null}

      {!inviteRevealed ? (
        <div className="relative min-h-dvh min-h-[100svh] w-full" aria-hidden="true" />
      ) : syncReveal ? (
        <motion.div className={`${gridClass} w-full`} style={revealLayerStyle}>
          {inviteBody}
        </motion.div>
      ) : skipIntro ? (
        <motion.div
          className={`${gridClass} grid min-h-[100svh] grid-rows-[auto_auto_auto] gap-y-5 sm:gap-y-6 md:gap-y-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: easeOutCubic }}
        >
          {inviteBody}
        </motion.div>
      ) : (
        <motion.div
          className={`${gridClass} grid min-h-[100svh] grid-rows-[auto_auto_auto] gap-y-5 sm:gap-y-6 md:gap-y-8`}
          initial="hidden"
          animate="show"
          variants={heroStagger}
        >
          {inviteBody}
        </motion.div>
      )}
      </section>
    </>
  )
}

export default memo(Hero)
