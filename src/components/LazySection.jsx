import React, { memo } from 'react'

/** Lightweight section wrapper — lazy chunks handle their own reveal */
function LazySection({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export default memo(LazySection)
