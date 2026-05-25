import React from 'react'
import InviteHeroCopy from './InviteHeroCopy.jsx'

/** Envelope preview behind curtains — zooms with curtain progress (no fade). */
export default function HeroInvitationMirror() {
  return (
    <div className="envelope-preview-fit pointer-events-none w-full select-none" aria-hidden="true">
      <div className="envelope-preview-scaler">
        <InviteHeroCopy variant="envelope" />
      </div>
    </div>
  )
}
