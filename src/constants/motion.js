/** Smooth cinematic eases — silk-like handoffs */
export const easeOutCubic = [0.33, 1, 0.68, 1]

export const easeSmooth = [0.22, 1, 0.36, 1]

export const easeSilk = [0.16, 1, 0.3, 1]

export const easeInOutCubic = [0.65, 0, 0.35, 1]

export const staggerChildren = 0.12

export const fadeUpDuration = 1.05

export const heroLineRevealDuration = 1.35

export const heroLineRisePx = 10

export const layoutHandoff = {
  duration: 1,
  ease: easeSilk,
}

export const sectionReveal = {
  duration: fadeUpDuration,
  ease: easeSilk,
}

export const gpuLayerStyle = { willChange: 'transform, opacity' }

export const viewportOnce = { once: true, amount: 0.12, margin: '0px 0px -5% 0px' }

export const springGentle = { type: 'spring', stiffness: 140, damping: 22, mass: 0.95 }

export const springSilk = { type: 'spring', stiffness: 100, damping: 18, mass: 1.05 }

export const springSnappy = { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 }

export const sectionContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

export const sectionItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: fadeUpDuration, ease: easeSilk },
  },
}

export const sectionItemScale = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: easeSilk },
  },
}

export const heroStaggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
}

export const heroStaggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeSilk },
  },
}

export const lazySectionEnter = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeSilk },
  },
}

export const formContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export const formField = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSilk },
  },
}

export const pillReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springSilk,
  },
}

export const pillContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.03 },
  },
}
