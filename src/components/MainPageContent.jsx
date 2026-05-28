import React, { memo, Suspense, useRef } from 'react'
import Hero from './Hero.jsx'
import CouplePortrait from './CouplePortrait.jsx'
import SparkleLayer from './SparkleLayer.jsx'

const Timeline = React.lazy(() => import('./Timeline.jsx'))
const Venue = React.lazy(() => import('./Venue.jsx'))
const RSVP = React.lazy(() => import('./RSVP.jsx'))
const Footer = React.lazy(() => import('./Footer.jsx'))

function MainPageContent({ inviteRevealed, textActive = false, sparklesDisabled }) {
  const mainCardRef = useRef(null)

  return (
    <div ref={mainCardRef} className="relative z-[2]">
      <Hero inviteRevealed={inviteRevealed} textActive={textActive} />
      <CouplePortrait />

      <Suspense fallback={null}>
        <Timeline />
        <Venue />
        <RSVP />
        <Footer />
      </Suspense>

      <SparkleLayer containerRef={mainCardRef} disabled={sparklesDisabled} />
    </div>
  )
}

export default memo(MainPageContent)
