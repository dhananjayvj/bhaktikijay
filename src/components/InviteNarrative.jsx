import React from 'react'
import { WEDDING_DATE_HEADLINE } from '../constants/wedding.js'
import {
  BHAKTI_PARENT_LINE,
  DHANANJAY_PARENT_LINE,
  INVITE_CELEBRATION,
  INVITE_HEADER,
  INVITE_OPENING_VERSE,
} from '../constants/inviteCopy.js'

/**
 * Core invitation wording — used behind the overlay curtains (compact) and in Hero (full).
 * No layoutIds here (overlay + hero can both mount when transitioning).
 */
export default function InviteNarrative({ compact = false }) {
  const scriptBhakti = compact
    ? 'clamp(1.65rem, 6.5vw, 2.85rem)'
    : 'clamp(3rem, 10vw, 7.2rem)'
  const scriptD = compact
    ? 'clamp(1.65rem, 6.5vw, 2.85rem)'
    : 'clamp(3rem, 10vw, 7.2rem)'
  const scriptAmp = compact ? 'clamp(1.35rem, 5vw, 2.2rem)' : 'clamp(2.0rem, 6vw, 3.8rem)'

  const headerCls = compact
    ? 'text-[clamp(0.78rem,2.4vw,0.95rem)]'
    : 'text-[clamp(0.92rem,2.2vw,1.18rem)]'

  const verseCls = compact
    ? 'max-w-[36ch] text-[clamp(0.72rem,2.4vw,0.92rem)]'
    : 'mt-4 max-w-2xl text-[clamp(0.88rem,2vw,1.08rem)]'

  return (
    <div
      className={`flex w-full flex-col items-center text-center ${
        compact
          ? 'max-h-full min-h-0 justify-center gap-2 overflow-y-auto overflow-x-hidden px-1 py-2 sm:gap-2.5'
          : 'gap-0'
      }`}
    >
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-invite-wine/50 bg-white/60 font-lato font-semibold tracking-wider text-invite-wine shadow-sm backdrop-blur-sm ${
          compact ? 'px-3 py-1.5 text-[0.7rem] sm:px-4 sm:py-2 sm:text-sm' : 'px-5 py-2.5 text-sm'
        }`}
      >
        <span aria-hidden="true">#</span>
        <span>BhaktiKiJay</span>
      </div>

      <div className={`font-cormorant italic leading-snug tracking-wide text-invite-wine ${headerCls}`}>
        <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
          ||
        </span>
        <span className="px-1 sm:px-1.5">{INVITE_HEADER}</span>
        <span className="select-none not-italic text-invite-wine/40" aria-hidden="true">
          ||
        </span>
      </div>

      <p
        className={`font-cormorant italic leading-relaxed text-invite-ink-soft whitespace-pre-line before:content-['\201C'] after:content-['\201D'] ${verseCls}`}
      >
        {INVITE_OPENING_VERSE}
      </p>

      <div
        className={`grid w-full grid-cols-1 items-center justify-center md:grid-cols-[1fr_auto_1fr] ${
          compact ? 'mt-1 gap-2 md:gap-x-5' : 'mt-6 gap-3 md:gap-x-8'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="font-script font-normal text-invite-wine"
            style={{ fontSize: scriptBhakti, lineHeight: 0.95 }}
          >
            Bhakti
          </div>
          <p
            className={`font-cormorant leading-relaxed text-invite-ink-soft ${
              compact
                ? 'mt-1 max-w-[20rem] text-[clamp(0.72rem,2.4vw,0.88rem)]'
                : 'mt-3 max-w-[26rem] text-[clamp(0.98rem,2vw,1.08rem)]'
            }`}
          >
            {BHAKTI_PARENT_LINE}
          </p>
        </div>

        <div className={`flex items-center justify-center ${compact ? 'py-0.5 md:pt-2' : 'md:pt-3'}`}>
          <div
            className="font-script font-normal italic text-invite-mauve"
            style={{ fontSize: scriptAmp, lineHeight: 1 }}
          >
            &amp;
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div
            className="font-script font-normal text-invite-wine"
            style={{ fontSize: scriptD, lineHeight: 0.95 }}
          >
            Dhananjay
          </div>
          <p
            className={`font-cormorant leading-relaxed text-invite-ink-soft ${
              compact
                ? 'mt-1 max-w-[20rem] text-[clamp(0.72rem,2.4vw,0.88rem)]'
                : 'mt-3 max-w-[26rem] text-[clamp(0.98rem,2vw,1.08rem)]'
            }`}
          >
            {DHANANJAY_PARENT_LINE}
          </p>
        </div>
      </div>

      <p
        className={`font-cormorant italic leading-relaxed text-invite-ink-soft whitespace-pre-line before:content-['\201C'] after:content-['\201D'] ${
          compact
            ? 'mt-2 max-w-[34ch] text-[clamp(0.72rem,2.3vw,0.9rem)]'
            : 'mt-6 max-w-2xl text-[clamp(0.88rem,2vw,1.06rem)]'
        }`}
      >
        {INVITE_CELEBRATION}
      </p>

      <div className={`flex flex-col items-center gap-1 text-invite-wine ${compact ? 'mt-2' : 'mt-8'}`}>
        <span
          className="font-cinzel font-bold uppercase tracking-[0.14em]"
          style={{ fontSize: compact ? 'clamp(0.78rem, 2.3vw, 1rem)' : 'clamp(0.95rem, 2.4vw, 1.45rem)' }}
        >
          {WEDDING_DATE_HEADLINE}
        </span>
      </div>
    </div>
  )
}
