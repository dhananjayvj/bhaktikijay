import React from 'react'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import Countdown from './Countdown.jsx'
import {
  BHAKTI_PARENT_LINE,
  COUNTDOWN_INTRO,
  DHANANJAY_PARENT_LINE,
  INVITE_CELEBRATION,
  INVITE_HEADER,
  INVITE_OPENING_VERSE,
} from '../constants/inviteCopy.js'
import { CEREMONY_DATE_HEADLINE } from '../constants/wedding.js'

/**
 * Static mirror of the Hero invitation behind curtains — spacing matches {@link Hero}
 * (no layoutIds) so the handoff to the real Hero does not jump vertically.
 */
export default function HeroInvitationMirror() {
  return (
    <div
      className="pointer-events-none mx-auto grid h-full min-h-0 w-full max-w-5xl grid-rows-[auto_auto_auto] select-none gap-y-3 px-3 pb-2 pt-0 text-center sm:gap-y-4 sm:px-4 sm:pb-3 sm:pt-0 md:gap-y-5 md:px-10 md:pb-4"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3.5 sm:gap-5">
        <div className="mt-0 w-full md:mt-1">
          <KolamWaveDivider compact />
        </div>

        <div className="font-cinzel font-semibold text-center text-[clamp(0.82rem,2.05vw,1.18rem)] italic leading-snug tracking-[0.06em] text-invite-wine whitespace-nowrap">
          <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
            ||
          </span>
          <span className="px-1 sm:px-2.5">{INVITE_HEADER}</span>
          <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
            ||
          </span>
        </div>

        <p className="font-cormorant font-bold mx-auto max-w-2xl px-0.5 text-[clamp(1.0rem,2.35vw,1.26rem)] italic leading-relaxed text-invite-ink whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
          {INVITE_OPENING_VERSE}
        </p>
      </div>

      <div className="flex min-h-0 w-full flex-col items-center justify-center pt-1 sm:pt-2">
        <div className="grid w-full grid-cols-1 items-center justify-center gap-2 sm:gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-x-8">
          <div className="flex flex-col items-center text-center">
            <div
              className="font-script font-normal text-invite-wine"
              style={{ fontSize: 'clamp(2.35rem, 9vw, 7.2rem)', lineHeight: 0.95 }}
            >
              Bhakti
            </div>
            <p className="font-cormorant font-bold mt-2 max-w-[26rem] leading-relaxed text-invite-ink text-[clamp(1.0rem,2.1vw,1.2rem)] sm:mt-3">
              {BHAKTI_PARENT_LINE}
            </p>
          </div>

          <div className="flex items-center justify-center py-0.5 md:pt-3">
            <div
              className="font-script font-normal italic text-invite-wine"
              style={{ fontSize: 'clamp(1.65rem, 5.5vw, 3.8rem)', lineHeight: 1 }}
            >
              &amp;
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className="font-script font-normal text-invite-wine"
              style={{ fontSize: 'clamp(2.35rem, 9vw, 7.2rem)', lineHeight: 0.95 }}
            >
              Dhananjay
            </div>
            <p className="font-cormorant font-bold mt-2 max-w-[26rem] leading-relaxed text-invite-ink text-[clamp(1.0rem,2.1vw,1.2rem)] sm:mt-3">
              {DHANANJAY_PARENT_LINE}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5 sm:gap-3.5">
        <p className="font-cormorant font-bold max-w-md px-0.5 text-[clamp(1.0rem,2.3vw,1.22rem)] italic leading-relaxed text-invite-ink whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
          {INVITE_CELEBRATION}
        </p>

        <div className="flex flex-col items-center gap-1.5 text-invite-wine">
          <div
            className="font-cinzel font-bold uppercase tracking-[0.14em] text-invite-wine"
            style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.45rem)' }}
          >
            {CEREMONY_DATE_HEADLINE}
          </div>
        </div>

        <Countdown dense intro={COUNTDOWN_INTRO} targetIso="2027-02-26T08:50:00+05:30" />
      </div>
    </div>
  )
}
