import React, { memo, useId } from 'react'

function EventWearTip({ tip }) {
  const id = useId()

  if (!tip) return null

  return (
    <details className="timeline-wear-tip group">
      <summary className="timeline-wear-tip-trigger" aria-describedby={id}>
        What should I wear?
      </summary>
      <p id={id} className="timeline-wear-tip-body">
        {tip}
      </p>
    </details>
  )
}

export default memo(EventWearTip)
