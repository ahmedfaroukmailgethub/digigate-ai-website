import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart3,
  Brain,
  Layers,
  Video,
  MessageSquare,
  Award,
  Shield,
  Cloud,
  Smartphone,
  Laptop,
  Library,
} from 'lucide-react'

export default function EducationPlatformPage() {
  useEffect(() => {
    document.title = 'DigiGate Education Platform'
  }, [])

  return (
    <div className="relative min-h-screen bg-[#05060f] text-slate-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[640px] h-[640px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-[0.22em]">AI-Powered Learning</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.18] md:leading-[1.18] pb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-brand-300"
          >
            DigiGate Education Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed text-justify"
          >
            DigiGate Education Platform is an integrated, AI-powered learning environment that connects students,
            teachers, parents and administrators in one seamless experience. It blends adaptive learning, rich digital
            content, live classrooms, assessments, analytics and parent engagement — empowering institutions to deliver
            personalized education at scale across schools, universities and training centers.
          </motion.p>
        </div>

        {/* Ecosystem diagram */}
        <div className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center mb-8">
            The Learning Ecosystem
          </h2>
          <EducationEcosystemDiagram />
        </div>

        {/* Core Capabilities */}
        <div className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center underline underline-offset-8 decoration-amber-400/60">
            Core Capabilities
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-5 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-brand-500/20 border border-amber-400/30">
                  <c.icon className="w-6 h-6 text-amber-200" />
                </div>
                <h3 className="mt-3 font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* For each audience */}
        <div className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center underline underline-offset-8 decoration-amber-400/60">
            Built for Every Stakeholder
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 transition-colors overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent blur-2xl" />
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-brand-500/20 border border-amber-400/30">
                  <a.icon className="w-7 h-7 text-amber-200" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-amber-100">{a.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {a.items.map((it) => (
                    <li key={it} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-300/80 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Platform pillars */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-3xl border border-brand-400/20 bg-brand-500/[0.06] p-6 shadow-xl shadow-brand-900/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400/20 to-amber-400/20 border border-brand-400/30">
                <p.icon className="w-6 h-6 text-brand-200" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-100">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-brand-500 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            Discover DigiGate Education
          </a>
        </div>
      </section>
    </div>
  )
}

const capabilities = [
  { title: 'Adaptive Learning', icon: Brain, desc: 'AI-driven personalized learning paths that adapt to each student\'s pace, strengths and gaps.' },
  { title: 'Digital Content Library', icon: BookOpen, desc: 'Curated multimedia courses, e-books, interactive lessons and curriculum-aligned resources.' },
  { title: 'Live Virtual Classrooms', icon: Video, desc: 'HD video conferencing with whiteboards, breakout rooms, screen sharing and session recordings.' },
  { title: 'Smart Assessments', icon: ClipboardCheck, desc: 'Auto-graded quizzes, exams and assignments with anti-cheating and instant feedback.' },
  { title: 'Real-Time Analytics', icon: BarChart3, desc: 'Dashboards for performance tracking, attendance, engagement and predictive insights.' },
  { title: 'Collaboration Hub', icon: MessageSquare, desc: 'Discussion forums, chat, group projects and parent-teacher communication in one place.' },
  { title: 'Gamification & Rewards', icon: Award, desc: 'Badges, leaderboards and reward systems that boost motivation and learning outcomes.' },
  { title: 'Multi-Device Access', icon: Smartphone, desc: 'Native mobile, tablet and web apps with offline mode for uninterrupted learning anywhere.' },
]

const audiences = [
  {
    title: 'Students',
    icon: GraduationCap,
    items: ['Personalized learning paths', 'Interactive lessons & videos', 'Self-paced practice', 'Progress tracking'],
  },
  {
    title: 'Teachers',
    icon: BookOpen,
    items: ['Lesson planning tools', 'Auto-graded assessments', 'Class analytics', 'Live & recorded sessions'],
  },
  {
    title: 'Parents',
    icon: Users,
    items: ['Real-time progress reports', 'Attendance alerts', 'Direct messaging', 'Fee & event updates'],
  },
  {
    title: 'Administrators',
    icon: Layers,
    items: ['Institution-wide dashboards', 'Role & permission control', 'Curriculum management', 'Compliance reports'],
  },
]

const pillars = [
  { title: 'Enterprise Security', icon: Shield, desc: 'End-to-end encryption, role-based access, GDPR & FERPA compliance protecting every learner record.' },
  { title: 'Cloud-Native Scale', icon: Cloud, desc: 'Built on cloud infrastructure with auto-scaling to support thousands of concurrent learners.' },
  { title: 'Open Integration', icon: Layers, desc: 'Standards-based APIs, SIS/LMS connectors and SSO with Microsoft, Google and identity providers.' },
]

