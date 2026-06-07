import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ─── Hero: Rotating globe with floating binary 01 codes ─── */
function GlobeBinaryBackground() {
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

    let rotation = 0

    // Simple world-map landmass blobs (lat/lon in radians, radius)
    // Approximate continents as collections of points
    const continents: { lat: number; lon: number; r: number }[] = []
    function addBlob(latC: number, lonC: number, sx: number, sy: number, dense: number) {
      for (let i = 0; i < dense; i++) {
        const a = Math.random() * Math.PI * 2
        const d = Math.sqrt(Math.random())
        continents.push({
          lat: latC + Math.sin(a) * d * sy,
          lon: lonC + Math.cos(a) * d * sx,
          r: 0.7 + Math.random() * 0.6,
        })
      }
    }
    // Africa
    addBlob(0.1, 0.35, 0.35, 0.6, 90)
    // Europe
    addBlob(0.9, 0.2, 0.35, 0.2, 50)
    // Asia
    addBlob(0.7, 1.5, 0.7, 0.45, 140)
    // North America
    addBlob(0.85, -1.6, 0.55, 0.45, 90)
    // South America
    addBlob(-0.4, -1.1, 0.25, 0.55, 60)
    // Australia
    addBlob(-0.45, 2.3, 0.3, 0.2, 40)

    // Floating binary "01" particles around the globe
    interface Bin {
      angle: number; orbit: number; speed: number
      ch: string; size: number; color: string; alpha: number
      drift: number
    }
    const COLORS = ['#5b8aff', '#22d3ee', '#a855f7', '#34d399', '#f59e0b']
    const bins: Bin[] = Array.from({ length: 90 }, () => ({
      angle: Math.random() * Math.PI * 2,
      orbit: 0.55 + Math.random() * 0.85,        // multiplier of globe R
      speed: (0.0006 + Math.random() * 0.0014) * (Math.random() > 0.5 ? 1 : -1),
      ch: Math.random() > 0.5 ? '0' : '1',
      size: 10 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.45 + Math.random() * 0.45,
      drift: Math.random() * Math.PI * 2,
    }))

    // Inner binary particles that sit on the surface
    interface Surf { lat: number; lon: number; ch: string; color: string }
    const surfBins: Surf[] = Array.from({ length: 28 }, () => ({
      lat: (Math.random() - 0.5) * Math.PI * 0.9,
      lon: Math.random() * Math.PI * 2,
      ch: Math.random() > 0.5 ? '0' : '1',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    function project(lat: number, lon: number, R: number, cx: number, cy: number) {
      const x = R * Math.cos(lat) * Math.sin(lon + rotation)
      const y = R * Math.sin(lat)
      const z = R * Math.cos(lat) * Math.cos(lon + rotation)
      return { sx: cx + x, sy: cy - y * 0.92, z }
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height
      const cx = W * 0.66, cy = H / 2
      const R = Math.min(W, H) * 0.34
      ctx!.clearRect(0, 0, W, H)

      // Deep gradient backdrop
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, W * 0.9)
      bg.addColorStop(0, 'rgba(10,16,40,1)')
      bg.addColorStop(0.6, 'rgba(5,8,22,1)')
      bg.addColorStop(1, 'rgba(2,3,10,1)')
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)

      // Globe glow
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 2.0)
      glow.addColorStop(0, 'rgba(91,138,255,0.18)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = glow
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 2.0, 0, Math.PI * 2); ctx!.fill()

      // Sphere fill
      const sphere = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R)
      sphere.addColorStop(0, 'rgba(46,84,180,0.28)')
      sphere.addColorStop(0.7, 'rgba(18,28,72,0.22)')
      sphere.addColorStop(1, 'rgba(6,10,30,0.05)')
      ctx!.fillStyle = sphere
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.fill()

      // Outer rim
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.strokeStyle = 'rgba(91,138,255,0.55)'; ctx!.lineWidth = 1.3; ctx!.stroke()

      // Latitudes
      for (let lat = -75; lat <= 75; lat += 15) {
        const lr = (lat * Math.PI) / 180
        const yr = cy - R * Math.sin(lr) * 0.92
        ctx!.beginPath()
        ctx!.ellipse(cx, yr, R * Math.cos(lr), R * Math.cos(lr) * 0.18, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(91,138,255,${lat === 0 ? 0.4 : 0.18})`
        ctx!.lineWidth = lat === 0 ? 0.9 : 0.5; ctx!.stroke()
      }
      // Meridians
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + rotation
        const sw = Math.abs(Math.cos(angle))
        ctx!.beginPath()
        ctx!.ellipse(cx + R * 0.02 * Math.sin(angle), cy, R * sw, R * 0.92, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(168,85,247,${0.10 + 0.18 * sw})`
        ctx!.lineWidth = 0.5; ctx!.stroke()
      }

      // Continent dots (world map)
      for (const c of continents) {
        const p = project(c.lat, c.lon, R, cx, cy)
        if (p.z < 0) continue
        const depth = (p.z + R) / (2 * R)
        ctx!.beginPath()
        ctx!.arc(p.sx, p.sy, c.r * (0.6 + 0.6 * depth), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(94,234,212,${0.25 + 0.55 * depth})`
        ctx!.fill()
      }

      // Binary 01 characters on the surface
      ctx!.font = 'bold 11px "Courier New", monospace'
      for (const s of surfBins) {
        const p = project(s.lat, s.lon, R, cx, cy)
        if (p.z < 0) continue
        const depth = (p.z + R) / (2 * R)
        ctx!.fillStyle = s.color + Math.round(0.85 * depth * 255).toString(16).padStart(2, '0')
        ctx!.fillText(s.ch, p.sx - 3, p.sy + 4)
      }

      // Floating binary 01 codes orbiting outside the globe
      ctx!.font = '12px "Courier New", monospace'
      for (const b of bins) {
        b.angle += b.speed
        b.drift += 0.005
        const r = R * b.orbit + Math.sin(b.drift) * 6
        const x = cx + Math.cos(b.angle) * r
        const y = cy + Math.sin(b.angle) * r * 0.85
        ctx!.fillStyle = b.color + Math.round(b.alpha * 255).toString(16).padStart(2, '0')
        ctx!.font = `${b.size}px "Courier New", monospace`
        ctx!.fillText(b.ch, x, y)
        // occasional flip
        if (Math.random() < 0.002) b.ch = b.ch === '0' ? '1' : '0'
      }

      rotation += 0.0018
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

const offices = [
  {
    city: 'Milton Keynes',
    country: 'United Kingdom',
    label: 'UK Office',
    address: '100 Avebury Blvd, Milton Keynes MK9 1FH',
    image: 'https://assets.iwgplc.com/image/upload/c_fill,f_auto,h_667,q_auto,w_1000/v1/CentreImagery/5089/5089_1',
    imageAlt: 'Office building at 100 Avebury Boulevard in Milton Keynes',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    label: 'UAE Office',
    address: 'Ibn Battuta Business Gate, Sheikh Zayed Road, Jebel Ali, Dubai, UAE',
    image: '/ibn-battuta-gate.jpg',
    imageAlt: 'Ibn Battuta Business Gate in Dubai, UAE',
  },
]

const stats = [
  { value: '100+', label: 'Successful Projects' },
  { value: '50+', label: 'DigiGate Products' },
  { value: '20+', label: 'Innovated Tech Ideas' },
  { value: '4', label: 'Served Continents' },
]

const timeline = [
  {
    year: '2012',
    text: 'DigiGate founded in Dubai with a focus on intelligent document management for government.',
  },
  {
    year: '2017',
    text: 'Launched AI Solutions practice; first deployment of machine learning for a national records authority.',
  },
  {
    year: '2018',
    text: 'Expanded into education and aviation sectors; opened London offices.',
  },
  {
    year: '2019',
    text: 'Launched Workflow Automation platform; and Advanced OCR Engine for Arabic.',
  },
  {
    year: '2020',
    text: 'Accelerated growth during digital acceleration wave; delivered 25+ remote transformation programmes.',
  },
  {
    year: '2021',
    text: 'Starting the innovation center for helping our clients modernize, automate, and stay ahead in a changing digital environment.',
  },
  {
    year: '2022',
    text: 'Launched DigiGate AI Platform v1.0 — unified platform combining AI, DMS, and workflow.',
  },
  {
    year: '2023',
    text: 'Introducing the first Education Platform based on AI to shift the learning to next level.',
  },
  {
    year: '2024',
    text: 'Launched Generative AI capabilities; recognised as a leader in enterprise AI by three independent analysts.',
  },
  {
    year: '2026',
    text: 'Scalability & Future Readiness for our solutions integrated with DigiGate AI to grow with the business, allowing easy upgrades, integrations, and expansion when needed.',
  },
]

const principles = [
  {
    icon: ShieldCheck,
    title: 'Built for regulated work',
    text: 'We focus on sectors where auditability, security, resilience, and evidence matter from day one.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Building2,
    title: 'Designed around operations',
    text: 'Our platforms reflect how agencies, universities, airlines, and banks actually work.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { rotate: [0, -8, 8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Users,
    title: 'Delivered with adoption in mind',
    text: 'Implementation methodology and change management are treated as core product capabilities.',
    color: 'from-accent-400 to-pink-400',
    glow: 'shadow-accent-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <GlobeBinaryBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/10 to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-10" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-end lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              About DigiGate
            </div>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[78px]">
              We build the <span className="text-gradient">intelligence</span> behind enterprise
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300/90 md:text-xl md:leading-9">
              DigiGate AI is an enterprise technology company on a singular mission: to make organisations in the world's most demanding sectors — government, education, aviation, and finance — dramatically more intelligent, efficient, and capable through the disciplined application of artificial intelligence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <motion.div
                animate={{ boxShadow: [
                  '0 0 0 0 rgba(91,138,255,0.55)',
                  '0 0 32px 6px rgba(91,138,255,0.55)',
                  '0 0 0 0 rgba(91,138,255,0.55)',
                ] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl"
              >
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 bg-[length:200%_100%] px-5 py-3 text-sm font-semibold text-white transition-[background-position] duration-700 hover:bg-[position:100%_0]"
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                animate={{ boxShadow: [
                  '0 0 0 0 rgba(251,191,36,0.55)',
                  '0 0 32px 6px rgba(251,191,36,0.55)',
                  '0 0 0 0 rgba(251,191,36,0.55)',
                ] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="rounded-xl"
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-[length:200%_100%] px-5 py-3 text-sm font-semibold text-slate-950 transition-[background-position] duration-700 hover:bg-[position:100%_0]"
                >
                  Explore DigiGate Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/72 p-5 shadow-2xl shadow-black/30 backdrop-blur">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <span className="font-display text-2xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* White intro card */}
      <section className="relative -mt-10 pb-10 lg:-mt-16 lg:pb-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101a3a] via-[#0e1730] to-[#0b1428] text-slate-100 shadow-2xl shadow-black/50 ring-1 ring-brand-500/20"
          >
            <div className="grid gap-10 p-8 md:grid-cols-12 md:p-12 lg:p-16">
              <div className="md:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">DigiGate Group At a Glance</p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl text-white">
                  Engineered for the world's most regulated and disciplined AI engineering.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  We combine deep sector expertise with disciplined AI engineering — closing the gap between the promise of
                  enterprise intelligence and what it actually takes to deploy it in government, education, aviation and finance.
                </p>

                <div className="mt-8 flex flex-col items-center md:items-start gap-3">
                  <div className="rounded-2xl bg-[#e3ebf7] p-3 shadow-xl shadow-black/40">
                    <img
                      src="/2-GBH-HD-Logo-N-RBG.png"
                      alt="Global Business Hub"
                      className="h-[2.734rem] md:h-[3.281rem] w-auto object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm font-semibold text-white">Global Business Hub Holding.</p>
                    <p className="mt-1 text-sm text-slate-300">Connecting the Globe for Intelligent Business</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { src: '/DigiGate_AI_Logo-removebg-preview.png', title: 'DigiGate AI', text: 'Enterprise intelligence platform powering our sector-trained AI engines.' },
                  { src: '/DigiGate-R-HD.png', title: 'DigiGate ®', text: <><strong className="font-semibold text-slate-900">Digital Transformation Platform</strong> for enterprises across sectors and industries.</> },
                  { src: '/softtech-logo.png', title: 'SoftTech London', text: 'Empowering Change, Creating the Future — connecting DigiGate to technology worldwide.' },
                  { src: '/wbn-logo.png', title: 'World Business Network', text: 'Global business network connecting DigiGate to clients and partners worldwide.' },
                ].map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 hover:shadow-lg">
                    <div className="flex h-20 items-center justify-center">
                      <img src={card.src} alt={card.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-4 lg:py-6">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Founded on a conviction, built on evidence
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4 text-sm leading-7 text-slate-300/90 md:text-base lg:col-span-7 text-justify"
          >
            <p>
              DigiGate was founded in Dubai in 2012, following a decade and a half spent advising governments and enterprises on technology strategy. The founding insight was straightforward but profound: the organisations that most needed the benefits of digital intelligence — public agencies, educational institutions, airlines, banks — were precisely the ones least equipped to access it.
            </p>
            <p>
              Enterprise AI, at the time, was a capability available primarily to technology companies with vast engineering resources. The platforms that existed were generic, complex, and required significant customisation before they could deliver value in regulated, document-intensive environments. The gap between the promise of AI and the reality of enterprise deployment was enormous.
            </p>
            <p>
              DigiGate was built to close that gap. From the outset, we focused exclusively on sectors where the operational complexity was highest, the regulatory requirements most demanding, and the potential impact most significant. We built AI models trained on sector-specific data. We designed workflows that reflected how government agencies, airlines, and financial institutions actually operate. We invested in implementation methodology and change management, because we understood that technology alone is never enough.
            </p>
            <p>
              A decade later, DigiGate serves over 100 projects across 8 countries, with a dedicated team members whom were dedicated to a single purpose: making our clients measurably more capable than they were before they worked with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-4 lg:py-6">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon

              return (
                <motion.article
                  key={principle.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/10 hover:border-white/20 transition-colors"
                >
                  <motion.div
                    animate={principle.animation}
                    transition={principle.transition}
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${principle.color} text-white shadow-lg ${principle.glow}`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_16px_rgba(91,138,255,0.9)]" />
              A Decade of Progress
            </p>
            <h2 className="sr-only">A Decade of Progress</h2>
          </motion.div>

          <div className="relative mt-8 space-y-5 before:absolute before:left-[72px] before:top-2 before:h-[calc(100%-18px)] before:w-px before:bg-white/10 md:before:left-[86px]">
            {timeline.map((item, index) => {
              const active = item.year === '2026'

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.025 }}
                  className="grid grid-cols-[52px_18px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[64px_20px_minmax(0,1fr)]"
                >
                  <span
                    className={`pt-0.5 font-display text-sm font-bold transition-colors ${
                      active ? 'text-brand-300' : 'text-slate-600'
                    }`}
                  >
                    {item.year}
                  </span>
                  <span className="relative z-10 flex h-6 items-center justify-center">
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        active
                          ? 'bg-brand-400 shadow-[0_0_18px_rgba(91,138,255,0.95)] ring-4 ring-brand-500/15'
                          : 'bg-slate-700'
                      }`}
                    />
                  </span>
                  <p className={`max-w-4xl text-sm leading-6 md:text-base ${active ? 'text-slate-100' : 'text-slate-500'}`}>
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="offices" className="py-4 lg:py-6">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Global presence</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                HQ Offices
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:col-span-5">
              DigiGate combines regional delivery teams with international enterprise standards for clients operating across regulated markets.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {offices.map((office, index) => (
              <motion.article
                key={office.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/20 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    <MapPin className="h-3.5 w-3.5" />
                    {office.label}
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{office.country}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">{office.city}</h3>
                  <p className="mt-4 flex gap-3 text-sm leading-6 text-slate-300">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-300" />
                    <span>{office.address}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}