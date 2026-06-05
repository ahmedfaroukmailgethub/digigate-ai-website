import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 99.99, suffix: '%', label: 'Uptime SLA' },
  { value: 1.8, suffix: 'B+', label: 'Inferences / month', decimals: 1 },
  { value: 60, suffix: '+', label: 'Models supported' },
  { value: 142, suffix: 'ms', label: 'Avg. p95 latency' },
]

function Counter({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass p-10 lg:p-14"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
                  <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-slate-300/80">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
