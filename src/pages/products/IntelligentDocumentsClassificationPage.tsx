import { motion } from 'framer-motion'
import {
  Sparkles, CheckCircle2, FileSearch, Layers, BrainCircuit,
  Workflow, Database, Cloud, Server, Cpu, FileText, Image as ImageIcon,
  GitBranch, ScanLine, Wrench, BarChart3, Settings, Network,
  Tag, Globe, Filter, Boxes,
} from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Animated Classification Architecture Diagram ─── */
function ClassificationArchDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-300 mb-2">
        Classification Architecture
      </p>
      <p className="text-center text-xs text-slate-500 mb-6">Data Preparation · Deployment & Usage · Cloud Training</p>

      <svg viewBox="0 0 100 100" className="w-full h-[520px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="clsArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(91,138,255,0.85)" />
          </marker>
          <filter id="clsGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ━━━ TOP: Data Preparation (yellow theme — kept dark for site) ━━━ */}
        <g>
          <rect x="2" y="2" width="96" height="28" rx="2"
            fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.5)" strokeWidth="0.4" />
          <text x="50" y="6.5" fill="#fbbf24" fontSize="2.4" fontWeight="900"
            textAnchor="middle" letterSpacing="0.08em">DATA PREPARATION</text>
          <text x="50" y="9.2" fill="#fbbf24" fontSize="1.3" fontWeight="500"
            textAnchor="middle" opacity="0.7">(Local / Onsite)</text>

          {/* Stages along the data prep pipeline */}
          {[
            { x: 6,  label: 'Input', subLabel: 'Documents', IconKind: 'imgs' },
            { x: 22, label: 'Segregation', subLabel: 'Module',  IconKind: 'split' },
            { x: 38, label: 'Train + Test', subLabel: 'Sets',    IconKind: 'split' },
            { x: 52, label: 'OCR',          subLabel: 'Module',  IconKind: 'ocr' },
            { x: 66, label: 'Pre-processing', subLabel: 'Module', IconKind: 'pp' },
            { x: 80, label: 'Vectorization', subLabel: 'Module', IconKind: 'vec' },
            { x: 94, label: 'To Cloud',     subLabel: 'Train + Test', IconKind: 'cloud' },
          ].map((stage, i, arr) => (
            <g key={`prep-${i}`}>
              {/* Stage box */}
              <rect x={stage.x - 4} y={16} width="8" height="9" rx="0.7"
                fill="rgba(245,158,11,0.15)" stroke="#fbbf24" strokeWidth="0.3" filter="url(#clsGlow)" />

              {/* Icon hints */}
              <g transform={`translate(${stage.x}, 19.5)`}>
                {stage.IconKind === 'imgs' && (
                  <>
                    <rect x="-2.2" y="-1" width="3" height="2.5" rx="0.2" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                    <rect x="-1.4" y="-1.8" width="3" height="2.5" rx="0.2" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                    <rect x="-0.6" y="-0.4" width="3" height="2.5" rx="0.2" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="0.3" />
                  </>
                )}
                {stage.IconKind === 'split' && (
                  <>
                    <rect x="-1.5" y="-1" width="3" height="2.4" rx="0.2" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="0.3" />
                    <line x1="-1" y1="-0.4" x2="1" y2="-0.4" stroke="#fbbf24" strokeWidth="0.25" />
                    <line x1="-1" y1="0.3" x2="1" y2="0.3" stroke="#fbbf24" strokeWidth="0.25" />
                  </>
                )}
                {stage.IconKind === 'ocr' && (
                  <>
                    <rect x="-1.8" y="-1" width="3.6" height="2.4" rx="0.3" fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.3" />
                    <text x="0" y="0.4" fill="#fff" fontSize="1.4" fontWeight="900" textAnchor="middle">A1c</text>
                  </>
                )}
                {stage.IconKind === 'pp' && (
                  <>
                    <rect x="-1.8" y="-1" width="3.6" height="2.4" rx="0.3" fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.3" />
                    <text x="0" y="0.4" fill="#fff" fontSize="1.4" fontWeight="900" textAnchor="middle">abc</text>
                  </>
                )}
                {stage.IconKind === 'vec' && (
                  <>
                    <rect x="-1.8" y="-1" width="3.6" height="2.4" rx="0.3" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.3" />
                    <text x="0" y="0.4" fill="#fff" fontSize="1" fontWeight="900" textAnchor="middle">[1 0]</text>
                  </>
                )}
                {stage.IconKind === 'cloud' && (
                  <>
                    <ellipse cx="0" cy="0" rx="1.8" ry="0.8" fill="rgba(34,211,238,0.3)" stroke="#22d3ee" strokeWidth="0.3" />
                    <ellipse cx="-0.8" cy="-0.3" rx="0.7" ry="0.5" fill="rgba(34,211,238,0.3)" stroke="#22d3ee" strokeWidth="0.3" />
                  </>
                )}
              </g>

              {/* Label */}
              <text x={stage.x} y={26.5} fill="#fff" fontSize="1.1" fontWeight="700" textAnchor="middle">{stage.label}</text>
              <text x={stage.x} y={28.3} fill="#94a3b8" fontSize="0.9" textAnchor="middle">{stage.subLabel}</text>

              {/* Arrow to next stage */}
              {i < arr.length - 1 && (
                <>
                  <line x1={stage.x + 4} y1="20.5" x2={arr[i + 1].x - 4} y2="20.5"
                    stroke="rgba(251,191,36,0.6)" strokeWidth="0.3" markerEnd="url(#clsArrow)" />

                  {/* Animated packet */}
                  <circle r="0.6" fill="#fbbf24" filter="url(#clsGlow)" opacity="0">
                    <animate attributeName="cx" values={`${stage.x + 4};${arr[i + 1].x - 4}`}
                      dur="6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values="20.5;20.5" dur="6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                      dur="6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </g>
          ))}
        </g>

        {/* Connection arrow Data Prep → Training */}
        <path d="M 92 30 L 92 56 L 75 56"
          fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="0.4"
          strokeDasharray="1 0.5" markerEnd="url(#clsArrow)" />
        <circle r="0.6" fill="#a855f7" filter="url(#clsGlow)" opacity="0">
          <animate attributeName="cx" values="92;92;75" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30;56;56" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ━━━ MIDDLE-LEFT: Deployment and Usage (light blue → brand) ━━━ */}
        <g>
          <rect x="2" y="36" width="56" height="60" rx="2"
            fill="rgba(91,138,255,0.08)" stroke="rgba(91,138,255,0.5)" strokeWidth="0.4" />
          <text x="30" y="40.5" fill="#5b8aff" fontSize="2.4" fontWeight="900"
            textAnchor="middle" letterSpacing="0.08em">DEPLOYMENT &amp; USAGE</text>
          <text x="30" y="43.2" fill="#5b8aff" fontSize="1.3" fontWeight="500"
            textAnchor="middle" opacity="0.7">(Local / Onsite)</text>

          {/* OmniScan Client (left) */}
          <g transform="translate(11, 65)">
            <rect x="-7" y="-7" width="14" height="14" rx="1"
              fill="rgba(91,138,255,0.15)" stroke="#5b8aff" strokeWidth="0.3" filter="url(#clsGlow)" />
            {/* Computer icon */}
            <rect x="-4" y="-4.5" width="8" height="5" rx="0.4" fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.25" />
            <rect x="-3.3" y="-4" width="6.6" height="3.8" fill="rgba(255,255,255,0.3)" />
            <rect x="-0.5" y="0.5" width="1" height="1.2" fill="#5b8aff" />
            <rect x="-2" y="1.7" width="4" height="0.5" rx="0.2" fill="#5b8aff" />
            <text x="0" y="5" fill="#fff" fontSize="1" fontWeight="700" textAnchor="middle">OmniScan Client</text>
            <text x="0" y="6.5" fill="#94a3b8" fontSize="0.85" textAnchor="middle">/ 3rd Party</text>
          </g>

          {/* Module stack (right side of deployment box) */}
          {[
            { y: 49, label: 'Web Service',           color: '#5b8aff' },
            { y: 57, label: 'Configuration Module',  color: '#22d3ee' },
            { y: 65, label: 'Classification Model',  color: '#a855f7' },
            { y: 73, label: 'Verification & Conformance', color: '#34d399' },
          ].map((mod, i) => (
            <g key={`mod-${i}`}>
              <rect x="25" y={mod.y} width="30" height="6" rx="0.6"
                fill={`${mod.color}1f`} stroke={mod.color} strokeWidth="0.3" filter="url(#clsGlow)" />
              <text x="40" y={mod.y + 3.7} fill="#fff" fontSize="1.4" fontWeight="700" textAnchor="middle">{mod.label}</text>
              {/* Activity dot */}
              <circle cx="53" cy={mod.y + 1} r="0.45" fill={mod.color}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Connections from client to modules */}
          <line x1="18" y1="62" x2="25" y2="52"
            stroke="rgba(91,138,255,0.5)" strokeWidth="0.3" strokeDasharray="0.5 0.4"
            markerEnd="url(#clsArrow)" />
          <text x="22" y="58" fill="#5b8aff" fontSize="1" fontWeight="600" textAnchor="middle">Classification</text>
          <text x="22" y="59.5" fill="#5b8aff" fontSize="1" fontWeight="600" textAnchor="middle">Response</text>

          <line x1="18" y1="68" x2="25" y2="76"
            stroke="rgba(168,85,247,0.5)" strokeWidth="0.3" strokeDasharray="0.5 0.4"
            markerEnd="url(#clsArrow)" />
          <text x="22" y="72" fill="#a855f7" fontSize="1" fontWeight="600" textAnchor="middle">Document</text>
          <text x="22" y="73.5" fill="#a855f7" fontSize="1" fontWeight="600" textAnchor="middle">Image Text</text>

          {/* Animated data packet client ↔ modules */}
          <circle r="0.5" fill="#22d3ee" opacity="0">
            <animate attributeName="cx" values="18;25" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="62;52" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle r="0.5" fill="#a855f7" opacity="0">
            <animate attributeName="cx" values="18;25" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="68;76" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
          </circle>

          {/* Bottom label */}
          <text x="30" y="92" fill="#94a3b8" fontSize="1.1" fontWeight="700" textAnchor="middle">
            Cloud / Local Web Server
          </text>
        </g>

        {/* ━━━ MIDDLE-RIGHT: Training (Cloud / Offsite — orange theme) ━━━ */}
        <g>
          <rect x="62" y="36" width="36" height="60" rx="2"
            fill="rgba(251,146,60,0.08)" stroke="rgba(251,146,60,0.55)" strokeWidth="0.4" />
          <text x="80" y="40.5" fill="#fb923c" fontSize="2.4" fontWeight="900"
            textAnchor="middle" letterSpacing="0.08em">TRAINING</text>
          <text x="80" y="43.2" fill="#fb923c" fontSize="1.3" fontWeight="500"
            textAnchor="middle" opacity="0.7">(Cloud / Offsite)</text>

          {/* Model Building */}
          <g>
            <rect x="68" y="49" width="24" height="14" rx="0.8"
              fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth="0.3" filter="url(#clsGlow)" />
            <text x="80" y="52.5" fill="#fff" fontSize="1.5" fontWeight="700" textAnchor="middle">Model Building</text>

            {/* Training scatter plot mini chart */}
            <g transform="translate(80, 58)">
              {[
                { x: -7, y: 1, c: '#5b8aff' }, { x: -5, y: 0, c: '#5b8aff' },
                { x: -3, y: -1, c: '#5b8aff' }, { x: -1, y: -2, c: '#5b8aff' },
                { x: 1, y: -1.5, c: '#ef4444' }, { x: 3, y: -2.5, c: '#ef4444' },
                { x: 5, y: -3, c: '#ef4444' }, { x: 7, y: -3.5, c: '#ef4444' },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="0.5" fill={p.c}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {/* Decision boundary line */}
              <line x1="-8" y1="2" x2="8" y2="-4" stroke="#fbbf24" strokeWidth="0.2" strokeDasharray="0.6 0.3" />
            </g>
          </g>

          {/* Training Module (SVM) */}
          <g>
            <rect x="68" y="68" width="24" height="6" rx="0.8"
              fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth="0.3" filter="url(#clsGlow)" />
            <text x="80" y="71.8" fill="#fff" fontSize="1.4" fontWeight="700" textAnchor="middle">
              Training Module (SVM)
            </text>
            {/* Pulsing activity */}
            <circle cx="89" cy="69" r="0.5" fill="#fb923c">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Model Evaluation */}
          <g>
            <rect x="68" y="80" width="24" height="6" rx="0.8"
              fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth="0.3" filter="url(#clsGlow)" />
            <text x="80" y="83.8" fill="#fff" fontSize="1.4" fontWeight="700" textAnchor="middle">
              Model Evaluation
            </text>
            <circle cx="89" cy="81" r="0.5" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Vertical flow line within training */}
          <line x1="80" y1="63" x2="80" y2="68"
            stroke="rgba(251,146,60,0.5)" strokeWidth="0.3" markerEnd="url(#clsArrow)" />
          <line x1="80" y1="74" x2="80" y2="80"
            stroke="rgba(251,146,60,0.5)" strokeWidth="0.3" markerEnd="url(#clsArrow)" />
        </g>

        {/* Connection: Training → Classification Model (feedback loop) */}
        <path d="M 68 65 L 60 65"
          fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="0.4"
          markerEnd="url(#clsArrow)" />
        <circle r="0.6" fill="#a855f7" opacity="0">
          <animate attributeName="cx" values="68;60" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="65;65" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

const featureCategories = [
  {
    Icon: FileSearch,
    title: 'Document Identification & Organization',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    anim: { scale: [1, 1.15, 1] }, dur: 2.0,
    bullets: [
      'Identification of document type and processing of high volume of structured, semi-structured, and unstructured documents.',
      'Automated organization, sequencing, and classification of documents — to eliminate labor-intensive, manual processes.',
    ],
  },
  {
    Icon: Layers,
    title: 'Layout, Object & Content-based Classification',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/40',
    anim: { rotate: [0, -8, 8, 0] }, dur: 2.4,
    bullets: [
      'Layout- and object-based classification to classify structured documents based on visual patterns, logos, symbols, and more.',
      'Content-based classification to classify semi-structured and unstructured documents by inspecting important keywords and identifying relationships.',
    ],
  },
  {
    Icon: BrainCircuit,
    title: 'Machine Learning-based Classification',
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    anim: { rotate: 360 }, dur: 8,
    bullets: [
      'Trainable, machine learning technology for continuous improvement of classification accuracy.',
      'Dedicated model training tool — easily create, train, and deploy new classification models.',
    ],
  },
  {
    Icon: Workflow,
    title: 'Streamlined Service Request Processing',
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/40',
    anim: { y: [0, -4, 0] }, dur: 2.2,
    bullets: [
      'Classification and grouping of customers\' documents for faster processing of service requests.',
      'Easy integration with core business applications, content management platforms, and document capture applications.',
    ],
  },
]

const capabilities = [
  { Icon: Tag,       title: 'Layout Classification',  desc: 'Visual patterns, logos & symbols' },
  { Icon: Globe,     title: 'Content Classification', desc: 'Keywords & semantic relationships' },
  { Icon: Boxes,     title: 'Object Classification',  desc: 'Embedded elements & structures' },
  { Icon: Filter,    title: 'Auto-Triage',            desc: 'Routing to the right workflow' },
]

export default function IntelligentDocumentsClassificationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-3xl" />
        <BinaryFloat />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[44px]">
              DigiGate <span className="text-gradient">Intelligent Documents Classification</span> Engine
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Intelligent Documents Classification Engine</strong> reads documents and classifies
              them to their respective type based on content — per customer requirements — even from PDFs, images, or any other formats.
              Auto-classify documents based on characteristics: <strong className="text-white">structural, textual, or both</strong>.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400 text-justify">
              Leverage machine learning and artificial intelligence-based technologies to enable
              <strong className="text-white"> layout-, object-, and content-based classification</strong>. Enable access to contextual
              information to ensure smarter decision-making, improved productivity, and better customer experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Architecture Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ClassificationArchDiagram />
          </motion.div>

          {/* Section legends below */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { Icon: Database, label: 'Data Preparation', sub: 'Local / Onsite',  color: 'from-amber-400 to-orange-500' },
              { Icon: Server,   label: 'Deployment & Usage', sub: 'Local / Onsite', color: 'from-brand-400 to-cyan-500' },
              { Icon: Cloud,    label: 'Training',           sub: 'Cloud / Offsite', color: 'from-orange-400 to-red-500' },
            ].map((legend, i) => (
              <motion.div
                key={legend.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${legend.color} grid place-items-center shadow-lg`}
                >
                  <legend.Icon className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">{legend.label}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{legend.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Feature Categories */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Engine Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Four <span className="text-gradient">Pillars</span> of Classification
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featureCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.08] transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    animate={cat.anim}
                    transition={{ duration: cat.dur, repeat: Infinity, ease: 'easeInOut' }}
                    className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} grid place-items-center shadow-lg ${cat.glow}`}
                  >
                    <cat.Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-white underline underline-offset-4 decoration-amber-400/40 mt-1">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {cat.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Highlight Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Classification Types</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Multi-Modal <span className="text-gradient">AI Classification</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-white shadow-lg shadow-brand-500/30"
                >
                  <c.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-xs leading-5 text-slate-400">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Type Coverage */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Document Coverage</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Classifies <span className="text-gradient">Any Format</span>
            </h2>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { Icon: FileText,  label: 'PDFs' },
              { Icon: ImageIcon, label: 'Images' },
              { Icon: GitBranch, label: 'Structured' },
              { Icon: ScanLine,  label: 'Semi-Structured' },
              { Icon: Boxes,     label: 'Unstructured' },
              { Icon: Network,   label: 'Any Format' },
            ].map((doc, i) => (
              <motion.div
                key={doc.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 grid place-items-center shadow-lg"
                >
                  <doc.Icon className="h-4 w-4 text-white" />
                </motion.div>
                <span className="text-xs font-bold text-slate-300">{doc.label}</span>
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
            <h2 className="font-display text-3xl font-bold text-white mb-4">Classify smarter — at scale</h2>
            <p className="text-slate-400 mb-8">
              From training to deployment — DigiGate's classification engine learns continuously and routes every document with confidence.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hidden marker for unused imports */}
      <span className="hidden"><Wrench /><BarChart3 /><Settings /></span>
    </>
  )
}
