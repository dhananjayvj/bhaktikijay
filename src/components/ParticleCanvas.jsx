import React, { useEffect, useRef } from 'react'

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function ParticleCanvas({
  triggerId,
  particleCount = 120,
  className = '',
  colors = ['#D4AF37', '#E2725B'],
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!triggerId) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const parent = canvas.parentElement
    const w = parent ? parent.clientWidth : window.innerWidth
    const h = parent ? parent.clientHeight : window.innerHeight

    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const center = { x: w / 2, y: h / 2 }

    const particles = Array.from({ length: particleCount }).map(() => {
      const angle = rand(-Math.PI, Math.PI)
      const speed = rand(2.5, 6.2)
      return {
        x: center.x,
        y: center.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(0.5, 2.2),
        r: rand(1.1, 2.8),
        life: rand(520, 980),
        t0: performance.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    let raf = 0
    const animate = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const age = now - p.t0
        if (age > p.life) continue

        const progress = age / p.life
        const drag = 1 - progress * 0.65
        p.vx *= drag
        p.vy = p.vy + 0.09 + progress * 0.02 // gentle gravity
        p.x += p.vx
        p.y += p.vy

        const alpha = Math.max(0, 1 - progress)
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = window.requestAnimationFrame(animate)
    }

    raf = window.requestAnimationFrame(animate)

    const stopMs = 1200
    const stop = window.setTimeout(() => {
      window.cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, w, h)
    }, stopMs)

    return () => {
      window.clearTimeout(stop)
      window.cancelAnimationFrame(raf)
    }
  }, [triggerId, particleCount, colors])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

