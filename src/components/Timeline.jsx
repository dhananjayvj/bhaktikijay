import React, { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'
import EventWearTip from './EventWearTip.jsx'
import { PinIcon } from './EventIcons.jsx'
import { CELEBRATION_DAYS } from '../constants/siteContent.js'
import {
  easeSilk,
  fadeUpDuration,
  gpuLayerStyle,
  sectionReveal,
  staggerChildren,
} from '../constants/motion.js'

function Dot() {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <div className="relative z-[2] h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_16px_rgba(217,119,6,0.45)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/45"
        animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

const dayCardReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: fadeUpDuration, ease: easeSilk },
  },
}

const dayListStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
}

function DayCard({ day, index }) {
  return (
    <motion.article variants={dayCardReveal} className="timeline-day-card">
      <header className="timeline-day-header">
        <p className="meta-stationery">{day.day}</p>
        <h3 className="timeline-day-title">{day.title}</h3>
        <p className="timeline-day-description">{day.description}</p>
      </header>

      <div className="timeline-schedule-panel">
        <p className="timeline-schedule-label">Schedule</p>
        <ul className="timeline-schedule-list" aria-label="Event schedule">
          {day.schedule.map((item) => (
            <li key={item.name} className="timeline-schedule-item">
              <div className="timeline-schedule-row">
                <span className="timeline-event-name">{item.name}</span>
                <span className="timeline-event-time">{item.time}</span>
              </div>
              <EventWearTip tip={item.wearTip} />
            </li>
          ))}
        </ul>
      </div>

      <div className="timeline-day-meta">
        <p className="timeline-meta-label">Venue</p>
        <p className="timeline-venue">{day.venue}</p>
      </div>

      <a
        data-no-sparkle="true"
        href={day.mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={day.mapsLabel}
        className="timeline-maps-link"
      >
        <PinIcon size={18} />
        <span>View on maps</span>
      </a>

      <span className="sr-only">{`Celebration day ${index + 1}`}</span>
    </motion.article>
  )
}

function Timeline() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.12 })
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, amount: 0.08 })

  return (
    <SectionReveal
      id="timeline"
      className="defer-heavy-section reveal relative overflow-hidden border-t border-border px-4 py-16 md:px-10 md:py-20"
    >
      <SectionDoodleBackdrop variant="cream" />

      <div className="relative z-[1] mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">Mar 11 to 14, 2027</p>
          <div ref={headerRef}>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={sectionReveal}
              style={gpuLayerStyle}
              className="section-display-light mt-2"
            >
              Celebration timeline
            </motion.h2>
          </div>
          <p className="section-lead mt-3">Three days of rituals, music, and celebration in Bengaluru.</p>
        </RevealItem>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-3 top-2 bottom-2 w-px md:left-8 md:w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(217,119,6,0.45) 18%, rgba(15,118,110,0.8) 50%, rgba(217,119,6,0.35) 70%, rgba(0,0,0,0) 100%)',
            }}
          />

          <motion.div
            ref={listRef}
            className="space-y-8 md:space-y-10"
            variants={dayListStagger}
            initial="hidden"
            animate={listInView ? 'show' : 'hidden'}
          >
            {CELEBRATION_DAYS.map((day, i) => (
              <div key={day.id} className="relative pl-10 md:pl-16">
                <div className="absolute left-3 top-8 z-[2] md:left-8">
                  <Dot />
                </div>
                <DayCard day={day} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  )
}

export default memo(Timeline)
