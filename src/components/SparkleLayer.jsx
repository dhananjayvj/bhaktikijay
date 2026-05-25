import React, { memo, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { easeOutCubic } from '../constants/motion.js'

const sparkleChars = ['✦', '✧', '✸']
const sparkleColors = ['#D4AF37', '#E2725B']

function isInteractiveTarget(target) {
  if (!target || !target.closest) return false
  return Boolean(
    target.closest('a,button,input,textarea,select,label,form,[role="button"],[data-no-sparkle="true"]'),
  )
}

function SparkleLayer({ containerRef, disabled }) {
  const [sparkles, setSparkles] = useState([])

  const removeSparkle = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const spawnSparklesAt = useCallback((clientX, clientY) => {
    const el = containerRef?.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    const now = Date.now()
    const newOnes = Array.from({ length: 5 }).map((_, i) => ({
      id: `${now}-${i}-${Math.random().toString(16).slice(2)}`,
      x,
      y,
      char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    }))

    setSparkles((prev) => [...prev, ...newOnes])
  }, [containerRef])

  useEffect(() => {
    const el = containerRef?.current
    if (!el || disabled) return

    const handler = (e) => {
      if (isInteractiveTarget(e.target)) return
      spawnSparklesAt(e.clientX, e.clientY)
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [containerRef, disabled, spawnSparklesAt])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute select-none text-2xl leading-none"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            willChange: 'transform, opacity',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5], opacity: [1, 0] }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          onAnimationComplete={() => removeSparkle(s.id)}
        >
          {s.char}
        </motion.span>
      ))}
    </div>
  )
}

export default memo(SparkleLayer)
