import { motion } from 'framer-motion'
import {
  Sparkles, CheckCircle2, ScanLine, Server, Folder, Mail,
  Printer, FileText, Image as ImageIcon, CreditCard, Settings,
  Zap, ShieldCheck, Layers, BarChart3, Gauge, Wand2,
} from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated Capture/Scanning Workflow Diagram ─── */
function CaptureFlowDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <svg viewBox="0 0 100 60" className="w-full h-96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="captArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(34,211,238,0.85)" />
          </marker>
          <filter id="captGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="scannerBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b3f5c" />
            <stop offset="50%" stopColor="#1e2233" />
            <stop offset="100%" stopColor="#0f1220" />
          </linearGradient>
          <linearGradient id="scanLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="50%" stopColor="rgba(34,211,238,1)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        {/* ─── Input Documents Stack (left) ─── */}
        <g transform="translate(8, 30)">
          {/* Image card */}
          <g transform="translate(-2, -4)">
            <rect x="-3.5" y="-2.5" width="7" height="5" rx="0.5"
              fill="rgba(91,138,255,0.2)" stroke="#5b8aff" strokeWidth="0.3"
              filter="url(#captGlow)">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" repeatCount="indefinite" />
            </rect>
            {/* Mountain landscape icon */}
            <polygon points="-2.5,1.5 -1,-0.5 0.5,1 2,-1 3,1.5" fill="#5b8aff" opacity="0.7">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" repeatCount="indefinite" />
            </polygon>
            <circle cx="-1.5" cy="-1.5" r="0.4" fill="#fbbf24">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Document pages */}
          <g transform="translate(0, 0)">
            <rect x="-3" y="-2" width="6" height="5" rx="0.4"
              fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="0.3"
              filter="url(#captGlow)">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <line x1="-2" y1="-0.8" x2="2" y2="-0.8" stroke="#a855f7" strokeWidth="0.2">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#a855f7" strokeWidth="0.2">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="-2" y1="0.8" x2="1.2" y2="0.8" stroke="#a855f7" strokeWidth="0.2">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="-2" y1="1.6" x2="2" y2="1.6" stroke="#a855f7" strokeWidth="0.2">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="0.5s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Credit card */}
          <g transform="translate(2.5, 4.5)">
            <rect x="-3" y="-2" width="6" height="3.6" rx="0.5"
              fill="rgba(245,158,11,0.3)" stroke="#fbbf24" strokeWidth="0.3"
              filter="url(#captGlow)">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="1s" repeatCount="indefinite" />
            </rect>
            <rect x="-2" y="-1.2" width="1.5" height="1" rx="0.1" fill="#fbbf24" opacity="0.7">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="1s" repeatCount="indefinite" />
            </rect>
            <line x1="-2" y1="0.3" x2="2" y2="0.3" stroke="#fbbf24" strokeWidth="0.2">
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 8 0; 0 0" dur="6s" begin="1s" repeatCount="indefinite" />
            </line>
          </g>

          <text x="0" y="11" fill="#5b8aff" fontSize="2" fontWeight="700" textAnchor="middle">
            Documents
          </text>
        </g>

        {/* Arrow 1: Input → Scanner */}
        <line x1="15" y1="30" x2="29" y2="30"
          stroke="#22d3ee" strokeWidth="0.5" markerEnd="url(#captArrow)" />

        {/* ─── Scanner Device (center-left) ─── */}
        <g transform="translate(38, 30)">
          {/* Scanner body — front view */}
          <g>
            {/* Document tray (top angled) */}
            <polygon points="-8,-7 8,-7 6,-4 -6,-4"
              fill="url(#scannerBody)" stroke="#5b8aff" strokeWidth="0.3" />
            {/* Main body */}
            <rect x="-8" y="-4" width="16" height="7" rx="0.5"
              fill="url(#scannerBody)" stroke="#5b8aff" strokeWidth="0.3"
              filter="url(#captGlow)" />
            {/* LCD screen */}
            <rect x="-4" y="-2" width="8" height="3.5" rx="0.3"
              fill="rgba(34,211,238,0.25)" stroke="#22d3ee" strokeWidth="0.2" />
            {/* Screen content - simulated scan progress */}
            <rect x="-3.5" y="-1.5" width="7" height="0.4" rx="0.1" fill="rgba(34,211,238,0.6)" />
            <rect x="-3.5" y="-0.7" width="7" height="0.4" rx="0.1" fill="rgba(34,211,238,0.3)">
              <animate attributeName="width" values="0;7;7;0" keyTimes="0;0.3;0.7;1"
                dur="3s" repeatCount="indefinite" />
            </rect>
            <rect x="-3.5" y="0.1" width="7" height="0.4" rx="0.1" fill="rgba(34,211,238,0.3)">
              <animate attributeName="width" values="0;7;7;0" keyTimes="0;0.5;0.9;1"
                dur="3s" repeatCount="indefinite" />
            </rect>
            {/* Output slot (bottom) */}
            <rect x="-7" y="3" width="14" height="1" rx="0.2"
              fill="#0a0d2a" stroke="#5b8aff" strokeWidth="0.2" />
            {/* LED indicators */}
            <circle cx="6.5" cy="-2.8" r="0.4" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="6.5" cy="-1.5" r="0.4" fill="#fbbf24">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Animated scan line — sweeps across the scanner */}
            <rect x="-4" y="-2" width="0.6" height="3.5" fill="url(#scanLine)" opacity="0.9">
              <animate attributeName="x" values="-4;3.4;-4" dur="2.5s" repeatCount="indefinite" />
            </rect>

            {/* Stand */}
            <rect x="-3" y="3.5" width="6" height="0.5" fill="#5b8aff" opacity="0.6" />
          </g>

          <text x="0" y="6.5" fill="#5b8aff" fontSize="2" fontWeight="700" textAnchor="middle">
            Professional Scanner
          </text>

          {/* Sparkle/scan effect particles */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx="0" cy="-2" r="0.3" fill="#22d3ee" opacity="0">
              <animate attributeName="cy" values="-2;-7" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values="0;" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite"
                to={String((i % 2 === 0 ? -1 : 1) * (1 + i))} />
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Arrow 2: Scanner → Output */}
        <line x1="48" y1="30" x2="60" y2="30"
          stroke="#22d3ee" strokeWidth="0.5" markerEnd="url(#captArrow)" />

        {/* ─── Output Files (TIFF/JPEG/PDF) ─── */}
        <g transform="translate(67, 30)">
          {/* Stacked document files */}
          <g>
            {/* Back doc */}
            <rect x="-2" y="-3.5" width="5" height="6.5" rx="0.4"
              fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="0.25" />
            {/* Middle doc */}
            <rect x="-3" y="-3" width="5" height="6.5" rx="0.4"
              fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth="0.25" />
            {/* Front doc */}
            <rect x="-4" y="-2.5" width="5" height="6.5" rx="0.4"
              fill="rgba(91,138,255,0.25)" stroke="#5b8aff" strokeWidth="0.3"
              filter="url(#captGlow)" />
            {/* Front doc lines */}
            <line x1="-3.4" y1="-1.5" x2="0.4" y2="-1.5" stroke="#5b8aff" strokeWidth="0.2" />
            <line x1="-3.4" y1="-0.5" x2="0.4" y2="-0.5" stroke="#5b8aff" strokeWidth="0.2" />
            <line x1="-3.4" y1="0.5" x2="-0.5" y2="0.5" stroke="#5b8aff" strokeWidth="0.2" />
            <line x1="-3.4" y1="1.5" x2="0.4" y2="1.5" stroke="#5b8aff" strokeWidth="0.2" />
            <line x1="-3.4" y1="2.5" x2="-1" y2="2.5" stroke="#5b8aff" strokeWidth="0.2" />

            {/* Format badge */}
            <rect x="-3.5" y="-3.7" width="3.5" height="0.9" rx="0.2" fill="#fbbf24">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="-1.75" y="-3" fill="#000" fontSize="0.8" fontWeight="900" textAnchor="middle">PDF</text>
          </g>

          <text x="-1" y="6" fill="#22d3ee" fontSize="1.8" fontWeight="700" textAnchor="middle">
            Scanned Data
          </text>
          <text x="-1" y="8" fill="#94a3b8" fontSize="1.4" fontWeight="500" textAnchor="middle">
            TIFF / JPEG / PDF
          </text>
        </g>

        {/* ─── Distribution Arrows to 4 destinations (right) ─── */}
        {[
          { ey: 8,  label: 'FTP Server',  Icon: 'server' },
          { ey: 22, label: 'SMB Folder',  Icon: 'folder' },
          { ey: 38, label: 'Email',       Icon: 'mail' },
          { ey: 52, label: 'Fax',         Icon: 'printer' },
        ].map((dest, i) => {
          const sy = 30, ex = 87
          return (
            <g key={i}>
              {/* Connecting line with arrow */}
              <path d={`M 73 ${sy} L 80 ${sy} L 80 ${dest.ey} L ${ex} ${dest.ey}`}
                fill="none" stroke="#22d3ee" strokeWidth="0.4" strokeDasharray="0.7 0.5"
                markerEnd="url(#captArrow)" opacity="0.6" />

              {/* Flowing packet along the L-shaped path */}
              <circle r="0.5" fill="#22d3ee" filter="url(#captGlow)" opacity="0">
                <animate attributeName="cx" values="73;80;80;87" keyTimes="0;0.3;0.6;1"
                  dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values={`${sy};${sy};${dest.ey};${dest.ey}`}
                  keyTimes="0;0.3;0.6;1" dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                  dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              </circle>

              {/* Destination icon */}
              <g transform={`translate(${ex + 4}, ${dest.ey})`}>
                {dest.Icon === 'server' && (
                  <g>
                    <rect x="-2.5" y="-2.5" width="5" height="2" rx="0.3"
                      fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.25" filter="url(#captGlow)" />
                    <rect x="-2.5" y="0" width="5" height="2" rx="0.3"
                      fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.25" />
                    <circle cx="-1.8" cy="-1.5" r="0.3" fill="#34d399">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="-1.8" cy="1" r="0.3" fill="#fbbf24">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
                {dest.Icon === 'folder' && (
                  <g>
                    <path d="M -3 -1.5 L -1.5 -1.5 L -0.8 -2.2 L 3 -2.2 L 3 1.8 L -3 1.8 Z"
                      fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.25" filter="url(#captGlow)" />
                  </g>
                )}
                {dest.Icon === 'mail' && (
                  <g>
                    <rect x="-3" y="-1.8" width="6" height="3.6" rx="0.3"
                      fill="rgba(52,211,153,0.3)" stroke="#34d399" strokeWidth="0.25" filter="url(#captGlow)" />
                    <path d="M -3 -1.8 L 0 0.6 L 3 -1.8" fill="none" stroke="#34d399" strokeWidth="0.25" />
                  </g>
                )}
                {dest.Icon === 'printer' && (
                  <g>
                    <rect x="-2.5" y="-2" width="5" height="2.5" rx="0.4"
                      fill="rgba(245,158,11,0.3)" stroke="#fbbf24" strokeWidth="0.25" filter="url(#captGlow)" />
                    <rect x="-1.5" y="-3" width="3" height="1.2" rx="0.2"
                      fill="rgba(245,158,11,0.4)" stroke="#fbbf24" strokeWidth="0.2" />
                    <rect x="-1.5" y="0.5" width="3" height="1.5" rx="0.2"
                      fill="rgba(255,255,255,0.4)" stroke="#fbbf24" strokeWidth="0.2" />
                    <circle cx="1.7" cy="-1" r="0.25" fill="#34d399">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
                <text x="0" y="4.5" fill="#94a3b8" fontSize="1.5" fontWeight="600" textAnchor="middle">
                  {dest.label}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const benefits = [
  {
    Icon: ShieldCheck,
    title: 'Ensure Compatibility',
    desc: 'The industry-standard ISIS scanner drivers are available for hundreds of business scanners.',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { scale: [1, 1.15, 1] },
    dur: 2.2,
  },
  {
    Icon: Gauge,
    title: 'Maximize Performance',
    desc: 'Unlike other scanner drivers, ISIS drivers enable you to completely control all scanner settings, ensuring the best scanning speed and quality.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    anim: { rotate: [0, -12, 12, 0] },
    dur: 2.6,
  },
  {
    Icon: Wand2,
    title: 'Improve Quality & Capture Accuracy',
    desc: 'Image processing tools enable you to clean up scanned images to ensure maximum readability and maximum accuracy for extracted information.',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { y: [0, -4, 0] },
    dur: 2.0,
  },
]

const features = [
  { Icon: ScanLine,    label: 'Full scanner feature support, driving scanners at rated speed' },
  { Icon: Settings,    label: 'Custom applications to control scanner settings' },
  { Icon: Layers,      label: 'Ease of integration with software applications' },
  { Icon: Zap,         label: 'Core capture capabilities — reduce coding & QA efforts' },
  { Icon: BarChart3,   label: 'Detailed dashboard monitoring of the entire process' },
  { Icon: ImageIcon,   label: 'Image enhancement to improve scanned image quality' },
]

export default function StandardCaptureToolPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[56px]">
              DigiGate <span className="text-gradient">Standard Capture</span> Tool
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Standard Capture Tool</strong> helps organizations digitalize a huge amount of physical
              documents easily — providing full features starting with a scanning module that supports professional scanners, image
              enhancement to improve scanned image quality, all monitored through a detailed dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capture Flow Diagram + Features */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Animated Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <CaptureFlowDiagram />
            </motion.div>

            {/* Features list */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-5 order-1 lg:order-2"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Core Features</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  Complete <span className="text-gradient">Capture Capabilities</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <ul className="space-y-3">
                {features.map((f, i) => (
                  <motion.li
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
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-4">Cost Savings</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl mb-6">
              Reduce <span className="text-gradient">Coding & QA Efforts</span>
            </h2>
            <p className="text-base leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Standard Capture Tool</strong> includes core capture capabilities that reduce coding
              and QA efforts, driving significant cost savings. Customers can quickly implement the most important document scanning and
              imaging capabilities directly into business applications — accelerating time-to-value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">DigiGate© Standard Capture Tool Benefits</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Built for <span className="text-gradient">Performance</span>
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

      {/* Output Formats Highlight */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Output & Distribution</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Multiple <span className="text-gradient">Formats & Destinations</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: FileText,    label: 'TIFF / JPEG / PDF', sub: 'Password PDF · PDF/A', color: 'from-cyan-400 to-blue-500' },
              { Icon: Server,      label: 'FTP Server',       sub: 'Remote upload',         color: 'from-brand-400 to-indigo-500' },
              { Icon: Folder,      label: 'SMB Folder',       sub: 'Network share',         color: 'from-violet-400 to-purple-500' },
              { Icon: Mail,        label: 'Email',            sub: 'Direct delivery',       color: 'from-emerald-400 to-teal-500' },
            ].map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5 text-center hover:border-amber-400/30 transition-colors"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${d.color} text-white shadow-lg`}
                >
                  <d.Icon className="h-6 w-6" />
                </motion.div>
                <p className="text-sm font-semibold text-white">{d.label}</p>
                <p className="text-xs text-slate-500 mt-1">{d.sub}</p>
              </motion.div>
            ))}
            <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5 text-center sm:col-span-2 lg:col-span-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg">
                  <CreditCard className="h-5 w-5" />
                </motion.div>
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.6, repeat: Infinity }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg">
                  <Printer className="h-5 w-5" />
                </motion.div>
                <span className="text-sm text-slate-300">
                  Supports cards, ID documents, multipage forms, faxes & more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <ScanLine className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Digitize every document — fast</h2>
            <p className="text-slate-400 mb-8">
              Industry-standard scanner support, intelligent image enhancement, and instant distribution to any system.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hidden marker to satisfy unused import */}
      <span className="hidden"><CheckCircle2 /></span>
    </>
  )
}
