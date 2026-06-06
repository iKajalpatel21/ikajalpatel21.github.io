import { useEffect, useRef } from 'react'

const COLORS = [
  { r: 124, g: 58,  b: 237 }, // violet
  { r: 99,  g: 102, b: 241 }, // indigo
  { r: 6,   g: 182, b: 212 }, // teal
  { r: 167, g: 139, b: 250 }, // lavender
  { r: 59,  g: 130, b: 246 }, // blue
]

function lerp(a, b, t) {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t }
}

function cycleColor(time, offset) {
  const t = ((time * 0.0004) + offset) % 1
  const idx = t * (COLORS.length - 1)
  const i = Math.floor(idx)
  return lerp(COLORS[i], COLORS[Math.min(i + 1, COLORS.length - 1)], idx - i)
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight
    let raf

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      offset: Math.random(),
    }))

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const c = cycleColor(time, p.offset)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.55)`
        ctx.fill()
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const c = cycleColor(time, (particles[i].offset + particles[j].offset) / 2)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.12 * (1 - dist / 110)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}
