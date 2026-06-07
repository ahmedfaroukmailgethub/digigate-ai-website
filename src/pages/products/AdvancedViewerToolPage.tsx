import { motion } from 'framer-motion'
import {
  Sparkles, FileText, Image as ImageIcon, Video, Music,
  Activity, Radio, Box, Camera, Mic, MessageSquare, Type,
  Server, Container as ContainerIcon, Cloud, Eye, Settings,
  History, Database, Search, FileSearch, Edit3, Layers,
} from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated AI Eye / Vision Visualization ─── */
function AIEyeVisualization() {
  return (
    <div className="relative aspect-square max-w-[260px] mx-auto">
      {/* Concentric scanning rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border-2 border-brand-400/30 border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 rounded-full border border-cyan-400/40"
      />
      <div className="absolute inset-12 rounded-full border border-white/10" />

      {/* Reticle crosshairs */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-cyan-400/60 origin-left"
            style={{ transform: `rotate(${deg}deg) translateY(-1px)` }}
          />
        ))}
      </div>

      {/* Central eye iris */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-brand-500 to-purple-600 grid place-items-center shadow-2xl shadow-brand-500/50 overflow-hidden">
          {/* Iris texture rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-cyan-300/40 border-dashed"
          />
          <motion.div
            animate={{ scale: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 to-brand-700"
          />
          {/* Pupil */}
          <motion.div
            animate={{ scale: [1, 0.85, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full bg-[#05060f] grid place-items-center z-10"
          >
            <div className="w-3 h-3 rounded-full bg-white/90" />
          </motion.div>
        </div>
      </motion.div>

      {/* Data streams emanating from eye */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 50 + 38 * Math.cos(rad)
        const y = 50 + 38 * Math.sin(rad)
        return (
          <motion.div
            key={angle}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        )
      })}
    </div>
  )
}

/* ─── Animated Architecture Layers Diagram ─── */
function ArchitectureLayersDiagram() {
  const dataTypes = [
    { Icon: Type,       label: 'Text',       color: 'from-cyan-400 to-blue-500',     anim: { y: [0, -3, 0] },        dur: 2.0 },
    { Icon: ImageIcon,  label: 'Image',      color: 'from-blue-400 to-indigo-500',   anim: { scale: [1, 1.15, 1] },  dur: 2.2 },
    { Icon: Video,      label: 'Video',      color: 'from-violet-400 to-purple-500', anim: { rotate: [0, -8, 8, 0] }, dur: 2.4 },
    { Icon: Music,      label: 'Audio',      color: 'from-pink-400 to-rose-500',     anim: { scale: [1, 1.18, 1] },  dur: 1.9 },
    { Icon: Activity,   label: 'Time-series',color: 'from-emerald-400 to-teal-500',  anim: { x: [0, 3, 0] },         dur: 2.3 },
    { Icon: Radio,      label: 'Sensor',     color: 'from-amber-400 to-orange-500',  anim: { rotate: 360 },           dur: 8   },
  ]

  const cvAnnotations = [
    { Icon: Box,         label: '2-D',           color: 'from-brand-400 to-cyan-500',    anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
    { Icon: Layers,      label: '3-D',           color: 'from-brand-400 to-violet-500',  anim: { y: [0, -3, 0] },       dur: 2.2 },
    { Icon: Video,       label: 'Video',         color: 'from-brand-400 to-indigo-500',  anim: { rotate: [0, -6, 6, 0] }, dur: 2.5 },
    { Icon: Music,       label: 'Audio',         color: 'from-brand-400 to-blue-500',    anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
    { Icon: MessageSquare, label: 'Transcription',color: 'from-brand-400 to-purple-500', anim: { y: [0, -3, 0] },       dur: 2.1 },
  ]

  const nlpAnnotations = [
    { Icon: Mic,           label: 'Audio',        color: 'from-emerald-400 to-green-500', anim: { scale: [1, 1.18, 1] }, dur: 2.0 },
    { Icon: MessageSquare, label: 'Transcription',color: 'from-emerald-400 to-teal-500',  anim: { rotate: [0, -8, 8, 0] }, dur: 2.6 },
    { Icon: Type,          label: 'Text',         color: 'from-emerald-400 to-cyan-500',  anim: { y: [0, -3, 0] },       dur: 2.2 },
  ]

  const deployments = [
    { Icon: Server,        label: 'On-Premise', color: 'from-amber-400 to-orange-500',  anim: { scale: [1, 1.12, 1] }, dur: 2.2 },
    { Icon: ContainerIcon, label: 'Container',  color: 'from-violet-400 to-purple-500', anim: { y: [0, -4, 0] },       dur: 2.0 },
    { Icon: Cloud,         label: 'SaaS',       color: 'from-cyan-400 to-blue-500',     anim: { x: [0, 4, 0] },         dur: 2.5 },
  ]

  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:items-center">

        {/* AI Eye Visualization on the left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <AIEyeVisualization />
          <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-widest text-cyan-300">
            Vision Engine
          </p>
        </motion.div>

        {/* Three architecture layers on the right */}
        <div className="space-y-4">
          {/* Row 1: Data Types */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1430] p-4">
            <div className="flex items-center gap-3 mb-3">
              <Database className="h-4 w-4 text-brand-300" />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Data Types</p>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {dataTypes.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <motion.div
                    animate={d.anim}
                    transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${d.color} grid place-items-center shadow-lg`}
                  >
                    <d.Icon className="h-4 w-4 text-white" />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-slate-300 text-center leading-tight">{d.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2: Annotation Supported — split into CV and NLP */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1430] p-4">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="h-4 w-4 text-brand-300" />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Annotation Supported</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr] gap-3 items-stretch">
              {/* Computer Vision */}
              <div className="rounded-xl border border-brand-400/30 bg-brand-400/[0.05] p-3">
                <p className="text-[10px] font-bold text-brand-300 uppercase tracking-widest text-center mb-2">Computer Vision</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {cvAnnotations.map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <motion.div
                        animate={c.anim}
                        transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} grid place-items-center shadow-md`}
                      >
                        <c.Icon className="h-3.5 w-3.5 text-white" />
                      </motion.div>
                      <span className="text-[9px] font-medium text-slate-300 text-center leading-tight">{c.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              {/* NLP */}
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.05] p-3">
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest text-center mb-2">NLP</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {nlpAnnotations.map((n, i) => (
                    <motion.div
                      key={n.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <motion.div
                        animate={n.anim}
                        transition={{ duration: n.dur, repeat: Infinity, ease: 'easeInOut' }}
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${n.color} grid place-items-center shadow-md`}
                      >
                        <n.Icon className="h-3.5 w-3.5 text-white" />
                      </motion.div>
                      <span className="text-[9px] font-medium text-slate-300 text-center leading-tight">{n.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Deployment Model */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1430] p-4">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="h-4 w-4 text-brand-300" />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Deployment Model</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {deployments.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
                >
                  <motion.div
                    animate={d.anim}
                    transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} grid place-items-center shadow-md shrink-0`}
                  >
                    <d.Icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-xs font-semibold text-slate-200">{d.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  { Icon: FileText,   label: 'PDF, Microsoft Office, AutoCAD files & more' },
  { Icon: FileSearch, label: 'Access from Search Form Criteria & Results Table' },
  { Icon: Eye,        label: 'Basic & Advanced viewer modes' },
  { Icon: Edit3,      label: 'Add and edit annotations with permissions' },
  { Icon: Settings,   label: 'Configurable default mode in Preferences' },
  { Icon: History,    label: 'History panel — all document actions tracked' },
]

const benefits = [
  {
    Icon: Eye,
    title: 'View Documents & Annotations',
    desc: 'Display documents and annotations you have permission to see — opened directly from search results.',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    anim: { scale: [1, 1.15, 1] },
    dur: 2.2,
  },
  {
    Icon: Edit3,
    title: 'Add & Edit Annotations',
    desc: 'Switch to advanced mode to add and edit annotations — provided you have the security permissions.',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { rotate: [0, -10, 10, 0] },
    dur: 2.4,
  },
  {
    Icon: Database,
    title: 'Metadata & History',
    desc: 'All metadata appears in the Properties panel and every action is tracked in the History panel.',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { y: [0, -4, 0] },
    dur: 2.0,
  },
]

export default function AdvancedViewerToolPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-600/10 blur-3xl" />
        <BinaryFloat />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[56px]">
              DigiGate <span className="text-gradient">Advanced Capture</span> Tool
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Advanced Viewer Tool</strong> is a powerful utility for popular file types — including
              PDF, Microsoft Office, AutoCAD files and more. It can be accessed directly from our document management system or integrated
              with other DMS solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Animated Layers Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ArchitectureLayersDiagram />
          </motion.div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">How It Works</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                <strong className="text-white">DigiGate© Advanced Viewer Tool</strong> displays documents and annotations you have permission
                to see. It is accessed from a <strong className="text-white">Search Form Criteria</strong> and <strong className="text-white">
                Searches Results Table</strong>, or by selecting a document from the search results and opening it in the Search Results
                Toolbar.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                Additionally, all metadata associated with a document is displayed in the <strong className="text-white">Properties panel
                </strong> of the viewer, and all actions taken on a document are displayed in the <strong className="text-white">History
                panel</strong>.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The viewer can switch between a <strong className="text-white">basic mode</strong> — used to view documents and annotations —
                and an <strong className="text-white">advanced mode</strong> which additionally allows you to add and edit annotations,
                provided you have the security permissions to do so. In the Preferences settings, you can specify which mode to use by default.
              </p>
            </motion.div>

            {/* Features list */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-3"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-2">Core Features</p>
              <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-4" />
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3 hover:border-amber-400/30 transition-colors"
                >
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shrink-0"
                  >
                    <f.Icon className="h-4 w-4" />
                  </motion.div>
                  <span className="text-sm leading-6 text-slate-300 pt-1">{f.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Key Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Powerful <span className="text-gradient">Viewing Modes</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-7 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={b.anim}
                  transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-white shadow-lg ${b.glow}`}
                >
                  <b.Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{b.title}</h3>
                <p className="text-sm leading-7 text-slate-400 text-justify">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Search className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">See every document — clearly</h2>
            <p className="text-slate-400 mb-8">
              Universal file support, AI-powered annotation, and seamless DMS integration in one powerful viewer.
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
