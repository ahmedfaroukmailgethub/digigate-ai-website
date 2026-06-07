import { motion } from 'framer-motion'
import {
  Sparkles, FileText, ScanSearch, Layers, FilePlus,
  BrainCircuit, FileSearch, Building2, Cog, Zap,
  Database, Gauge, Workflow, Settings, GitBranch,
  CheckCircle2, ArrowRight,
} from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated 7-Station Extraction Cycle ─── */
function ExtractionCycleDiagram() {
  const stations = [
    { Icon: FileText,      label: 'Import Contracts',      sub: '',                     color: 'from-orange-300 to-amber-400',  glow: 'shadow-amber-500/40',    anim: { y: [0, -3, 0] },         dur: 2.0 },
    { Icon: ScanSearch,    label: 'OCR Extract',           sub: '& Index',              color: 'from-orange-400 to-red-500',    glow: 'shadow-orange-500/40',   anim: { scale: [1, 1.15, 1] },   dur: 2.2 },
    { Icon: Layers,        label: 'AI Auto-Match™',        sub: 'to existing data',     color: 'from-amber-400 to-orange-500',  glow: 'shadow-amber-500/40',    anim: { rotate: [0, -8, 8, 0] }, dur: 2.4 },
    { Icon: FilePlus,      label: 'Create Records',        sub: 'auto-linked to contract files', color: 'from-orange-400 to-amber-500', glow: 'shadow-orange-500/40', anim: { y: [0, -3, 0] }, dur: 2.1 },
    { Icon: BrainCircuit,  label: 'AI Train™',             sub: 'Enhances Data Matching', color: 'from-amber-300 to-orange-400',  glow: 'shadow-amber-500/40',  anim: { rotate: 360 },           dur: 9   },
    { Icon: FileSearch,    label: 'AI Analyse™',           sub: 'Meta Data & Clause Language', color: 'from-orange-400 to-red-500', glow: 'shadow-orange-500/40', anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
    { Icon: Building2,     label: 'Business Process',      sub: 'Automation',           color: 'from-amber-400 to-orange-600',  glow: 'shadow-amber-500/40',    anim: { y: [0, -4, 0] },         dur: 2.3 },
  ]

  const RADIUS = 38
  const ROT_DUR = 80

  return (
    <div className="relative aspect-square max-w-[640px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 blur-2xl" />

      {/* Decorative dashed orbits */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="0.3" strokeDasharray="0.8 1.4" />
        <circle cx="50" cy="50" r={RADIUS - 5} fill="none" stroke="rgba(251,146,60,0.15)" strokeWidth="0.25" strokeDasharray="0.4 0.8" />
      </svg>

      {/* Slowly rotating ring with stations */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: ROT_DUR, repeat: Infinity, ease: 'linear' }}
      >
        {/* Curved arrows between stations (rotate with the ring) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <marker id="extArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
              <polygon points="0 0, 3 1.5, 0 3" fill="rgba(251,146,60,0.7)" />
            </marker>
          </defs>
          {stations.map((_, i) => {
            const a1 = (i * 360) / stations.length - 90 + 10
            const a2 = ((i + 1) * 360) / stations.length - 90 - 10
            const r1 = (a1 * Math.PI) / 180
            const r2 = (a2 * Math.PI) / 180
            const sx = 50 + (RADIUS - 3) * Math.cos(r1)
            const sy = 50 + (RADIUS - 3) * Math.sin(r1)
            const ex = 50 + (RADIUS - 3) * Math.cos(r2)
            const ey = 50 + (RADIUS - 3) * Math.sin(r2)
            return (
              <path key={`arc-${i}`}
                d={`M ${sx} ${sy} A ${RADIUS - 3} ${RADIUS - 3} 0 0 1 ${ex} ${ey}`}
                fill="none" stroke="rgba(251,146,60,0.55)" strokeWidth="0.4"
                strokeDasharray="1 0.8"
                markerEnd="url(#extArrow)" />
            )
          })}
        </svg>

        {/* Stations placed around the orbit */}
        {stations.map((s, i) => {
          const angle = (i * 360) / stations.length - 90
          const rad = (angle * Math.PI) / 180
          const x = 50 + RADIUS * Math.cos(rad)
          const y = 50 + RADIUS * Math.sin(rad)
          return (
            <div key={s.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
              {/* Counter-rotate so each station stays upright while ring spins */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: ROT_DUR, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={s.anim}
                  transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${s.color} grid place-items-center shadow-xl ${s.glow} border-2 border-white/15`}
                >
                  <s.Icon className="h-6 w-6 text-white drop-shadow" />
                </motion.div>
                <p className="mt-1.5 text-[10px] font-bold text-amber-100 text-center max-w-[90px] leading-tight">
                  {s.label}
                </p>
                {s.sub && (
                  <p className="text-[8px] text-slate-400 text-center max-w-[90px] leading-tight">
                    {s.sub}
                  </p>
                )}
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Central Extraction Module hub — does NOT rotate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#1a0d2a] via-[#2a1a3a] to-[#0a0d2a] grid place-items-center border-2 border-amber-400/50 shadow-2xl shadow-amber-500/40"
        >
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping" />
          <div className="absolute -inset-2 rounded-full border border-amber-400/15" />

          {/* Central content */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="mb-1"
            >
              <Cog className="h-8 w-8 text-amber-400" />
            </motion.div>
            <p className="font-display text-[11px] font-black text-white leading-tight text-center">Extraction</p>
            <p className="font-display text-[10px] font-bold text-amber-300 leading-tight text-center">
              Module<sup className="text-[7px]">AI</sup>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const features = [
  {
    Icon: GitBranch,
    title: 'Flexible Schema Management & Evolution',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    anim: { rotate: [0, -8, 8, 0] }, dur: 2.5,
    bullets: [
      'Automatically creates, maps, and updates your destination schema with the source.',
      'Switch to custom schema mapping and make required schema changes — then switch back to automated mapping.',
    ],
  },
  {
    Icon: Workflow,
    title: 'Inbuilt Transformation Capabilities',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { rotate: 360 }, dur: 8,
    bullets: [
      'Set up models and workflows to automatically prepare customer data for analysis post loading it to the data repository.',
    ],
  },
  {
    Icon: Settings,
    title: 'Inflight Data Formatter',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { scale: [1, 1.15, 1] }, dur: 2.0,
    bullets: [
      'Set up data formatting functions to clean and standardize data inflight while loading it to your repository — without any delay in pipeline performance.',
    ],
  },
  {
    Icon: Gauge,
    title: 'Scales with Minimum Latency',
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/40',
    anim: { y: [0, -4, 0] }, dur: 2.2,
    bullets: [
      'Automatically scale with increases in data volume without affecting your pipeline. Built to handle millions of records per minute with minimum latency.',
    ],
  },
]

export default function IntelligentDataExtractionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-3xl" />
        <BinaryFloat />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[48px]">
              DigiGate <span className="text-gradient">Intelligent Data Extraction</span> Module
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Intelligent Data Extraction Module</strong> detects and extracts fields of interest
              based on the document type and adds them to the document metadata.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400 text-justify">
              Packed with functionalities to help customers manage their complete data integration process effectively and deliver
              <strong className="text-white"> analytics-ready data</strong> in a timely, effective manner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features + Cycle Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">

            {/* Features list (left) */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Core Functionalities</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  Built for <span className="text-gradient">Data Pipelines</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <div className="space-y-4">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="group rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4 hover:border-amber-400/40 hover:bg-amber-400/[0.08] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={f.anim}
                        transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut' }}
                        className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} grid place-items-center shadow-lg ${f.glow}`}
                      >
                        <f.Icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base font-bold text-white mb-2 underline underline-offset-4 decoration-amber-400/40">{f.title}</h4>
                        <ul className="space-y-1.5">
                          {f.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs leading-5 text-slate-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-400 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Extraction Cycle Diagram (right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl"
            >
              <p className="text-center text-sm font-bold uppercase tracking-widest text-amber-300 mb-2">
                Extraction Cycle
              </p>
              <p className="text-center text-xs text-slate-500 mb-6">
                AI-powered end-to-end extraction lifecycle
              </p>
              <ExtractionCycleDiagram />
              <p className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
                7 Stations • One Intelligent Cycle
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Highlight Grid */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Extraction Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Engine <span className="text-gradient">Highlights</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: BrainCircuit, title: 'AI Field Detection',       desc: 'Identify fields of interest automatically based on document type.', color: 'from-cyan-400 to-blue-500',    anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
              { Icon: Database,     title: 'Metadata Enrichment',      desc: 'Extracted data is added to the document metadata for indexing.',    color: 'from-violet-400 to-purple-500', anim: { rotate: 360 }, dur: 9 },
              { Icon: Zap,          title: 'Real-Time Processing',     desc: 'Millions of records per minute with sub-second latency.',           color: 'from-amber-400 to-orange-500', anim: { y: [0, -4, 0] }, dur: 1.9 },
              { Icon: GitBranch,    title: 'Schema Auto-Evolution',    desc: 'Source schema changes are detected and propagated automatically.',  color: 'from-emerald-400 to-teal-500', anim: { rotate: [0, -10, 10, 0] }, dur: 2.4 },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={card.anim}
                  transition={{ duration: card.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                >
                  <card.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs leading-5 text-slate-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Flow Indicator */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Pipeline Flow</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              From Source to <span className="text-gradient">Analytics-Ready</span>
            </h2>
          </motion.div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {['Source', 'Extract', 'Transform', 'Validate', 'Load', 'Analytics'].map((step, i) => (
              <motion.div key={step} className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow-lg shadow-amber-500/40 text-xs sm:text-sm font-black text-white"
                  >
                    {i + 1}
                  </motion.div>
                  <span className="mt-2 text-xs font-bold text-slate-300">{step}</span>
                </motion.div>

                {i < 5 && (
                  <motion.div
                    animate={{ x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4 text-amber-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Database className="h-12 w-12 text-amber-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Extract what matters — at scale</h2>
            <p className="text-slate-400 mb-8">
              Millions of records, zero latency, complete data lineage — DigiGate's intelligent extraction powers your analytics pipeline.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
