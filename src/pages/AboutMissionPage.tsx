import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Rocket, Shield, Zap, HandshakeIcon, Star, Cpu } from 'lucide-react'

/* ─── Globe with Moving Digits Animation ─── */
function DigitalGlobeNetwork() {
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

    const CHARS = '01アイウエ10110101001010110100101101001'
    const COLORS = ['#5b8aff', '#22d3ee', '#a855f7', '#34d399', '#f59e0b']
    let rotation = 0

    // Globe nodes
    interface GNode { lat: number; lon: number; color: string; label: string }
    const CITIES: GNode[] = [
      { lat: 0.42, lon: 0.25, color: '#22d3ee', label: 'Dubai' },
      { lat: 0.9,  lon: -0.2, color: '#5b8aff', label: 'London' },
      { lat: 0.6,  lon: 1.1,  color: '#34d399', label: 'Singapore' },
      { lat: 0.7,  lon: -1.3, color: '#a855f7', label: 'New York' },
      { lat: 0.55, lon: 2.4,  color: '#f59e0b', label: 'Tokyo' },
      { lat: -0.3, lon: 0.5,  color: '#ec4899', label: 'Nairobi' },
      { lat: 0.5,  lon: -0.5, color: '#5b8aff', label: 'Paris' },
      { lat: 0.35, lon: 1.8,  color: '#22d3ee', label: 'Mumbai' },
    ]

    // Moving digit streams on edges
    interface Stream {
      fromIdx: number; toIdx: number
      progress: number; speed: number
      char: string; color: string; alpha: number
    }
    const streams: Stream[] = []
    for (let i = 0; i < 30; i++) {
      const fi = Math.floor(Math.random() * CITIES.length)
      const ti = (fi + 1 + Math.floor(Math.random() * (CITIES.length - 1))) % CITIES.length
      streams.push({
        fromIdx: fi, toIdx: ti,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.5 + Math.random() * 0.5,
      })
    }

    // Falling digit columns (Matrix-style) in background
    interface Col { x: number; y: number; speed: number; chars: string[]; color: string }
    const cols: Col[] = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.003 + Math.random() * 0.007,
      chars: Array.from({ length: 8 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    function project(lat: number, lon: number, R: number, cx: number, cy: number) {
      const x = R * Math.cos(lat) * Math.sin(lon + rotation)
      const y = R * Math.sin(lat)
      const z = R * Math.cos(lat) * Math.cos(lon + rotation)
      return { sx: cx + x, sy: cy - y * 0.85, z }
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height
      const cx = W / 2, cy = H / 2
      const R = Math.min(W, H) * 0.33
      ctx!.clearRect(0, 0, W, H)

      // Deep background
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, W * 0.7)
      bg.addColorStop(0, 'rgba(8,5,28,1)')
      bg.addColorStop(1, 'rgba(3,4,12,1)')
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)

      // Falling digit columns (background rain)
      ctx!.font = '10px "Courier New", monospace'
      for (const col of cols) {
        col.y = (col.y + col.speed) % 1.2
        for (let k = 0; k < col.chars.length; k++) {
          const alpha = (1 - k / col.chars.length) * 0.18
          ctx!.fillStyle = col.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
          ctx!.fillText(col.chars[k], col.x * W, (col.y - k * 0.025) * H)
        }
      }

      // Globe glow
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.8)
      glow.addColorStop(0, 'rgba(91,138,255,0.22)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = glow
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.8, 0, Math.PI * 2); ctx!.fill()

      // Globe sphere fill (subtle so wireframe pops)
      const sphereFill = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R)
      sphereFill.addColorStop(0, 'rgba(46,84,180,0.22)')
      sphereFill.addColorStop(0.7, 'rgba(20,30,80,0.18)')
      sphereFill.addColorStop(1, 'rgba(8,12,38,0.05)')
      ctx!.fillStyle = sphereFill
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.fill()

      // Outer rim
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.strokeStyle = 'rgba(91,138,255,0.55)'
      ctx!.lineWidth = 1.4; ctx!.stroke()

      // Globe wireframe — latitude rings
      for (let lat = -75; lat <= 75; lat += 15) {
        const lr = (lat * Math.PI) / 180
        const yr = cy - R * Math.sin(lr) * 0.85
        ctx!.beginPath()
        ctx!.ellipse(cx, yr, R * Math.cos(lr), R * Math.cos(lr) * 0.18, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(91,138,255,${lat === 0 ? 0.55 : 0.28})`
        ctx!.lineWidth = lat === 0 ? 1.1 : 0.7
        ctx!.stroke()
      }
      // Longitude meridians
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + rotation
        const sw = Math.abs(Math.cos(angle))
        ctx!.beginPath()
        ctx!.ellipse(cx + R * 0.02 * Math.sin(angle), cy, R * sw, R * 0.85, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(168,85,247,${0.18 + 0.28 * sw})`
        ctx!.lineWidth = 0.7; ctx!.stroke()
      }

      // Project city nodes
      const projected = CITIES.map((c) => ({ ...c, ...project(c.lat, c.lon, R, cx, cy) }))

      // Draw connection lines between cities
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          if (projected[i].z > 0 && projected[j].z > 0) {
            const alpha = 0.25 + 0.25 * Math.min(projected[i].z, projected[j].z) / R
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(91,138,255,${alpha})`
            ctx!.lineWidth = 0.9
            ctx!.moveTo(projected[i].sx, projected[i].sy)
            ctx!.lineTo(projected[j].sx, projected[j].sy)
            ctx!.stroke()
          }
        }
      }

      // Move & draw digit streams along edges
      ctx!.font = 'bold 11px "Courier New", monospace'
      for (const s of streams) {
        s.progress = (s.progress + s.speed) % 1
        if (Math.random() < 0.005) s.char = CHARS[Math.floor(Math.random() * CHARS.length)]

        const from = projected[s.fromIdx]
        const to   = projected[s.toIdx]
        if (from.z > -R * 0.3 && to.z > -R * 0.3) {
          const px = from.sx + (to.sx - from.sx) * s.progress
          const py = from.sy + (to.sy - from.sy) * s.progress
          const depthAlpha = Math.max(0.1, (from.z + R) / (2 * R))

          // Glow behind digit
          const dg = ctx!.createRadialGradient(px, py, 0, px, py, 10)
          dg.addColorStop(0, s.color + 'aa')
          dg.addColorStop(1, s.color + '00')
          ctx!.fillStyle = dg
          ctx!.beginPath(); ctx!.arc(px, py, 10, 0, Math.PI * 2); ctx!.fill()

          // Digit
          ctx!.fillStyle = s.color + Math.round(s.alpha * depthAlpha * 255).toString(16).padStart(2, '0')
          ctx!.fillText(s.char, px - 4, py + 4)
        }
      }

      // Draw city nodes
      for (const p of projected) {
        if (p.z < -R * 0.2) continue
        const alpha = 0.55 + 0.45 * (p.z + R) / (2 * R)

        // Node glow
        const ng = ctx!.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 22)
        ng.addColorStop(0, p.color + 'dd')
        ng.addColorStop(1, p.color + '00')
        ctx!.fillStyle = ng
        ctx!.globalAlpha = alpha
        ctx!.beginPath(); ctx!.arc(p.sx, p.sy, 22, 0, Math.PI * 2); ctx!.fill()

        // Node dot
        ctx!.beginPath(); ctx!.arc(p.sx, p.sy, 6, 0, Math.PI * 2)
        ctx!.fillStyle = p.color; ctx!.fill()
        ctx!.beginPath(); ctx!.arc(p.sx, p.sy, 2.4, 0, Math.PI * 2)
        ctx!.fillStyle = '#fff'; ctx!.fill()

        // City label with dark backdrop for legibility
        ctx!.font = 'bold 12px Inter, "Courier New", monospace'
        const labelW = ctx!.measureText(p.label).width
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = 'rgba(5,6,15,0.7)'
        ctx!.fillRect(p.sx + 8, p.sy - 14, labelW + 8, 16)
        ctx!.fillStyle = '#fff'
        ctx!.fillText(p.label, p.sx + 12, p.sy - 2)
        ctx!.globalAlpha = 1
      }

      rotation += 0.003
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 shadow-2xl shadow-brand-900/40 bg-[#03040c]" style={{ height: '520px' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        <span className="text-xs font-semibold text-cyan-300 tracking-widest uppercase font-mono">Global Data Network — Live</span>
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const missionPillars = [
  {
    Icon: Star,
    title: 'Longstanding Commitment',
    text: 'We provide a longstanding commitment to support our clients through every stage of their digital journey.',
    color: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/40',
    animation: { rotate: [0, -10, 10, 0] },
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Shield,
    title: 'Reliable Platform',
    text: 'Offering the best reliable, intelligent, and easy-to-use digital transformation platform built for enterprise-grade operations.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Cpu,
    title: 'AI Enabled',
    text: 'With AI enabled capabilities, we automate processes, deliver intelligent insights, and empower smarter decision-making.',
    color: 'from-violet-400 to-brand-400',
    glow: 'shadow-violet-500/40',
    animation: { rotate: 360 },
    transition: { duration: 9, repeat: Infinity, ease: 'linear' },
  },
  {
    Icon: Rocket,
    title: 'TO-GO Digital',
    text: 'Helping our clients TO-GO digitally effectively — fast deployment, seamless integration, and measurable results.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { y: [0, -6, 0] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: HandshakeIcon,
    title: 'Client Support',
    text: 'Dedicated to supporting our clients at every step — from strategy to deployment — ensuring long-term success and satisfaction.',
    color: 'from-pink-400 to-accent-400',
    glow: 'shadow-pink-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Zap,
    title: 'Intelligent & Easy-to-Use',
    text: 'Combining intelligence with simplicity — our platform is designed to be powerful yet easy to use for every team member.',
    color: 'from-cyan-400 to-brand-500',
    glow: 'shadow-cyan-500/40',
    animation: { scale: [1, 1.15, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
]

export default function AboutMissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=2000&q=70"
            alt="" aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-12"
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
              DigiGate <span className="text-gradient">MISSION</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement + Animation */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Mission text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300 mb-4">Our Mission</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-7" />
              </div>

              {/* Large mission statement */}
              <div className="space-y-3">
                {[
                  'Our mission is to provide',
                  'longstanding commitment',
                  'to support our clients by offering',
                  'the best reliable, intelligent, and easy-to-use',
                  'digital transformation platform',
                  'with AI enabled',
                  'to help our clients TO-GO digitally effectively',
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className={`font-display font-bold leading-snug ${
                      i === 0 || i === 2 ? 'text-xl text-slate-300' :
                      i === 3 || i === 6 ? 'text-2xl text-white' :
                      i === 4 ? 'text-3xl text-gradient' :
                      i === 5 ? 'text-xl text-brand-300' :
                      'text-2xl text-white'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Mission metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Commitment', value: 'Longstanding' },
                  { label: 'Platform', value: 'AI Enabled' },
                  { label: 'Approach', value: 'TO-GO Digital' },
                  { label: 'Delivery', value: 'Effectively' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="mt-1 font-display text-lg font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Digital Wave Network */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <DigitalGlobeNetwork />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Mission Pillars</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              How We Deliver Our <span className="text-gradient">Mission</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {missionPillars.map((p, i) => (
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
