import mobileBackdropUrl from '../../images/melukote-heritage-mobile.webp'
import fluteUrl from '../../images/flute.mp3'

export { mobileBackdropUrl as mobileBackdropImageUrl }

let started = false
let fluteAudio = null

/**
 * Warm the small hero backdrop before the wax seal break.
 * Safe to call multiple times.
 */
export function preloadRevealAssets() {
  if (started) return
  started = true

  const img = new Image()
  img.decoding = 'async'
  img.src = mobileBackdropUrl
  if (typeof img.decode === 'function') {
    img.decode().catch(() => {})
  }

}

/** Reuse warmed Audio instance after preload (falls back if preload skipped). */
export function getPreloadedFluteAudio() {
  if (!fluteAudio) {
    fluteAudio = new Audio(fluteUrl)
    fluteAudio.loop = true
    fluteAudio.volume = 0.28
    fluteAudio.preload = 'none'
  }
  return fluteAudio
}
