import { motion } from 'framer-motion'
import {
  Sparkles, Database, PhoneCall, ServerCog, FileCode2,
  MonitorSpeaker, Warehouse, Mail, Package, BrainCircuit,
  RefreshCcw, CheckCircle2, Zap, Network, Layers, Settings,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated Integration Hub Diagram ─── */
function IntegrationHubDiagram() {
  // 10 satellites arranged around a central DigiGate hub
  const satellites = [
    { Icon: Database,       label: 'Database Oriented Middleware', short: 'Database',     color: 'from-cyan-400 to-teal-500',     glow: 'shadow-cyan-500/40',    anim: { y: [0, -4, 0] },        dur: 2.0 },
    { Icon: PhoneCall,      label: 'Remote Procedure Call',        short: 'RPC',          color: 'from-orange-300 to-amber-400',  glow: 'shadow-amber-500/40',   anim: { rotate: [0, -8, 8, 0] }, dur: 2.4 },
    { Icon: ServerCog,      label: 'Application Servers',          short: 'App Server',   color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40',  anim: { scale: [1, 1.15, 1] },  dur: 2.2 },
    { Icon: FileCode2,      label: 'Content-Centric Middleware',   short: 'Content',      color: 'from-fuchsia-400 to-pink-500',  glow: 'shadow-fuchsia-500/40', anim: { rotate: 360 },           dur: 8   },
    { Icon: MonitorSpeaker, label: 'Screen-Based Systems',         short: 'Screen',       color: 'from-lime-400 to-green-500',    glow: 'shadow-lime-500/40',    anim: { y: [0, -3, 0] },        dur: 2.1 },
    { Icon: Warehouse,      label: 'Data Warehouses',              short: 'Warehouses',   color: 'from-emerald-400 to-green-600', glow: 'shadow-emerald-500/40', anim: { scale: [1, 1.18, 1] },  dur: 1.9 },
    { Icon: Mail,           label: 'Messaging Systems',            short: 'Messaging',    color: 'from-yellow-400 to-orange-500', glow: 'shadow-yellow-500/40',  anim: { x: [0, 3, 0] },         dur: 2.3 },
    { Icon: Package,        label: 'Packaged Applications',        short: 'Packaged',     color: 'from-red-400 to-rose-600',      glow: 'shadow-red-500/40',     anim: { rotate: [0, -10, 10, 0] }, dur: 2.6 },
    { Icon: BrainCircuit,   label: 'Intelligent Middleware',       short: 'Intelligent',  color: 'from-blue-400 to-indigo-600',   glow: 'shadow-blue-500/40',    anim: { scale: [1, 1.12, 1] },  dur: 2.0 },
    { Icon: RefreshCcw,     label: 'Transaction Systems',          short: 'Transactions', color: 'from-pink-400 to-fuchsia-500',  glow: 'shadow-pink-500/40',    anim: { rotate: 360 },           dur: 6   },
  ]

  const RADIUS = 38
  const ROTATION_DURATION = 90  // very slow rotation

  return (
    <div className="relative aspect-square max-w-[640px] mx-auto">
      {/* Background outer glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10 blur-2xl" />

      {/* SVG connection layer (does not rotate — connects center to fixed orbit positions) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(91,138,255,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(91,138,255,0.18)" strokeWidth="0.4" strokeDasharray="0.8 1.4" />
        <circle cx="50" cy="50" r={RADIUS - 4} fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="0.3" strokeDasharray="0.4 0.8" />
      </svg>

      {/* Slowly rotating ring with satellites */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' }}
      >
        {/* Connection lines (rotate with the ring so they stay aligned to satellites) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {satellites.map((sat, i) => {
            const angle = (i * 360) / satellites.length - 90
            const rad = (angle * Math.PI) / 180
            const x = 50 + RADIUS * Math.cos(rad)
            const y = 50 + RADIUS * Math.sin(rad)
            // Trim line so it doesn't go under center icon and satellite
            const startX = 50 + 14 * Math.cos(rad)
            const startY = 50 + 14 * Math.sin(rad)
            const endX = 50 + (RADIUS - 5) * Math.cos(rad)
            const endY = 50 + (RADIUS - 5) * Math.sin(rad)
            void x; void y
            return (
              <line key={i} x1={startX} y1={startY} x2={endX} y2={endY}
                stroke="rgba(34,211,238,0.35)" strokeWidth="0.3" strokeDasharray="0.7 0.5" />
            )
          })}
        </svg>

        {/* Satellites placed around the orbit */}
        {satellites.map((sat, i) => {
          const angle = (i * 360) / satellites.length - 90
          const rad = (angle * Math.PI) / 180
          const x = 50 + RADIUS * Math.cos(rad)
          const y = 50 + RADIUS * Math.sin(rad)
          return (
            <div key={sat.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
              {/* Counter-rotate so satellite stays upright while parent ring spins */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={sat.anim}
                  transition={{ duration: sat.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${sat.color} grid place-items-center shadow-xl ${sat.glow} border-2 border-white/15`}
                >
                  <sat.Icon className="h-6 w-6 text-white drop-shadow" />
                </motion.div>
                <p className="mt-1.5 text-[10px] font-bold tracking-wide text-slate-300 text-center max-w-[80px] leading-tight">
                  {sat.label}
                </p>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Central DigiGate hub — does NOT rotate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-yellow-500 grid place-items-center shadow-2xl shadow-amber-500/40 border-4 border-amber-300/50"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 animate-ping" />

          {/* Central content */}
          <div className="flex flex-col items-center">
            <motion.img
              src="/DigiGate-R-HD.png"
              alt="DigiGate"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 object-contain"
            />
            <p className="mt-0.5 font-display text-[10px] font-black text-amber-900 leading-tight">DigiGate ©</p>
            <p className="text-[7px] font-medium text-amber-800 leading-tight">Digital Transformation</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Integration Partners Bar ─── */
function IntegrationPartnersBar() {
  const partners = [
    { name: 'OnBase by Hyland', color: 'from-orange-400 to-red-500' },
    { name: 'OpenText',         color: 'from-blue-400 to-cyan-500' },
    { name: 'Microsoft',        color: 'from-blue-400 to-indigo-500' },
    { name: 'SAP',              color: 'from-cyan-400 to-blue-500' },
    { name: 'UiPath',           color: 'from-orange-400 to-amber-500' },
    { name: 'Automation Anywhere', color: 'from-violet-400 to-purple-500' },
    { name: 'Oracle',           color: 'from-red-400 to-rose-500' },
    { name: 'Alfresco',         color: 'from-emerald-400 to-teal-500' },
  ]

  return (
    <div className="relative rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-400/[0.08] via-amber-300/[0.05] to-amber-400/[0.08] p-6 shadow-2xl shadow-amber-900/20">
      <div className="flex items-center gap-3 mb-5 justify-center">
        <Network className="h-5 w-5 text-amber-400" />
        <p className="text-base font-bold uppercase tracking-widest text-amber-300">
          DigiGate © Integrated with
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 hover:border-white/30 hover:bg-white/[0.08] transition-all"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              className={`mx-auto mb-2 w-10 h-10 rounded-lg bg-gradient-to-br ${partner.color} grid place-items-center shadow-lg`}
            >
              <span className="text-xs font-black text-white">
                {partner.name.charAt(0)}
              </span>
            </motion.div>
            <p className="text-[11px] font-semibold text-white text-center leading-tight">{partner.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const configComponents = [
  { Icon: Settings,    label: 'Logical Management Operations',   desc: 'Define the actions that process managers run' },
  { Icon: Layers,      label: 'Operational Management Products', desc: 'External applications invokable from process management' },
  { Icon: Zap,         label: 'Invocation Channels',             desc: 'Connection pathways for system interactions' },
  { Icon: FileCode2,   label: 'Object Structures',               desc: 'Data models defining integration semantics' },
  { Icon: CheckCircle2,label: 'Endpoints',                       desc: 'Termination points for integration calls' },
]

export default function IntegrationEnablerModulePage() {
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
              DigiGate <span className="text-gradient">Integration Enabler</span> Modules
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Integration Enabler Module</strong> enables integration with the major common platforms
              and systems. This enabler module is a component that resides between the process management product and the operational
              management product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Animated Integration Hub */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">How It Works</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                You can use the <strong className="text-white">DigiGate© Integration Enabler Module</strong> to associate logical management
                operations and operational management products with an integration module record.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The associations with <strong className="text-white">logical management operations</strong> define the actions that process
                managers run. The associations with <strong className="text-white">operational management products</strong> define the external
                applications that you can invoke from a process management product.
              </p>
            </motion.div>

            {/* Animated Integration Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl"
            >
              <IntegrationHubDiagram />
              <p className="mt-4 text-center text-xs text-slate-500 uppercase tracking-widest">
                10 Integration Surfaces • One Hub
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Configuration Components */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Configuration Components</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              What You Must <span className="text-gradient">Define & Configure</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              The client must define and configure the following components before the process management product can use the integration
              module to perform a logical management operation on an operational management product:
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {configComponents.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-5 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shadow-brand-500/30"
                >
                  <c.Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{c.label}</h3>
                <p className="text-xs leading-5 text-slate-400">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-10 text-center mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Partner Ecosystem</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Pre-Built <span className="text-gradient">Integrations</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Out-of-the-box integration with the world's leading enterprise platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <IntegrationPartnersBar />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Network className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Connect everything — seamlessly</h2>
            <p className="text-slate-400 mb-8">
              One integration hub, ten surfaces, endless connectivity to your enterprise ecosystem.
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
