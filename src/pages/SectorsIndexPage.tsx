import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { sectors } from '../data/sectors'
import { SectorIcon } from '../components/SectorIcon'

export default function SectorsIndexPage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Sectors</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Turnkey programs across <span className="text-gradient">six sectors</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300/90">
            We bring deep domain expertise, regulatory know-how, and proven
            accelerators — so you can focus on outcomes, not integration risk.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={`/sectors/${s.slug}`}
                className="group relative block rounded-2xl overflow-hidden glass h-full"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${s.accent} opacity-50 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/30 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="inline-flex p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20">
                      <SectorIcon iconKey={s.iconKey} className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold">{s.name}</h2>
                  <p className="mt-2 text-sm text-slate-300/85">{s.tagline}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-300 group-hover:text-white transition">
                    Explore programs
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
