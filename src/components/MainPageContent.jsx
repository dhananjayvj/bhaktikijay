import React, { memo, Suspense, useEffect, useRef, useState } from 'react'
import Hero from './Hero.jsx'
import CouplePortrait from './CouplePortrait.jsx'
import SparkleLayer from './SparkleLayer.jsx'
import LazySection from './LazySection.jsx'

const Timeline = React.lazy(() => import('./Timeline.jsx'))
const GuestGuide = React.lazy(() => import('./GuestGuide.jsx'))
const RSVP = React.lazy(() => import('./RSVP.jsx'))
const Footer = React.lazy(() => import('./Footer.jsx'))

function MainPageContent({ inviteRevealed, textActive = false, sparklesDisabled }) {
  const mainCardRef = useRef(null)
  const [sparklesEnabled, setSparklesEnabled] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    setSparklesEnabled(!coarse && !narrow)
  }, [])

  return (
    <main id="main" ref={mainCardRef} className="relative z-[2]">
      <Hero inviteRevealed={inviteRevealed} textActive={textActive} />
      <CouplePortrait />

      <Suspense fallback={null}>
        <LazySection>
          <Timeline />
        </LazySection>
        <LazySection>
          <GuestGuide />
        </LazySection>
        <LazySection>
          <RSVP />
        </LazySection>
        <LazySection>
          <Footer />
        </LazySection>
      </Suspense>

      <SparkleLayer containerRef={mainCardRef} disabled={sparklesDisabled || !sparklesEnabled} />
    </main>
  )
}

export default memo(MainPageContent)
