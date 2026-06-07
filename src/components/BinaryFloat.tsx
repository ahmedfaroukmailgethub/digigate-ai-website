import { useEffect, useRef } from 'react'

/**
 * Soft floating "01" binary characters in the background.
 * Drop this inside a positioned (relative/absolute) parent.
 * It fills its parent and is pointer-events-none.
 */
export default function BinaryFloat() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    interface Bit {
      x: number; y: number; vx: number; vy: number
      ch: string; size: number; targetAlpha: number
      phase: number; phaseSpeed: number
    }
    const COUNT = 150
    const bits: Bit[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() * 0.16 + 0.04) * (Math.random() > 0.85 ? -1 : 1),
      ch: Math.random() > 0.5 ? '0' : '1',
      size: 10 + Math.random() * 7,
      targetAlpha: 0.14 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.004 + Math.random() * 0.010,
    }))

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx!.clearRect(0, 0, W, H)
      for (const b of bits) {
        b.x += b.vx; b.y += b.vy; b.phase += b.phaseSpeed
        if (b.x < -20) b.x = W + 20
        if (b.x > W + 20) b.x = -20
        if (b.y < -20) { b.y = H + 20; b.ch = Math.random() > 0.5 ? '0' : '1' }
        if (b.y > H + 20) { b.y = -20; b.ch = Math.random() > 0.5 ? '0' : '1' }
        const breath = 0.5 + 0.5 * Math.sin(b.phase)
        const a = b.targetAlpha * breath
        if (Math.random() < 0.001) b.ch = b.ch === '0' ? '1' : '0'
        ctx!.font = `${b.size}px "Courier New", monospace`
        ctx!.fillStyle = `rgba(180,200,255,${a})`
        ctx!.fillText(b.ch, b.x, b.y)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}
