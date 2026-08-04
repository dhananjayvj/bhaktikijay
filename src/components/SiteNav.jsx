import React, { memo, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { easeSilk } from '../constants/motion.js'
import { useScrollPastHero } from '../hooks/useScrollPastHero.js'

const SECTIONS = [
  { id: 'invitation', label: 'Invite' },
  { id: 'couple', label: 'Couple' },
  { id: 'timeline', label: 'Events' },
  { id: 'guide', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP', cta: true },
]

function SiteNav({ visible }) {
  const reduceMotion = useReducedMotion()
  const pastHero = useScrollPastHero(visible)
  const [activeId, setActiveId] = useState('couple')

  useEffect(() => {
    if (!visible || !pastHero) return undefined

    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-42% 0px -45% 0px', threshold: 0 },
      )
      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((o) => o?.disconnect())
    }
  }, [visible, pastHero])

  if (!visible || !pastHero) return null

  return (
    <motion.nav
      aria-label="Page sections"
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: easeSilk }}
      className="site-nav-glass fixed inset-x-0 top-0 z-[55] border-b border-primary/15 pt-[env(safe-area-inset-top)]"
    >
      <div className="site-nav-inner mx-auto max-w-5xl px-2 py-2 sm:px-6">
        {SECTIONS.map(({ id, label, cta }) => {
          const active = activeId === id
          const className = cta
            ? active
              ? 'site-nav-pill site-nav-pill--cta site-nav-pill--active'
              : 'site-nav-pill site-nav-pill--cta'
            : active
              ? 'site-nav-pill site-nav-pill--active'
              : 'site-nav-pill'

          return (
            <a
              key={id}
              href={`#${id}`}
              className={className}
              aria-current={active ? 'true' : undefined}
            >
              {label}
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default memo(SiteNav)
