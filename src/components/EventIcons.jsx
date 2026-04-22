import React from 'react'

function BaseIcon({ children, className = '', size = 28, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

const stroke = 'currentColor'

export function HaldiIcon(props) {
  return (
    <BaseIcon title="Haldi" {...props}>
      <path
        d="M20 8c6.5 0 11.5 5 11.5 11.5S26.5 31 20 31 8.5 26 8.5 19.5 13.5 8 20 8Z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeOpacity="0.95"
      />
      <path
        d="M20 12v16M12 20h16M14.3 14.3l11.4 11.4M25.7 14.3 14.3 25.7"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="1"
      />
      <circle cx="20" cy="20" r="2.2" fill={stroke} fillOpacity="0.38" />
    </BaseIcon>
  )
}

export function MehendiIcon(props) {
  return (
    <BaseIcon title="Mehendi" {...props}>
      <path
        d="M13 26c4-8 10-12 14-16"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 10c3 3 4 7 2 10-2 3-6 4-10 2"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="1"
      />
      <path
        d="M13.5 26.5c4.5 2 9 2 13.5 0"
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22" r="1.1" fill={stroke} fillOpacity="0.35" />
      <circle cx="24" cy="18" r="1.1" fill={stroke} fillOpacity="0.35" />
    </BaseIcon>
  )
}

export function SangeetIcon(props) {
  return (
    <BaseIcon title="Sangeet" {...props}>
      {/* musical note */}
      <path
        d="M24 10v14.5"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M24 10c3 1.6 5 2.3 7.5 2.6"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="27.5" r="3.2" stroke={stroke} strokeWidth="2" />
      <path
        d="M24 21c-1.7-0.6-3.2-0.4-4.6 0.2"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </BaseIcon>
  )
}

export function BaraatIcon(props) {
  return (
    <BaseIcon title="Baraat" {...props}>
      {/* clearer horse head profile (baraat) */}
      <path
        d="M28.8 27.8H14.2c0-4.9 1.5-8.5 4.4-10.8 0.9-0.7 1.5-1.5 1.9-2.4l-2.3-1.6 3.4-2.8 2.1 2.2c2.3-0.2 4.2 0.4 5.6 1.8-0.9 1.2-1.2 2.4-0.9 3.8 0.3 1.4-0.1 2.6-1.2 3.7-1 1-2.4 1.7-4.2 2.1h6.8v2Z"
        fill={stroke}
        fillOpacity="0.14"
        stroke={stroke}
        strokeWidth="1.9"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M21.2 15.7c0.6 1.2 1.5 2.3 2.6 3.1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <circle cx="25.2" cy="17.2" r="1.1" fill={stroke} fillOpacity="0.45" />
      <path
        d="M12 30h18"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </BaseIcon>
  )
}

export function ReceptionIcon(props) {
  return (
    <BaseIcon title="Reception" {...props}>
      <path
        d="M15 12h10"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.95"
      />
      <path
        d="M16 12c0 9 2 15 4 16h0c2-1 4-7 4-16"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeOpacity="1"
      />
      <path
        d="M20 28v4"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 32h8"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M26 10l1-3M29 12l3-1M27.5 14l2 2"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </BaseIcon>
  )
}

