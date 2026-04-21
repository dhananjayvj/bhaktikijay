/**
 * Subtle haptic + very quiet procedural “seal / paper” sound on seal break.
 * Sound is optional (user gesture unlocks AudioContext on most browsers).
 */
export function playSealBreakFeedback() {
  if (typeof window === 'undefined') return

  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate([12, 24, 10])
    } catch {
      /* ignore */
    }
  }

  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const rate = ctx.sampleRate
    const dur = 0.11
    const n = Math.floor(rate * dur)
    const buffer = ctx.createBuffer(1, n, rate)
    const ch = buffer.getChannelData(0)
    for (let i = 0; i < n; i++) {
      const t = i / rate
      const env = Math.exp(-t * 38) * (0.35 + 0.2 * Math.sin(t * 420))
      ch[i] = (Math.random() * 2 - 1) * env
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400
    lp.Q.value = 0.7
    const gain = ctx.createGain()
    gain.gain.value = 0.06
    src.connect(lp)
    lp.connect(gain)
    gain.connect(ctx.destination)
    src.start(0)
    src.onended = () => {
      try {
        ctx.close()
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}
