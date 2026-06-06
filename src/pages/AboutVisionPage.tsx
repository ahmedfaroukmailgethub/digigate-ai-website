import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Globe, Sparkles, Zap, Target, Cpu } from 'lucide-react'

/* ─── Animated Globe with Digital Cells ─── */
function DigitalGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Globe dots
    const DOTS = 280
    const R_BASE = () => Math.min(canvas.width, canvas.height) * 0.32
    let rotation = 0

    interface Dot {
      lat: number; lon: number
      size: number; color: string
    }
    const dots: Dot[] = Array.from({ length: DOTS }, () => ({
      lat: Math.acos(2 * Math.random() - 1) - Math.PI / 2,
      lon: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2.2,
      color: ['#5b8aff', '#a855f7', '#22d3ee', '#34d399', '#f59e0b'][Math.floor(Math.random() * 5)],
    }))

    // Orbiting cells
    interface Cell {
      angle: number; speed: number; orbitR: number
      orbitTilt: number; size: number; color: string; pulse: number
    }
    const cells: Cell[] = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.006,
      orbitR: 1.25 + Math.random() * 0.5,
      orbitTilt: (Math.random() - 0.5) * 1.2,
      size: 4 + Math.random() * 6,
      color: ['#5b8aff', '#a855f7', '#22d3ee', '#34d399'][Math.floor(Math.random() * 4)],
      pulse: Math.random() * Math.PI * 2,
    }))

    function project(lat: number, lon: number, r: number, cx: number, cy: number) {
      const x = r * Math.cos(lat) * Math.sin(lon + rotation)
      const y = r * Math.sin(lat)
      const z = r * Math.cos(lat) * Math.cos(lon + rotation)
      return { x: cx + x, y: cy - y, z }
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height
      const cx = W / 2, cy = H / 2
      const R = R_BASE()

      ctx!.clearRect(0, 0, W, H)

      // Deep background
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2)
      bg.addColorStop(0, 'rgba(15,10,40,1)')
      bg.addColorStop(1, 'rgba(5,6,15,1)')
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)

      // Globe outer glow
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.6)
      glow.addColorStop(0, 'rgba(91,138,255,0.12)')
      glow.addColorStop(0.5, 'rgba(168,85,247,0.07)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = glow
      ctx!.beginPath()
      ctx!.arc(cx, cy, R * 1.6, 0, Math.PI * 2)
      ctx!.fill()

      // Globe wireframe latitude lines
      for (let lat = -75; lat <= 75; lat += 25) {
        const latR = (lat * Math.PI) / 180
        const yr = cy - R * Math.sin(latR)
        const xr = R * Math.cos(latR)
        ctx!.beginPath()
        ctx!.ellipse(cx, yr, xr, xr * 0.18, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = 'rgba(91,138,255,0.08)'
        ctx!.lineWidth = 0.6
        ctx!.stroke()
      }

      // Globe longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + rotation
        ctx!.beginPath()
        ctx!.ellipse(cx + R * 0.03 * Math.sin(angle), cy, R * Math.abs(Math.cos(angle)), R, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(168,85,247,${0.04 + 0.04 * Math.abs(Math.cos(angle))})`
        ctx!.lineWidth = 0.6
        ctx!.stroke()
      }

      // Draw globe dots
      const visible = dots
        .map(d => ({ ...d, ...project(d.lat, d.lon, R, cx, cy) }))
        .filter(d => d.z > 0)
        .sort((a, b) => a.z - b.z)

      for (const d of visible) {
        const alpha = 0.3 + 0.7 * (d.z / R)
        const grad = ctx!.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 2.5)
        grad.addColorStop(0, d.color + 'ff')
        grad.addColorStop(1, d.color + '00')
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.size * 2.5, 0, Math.PI * 2)
        ctx!.globalAlpha = alpha * 0.4
        ctx!.fillStyle = grad
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = d.color
        ctx!.fill()
        ctx!.globalAlpha = 1
      }

      // Connect nearby dots on surface
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const dx = visible[i].x - visible[j].x
          const dy = visible[i].y - visible[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < R * 0.22) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(91,138,255,${(1 - dist / (R * 0.22)) * 0.3})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(visible[i].x, visible[i].y)
            ctx!.lineTo(visible[j].x, visible[j].y)
            ctx!.stroke()
          }
        }
      }

      // Orbiting digital cells
      for (const cell of cells) {
        cell.angle += cell.speed
        cell.pulse += 0.04
        const orbitR = R * cell.orbitR
        const x = cx + orbitR * Math.cos(cell.angle)
        const y = cy + orbitR * Math.sin(cell.angle) * 0.35 + cell.orbitTilt * R * 0.2
        const pScale = 1 + Math.sin(cell.pulse) * 0.3

        // Connection line to globe surface
        ctx!.beginPath()
        ctx!.strokeStyle = cell.color + '33'
        ctx!.lineWidth = 0.7
        ctx!.setLineDash([3, 5])
        ctx!.moveTo(cx, cy)
        ctx!.lineTo(x, y)
        ctx!.stroke()
        ctx!.setLineDash([])

        // Cell glow
        const cg = ctx!.createRadialGradient(x, y, 0, x, y, cell.size * pScale * 3)
        cg.addColorStop(0, cell.color + 'cc')
        cg.addColorStop(1, cell.color + '00')
        ctx!.beginPath()
        ctx!.arc(x, y, cell.size * pScale * 3, 0, Math.PI * 2)
        ctx!.fillStyle = cg
        ctx!.fill()

        // Cell core (hexagon)
        ctx!.beginPath()
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k
          const px = x + cell.size * pScale * Math.cos(a)
          const py = y + cell.size * pScale * Math.sin(a)
          k === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py)
        }
        ctx!.closePath()
        ctx!.fillStyle = cell.color
        ctx!.fill()
        ctx!.strokeStyle = '#ffffff44'
        ctx!.lineWidth = 0.8
        ctx!.stroke()

        // Data packet travelling toward globe
        const t = (Date.now() / 1200 + cell.angle) % 1
        const px2 = x + (cx - x) * t
        const py2 = y + (cy - y) * t
        ctx!.beginPath()
        ctx!.arc(px2, py2, 2, 0, Math.PI * 2)
        ctx!.fillStyle = '#22d3ee'
        ctx!.fill()
      }

      rotation += 0.003
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative rounded-3xl border border-brand-500/20 shadow-2xl shadow-brand-900/40 overflow-hidden bg-[#05060f]" style={{ height: '560px' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
        </span>
        <span className="text-xs font-semibold text-brand-300 tracking-widest uppercase">Global Digital Network</span>
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const visionPillars = [
  {
    Icon: Eye,
    title: 'Business Success Enablers',
    text: 'Our vision is to be business success enablers for our clients, empowering them to thrive in the digital age.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { scale: [1, 1.15, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Globe,
    title: 'Digital Transformation',
    text: 'Leveraging digital transformation technologies to enable our customers to access their entire data seamlessly.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { rotate: 360 },
    transition: { duration: 10, repeat: Infinity, ease: 'linear' },
  },
  {
    Icon: Cpu,
    title: 'Artificial Intelligence',
    text: 'Harnessing the power of AI to automate work processes and deliver intelligent solutions that drive real results.',
    color: 'from-violet-400 to-brand-400',
    glow: 'shadow-violet-500/40',
    animation: { rotate: [0, -8, 8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Zap,
    title: 'One-Click Efficiency',
    text: 'Enabling customers to do all work processes in one click — eliminating friction and accelerating digital operations.',
    color: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/40',
    animation: { y: [0, -6, 0] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Target,
    title: 'Client-Centric Focus',
    text: 'Every solution we build is designed around client goals — measurable, scalable, and aligned with business success.',
    color: 'from-pink-400 to-accent-400',
    glow: 'shadow-pink-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Sparkles,
    title: 'Unified Data Access',
    text: 'A vision of seamless data access — all information, processes, and insights unified on a single intelligent platform.',
    color: 'from-cyan-400 to-brand-500',
    glow: 'shadow-cyan-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
]

export default function AboutVisionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=70"
            alt="" aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/92 to-[#05060f]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/20 to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              About DigiGate
            </div>
            <h1 className="mt-7 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-[72px]">
              DigiGate <span className="text-gradient">VISION</span>
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-300/90 text-justify font-light">
              Our vision is to be business success enablers for our clients, leveraging the digital transformation
              and Artificial Intelligence technologies to enable our customers to access their entire data and do
              all work process in one click.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Globe + Vision statement */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Globe animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <DigitalGlobe />
            </motion.div>

            {/* Vision text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300 mb-4">Our Vision</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-7" />
              </div>

              <blockquote className="relative pl-6 border-l-2 border-brand-400">
                <p className="text-2xl font-display font-bold leading-snug text-white">
                  "To be business success enablers for our clients"
                </p>
                <p className="mt-4 text-base leading-8 text-slate-300/90 text-justify">
                  Leveraging the digital transformation and Artificial Intelligence technologies to enable our
                  customers to access their entire data and do all work process in one click.
                </p>
              </blockquote>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Digital Transformation', value: 'Core Engine' },
                  { label: 'AI Technologies', value: 'Key Driver' },
                  { label: 'Data Access', value: 'Unified' },
                  { label: 'Work Process', value: 'One Click' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="mt-1 font-display text-lg font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision pillars */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Vision Pillars</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              How We Deliver Our <span className="text-gradient">Vision</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visionPillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={p.animation}
                  transition={p.transition}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg ${p.glow}`}
                >
                  <p.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-7 text-slate-400 text-justify">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
