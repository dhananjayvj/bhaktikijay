import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas.jsx'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import { WEDDING_DATE_LINE } from '../constants/wedding.js'
import {
  easeOutCubic,
  formContainer,
  formField,
  pillContainer,
  pillReveal,
  springGentle,
  springSnappy,
} from '../constants/motion.js'

const EVENT_GROUPS = [
  { key: 'haldi-mehendi', label: 'Haldi & Mehendi', events: ['Haldi', 'Mehendi'] },
  { key: 'sangeet-baraat', label: 'Sangeet & Baraat', events: ['Sangeet', 'Baraat'] },
  { key: 'muhurtham-reception', label: 'Muhurtham & Reception', events: ['Muhurtham', 'Reception'] },
]

function expandSelectedEvents(selectedKeys) {
  return selectedKeys.flatMap((key) => {
    const group = EVENT_GROUPS.find((g) => g.key === key)
    return group ? group.events : [key]
  })
}

function selectedEventLabels(selectedKeys) {
  return selectedKeys.map((key) => EVENT_GROUPS.find((g) => g.key === key)?.label ?? key)
}

const DEFAULT_RSVP_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyFeYqxfN2JYEZGtwizjTIBNbwE8KDbkn7OQJYmxJMkzB1_g0RgVseq8DrOt80WOjk2/exec'

function AdmissionCard({ name, guests, guestNames, eventTags, message }) {
  const eventsDisplay =
    eventTags.trim() || 'We’ll share the full schedule with you closer to the date.'
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-gold/75 bg-gradient-to-b from-cream via-cream to-invite-blush/35 px-6 py-8 text-center shadow-premium-lg"
      initial={{ opacity: 0, y: 16, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.55, ease: [0.33, 1, 0.24, 1] }}
      style={{ transformPerspective: 900 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(59,31,10,0.12) 6px, rgba(59,31,10,0.12) 8px)',
        }}
      />
      <p className="meta-stationery text-invite-wine">Admitted</p>
      <p className="mt-2 font-cinzel text-2xl font-bold tracking-wide text-brown md:text-3xl">JayKiBhakti</p>
      <p className="mt-1 font-cormorant text-lg font-medium italic text-stone-700">Celebration of love</p>
      <div className="mx-auto my-5 h-px max-w-[12rem] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <p className="font-playfair text-2xl font-semibold text-invite-wine md:text-3xl">{name}</p>
      <p className="mt-2 font-lato text-sm font-medium text-stone-800">
        {guests === '1' ? '1 guest' : `${guests} guests`}
        {guestNames.trim() && guests !== '1' ? ` · ${guestNames.trim()}` : ''}
      </p>
      <p className="mt-4 font-cinzel text-sm font-semibold tracking-wider text-terra-deep">{WEDDING_DATE_LINE}</p>
      <p className="mt-3 font-cormorant text-sm font-medium italic leading-relaxed text-stone-700">{eventsDisplay}</p>
      {message.trim() ? (
        <p className="mt-4 rounded-xl border border-gold/35 bg-cream/50 px-3 py-2 font-lato text-xs font-medium text-stone-800">
          “{message.trim()}”
        </p>
      ) : null}
      <p className="mt-6 font-script text-3xl text-gold-dark md:text-4xl">See you soon!</p>
      <p className="mt-2 font-lato text-[0.65rem] uppercase tracking-widest text-stone-600/70">
        Screenshot to save this card
      </p>
    </motion.div>
  )
}

