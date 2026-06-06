import { motion } from 'framer-motion'
import {
  Sparkles, Brain, Cog, Server, Lightbulb, Bot,
  ScanEye, AudioWaveform, BrainCircuit, CheckCircle2,
  Zap, ShieldCheck, Rocket, Code2, Layers, Globe,
} from 'lucide-react'
import AIWorkflow from '../../components/AIWorkflow'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated AI Brain Diagram with 8 Specializations ─── */
function AIBrainDiagram() {
  const specializations = [
    { Icon: Brain,          label: 'Machine Learning',          color: 'from-pink-400 to-rose-500',     glow: 'shadow-pink-500/40',   anim: { scale: [1, 1.15, 1] },  dur: 2.0, pos: 'top-1' },
    { Icon: Cog,            label: 'Evolutionary Computation', color: 'from-red-400 to-orange-500',    glow: 'shadow-red-500/40',     anim: { rotate: 360 },           dur: 8,   pos: 'top-2' },
    { Icon: Server,         label: 'Expert Systems',           color: 'from-blue-400 to-indigo-500',   glow: 'shadow-blue-500/40',    anim: { y: [0, -3, 0] },        dur: 2.2, pos: 'top-3' },
    { Icon: Lightbulb,      label: 'Speech Interpretation',    color: 'from-cyan-400 to-blue-500',     glow: 'shadow-cyan-500/40',    anim: { scale: [1, 1.18, 1] },  dur: 1.8, pos: 'top-4' },
    { Icon: Bot,            label: 'Robotics',                 color: 'from-slate-300 to-slate-500',   glow: 'shadow-slate-500/40',   anim: { y: [0, -4, 0] },        dur: 2.4, pos: 'bot-1' },
    { Icon: ScanEye,        label: 'Computer Vision',          color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40',  anim: { rotate: [0, -8, 8, 0] }, dur: 2.5, pos: 'bot-2' },
    { Icon: AudioWaveform,  label: 'Natural Language Processing', color: 'from-rose-400 to-pink-500',  glow: 'shadow-rose-500/40',    anim: { x: [0, 3, 0] },         dur: 2.2, pos: 'bot-3' },
    { Icon: BrainCircuit,   label: 'Neural Networks',          color: 'from-fuchsia-400 to-pink-500',  glow: 'shadow-fuchsia-500/40', anim: { scale: [1, 1.12, 1] },  dur: 2.1, pos: 'bot-4' },
  ]

  const topItems = specializations.filter(s => s.pos.startsWith('top'))
  const botItems = specializations.filter(s => s.pos.startsWith('bot'))

  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Specialized AI Services
      </p>
      <p className="text-center text-xs text-slate-500 mb-8">
        DigiGate © AI Platform for Business
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 items-center">

        {/* Brain head silhouette on the left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center"
        >
          <svg viewBox="0 0 200 220" className="w-full max-w-[180px]" fill="none">
            <defs>
              <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e2a6e" />
                <stop offset="100%" stopColor="#0d1240" />
              </linearGradient>
              <radialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5b8aff" stopOpacity="0.7" />
              </radialGradient>
              <filter id="brainGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Side-profile head silhouette */}
            <path d="M 60 180
                     Q 50 170 45 150
                     Q 35 140 30 120
                     Q 25 95 35 70
                     Q 50 40 90 30
                     Q 130 25 160 50
                     Q 180 70 175 100
                     Q 170 120 158 130
                     L 158 145
                     Q 158 155 148 158
                     L 138 162
                     L 138 180
                     L 75 180 Z"
              fill="url(#headGrad)" stroke="rgba(91,138,255,0.4)" strokeWidth="1.5" />

            {/* Brain inside the head */}
            <g transform="translate(85, 90)" filter="url(#brainGlow)">
              {/* Brain outer */}
              <motion.ellipse cx="0" cy="0" rx="45" ry="32" fill="url(#brainGrad)" opacity="0.7" />
              {/* Brain folds — animated paths */}
              <motion.path
                d="M -35 -10 Q -25 -25 -10 -15 Q 5 -28 20 -10 Q 32 -22 40 -5"
                stroke="#ec4899" strokeWidth="2" fill="none" strokeLinecap="round"
              />
              <motion.path
                d="M -35 5 Q -20 -5 -5 5 Q 10 -8 25 5 Q 35 -2 42 8"
                stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round"
              />
              <motion.path
                d="M -32 18 Q -18 8 -3 18 Q 12 5 28 18 Q 36 12 40 22"
                stroke="#5b8aff" strokeWidth="2" fill="none" strokeLinecap="round"
              />
              {/* Neural dots scattered inside */}
              {[
                { x: -20, y: -15 }, { x: 5, y: -20 }, { x: 22, y: -8 },
                { x: -25, y: 0 }, { x: 10, y: 0 }, { x: 30, y: 5 },
                { x: -15, y: 15 }, { x: 8, y: 12 }, { x: 25, y: 18 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2" fill="#fbbf24">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          </svg>

          {/* Pulsing aura around head */}
          <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        </motion.div>

        {/* Specialization icons arranged in two rows (top: above brain, bottom: below) */}
        <div className="space-y-6">
          {/* Top row */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300 mb-3 text-center lg:text-left">
              Cognitive Engines
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {topItems.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:border-amber-400/40 hover:bg-amber-400/[0.06] transition-colors"
                >
                  <motion.div
                    animate={s.anim}
                    transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center shadow-lg ${s.glow}`}
                  >
                    <s.Icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-[10px] font-bold text-slate-300 text-center leading-tight">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dotted connection line */}
          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-[length:6px_1px] bg-repeat-x"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(91,138,255,0.5) 1px, transparent 1px)' }} />
          </div>

          {/* Bottom row */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300 mb-3 text-center lg:text-left">
              Perception Engines
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {botItems.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:border-amber-400/40 hover:bg-amber-400/[0.06] transition-colors"
                >
                  <motion.div
                    animate={s.anim}
                    transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center shadow-lg ${s.glow}`}
                  >
                    <s.Icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-[10px] font-bold text-slate-300 text-center leading-tight">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const advantages = [
  {
    Icon: Zap,
    title: 'Modernize Business Processes',
    desc: 'With task-specific AI to solve common scenarios — purpose-built models tuned for real business outcomes.',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    anim: { scale: [1, 1.15, 1] }, dur: 2.0,
  },
  {
    Icon: Rocket,
    title: 'Accelerate Development',
    desc: 'With built-in business logic that enables you to launch solutions in short time — from concept to production.',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { y: [0, -4, 0] }, dur: 2.0,
  },
  {
    Icon: ShieldCheck,
    title: 'Run Responsibly Anywhere',
    desc: 'With security that extends from the cloud to the intelligent edge — compliance and trust by design.',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { rotate: [0, -8, 8, 0] }, dur: 2.5,
  },
]

const platformCapabilities = [
  {
    Icon: Layers,
    title: 'Create & deploy models at scale',
    desc: 'Using automated and reproducible machine learning workflows.',
    color: 'from-brand-400 to-cyan-400',
    anim: { rotate: 360 }, dur: 10,
  },
  {
    Icon: ShieldCheck,
    title: 'Innovate responsibly',
    desc: 'With a rich set of built-in responsible capabilities to help you understand, protect, and control data, models and processes.',
    color: 'from-emerald-400 to-teal-500',
    anim: { scale: [1, 1.15, 1] }, dur: 2.2,
  },
  {
    Icon: Code2,
    title: 'Build your way',
    desc: 'With best-in-class business work-flow for your frameworks with multiple languages.',
    color: 'from-violet-400 to-purple-500',
    anim: { y: [0, -4, 0] }, dur: 2.0,
  },
]

export default function AIEnginesPage() {
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
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[60px]">
              DigiGate <span className="text-gradient">AI</span> Engine
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Artificial Intelligence Platform</strong> is a creative innovative AI platform for all
              digital transformation solutions — taking advantage of decades of breakthrough AI technology research, responsible AI practices,
              and the flexibility AI offers to build and deploy intelligent solutions.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400 text-justify">
              Access high-quality vision, speech, language, and decision-making AI models through simple API calls, and create advanced machine
              learning models to enhance your frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Workflow component (copied from HomePage) */}
      <AIWorkflow />

      {/* Brain Diagram + 8 Specializations */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12 mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Specialized Services</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-gradient">8 AI Engines</span>, one platform
            </h2>
            <p className="mt-4 text-base text-slate-400">
              DigiGate© Artificial Intelligence Platform advantages for specialized AI services for business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AIBrainDiagram />
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Platform Advantages</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Why DigiGate <span className="text-gradient">AI</span>?
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-7 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={a.anim}
                  transition={{ duration: a.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-lg ${a.glow}`}
                >
                  <a.Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{a.title}</h3>
                <p className="text-sm leading-7 text-slate-400 text-justify">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities for ML Models */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Build, Train & Deploy</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              ML <span className="text-gradient">Model Platform</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Artificial Intelligence Platform</strong> is a platform for building, training, and
              deploying machine learning models to enable:
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {platformCapabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={c.anim}
                    transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} grid place-items-center shadow-lg`}
                  >
                    <c.Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-2 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                      {c.title}
                    </h4>
                    <p className="text-sm leading-6 text-slate-400">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Globe className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Bring intelligent solutions to life</h2>
            <p className="text-slate-400 mb-8">
              From vision to voice — DigiGate's AI engine powers your next generation of digital transformation.
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
