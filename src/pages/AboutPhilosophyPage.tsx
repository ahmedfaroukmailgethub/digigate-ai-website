import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brain, Globe, Lightbulb, Sparkles, TrendingUp, Users } from 'lucide-react'

/* ── Digital Cells Canvas Animation ── */
function DigitalCellsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    // Node type
    interface Node {
      x: number; y: number; vx: number; vy: number
      tx: number; ty: number       // target position (for word formation)
      r: number; pulse: number; pulseSpeed: number
      color: string; type: 'circle' | 'hex'
    }

    const colors = ['#5b8aff', '#a855f7', '#22d3ee', '#34d399', '#f59e0b']
    const COUNT = 900
    const nodes: Node[] = []

    // Sample target points by rasterizing the word "Philosophy"
    function computeWordTargets(word: string): { x: number; y: number }[] {
      const W = canvas!.width, H = canvas!.height
      const off = document.createElement('canvas')
      off.width = W; off.height = H
      const octx = off.getContext('2d')
      if (!octx) return []
      // Fit the word to ~80% of width and ~38% of height
      let fontSize = Math.floor(H * 0.38)
      octx.font = `900 ${fontSize}px Inter, system-ui, sans-serif`
      const targetWidth = W * 0.82
      const measured = octx.measureText(word).width
      if (measured > targetWidth) {
        fontSize = Math.floor(fontSize * (targetWidth / measured))
      }
      octx.font = `900 ${fontSize}px Inter, system-ui, sans-serif`
      octx.fillStyle = '#fff'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(word, W / 2, H / 2)
      const data = octx.getImageData(0, 0, W, H).data
      const pts: { x: number; y: number }[] = []
      const step = 3
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4 + 3
          if (data[idx] > 128) pts.push({ x, y })
        }
      }
      // Shuffle so sequential nodes don't form a raster scan pattern
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[pts[i], pts[j]] = [pts[j], pts[i]]
      }
      return pts
    }

    let targets: { x: number; y: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Recompute targets after resize and (re)assign per node
      targets = computeWordTargets('Philosophy')
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          const t = targets.length ? targets[i % targets.length] : { x: canvas.width / 2, y: canvas.height / 2 }
          nodes[i].tx = t.x; nodes[i].ty = t.y
        }
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize nodes
    for (let i = 0; i < COUNT; i++) {
      const t = targets.length ? targets[i % targets.length] : { x: Math.random() * canvas.width, y: Math.random() * canvas.height }
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        tx: t.x, ty: t.y,
        r: 3 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'hex' : 'circle',
      })
    }

    // Animation phases timed via wall clock
    // 0–4.5s roaming, 4.5–9s forming "Philosophy", 9–13s hold, 13–15s release → loop
    const t0 = Date.now()

    function hexPath(cx: number, cy: number, r: number) {
      ctx!.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const px = cx + r * Math.cos(angle)
        const py = cy + r * Math.sin(angle)
        i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py)
      }
      ctx!.closePath()
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx!.clearRect(0, 0, W, H)

      // Background gradient
      const bg = ctx!.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7)
      bg.addColorStop(0, 'rgba(10,8,30,1)')
      bg.addColorStop(1, 'rgba(5,6,15,1)')
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)

      // Phase logic
      const elapsed = (Date.now() - t0) / 1000
      const cycle = 16 // total seconds per cycle
      const phaseT = elapsed % cycle
      // attraction factor (0 = free roam, 1 = strongly pulled to target)
      let attract = 0
      if (phaseT < 4) attract = 0
      else if (phaseT < 8) attract = (phaseT - 4) / 4   // ease-in to target
      else if (phaseT < 13) attract = 1                  // hold
      else attract = Math.max(0, 1 - (phaseT - 13) / 3)  // release back to roam

      // Move nodes — blend free motion with attraction toward target
      for (const n of nodes) {
        // Attraction (stronger so cells settle precisely onto letter pixels)
        const ax = (n.tx - n.x) * 0.09 * attract
        const ay = (n.ty - n.y) * 0.09 * attract
        // Damp velocity heavily when locking in
        const damp = 1 - 0.22 * attract
        n.vx = n.vx * damp + ax
        n.vy = n.vy * damp + ay

        // Tiny jitter so locked cells still feel alive but don't smear the letters
        if (attract > 0.95) {
          n.vx += (Math.random() - 0.5) * 0.03
          n.vy += (Math.random() - 0.5) * 0.03
        }

        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed

        if (attract < 0.4) {
          if (n.x < 0 || n.x > W) n.vx *= -1
          if (n.y < 0 || n.y > H) n.vy *= -1
        }
      }

      // While roaming, draw network connections; fade them out as cells lock in
      const lineAlphaScale = Math.max(0, 1 - attract * 1.4)
      if (lineAlphaScale > 0.05) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x
            const dy = nodes[i].y - nodes[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.35 * lineAlphaScale
              ctx!.beginPath()
              ctx!.strokeStyle = `rgba(91,138,255,${alpha})`
              ctx!.lineWidth = 0.8
              ctx!.moveTo(nodes[i].x, nodes[i].y)
              ctx!.lineTo(nodes[j].x, nodes[j].y)
              ctx!.stroke()
            }
          }
        }
      }

      // Draw nodes — radius/halo shrink as cells lock into the word so letters read crisply
      const sizeScale = 1 - attract * 0.75
      const haloScale = Math.max(0, 1 - attract * 1.3)
      for (const n of nodes) {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5   // 0–1
        const radius = (n.r + glow * 2) * sizeScale

        // Outer glow (fades during word phase to keep letters legible)
        if (haloScale > 0.05) {
          const haloR = radius * (1.5 + 2 * haloScale)
          const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR)
          grad.addColorStop(0, n.color + Math.floor(haloScale * 170).toString(16).padStart(2, '0'))
          grad.addColorStop(1, n.color + '00')
          ctx!.beginPath()
          if (n.type === 'hex') hexPath(n.x, n.y, haloR)
          else ctx!.arc(n.x, n.y, haloR, 0, Math.PI * 2)
          ctx!.fillStyle = grad
          ctx!.fill()
        }

        // Core shape
        if (n.type === 'hex') hexPath(n.x, n.y, radius)
        else { ctx!.beginPath(); ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2) }
        ctx!.fillStyle = n.color
        ctx!.fill()

        // Inner bright dot
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, radius * 0.35, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255,255,255,0.8)'
        ctx!.fill()
      }

      // Moving data packets along edges — only during roaming/dispersal
      if (lineAlphaScale > 0.2) {
        const t = Date.now() / 1000
        for (let i = 0; i < nodes.length; i += 7) {
          const j = (i + 3) % nodes.length
          const progress = (t * 0.4 + i * 0.13) % 1
          const px = nodes[i].x + (nodes[j].x - nodes[i].x) * progress
          const py = nodes[i].y + (nodes[j].y - nodes[i].y) * progress
          ctx!.beginPath()
          ctx!.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(34,211,238,${0.9 * lineAlphaScale})`
          ctx!.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 shadow-2xl shadow-brand-900/40 bg-[#05060f]" style={{ height: '520px' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
        <span className="flex h-2 w-2"><span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" /></span>
        <span className="text-xs font-semibold text-cyan-300 tracking-widest uppercase">Digital Ecosystem — Live</span>
      </div>
    </div>
  )
}

const pillars = [
  {
    Icon: Globe,
    title: 'Digital Economy',
    text: 'Creating a competitive edge in today\'s digital economy by capitalizing on the benefits and growth of social computing and substantial development in profit and revenue.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { rotate: 360 },
    transition: { duration: 10, repeat: Infinity, ease: 'linear' },
  },
  {
    Icon: Users,
    title: 'Collaborative Ecosystem',
    text: 'Building value for clients by collaborating with business partners that operate an efficient ecosystem, bringing a collective approach to support clients in accelerating their business growth.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: TrendingUp,
    title: 'Competitive Edge',
    text: 'The new wave of digital transformation applications will reward companies that understand how to connect with their customers and build a deeper understanding of customer behaviors and habits.',
    color: 'from-accent-400 to-pink-400',
    glow: 'shadow-accent-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Lightbulb,
    title: 'Innovation Culture',
    text: 'The millennial generation\'s adaptation to technology is high — they demand mobility and ultimate flexibility, elevating the expectation of technology and creating a motive for companies to innovate.',
    color: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Brain,
    title: 'Holistic Approach',
    text: 'DigiGate Group\'s philosophy is based on a holistic approach, addressed to business successors, and the creation of value for our clients by constructing an ecosystem that would help them thrive.',
    color: 'from-violet-400 to-brand-400',
    glow: 'shadow-violet-500/40',
    animation: { rotate: [0, -8, 8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Sparkles,
    title: 'Future Readiness',
    text: 'DigiGate Group firmly believes in preparing businesses for tomorrow — combining deep engineering expertise with AI to solve mission-critical challenges and unlock long-term success.',
    color: 'from-cyan-400 to-brand-500',
    glow: 'shadow-cyan-500/40',
    animation: { scale: [1, 1.15, 1] },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}


export default function AboutPhilosophyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=70"
            alt=""
            aria-hidden="true"
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
              DigiGate <span className="text-gradient">Philosophy</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              The digital era is about today's digital economy, and creating a competitive edge became what companies
              invest in their technology — capitalizing on the benefits and growth of social computing, and creating
              substantial development in profit and revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content — text + carousel */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Philosophy text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-7"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300 mb-4">Our Philosophy</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-7" />
              </div>

              {[
                {
                  bold: 'DigiGate Group',
                  text: ' built its business philosophy on creating value for its clients by collaborating with business partners that operate an efficient ecosystem, bringing a collective approach to support clients accelerate their business growth; consequently reaching their goals, meeting challenges, and capturing opportunities.',
                },
                {
                  bold: 'DigiGate Group',
                  text: ' firmly believes that the new wave of building digital transformation applications — geared towards creating a competitive edge — will reward companies that understand how to connect with their customers and how to build a deeper understanding of their customer behaviors and habits.',
                },
                {
                  bold: null,
                  text: 'The millennial generation\'s adaptation to technology is high. They demand mobility and ultimate flexibility, elevating the expectation of technology and creating a motive for companies to innovate.',
                },
                {
                  bold: 'DigiGate Group',
                  text: '\'s philosophy is based on a holistic approach, addressed to business successors, and the creation of value for our clients by constructing an ecosystem that would help our clients reach their goals smoothly and effectively through the power of digital transformation and AI.',
                },
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="text-base leading-8 text-slate-300/90 text-justify"
                >
                  {para.bold && <strong className="font-semibold text-white">{para.bold}</strong>}
                  {para.text}
                </motion.p>
              ))}
            </motion.div>

            {/* Sticky carousel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <DigitalCellsAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy pillars */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Our Pillars</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Philosophy in <span className="text-gradient">Action</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
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
