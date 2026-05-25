import React, { useEffect } from 'react'
import { backdropImageUrl, preloadRevealAssets } from '../utils/preloadRevealAssets.js'

/** Hidden decode targets — mounts once at app root before seal interaction */
export default function RevealAssetPreloader() {
  useEffect(() => {
    preloadRevealAssets()
  }, [])

  return (
    <img
      src={backdropImageUrl}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="low"
      className="pointer-events-none fixed h-0 w-0 opacity-0"
    />
  )
}
