import React from 'react'
import { motion } from 'framer-motion'
import KolamWaveDivider from './KolamWaveDivider.jsx'
import Countdown from './Countdown.jsx'
import {
  BHAKTI_PARENT_LINE,
  COUNTDOWN_INTRO,
  DHANANJAY_PARENT_LINE,
  INVITE_BLESSING,
  INVITE_CELEBRATION,
  INVITE_HEADER,
  INVITE_OPENING_VERSE,
  INVITE_TAGLINE,
} from '../constants/inviteCopy.js'
import { CEREMONY_DATE_HEADLINE } from '../constants/wedding.js'
import { heroStaggerContainer, heroStaggerItem } from '../constants/motion.js'

const fullCoupleName = { fontSize: 'clamp(2.75rem, 10vw, 7rem)' }
const fullAmp = { fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }

const envelopeCoupleName = { fontSize: 'clamp(1.55rem, 5.2vw, 2.35rem)' }
const envelopeAmp = { fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }

export default function InviteHeroCopy({ variant = 'full' }) {
  const envelope = variant === 'envelope'
  const coupleNameSize = envelope ? envelopeCoupleName : fullCoupleName
  const ampSize = envelope ? envelopeAmp : fullAmp

  const gridGap = envelope ? 'gap-y-2 sm:gap-y-2.5' : 'gap-y-5 sm:gap-y-6'
  const blockGap = envelope ? 'gap-2 sm:gap-2.5' : 'gap-4 sm:gap-5'
  const parentClass = envelope
    ? 'invite-hero-parent mx-auto max-w-[22rem] text-[clamp(0.72rem,2.2vw,0.88rem)] italic'
    : 'invite-hero-parent mx-auto max-w-[26rem] italic'
  const dateMetaClass = envelope ? 'invite-hero-meta px-1 text-[9px] tracking-[0.2em] sm:text-[10px]' : 'invite-hero-meta px-2 pt-1'

  const Root = envelope ? 'div' : motion.div
  const Block = envelope ? 'div' : motion.div
  const rootProps = envelope
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: heroStaggerContainer,
      }
  const blockProps = envelope ? {} : { variants: heroStaggerItem }

  return (
    <Root
      className={`mx-auto grid w-full max-w-5xl grid-rows-[auto_auto_auto] text-center ${gridGap} ${
        envelope ? 'px-2' : ''
      }`}
      {...rootProps}
    >
      <Block className={`relative z-[2] flex flex-col items-center ${blockGap}`} {...blockProps}>
        <div className={`w-full ${envelope ? '' : 'md:mt-1'}`}>
          <KolamWaveDivider compact animateIn={!envelope} />
        </div>
        {!envelope ? (
          <>
            <p className="invite-hero-blessing">{INVITE_BLESSING}</p>
            <h1 className="invite-hero-title">{INVITE_HEADER}</h1>
            <p className="invite-hero-tagline">{INVITE_TAGLINE}</p>
          </>
        ) : (
          <div className="invite-hero-meta px-1">
            <span className="block text-[9px]">{INVITE_BLESSING}</span>
            <span className="mt-1 block font-cinzel text-sm">{INVITE_HEADER}</span>
            <span className="mt-0.5 block italic">{INVITE_TAGLINE}</span>
          </div>
        )}
        <p className={envelope ? 'invite-hero-body mx-auto max-w-[34ch] px-1 text-[clamp(0.8rem,2.6vw,0.95rem)] leading-relaxed italic' : 'invite-hero-body mx-auto max-w-xl px-2 italic text-pretty'}>
          {INVITE_OPENING_VERSE}
        </p>
      </Block>

      <Block
        className={`relative z-[2] flex min-h-0 w-full flex-col items-center justify-center ${
          envelope ? 'px-1 pt-1' : 'px-2 pt-2 sm:pt-4'
        }`}
        {...blockProps}
      >
        <div
          className={`grid w-full max-w-4xl grid-cols-1 items-center justify-center md:grid-cols-[1fr_auto_1fr] ${
            envelope ? 'gap-2 sm:gap-3 md:gap-x-6' : 'gap-4 sm:gap-5 md:gap-x-10'
          }`}
        >
          <div className={`flex flex-col items-center text-center ${envelope ? 'gap-1' : 'gap-2 sm:gap-3'}`}>
            <div className="invite-couple-name" style={coupleNameSize}>
              Bhakti
            </div>
            <p className={parentClass}>{BHAKTI_PARENT_LINE}</p>
          </div>
          <div className={`flex items-center justify-center ${envelope ? 'py-0.5 md:pt-2' : 'py-1 md:pt-4'}`}>
            <span
              className={`invite-couple-amp inline-block ${envelope ? 'translate-y-1 md:mx-1' : 'translate-y-2 md:mx-2'}`}
              style={ampSize}
            >
              &amp;
            </span>
          </div>
          <div className={`flex flex-col items-center text-center ${envelope ? 'gap-1' : 'gap-2 sm:gap-3'}`}>
            <div className="invite-couple-name" style={coupleNameSize}>
              Dhananjay
            </div>
            <p className={parentClass}>{DHANANJAY_PARENT_LINE}</p>
          </div>
        </div>
      </Block>

      <Block
        className={`relative z-[2] flex flex-col items-center ${envelope ? 'gap-2 px-2 sm:gap-3' : 'gap-4 px-3 sm:gap-5 sm:px-4'}`}
        {...blockProps}
      >
        <p className={envelope ? 'invite-hero-body mx-auto max-w-[32ch] text-[clamp(0.78rem,2.4vw,0.92rem)] leading-relaxed italic' : 'invite-hero-body mx-auto max-w-lg italic tracking-wide text-pretty'}>
          {INVITE_CELEBRATION}
        </p>
        <div className={dateMetaClass}>{CEREMONY_DATE_HEADLINE}</div>
        {!envelope ? (
          <div className="w-full pt-1">
            <Countdown dense heroReadable intro={COUNTDOWN_INTRO} targetIso="2027-03-14T08:48:00+05:30" />
          </div>
        ) : null}
      </Block>
    </Root>
  )
}
