/** Cinematic ease — use for entry fades and layout handoffs */
export const easeOutCubic = [0.33, 1, 0.68, 1]

export const easeInOutCubic = [0.65, 0, 0.35, 1]

export const staggerChildren = 0.15

export const fadeUpDuration = 0.85

/** Hero stationery line reveal */
export const heroLineRevealDuration = 1.2

export const heroLineRisePx = 10

export const layoutHandoff = {
  duration: 0.85,
  ease: easeOutCubic,
}

export const sectionReveal = {
  duration: fadeUpDuration,
  ease: easeOutCubic,
}

export const gpuLayerStyle = { willChange: 'transform, opacity' }

/** Shared whileInView — triggers slightly before section enters frame */
export const viewportOnce = { once: true, amount: 0.14, margin: '0px 0px -6% 0px' }

export const springGentle = { type: 'spring', stiffness: 260, damping: 26, mass: 0.85 }

export const springSnappy = { type: 'spring', stiffness: 420, damping: 30, mass: 0.75 }

/** Staggered section container + child items */
export const sectionContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

export const sectionItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: fadeUpDuration, ease: easeOutCubic },
  },
}

export const sectionItemScale = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: easeOutCubic },
  },
}

/** Hero copy line-by-line reveal after overlay handoff */
export const heroStaggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.06 },
  },
}

export const heroStaggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOutCubic },
  },
}

/** RSVP form field cascade */
export const formContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

export const formField = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOutCubic },
  },
}

export const pillReveal = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springSnappy,
  },
}

export const pillContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}
