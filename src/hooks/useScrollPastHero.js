import { useEffect, useState } from 'react'

/** True once the invitation hero is mostly scrolled out of view */
export function useScrollPastHero(enabled) {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setPastHero(false)
      return undefined
    }

    const hero = document.getElementById('invitation')
    if (!hero) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(entry.intersectionRatio < 0.35)
      },
      { threshold: [0, 0.15, 0.35, 0.5, 0.75, 1] },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [enabled])

  return pastHero
}
