import React from 'react'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import Countdown from './Countdown.jsx'
import { BHAKTI_PARENT_LINE, DHANANJAY_PARENT_LINE, INVITE_BLESSING } from '../constants/inviteCopy.js'
import { WEDDING_DATE_LINE } from '../constants/wedding.js'

/**
 * Static mirror of the Hero invitation body for the overlay curtain stage — same structure
 * as the page Hero (kolam, hashtag chip, copy, names, date, countdown) without layoutIds.
 * pointer-events-none: display-only during skeuomorphic reveal.
 */
export default function HeroInvitationMirror() {
  return (
    <div
      className="pointer-events-none mx-auto flex w-full max-w-5xl select-none flex-col items-center px-2 pb-4 pt-2 text-center sm:px-3 sm:pb-6 sm:pt-4"
      aria-hidden="true"
    >
      <div className="w-full scale-[0.92] origin-top sm:scale-95">
        <div className="mt-1 w-full sm:mt-3">
          <KolamWaveDivider />
        </div>

        <div className="mt-4 flex justify-center sm:mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-invite-wine/50 bg-white/60 px-4 py-2 font-lato text-xs font-semibold tracking-wider text-invite-wine shadow-sm backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm">
            <span aria-hidden="true">#</span>
            <span>BhaktiKiJay</span>
          </div>
        </div>

        <p className="font-cormorant mx-auto mt-3 max-w-2xl italic leading-relaxed text-invite-ink-soft text-[clamp(0.82rem,2.4vw,1.05rem)] sm:mt-5 sm:text-[clamp(1rem,2.3vw,1.15rem)]">
          {INVITE_BLESSING}
        </p>

        <div className="mt-4 grid w-full grid-cols-1 items-center justify-center gap-2 sm:mt-6 sm:gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-x-6">
          <div className="flex flex-col items-center text-center">
            <div
              className="font-script font-normal text-invite-wine"
              style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 0.95 }}
            >
              Bhakti
            </div>
            <p className="font-cormorant mt-1 max-w-[26rem] leading-relaxed text-invite-ink-soft text-[clamp(0.8rem,2vw,1rem)] sm:mt-3 sm:text-[clamp(0.98rem,2vw,1.08rem)]">
              {BHAKTI_PARENT_LINE}
            </p>
          </div>

          <div className="flex items-center justify-center py-0.5 md:pt-3">
            <div
              className="font-script font-normal italic text-invite-mauve"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', lineHeight: 1 }}
            >
              &amp;
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className="font-script font-normal text-invite-wine"
              style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 0.95 }}
            >
              Dhananjay
            </div>
            <p className="font-cormorant mt-1 max-w-[26rem] leading-relaxed text-invite-ink-soft text-[clamp(0.8rem,2vw,1rem)] sm:mt-3 sm:text-[clamp(0.98rem,2vw,1.08rem)]">
              {DHANANJAY_PARENT_LINE}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 sm:mt-8 sm:gap-2">
          <div
            className="font-cinzel font-bold tracking-wide text-invite-wine"
            style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.45rem)' }}
          >
            {WEDDING_DATE_LINE}
          </div>
        </div>

        <Countdown targetIso="2027-02-14T09:30:00+05:30" />
      </div>
    </div>
  )
}
