import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Overlay from './components/Overlay.jsx'
import MainPageContent from './components/MainPageContent.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import SiteNav from './components/SiteNav.jsx'
import FloatingRsvpCta from './components/FloatingRsvpCta.jsx'
import RevealAssetPreloader from './components/RevealAssetPreloader.jsx'
import AmbientFlute from './components/AmbientFlute.jsx'

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(true)
  /** Step 3 shell: fade in hero background while Ganesh fades out. */
  const [heroShell, setHeroShell] = useState(false)
  /** Heavy typography mounts only after the Ganesh fade completes. */
  const [heroText, setHeroText] = useState(false)
  /** Start audio immediately on seal interaction / Ganesh reveal. */
  const [fluteActive, setFluteActive] = useState(false)

  const handleOverlayClose = useCallback(() => setOverlayOpen(false), [])
  const handleHeroShellStart = useCallback(() => setHeroShell(true), [])
  const handleHeroTextStart = useCallback(() => setHeroText(true), [])
  const handleRevealStart = useCallback(() => setFluteActive(true), [])

  const inviteRevealed = heroShell || !overlayOpen

  return (
    <>
      <RevealAssetPreloader />
      <AmbientFlute active={fluteActive} />

      <div className="relative min-h-dvh min-h-[100svh] w-full bg-cream">
        <div className="site-grain" aria-hidden="true" />
        <AnimatePresence>
          {overlayOpen && (
            <Overlay
              onClose={handleOverlayClose}
              onHeroShellStart={handleHeroShellStart}
              onHeroTextStart={handleHeroTextStart}
              onRevealStart={handleRevealStart}
            />
          )}
        </AnimatePresence>

        <ScrollProgressBar />

        <SiteNav visible={inviteRevealed} />
        <FloatingRsvpCta visible={inviteRevealed} />

        <MainPageContent
          inviteRevealed={inviteRevealed}
          textActive={heroText}
          sparklesDisabled={overlayOpen}
        />
      </div>
    </>
  )
}
