import React, { useEffect } from 'react'
import {
  desktopBackdropImageUrl,
  mobileBackdropImageUrl,
  preloadRevealAssets,
} from '../utils/preloadRevealAssets.js'

/** Hidden decode targets — mounts once at app root before seal interaction */
export default function RevealAssetPreloader() {
  useEffect(() => {
    preloadRevealAssets()
  }, [])

  return (
    <picture className="pointer-events-none fixed h-0 w-0 opacity-0" aria-hidden="true">
      <source media="(max-width: 899px)" srcSet={mobileBackdropImageUrl} />
      <img src={desktopBackdropImageUrl} alt="" decoding="async" fetchPriority="low" className="h-0 w-0" />
    </picture>
  )
}
