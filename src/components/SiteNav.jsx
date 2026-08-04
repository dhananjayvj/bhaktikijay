import React, { memo, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { easeSilk } from '../constants/motion.js'

const SECTIONS = [
  { id: 'invitation', label: 'Invite' },
  { id: 'couple', label: 'Couple' },
  { id: 'story', label: 'Story' },
  { id: 'overview', label: 'Days' },
  { id: 'timeline', label: 'Events' },
  { id: 'guide', label: 'Guide' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
]

function SiteNav({ visible }) {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState('invitation')

  useEffect(() => {
    if (!visible) return undefined

    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [visible])

  if (!visible) return null

  return (
    <motion.nav
      aria-label="Page sections"
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: easeSilk }}
      className="site-nav-glass fixed left-0 right-0 top-[2px] z-[55] border-b border-primary/15"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-3 py-2 sm:gap-2 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto no-scrollbar sm:justify-center sm:gap-1">
          {SECTIONS.map(({ id, label }) => {
            const active = activeId === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={[
                  'site-nav-link shrink-0 rounded-full px-3 py-2 font-lato text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-3.5 sm:text-[0.65rem]',
                  active
                    ? 'bg-primary-deep text-cream shadow-premium-sm'
                    : 'text-primary-deep/80 hover:bg-primary/10 hover:text-primary-deep',
                ].join(' ')}
                aria-current={active ? 'true' : undefined}
              >
                {label}
              </a>
            )
          })}
        </div>
        <a href="#rsvp" className="btn-primary shrink-0 hidden sm:inline-flex text-[0.7rem]">
          RSVP
        </a>
      </div>
    </motion.nav>
  )
}

export default memo(SiteNav)
