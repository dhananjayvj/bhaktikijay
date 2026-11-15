import React, { memo } from 'react'
import melukoteOrnament from '../../images/heritage-melukote-footer.webp'
import floralOrnament from '../../images/heritage-bougainvillea.webp'

/** Quiet illustrated footer ornaments, confined to each section's bottom padding. */
function SectionDoodleBackdrop({ variant = 'cream' }) {
  return (
    <div aria-hidden="true" className={`section-heritage-backdrop section-heritage-backdrop--${variant}`}>
      <img className="section-edge-melukote" src={melukoteOrnament} width="900" height="300" alt="" loading="lazy" decoding="async" />
      <img className="section-edge-floral" src={floralOrnament} width="600" height="200" alt="" loading="lazy" decoding="async" />
    </div>
  )
}

export default memo(SectionDoodleBackdrop)
