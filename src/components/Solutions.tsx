import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { sectors } from '../data/sectors'
import { SectorIcon } from './SectorIcon'

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent-400">Sectors</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Turnkey programs for <span className="text-gradient">your sector</span>
            </h2>
            <p className="mt-5 text-slate-300/90">
              Deep domain expertise, vertical accelerators, and reference
              architectures — so your team is in production in months, not years.
            </p>
            <Link
              to="/sectors"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              View all sectors →
            </Link>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {sectors.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={`/sectors/${s.slug}`}
                  className="group block rounded-2xl glass hover:border-brand-400/40 transition relative overflow-hidden h-full"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${s.accent} opacity-50 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1a] via-[#0b0d1a]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 inline-flex p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15">
                      <SectorIcon iconKey={s.iconKey} className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <p className="mt-1 text-sm text-slate-300/85">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-medium text-brand-300 group-hover:text-white transition">
                      Explore programs →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
