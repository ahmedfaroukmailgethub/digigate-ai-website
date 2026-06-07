import { motion } from 'framer-motion'
import { TrendingUp, Clock, ShieldCheck, Banknote, FileSearch, Lock } from 'lucide-react'

const outcomes = [
  {
    icon: Clock,
    metric: '73%',
    label: 'Faster Transaction processing',
    desc: 'Automated document capture, classification and data extraction across all transactions across all operations.',
    sector: 'Save Time and Costs',
    sectorIcon: Banknote,
  },
  {
    icon: TrendingUp,
    metric: '4×',
    label: 'Throughput on case files',
    desc: 'Intelligent workflow engine + AI triage routed correspondence to the right desk on first touch.',
    sector: 'Faster decision making',
    sectorIcon: FileSearch,
  },
  {
    icon: ShieldCheck,
    metric: '99.99%',
    label: 'Audit-ready compliance',
    desc: 'Records management with information rights management and immutable audit trails across 12 sites.',
    sector: 'Higher accuracy and security',
    sectorIcon: Lock,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-8 lg:py-10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Outcomes delivered</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Measurable enhancements for{' '}
            <span className="text-gradient">our customers</span>
          </h2>
          <p className="mt-5 text-slate-300/90">
            DigiGate doesn't stop at delivery. Every engagement is engineered around the operational metrics that
            matter — here are real improvements our customers ship to production.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative overflow-hidden rounded-2xl glass p-7 flex flex-col hover:border-brand-400/40 transition-colors"
            >
              {/* Animated breathing glow */}
              <motion.div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              />
              {/* Counter-rotating glow on bottom-left */}
              <motion.div
                className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-gradient-to-tr from-accent-500/15 to-brand-500/15 blur-3xl pointer-events-none"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 + 1 }}
              />

              {/* Animated rim sweep on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(91,138,255,0.35), transparent 60%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Icon tile — pulses with halo */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-xl bg-brand-400/30 blur-md"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                />
                <motion.div
                  className="relative inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 border border-brand-400/40"
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <o.icon className="w-6 h-6 text-brand-200" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Metric — shimmering gradient text */}
              <div className="relative mt-6">
                <motion.p
                  className="font-display text-5xl md:text-6xl font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-accent-300 to-brand-200"
                  style={{ backgroundSize: '200% 100%' }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  {o.metric}
                </motion.p>
                <p className="mt-2 font-semibold text-white">{o.label}</p>
              </div>

              {/* Description */}
              <p className="relative mt-4 text-sm leading-relaxed text-slate-400">{o.desc}</p>

              {/* Sector tag */}
              <div className="relative mt-6 pt-5 border-t border-white/5 flex items-center gap-2">
                <motion.span
                  className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-white/5 border border-white/10"
                  animate={{ boxShadow: [
                    '0 0 0 0 rgba(91,138,255,0)',
                    '0 0 14px 2px rgba(91,138,255,0.35)',
                    '0 0 0 0 rgba(91,138,255,0)',
                  ] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                >
                  <o.sectorIcon className="w-3.5 h-3.5 text-slate-300" />
                </motion.span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {o.sector}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
