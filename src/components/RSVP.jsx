import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas.jsx'

const EVENTS = [
  { key: 'Mehendi', label: 'Mehendi' },
  { key: 'Haldi', label: 'Haldi' },
  { key: 'Baraat', label: 'Baraat' },
  { key: 'Sangeet', label: 'Sangeet' },
  { key: 'Muhurtham', label: 'Muhurtham' },
  { key: 'Reception', label: 'Reception' },
]

export default function RSVP() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('2')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState([])

  const [submitted, setSubmitted] = useState(false)
  const [particleTriggerId, setParticleTriggerId] = useState(0)
  const [successNote, setSuccessNote] = useState('')

  const selectedSet = useMemo(() => new Set(selected), [selected])

  const toggleEvent = (key) => {
    setSelected((prev) => {
      const set = new Set(prev)
      if (set.has(key)) set.delete(key)
      else set.add(key)
      return Array.from(set)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setParticleTriggerId((v) => v + 1)
    const eventsText = selected.length ? selected.join(', ') : 'your presence'
    setSuccessNote(`Thank you, ${name.trim()}! We’re delighted you’ll join for ${eventsText}.`)
    setSubmitted(true)
  }

  return (
    <motion.section
      id="rsvp"
      className="reveal relative overflow-hidden border-t border-gold/20 bg-terra px-4 py-16 md:px-10 md:py-20"
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
                    className="w-full rounded-xl border border-gold bg-gold py-4 font-lato text-sm font-bold tracking-widest text-brown shadow-md"
                  >
                    Submit RSVP
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="relative px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mx-auto flex w-full max-w-sm flex-col items-center gap-2 text-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="text-5xl" aria-hidden="true">
                    🎉
                  </div>
                  <div className="font-playfair text-cream text-2xl font-black leading-tight">
                    RSVP received
                  </div>
                  <div className="font-cormorant text-cream/95 text-base leading-relaxed">
                    {successNote}
                  </div>
                  {message.trim() ? (
                    <div className="mt-3 rounded-xl border border-gold/35 bg-cream/10 px-4 py-3 font-lato text-cream/90 text-sm">
                      Message: “{message.trim()}”
                    </div>
                  ) : null}
                  <div className="mt-4 font-lato text-cream/70 text-xs">
                    (This demo doesn’t submit to a backend yet.)
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

