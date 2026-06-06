import { motion } from 'framer-motion'
import {
  Sparkles, Download, Sliders, ScanLine, FileSearch,
  Hand, FileBarChart, Database, HardDrive, Server,
  Network, Layers, Gauge, TrendingDown, DollarSign,
  CheckCircle2, ArrowRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated 6-Step Process Flow Diagram ─── */
function ProcessFlowDiagram() {
  const steps = [
    {
      Icon: Download, label: 'Install',
      desc: 'Install the DigiGate storage optimizer on the desired storage or system',
      color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/40',
      anim: { y: [0, -4, 0] }, dur: 2.0,
    },
    {
      Icon: Sliders, label: 'Config',
      desc: 'Configure the system parameters and options to the best criteria',
      color: 'from-brand-400 to-cyan-500', glow: 'shadow-brand-500/40',
      anim: { rotate: [0, -10, 10, 0] }, dur: 2.5,
    },
    {
      Icon: ScanLine, label: 'Scan',
      desc: 'Scanning process, testing, and analyze',
      color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40',
      anim: { scale: [1, 1.15, 1] }, dur: 1.8,
    },
    {
      Icon: FileSearch, label: 'Review',
      desc: 'Review suggested action to improve your storage',
      color: 'from-fuchsia-400 to-pink-500', glow: 'shadow-fuchsia-500/40',
      anim: { y: [0, -3, 0] }, dur: 2.2,
    },
    {
      Icon: Hand, label: 'Action',
      desc: 'Take the desired actions to optimize your storage',
      color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40',
      anim: { rotate: [0, -8, 8, 0] }, dur: 2.3,
    },
    {
      Icon: FileBarChart, label: 'Full Report',
      desc: 'Full detailed reporting on the data and suggested actions to improve storage',
      color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/40',
      anim: { scale: [1, 1.18, 1] }, dur: 2.0,
    },
  ]

  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Optimization Process
      </p>
      <p className="text-center text-xs text-slate-500 mb-6">6-step workflow with full reporting</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4 hover:border-amber-400/40 transition-colors"
          >
            {/* Step number badge */}
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-xs font-black text-white shadow-lg shadow-amber-500/40 z-10">
              {i + 1}
            </div>

            <div className="flex items-start gap-3">
              <motion.div
                animate={step.anim}
                transition={{ duration: step.dur, repeat: Infinity, ease: 'easeInOut' }}
                className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} grid place-items-center shadow-lg ${step.glow}`}
              >
                <step.Icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-base font-bold text-white">{step.label}</h4>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">{step.desc}</p>
              </div>
            </div>

            {/* Arrow to next step (visible on lg only between odd/even) */}
            {i < steps.length - 1 && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                className="hidden sm:flex absolute -bottom-3 right-3 w-6 h-6 rounded-full bg-brand-500/20 border border-brand-400/40 items-center justify-center"
              >
                <ArrowRight className="h-3 w-3 text-brand-300" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Connecting flow lines between steps (visual flair) */}
      <div className="mt-6 flex items-center justify-center gap-1 flex-wrap">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-brand-400"
            />
            {i < steps.length - 1 && (
              <div className="w-6 h-px bg-gradient-to-r from-brand-400/50 to-brand-400/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Animated Storage Types Grid ─── */
function StorageTypesGrid() {
  const storageTypes = [
    {
      Icon: Database, label: 'ECM Content Repository',
      desc: 'Enterprise content management repositories',
      color: 'from-cyan-400 to-blue-600',
      glow: 'shadow-cyan-500/40',
      anim: { rotate: [0, -6, 6, 0] }, dur: 2.5,
    },
    {
      Icon: HardDrive, label: 'Direct Attached Storage',
      desc: 'Local DAS volumes & arrays',
      color: 'from-brand-400 to-indigo-600',
      glow: 'shadow-brand-500/40',
      anim: { y: [0, -4, 0] }, dur: 2.0,
    },
    {
      Icon: Server, label: 'NAS and SAN',
      desc: 'Network & storage area network',
      color: 'from-violet-400 to-purple-600',
      glow: 'shadow-violet-500/40',
      anim: { scale: [1, 1.12, 1] }, dur: 2.2,
    },
    {
      Icon: Layers, label: 'Other Solutions',
      desc: 'Cloud, hybrid & custom storage',
      color: 'from-pink-400 to-rose-600',
      glow: 'shadow-pink-500/40',
      anim: { rotate: 360 }, dur: 8,
    },
  ]

  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl">
      <div className="text-center mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">Universal Compatibility</p>
        <h3 className="font-display text-2xl font-bold text-white">
          Works with <span className="text-gradient">all storage types</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {storageTypes.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-amber-400/40 hover:bg-amber-400/[0.06] transition-colors flex flex-col items-center text-center"
          >
            <motion.div
              animate={s.anim}
              transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
              className={`mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center shadow-lg ${s.glow}`}
            >
              <s.Icon className="h-8 w-8 text-white" />
            </motion.div>
            <h4 className="font-display text-sm font-bold text-white leading-tight">{s.label}</h4>
            <p className="mt-2 text-xs text-slate-400">{s.desc}</p>

            {/* Pulsing status dot */}
            <div className="mt-3 flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Supported</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const features = [
  { Icon: Gauge,        label: 'Set storage matrix based on usability & frequency' },
  { Icon: TrendingDown, label: 'Minimize disk/storage use across all tiers' },
  { Icon: Network,      label: 'Works across all technological & management layers' },
  { Icon: DollarSign,   label: 'Cost-effective storage resource utilization' },
  { Icon: CheckCircle2, label: 'Ensures existing resources work efficiently' },
  { Icon: FileBarChart, label: 'Full detailed reporting & suggested optimizations' },
]

export default function DataStorageOptimizationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-600/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              DigiGate <span className="text-gradient">Data Storage Optimization</span> Tool
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Data Storage Optimization Tool</strong> allows the organization to set a matrix for how
              the database will be stored based on its usability and frequency of usage. This will optimize the system's speed in handling the
              entire database on different storage media.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Process Flow Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">About the Tool</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                <strong className="text-white">DigiGate© Data Storage Optimization Tool</strong> is the collective process, frameworks, and
                technologies that enable the efficient use of storage infrastructure and resources. It is a broad concept that works across
                all the technological and management layers of storage management.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The tool ensures existing storage resources are working <strong className="text-white">efficiently and cost-effectively</strong> —
                primarily helping to <strong className="text-white">minimize disk/storage use</strong> across all storage tiers and resources.
              </p>

              <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 mt-4">
                <TrendingDown className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm leading-6 text-slate-300">
                  <strong className="text-white">Optimize storage costs.</strong> Smart matrix-based storage tiering reduces wasted capacity
                  and accelerates database access speeds across the board.
                </p>
              </div>
            </motion.div>

            {/* Process Flow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ProcessFlowDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Storage Types Section */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <StorageTypesGrid />
          </motion.div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Key Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Built for <span className="text-gradient">Storage Excellence</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shadow-brand-500/30"
                >
                  <f.Icon className="h-6 w-6" />
                </motion.div>
                <p className="text-sm leading-7 text-slate-300">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Database className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Optimize storage — minimize cost</h2>
            <p className="text-slate-400 mb-8">
              Intelligent storage matrix, automated scanning, and actionable insights to maximize every byte.
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
