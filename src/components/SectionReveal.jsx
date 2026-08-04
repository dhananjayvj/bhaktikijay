import React from 'react'
import { motion } from 'framer-motion'
import {
  gpuLayerStyle,
  sectionContainer,
  sectionItem,
  sectionItemScale,
  viewportOnce,
} from '../constants/motion.js'

const motionTags = {
  section: motion.section,
  div: motion.div,
  footer: motion.footer,
}

export function RevealItem({ children, className = '', variant = 'fadeUp', as = 'div', ...props }) {
  const MotionTag = motionTags[as] ?? motion.div
  const variants = variant === 'scale' ? sectionItemScale : sectionItem

  return (
    <MotionTag className={className} variants={variants} style={gpuLayerStyle} {...props}>
      {children}
    </MotionTag>
  )
}

export default function SectionReveal({
  as = 'section',
  className = '',
  children,
  id,
  viewport = viewportOnce,
  ...rest
}) {
  const MotionTag = motionTags[as] ?? motion.section

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={sectionContainer}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
