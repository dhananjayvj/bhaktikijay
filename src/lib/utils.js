import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** shadcn-style className merge */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
