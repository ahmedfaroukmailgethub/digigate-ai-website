import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'

/* ── Orbiting "01" binary codes wrapping the AI Core card ── */
function BinaryOrbit() {
  // Two concentric rings of binary glyphs orbiting in opposite directions
  const inner = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      ch: i % 2 === 0 ? '0' : '1',
      angle: (i / 16) * 360,
      r: 150,
      color: i % 3 === 0 ? 'text-brand-300' : i % 3 === 1 ? 'text-accent-300' : 'text-emerald-300',
    })),
    [],
  )
  const outer = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      ch: i % 2 === 0 ? '1' : '0',
      angle: (i / 22) * 360,
      r: 200,
      color: i % 4 === 0 ? 'text-cyan-300' : i % 4 === 1 ? 'text-purple-300' : i % 4 === 2 ? 'text-amber-300' : 'text-brand-300',
    })),
    [],
  )

  return (
    <>
      {/* Inner ring — clockwise */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {inner.map((b, i) => (
          <motion.span
            key={`in-${i}`}
            className={`absolute font-mono text-[13px] font-bold ${b.color}`}
            style={{
              transform: `rotate(${b.angle}deg) translate(${b.r}px) rotate(-${b.angle}deg)`,
              left: 0, top: 0,
            }}
            animate={{ opacity: [0.25, 0.95, 0.25] }}
            transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.07 }}
          >
            {b.ch}
          </motion.span>
        ))}
      </motion.div>

      {/* Outer ring — counter-clockwise */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {outer.map((b, i) => (
          <motion.span
            key={`out-${i}`}
            className={`absolute font-mono text-[12px] font-semibold ${b.color}`}
            style={{
              transform: `rotate(${b.angle}deg) translate(${b.r}px) rotate(-${b.angle}deg)`,
              left: 0, top: 0,
            }}
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 2.4 + (i % 5) * 0.35, repeat: Infinity, delay: i * 0.06 }}
          >
            {b.ch}
          </motion.span>
        ))}
      </motion.div>

      {/* Static scattered glyphs for depth */}
      <div className="pointer-events-none absolute inset-[-180px] z-0">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2
          const r = 230 + (i % 3) * 18
          const x = Math.cos(a) * r
          const y = Math.sin(a) * r
          return (
            <motion.span
              key={`s-${i}`}
              className="absolute font-mono text-[11px] font-bold text-white/40"
              style={{ left: '50%', top: '50%', transform: `translate(${x}px, ${y}px)` }}
              animate={{ opacity: [0.1, 0.6, 0.1], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.12 }}
            >
              {i % 2 === 0 ? '0' : '1'}
            </motion.span>
          )
        })}
      </div>
    </>
  )
}
import {
  Database,
  Globe,
  FileText,
  Wifi,
  BrainCircuit,
  BarChart3,
  Bell,
  Zap,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

const inputNodes = [
  { icon: Database, label: 'Databases', sub: 'SQL / NoSQL', color: '#3563ff' },
  { icon: Globe, label: 'APIs & Web', sub: 'REST / GraphQL', color: '#8b5cf6' },
  { icon: FileText, label: 'Documents', sub: 'PDFs / Reports', color: '#06b6d4' },
  { icon: Wifi, label: 'Live Sensors', sub: 'IoT / Edge', color: '#10b981' },
]

const outputNodes = [
  { icon: BarChart3, label: 'Analytics', sub: 'Real-time insights', color: '#3563ff' },
  { icon: Zap, label: 'Automation', sub: 'Triggered actions', color: '#f59e0b' },
  { icon: Bell, label: 'Alerts', sub: 'Smart notifications', color: '#ef4444' },
  { icon: ShieldCheck, label: 'Compliance', sub: 'Audit-ready reports', color: '#10b981' },
]

const coreSteps = ['Ingest', 'Classify', 'Reason', 'Generate', 'Act']

function NodeCard({
  icon: Icon,
  label,
  sub,
  color,
  delay,
  side,
}: {
  icon: React.ElementType
  label: string
  sub: string
  color: string
  delay: number
  side: 'left' | 'right'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.04 }}
      className="group flex items-center gap-3 rounded-xl glass px-4 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 50%, ${color}22, transparent 70%)` }}
      />
      <div
        className="shrink-0 w-9 h-9 rounded-lg grid place-items-center"
        style={{ background: `${color}22`, border: `1px solid ${color}40` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white leading-tight">{label}</div>
        <div className="text-[11px] text-slate-400 leading-tight">{sub}</div>
      </div>
      {/* Pulse dot on the side facing center */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ [side === 'left' ? 'right' : 'left']: '-1px', background: color }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay * 1.5 }}
      />
    </motion.div>
  )
}

