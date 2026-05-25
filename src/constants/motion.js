/** Cinematic ease — use for entry fades and layout handoffs */
export const easeOutCubic = [0.33, 1, 0.68, 1]

export const staggerChildren = 0.15

export const fadeUpDuration = 0.85

export const layoutHandoff = {
  duration: 0.85,
  ease: easeOutCubic,
}

export const sectionReveal = {
  duration: fadeUpDuration,
  ease: easeOutCubic,
}

export const gpuLayerStyle = { willChange: 'transform, opacity' }
