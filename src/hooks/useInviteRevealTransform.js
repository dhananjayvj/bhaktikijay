import { useTransform } from 'framer-motion'
import { REVEAL_SCALE_RANGE, REVEAL_Y_RANGE } from '../constants/revealMotion.js'

/** GPU-friendly scale + lift driven by curtain progress (0 → 1). */
export function useInviteRevealTransform(curtainProgress) {
  const contentScale = useTransform(curtainProgress, [0, 1], REVEAL_SCALE_RANGE)
  const contentY = useTransform(curtainProgress, [0, 1], REVEAL_Y_RANGE)

  return { contentScale, contentY }
}
