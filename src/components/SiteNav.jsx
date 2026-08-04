import React, { memo, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SECTIONS = [
  { id: 'invitation', label: 'Invite' },
  { id: 'couple', label: 'Couple' },
  { id: 'timeline', label: 'Events' },
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
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.33, 1, 0.68, 1] }}
      className="site-nav-glass fixed left-0 right-0 top-[2px] z-[55] border-b border-gold/25"
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
                  'site-nav-link shrink-0 rounded-full px-3 py-2 font-lato text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 sm:px-4 sm:text-[0.7rem]',
                  active
                    ? 'bg-invite-wine text-cream shadow-premium-sm'
                    : 'text-invite-wine/85 hover:bg-invite-wine/8 hover:text-invite-wine',
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
