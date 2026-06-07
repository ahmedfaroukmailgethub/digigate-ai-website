import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, PencilRuler, Hammer, Rocket, LifeBuoy } from 'lucide-react'

/* ── Soft floating "01" binary background ── */
function BinaryFloat() {
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

const steps = [
  { icon: Search, title: 'Discover', desc: 'Workshops, audits, and target operating model design.' },
  { icon: PencilRuler, title: 'Design', desc: 'Architecture, UX, and detailed solution blueprints.' },
  { icon: Hammer, title: 'Build', desc: 'Engineering, integration, AI, infrastructure deployment.' },
  { icon: Rocket, title: 'Launch', desc: 'Change management, training, and go-live with full migration.' },
  { icon: LifeBuoy, title: 'Operate', desc: '24/7 managed operations, SLAs, and continuous improvement.' },
]

export default function Approach() {
  return (
    <section id="approach" className="py-8 lg:py-10 relative overflow-hidden">
      <BinaryFloat />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Our approach</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            A single, accountable <span className="text-gradient">delivery model</span>
          </h2>
          <p className="mt-4 text-slate-300/90">
            We own the outcome end-to-end, removing the integration risk that comes
            from juggling multiple vendors.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="relative mx-auto w-14 h-14 rounded-2xl glass grid place-items-center">
                  <s.icon className="w-6 h-6 text-brand-300" />
                  <span className="absolute -top-2 -right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/30 border border-brand-400/40 text-brand-100">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
