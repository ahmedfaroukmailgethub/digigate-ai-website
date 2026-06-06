import { motion } from 'framer-motion'
import {
  Sparkles, Bot, Workflow, Link2, MessageCircle,
  Cpu, Eye, ScanLine, GitBranch, Brain,
  Lightbulb, Settings, Target, Wrench, LifeBuoy,
  CheckCircle2, TrendingUp, Clock, ShieldCheck, Users,
  DollarSign, Smile, Activity, Plus, Equal,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated 3-Ring Automation Technologies Diagram ─── */
function AutomationTechDiagram() {
  // Outer ring: 9 automation technologies (slow rotation outward)
  const techRing = [
    { Icon: Bot,         label: 'Robotic Process Automation', short: 'RPA',         anim: { rotate: [0, -10, 10, 0] }, dur: 2.5 },
    { Icon: Workflow,    label: 'Workflow Automation',        short: 'Workflow',    anim: { y: [0, -3, 0] },         dur: 2.0 },
    { Icon: Link2,       label: 'Blockchain',                 short: 'Blockchain',  anim: { rotate: 360 },           dur: 9   },
    { Icon: MessageCircle, label: 'Natural Language Processing', short: 'NLP',     anim: { scale: [1, 1.15, 1] },   dur: 2.0 },
    { Icon: Cpu,         label: 'Machine Learning',           short: 'ML',          anim: { scale: [1, 1.12, 1] },   dur: 2.2 },
    { Icon: Eye,         label: 'Computer Vision',            short: 'Vision',      anim: { rotate: [0, -8, 8, 0] }, dur: 2.6 },
    { Icon: GitBranch,   label: 'Process Mining',             short: 'Process Mining', anim: { y: [0, -3, 0] },      dur: 2.3 },
    { Icon: ScanLine,    label: 'Optical Character Recognition', short: 'OCR',     anim: { x: [0, 3, 0] },          dur: 2.1 },
    { Icon: MessageCircle, label: 'Chatbots',                 short: 'Chatbots',    anim: { scale: [1, 1.18, 1] },   dur: 1.9 },
  ]

  // Middle ring: 6 business sectors (slow rotation inward, opposite direction)
  const sectorRing = [
    'Finance & Accounting', 'Human Resources', 'Technology',
    'Supply Chain', 'Risk & Compliance', 'Internal Audit',
  ]

  // Inner core: 4 implementation phases
  const phases = [
    { Icon: Target,   label: 'Strategize', color: 'from-slate-300 to-slate-500',  quadrant: 'tl' },
    { Icon: Lightbulb,label: 'Design',     color: 'from-blue-700 to-blue-900',    quadrant: 'tr' },
    { Icon: Wrench,   label: 'Implement',  color: 'from-emerald-500 to-teal-700', quadrant: 'br' },
    { Icon: LifeBuoy, label: 'Support',    color: 'from-cyan-400 to-blue-500',    quadrant: 'bl' },
  ]

  const OUTER_R = 42   // outer satellite radius (%)
  const MIDDLE_R = 28  // sector ring radius
  const INNER_R = 13   // core quadrant radius
  const ROT_DUR = 80   // slow rotation in seconds

  return (
    <div className="relative aspect-square max-w-[640px] mx-auto">
      {/* Background glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-500/10 via-transparent to-emerald-500/10 blur-2xl" />

      {/* Decorative SVG: dotted orbits */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <circle cx="50" cy="50" r={OUTER_R} fill="none" stroke="rgba(91,138,255,0.18)" strokeWidth="0.3" strokeDasharray="0.6 1.2" />
        <circle cx="50" cy="50" r={MIDDLE_R} fill="none" stroke="rgba(245,158,11,0.18)" strokeWidth="0.3" strokeDasharray="0.4 0.8" />
        <circle cx="50" cy="50" r={MIDDLE_R + 5.5} fill="rgba(15,42,76,0.85)" stroke="rgba(91,138,255,0.4)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r={MIDDLE_R + 3} fill="none" stroke="rgba(91,138,255,0.25)" strokeWidth="0.2" />
      </svg>

      {/* OUTER ROTATING RING — Automation Technologies satellites */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: ROT_DUR, repeat: Infinity, ease: 'linear' }}
      >
        {techRing.map((tech, i) => {
          const angle = (i * 360) / techRing.length - 90
          const rad = (angle * Math.PI) / 180
          const x = 50 + OUTER_R * Math.cos(rad)
          const y = 50 + OUTER_R * Math.sin(rad)
          return (
            <div key={tech.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: ROT_DUR, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={tech.anim}
                  transition={{ duration: tech.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-emerald-700 grid place-items-center shadow-xl shadow-emerald-500/40 border-2 border-white/15"
                >
                  <tech.Icon className="h-5 w-5 text-white" />
                </motion.div>
                <p className="mt-1.5 text-[9px] font-bold text-slate-300 text-center max-w-[78px] leading-tight">
                  {tech.label}
                </p>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* MIDDLE ROTATING RING — Sector labels in opposite direction */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: ROT_DUR * 1.5, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            {sectorRing.map((_, i) => {
              const startAngle = (i * 360) / sectorRing.length - 90
              const endAngle = ((i + 1) * 360) / sectorRing.length - 90
              const r = MIDDLE_R + 1.5
              const sa = (startAngle * Math.PI) / 180
              const ea = (endAngle * Math.PI) / 180
              const sx = 50 + r * Math.cos(sa)
              const sy = 50 + r * Math.sin(sa)
              const ex = 50 + r * Math.cos(ea)
              const ey = 50 + r * Math.sin(ea)
              return (
                <path key={`p-${i}`} id={`sectorPath-${i}`}
                  d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
                  fill="none" />
              )
            })}
          </defs>
          {sectorRing.map((label, i) => (
            <text key={label} fill="#fff" fontSize="2.2" fontWeight="700" letterSpacing="0.05em">
              <textPath href={`#sectorPath-${i}`} startOffset="50%" textAnchor="middle">
                {label.toUpperCase()}
              </textPath>
            </text>
          ))}
        </svg>

        {/* Animated dots between sectors */}
        {sectorRing.map((_, i) => {
          const angle = ((i + 0.5) * 360) / sectorRing.length - 90
          const rad = (angle * Math.PI) / 180
          const x = 50 + (MIDDLE_R + 2.5) * Math.cos(rad)
          const y = 50 + (MIDDLE_R + 2.5) * Math.sin(rad)
          return (
            <motion.div
              key={`dot-${i}`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
            />
          )
        })}
      </motion.div>

      {/* INNER STATIC CORE — 4 phase quadrants */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[28%] h-[28%]">
          {/* Background circle for the quadrants */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-brand-400/30 shadow-2xl shadow-brand-500/40">
            {phases.map((p) => {
              const positions: Record<string, string> = {
                tl: 'top-0 left-0 rounded-tl-full',
                tr: 'top-0 right-0 rounded-tr-full',
                br: 'bottom-0 right-0 rounded-br-full',
                bl: 'bottom-0 left-0 rounded-bl-full',
              }
              return (
                <motion.div
                  key={p.label}
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute w-1/2 h-1/2 ${positions[p.quadrant]} bg-gradient-to-br ${p.color}`}
                >
                  <div className={`absolute inset-0 grid place-items-center text-white`}>
                    <div className="flex flex-col items-center gap-0.5">
                      <p.Icon className="h-4 w-4 drop-shadow" />
                      <span className="text-[8px] font-bold">{p.label}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Circular flow arrows around the core */}
          <svg viewBox="0 0 100 100" className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none" preserveAspectRatio="none">
            <motion.circle
              cx="50" cy="50" r="48"
              fill="none" stroke="#fbbf24" strokeWidth="0.8"
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>
      </div>

      {/* Center label — "Artificial Intelligence" below */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
        <p className="text-base font-display font-bold text-emerald-300 italic">Artificial Intelligence</p>
      </div>
    </div>
  )
}

/* ─── IPA Equation: RPA + AI = IPA ─── */
function IPAEquation() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-300 text-center mb-2">
        Intelligent Process Automation
      </p>
      <p className="text-xs text-slate-500 text-center mb-8">RPA + AI = IPA</p>

      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        {/* RPA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 grid place-items-center shadow-xl shadow-blue-500/40 border-2 border-white/15"
          >
            <Bot className="h-9 w-9 text-white" />
          </motion.div>
          <p className="mt-3 text-sm font-bold text-blue-300 text-center leading-tight">
            Robotic Process<br />Automation
          </p>
        </motion.div>

        {/* Plus */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl text-brand-400 font-black"
        >
          <Plus className="h-8 w-8" />
        </motion.div>

        {/* Human head with circuit (middle) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full border-2 border-emerald-400/50 grid place-items-center bg-gradient-to-br from-emerald-500/20 to-teal-600/20"
            >
              {/* Stylized brain in head */}
              <svg viewBox="0 0 60 60" className="w-16 h-16">
                <defs>
                  <radialGradient id="ipaHead" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </radialGradient>
                </defs>
                {/* Head side profile */}
                <path d="M 18 50 Q 12 48 10 40 Q 6 28 14 18 Q 24 8 38 12 Q 50 16 50 30 Q 50 38 44 42 L 44 48 L 38 50 Z"
                  fill="url(#ipaHead)" stroke="#0d9488" strokeWidth="1" opacity="0.95" />
                {/* Brain dots inside (neural circuit) */}
                {[
                  { x: 25, y: 22 }, { x: 32, y: 24 }, { x: 38, y: 22 },
                  { x: 25, y: 30 }, { x: 32, y: 32 }, { x: 38, y: 30 },
                  { x: 28, y: 38 }, { x: 35, y: 38 },
                ].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="#fbbf24">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* Connection lines */}
                <path d="M 25 22 L 32 24 L 38 22" stroke="#fbbf24" strokeWidth="0.6" fill="none" opacity="0.6" />
                <path d="M 25 30 L 32 32 L 38 30" stroke="#fbbf24" strokeWidth="0.6" fill="none" opacity="0.6" />
                <path d="M 28 38 L 35 38" stroke="#fbbf24" strokeWidth="0.6" fill="none" opacity="0.6" />
              </svg>
            </motion.div>
          </div>
          <p className="mt-3 text-sm font-bold text-emerald-300 text-center leading-tight">
            Intelligent Process<br />Automation
          </p>
        </motion.div>

        {/* Plus */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="text-3xl text-brand-400 font-black"
        >
          <Equal className="h-8 w-8" />
        </motion.div>

        {/* AI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 grid place-items-center shadow-xl shadow-emerald-500/40 border-2 border-white/15"
          >
            <Brain className="h-9 w-9 text-white" />
          </motion.div>
          <p className="mt-3 text-sm font-bold text-emerald-300 text-center leading-tight">
            Artificial<br />Intelligence
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const businessValues = [
  { Icon: Activity,    label: 'Enhance Business Continuity',           color: 'from-cyan-400 to-blue-500',     anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
  { Icon: TrendingUp,  label: 'Managing Repetitive Tasks Effectively', color: 'from-brand-400 to-cyan-500',    anim: { y: [0, -3, 0] },       dur: 2.2 },
  { Icon: ShieldCheck, label: 'Reducing Errors Dramatically',          color: 'from-emerald-400 to-teal-500',  anim: { rotate: [0, -8, 8, 0] }, dur: 2.5 },
  { Icon: Settings,    label: 'Increased Business Efficiency',         color: 'from-violet-400 to-purple-500', anim: { rotate: 360 },         dur: 8   },
  { Icon: Workflow,    label: 'Boosting Efficiency in Business Process', color: 'from-fuchsia-400 to-pink-500', anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
  { Icon: DollarSign,  label: 'Lowering Operational Costs',            color: 'from-amber-400 to-orange-500',  anim: { y: [0, -4, 0] },        dur: 2.1 },
  { Icon: Smile,       label: 'Enhanced Customer Experience',          color: 'from-pink-400 to-rose-500',     anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
  { Icon: Clock,       label: 'Saving Tremendous Time',                color: 'from-orange-400 to-red-500',    anim: { rotate: 360 },         dur: 6   },
]

export default function IntelligentAutomationModulePage() {
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
              DigiGate <span className="text-gradient">Intelligent Automation</span> Module
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Intelligence Automation Module</strong> allows you to automate frequent, time-consuming,
              and error-prone management tasks. Automation can also use a combination of document classification, data extraction, and a rules
              engine to auto-apply actions — such as auto-assigning a new case or auto-replying to a correspondent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Values + IPA Equation */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">

            {/* Business values list */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Adding Business Value</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  Focus On What <span className="text-gradient">Matters</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  DigiGate© Intelligence Automation Module helps in focusing on adding business value by:
                </p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {businessValues.map((v, i) => (
                  <motion.li
                    key={v.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-2.5 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-2.5 hover:border-amber-400/30 transition-colors"
                  >
                    <motion.div
                      animate={v.anim}
                      transition={{ duration: v.dur, repeat: Infinity, ease: 'easeInOut' }}
                      className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${v.color} grid place-items-center shadow-lg`}
                    >
                      <v.Icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-xs leading-5 text-slate-300 font-medium">{v.label}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* IPA Equation diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <IPAEquation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Automation Technologies Circle Diagram */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12 mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Automation Technologies</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              End-to-End <span className="text-gradient">Automation</span> Ecosystem
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Nine automation technologies serving six business sectors through four phases of intelligent transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-10 shadow-2xl"
          >
            <AutomationTechDiagram />

            {/* Legend below */}
            <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Outer Ring</p>
                  <p className="text-sm font-bold text-white">9 Technologies</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Middle Ring</p>
                  <p className="text-sm font-bold text-white">6 Sectors</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="w-3 h-3 rounded-full bg-brand-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Inner Core</p>
                  <p className="text-sm font-bold text-white">4 Phases</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases / Automation Types */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Automation Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              What Can Be <span className="text-gradient">Automated</span>?
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: ScanLine,     title: 'Document Classification', desc: 'AI auto-categorizes documents by type, content, and metadata for downstream processing.' },
              { Icon: GitBranch,    title: 'Data Extraction',         desc: 'Pull structured data from forms, invoices, contracts, and emails without manual touch.' },
              { Icon: Settings,     title: 'Rules Engine',            desc: 'Auto-apply actions like email binding, auto-assignment to handlers, and case routing.' },
              { Icon: Users,        title: 'Auto-Reply Handler',      desc: 'Automatic responses to correspondents based on context, urgency, and policy rules.' },
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
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shadow-brand-500/30"
                >
                  <card.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs leading-6 text-slate-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Bot className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Automate the routine — elevate the strategic</h2>
            <p className="text-slate-400 mb-8">
              Let your team focus on what truly matters while DigiGate's intelligent automation handles the rest.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hidden marker to suppress unused import warnings */}
      <span className="hidden"><CheckCircle2 /></span>
    </>
  )
}