function EducationEcosystemDiagram() {
  // Central hub + orbiting role nodes
  const orbit = [
    { label: 'Students', icon: GraduationCap, color: '#fbbf24', angle: -90 },
    { label: 'Teachers', icon: BookOpen, color: '#22d3ee', angle: -18 },
    { label: 'Online-Study', icon: Laptop, color: '#ec4899', angle: 54 },
    { label: 'Admins', icon: Layers, color: '#8b5cf6', angle: 126 },
    { label: 'Digital Library', icon: Library, color: '#10b981', angle: 198 },
  ]

  const cx = 50
  const cy = 50
  const r = 32

  return (
    <div className="relative rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.05] via-transparent to-brand-500/[0.05] p-8 md:p-12 shadow-2xl shadow-amber-900/20 overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full max-w-2xl mx-auto" style={{ minHeight: 420 }}>
        <defs>
          <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </radialGradient>
          <filter id="edu-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Rotating orbit ring */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fbbf24" strokeOpacity="0.18" strokeWidth="0.2" strokeDasharray="0.6 0.8">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
          </circle>
        </g>
        <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="#60a5fa" strokeOpacity="0.12" strokeWidth="0.15" />
        <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#a78bfa" strokeOpacity="0.12" strokeWidth="0.15" />

        {/* Connector lines to hub with traveling packets */}
        {orbit.map((o, i) => {
          const x = cx + r * Math.cos((o.angle * Math.PI) / 180)
          const y = cy + r * Math.sin((o.angle * Math.PI) / 180)
          return (
            <g key={`line-${i}`}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={o.color} strokeOpacity="0.35" strokeWidth="0.2" strokeDasharray="0.5 0.7" />
              <circle r="0.5" fill={o.color}>
                <animateMotion dur={`${4 + i * 0.4}s`} repeatCount="indefinite" path={`M ${cx} ${cy} L ${x} ${y}`} />
                <animate attributeName="opacity" values="0;1;0" dur={`${4 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle r="0.4" fill={o.color}>
                <animateMotion dur={`${4 + i * 0.4}s`} repeatCount="indefinite" path={`M ${x} ${y} L ${cx} ${cy}`} begin={`${i * 0.3}s`} />
                <animate attributeName="opacity" values="0;1;0" dur={`${4 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
            </g>
          )
        })}

        {/* Central hub */}
        <circle cx={cx} cy={cy} r="9" fill="url(#hub-grad)" filter="url(#edu-glow)">
          <animate attributeName="r" values="9;9.8;9" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="9" fill="none" stroke="#fcd34d" strokeOpacity="0.6" strokeWidth="0.2">
          <animate attributeName="r" values="9;14;9" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Orbiting nodes (circle backdrops) */}
        {orbit.map((o, i) => {
          const x = cx + r * Math.cos((o.angle * Math.PI) / 180)
          const y = cy + r * Math.sin((o.angle * Math.PI) / 180)
          return (
            <g key={`node-${i}`}>
              <circle cx={x} cy={y} r="5" fill={o.color} fillOpacity="0.25" filter="url(#edu-glow)">
                <animate attributeName="r" values="5;5.6;5" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
              <circle cx={x} cy={y} r="5" fill="none" stroke={o.color} strokeOpacity="0.7" strokeWidth="0.2">
                <animate attributeName="r" values="5;7.5;5" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            </g>
          )
        })}
      </svg>

      {/* HTML overlay icons + labels */}
      <div className="absolute inset-0 p-8 md:p-12 pointer-events-none">
        <div className="relative w-full h-full max-w-2xl mx-auto">
          {/* Center hub icon */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/50">
              <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="mt-2 text-xs md:text-sm font-bold text-amber-100 uppercase tracking-[0.18em]">DigiGate AI</div>
          </motion.div>

          {/* Orbiting role icons */}
          {orbit.map((o, i) => {
            const x = 50 + r * Math.cos((o.angle * Math.PI) / 180)
            const y = 50 + r * Math.sin((o.angle * Math.PI) / 180)
            const Icon = o.icon
            return (
              <motion.div
                key={`overlay-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg"
                  style={{ backgroundColor: o.color, boxShadow: `0 0 26px ${o.color}80` }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="mt-2 text-[11px] md:text-xs font-semibold text-slate-100 whitespace-nowrap">
                  {o.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
