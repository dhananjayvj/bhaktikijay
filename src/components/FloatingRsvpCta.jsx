import React, { memo } from 'react'
import { useScrollPastHero } from '../hooks/useScrollPastHero.js'

function FloatingRsvpCta({ visible }) {
  const pastHero = useScrollPastHero(visible)

  if (!visible || !pastHero) return null

  return (
    <a
      href="#rsvp"
      className="btn-primary fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[54] -translate-x-1/2 shadow-premium sm:hidden"
    >
      RSVP
    </a>
  )
}

export default memo(FloatingRsvpCta)
