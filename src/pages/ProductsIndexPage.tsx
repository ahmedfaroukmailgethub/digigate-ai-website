import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
import {
  Sparkles,
  ArrowRight,
  FileText,
  Mail,
  Archive,
  GitBranch,
  Shield,
  ScanLine,
  Eye,
  Database,
  Plug,
  Brain,
  Bot,
  ScanSearch,
  FileScan,
  FileSearch2,
  FileOutput,
  Layers,
  Mic,
  GraduationCap,
} from 'lucide-react'

const products = [
  {
    title: 'Documents Management System',
    href: '/products/documents-management-system',
    desc: 'Capture, organize, secure and retrieve enterprise documents at scale.',
    icon: FileText,
    category: 'Core Platform',
  },
  {
    title: 'Correspondence Management System',
    href: '/products/correspondence-management-system',
    desc: 'Track incoming and outgoing correspondence with full audit and SLAs.',
    icon: Mail,
    category: 'Core Platform',
  },
  {
    title: 'Records Management System',
    href: '/products/records-management-system',
    desc: 'Regulatory-compliant record lifecycle, retention and disposition.',
    icon: Archive,
    category: 'Core Platform',
  },
  {
    title: 'Workflow Engine',
    href: '/products/workflow-engine',
    desc: 'BPMN-based workflow orchestration for complex enterprise processes.',
    icon: GitBranch,
    category: 'Core Platform',
  },
  {
    title: 'Information Right Management System',
    href: '/products/information-right-management-system',
    desc: 'Enforce document-level rights, encryption and access policies.',
    icon: Shield,
    category: 'Core Platform',
  },
  {
    title: 'Standard Capture Tool',
    href: '/products/standard-capture-tool',
    desc: 'High-throughput scanning, OCR and indexing for paper and digital input.',
    icon: ScanLine,
    category: 'Tools',
  },
  {
    title: 'Advanced Viewer Tool',
    href: '/products/advanced-viewer-tool',
    desc: 'Annotate, redact and collaborate on any document format in the browser.',
    icon: Eye,
    category: 'Tools',
  },
  {
    title: 'Data Storage Optimization Tool',
    href: '/products/data-storage-optimization-tool',
    desc: 'Tiered storage, deduplication and compression for enterprise archives.',
    icon: Database,
    category: 'Tools',
  },
  {
    title: 'Integration Enabler Module',
    href: '/products/integration-enabler-module',
    desc: 'Pre-built connectors and APIs for ERP, CRM, ECM and identity systems.',
    icon: Plug,
    category: 'Tools',
  },
  {
    title: 'Artificial Intelligence Engines',
    href: '/products/artificial-intelligence-engines',
    desc: 'Sector-trained AI engines powering classification, extraction and decisioning.',
    icon: Brain,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Automation Module',
    href: '/products/intelligent-automation-module',
    desc: 'RPA + AI orchestration to automate document-heavy operations end-to-end.',
    icon: Bot,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Documents Recognition Engine',
    href: '/products/intelligent-documents-recognition-engine',
    desc: 'Recognize document types, languages and structures at scale.',
    icon: ScanSearch,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Document Capture Module',
    href: '/products/intelligent-document-capture-module',
    desc: 'AI-powered capture from any channel — scanners, email, mobile, API.',
    icon: FileScan,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Data Extraction Module',
    href: '/products/intelligent-data-extraction-module',
    desc: 'Extract structured fields, tables and entities from any document.',
    icon: FileSearch2,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Document Exporting Module',
    href: '/products/intelligent-document-exporting-module',
    desc: 'Export documents and data to downstream systems in any format.',
    icon: FileOutput,
    category: 'AI Engines',
  },
  {
    title: 'Intelligent Documents Classification Engine',
    href: '/products/intelligent-documents-classification-engine',
    desc: 'ML-based classification by layout, content, object and auto-triage.',
    icon: Layers,
    category: 'AI Engines',
  },
  {
    title: 'Voice Recognition Engine',
    href: '/products/voice-recognition-engine',
    desc: 'Advanced multilingual speech recognition with self-learning models.',
    icon: Mic,
    category: 'AI Engines',
  },
  {
    title: 'Education Platform',
    href: '/products/education-platform',
    desc: 'AI-powered learning ecosystem for students, teachers, parents and admins.',
    icon: GraduationCap,
    category: 'Platforms',
  },
]

const categories = ['Core Platform', 'Tools', 'AI Engines', 'Platforms'] as const

