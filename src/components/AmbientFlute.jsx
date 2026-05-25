import React, { memo, useEffect, useRef } from 'react'
import { getPreloadedFluteAudio } from '../utils/preloadRevealAssets.js'

function AmbientFlute({ active }) {
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true

    const audio = getPreloadedFluteAudio()
    const p = audio.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})

    return () => {
      try {
        audio.pause()
      } catch {
        // ignore
      }
    }
  }, [active])

  return null
}

export default memo(AmbientFlute)
