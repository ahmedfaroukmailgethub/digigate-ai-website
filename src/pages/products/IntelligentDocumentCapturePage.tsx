import { motion } from 'framer-motion'
import {
  Sparkles, ScanLine, Mail, Smartphone, Printer, Globe,
  Cloud, Camera, Cpu, FileText, FilterX, Tag, Database,
  CheckCircle2, Layers, Send, ArrowRight, Zap, Wand2,
  Shield, Bot, Brain, FolderInput,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated Capture Flow Diagram (Inputs → AI Engine → Outputs) ─── */
function CaptureFlowDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Multi-Channel Capture Pipeline
      </p>
      <p className="text-center text-xs text-slate-500 mb-6">Any source → AI processing → Any destination</p>

      <svg viewBox="0 0 100 60" className="w-full h-96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="capArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(34,211,238,0.85)" />
          </marker>
          <filter id="capGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="aiCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b8aff" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* ─── Input Sources (left column) ─── */}
        {[
          { y: 6,  label: 'Scanner', color: '#22d3ee' },
          { y: 18, label: 'Email',   color: '#5b8aff' },
          { y: 30, label: 'Mobile',  color: '#a855f7' },
          { y: 42, label: 'Fax',     color: '#f59e0b' },
          { y: 54, label: 'Web/API', color: '#34d399' },
        ].map((src, i) => (
          <g key={src.label}>
            <rect x="3" y={src.y - 2} width="14" height="4" rx="0.6"
              fill={`${src.color}33`} stroke={src.color} strokeWidth="0.3"
              filter="url(#capGlow)" />
            <text x="10" y={src.y + 0.7} fill="#fff" fontSize="1.8" fontWeight="700"
              textAnchor="middle">{src.label}</text>

            {/* Pulsing status dot */}
            <circle cx="16" cy={src.y - 1} r="0.5" fill={src.color}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            {/* Arrow to AI engine */}
            <line x1="17" y1={src.y} x2="36" y2="30" stroke={src.color}
              strokeWidth="0.3" strokeOpacity="0.4" strokeDasharray="0.6 0.4"
              markerEnd="url(#capArrow)" />

            {/* Flowing data packet from input to engine */}
            <circle r="0.7" fill={src.color} filter="url(#capGlow)" opacity="0">
              <animate attributeName="cx" values="17;36" dur="4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${src.y};30`} dur="4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                dur="4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ─── AI Capture Engine (center) ─── */}
        <g transform="translate(45, 30)">
          {/* Rotating dashed ring */}
          <motion.circle cx="0" cy="0" r="10" fill="none"
            stroke="rgba(91,138,255,0.4)" strokeWidth="0.3" strokeDasharray="1 0.8" />
          {/* Outer glow */}
          <circle cx="0" cy="0" r="12" fill="url(#aiCoreGrad)" opacity="0.15" />
          {/* Core */}
          <circle cx="0" cy="0" r="8" fill="url(#aiCoreGrad)" opacity="0.85" filter="url(#capGlow)">
            <animate attributeName="r" values="7.5;8.5;7.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          {/* AI text */}
          <text x="0" y="-0.5" fill="#fff" fontSize="2.8" fontWeight="900" textAnchor="middle">AI</text>
          <text x="0" y="3" fill="#fff" fontSize="1.2" fontWeight="700" textAnchor="middle">CAPTURE</text>

          {/* Orbit dots */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 10 * Math.cos(rad)
            const y = 10 * Math.sin(rad)
            return (
              <circle key={angle} cx={x} cy={y} r="0.6" fill="#fbbf24">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            )
          })}
        </g>

        {/* ─── Processing Stages (between center and outputs) ─── */}
        {[
          { y: 12, label: 'Classify',  color: '#a855f7' },
          { y: 24, label: 'Extract',   color: '#22d3ee' },
          { y: 36, label: 'Validate',  color: '#34d399' },
          { y: 48, label: 'Index',     color: '#f59e0b' },
        ].map((stage, i) => (
          <g key={stage.label}>
            <rect x="58" y={stage.y - 2} width="14" height="4" rx="0.6"
              fill={`${stage.color}26`} stroke={stage.color} strokeWidth="0.3" />
            <text x="65" y={stage.y + 0.7} fill="#fff" fontSize="1.8" fontWeight="700"
              textAnchor="middle">{stage.label}</text>

            {/* Connecting line from engine */}
            <line x1="54" y1="30" x2="58" y2={stage.y}
              stroke={stage.color} strokeWidth="0.3" strokeOpacity="0.4" strokeDasharray="0.6 0.4" />

            {/* Flowing packet */}
            <circle r="0.55" fill={stage.color} filter="url(#capGlow)" opacity="0">
              <animate attributeName="cx" values="54;58" dur="3s" begin={`${i * 0.4 + 1}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`30;${stage.y}`} dur="3s" begin={`${i * 0.4 + 1}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                dur="3s" begin={`${i * 0.4 + 1}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ─── Output destinations (right column) ─── */}
        {[
          { y: 12, label: 'DMS',  color: '#22d3ee' },
          { y: 24, label: 'ERP',  color: '#a855f7' },
          { y: 36, label: 'CRM',  color: '#34d399' },
          { y: 48, label: 'BPM',  color: '#f59e0b' },
        ].map((dest, i) => (
          <g key={dest.label}>
            <line x1="72" y1={dest.y} x2="83" y2={dest.y}
              stroke={dest.color} strokeWidth="0.3" strokeOpacity="0.5" strokeDasharray="0.6 0.4"
              markerEnd="url(#capArrow)" />

            {/* Flowing packet from stage to destination */}
            <circle r="0.55" fill={dest.color} filter="url(#capGlow)" opacity="0">
              <animate attributeName="cx" values="72;83" dur="2.5s" begin={`${i * 0.4 + 2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${dest.y};${dest.y}`} dur="2.5s" begin={`${i * 0.4 + 2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                dur="2.5s" begin={`${i * 0.4 + 2}s`} repeatCount="indefinite" />
            </circle>

            <rect x="83" y={dest.y - 2} width="14" height="4" rx="0.6"
              fill={`${dest.color}26`} stroke={dest.color} strokeWidth="0.3"
              filter="url(#capGlow)" />
            <text x="90" y={dest.y + 0.7} fill="#fff" fontSize="1.8" fontWeight="700"
              textAnchor="middle">{dest.label}</text>
          </g>
        ))}

        {/* Section labels */}
        <text x="10" y="60" fill="#5b8aff" fontSize="1.8" fontWeight="900"
          textAnchor="middle" letterSpacing="0.1em">INPUTS</text>
        <text x="45" y="60" fill="#a855f7" fontSize="1.8" fontWeight="900"
          textAnchor="middle" letterSpacing="0.1em">AI CORE</text>
        <text x="65" y="60" fill="#22d3ee" fontSize="1.8" fontWeight="900"
          textAnchor="middle" letterSpacing="0.1em">PROCESS</text>
        <text x="90" y="60" fill="#34d399" fontSize="1.8" fontWeight="900"
          textAnchor="middle" letterSpacing="0.1em">OUTPUTS</text>
      </svg>
    </div>
  )
}

const captureChannels = [
  { Icon: ScanLine,  label: 'Professional Scanners', desc: 'Direct integration with industry-standard scanner drivers', color: 'from-cyan-400 to-blue-500',     anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
  { Icon: Mail,      label: 'Email Inbox',           desc: 'Auto-capture from monitored mailboxes & attachments',       color: 'from-brand-400 to-indigo-500',  anim: { y: [0, -4, 0] },       dur: 2.2 },
  { Icon: Smartphone,label: 'Mobile Capture',        desc: 'Smartphone camera with AI image enhancement',               color: 'from-violet-400 to-purple-500', anim: { rotate: [0, -8, 8, 0] }, dur: 2.5 },
  { Icon: Printer,   label: 'Fax / MFP',             desc: 'Multifunction printers and incoming fax lines',             color: 'from-pink-400 to-rose-500',     anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
  { Icon: Globe,     label: 'Web Upload',            desc: 'Browser-based drag-and-drop submission',                    color: 'from-emerald-400 to-teal-500',  anim: { rotate: 360 },         dur: 10  },
  { Icon: Cloud,     label: 'Cloud Storage',         desc: 'Watch folders on OneDrive, Dropbox, S3, SharePoint',        color: 'from-amber-400 to-orange-500',  anim: { y: [0, -3, 0] },       dur: 2.1 },
  { Icon: Camera,    label: 'Camera & IoT',          desc: 'Industrial cameras and connected capture devices',          color: 'from-red-400 to-orange-600',    anim: { scale: [1, 1.12, 1] }, dur: 2.2 },
  { Icon: FolderInput, label: 'Hot Folders',         desc: 'Network share monitoring for batch ingestion',              color: 'from-fuchsia-400 to-pink-500',  anim: { x: [0, 3, 0] },        dur: 2.0 },
]

const processingStages = [
  { Icon: Wand2,    title: 'Pre-Processing',   desc: 'Auto-deskew, denoise, enhance, rotate, and binarize for optimal recognition.', color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/40', anim: { rotate: [0, -10, 10, 0] }, dur: 2.4 },
  { Icon: Tag,      title: 'AI Classification', desc: 'Identify document type, category, and intent automatically using ML.',       color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40', anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
  { Icon: Brain,    title: 'Smart Extraction',  desc: 'Extract structured data, key fields, tables, and metadata with AI.',         color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40', anim: { y: [0, -3, 0] }, dur: 2.2 },
  { Icon: FilterX,  title: 'Validation Rules',  desc: 'Business rules engine validates data quality and flags exceptions.',         color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/40', anim: { rotate: 360 }, dur: 8 },
  { Icon: Database, title: 'Indexing & Routing', desc: 'Index by metadata and route to downstream DMS, ERP, CRM, or BPM systems.',  color: 'from-pink-400 to-rose-500', glow: 'shadow-pink-500/40', anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
  { Icon: Send,     title: 'Export & Integration', desc: 'Deliver to any system via REST, webhooks, message queues, or file shares.', color: 'from-fuchsia-400 to-pink-500', glow: 'shadow-fuchsia-500/40', anim: { x: [0, 4, 0] }, dur: 2.1 },
]

const benefits = [
  { Icon: Zap,         label: 'Reduce manual data entry by 90%' },
  { Icon: Shield,      label: 'Enforce data quality at the source' },
  { Icon: Bot,         label: 'Straight-through processing for routine docs' },
  { Icon: Layers,      label: 'Scale to thousands of documents per hour' },
  { Icon: CheckCircle2,label: 'Audit-ready logs of every capture event' },
  { Icon: FileText,    label: 'Support 100+ file formats out of the box' },
]

export default function IntelligentDocumentCapturePage() {
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
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[48px]">
              DigiGate <span className="text-gradient">Intelligent Document Capture</span> Module
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Intelligent Document Capture Module</strong> automates the ingestion of documents from
              any channel — scanners, email, mobile, fax, web, cloud storage and more — and applies AI-powered pre-processing, classification,
              extraction, and routing to deliver structured data directly into your business systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Capture Flow Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <CaptureFlowDiagram />
          </motion.div>
        </div>
      </section>

      {/* Capture Channels Grid */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Capture Channels</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Capture from <span className="text-gradient">Any Source</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Eight input channels covering every way documents enter your organization — physical, digital, and everything in between.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {captureChannels.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={c.anim}
                  transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-lg`}
                >
                  <c.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-base font-bold text-white mb-2">{c.label}</h3>
                <p className="text-xs leading-5 text-slate-400">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Stages */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Processing Pipeline</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Six Stages of <span className="text-gradient">Intelligence</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processingStages.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="relative group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                {/* Stage number */}
                <span className="absolute -top-3 -left-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-black text-white shadow-lg">
                  {i + 1}
                </span>

                <motion.div
                  animate={s.anim}
                  transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg ${s.glow}`}
                >
                  <s.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{s.desc}</p>

                {/* Connector arrow on the right (visible on lg between cards) */}
                {i < processingStages.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-brand-500/20 border border-brand-400/40 items-center justify-center z-10"
                  >
                    <ArrowRight className="h-3 w-3 text-brand-300" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Business Outcomes</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Measurable <span className="text-gradient">Impact</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4 hover:border-amber-400/40 transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 grid place-items-center shadow-lg shadow-brand-500/30"
                >
                  <b.Icon className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-sm font-medium text-slate-300">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Cpu className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Capture everything — intelligently</h2>
            <p className="text-slate-400 mb-8">
              From inbox to outcome — DigiGate's intelligent capture eliminates manual ingestion and accelerates every downstream process.
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