// Animated flowing dashes along an SVG path
function FlowPath({ d, delay = 0, color = '#3563ff' }: { d: string; delay?: number; color?: string }) {
  return (
    <g>
      {/* Base line */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
      />
      {/* Glowing animated dot traveling along path */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 60"
        opacity={0.7}
        animate={{ strokeDashoffset: [0, -66] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay }}
      />
    </g>
  )
}

export default function AIWorkflow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ai-workflow" className="py-8 lg:py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-300 uppercase tracking-wide mb-6">
            <BrainCircuit size={12} className="text-accent-400" />
            AI-Powered Pipeline
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            How our <span className="text-gradient">AI engine</span> works
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            From raw data to decisive action — DigiGate's AI orchestration layer
            ingests, reasons, and acts in real time across any data source.
          </p>
        </motion.div>

        {/* Workflow diagram */}
        <div ref={ref} className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* SVG connection lines — only on lg+ */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 408"
              preserveAspectRatio="none"
              className="absolute inset-0 overflow-visible"
            >
              {/* Input lines */}
              <FlowPath d="M 456 111 C 520 111, 512 204, 600 204" delay={0.3} color="#3563ff" />
              <FlowPath d="M 456 185 C 520 185, 512 204, 600 204" delay={0.5} color="#8b5cf6" />
              <FlowPath d="M 456 259 C 520 259, 512 204, 600 204" delay={0.7} color="#06b6d4" />
              <FlowPath d="M 456 333 C 520 333, 512 204, 600 204" delay={0.9} color="#10b981" />
              {/* Output lines */}
              <FlowPath d="M 600 204 C 688 204, 680 111, 744 111" delay={1.2} color="#3563ff" />
              <FlowPath d="M 600 204 C 688 204, 680 185, 744 185" delay={1.4} color="#f59e0b" />
              <FlowPath d="M 600 204 C 688 204, 680 259, 744 259" delay={1.6} color="#ef4444" />
              <FlowPath d="M 600 204 C 688 204, 680 333, 744 333" delay={1.8} color="#10b981" />
            </svg>
          </div>

          {/* Left: Input Sources */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Data Sources</div>
            {inputNodes.map((n, i) => (
              <NodeCard key={n.label} {...n} delay={0.1 + i * 0.1} side="left" />
            ))}
          </div>

          {/* Center: AI Core */}
          <div className="relative z-10 flex flex-col items-center gap-0">
            {/* Mobile connecting arrows */}
            <div className="flex lg:hidden items-center justify-center gap-3 text-slate-500 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
              <ArrowRight size={18} className="text-brand-400" />
              <div className="flex-1 h-px bg-gradient-to-r from-brand-500/40 via-transparent to-transparent" />
            </div>

            {/* Core engine card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-56 mx-auto"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-[-16px] rounded-[32px] bg-gradient-to-br from-brand-500/25 to-accent-500/25 blur-2xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Rotating orbit ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-[28px] border border-dashed border-brand-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Surrounding orbiting 01 binary codes */}
              <BinaryOrbit />


              <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#0f1230] to-[#0a0a1a] p-6 text-center shadow-2xl shadow-brand-900/40">
                {/* Pulsing brain icon */}
                <div className="relative mx-auto w-16 h-16 mb-5">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/40 to-accent-500/40 blur-md"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 grid place-items-center shadow-lg shadow-brand-500/30">
                    <BrainCircuit size={30} className="text-white" />
                  </div>
                </div>

                <div className="font-display text-lg font-bold text-white">DigiGate AI Core</div>
                <div className="text-xs text-slate-400 mt-1">Orchestration Engine</div>

                {/* Pipeline steps */}
                <div className="mt-5 flex flex-col gap-1.5">
                  {coreSteps.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.0 + i * 0.12 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <span className="text-xs font-medium text-slate-300">{step}</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <span className="text-[10px] font-mono text-emerald-400">
                        {(Math.random() * 40 + 5).toFixed(0)}ms
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Live indicator */}
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">Live · Processing</span>
                </div>
              </div>
            </motion.div>

            {/* Mobile connecting arrow */}
            <div className="flex lg:hidden items-center justify-center gap-3 text-slate-500 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
              <ArrowRight size={18} className="text-accent-400" />
              <div className="flex-1 h-px bg-gradient-to-r from-accent-500/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right: Outputs */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">AI Outputs</div>
            {outputNodes.map((n, i) => (
              <NodeCard key={n.label} {...n} delay={1.2 + i * 0.1} side="right" />
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '<50ms', label: 'Inference Latency', color: '#3563ff' },
            { value: '99.9%', label: 'Pipeline Uptime', color: '#10b981' },
            { value: '500M+', label: 'Events Processed Daily', color: '#8b5cf6' },
            { value: '40+', label: 'Native Integrations', color: '#f59e0b' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass rounded-2xl p-5 text-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 100%, ${s.color}15, transparent 70%)` }}
              />
              <div className="font-display text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
