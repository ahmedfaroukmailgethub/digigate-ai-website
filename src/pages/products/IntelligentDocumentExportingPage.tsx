import { motion } from 'framer-motion'
import {
  Sparkles, FileText, Camera, ClipboardList, Image as ImageIcon,
  Cog, Activity, Cpu, ServerCog, Database, Workflow,
  Table2, CheckSquare, Code, Network, Zap,
  CheckCircle2, ArrowRight, GitMerge, TrendingUp,
  Cloud, FolderTree,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated Export Pipeline Diagram ─── */
function ExportPipelineDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Export Pipeline
      </p>
      <p className="text-center text-xs text-slate-500 mb-6">Sources → Modules → Processing → Destinations</p>

      <svg viewBox="0 0 100 70" className="w-full h-96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="expArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(251,146,60,0.8)" />
          </marker>
          <filter id="expGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Left Column: Sources (documents/cameras) ── */}
        {[
          { y: 5,  Icon: 'doc',    color: '#22d3ee', label: 'Doc' },
          { y: 16, Icon: 'chart',  color: '#a855f7', label: 'Data' },
          { y: 27, Icon: 'camera', color: '#5b8aff', label: 'Image' },
          { y: 38, Icon: 'list',   color: '#34d399', label: 'Form' },
          { y: 49, Icon: 'camera', color: '#f59e0b', label: 'Photo' },
          { y: 60, Icon: 'list',   color: '#ec4899', label: 'List' },
        ].map((src, i) => (
          <g key={i}>
            {/* Source rectangle */}
            <rect x="2" y={src.y} width="8" height="6" rx="0.5"
              fill={`${src.color}26`} stroke={src.color} strokeWidth="0.3" filter="url(#expGlow)" />

            {/* Source icon hint */}
            {src.Icon === 'doc' && (
              <>
                <line x1="3.5" y1={src.y + 2} x2="8.5" y2={src.y + 2} stroke={src.color} strokeWidth="0.3" />
                <line x1="3.5" y1={src.y + 3} x2="7.5" y2={src.y + 3} stroke={src.color} strokeWidth="0.3" />
                <line x1="3.5" y1={src.y + 4} x2="8.5" y2={src.y + 4} stroke={src.color} strokeWidth="0.3" />
              </>
            )}
            {src.Icon === 'chart' && (
              <>
                <rect x="3.5" y={src.y + 3.5} width="1" height="2" fill={src.color} />
                <rect x="5" y={src.y + 2.5} width="1" height="3" fill={src.color} />
                <rect x="6.5" y={src.y + 1.5} width="1" height="4" fill={src.color} />
              </>
            )}
            {src.Icon === 'camera' && (
              <>
                <rect x="3" y={src.y + 1.5} width="6" height="3" rx="0.4" fill="none" stroke={src.color} strokeWidth="0.3" />
                <circle cx="6" cy={src.y + 3} r="0.8" fill="none" stroke={src.color} strokeWidth="0.3" />
                <circle cx="6" cy={src.y + 3} r="0.3" fill={src.color} />
              </>
            )}
            {src.Icon === 'list' && (
              <>
                <line x1="3.5" y1={src.y + 1.8} x2="4" y2={src.y + 1.8} stroke={src.color} strokeWidth="0.4" />
                <line x1="4.5" y1={src.y + 1.8} x2="8" y2={src.y + 1.8} stroke={src.color} strokeWidth="0.3" />
                <line x1="3.5" y1={src.y + 3} x2="4" y2={src.y + 3} stroke={src.color} strokeWidth="0.4" />
                <line x1="4.5" y1={src.y + 3} x2="7" y2={src.y + 3} stroke={src.color} strokeWidth="0.3" />
                <line x1="3.5" y1={src.y + 4.2} x2="4" y2={src.y + 4.2} stroke={src.color} strokeWidth="0.4" />
                <line x1="4.5" y1={src.y + 4.2} x2="8" y2={src.y + 4.2} stroke={src.color} strokeWidth="0.3" />
              </>
            )}

            {/* Arrow to modules column */}
            <line x1="11" y1={src.y + 3} x2="28" y2={src.y + 3}
              stroke="rgba(251,146,60,0.5)" strokeWidth="0.3" strokeDasharray="0.6 0.4"
              markerEnd="url(#expArrow)" />

            {/* Animated packet flowing from source to modules */}
            <circle r="0.6" fill={src.color} filter="url(#expGlow)" opacity="0">
              <animate attributeName="cx" values="11;28" dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${src.y + 3};${src.y + 3}`} dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ── Middle Column: 3 Modules ── */}
        {[
          { y: 8,  label: 'Exporting Module',     color: '#22d3ee', sub: 'Workflow & Replication' },
          { y: 30, label: 'Utility Modules',      color: '#34d399', sub: 'OCR · KV · Tables · CB' },
          { y: 52, label: 'Custom Doc Identifier',color: '#5b8aff', sub: 'Smart Classification' },
        ].map((mod, i) => (
          <g key={i}>
            <rect x="29" y={mod.y} width="22" height="10" rx="1"
              fill={`${mod.color}1a`} stroke={mod.color} strokeWidth="0.4" filter="url(#expGlow)" />
            <text x="40" y={mod.y + 4.5} fill="#fff" fontSize="2.0" fontWeight="700" textAnchor="middle">
              {mod.label}
            </text>
            <text x="40" y={mod.y + 7.5} fill={mod.color} fontSize="1.3" fontWeight="500" textAnchor="middle">
              {mod.sub}
            </text>

            {/* Activity indicator */}
            <circle cx="49" cy={mod.y + 1.5} r="0.6" fill={mod.color}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Arrow to processing column */}
            <line x1="51" y1={mod.y + 5} x2="60" y2={mod.y + 5}
              stroke="rgba(251,146,60,0.6)" strokeWidth="0.4" strokeDasharray="0.6 0.4"
              markerEnd="url(#expArrow)" />

            {/* Animated packet to processing */}
            <circle r="0.6" fill={mod.color} filter="url(#expGlow)" opacity="0">
              <animate attributeName="cx" values="51;60" dur="2.5s" begin={`${i * 0.4 + 0.8}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${mod.y + 5};${mod.y + 5}`} dur="2.5s" begin={`${i * 0.4 + 0.8}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" begin={`${i * 0.4 + 0.8}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ── Processing Column (orange icons) ── */}
        {[
          { y: 11, IconType: 'cog',     color: '#f59e0b' },
          { y: 33, IconType: 'api',     color: '#fb923c' },
          { y: 55, IconType: 'monitor', color: '#ef4444' },
        ].map((proc, i) => (
          <g key={i}>
            <circle cx="64" cy={proc.y + 3.5} r="3" fill={`${proc.color}33`} stroke={proc.color} strokeWidth="0.4" filter="url(#expGlow)">
              <animate attributeName="r" values="2.8;3.2;2.8" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Icon hints inside the processing circles */}
            {proc.IconType === 'cog' && (
              <g transform={`translate(64, ${proc.y + 3.5})`}>
                <circle r="0.7" fill="#fff" />
                <rect x="-0.3" y="-2" width="0.6" height="0.8" fill="#fff" />
                <rect x="-0.3" y="1.2" width="0.6" height="0.8" fill="#fff" />
                <rect x="-2" y="-0.3" width="0.8" height="0.6" fill="#fff" />
                <rect x="1.2" y="-0.3" width="0.8" height="0.6" fill="#fff" />
              </g>
            )}
            {proc.IconType === 'api' && (
              <text x="64" y={proc.y + 4.5} fill="#fff" fontSize="1.8" fontWeight="900" textAnchor="middle">API</text>
            )}
            {proc.IconType === 'monitor' && (
              <g transform={`translate(64, ${proc.y + 3.5})`}>
                <rect x="-1.8" y="-1.2" width="3.6" height="2.4" rx="0.2" fill="none" stroke="#fff" strokeWidth="0.25" />
                <polyline points="-1.4,0.4 -0.5,-0.3 0.5,0.5 1.5,-0.6" fill="none" stroke="#fff" strokeWidth="0.25" />
              </g>
            )}

            {/* Arrow to destinations */}
            <line x1="68" y1={proc.y + 3.5} x2="79" y2={proc.y + 3.5}
              stroke="rgba(251,146,60,0.6)" strokeWidth="0.4" strokeDasharray="0.6 0.4"
              markerEnd="url(#expArrow)" />

            {/* Animated packet */}
            <circle r="0.6" fill={proc.color} filter="url(#expGlow)" opacity="0">
              <animate attributeName="cx" values="68;79" dur="2.5s" begin={`${i * 0.4 + 1.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${proc.y + 3.5};${proc.y + 3.5}`} dur="2.5s" begin={`${i * 0.4 + 1.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" begin={`${i * 0.4 + 1.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Processing label */}
        <text x="64" y="68" fill="#fb923c" fontSize="1.8" fontWeight="900"
          textAnchor="middle" letterSpacing="0.08em">MONITORING & TUNING</text>

        {/* ── Destinations Column (right) ── */}
        {[
          { y: 11, label: 'Interface',     sub: 'Storage backend',    color: '#22d3ee' },
          { y: 33, label: 'Real-time API', sub: 'App integration',     color: '#a855f7' },
          { y: 55, label: 'Batch Storage', sub: 'Async processing',    color: '#34d399' },
        ].map((dest, i) => (
          <g key={i}>
            <rect x="80" y={dest.y} width="18" height="7" rx="0.6"
              fill={`${dest.color}26`} stroke={dest.color} strokeWidth="0.4" filter="url(#expGlow)" />
            <text x="89" y={dest.y + 3} fill="#fff" fontSize="1.8" fontWeight="700" textAnchor="middle">
              {dest.label}
            </text>
            <text x="89" y={dest.y + 5.5} fill={dest.color} fontSize="1.3" fontWeight="500" textAnchor="middle">
              {dest.sub}
            </text>

            {/* Pulsing status dot */}
            <circle cx="97" cy={dest.y + 1} r="0.5" fill={dest.color}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

const exportMethods = [
  { Icon: Code,          label: 'APIs',             desc: 'REST, GraphQL, gRPC integration with any system',  color: 'from-cyan-400 to-blue-500',     anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
  { Icon: FolderTree,    label: 'Active Directory', desc: 'Native AD/LDAP integration & identity mapping',   color: 'from-violet-400 to-purple-500', anim: { rotate: [0, -8, 8, 0] }, dur: 2.4 },
  { Icon: Network,       label: 'Network Storage',  desc: 'SMB, NFS, S3, Azure Blob, and cloud destinations', color: 'from-emerald-400 to-teal-500',  anim: { y: [0, -4, 0] },        dur: 2.2 },
  { Icon: Zap,           label: 'Much More',        desc: 'Webhooks, message queues, custom adapters & more',  color: 'from-amber-400 to-orange-500',  anim: { scale: [1, 1.18, 1] },  dur: 1.9 },
]

const advantages = [
  {
    Icon: Cog,
    title: 'More Control',
    desc: 'Data exporting allows companies to migrate data from outside sources into their own databases — full ownership and governance.',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    anim: { rotate: 360 }, dur: 10,
  },
  {
    Icon: TrendingUp,
    title: 'Increased Agility',
    desc: 'As companies grow, data lives in separate systems. Exporting consolidates information into a centralized system to unify multiple data sets.',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { y: [0, -4, 0] }, dur: 2.2,
  },
  {
    Icon: GitMerge,
    title: 'M&A Consolidation',
    desc: 'After mergers or acquisitions, consolidate disparate databases into a single source of truth.',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { rotate: [0, -8, 8, 0] }, dur: 2.5,
  },
  {
    Icon: Cloud,
    title: 'Legacy → Cloud Migration',
    desc: 'Seamlessly transition from legacy databases to cloud-native storage on-site, cloud, or hybrid.',
    color: 'from-pink-400 to-rose-500',
    glow: 'shadow-pink-500/40',
    anim: { scale: [1, 1.15, 1] }, dur: 2.0,
  },
]

const utilities = [
  { Icon: ImageIcon,  label: 'Image Processing' },
  { Icon: Workflow,   label: 'Key-Value Extraction' },
  { Icon: Table2,     label: 'Tables' },
  { Icon: CheckSquare,label: 'Check-boxes' },
]

const destinations = [
  { Icon: Database,  label: 'Interface',                   sub: 'Storage backend systems',     color: 'from-cyan-400 to-blue-500',     anim: { y: [0, -3, 0] }, dur: 2.2 },
  { Icon: ServerCog, label: 'Real-time Endpoints',         sub: 'For app integration',         color: 'from-violet-400 to-purple-500', anim: { rotate: 360 }, dur: 8 },
  { Icon: Database,  label: 'Asynchronous Batch',          sub: 'Processing and storage',      color: 'from-emerald-400 to-teal-500',  anim: { scale: [1, 1.15, 1] }, dur: 2.0 },
]

export default function IntelligentDocumentExportingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[46px]">
              DigiGate <span className="text-gradient">Intelligent Documents Exporting</span> Module
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Intelligent Document Exporting Module</strong> executes the process of collecting and
              retrieving disparate types of data from a variety of sources — many of which may be poorly organized or completely
              unstructured.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400 text-justify">
              The module consolidates, processes, and refines data so that it can be stored in a centralized location — on-site, cloud-based,
              or hybrid — then finalizes the process by exporting the output data to the system's other modules, repositories, terminals, and
              beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Export Pipeline Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ExportPipelineDiagram />
          </motion.div>
        </div>
      </section>

      {/* Export Methods */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Supported Methods</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              All <span className="text-gradient">Exporting Methods</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Export to any destination using industry-standard protocols and modern integration patterns.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {exportMethods.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={m.anim}
                  transition={{ duration: m.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-lg`}
                >
                  <m.Icon className="h-7 w-7" />
                </motion.div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-400" />
                  <h3 className="font-display text-lg font-bold text-white">{m.label}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-400">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Utility Modules + Destinations */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Utility Modules */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Utility Modules</p>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Data Refinement Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                {utilities.map((u, i) => (
                  <motion.div
                    key={u.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 grid place-items-center shadow-lg"
                    >
                      <u.Icon className="h-5 w-5 text-white" />
                    </motion.div>
                    <span className="text-sm font-bold text-white">{u.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Destinations */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Output Destinations</p>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Where Data Goes</h3>
              <div className="space-y-3">
                {destinations.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-3"
                  >
                    <motion.div
                      animate={d.anim}
                      transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut' }}
                      className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${d.color} grid place-items-center shadow-lg`}
                    >
                      <d.Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-bold text-white">{d.label}</p>
                      <p className="text-xs text-slate-400">{d.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Paragraph + Advantages */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Benefits intro */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-4xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Why Export Matters</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white mb-6">
              Benefits of <span className="text-gradient">DigiGate Exporting</span>
            </h2>
            <p className="text-base leading-8 text-slate-300/90 text-justify">
              Companies and organizations in virtually every industry and sector will need to export data at some point. For some, the need
              arises when it's time to upgrade legacy databases or transition to cloud-native storage. For others, the motive may be the
              desire to consolidate databases after a merger or acquisition. It's also common to streamline internal processes by merging
              data sources from different divisions or departments. <strong className="text-white">Most companies now take advantage of
              data exporting tools to manage the process from end-to-end.</strong>
            </p>
          </motion.div>

          {/* Advantage cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={a.anim}
                  transition={{ duration: a.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-lg ${a.glow}`}
                >
                  <a.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{a.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Flow Indicator */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Export Process</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Collect → Consolidate → <span className="text-gradient">Export</span>
            </h2>
          </motion.div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {['Collect', 'Retrieve', 'Consolidate', 'Process', 'Refine', 'Export'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Cpu className="h-12 w-12 text-amber-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Export anywhere — intelligently</h2>
            <p className="text-slate-400 mb-8">
              Unify disparate data sources, consolidate after mergers, modernize legacy systems — DigiGate exports to every destination
              with full control.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hidden marker for unused imports suppression */}
      <span className="hidden"><FileText /><Camera /><ClipboardList /><Activity /></span>
    </>
  )
}
