import { motion } from 'framer-motion'
import {
  CheckCircle2, Sparkles, FolderOpen, Tag, Database, RefreshCw,
  Download, LogOut, LogIn, Trash2, Archive, FileText,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Spinning Records Lifecycle Diagram ─── */
function RecordsLifecycleDiagram() {
  const lifecycle = [
    { Icon: FolderOpen, label: 'File',      color: 'from-amber-400 to-orange-500',  glow: 'shadow-amber-500/50',  anim: { y: [0, -4, 0] },        dur: 2.2 },
    { Icon: Tag,        label: 'Label',     color: 'from-emerald-400 to-teal-500',  glow: 'shadow-emerald-500/50', anim: { rotate: [0, -8, 8, 0] }, dur: 2.8 },
    { Icon: Database,   label: 'Store',     color: 'from-cyan-400 to-sky-500',      glow: 'shadow-cyan-500/50',    anim: { scale: [1, 1.15, 1] },  dur: 2.4 },
    { Icon: RefreshCw,  label: 'Transform', color: 'from-blue-400 to-indigo-500',   glow: 'shadow-blue-500/50',    anim: { rotate: 360 },           dur: 6   },
    { Icon: Download,   label: 'Retrieve',  color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/50',  anim: { y: [0, 4, 0] },         dur: 2.0 },
    { Icon: LogOut,     label: 'Check-out', color: 'from-pink-400 to-rose-500',     glow: 'shadow-pink-500/50',    anim: { x: [0, 3, 0] },         dur: 2.6 },
    { Icon: LogIn,      label: 'Check-in',  color: 'from-fuchsia-400 to-pink-500',  glow: 'shadow-fuchsia-500/50', anim: { x: [0, -3, 0] },        dur: 2.4 },
    { Icon: Trash2,     label: 'Dispose',   color: 'from-red-400 to-orange-500',    glow: 'shadow-red-500/50',     anim: { rotate: [0, -10, 10, 0] }, dur: 2.5 },
  ]

  const RADIUS = 38     // percentage of container — placement of icons on the orbit
  const TICK_R = 44     // outer decorative tick marks
  const ROTATION_DURATION = 60  // full rotation in seconds (slow)

  return (
    <div className="relative aspect-square max-w-[480px] mx-auto">
      {/* Background outer glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10 blur-2xl" />

      {/* Slowly spinning outer ring with icons */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' }}
      >
        {/* Decorative tick marks SVG */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {/* Outer dashed orbit */}
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(91,138,255,0.25)" strokeWidth="0.4" strokeDasharray="0.8 1.4" />
          {/* Inner ring */}
          <circle cx="50" cy="50" r={RADIUS - 6} fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth="0.3" strokeDasharray="0.4 0.8" />
          {/* Outer tick marks */}
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * 360) / 48
            const rad = (angle * Math.PI) / 180
            const x1 = 50 + TICK_R * Math.cos(rad)
            const y1 = 50 + TICK_R * Math.sin(rad)
            const x2 = 50 + (TICK_R - 1.4) * Math.cos(rad)
            const y2 = 50 + (TICK_R - 1.4) * Math.sin(rad)
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.12)" strokeWidth="0.25" />
            )
          })}
          {/* Arcs between stages (subtle arrows) */}
          {lifecycle.map((_, i) => {
            const a1 = (i * 360) / lifecycle.length - 90 + 12
            const a2 = ((i + 1) * 360) / lifecycle.length - 90 - 12
            const r1 = (a1 * Math.PI) / 180
            const r2 = (a2 * Math.PI) / 180
            const sx = 50 + (RADIUS - 3) * Math.cos(r1)
            const sy = 50 + (RADIUS - 3) * Math.sin(r1)
            const ex = 50 + (RADIUS - 3) * Math.cos(r2)
            const ey = 50 + (RADIUS - 3) * Math.sin(r2)
            return (
              <path key={`arc-${i}`}
                d={`M ${sx} ${sy} A ${RADIUS - 3} ${RADIUS - 3} 0 0 1 ${ex} ${ey}`}
                fill="none" stroke="rgba(91,138,255,0.4)" strokeWidth="0.4" markerEnd="url(#arrowHead)" />
            )
          })}
          <defs>
            <marker id="arrowHead" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
              <polygon points="0 0, 3 1.5, 0 3" fill="rgba(91,138,255,0.6)" />
            </marker>
          </defs>
        </svg>

        {/* Icons placed around the orbit — each counter-rotates to stay upright */}
        {lifecycle.map((item, i) => {
          const angle = (i * 360) / lifecycle.length - 90  // start from top
          const rad = (angle * Math.PI) / 180
          const x = 50 + RADIUS * Math.cos(rad)
          const y = 50 + RADIUS * Math.sin(rad)
          return (
            <div key={item.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
              {/* Counter-rotate so icon stays upright while parent ring spins */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={item.anim}
                  transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} grid place-items-center shadow-xl ${item.glow} border border-white/10`}
                >
                  <item.Icon className="h-6 w-6 text-white drop-shadow" />
                </motion.div>
                <p className="mt-2 text-[10px] font-bold tracking-widest text-slate-300 uppercase whitespace-nowrap">
                  {item.label}
                </p>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Central hub — does NOT rotate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#0a0d2a] via-[#1a1547] to-[#0a0d2a] grid place-items-center border-2 border-brand-400/40 shadow-2xl shadow-brand-500/30"
        >
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border border-brand-400/30 animate-ping" />
          <div className="absolute -inset-2 rounded-full border border-brand-400/15" />

          {/* Central icon + label */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="mb-1"
            >
              <Archive className="h-7 w-7 text-brand-300" />
            </motion.div>
            <p className="font-display text-[11px] font-bold text-white leading-tight text-center">Records</p>
            <p className="font-display text-[11px] font-bold text-brand-300 leading-tight text-center">lifecycle</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const activities = [
  'Identifying the information that needs to be captured.',
  'Information planning for the organization.',
  'Enforcement of policies and practices regarding the creation, maintenance, and disposal of records.',
  'Creation of a records storage plan.',
  'Classification, identification, and storing of the records.',
  'Coordination of providing internal and external access to the records, keeping data privacy and business confidentiality in view.',
]

const benefits = [
  'Elimination of redundant data.',
  'Increase productivity and accountability in the organization.',
  'Reduction in research for the right information.',
  'Cost-effective record storage due to the absence of redundant records.',
  'The creation of records is governed by standards and regulations present in the organization — ensuring regulatory compliance.',
  'Record management brings in the capability to adopt new technologies for record-keeping.',
  'Vital information can be well protected and secure using record management.',
  'Easy and better access to relevant records — supporting better governance and corporate decision-making.',
]

export default function RecordsManagementPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[56px]">
              DigiGate <span className="text-gradient">Records Management</span> System
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Records Management System (RMS)</strong> manages records for an organization throughout
              the records-life cycle. Activities include the systematic and efficient control of the creation, maintenance, and destruction of
              records along with the business transactions associated with them. Considered a key component of operational efficiency, record
              management adds more value to an organization's information assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diagram + Activities */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Spinning Lifecycle Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl"
            >
              <RecordsLifecycleDiagram />
              <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest">
                Records Lifecycle — Continuously Managed
              </p>
            </motion.div>

            {/* Activities */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">DigiGate© RMS Activities</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  What the System <span className="text-gradient">Covers</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <ul className="space-y-3">
                {activities.map((act, i) => (
                  <motion.li
                    key={act}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3 hover:border-amber-400/30 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-slate-300">{act}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">DigiGate© RMS Benefits</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Value the System <span className="text-gradient">Delivers</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shadow-brand-500/30">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-slate-300 text-justify">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <FileText className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Master the full records lifecycle</h2>
            <p className="text-slate-400 mb-8">
              From creation to disposal — manage every record with confidence, compliance, and control.
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
