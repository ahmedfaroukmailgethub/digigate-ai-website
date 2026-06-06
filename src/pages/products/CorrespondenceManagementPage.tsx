import { motion } from 'framer-motion'
import {
  Sparkles, Lock, KeyRound, FolderTree, Database,
  Inbox, FilePlus, ClipboardCheck, UserCheck, CheckCircle2,
  Send, FileEdit, Eye, ThumbsUp, PenLine, Mail,
  Search, BarChart3, ScanLine, Route, Users, Briefcase,
  ShieldCheck, Network,
} from 'lucide-react'

/* ───── Section card with animated icons ───── */
function ProcessSection({
  badge, color, icon: Icon, title, description, steps, glow, iconAnim,
}: {
  badge: string
  color: string
  icon: React.ElementType
  title: string
  description?: string
  steps: { label: string; icon: React.ElementType; anim: Record<string, unknown>; transition: Record<string, unknown> }[]
  glow: string
  iconAnim: Record<string, unknown>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 transition-colors"
    >
      <div className="flex items-start gap-4 mb-5">
        <motion.div
          animate={iconAnim}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg ${glow} shrink-0`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">{badge}</p>
          <h3 className="font-display text-xl font-bold text-white mt-1">{title}</h3>
          {description && <p className="mt-2 text-sm text-slate-400 leading-6">{description}</p>}
        </div>
      </div>

      <div className={`grid gap-3 ${
        steps.length <= 3 ? 'grid-cols-3' :
        steps.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
        'grid-cols-3 sm:grid-cols-5'
      }`}>
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05] transition-colors"
          >
            <motion.div
              animate={step.anim}
              transition={step.transition}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white shadow-md`}
            >
              <step.icon className="h-4 w-4" />
            </motion.div>
            <span className="text-[10px] font-medium text-slate-300 text-center leading-tight">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function CorrespondenceManagementPage() {
  const pulse = { scale: [1, 1.15, 1] }
  const pulseT = { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  const spin = { rotate: 360 }
  const spinT = { duration: 8, repeat: Infinity, ease: 'linear' }
  const float = { y: [0, -4, 0] }
  const floatT = { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
  const wiggle = { rotate: [0, -8, 8, 0] }
  const wiggleT = { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }

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
              DigiGate <span className="text-gradient">Correspondence Management</span> System
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Correspondence Management</strong> handles the process of receiving, recording, logging,
              appropriately processing, responding to, and creating an audit trail of received correspondence — tracking all incoming and outgoing
              business correspondence and making it available to all application users according to their roles and access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Text descriptions */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">About the System</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                <strong className="text-white">DigiGate© Correspondence Management System</strong> provides the electronic means of storing,
                retrieving, and routing correspondence for review and approval. Such systems provide the capability to efficiently and effectively
                manage a huge amount of correspondence both electronically as well as on paper, mail, fax, and other traditional methods.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                The system centralizes and manages the creation, assembly, and delivery of secure, personalized, and interactive business
                correspondences. It enables organizations to quickly assemble correspondence from both pre-approved and custom-authored content
                in a streamlined process from creation to archival.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                As a result, customers get the right communication at the right time in the right way: <strong className="text-white">timely,
                accurate, convenient, secure, and relevant</strong>. This enables businesses to maximize the value of customer interactions and
                minimize the costs and risks associated with a rather complex process.
              </p>
            </motion.div>

            {/* Central hub illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-24 rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-8 shadow-2xl"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* SVG connection layer — guarantees lines are anchored to the same circle */}
                {(() => {
                  const items = [
                    { Icon: Lock,    angle: 0,   color: 'from-cyan-400 to-cyan-600',       label: 'Secure Access',   strokeColor: '#22d3ee' },
                    { Icon: Inbox,   angle: 60,  color: 'from-blue-400 to-blue-600',       label: 'Inward',          strokeColor: '#3b82f6' },
                    { Icon: Send,    angle: 120, color: 'from-violet-400 to-violet-600',   label: 'Outward',         strokeColor: '#8b5cf6' },
                    { Icon: Route,   angle: 180, color: 'from-pink-400 to-pink-600',       label: 'Smart Routing',   strokeColor: '#ec4899' },
                    { Icon: Search,  angle: 240, color: 'from-amber-400 to-amber-600',     label: 'Tracking',        strokeColor: '#f59e0b' },
                    { Icon: Network, angle: 300, color: 'from-emerald-400 to-emerald-600', label: 'Correspondence',  strokeColor: '#10b981' },
                  ]
                  // Same radius for all (in 0–100 coord space)
                  const RADIUS = 38
                  const CENTER_R = 18   // central icon radius for trimming the line so it doesn't go under it
                  const ICON_R   = 8    // small icon radius for trimming

                  return (
                    <>
                      {/* SVG lines + flowing binary packets */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
                        <defs>
                          {items.map((item) => (
                            <filter key={`glow-${item.label}`} id={`glow-${item.label.replace(/\s+/g, '')}`} x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="0.4" result="b" />
                              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                          ))}
                        </defs>

                        {/* Orbit circle — visualizes the constant radius */}
                        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(91,138,255,0.18)" strokeWidth="0.4" strokeDasharray="0.8 1.4" />

                        {/* Static connection lines */}
                        {items.map((item) => {
                          const rad = (item.angle * Math.PI) / 180
                          const x1 = 50 + CENTER_R * Math.cos(rad)
                          const y1 = 50 + CENTER_R * Math.sin(rad)
                          const x2 = 50 + (RADIUS - ICON_R) * Math.cos(rad)
                          const y2 = 50 + (RADIUS - ICON_R) * Math.sin(rad)
                          return (
                            <line
                              key={item.label}
                              x1={x1} y1={y1} x2={x2} y2={y2}
                              stroke={item.strokeColor}
                              strokeOpacity="0.35"
                              strokeWidth="0.4"
                              strokeDasharray="1 1"
                            />
                          )
                        })}

                        {/* Flowing 01 binary packets — from each small icon toward the center */}
                        {items.flatMap((item) => {
                          const rad = (item.angle * Math.PI) / 180
                          // Stream from just outside center to just inside the small icon
                          const sx = 50 + (RADIUS - ICON_R - 1) * Math.cos(rad)
                          const sy = 50 + (RADIUS - ICON_R - 1) * Math.sin(rad)
                          const ex = 50 + (CENTER_R + 0.5) * Math.cos(rad)
                          const ey = 50 + (CENTER_R + 0.5) * Math.sin(rad)
                          // 3 staggered packets per stream + a few different digit/offset combos
                          return [0, 1, 2, 3].map((idx) => {
                            const digit = (idx + item.angle / 60) % 2 < 1 ? '0' : '1'
                            const dur = 2.4
                            const delay = (idx * dur) / 4
                            return (
                              <text
                                key={`${item.label}-${idx}`}
                                x={sx}
                                y={sy}
                                fill={item.strokeColor}
                                fontSize="3.2"
                                fontWeight="900"
                                fontFamily="'Courier New', monospace"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                filter={`url(#glow-${item.label.replace(/\s+/g, '')})`}
                                opacity="0"
                              >
                                {digit}
                                <animate
                                  attributeName="x"
                                  from={sx} to={ex}
                                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="y"
                                  from={sy} to={ey}
                                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="opacity"
                                  values="0;1;1;0"
                                  keyTimes="0;0.15;0.85;1"
                                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="font-size"
                                  values="2.6;3.6;3.6;2.4"
                                  keyTimes="0;0.3;0.7;1"
                                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"
                                />
                              </text>
                            )
                          })
                        })}
                      </svg>

                      {/* Central briefcase icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative"
                        >
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-2xl shadow-orange-500/40">
                            <Briefcase className="h-14 w-14 text-white" />
                          </div>
                          <div className="absolute -inset-3 rounded-full border-2 border-brand-400/30 animate-pulse" />
                          <div className="absolute -inset-6 rounded-full border border-brand-400/20" />
                        </motion.div>
                      </div>

                      {/* Orbiting icons — all at the same RADIUS */}
                      {items.map((item, i) => {
                        const rad = (item.angle * Math.PI) / 180
                        const x = 50 + RADIUS * Math.cos(rad)
                        const y = 50 + RADIUS * Math.sin(rad)
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                            className="absolute"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                              className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} grid place-items-center shadow-xl`}
                            >
                              <item.Icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <p className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-semibold text-slate-300 whitespace-nowrap">
                              {item.label}
                            </p>
                          </motion.div>
                        )
                      })}
                    </>
                  )
                })()}
              </div>
              <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest">Correspondence Hub</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Sections — based on the diagram */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">System Components</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              End-to-End <span className="text-gradient">Workflow</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Secure Access */}
            <ProcessSection
              badge="Foundation"
              color="from-cyan-400 to-cyan-600"
              glow="shadow-cyan-500/40"
              icon={ShieldCheck}
              iconAnim={pulse}
              title="Secure Access"
              description="Provides role-based access rights at object level to maintain the confidentiality of information."
              steps={[
                { label: 'User ID / Password', icon: KeyRound,   anim: pulse,  transition: pulseT },
                { label: 'Indexing',           icon: FolderTree, anim: float,  transition: floatT },
                { label: 'Centralized Repository', icon: Database, anim: pulse, transition: pulseT },
              ]}
            />

            {/* Correspondence Hub */}
            <ProcessSection
              badge="Coordination"
              color="from-emerald-400 to-emerald-600"
              glow="shadow-emerald-500/40"
              icon={Network}
              iconAnim={spin}
              title="Correspondence"
              description="Streamlines all correspondences across departments and officials."
              steps={[
                { label: 'Departments',  icon: Users, anim: float, transition: floatT },
                { label: 'Officials',    icon: UserCheck, anim: pulse, transition: pulseT },
                { label: 'Coordination', icon: Network, anim: spin,  transition: spinT },
              ]}
            />

            {/* Inward Correspondence */}
            <ProcessSection
              badge="Inbound"
              color="from-blue-400 to-blue-600"
              glow="shadow-blue-500/40"
              icon={Inbox}
              iconAnim={float}
              title="Inward Correspondence"
              description="Process and route incoming correspondence with full audit trail."
              steps={[
                { label: 'Register', icon: FilePlus,        anim: float,  transition: floatT },
                { label: 'Classify', icon: FolderTree,      anim: wiggle, transition: wiggleT },
                { label: 'Assign',   icon: UserCheck,       anim: pulse,  transition: pulseT },
                { label: 'Complete', icon: CheckCircle2,    anim: pulse,  transition: pulseT },
              ]}
            />

            {/* Outward Correspondence */}
            <ProcessSection
              badge="Outbound"
              color="from-violet-400 to-violet-600"
              glow="shadow-violet-500/40"
              icon={Send}
              iconAnim={wiggle}
              title="Outward Correspondence"
              description="Compose, review, approve, and dispatch outgoing communications."
              steps={[
                { label: 'Create',  icon: FileEdit, anim: float,  transition: floatT },
                { label: 'Review',  icon: Eye,      anim: pulse,  transition: pulseT },
                { label: 'Approve', icon: ThumbsUp, anim: wiggle, transition: wiggleT },
                { label: 'Sign',    icon: PenLine,  anim: float,  transition: floatT },
                { label: 'Send',    icon: Mail,     anim: pulse,  transition: pulseT },
              ]}
            />

            {/* Smart Routing */}
            <ProcessSection
              badge="Distribution"
              color="from-pink-400 to-pink-600"
              glow="shadow-pink-500/40"
              icon={Route}
              iconAnim={wiggle}
              title="Smart Routing"
              description="Manages day-to-day correspondence and delegation to respective officials."
              steps={[
                { label: 'Create',   icon: FilePlus,     anim: float, transition: floatT },
                { label: 'Assign',   icon: UserCheck,    anim: pulse, transition: pulseT },
                { label: 'Complete', icon: CheckCircle2, anim: pulse, transition: pulseT },
              ]}
            />

            {/* Tracking */}
            <ProcessSection
              badge="Monitoring"
              color="from-amber-400 to-amber-600"
              glow="shadow-amber-500/40"
              icon={Search}
              iconAnim={pulse}
              title="Tracking"
              description="Provides real-time search and tracking capabilities to ensure zero-slip-ups."
              steps={[
                { label: 'Smart Search',      icon: Search,    anim: pulse,  transition: pulseT },
                { label: 'Indexing',          icon: FolderTree, anim: float, transition: floatT },
                { label: 'Dashboard / Report', icon: BarChart3, anim: float, transition: floatT },
                { label: 'RFID / Barcode',    icon: ScanLine,  anim: pulse,  transition: pulseT },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Mail className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Streamline Every Correspondence</h2>
            <p className="text-slate-400 mb-8">
              The right communication at the right time in the right way — timely, accurate, convenient, secure, and relevant.
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
