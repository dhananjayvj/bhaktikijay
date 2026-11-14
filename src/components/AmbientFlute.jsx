import React, { memo, useEffect } from 'react'
import { getPreloadedFluteAudio } from '../utils/preloadRevealAssets.js'

function AmbientFlute({ active, onPlaybackBlocked }) {
  useEffect(() => {
    if (!active) return undefined

    const audio = getPreloadedFluteAudio()
    let cancelled = false
    const p = audio.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        if (!cancelled) onPlaybackBlocked()
      })
    }

    return () => {
      cancelled = true
      audio.pause()
    }
  }, [active, onPlaybackBlocked])

  return null
}

export default memo(AmbientFlute)
