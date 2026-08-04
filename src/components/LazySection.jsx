import React, { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { lazySectionEnter } from '../constants/motion.js'

function LazySection({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      variants={lazySectionEnter}
    >
      {children}
    </motion.div>
  )
}

export default memo(LazySection)
