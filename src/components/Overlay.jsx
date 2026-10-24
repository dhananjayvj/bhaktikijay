import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import ganeshImg from '../../images/Ganesh.jpeg'
import { playSealBreakFeedback } from '../utils/sealFeedback.js'

function WaxMonogram() {
  return (
    <svg className="atelier-seal" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="wax-color" cx="31%" cy="25%" r="78%">
          <stop offset="0" stopColor="#8e3d45" />
          <stop offset="0.55" stopColor="#6c2734" />
          <stop offset="1" stopColor="#481925" />
        </radialGradient>
      </defs>
      <path
        d="M59 5c7-2 12 1 18 2 7 1 14 2 18 8 6 4 7 11 11 17 4 6 8 12 8 19 0 6-2 12-1 19 0 7-3 14-8 19-4 6-11 8-16 13-6 5-13 6-20 8-7 2-13 5-20 3-7-2-12-4-19-7-6-3-12-7-16-13-4-5-5-12-8-18-2-7-1-14-1-21 0-7 4-13 7-19 3-7 7-11 13-16 5-4 12-6 18-9 6-3 10-2 16-5Z"
        fill="url(#wax-color)"
        stroke="#4a1c28"
        strokeWidth="1.2"
      />
      <circle cx="60" cy="59" r="43" fill="none" stroke="#b4787b" strokeOpacity=".52" strokeWidth="1.25" />
      <circle cx="60" cy="59" r="39" fill="none" stroke="#3d1720" strokeOpacity=".45" strokeWidth="1" />
      <path d="M20 45c5-16 17-27 32-29" fill="none" stroke="#e0a7a0" strokeOpacity=".3" strokeWidth="1.4" strokeLinecap="round" />
      <image className="atelier-seal-monogram" href="/images/bd-heart-monogram.webp" x="25" y="27" width="70" height="65" />
      <circle cx="60" cy="13" r="1.3" fill="#bd9080" opacity=".8" />
      <circle cx="60" cy="105" r="1.3" fill="#bd9080" opacity=".7" />
    </svg>
  )
}

function Envelope({ phase, onOpen }) {
  return (
    <div className="atelier-scene" data-phase={phase}>
      <p className="atelier-eyebrow">A celebration of love</p>
      <div className="atelier-envelope">
        <div className="atelier-envelope__back" aria-hidden="true" />
        <div className="atelier-letter" aria-hidden="true">
          <div className="atelier-letter__rule" />
          <img src={ganeshImg} alt="" className="atelier-letter__ganesh" />
          <span className="atelier-letter__blessing">With our families’ blessings</span>
          <span className="atelier-letter__names">Bhakti <i>&amp;</i> Dhananjay</span>
          <span className="atelier-letter__date">14 March 2027 · Bengaluru</span>
        </div>
        <div className="atelier-envelope__pocket" aria-hidden="true">
          <span className="atelier-envelope__imprint">Bhakti <i>&amp;</i> Dhananjay</span>
        </div>
        <div className="atelier-envelope__flap" aria-hidden="true" />
        <div className="atelier-seal-wrap"><WaxMonogram /></div>
        <button
          type="button"
          className="atelier-envelope__hit"
          aria-label="Tap to open our invitation"
          disabled={phase !== 'closed'}
          onClick={onOpen}
        />
      </div>
      <button type="button" className="atelier-instruction" disabled={phase !== 'closed'} onClick={onOpen}>
        Tap to open our invitation
      </button>
    </div>
  )
}

function Overlay({ onClose, onHeroShellStart, onHeroTextStart, onRevealStart }) {
  const [phase, setPhase] = useState('closed')
  const openedRef = useRef(false)
  const finishedRef = useRef(false)
  const timersRef = useRef([])

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    timersRef.current.forEach(window.clearTimeout)
    onHeroShellStart?.()
    onHeroTextStart?.()
    onClose()
  }, [onClose, onHeroShellStart, onHeroTextStart])

  const open = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    playSealBreakFeedback()
    onRevealStart?.()
    setPhase('opening')
    timersRef.current = [
      window.setTimeout(() => setPhase('drawing'), 400),
      window.setTimeout(() => onHeroShellStart?.(), 900),
      window.setTimeout(() => onHeroTextStart?.(), 1200),
      window.setTimeout(() => setPhase('handoff'), 1500),
      window.setTimeout(finish, 2050),
    ]
  }, [finish, onHeroShellStart, onHeroTextStart, onRevealStart])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      timersRef.current.forEach(window.clearTimeout)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div className="atelier-overlay viewport-fill fixed inset-0 z-[70]" data-phase={phase} aria-label="Invitation opening">
      <button type="button" className="atelier-skip" onClick={finish}>Skip animation</button>
      <Envelope phase={phase} onOpen={open} />
    </div>
  )
}

export default memo(Overlay)
