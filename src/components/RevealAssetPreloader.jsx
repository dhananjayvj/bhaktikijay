import React, { useEffect } from 'react'
import { mobileBackdropImageUrl, preloadRevealAssets } from '../utils/preloadRevealAssets.js'

/** Hidden decode targets — mounts once at app root before seal interaction */
export default function RevealAssetPreloader() {
  useEffect(() => {
    preloadRevealAssets()
  }, [])

  return (
    <img src={mobileBackdropImageUrl} alt="" decoding="async" fetchPriority="low" className="pointer-events-none fixed h-0 w-0 opacity-0" aria-hidden="true" />
  )
}
