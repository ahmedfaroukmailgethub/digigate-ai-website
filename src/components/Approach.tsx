import { motion } from 'framer-motion'
import { Search, PencilRuler, Hammer, Rocket, LifeBuoy } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Discover', desc: 'Workshops, audits, and target operating model design.' },
  { icon: PencilRuler, title: 'Design', desc: 'Architecture, UX, and detailed solution blueprints.' },
  { icon: Hammer, title: 'Build', desc: 'Engineering, integration, AI, infrastructure deployment.' },
  { icon: Rocket, title: 'Launch', desc: 'Change management, training, and go-live with full migration.' },
  { icon: LifeBuoy, title: 'Operate', desc: '24/7 managed operations, SLAs, and continuous improvement.' },
]

export default function Approach() {
  return (
    <section id="approach" className="py-24 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Our approach</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            A single, accountable <span className="text-gradient">delivery model</span>
          </h2>
          <p className="mt-4 text-slate-300/90">
            We own the outcome end-to-end, removing the integration risk that comes
            from juggling multiple vendors.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="relative mx-auto w-14 h-14 rounded-2xl glass grid place-items-center">
                  <s.icon className="w-6 h-6 text-brand-300" />
                  <span className="absolute -top-2 -right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/30 border border-brand-400/40 text-brand-100">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
