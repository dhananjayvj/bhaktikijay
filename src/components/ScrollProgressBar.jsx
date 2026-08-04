import React, { memo, useMemo } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'

function ScrollProgressBar() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const progressBarStyle = useMemo(
    () => ({
      background: 'linear-gradient(90deg, #0F766E, #D97706)',
      willChange: 'transform',
    }),
    [],
  )

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      title="Scroll progress"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left shadow-[0_1px_6px_rgba(212,175,55,0.35)]"
      style={{ ...progressBarStyle, scaleX: scrollYProgress }}
    />
  )
}

export default memo(ScrollProgressBar)
