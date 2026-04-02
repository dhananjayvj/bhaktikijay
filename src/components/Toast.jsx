import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ message, open, onClose, durationMs = 2400 }) {
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => onClose?.(), durationMs)
    return () => window.clearTimeout(t)
  }, [open, durationMs, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
          className="fixed bottom-5 left-1/2 z-[80] w-[min(92vw,520px)] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-cream/95 px-5 py-3 text-center shadow-lg backdrop-blur">
            <span className="text-gold-dark font-lato text-sm font-semibold">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