export default function RSVP() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('2')
  const [guestNames, setGuestNames] = useState('')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState([])

  const [submitted, setSubmitted] = useState(false)
  const [particleTriggerId, setParticleTriggerId] = useState(0)
  const [eventTags, setEventTags] = useState('')
  const [submitState, setSubmitState] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('')

  const selectedSet = useMemo(() => new Set(selected), [selected])
  const showGuestNames = guests !== '1'

  useEffect(() => {
    if (guests === '1') setGuestNames('')
  }, [guests])

  const toggleEvent = (key) => {
    setSelected((prev) => {
      const set = new Set(prev)
      if (set.has(key)) set.delete(key)
      else set.add(key)
      return Array.from(set)
    })
  }

  const endpoint = useMemo(() => import.meta.env?.VITE_RSVP_ENDPOINT || DEFAULT_RSVP_ENDPOINT, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitError('')
    setSubmitState('submitting')
    setParticleTriggerId((v) => v + 1)
    const tags = selected.length ? selectedEventLabels(selected).join(', ') : ''
    setEventTags(tags)

    const payload = {
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      guests,
      guestNames: guestNames.trim(),
      events: expandSelectedEvents(selected),
      eventTags: tags,
      message: message.trim(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    try {
      const body = JSON.stringify(payload)

      /**
       * Apps Script Web Apps usually don't return CORS headers.
       * `sendBeacon` is the most reliable way to POST cross-origin without CORS.
       */
      const sent =
        typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function'
          ? navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=utf-8' }))
          : false

      if (!sent) {
        const res = await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body,
        })
        if (res.type !== 'opaque' && !res.ok) throw new Error(`Request failed (${res.status})`)
      }

      setSubmitState('success')
    } catch (err) {
      setSubmitState('error')
      setSubmitError('Could not submit right now. Please try again in a moment.')
    }

    setSubmitted(true)
  }

  return (
    <SectionReveal
      id="rsvp"
      className="defer-heavy-section reveal section-band-rsvp relative overflow-hidden border-t border-gold/30 px-4 py-16 md:px-10 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(/doodle-pattern-rsvp.svg)',
          backgroundSize: '420px',
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <RevealItem>
          <p className="section-eyebrow-on-dark">Kindly respond</p>
          <h2 className="section-display-on-dark mt-2">RSVP</h2>
        </RevealItem>
        <RevealItem className="section-lead-on-dark mt-1">
          Please reply by <span className="font-semibold text-gold-light">January 15, 2027</span> so we can plan with care.
        </RevealItem>

        <RevealItem variant="scale" className="relative mt-10 rounded-2xl border border-gold/55 bg-black/10 p-5 shadow-premium backdrop-blur-sm md:p-8">
          <ParticleCanvas
            triggerId={particleTriggerId}
            className="absolute inset-0 pointer-events-none"
          />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20 }}
                variants={formContainer}
                transition={{ duration: 0.35, ease: easeOutCubic }}
                className="relative"
              >
                <motion.div variants={formField} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="sr-only" htmlFor="rsvp-name">
                      Name
                    </label>
                    <input
                      id="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full rounded-xl border border-gold/50 bg-black/15 px-4 py-3 font-lato font-medium text-cream placeholder:text-cream/70 focus:border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light/30"
                      required
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="sr-only" htmlFor="rsvp-guests">
                      Number of Guests
                    </label>
                    <select
                      id="rsvp-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-xl border border-gold/50 bg-black/15 px-4 py-3 font-lato font-medium text-cream focus:border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light/30"
                    >
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '5+'].map((opt) => (
                        <option key={opt} value={opt} className="bg-terra-deep text-cream">
                          {opt === '5+' ? '5+' : opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {showGuestNames ? (
                    <motion.div
                      key="guest-names"
                      variants={formField}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                    <label className="mb-1.5 block text-left meta-stationery-on-dark">
                      Guest names <span className="font-normal normal-case text-cream/75">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-guest-names"
                      value={guestNames}
                      onChange={(e) => setGuestNames(e.target.value)}
                      placeholder="Who’s coming with you?"
                      rows={2}
                      className="w-full rounded-xl border border-gold/50 bg-black/15 px-4 py-3 font-lato font-medium text-cream placeholder:text-cream/70 focus:border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light/30"
                    />
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <motion.div variants={formField} className="mt-5">
                  <label className="sr-only" htmlFor="rsvp-message">
                    Message
                  </label>
                  <textarea
                    id="rsvp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message (optional)"
                    rows={4}
                    className="w-full rounded-xl border border-gold/50 bg-black/15 px-4 py-3 font-lato font-medium text-cream placeholder:text-cream/70 focus:border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light/30"
                  />
                </motion.div>

                <motion.div variants={formField} className="mt-6">
                  <div className="meta-stationery-on-dark">
                    Events you’ll join
                  </div>
                  <motion.div
                    className="mt-3 flex flex-wrap items-center justify-center gap-2"
                    variants={pillContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {EVENT_GROUPS.map((ev) => {
                      const active = selectedSet.has(ev.key)
                      return (
                        <motion.button
                          type="button"
                          key={ev.key}
                          layout
                          variants={pillReveal}
                          data-no-sparkle="true"
                          onClick={() => toggleEvent(ev.key)}
                          aria-pressed={active}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.94 }}
                          transition={springSnappy}
                          className={[
                            'rounded-full border px-4 py-2 font-lato text-sm font-medium transition-colors',
                            active
                              ? 'border-gold-light bg-gold-light text-brown shadow-md'
                              : 'border-cream/35 bg-black/15 text-cream hover:border-gold-light/60 hover:bg-black/25',
                          ].join(' ')}
                        >
                          {ev.label}
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </motion.div>

                <motion.div variants={formField} className="mt-7">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springGentle}
                    disabled={submitState === 'submitting'}
                    className={[
                      'w-full rounded-xl border border-gold-light bg-gold-light py-4 font-lato text-sm font-bold tracking-widest text-brown shadow-premium-sm',
                      submitState === 'submitting' ? 'opacity-75' : '',
                    ].join(' ')}
                  >
                    {submitState === 'submitting' ? 'Submitting…' : 'Submit RSVP'}
                  </motion.button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="relative px-1 sm:px-2"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.55, ease: easeOutCubic }}
              >
                <AdmissionCard
                  name={name.trim()}
                  guests={guests}
                  guestNames={guestNames}
                  eventTags={eventTags}
                  message={message}
                />
                <p className="mt-6 font-cormorant text-cream/95 text-base leading-relaxed">
                  Thank you, {name.trim()} — we can’t wait to celebrate with you.
                </p>
                {submitState === 'success' ? (
                  <p className="mt-3 font-lato text-cream/75 text-xs">
                    Submitted.
                  </p>
                ) : submitState === 'error' ? (
                  <p className="mt-3 font-lato text-cream/85 text-xs">
                    {submitError}
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}
