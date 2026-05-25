import React, { useCallback, useState } from 'react'
import { AnimatePresence, useMotionValue } from 'framer-motion'
import Overlay from './components/Overlay.jsx'
import MainPageContent from './components/MainPageContent.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import RevealAssetPreloader from './components/RevealAssetPreloader.jsx'
import AmbientFlute from './components/AmbientFlute.jsx'

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(true)
  /** Shared 0→1 progress: curtain open + zoom; drives overlay preview and Hero in sync. */
  const curtainProgress = useMotionValue(0)
  /** True when seal breaks — Hero mounts and zooms with the envelope preview. */
  const [heroReveal, setHeroReveal] = useState(false)

  const handleOverlayClose = useCallback(() => setOverlayOpen(false), [])
  const handleExpandingStart = useCallback(() => setHeroReveal(true), [])

  const inviteRevealed = heroReveal || !overlayOpen

  return (
    <>
      <RevealAssetPreloader />
      <AmbientFlute active={heroReveal} />

      <div className="relative min-h-dvh min-h-[100svh] w-full bg-cream">
        <AnimatePresence>
          {overlayOpen && (
            <Overlay
              curtainProgress={curtainProgress}
              onClose={handleOverlayClose}
              onExpandingStart={handleExpandingStart}
            />
          )}
        </AnimatePresence>

        <ScrollProgressBar />

        <MainPageContent
          curtainProgress={curtainProgress}
          inviteRevealed={inviteRevealed}
          overlayOpen={overlayOpen}
          sparklesDisabled={overlayOpen}
        />
      </div>
    </>
  )
}
