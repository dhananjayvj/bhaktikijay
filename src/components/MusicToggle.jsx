import React, { memo } from 'react'
import { useScrollPastHero } from '../hooks/useScrollPastHero.js'

function MusicToggle({ playing, onToggle }) {
  const pastHero = useScrollPastHero(true)

  return (
    <button
      type="button"
      className={`music-toggle${playing ? ' music-toggle--playing' : ''}`}
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
      aria-pressed={playing}
      title={playing ? 'Turn music off' : 'Turn music on'}
      onClick={onToggle}
      data-no-sparkle="true"
    >
      {playing && !pastHero && <span className="music-toggle__hint" aria-hidden="true">Tap to mute</span>}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path d="M10 17.5V4.5c3.5.2 6.8 2.1 6.8 5.5 0 1.7-.7 3.1-2.1 4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="7.3" cy="17.8" rx="2.8" ry="1.9" transform="rotate(-20 7.3 17.8)" stroke="currentColor" strokeWidth="1.7" />
        {!playing && <path d="M3.5 3.5 20.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
      </svg>
    </button>
  )
}

export default memo(MusicToggle)
