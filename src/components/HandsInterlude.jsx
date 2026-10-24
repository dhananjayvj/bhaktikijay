import React, { memo } from 'react'
import holdingHandsSmall from '../../images/hold-hands-560.webp'
import holdingHandsLarge from '../../images/hold-hands-1000.webp'

function HandsInterlude() {
  return (
    <section className="border-t border-gold/20 bg-invite-paper px-6 py-14 md:py-20">
      <figure className="mx-auto max-w-[26rem] border border-gold/30 bg-white/45 p-2 shadow-[0_16px_38px_rgba(62,41,34,0.1)]">
        <img
          src={holdingHandsSmall}
          srcSet={`${holdingHandsSmall} 560w, ${holdingHandsLarge} 1000w`}
          sizes="(max-width: 480px) calc(100vw - 48px), 416px"
          width="1000"
          height="1392"
          alt="Bhakti and Dhananjay holding hands"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <figcaption className="px-2 pb-2 pt-4 text-center font-cormorant text-xl italic leading-snug text-primary-deep">
          Here’s to all the moments we’ll share together.
        </figcaption>
      </figure>
    </section>
  )
}

export default memo(HandsInterlude)
