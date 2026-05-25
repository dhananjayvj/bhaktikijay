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
      className="pointer-events-none mx-auto grid h-full min-h-0 w-full max-w-5xl grid-rows-[auto_auto_auto] select-none gap-y-5 px-4 pb-3 pt-1 text-center sm:gap-y-6 sm:px-6 sm:pb-4 md:gap-y-8 md:px-10"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="mt-0 w-full md:mt-1">
          <KolamWaveDivider compact />
        </div>

        <div className="meta-stationery letterpress-ink px-2">
          <span className="select-none not-italic text-invite-wine/35" aria-hidden="true">
            ||
          </span>
          <span className="px-2">{INVITE_HEADER}</span>
          <span className="select-none not-italic text-invite-wine/35" aria-hidden="true">
            ||
          </span>
        </div>

        <p className="letterpress-ink mx-auto max-w-xl px-2 font-cormorant text-lg italic leading-loose text-invite-wine/90 whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
          {INVITE_OPENING_VERSE}
        </p>
      </div>

      <div className="flex min-h-0 w-full flex-col items-center justify-center px-2 pt-2 sm:pt-4">
        <div className="grid w-full max-w-4xl grid-cols-1 items-center justify-center gap-4 sm:gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
            <div
              className="letterpress-ink font-playfair font-semibold text-invite-wine"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: 0.95 }}
            >
              Bhakti
            </div>
            <p className="letterpress-ink max-w-[26rem] font-cormorant text-base italic leading-relaxed tracking-wide text-invite-mauve sm:text-lg">
              {BHAKTI_PARENT_LINE}
            </p>
          </div>

          <div className="flex items-center justify-center py-1 md:pt-4">
            <span className="letterpress-ink inline-block translate-y-2 font-script text-6xl text-invite-mauve md:mx-2">
              &amp;
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
            <div
              className="letterpress-ink font-playfair font-semibold text-invite-wine"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: 0.95 }}
            >
              Dhananjay
            </div>
            <p className="letterpress-ink max-w-[26rem] font-cormorant text-base italic leading-relaxed tracking-wide text-invite-mauve sm:text-lg">
              {DHANANJAY_PARENT_LINE}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-3 sm:gap-5">
        <p className="letterpress-ink mx-auto max-w-lg font-cormorant text-lg italic leading-loose tracking-wide text-invite-wine/90 whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
          {INVITE_CELEBRATION}
        </p>

        <div className="meta-stationery letterpress-ink px-2 pt-1">{CEREMONY_DATE_HEADLINE}</div>

        <Countdown dense intro={COUNTDOWN_INTRO} targetIso="2027-03-14T08:48:00+05:30" />
      </div>
    </div>
  )
}
