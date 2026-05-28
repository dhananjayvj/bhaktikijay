import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Overlay from './components/Overlay.jsx'
import MainPageContent from './components/MainPageContent.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import RevealAssetPreloader from './components/RevealAssetPreloader.jsx'
import AmbientFlute from './components/AmbientFlute.jsx'

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(true)
  /** True once overlay hands off to Hero (step 3). */
  const [heroReveal, setHeroReveal] = useState(false)
  /** Start audio immediately on seal interaction / Ganesh reveal. */
  const [fluteActive, setFluteActive] = useState(false)

  const handleOverlayClose = useCallback(() => setOverlayOpen(false), [])
  const handleExpandingStart = useCallback(() => setHeroReveal(true), [])
  const handleRevealStart = useCallback(() => setFluteActive(true), [])

  const inviteRevealed = heroReveal || !overlayOpen

  return (
    <>
      <RevealAssetPreloader />
      <AmbientFlute active={fluteActive} />

      <div className="relative min-h-dvh min-h-[100svh] w-full bg-cream">
        <AnimatePresence>
          {overlayOpen && (
            <Overlay
              onClose={handleOverlayClose}
              onExpandingStart={handleExpandingStart}
              onRevealStart={handleRevealStart}
            />
          )}
        </AnimatePresence>

        <ScrollProgressBar />

        <MainPageContent
          inviteRevealed={inviteRevealed}
          sparklesDisabled={overlayOpen}
        />
      </div>
    </>
  )
}
