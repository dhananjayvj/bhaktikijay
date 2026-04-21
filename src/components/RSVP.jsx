import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas.jsx'
import { WEDDING_DATE_LINE } from '../constants/wedding.js'

const EVENTS = [
  { key: 'Mehendi', label: 'Mehendi' },
  { key: 'Haldi', label: 'Haldi' },
  { key: 'Baraat', label: 'Baraat' },
  { key: 'Sangeet', label: 'Sangeet' },
  { key: 'Muhurtham', label: 'Muhurtham' },
  { key: 'Reception', label: 'Reception' },
]

function AdmissionCard({ name, guests, guestNames, eventTags, message }) {
  const eventsDisplay =
    eventTags.trim() || 'We’ll share the full schedule with you closer to the date.'
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-gold/80 bg-gradient-to-b from-cream via-cream to-invite-blush/40 px-6 py-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.85)]"
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
      <p className="font-lato text-[0.65rem] font-bold uppercase tracking-[0.35em] text-terra/90">Admitted</p>
      <p className="mt-2 font-cinzel text-2xl font-bold tracking-wide text-brown md:text-3xl">BhaktiKiJay</p>
      <p className="mt-1 font-cormorant text-lg italic text-stone-700">Celebration of love</p>
      <div className="mx-auto my-5 h-px max-w-[12rem] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <p className="font-playfair text-2xl font-semibold text-invite-wine md:text-3xl">{name}</p>
      <p className="mt-2 font-lato text-sm text-stone-700/90">
        {guests === '1' ? '1 guest' : `${guests} guests`}
        {guestNames.trim() && guests !== '1' ? ` · ${guestNames.trim()}` : ''}
      </p>
      <p className="mt-4 font-cinzel text-sm font-semibold tracking-wider text-terra">{WEDDING_DATE_LINE}</p>
      <p className="mt-3 font-cormorant text-sm italic leading-relaxed text-stone-700/85">{eventsDisplay}</p>
      {message.trim() ? (
        <p className="mt-4 rounded-xl border border-gold/30 bg-cream/40 px-3 py-2 font-lato text-xs text-stone-700/90">
          “{message.trim()}”
        </p>
      ) : null}
      <p className="mt-6 font-script text-3xl text-gold-dark md:text-4xl">See you in Feb!</p>
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

  const endpoint = useMemo(() => import.meta.env?.VITE_RSVP_ENDPOINT || '', [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitError('')
    setSubmitState('submitting')
    setParticleTriggerId((v) => v + 1)
    const tags = selected.length ? selected.join(', ') : ''
    setEventTags(tags)

    const payload = {
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      guests,
      guestNames: guestNames.trim(),
      events: selected,
      eventTags: tags,
      message: message.trim(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.type !== 'opaque' && !res.ok) throw new Error(`Request failed (${res.status})`)
        setSubmitState('success')
      } catch (err) {
        setSubmitState('error')
        setSubmitError('Could not submit right now. Please try again in a moment.')
      }
    } else {
      setSubmitState('error')
      setSubmitError('RSVP collection is not configured yet.')
    }

    setSubmitted(true)
  }

  return (
    <motion.section
      id="rsvp"
      className="defer-heavy-section reveal relative overflow-hidden border-t border-gold/20 bg-terra px-4 py-16 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="font-cinzel text-cream text-3xl font-bold tracking-wide md:text-4xl">RSVP</div>
        <div className="mt-3 font-lato text-cream/95 text-sm">
          Kindly respond by <span className="font-bold text-gold">January 15, 2027</span> so we can plan with care.
        </div>

        {!endpoint ? (
          <div className="mx-auto mt-4 max-w-xl rounded-xl border border-gold/35 bg-cream/10 px-4 py-3 text-left">
            <div className="font-lato text-cream/90 text-xs font-bold uppercase tracking-widest">
              RSVP saving not set up yet
            </div>
            <div className="mt-1 font-cormorant text-cream/90 text-sm leading-relaxed">
              Once we connect a Google Sheet, your responses will be saved automatically.
            </div>
          </div>
        ) : null}

        <div className="relative mt-10 rounded-2xl border border-gold/45 bg-terra/95 p-5 shadow-xl backdrop-blur md:p-8">
          <ParticleCanvas
            triggerId={particleTriggerId}
            className="absolute inset-0 pointer-events-none"
          />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
                className="relative"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="sr-only" htmlFor="rsvp-name">
                      Name
                    </label>
                    <input
                      id="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full rounded-xl border border-gold/40 bg-cream/5 px-4 py-3 font-lato text-cream placeholder:text-cream/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
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
                      className="w-full rounded-xl border border-gold/40 bg-cream/5 px-4 py-3 font-lato text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                    >
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '5+'].map((opt) => (
                        <option key={opt} value={opt} className="bg-terra">
                          {opt === '5+' ? '5+' : opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {showGuestNames ? (
                  <div className="mt-4">
                    <label className="mb-1.5 block text-left font-lato text-cream/90 text-xs font-semibold uppercase tracking-widest">
                      Guest names <span className="font-normal normal-case text-cream/60">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-guest-names"
                      value={guestNames}
                      onChange={(e) => setGuestNames(e.target.value)}
                      placeholder="Who’s coming with you?"
                      rows={2}
                      className="w-full rounded-xl border border-gold/40 bg-cream/5 px-4 py-3 font-lato text-cream placeholder:text-cream/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                ) : null}

                <div className="mt-5">
                  <label className="sr-only" htmlFor="rsvp-message">
                    Message
                  </label>
                  <textarea
                    id="rsvp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message (optional)"
                    rows={4}
                    className="w-full rounded-xl border border-gold/40 bg-cream/5 px-4 py-3 font-lato text-cream placeholder:text-cream/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                  />
                </div>

                <div className="mt-6">
                  <div className="font-lato text-cream/95 text-xs font-bold uppercase tracking-widest">
                    Events you’ll join
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    {EVENTS.map((ev) => {
                      const active = selectedSet.has(ev.key)
                      return (
                        <button
                          type="button"
                          key={ev.key}
                          data-no-sparkle="true"
                          onClick={() => toggleEvent(ev.key)}
                          aria-pressed={active}
                          className={[
                            'rounded-full border px-4 py-2 font-lato text-sm transition-colors',
                            active
                              ? 'border-gold bg-gold text-brown'
                              : 'border-gold/35 bg-cream/10 text-cream hover:bg-cream/15',
                          ].join(' ')}
                        >
                          {ev.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-7">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={submitState === 'submitting'}
                    className={[
                      'w-full rounded-xl border border-gold bg-gold py-4 font-lato text-sm font-bold tracking-widest text-brown shadow-md',
                      submitState === 'submitting' ? 'opacity-75' : '',
                    ].join(' ')}
                  >
                    {submitState === 'submitting' ? 'Submitting…' : 'Submit RSVP'}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="relative px-1 sm:px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
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
                    Saved.
                  </p>
                ) : submitState === 'error' ? (
                  <p className="mt-3 font-lato text-cream/85 text-xs">
                    {submitError}
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
