import React, { memo, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function FloatingRsvpCta({ visible }) {
  const reduceMotion = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!visible) {
      setShow(false)
      return undefined
    }

    const hero = document.getElementById('invitation')
    if (!hero) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.12 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [visible])

  if (!visible || !show) return null

  return (
    <motion.a
      href="#rsvp"
      initial={reduceMotion ? false : { y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
      className="btn-primary fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[54] -translate-x-1/2 shadow-premium sm:hidden"
    >
      RSVP
    </motion.a>
  )
}

export default memo(FloatingRsvpCta)