export default function ProductsIndexPage() {
  useEffect(() => {
    document.title = 'DigiGate Products'
  }, [])

  return (
    <div className="relative min-h-screen bg-[#05060f] text-slate-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[640px] h-[640px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>
      <BinaryFloat />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-brand-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-[0.22em]">DigiGate Products</span>
            </div>

            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[78px]">
              The <span className="text-gradient">DigiGate</span> Product Universe
            </h1>

            <p className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed text-justify max-w-2xl">
              DigiGate ® is an integrated <strong className="text-brand-300 font-semibold">Digital Transformation Platform</strong>
              {' '}— a complete suite of enterprise modules and AI engines that govern documents,
              automate workflows, and inject sector-trained intelligence into every business process.
              Explore each module below and discover how DigiGate AI powers organisations across
              government, education, aviation, finance and beyond.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 [perspective:800px]">
              {categories.map((c, idx) => {
                const palettes = [
                  // [text, base rgb, light rgb, dark rgb]
                  ['text-brand-100',   '91,138,255',  '160,190,255', '40,70,170'],   // Core Platform — blue
                  ['text-cyan-100',    '34,211,238',  '125,235,250', '15,120,150'],  // Tools — cyan
                  ['text-accent-100',  '168,85,247',  '210,160,255', '110,40,180'],  // AI Engines — purple
                  ['text-emerald-100', '52,211,153',  '140,235,200', '15,140,100'],  // Platforms — emerald
                ]
                const [text, baseRgb, lightRgb, darkRgb] = palettes[idx % palettes.length]
                return (
                  <motion.a
                    key={c}
                    href={`#cat-${c.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`group relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${text} transition-transform`}
                    style={{
                      background: `linear-gradient(180deg, rgba(${lightRgb},0.95) 0%, rgba(${baseRgb},0.9) 45%, rgba(${darkRgb},0.95) 100%)`,
                      border: `1px solid rgba(${lightRgb},0.6)`,
                      transformStyle: 'preserve-3d',
                      textShadow: `0 1px 0 rgba(0,0,0,0.45)`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 6px 0 rgba(${darkRgb},0.55), 0 10px 18px rgba(${darkRgb},0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -3px 0 rgba(0,0,0,0.25)`,
                        `0 6px 0 rgba(${darkRgb},0.55), 0 14px 26px rgba(${baseRgb},0.55), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -3px 0 rgba(0,0,0,0.25)`,
                        `0 6px 0 rgba(${darkRgb},0.55), 0 10px 18px rgba(${darkRgb},0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -3px 0 rgba(0,0,0,0.25)`,
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.45 }}
                    whileHover={{ y: -4, rotateX: 8, scale: 1.04 }}
                    whileTap={{ y: 2, rotateX: -4, scale: 0.97 }}
                  >
                    {/* Top glossy highlight */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-2 top-0.5 h-1/2 rounded-full opacity-70"
                      style={{
                        background: `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)`,
                      }}
                    />
                    {/* Rotating conic halo */}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute -inset-1 rounded-full opacity-40 blur-md"
                      style={{ background: `conic-gradient(from 0deg, rgba(${lightRgb},0.7), transparent 55%)` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 9 + idx * 0.6, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative">{c}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Dual logo lockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-brand-400/20 bg-gradient-to-br from-brand-400/[0.08] via-brand-500/[0.05] to-accent-500/[0.08] p-8 shadow-2xl shadow-brand-900/20 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-400/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-brand-500/20 blur-3xl" />

              <div className="relative flex flex-col items-center gap-6">
                <motion.img
                  src="/DigiGate-R-Frame-removebg.png"
                  alt="DigiGate ® Digital Transformation Platform"
                  className="w-48 h-48 object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.35)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
                <motion.img
                  src="/DigiGate_AI_Logo-removebg-preview.png"
                  alt="DigiGate AI"
                  className="w-64 object-contain drop-shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-300/80">
                  One Platform • One Intelligence • {products.length} Modules
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product categories */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {categories.map((cat, ci) => {
          const items = products.filter((p) => p.category === cat)
          if (items.length === 0) return null
          return (
            <div key={cat} id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`} className="mt-16 scroll-mt-28">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">
                    {String(ci + 1).padStart(2, '0')} — {cat}
                  </p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-brand-100">
                    {cat === 'Core Platform' && 'Foundation of the Enterprise'}
                    {cat === 'Tools' && 'Power Tools & Modules'}
                    {cat === 'AI Engines' && 'Sector-Trained AI Engines'}
                    {cat === 'Platforms' && 'Vertical Platforms'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500">{items.length} products</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((p, i) => {
                  const cardPalettes = [
                    { border: 'border-brand-400/30',   bg: 'bg-brand-400/[0.06]',   tileFrom: 'from-brand-400/30',   tileTo: 'to-brand-500/30',   iconText: 'text-brand-200',   ringHover: 'hover:border-brand-400/60',   hoverBg: 'hover:bg-brand-400/[0.10]',   shadowHover: 'hover:shadow-brand-900/40',   titleHover: 'group-hover:text-brand-100',   arrow: 'text-brand-300/70',  arrowHover: 'group-hover:text-brand-200',  cta: 'text-brand-200/80', ctaHover: 'group-hover:text-brand-100',   anim: { y: [0, -6, 0] },                 dur: 2.4 },
                    { border: 'border-cyan-400/30',    bg: 'bg-cyan-400/[0.06]',    tileFrom: 'from-cyan-400/30',    tileTo: 'to-cyan-500/30',    iconText: 'text-cyan-200',    ringHover: 'hover:border-cyan-400/60',    hoverBg: 'hover:bg-cyan-400/[0.10]',    shadowHover: 'hover:shadow-cyan-900/40',    titleHover: 'group-hover:text-cyan-100',    arrow: 'text-cyan-300/70',   arrowHover: 'group-hover:text-cyan-200',   cta: 'text-cyan-200/80', ctaHover: 'group-hover:text-cyan-100',     anim: { rotate: [0, 12, -12, 0] },       dur: 4   },
                    { border: 'border-accent-400/30',  bg: 'bg-accent-400/[0.06]',  tileFrom: 'from-accent-400/30',  tileTo: 'to-accent-500/30',  iconText: 'text-accent-200',  ringHover: 'hover:border-accent-400/60',  hoverBg: 'hover:bg-accent-400/[0.10]',  shadowHover: 'hover:shadow-accent-900/40',  titleHover: 'group-hover:text-accent-100',  arrow: 'text-accent-300/70', arrowHover: 'group-hover:text-accent-200', cta: 'text-accent-200/80', ctaHover: 'group-hover:text-accent-100', anim: { scale: [1, 1.18, 1] },           dur: 2.6 },
                    { border: 'border-emerald-400/30', bg: 'bg-emerald-400/[0.06]', tileFrom: 'from-emerald-400/30', tileTo: 'to-emerald-500/30', iconText: 'text-emerald-200', ringHover: 'hover:border-emerald-400/60', hoverBg: 'hover:bg-emerald-400/[0.10]', shadowHover: 'hover:shadow-emerald-900/40', titleHover: 'group-hover:text-emerald-100', arrow: 'text-emerald-300/70', arrowHover: 'group-hover:text-emerald-200', cta: 'text-emerald-200/80', ctaHover: 'group-hover:text-emerald-100', anim: { rotate: 360 },                   dur: 10  },
                    { border: 'border-pink-400/30',    bg: 'bg-pink-400/[0.06]',    tileFrom: 'from-pink-400/30',    tileTo: 'to-pink-500/30',    iconText: 'text-pink-200',    ringHover: 'hover:border-pink-400/60',    hoverBg: 'hover:bg-pink-400/[0.10]',    shadowHover: 'hover:shadow-pink-900/40',    titleHover: 'group-hover:text-pink-100',    arrow: 'text-pink-300/70',   arrowHover: 'group-hover:text-pink-200',   cta: 'text-pink-200/80', ctaHover: 'group-hover:text-pink-100',     anim: { y: [0, -5, 0], rotate: [0, 6, 0] }, dur: 2.8 },
                    { border: 'border-amber-400/30',   bg: 'bg-amber-400/[0.06]',   tileFrom: 'from-amber-400/30',   tileTo: 'to-amber-500/30',   iconText: 'text-amber-200',   ringHover: 'hover:border-amber-400/60',   hoverBg: 'hover:bg-amber-400/[0.10]',   shadowHover: 'hover:shadow-amber-900/40',   titleHover: 'group-hover:text-amber-100',   arrow: 'text-amber-300/70',  arrowHover: 'group-hover:text-amber-200',  cta: 'text-amber-200/80', ctaHover: 'group-hover:text-amber-100',   anim: { scale: [1, 1.12, 1] },           dur: 2.2 },
                  ]
                  const pal = cardPalettes[i % cardPalettes.length]
                  return (
                  <motion.div
                    key={p.href}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={p.href}
                      className={`group block h-full rounded-3xl border ${pal.border} ${pal.bg} p-6 shadow-xl shadow-black/20 ${pal.ringHover} ${pal.hoverBg} ${pal.shadowHover} transition-all`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${pal.tileFrom} ${pal.tileTo} border ${pal.border} group-hover:scale-110 transition-transform`}>
                          <motion.div
                            animate={pal.anim}
                            transition={{ duration: pal.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                          >
                            <p.icon className={`w-6 h-6 ${pal.iconText}`} />
                          </motion.div>
                        </div>
                        <ArrowRight className={`w-5 h-5 ${pal.arrow} ${pal.arrowHover} group-hover:translate-x-1 transition-all`} />
                      </div>
                      <h3 className={`mt-4 font-display text-lg font-bold text-slate-100 ${pal.titleHover} transition-colors`}>
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                      <div className={`mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${pal.cta} ${pal.ctaHover}`}>
                        Explore module
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Footer CTA */}
        <div className="mt-20 rounded-3xl border border-brand-400/20 bg-gradient-to-r from-brand-400/[0.08] via-brand-500/[0.06] to-accent-500/[0.08] p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
            <img src="/DigiGate-R-Frame-removebg.png" alt="DigiGate ®" className="h-[6.25rem] w-auto object-contain" />
            <img src="/DigiGate_AI_Logo-removebg-preview.png" alt="DigiGate AI" className="h-12 w-auto object-contain" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-brand-300">
            One platform. Every document workflow.
          </h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Not sure where to start? Talk to a DigiGate specialist and we'll design the right
            combination of modules for your sector.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-brand-500 to-brand-500 shadow-lg shadow-brand-900/30 hover:shadow-brand-900/50 transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            Talk to DigiGate
          </Link>
        </div>
      </section>
    </div>
  )
}
