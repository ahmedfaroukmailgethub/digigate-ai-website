import { motion } from 'framer-motion'
import {
  Sparkles, Cpu, FileText, ScanLine, Fingerprint,
  BookOpen, Barcode, FileImage, PenTool, CheckCircle2,
  Bot, Layers, Brain, Type, FileSearch, Workflow,
} from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated AI Document Recognition Diagram ─── */
function DocumentRecognitionDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Document Understanding Engine
      </p>
      <p className="text-center text-xs text-slate-500 mb-8">AI-powered recognition pipeline</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 items-center">

        {/* Left: AI chips + scanning document */}
        <div className="flex flex-col items-center gap-4">
          {/* Top AI chip */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <AIChip />
          </motion.div>

          {/* Connection dots downward */}
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-brand-400"
              />
            ))}
          </div>

          {/* Document being scanned */}
          <div className="relative">
            <ScannerDocument />
          </div>

          {/* Connection dots downward */}
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: (i + 3) * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-brand-400"
              />
            ))}
          </div>

          {/* Bottom AI chip */}
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <AIChip />
          </motion.div>
        </div>

        {/* Right: 4 recognition modes */}
        <div className="space-y-4">
          {[
            {
              Icon: BookOpen, badge: 'OCR', title: 'Optical Character Recognition',
              desc: 'Supports Latin and Arabic alphabets',
              color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/40',
              anim: { scale: [1, 1.15, 1] }, dur: 2.0,
            },
            {
              Icon: Barcode, badge: 'Barcode', title: 'Barcode Recognition',
              desc: 'Supports barcode detection and reading',
              color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40',
              anim: { x: [0, 3, 0] }, dur: 2.2,
            },
            {
              Icon: Fingerprint, badge: 'OMR', title: 'Optical Mark Recognition',
              desc: 'Supports Optical Mark Recognition for checkboxes & forms',
              color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40',
              anim: { rotate: [0, -8, 8, 0] }, dur: 2.6,
            },
            {
              Icon: PenTool, badge: 'IMR', title: 'Intelligent Character Recognition',
              desc: 'Supports Intelligent Character Recognition for handwritten characters',
              color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/40',
              anim: { rotate: 360 }, dur: 8,
            },
          ].map((mode, i) => (
            <motion.div
              key={mode.badge}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
            >
              {/* Animated dashed line connecting to scanner (visual flair) */}
              <motion.div
                animate={mode.anim}
                transition={{ duration: mode.dur, repeat: Infinity, ease: 'easeInOut' }}
                className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} grid place-items-center shadow-lg ${mode.glow}`}
              >
                <mode.Icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-gradient-to-r ${mode.color} text-white shadow-md`}>
                    {mode.badge}
                  </span>
                  <h4 className="font-display text-sm font-bold text-white">{mode.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-5">{mode.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* AI chip element */
function AIChip() {
  return (
    <svg viewBox="0 0 60 40" className="w-24 h-16">
      <defs>
        <linearGradient id="chipBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3563ff" />
          <stop offset="100%" stopColor="#1e2a6e" />
        </linearGradient>
      </defs>
      {/* Pins top */}
      {[10, 18, 26, 34, 42, 50].map((x) => (
        <rect key={`pt-${x}`} x={x - 1} y="0" width="2" height="6" fill="#5b8aff" />
      ))}
      {/* Pins bottom */}
      {[10, 18, 26, 34, 42, 50].map((x) => (
        <rect key={`pb-${x}`} x={x - 1} y="34" width="2" height="6" fill="#5b8aff" />
      ))}
      {/* Pins left */}
      {[12, 20, 28].map((y) => (
        <rect key={`pl-${y}`} x="0" y={y - 1} width="6" height="2" fill="#5b8aff" />
      ))}
      {/* Pins right */}
      {[12, 20, 28].map((y) => (
        <rect key={`pr-${y}`} x="54" y={y - 1} width="6" height="2" fill="#5b8aff" />
      ))}
      {/* Body */}
      <rect x="6" y="6" width="48" height="28" rx="2" fill="url(#chipBody)" stroke="#5b8aff" strokeWidth="1" />
      {/* AI text */}
      <text x="30" y="25" fill="#fff" fontSize="11" fontWeight="900" textAnchor="middle">AI</text>
      {/* Activity pulse */}
      <circle cx="50" cy="10" r="1.5" fill="#34d399">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* Scanner element with document & robotic arm */
function ScannerDocument() {
  return (
    <svg viewBox="0 0 100 70" className="w-40 h-28">
      <defs>
        <linearGradient id="docBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3563ff" />
          <stop offset="100%" stopColor="#1e2a6e" />
        </linearGradient>
        <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34,211,238,0)" />
          <stop offset="50%" stopColor="rgba(34,211,238,1)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </linearGradient>
      </defs>

      {/* Robotic arm (scanner) */}
      <g>
        <rect x="10" y="20" width="6" height="12" rx="1" fill="#1e2a6e" stroke="#3563ff" strokeWidth="0.6" />
        <rect x="13" y="32" width="14" height="3" rx="0.5" fill="#3563ff">
          <animate attributeName="x" values="13;15;13" dur="3s" repeatCount="indefinite" />
        </rect>
        <circle cx="13" cy="26" r="2" fill="#5b8aff" stroke="#fff" strokeWidth="0.4" />
      </g>

      {/* Document */}
      <g transform="translate(36, 10)">
        <rect x="0" y="0" width="32" height="42" rx="1.5" fill="url(#docBody)" stroke="#5b8aff" strokeWidth="0.8" />
        {/* Lines on document */}
        <line x1="3" y1="6" x2="29" y2="6" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="11" x2="25" y2="11" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="16" x2="28" y2="16" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="21" x2="22" y2="21" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="26" x2="29" y2="26" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="31" x2="25" y2="31" stroke="#fff" strokeWidth="0.6" />
        <line x1="3" y1="36" x2="20" y2="36" stroke="#fff" strokeWidth="0.6" />

        {/* Scanning beam — sweeps from top to bottom */}
        <rect x="0" y="0" width="32" height="2" fill="url(#scanBeam)" opacity="0.9">
          <animate attributeName="y" values="0;40;0" dur="3s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Output stack on right (parsed data) */}
      <g transform="translate(72, 14)">
        <rect x="0" y="0" width="14" height="18" rx="0.8" fill="#1e2a6e" stroke="#5b8aff" strokeWidth="0.5" opacity="0.85" />
        <line x1="2" y1="4" x2="12" y2="4" stroke="#22d3ee" strokeWidth="0.4" />
        <line x1="2" y1="7" x2="10" y2="7" stroke="#22d3ee" strokeWidth="0.4" />
        <line x1="2" y1="10" x2="12" y2="10" stroke="#22d3ee" strokeWidth="0.4" />
        <line x1="2" y1="13" x2="9" y2="13" stroke="#22d3ee" strokeWidth="0.4" />

        {/* Activity dot */}
        <circle cx="12" cy="2" r="1" fill="#34d399">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Data flowing from document to output */}
      <circle r="0.8" fill="#22d3ee" filter="url(#irmGlow)">
        <animate attributeName="cx" values="68;72" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="25;25" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="0.8" fill="#34d399">
        <animate attributeName="cx" values="68;72" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="30;30" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

const documentTypes = [
  { Icon: FileText,   label: 'Fixed Forms' },
  { Icon: FileImage,  label: 'Unstructured Documents' },
  { Icon: PenTool,    label: 'Handwriting' },
  { Icon: CheckCircle2, label: 'Checkboxes' },
  { Icon: PenTool,    label: 'Signatures' },
  { Icon: Layers,     label: 'Rotated / Skewed' },
  { Icon: ScanLine,   label: 'Low-Resolution Scans' },
  { Icon: FileImage,  label: 'Images & PDFs' },
]

const engineCapabilities = [
  {
    Icon: Brain,
    title: 'Document Understanding Framework',
    desc: 'Process different document types and structures using Artificial Intelligence.',
    color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/40',
    anim: { scale: [1, 1.15, 1] }, dur: 2.0,
  },
  {
    Icon: FileSearch,
    title: 'Smart Classifier & Extractor Selection',
    desc: 'Learn how to pick the right classifiers and extractors for your use case.',
    color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40',
    anim: { y: [0, -3, 0] }, dur: 2.2,
  },
  {
    Icon: Workflow,
    title: 'End-to-End Document Workflow',
    desc: 'Practice building a complete Document Understanding workflow from input to action.',
    color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40',
    anim: { rotate: 360 }, dur: 10,
  },
]

export default function IntelligentDocumentsRecognitionPage() {
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
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[46px]">
              DigiGate <span className="text-gradient">Intelligent Documents Recognition</span> Module
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              Wouldn't it be great if software robots could understand documents — to extract, interpret, and process data for you, even
              from PDFs, images, handwriting, and scans? <strong className="text-white">DigiGate© Intelligent Documents Recognition Engine
              </strong> helps your robots do just that. Delegate more of your digital paperwork with a boost from our engine powered by
              <strong className="text-white"> Artificial Intelligence [AI]</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Types we handle */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Any Layout, Any Format</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
              Handles <span className="text-gradient">Every Document Type</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300/90 text-justify">
              Your documents come in many layouts and formats. Whether they're fixed forms or unstructured; whether they contain handwriting,
              checkboxes or signatures; whether they're rotated, skewed, or low-resolution — <strong className="text-white">DigiGate©
              Intelligent Documents Recognition Engine</strong> can handle them.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {documentTypes.map((doc, i) => (
              <motion.div
                key={doc.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-3 hover:border-amber-400/40 transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 grid place-items-center shadow-lg"
                >
                  <doc.Icon className="h-4 w-4 text-white" />
                </motion.div>
                <span className="text-xs font-semibold text-slate-300">{doc.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Animated Recognition Diagram */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <DocumentRecognitionDiagram />
          </motion.div>
        </div>
      </section>

      {/* Automate more processes section */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">From Start to Finish</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  <span className="text-gradient">Automate</span> More Processes
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                Before Document Understanding, automated workflows required humans to step in and process documents manually. Now you can
                <strong className="text-white"> teach robots to handle an entire process</strong> — humans only need to check in to validate
                data or handle exceptions.
              </p>

              <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                <Bot className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm leading-6 text-slate-300">
                  <strong className="text-white">Humans for exceptions, robots for the rest.</strong> AI handles 95% of document processing
                  automatically — your team only steps in when needed.
                </p>
              </div>
            </motion.div>

            {/* Capabilities cards */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-2">The Engine Is</p>
              <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-4" />

              {engineCapabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4 hover:border-amber-400/40 transition-colors"
                >
                  <motion.div
                    animate={cap.anim}
                    transition={{ duration: cap.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.color} grid place-items-center shadow-lg ${cap.glow}`}
                  >
                    <cap.Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">{cap.title}</h4>
                    <p className="text-xs text-slate-400 leading-5">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Cpu className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Teach your robots to understand</h2>
            <p className="text-slate-400 mb-8">
              From OCR to handwriting recognition — DigiGate's AI engine transforms every document into actionable data.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hidden marker to suppress unused import warnings */}
      <span className="hidden"><Type /></span>
    </>
  )
}
