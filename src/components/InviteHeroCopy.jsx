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

export default function InviteHeroCopy({ variant = 'full' }) {
  const envelope = variant === 'envelope'

  const gridGap = envelope ? 'gap-y-2 sm:gap-y-2.5' : 'gap-y-4 sm:gap-y-6'
  const blockGap = envelope ? 'gap-2 sm:gap-2.5' : 'gap-3 sm:gap-5'
  const parentClass = envelope
    ? 'invite-hero-parent mx-auto max-w-[22rem] text-[clamp(0.72rem,2.2vw,0.88rem)]'
    : 'invite-hero-parent w-full text-pretty'

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
        envelope ? 'px-2' : 'px-1 sm:px-0'
      }`}
      {...rootProps}
    >
      <Block className={`relative z-[2] flex w-full flex-col items-center ${blockGap}`} {...blockProps}>
        <div className={`w-full ${envelope ? '' : 'md:mt-1'}`}>
          <KolamWaveDivider compact animateIn={!envelope} />
        </div>
        {!envelope ? (
          <>
            <p className="invite-hero-blessing px-1">{INVITE_BLESSING}</p>
            <h1 className="invite-hero-title px-1">{INVITE_HEADER}</h1>
            <p className="invite-hero-tagline px-1">{INVITE_TAGLINE}</p>
          </>
        ) : (
          <div className="invite-hero-meta px-1">
            <span className="block text-[9px]">{INVITE_BLESSING}</span>
            <span className="mt-1 block font-cinzel text-sm">{INVITE_HEADER}</span>
            <span className="mt-0.5 block italic">{INVITE_TAGLINE}</span>
          </div>
        )}
        <p
          className={
            envelope
              ? 'invite-hero-body mx-auto max-w-[34ch] px-1 text-[clamp(0.8rem,2.6vw,0.95rem)] leading-relaxed italic'
              : 'invite-hero-body mx-auto w-full max-w-xl px-3 text-pretty sm:px-2'
          }
        >
          {INVITE_OPENING_VERSE}
        </p>
      </Block>

      <Block
        className={`relative z-[2] flex min-h-0 w-full flex-col items-center justify-center ${
          envelope ? 'px-1 pt-1' : 'px-2 pt-1 sm:pt-4'
        }`}
        {...blockProps}
      >
        <div className="invite-couple-grid w-full max-w-4xl px-1 sm:px-2">
          <div className="invite-couple-column">
            <div className={envelope ? 'invite-couple-name invite-couple-name--envelope' : 'invite-couple-name'}>
              Bhakti
            </div>
            <p className={parentClass}>{BHAKTI_PARENT_LINE}</p>
          </div>

          <div className="invite-couple-amp-cell" aria-hidden="true">
            <span className={envelope ? 'invite-couple-amp invite-couple-amp--envelope' : 'invite-couple-amp'}>
              &amp;
            </span>
          </div>

          <div className="invite-couple-column">
            <div className={envelope ? 'invite-couple-name invite-couple-name--envelope' : 'invite-couple-name'}>
              Dhananjay
            </div>
            <p className={parentClass}>{DHANANJAY_PARENT_LINE}</p>
          </div>
        </div>
      </Block>

      <Block
        className={`relative z-[2] flex w-full flex-col items-center ${envelope ? 'gap-2 px-2 sm:gap-3' : 'gap-3 px-2 sm:gap-5 sm:px-4'}`}
        {...blockProps}
      >
        <p
          className={
            envelope
              ? 'invite-hero-celebration mx-auto max-w-[32ch] text-[clamp(0.78rem,2.4vw,0.92rem)] leading-relaxed'
              : 'invite-hero-celebration mx-auto w-full max-w-lg px-2 text-pretty sm:px-0'
          }
        >
          {INVITE_CELEBRATION}
        </p>
        <div
          className={
            envelope
              ? 'invite-hero-date px-1 text-[9px] tracking-[0.2em] sm:text-[10px]'
              : 'invite-hero-date w-full px-2 pt-1'
          }
        >
          {CEREMONY_DATE_HEADLINE}
        </div>
        {!envelope ? (
          <div className="w-full max-w-md px-1 pt-1 sm:max-w-xl sm:px-0">
            <Countdown dense heroReadable intro={COUNTDOWN_INTRO} targetIso="2027-03-14T08:48:00+05:30" />
          </div>
        ) : null}
      </Block>
    </Root>
  )
}
