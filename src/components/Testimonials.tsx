import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const items = [
  {
    quote:
      'Future generations expect simplicity, speed, and seamless integration.',
    name: 'Michael Daniels',
    role: 'CIO, Business and Commercial Banking, Standard Bank',
    avatar: 'https://cioviews.com/wp-content/uploads/2025/07/1.-Michael-Daniels.jpg',
  },
  {
    quote:
      'They replaced four vendors with a single program team. We hit go-live two months early and below budget.',
    name: 'Marcus Reyes',
    role: 'Chief Data Officer, Helios Bank',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
  },
  {
    quote:
      'From strategy through managed operations, Digigate is the only partner that took true ownership of the outcome.',
    name: 'Aisha Patel',
    role: 'Group COO, SkyBridge Aviation',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Customers</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Trusted to deliver <span className="text-gradient">mission-critical programs</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl glass p-7 flex flex-col"
            >
              <Quote className="w-7 h-7 text-accent-400/80" />
              <blockquote className="mt-4 text-slate-200 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div>
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
