import React, { memo } from 'react'
import holdingHandsSmall from '../../images/hold-hands-560.webp'
import holdingHandsLarge from '../../images/hold-hands-1000.webp'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'

function HandsInterlude() {
  return (
    <section className="relative overflow-hidden border-t border-gold/20 bg-invite-paper px-6 py-14 md:py-20">
      <SectionDoodleBackdrop variant="hands" />
      <h2 className="relative z-[1] mx-auto mb-7 max-w-[20ch] text-center font-cormorant text-3xl font-medium italic leading-tight text-[#63353a] md:text-4xl">
        Hand in hand, with all of you beside us.
      </h2>
      <figure className="relative z-[1] mx-auto max-w-[26rem] border border-gold/30 bg-white/45 p-2 shadow-[0_16px_38px_rgba(62,41,34,0.1)]">
        <img
          src={holdingHandsSmall}
          srcSet={`${holdingHandsSmall} 560w, ${holdingHandsLarge} 1000w`}
          sizes="(max-width: 480px) calc(100vw - 48px), 416px"
          width="1000"
          height="1598"
          alt="Bhakti and Dhananjay holding hands"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </figure>
    </section>
  )
}

export default memo(HandsInterlude)
