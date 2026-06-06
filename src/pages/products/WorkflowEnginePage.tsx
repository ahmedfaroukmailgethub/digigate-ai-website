import { motion } from 'framer-motion'
import {
  Sparkles, User, ClipboardList, Code, Fingerprint,
  Network, Bot, Cog, ArrowRight, Workflow, CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── BPMN Workflow Diagram with Flowing Tokens ─── */
function BPMNFlowDiagram() {
  // Nodes positioned along a horizontal path (in SVG viewBox coords 0–100)
  const nodes = [
    { type: 'start',   x: 8,  y: 50, color: '#34d399', label: 'Start' },
    { type: 'task',    x: 22, y: 50, color: '#5b8aff', label: 'Receive' },
    { type: 'gateway', x: 36, y: 50, color: '#a855f7', label: '' },
    { type: 'task',    x: 50, y: 36, color: '#5b8aff', label: 'Process' },
    { type: 'task',    x: 50, y: 64, color: '#5b8aff', label: 'Validate' },
    { type: 'gateway', x: 64, y: 50, color: '#a855f7', label: '' },
    { type: 'task',    x: 78, y: 50, color: '#5b8aff', label: 'Approve' },
    { type: 'end',     x: 92, y: 50, color: '#ec4899', label: 'End' },
  ]

  // Connection paths
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 }, // gateway → process (top)
    { from: 2, to: 4 }, // gateway → validate (bottom)
    { from: 3, to: 5 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
  ]

  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">Automate Any Process, Anywhere</p>

      <svg viewBox="0 0 100 100" className="w-full h-96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="bpmnArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(91,138,255,0.7)" />
          </marker>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map((c, i) => {
          const from = nodes[c.from]
          const to = nodes[c.to]
          return (
            <line key={`conn-${i}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="rgba(91,138,255,0.35)" strokeWidth="0.4"
              markerEnd="url(#bpmnArrow)" strokeDasharray="0.6 0.4"
            />
          )
        })}

        {/* Animated flowing tokens along each path */}
        {connections.map((c, i) => {
          const from = nodes[c.from]
          const to = nodes[c.to]
          const dur = 8
          const delay = i * 1.0
          return (
            <circle key={`token-${i}`}
              r="0.9" fill="#22d3ee" filter="url(#nodeGlow)"
              opacity="0"
            >
              <animate attributeName="cx" from={from.x} to={to.x}
                dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" from={from.y} to={to.y}
                dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity"
                values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          )
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          if (n.type === 'start' || n.type === 'end') {
            return (
              <g key={`node-${i}`}>
                <circle cx={n.x} cy={n.y} r="3" fill="none"
                  stroke={n.color} strokeWidth="0.5"
                  filter="url(#nodeGlow)" />
                <circle cx={n.x} cy={n.y} r="1.2" fill={n.color}>
                  <animate attributeName="r" values="1.0;1.6;1.0" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            )
          }
          if (n.type === 'gateway') {
            return (
              <g key={`node-${i}`}>
                <polygon points={`${n.x},${n.y-3} ${n.x+3},${n.y} ${n.x},${n.y+3} ${n.x-3},${n.y}`}
                  fill="rgba(168,85,247,0.15)" stroke={n.color} strokeWidth="0.4"
                  filter="url(#nodeGlow)" />
                <text x={n.x} y={n.y + 0.7} fill="#a855f7"
                  fontSize="2.5" fontWeight="900" textAnchor="middle">+</text>
              </g>
            )
          }
          return (
            <g key={`node-${i}`}>
              <rect x={n.x - 4} y={n.y - 2.5} width="8" height="5" rx="1"
                fill="rgba(91,138,255,0.15)" stroke={n.color} strokeWidth="0.4"
                filter="url(#nodeGlow)" />
              <text x={n.x} y={n.y + 0.7} fill="#fff"
                fontSize="1.4" fontWeight="600" textAnchor="middle">{n.label}</text>
            </g>
          )
        })}
      </svg>

      {/* Service icons row */}
      <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
        {[
          { Icon: User,          color: 'from-orange-400 to-red-500',     anim: { scale: [1, 1.12, 1] }, dur: 2.0 },
          { Icon: ClipboardList, color: 'from-amber-400 to-orange-500',   anim: { y: [0, -3, 0] },        dur: 2.2 },
          { Icon: Code,          color: 'from-yellow-400 to-amber-500',   anim: { rotate: [0, -8, 8, 0] }, dur: 2.6 },
          { Icon: Fingerprint,   color: 'from-emerald-400 to-green-500',  anim: { scale: [1, 1.15, 1] }, dur: 2.3 },
          { Icon: Network,       color: 'from-cyan-400 to-sky-500',       anim: { rotate: 360 },         dur: 8   },
          { Icon: Bot,           color: 'from-violet-400 to-purple-500',  anim: { y: [0, -4, 0] },       dur: 1.9 },
          { Icon: Cog,           color: 'from-pink-400 to-rose-500',      anim: { rotate: 360 },         dur: 6   },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={s.anim}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${s.color} grid place-items-center shadow-lg shadow-black/30 border border-white/10`}
          >
            <s.Icon className="h-5 w-5 text-white" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Workflow Engine Architecture Diagram ─── */
function ArchitectureDiagram() {
  // Layout (SVG viewBox 0–100 horizontal, 0–80 vertical)
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">
        Distributed Architecture
      </p>

      <svg viewBox="0 0 100 80" className="w-full h-80" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="archArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(91,138,255,0.7)" />
          </marker>
          <filter id="boxGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Submit Host container ── */}
        <rect x="2" y="5" width="22" height="70" rx="2"
          fill="rgba(91,138,255,0.06)" stroke="rgba(91,138,255,0.35)" strokeWidth="0.3" />
        <text x="13" y="3" fill="#5b8aff" fontSize="2.2" fontWeight="700"
          textAnchor="middle">Submit Host</text>

        {/* Submit Host internals */}
        {[
          { label: 'Workflow Mapper',  y: 12 },
          { label: 'Workflow Engine',  y: 25 },
          { label: 'Job Scheduler',    y: 50 },
          { label: 'Local Queue',      y: 63 },
        ].map((box) => (
          <g key={box.label}>
            <rect x="5" y={box.y} width="16" height="9" rx="1.5"
              fill="rgba(91,138,255,0.15)" stroke="#5b8aff" strokeWidth="0.3"
              filter="url(#boxGlow)" />
            <text x="13" y={box.y + 5.5} fill="#fff" fontSize="1.8"
              fontWeight="600" textAnchor="middle">{box.label}</text>
          </g>
        ))}

        {/* Vertical flow connections inside Submit Host */}
        <line x1="13" y1="21" x2="13" y2="25" stroke="rgba(91,138,255,0.5)" strokeWidth="0.3" />
        <line x1="13" y1="34" x2="13" y2="50" stroke="rgba(91,138,255,0.5)" strokeWidth="0.3" />
        <line x1="13" y1="59" x2="13" y2="63" stroke="rgba(91,138,255,0.5)" strokeWidth="0.3" />

        {/* Bidirectional arrow between Submit Host and Execution Site */}
        <line x1="24" y1="40" x2="34" y2="40" stroke="rgba(34,211,238,0.7)"
          strokeWidth="0.5" markerEnd="url(#archArrow)" />
        <line x1="34" y1="42" x2="24" y2="42" stroke="rgba(34,211,238,0.7)"
          strokeWidth="0.5" markerEnd="url(#archArrow)" />

        {/* ── Execution Site container ── */}
        <rect x="34" y="5" width="38" height="70" rx="2"
          fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.35)" strokeWidth="0.3" />
        <text x="53" y="3" fill="#a855f7" fontSize="2.2" fontWeight="700"
          textAnchor="middle">Execution Site</text>

        {/* Head Node */}
        <rect x="37" y="32" width="14" height="16" rx="1.5"
          fill="rgba(168,85,247,0.12)" stroke="#a855f7" strokeWidth="0.3" />
        <text x="44" y="36" fill="#fff" fontSize="1.8" fontWeight="600"
          textAnchor="middle">Head Node</text>
        <rect x="38.5" y="38" width="11" height="8" rx="1"
          fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="0.25" />
        <text x="44" y="42.8" fill="#fff" fontSize="1.5"
          fontWeight="500" textAnchor="middle">Remote Queue</text>

        {/* Three Worker Nodes */}
        {[14, 33, 52].map((wy, i) => (
          <g key={`worker-${i}`}>
            <rect x="55" y={wy} width="14" height="14" rx="1.5"
              fill="rgba(168,85,247,0.12)" stroke="#a855f7" strokeWidth="0.3" />
            <text x="62" y={wy + 4} fill="#fff" fontSize="1.7"
              fontWeight="600" textAnchor="middle">Worker Node</text>
            <rect x="56.5" y={wy + 5.5} width="11" height="7" rx="1"
              fill="rgba(168,85,247,0.22)" stroke="#a855f7" strokeWidth="0.25" />
            <text x="62" y={wy + 9.8} fill="#fff" fontSize="1.5"
              fontWeight="500" textAnchor="middle">Job Wrapper</text>
            {/* Heartbeat indicator */}
            <circle cx={56.7} cy={wy + 1.5} r="0.7" fill="#22d3ee">
              <animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Connection from Head Node to Worker */}
            <line x1="51" y1="40" x2="55" y2={wy + 7}
              stroke="rgba(168,85,247,0.5)" strokeWidth="0.3"
              markerEnd="url(#archArrow)" strokeDasharray="0.5 0.4" />
          </g>
        ))}

        {/* ── File System (database) ── */}
        <g transform="translate(82, 36)">
          <ellipse cx="0" cy="0" rx="6" ry="2" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="0.3" />
          <path d="M -6 0 L -6 8 A 6 2 0 0 0 6 8 L 6 0" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="0.3" />
          <ellipse cx="0" cy="2.5" rx="6" ry="2" fill="none" stroke="#22d3ee" strokeWidth="0.2" opacity="0.5" />
          <ellipse cx="0" cy="5" rx="6" ry="2" fill="none" stroke="#22d3ee" strokeWidth="0.2" opacity="0.5" />
          <text x="0" y="13" fill="#22d3ee" fontSize="1.8" fontWeight="700" textAnchor="middle">File System</text>
        </g>

        {/* Workers → File System connections */}
        {[14, 33, 52].map((wy, i) => (
          <line key={`fs-${i}`}
            x1="69" y1={wy + 7} x2="76" y2={42}
            stroke="rgba(34,211,238,0.45)" strokeWidth="0.3"
            strokeDasharray="0.5 0.4" />
        ))}

        {/* ── Job Packets flowing along connections ── */}
        {/* Submit → Execution */}
        <circle r="0.7" fill="#22d3ee" filter="url(#boxGlow)">
          <animate attributeName="cx" values="24;34" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="40;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="0.7" fill="#fbbf24" filter="url(#boxGlow)">
          <animate attributeName="cx" values="34;24" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="42;42" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Head Node → Workers */}
        {[14, 33, 52].map((wy, i) => (
          <circle key={`pkt-w-${i}`} r="0.6" fill="#a855f7" filter="url(#boxGlow)">
            <animate attributeName="cx" values="51;55" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values="40;" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" to={String(wy + 7)} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Workers → File System */}
        {[14, 33, 52].map((wy, i) => (
          <circle key={`pkt-fs-${i}`} r="0.6" fill="#34d399" filter="url(#boxGlow)">
            <animate attributeName="cx" values="69;76" dur="2.4s" begin={`${0.6 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${wy + 7};42`} dur="2.4s" begin={`${0.6 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.4s" begin={`${0.6 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  )
}

export default function WorkflowEnginePage() {
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
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[60px]">
              DigiGate <span className="text-gradient">Workflow</span> Engine
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Workflow Engine</strong> is the perfect solution if you deal with business entities'
              life-cycle management in all aspects of transactions. Data processing is a series of operations carried out as transactions
              on data, files, and documents. These operations are traceable and can be organized sequentially or in parallel — the workflow
              engine is designed according to the organization's business process flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + BPMN Flow Animation */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Process Orchestration</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                It <strong className="text-white">manages and monitors the state of activities</strong> in a workflow, such as the processing
                and approvals of various activities, and determines which new activity to transition to according to defined processes.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The actions may be anything from saving an application form in a document management system to sending a reminder e-mail to
                users or escalating overdue items to management. The workflow engine facilitates the flow of information, tasks, and events.
                Workflow engines may also be referred to as <strong className="text-white">Workflow Orchestration Engines</strong>.
              </p>
            </motion.div>

            {/* BPMN Flow Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <BPMNFlowDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <ArchitectureDiagram />
            </motion.div>

            {/* Architecture text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">Engine Architecture</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
                  Resources <span className="text-gradient">Orchestration</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mt-5" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The Workflow Engine relies on the resources (<strong className="text-white">compute, storage, and network</strong>) defined in
                the executable workflow to perform the necessary actions. The time period when a job is free (all of its parents have completed
                successfully) to when it is submitted to the job scheduler is denoted the <strong className="text-white">workflow engine
                delay</strong>.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The workflow engine delay is usually configured by users to ensure that the entire workflow scheduling and execution system is
                not overloaded. The engine supports the user to <strong className="text-white">balance between all elements</strong> in the
                system for maximum operational optimization of the workflow processing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Engine Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Built for <span className="text-gradient">Enterprise Scale</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Workflow,      title: 'Sequential & Parallel',  desc: 'Organize operations sequentially or run them in parallel — the engine handles both patterns natively.', color: 'from-brand-400 to-cyan-400',  glow: 'shadow-brand-500/40',  anim: { rotate: 360 }, dur: 8 },
              { Icon: CheckCircle2,  title: 'Traceable Operations',   desc: 'Every transaction is fully traceable with complete audit history of state transitions.',                color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40', anim: { scale: [1, 1.15, 1] }, dur: 2.2 },
              { Icon: Cog,           title: 'State Management',       desc: 'Manage and monitor activity states — processing, approvals, escalations, and transitions.',            color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40', anim: { rotate: 360 }, dur: 6 },
              { Icon: Bot,           title: 'Automated Actions',      desc: 'From saving documents to sending reminders or escalating overdue items — all automated.',              color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/40',   anim: { y: [0, -4, 0] }, dur: 2 },
              { Icon: Network,       title: 'Resource Orchestration', desc: 'Compute, storage, and network resources are intelligently allocated and balanced.',                    color: 'from-cyan-400 to-sky-500',     glow: 'shadow-cyan-500/40',   anim: { rotate: 360 }, dur: 10 },
              { Icon: ArrowRight,    title: 'Process Optimization',   desc: 'Configurable engine delay ensures the system is never overloaded — maximum operational efficiency.',  color: 'from-pink-400 to-rose-500',    glow: 'shadow-pink-500/40',   anim: { x: [0, 4, 0] }, dur: 1.8 },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.08] transition-colors"
              >
                <motion.div
                  animate={card.anim}
                  transition={{ duration: card.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg ${card.glow}`}
                >
                  <card.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm leading-7 text-slate-400 text-justify">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Workflow className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Automate any process, anywhere</h2>
            <p className="text-slate-400 mb-8">
              From simple task routing to complex multi-stage orchestration — the DigiGate Workflow Engine adapts to your business.
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
