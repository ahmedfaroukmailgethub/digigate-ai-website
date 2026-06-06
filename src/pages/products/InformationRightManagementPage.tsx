import { motion } from 'framer-motion'
import {
  Sparkles, Shield, Lock, Key, FileCheck, Monitor,
  Cloud, Mail, Server, Database, Eye, Printer,
  Copy, Forward, Trash2, Edit, ShieldCheck, Camera,
  Building2, Users, UserCheck, Globe, CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── IRM Document Flow Animation ─── */
function IRMFlowDiagram() {
  return (
    <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-6 shadow-2xl overflow-hidden">
      <svg viewBox="0 0 100 80" className="w-full h-96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="irmArrow" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="rgba(34,211,238,0.8)" />
          </marker>
          <filter id="irmGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="senderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b8aff" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="receiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="irmCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(91,138,255,0.25)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.25)" />
          </linearGradient>
        </defs>

        {/* ─── IRM Control Center (top semicircle) ─── */}
        <g>
          {/* Semicircular plate */}
          <path d="M 25 18 A 25 12 0 0 1 75 18 L 75 22 A 25 12 0 0 0 25 22 Z"
            fill="url(#irmCenterGrad)" stroke="rgba(91,138,255,0.6)" strokeWidth="0.3"
            filter="url(#irmGlow)" />
          <text x="50" y="4" fill="#5b8aff" fontSize="2.8" fontWeight="700"
            textAnchor="middle">Information Rights Management</text>

          {/* Policy icons inside the control center */}
          {/* Bars/permissions icon */}
          <g transform="translate(38, 14)">
            <rect x="-1.5" y="-1" width="0.5" height="2" fill="#22d3ee" />
            <rect x="-0.5" y="-1.5" width="0.5" height="3" fill="#22d3ee" />
            <rect x="0.5" y="-2" width="0.5" height="4" fill="#22d3ee">
              <animate attributeName="height" values="2;4;2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="y" values="-1;-2;-1" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="1.5" y="-1.5" width="0.5" height="3" fill="#22d3ee" />
          </g>

          {/* Key icon */}
          <g transform="translate(46, 14)">
            <circle cx="-1.2" cy="0" r="1.2" fill="none" stroke="#fbbf24" strokeWidth="0.3">
              <animate attributeName="r" values="1.0;1.4;1.0" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <rect x="-0.3" y="-0.25" width="3" height="0.5" fill="#fbbf24" />
            <rect x="1.4" y="-0.7" width="0.4" height="0.5" fill="#fbbf24" />
            <rect x="2.2" y="-0.7" width="0.4" height="0.5" fill="#fbbf24" />
          </g>

          {/* Certificate icon */}
          <g transform="translate(54, 14)">
            <rect x="-2" y="-1.5" width="4" height="3" rx="0.3" fill="rgba(168,85,247,0.3)"
              stroke="#a855f7" strokeWidth="0.3" />
            <line x1="-1.4" y1="-0.6" x2="1.4" y2="-0.6" stroke="#a855f7" strokeWidth="0.2" />
            <line x1="-1.4" y1="0.1" x2="1.4" y2="0.1" stroke="#a855f7" strokeWidth="0.2" />
            <line x1="-1.4" y1="0.8" x2="0.5" y2="0.8" stroke="#a855f7" strokeWidth="0.2" />
          </g>

          {/* Checkmark badge */}
          <g transform="translate(50, 20)">
            <circle cx="0" cy="0" r="1.5" fill="rgba(52,211,153,0.3)" stroke="#34d399" strokeWidth="0.3">
              <animate attributeName="r" values="1.3;1.7;1.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <polyline points="-0.6,0 -0.1,0.5 0.7,-0.4" fill="none" stroke="#34d399" strokeWidth="0.4" strokeLinecap="round" />
          </g>

          {/* Dashed lines from IRM down to encryption points */}
          <line x1="32" y1="22" x2="32" y2="35" stroke="#5b8aff" strokeWidth="0.3" strokeDasharray="0.6 0.4" opacity="0.7" />
          <line x1="68" y1="22" x2="68" y2="35" stroke="#5b8aff" strokeWidth="0.3" strokeDasharray="0.6 0.4" opacity="0.7" />
          <line x1="50" y1="22" x2="50" y2="42" stroke="#5b8aff" strokeWidth="0.3" strokeDasharray="0.6 0.4" opacity="0.4" />
        </g>

        {/* ─── Sender (left) ─── */}
        <g transform="translate(8, 50)">
          {/* Curved background */}
          <path d="M -4 -12 Q -7 0 -4 12 L 4 12 L 4 -12 Z"
            fill="rgba(91,138,255,0.10)" stroke="rgba(91,138,255,0.4)" strokeWidth="0.3" />
          {/* Monitor */}
          <rect x="-3" y="-6" width="7" height="5" rx="0.5" fill="url(#senderGrad)"
            stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" filter="url(#irmGlow)" />
          <rect x="-2.4" y="-5.4" width="5.8" height="3.8" rx="0.2" fill="rgba(255,255,255,0.85)" />
          {/* Lines inside monitor */}
          <line x1="-2" y1="-4.8" x2="3" y2="-4.8" stroke="#1e40af" strokeWidth="0.2" />
          <line x1="-2" y1="-4.2" x2="2.5" y2="-4.2" stroke="#1e40af" strokeWidth="0.2" />
          <line x1="-2" y1="-3.6" x2="3" y2="-3.6" stroke="#1e40af" strokeWidth="0.2" />
          <line x1="-2" y1="-3.0" x2="2" y2="-3.0" stroke="#1e40af" strokeWidth="0.2" />
          {/* Stand */}
          <rect x="-0.5" y="-1" width="1" height="2" fill="#1e40af" />
          <rect x="-2" y="1" width="4" height="0.5" rx="0.2" fill="#1e40af" />
          {/* Label */}
          <text x="0" y="8" fill="#5b8aff" fontSize="2" fontWeight="700" textAnchor="middle">Sender</text>
          {/* Step number 1 */}
          <circle cx="-5" cy="-7" r="1.5" fill="#fbbf24">
            <animate attributeName="r" values="1.3;1.7;1.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="-5" y="-6.5" fill="#fff" fontSize="1.8" fontWeight="900" textAnchor="middle">1</text>
        </g>

        {/* ─── Encryption Lock 1 (between Sender and middle) ─── */}
        <g transform="translate(32, 50)">
          {/* Step number 2 */}
          <circle cx="0" cy="-6" r="1.5" fill="#fbbf24">
            <animate attributeName="r" values="1.3;1.7;1.3" dur="2s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="-5.5" fill="#fff" fontSize="1.8" fontWeight="900" textAnchor="middle">2</text>

          {/* Document with lock icon */}
          <g>
            <rect x="-2.5" y="-3" width="5" height="6" rx="0.3" fill="rgba(255,255,255,0.95)"
              stroke="#1e40af" strokeWidth="0.2" />
            <line x1="-1.8" y1="-1.5" x2="1.8" y2="-1.5" stroke="#1e40af" strokeWidth="0.2" />
            <line x1="-1.8" y1="-0.5" x2="1.8" y2="-0.5" stroke="#1e40af" strokeWidth="0.2" />
            <line x1="-1.8" y1="0.5" x2="1.5" y2="0.5" stroke="#1e40af" strokeWidth="0.2" />
            {/* Lock badge */}
            <g transform="translate(1.5, 2)">
              <circle cx="0" cy="0" r="1.4" fill="#fbbf24">
                <animate attributeName="r" values="1.2;1.5;1.2" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <rect x="-0.55" y="-0.2" width="1.1" height="0.9" rx="0.15" fill="#fff" />
              <path d="M -0.4 -0.2 L -0.4 -0.7 A 0.4 0.4 0 0 1 0.4 -0.7 L 0.4 -0.2"
                fill="none" stroke="#fff" strokeWidth="0.2" />
            </g>
          </g>
        </g>

        {/* ─── Middle Transit Hub (cloud, mail, server, db, ftp, ecm) ─── */}
        <g transform="translate(50, 50)">
          {/* Cloud */}
          <g transform="translate(0, -4)">
            <motion.g>
              <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="rgba(91,138,255,0.25)" stroke="#5b8aff" strokeWidth="0.3" />
              <ellipse cx="-1.5" cy="-0.5" rx="1.2" ry="1" fill="rgba(91,138,255,0.25)" stroke="#5b8aff" strokeWidth="0.3" />
              <ellipse cx="1.5" cy="-0.5" rx="1.2" ry="1" fill="rgba(91,138,255,0.25)" stroke="#5b8aff" strokeWidth="0.3" />
            </motion.g>
          </g>

          {/* Globe / Network */}
          <g transform="translate(3.5, -1)">
            <circle cx="0" cy="0" r="1.8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="0.3">
              <animate attributeName="r" values="1.6;2.0;1.6" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <ellipse cx="0" cy="0" rx="1.8" ry="0.5" fill="none" stroke="#22d3ee" strokeWidth="0.2" />
            <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#22d3ee" strokeWidth="0.2" />
          </g>

          {/* Mail envelope */}
          <g transform="translate(-3, 1)">
            <rect x="-1.5" y="-1" width="3" height="2" rx="0.2" fill="rgba(245,158,11,0.3)" stroke="#fbbf24" strokeWidth="0.3" />
            <path d="M -1.5 -1 L 0 0.2 L 1.5 -1" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
          </g>

          {/* ECM server stack */}
          <g transform="translate(-2, 5)">
            <rect x="-2" y="-0.5" width="4" height="1.2" rx="0.2" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.2" />
            <rect x="-2" y="1" width="4" height="1.2" rx="0.2" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.2" />
            <circle cx="-1.4" cy="0.1" r="0.2" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="-1.4" cy="1.6" r="0.2" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-1.5" fill="#a855f7" fontSize="1.2" fontWeight="700" textAnchor="middle">ECM</text>
          </g>

          {/* FTP */}
          <g transform="translate(2, 5)">
            <rect x="-1.5" y="-0.5" width="3" height="2.2" rx="0.2" fill="rgba(91,138,255,0.25)" stroke="#5b8aff" strokeWidth="0.2" />
            <line x1="-1" y1="0" x2="1" y2="0" stroke="#5b8aff" strokeWidth="0.15" />
            <line x1="-1" y1="0.5" x2="1" y2="0.5" stroke="#5b8aff" strokeWidth="0.15" />
            <line x1="-1" y1="1" x2="1" y2="1" stroke="#5b8aff" strokeWidth="0.15" />
            <text x="0" y="-1.5" fill="#5b8aff" fontSize="1.2" fontWeight="700" textAnchor="middle">FTP</text>
          </g>

          {/* Database */}
          <g transform="translate(0, 0)">
            <ellipse cx="0" cy="-0.7" rx="1.2" ry="0.4" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.2" />
            <rect x="-1.2" y="-0.7" width="2.4" height="1.7" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="0.2" />
            <ellipse cx="0" cy="1" rx="1.2" ry="0.4" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.2" />
          </g>
        </g>

        {/* ─── Encryption Lock 2 (between middle and receiver) ─── */}
        <g transform="translate(68, 50)">
          {/* Step number 3 */}
          <circle cx="0" cy="-6" r="1.5" fill="#fbbf24">
            <animate attributeName="r" values="1.3;1.7;1.3" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="-5.5" fill="#fff" fontSize="1.8" fontWeight="900" textAnchor="middle">3</text>

          {/* Document with lock icon */}
          <g>
            <rect x="-2.5" y="-3" width="5" height="6" rx="0.3" fill="rgba(255,255,255,0.95)"
              stroke="#5b21b6" strokeWidth="0.2" />
            <line x1="-1.8" y1="-1.5" x2="1.8" y2="-1.5" stroke="#5b21b6" strokeWidth="0.2" />
            <line x1="-1.8" y1="-0.5" x2="1.8" y2="-0.5" stroke="#5b21b6" strokeWidth="0.2" />
            <line x1="-1.8" y1="0.5" x2="1.5" y2="0.5" stroke="#5b21b6" strokeWidth="0.2" />
            <g transform="translate(1.5, 2)">
              <circle cx="0" cy="0" r="1.4" fill="#fbbf24">
                <animate attributeName="r" values="1.2;1.5;1.2" dur="1.5s" begin="0.7s" repeatCount="indefinite" />
              </circle>
              <rect x="-0.55" y="-0.2" width="1.1" height="0.9" rx="0.15" fill="#fff" />
              <path d="M -0.4 -0.2 L -0.4 -0.7 A 0.4 0.4 0 0 1 0.4 -0.7 L 0.4 -0.2"
                fill="none" stroke="#fff" strokeWidth="0.2" />
            </g>
          </g>
        </g>

        {/* ─── Receiver (right) ─── */}
        <g transform="translate(92, 50)">
          <path d="M 4 -12 Q 7 0 4 12 L -4 12 L -4 -12 Z"
            fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.4)" strokeWidth="0.3" />
          <rect x="-4" y="-6" width="7" height="5" rx="0.5" fill="url(#receiverGrad)"
            stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" filter="url(#irmGlow)" />
          <rect x="-3.4" y="-5.4" width="5.8" height="3.8" rx="0.2" fill="rgba(255,255,255,0.85)" />
          <line x1="-3" y1="-4.8" x2="2" y2="-4.8" stroke="#5b21b6" strokeWidth="0.2" />
          <line x1="-3" y1="-4.2" x2="1.5" y2="-4.2" stroke="#5b21b6" strokeWidth="0.2" />
          <line x1="-3" y1="-3.6" x2="2" y2="-3.6" stroke="#5b21b6" strokeWidth="0.2" />
          <line x1="-3" y1="-3.0" x2="1" y2="-3.0" stroke="#5b21b6" strokeWidth="0.2" />
          <rect x="-0.5" y="-1" width="1" height="2" fill="#5b21b6" />
          <rect x="-2" y="1" width="4" height="0.5" rx="0.2" fill="#5b21b6" />
          <text x="0" y="8" fill="#a855f7" fontSize="2" fontWeight="700" textAnchor="middle">Receiver</text>
          {/* Step number 4 */}
          <circle cx="5" cy="-7" r="1.5" fill="#fbbf24">
            <animate attributeName="r" values="1.3;1.7;1.3" dur="2s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="5" y="-6.5" fill="#fff" fontSize="1.8" fontWeight="900" textAnchor="middle">4</text>
        </g>

        {/* ─── Flow arrows (Sender → Lock1 → Middle → Lock2 → Receiver) ─── */}
        <line x1="13" y1="50" x2="28" y2="50" stroke="#22d3ee" strokeWidth="0.5"
          markerEnd="url(#irmArrow)" />
        <line x1="36" y1="50" x2="44" y2="50" stroke="#22d3ee" strokeWidth="0.5"
          markerEnd="url(#irmArrow)" />
        <line x1="56" y1="50" x2="64" y2="50" stroke="#22d3ee" strokeWidth="0.5"
          markerEnd="url(#irmArrow)" />
        <line x1="72" y1="50" x2="87" y2="50" stroke="#22d3ee" strokeWidth="0.5"
          markerEnd="url(#irmArrow)" />

        {/* ─── Flowing document packets along the path ─── */}
        {[
          { sx: 13, sy: 50, ex: 28, ey: 50, delay: 0 },
          { sx: 36, sy: 50, ex: 44, ey: 50, delay: 1 },
          { sx: 56, sy: 50, ex: 64, ey: 50, delay: 2 },
          { sx: 72, sy: 50, ex: 87, ey: 50, delay: 3 },
        ].map((seg, i) => (
          <g key={`pkt-${i}`}>
            <rect x="-1" y="-1.2" width="2" height="2.4" rx="0.2"
              fill="rgba(34,211,238,0.9)" filter="url(#irmGlow)" opacity="0">
              <animate attributeName="x" values={`${seg.sx - 1};${seg.ex - 1}`}
                dur="5s" begin={`${seg.delay}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${seg.sy - 1.2};${seg.ey - 1.2}`}
                dur="5s" begin={`${seg.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0"
                keyTimes="0;0.1;0.9;1" dur="5s" begin={`${seg.delay}s`} repeatCount="indefinite" />
            </rect>
          </g>
        ))}

        {/* ─── Right side: Key & Delete badges (permissions check) ─── */}
        <g transform="translate(83, 30)">
          <polygon points="0,-2 2,0 0,2 -2,0" fill="rgba(91,138,255,0.3)" stroke="#5b8aff" strokeWidth="0.3" />
          <g transform="translate(0, 0)">
            <circle cx="-0.5" cy="-0.2" r="0.5" fill="none" stroke="#fbbf24" strokeWidth="0.2" />
            <rect x="-0.2" y="-0.35" width="1" height="0.3" fill="#fbbf24" />
          </g>
        </g>
        <g transform="translate(89, 32)">
          <polygon points="0,-2 2,0 0,2 -2,0" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="0.3" />
          <text x="0" y="0.5" fill="#a855f7" fontSize="1.5" fontWeight="900" textAnchor="middle">×</text>
        </g>
      </svg>
    </div>
  )
}

const restrictions = [
  { Icon: Eye,     label: 'View',       desc: 'Control who can open and view the document.',         color: 'from-cyan-400 to-blue-500',     anim: { scale: [1, 1.15, 1] }, dur: 2 },
  { Icon: Copy,    label: 'Copy/Paste', desc: 'Prevent copying content within the document.',        color: 'from-amber-400 to-orange-500',  anim: { rotate: [0, -8, 8, 0] }, dur: 2.5 },
  { Icon: Printer, label: 'Print',      desc: 'Block or allow printing of the document.',            color: 'from-emerald-400 to-teal-500',  anim: { y: [0, -3, 0] }, dur: 2.2 },
  { Icon: Forward, label: 'Forward',    desc: 'Restrict forwarding to unauthorized recipients.',     color: 'from-violet-400 to-purple-500', anim: { x: [0, 3, 0] }, dur: 2 },
  { Icon: Trash2,  label: 'Delete',     desc: 'Control deletion rights to ensure record retention.', color: 'from-pink-400 to-rose-500',     anim: { rotate: [0, -6, 6, 0] }, dur: 2.4 },
  { Icon: Edit,    label: 'Edit',       desc: 'Allow read-only or controlled editing access.',       color: 'from-fuchsia-400 to-pink-500',  anim: { y: [0, -3, 0] }, dur: 2.1 },
  { Icon: Camera,  label: 'Screenshot', desc: 'Prevent users from taking screenshots.',              color: 'from-orange-400 to-red-500',    anim: { scale: [1, 1.18, 1] }, dur: 1.9 },
]

const policyLevels = [
  { Icon: Building2,  title: 'Enterprise Level',  desc: 'Apply policies organization-wide for consistent governance and protection across all assets.',    color: 'from-brand-400 to-cyan-400', glow: 'shadow-brand-500/40',  anim: { scale: [1, 1.12, 1] }, dur: 2.4 },
  { Icon: Users,      title: 'Department Level',  desc: 'Tailor rules to departments — HR, Finance, Legal, R&D — based on their specific needs.',        color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/40', anim: { y: [0, -4, 0] }, dur: 2.2 },
  { Icon: UserCheck,  title: 'Group Level',       desc: 'Define policies for project teams, working groups, and cross-functional collaborators.',           color: 'from-violet-400 to-purple-500', glow: 'shadow-violet-500/40', anim: { rotate: [0, -8, 8, 0] }, dur: 2.6 },
  { Icon: ShieldCheck,title: 'User Level',        desc: 'Apply individual-user policies for the highest level of granular access control.',                color: 'from-pink-400 to-rose-500',     glow: 'shadow-pink-500/40',   anim: { rotate: 360 }, dur: 8 },
]

export default function InformationRightManagementPage() {
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
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              DigiGate <span className="text-gradient">Information Right Management</span> System
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate© Information Rights Management (IRM)</strong> is a form of IT security technology used to
              protect documents containing sensitive information from unauthorized access. Unlike traditional Digital Rights Management (DRM) —
              which applies to mass-produced media like songs and movies — IRM applies to documents, spreadsheets, and presentations created by
              individuals. IRM protects files from unauthorized copying, viewing, printing, forwarding, deleting, and editing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Flow Animation */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">How It Works</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                <strong className="text-white">DigiGate© Information Rights Management (IRM)</strong> generally <strong className="text-white">
                encrypts files</strong> in order to enforce access policies. Once encrypted, additional IRM rules can be applied to a document
                to <strong className="text-white">allow or deny specific activities</strong>.
              </p>

              <p className="text-base leading-8 text-slate-300/90 text-justify">
                In some cases, this means a document can only be <strong className="text-white">viewed</strong> — and the user cannot copy/paste
                the content within the document. In other cases, the IRM rule may prevent a user from taking a screenshot of the document,
                printing, or editing it.
              </p>

              <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 mt-4">
                <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm leading-6 text-slate-300">
                  <strong className="text-white">Protection persists everywhere.</strong> Even when files are shared with third parties or a user is
                  off the company network, IRM rules continue to protect the document.
                </p>
              </div>
            </motion.div>

            {/* IRM Flow Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <IRMFlowDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Restrictions / Permissions Grid */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Protected Activities</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Granular <span className="text-gradient">Permissions Control</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              IRM rules can allow or deny each specific activity on the document, giving you fine-grained control.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {restrictions.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-5 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <motion.div
                  animate={r.anim}
                  transition={{ duration: r.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${r.color} text-white shadow-lg`}
                >
                  <r.Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="font-display text-base font-semibold text-white mb-2">{r.label}</h3>
                <p className="text-xs leading-6 text-slate-400">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Levels */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Policy Application</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Apply IRM at <span className="text-gradient">Any Level</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Organizations can create and apply custom IRM rules based on data security, compliance, and governance requirements.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {policyLevels.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.08] transition-colors"
              >
                <motion.div
                  animate={p.anim}
                  transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg ${p.glow}`}
                >
                  <p.Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Persistent Protection Section */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-4">Persistent Protection</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl mb-6">
                Secure <span className="text-gradient">Beyond Borders</span>
              </h2>
              <p className="text-base leading-8 text-slate-300/90 text-justify mb-4">
                One of the oft-cited advantages of DigiGate IRM is that these protections <strong className="text-white">persist even when
                files are shared with third parties</strong>. A user can be off the company network, yet the IRM rules will continue to
                protect the document.
              </p>
              <p className="text-base leading-8 text-slate-300/90 text-justify">
                This means <strong className="text-white">IRM-sealed documents remain secure</strong> no matter where they're being accessed —
                providing true zero-trust document security across the entire digital landscape.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Persistent encryption across borders',
                  'Works offline & off-network',
                  'Third-party sharing remains secure',
                  'Zero-trust document architecture',
                ].map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-6">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Globe icon visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-[#0a0d2a] to-[#05060f] p-10 shadow-2xl">
                <div className="relative aspect-square max-w-sm mx-auto flex items-center justify-center">
                  {/* Rotating Globe icon with rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-brand-400/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-6 rounded-full border border-accent-400/30"
                  />
                  <div className="absolute inset-12 rounded-full border border-white/10" />

                  {/* Lock with globe icon */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center shadow-2xl shadow-brand-500/40"
                  >
                    <div className="relative">
                      <Globe className="h-16 w-16 text-white" />
                      <Lock className="h-8 w-8 text-white absolute -bottom-1 -right-1 bg-[#05060f] rounded-full p-1 border-2 border-brand-400" />
                    </div>
                  </motion.div>

                  {/* Floating mini-lock icons around the globe */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180
                    const x = 50 + 42 * Math.cos(rad)
                    const y = 50 + 42 * Math.sin(rad)
                    return (
                      <motion.div
                        key={angle}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow-lg"
                      >
                        <Lock className="h-4 w-4 text-white" />
                      </motion.div>
                    )
                  })}
                </div>
                <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest">
                  Documents protected — anywhere, anytime
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Lock className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Protect what matters most</h2>
            <p className="text-slate-400 mb-8">
              From creation to consumption — IRM-sealed documents remain secure no matter where they travel.
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
