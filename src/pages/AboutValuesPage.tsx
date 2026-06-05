import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target, Users, Lightbulb, ShieldCheck,
  Heart, Leaf, TrendingUp, Sparkles as SparklesIcon,
} from 'lucide-react'

const carouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    label: '🎯 Client Focus',
  },
  {
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
    label: '🤝 Collaboration',
  },
  {
    src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    label: '💡 Innovation',
  },
  {
    src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    label: '🛡️ Integrity',
  },
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    label: '❤️ Passion',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=1200&q=80',
    label: '👥 People',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    label: '🌱 Environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    label: '📈 Economy',
  },
]

type SlideImage = { src: string; label: string }

const values = [
  {
    Icon: Target,
    title: 'Client Focus',
    text: 'We always deliver on our promise and only assure what we can deliver because we understand customer expectations and take steps to exceed them. Consequently, it is our responsibility to ensure total customer satisfaction and overcome shortcomings whenever they arise.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { scale: [1, 1.15, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Users,
    title: 'Collaboration',
    text: 'We believe that knowledge-sharing and teamwork are the foundations for company success and achievement.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Lightbulb,
    title: 'Innovation',
    text: 'We differentiate ourselves by helping our clients and partners achieve their goals, using the most advanced innovative digital transformation solutions.',
    color: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/40',
    animation: { rotate: [0, -10, 10, 0] },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: ShieldCheck,
    title: 'Integrity',
    text: 'Including integrity as an integral part of our business allows us to professionally conduct all of our activities with morality. We take great care in being completely objective in our judgment and any recommendations we give; keeping only our clients\' best interests in mind.',
    color: 'from-accent-400 to-pink-400',
    glow: 'shadow-accent-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: Heart,
    title: 'Passion',
    text: 'We are passionate about our work and show pride in our solutions; pointing towards delivering ultimate creativity and innovation in the process. Our goal is for our customers to recommend us as a trustworthy and accountable partner.',
    color: 'from-pink-400 to-rose-500',
    glow: 'shadow-pink-500/40',
    animation: { scale: [1, 1.2, 1] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: SparklesIcon,
    title: 'People',
    text: 'We value every member of our team and encourage their development. We provide scope for individual development by making our people feel valued, included and engaged. We empower our clients through employing the best talents, enabling them to reach their business objectives with the highest efficiency possible.',
    color: 'from-violet-400 to-brand-400',
    glow: 'shadow-violet-500/40',
    animation: { rotate: 360 },
    transition: { duration: 8, repeat: Infinity, ease: 'linear' },
  },
  {
    Icon: Leaf,
    title: 'Environment',
    text: 'Although the environmental impact of our sector is minimal when compared to many other high impact industries, we have the obligation and opportunity to do what we can to limit any negative environmental influence.',
    color: 'from-green-400 to-emerald-500',
    glow: 'shadow-green-500/40',
    animation: { y: [0, -6, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    Icon: TrendingUp,
    title: 'Economy',
    text: 'Economic sustainability involves creating economic value out of whatever project or decision we are undertaking. Decisions are made in the most equitable and fiscally sound way possible while considering the other aspects of sustainability. In most cases, our projects and decisions are made with the long term benefits in mind.',
    color: 'from-cyan-400 to-brand-500',
    glow: 'shadow-cyan-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function RollingCarousel({ images }: { images: SlideImage[] }) {
  const [current, setCurrent] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    timer.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  const goTo = (i: number) => {
    setCurrent(i)
    if (timer.current) clearInterval(timer.current)
    startTimer()
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
      <div className="relative h-[400px] md:h-[520px]">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={false}
            animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.04 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img src={img.src} alt={img.label} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/30 to-transparent" />
            <div className="absolute bottom-14 left-6">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: i === current ? 1 : 0, y: i === current ? 0 : 8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
              >
                {img.label}
              </motion.span>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-brand-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutValuesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src={carouselImages[0].src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/92 to-[#05060f]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/20 to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <SparklesIcon className="h-3.5 w-3.5" />
              About DigiGate
            </div>
            <h1 className="mt-7 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-[72px]">
              DigiGate <span className="text-gradient">Values</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate Group</strong> believes that sustainable businesses are resilient
              and can create economic value, healthy ecosystems, and strong communities. We enable business
              sustainability by fostering collaboration and co-creating knowledge through research and practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values + Carousel */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Values grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
                >
                  <motion.div
                    animate={v.animation}
                    transition={v.transition}
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${v.color} text-white shadow-lg ${v.glow}`}
                  >
                    <v.Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-xs leading-6 text-slate-400 text-justify">{v.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Sticky carousel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <RollingCarousel images={carouselImages} />
              <p className="mt-6 text-sm leading-7 text-slate-400 text-justify">
                At DigiGate, our values are not just words — they are the foundation of every decision we make,
                every solution we build, and every relationship we foster with our clients and partners worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
