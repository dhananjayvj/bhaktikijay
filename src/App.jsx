import React, { useCallback, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import Overlay from './components/Overlay.jsx'
import MainPageContent from './components/MainPageContent.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import RevealAssetPreloader from './components/RevealAssetPreloader.jsx'
import AmbientFlute from './components/AmbientFlute.jsx'

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(true)
  /** True once the letter zoom starts so Hero can render under the fading backdrop (avoids blank gap). */
  const [heroReveal, setHeroReveal] = useState(false)

  const handleOverlayClose = useCallback(() => setOverlayOpen(false), [])
  const handleExpandingStart = useCallback(() => setHeroReveal(true), [])

  const inviteRevealed = heroReveal || !overlayOpen

  return (
    <LayoutGroup id="invite">
      <RevealAssetPreloader />
      <AmbientFlute active={heroReveal} />

      <div className="relative min-h-dvh min-h-[100svh] w-full bg-cream">
        <AnimatePresence>
          {overlayOpen && (
            <Overlay onClose={handleOverlayClose} onExpandingStart={handleExpandingStart} />
          )}
        </AnimatePresence>

        <ScrollProgressBar />

        <MainPageContent
          inviteRevealed={inviteRevealed}
          skipIntro={heroReveal}
          sparklesDisabled={overlayOpen}
        />
      </div>
    </LayoutGroup>
  )
}
