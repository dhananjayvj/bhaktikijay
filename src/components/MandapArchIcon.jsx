import React from 'react'

/** Four-pillared canopy / temple arch — gold stroke, pairs with invite palette */
export default function MandapArchIcon({ className = '', size = 26 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 32V14M12 32V14M28 32V14M34 32V14"
        stroke="#D4AF37"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 14 Q20 2 34 14"
        stroke="#D4AF37"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 14 Q20 7 30 14"
        stroke="#D4AF37"
        strokeOpacity="0.45"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
