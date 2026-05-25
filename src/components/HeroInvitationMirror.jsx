import React from 'react'
import InviteHeroCopy from './InviteHeroCopy.jsx'

/** Envelope preview behind curtains — zooms with curtain progress (no fade). */
export default function HeroInvitationMirror() {
  return (
    <div className="pointer-events-none h-full min-h-0 w-full select-none" aria-hidden="true">
      <InviteHeroCopy variant="envelope" />
    </div>
  )
}
