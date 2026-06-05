import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Globe, Sparkles, TrendingUp, Users } from 'lucide-react'

const slideImages = [
  {
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70',
    alt: 'Dubai skyline — UAE technology hub',
    label: '🇦🇪 Dubai, UAE',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=70',
    alt: 'Digital technology — UAE innovation',
    label: '🇦🇪 UAE — Digital Innovation',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=70',
    alt: 'London city technology — UK',
    label: '🇬🇧 London, UK',
  },
  {
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70',
    alt: 'UK software development — code on screen',
    label: '🇬🇧 UK — Software Development',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70',
    alt: 'Global digital network — DigiGate AI',
    label: '🌐 Global Digital Ecosystem',
  },
]

const expertiseImages = [
  {
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=70',
    alt: 'AI artificial intelligence technology',
    label: '🤖 Artificial Intelligence',
  },
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=70',
    alt: 'Cloud computing and data networks',
    label: '☁️ Cloud & Data Networks',
  },
  {
    src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=70',
    alt: 'Data analytics and business intelligence',
    label: '📊 Data Analytics',
  },
  {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=70',
    alt: 'Digital transformation strategy',
    label: '🔄 Digital Transformation',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70',
    alt: 'Enterprise technology solutions',
    label: '⚙️ Enterprise Solutions',
  },
]

type SlideImage = { src: string; alt: string; label: string }

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
      {/* Slides */}
      <div className="relative h-[400px] md:h-[520px]">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={false}
            animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.04 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/30 to-transparent" />
            {/* Location label */}
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

        {/* Slide counter */}
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

export default function AboutIntroPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src={slideImages[2].src}
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
              <Sparkles className="h-3.5 w-3.5" />
              About DigiGate
            </div>
            <h1 className="mt-7 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-[72px]">
              DigiGate <span className="text-gradient">Intro</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90">
              DigiGate Group has been established with a vision to build an ecosystem that integrates a comprehensive set of capabilities with a network of leading business technology providers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — About DigiGate Group + carousel */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 text-white shadow-lg shadow-brand-500/30">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  About DigiGate Group
                </h2>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent" />

              <p className="text-base leading-8 text-slate-300/90">
                <strong className="font-semibold text-white">DigiGate Group</strong>{' '}
                <span className="text-brand-300">[WBN – UAE Based &amp; Soft Tech London – UK Based]</span> has been
                established in 2012 with a vision to build an ecosystem that integrates a comprehensive set of
                capabilities with a network of leading business technology providers and innovative business consulting
                firms, where the pillars of development, proficiency, and enrichment create the necessary force to push
                businesses toward success.
              </p>
              <p className="text-base leading-8 text-slate-300/90">
                This has been achieved only by working closely with several technology partners around the world.
              </p>
            </motion.div>

            {/* Rolling carousel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <RollingCarousel images={slideImages} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 — expertise + second carousel */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Reverse on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <RollingCarousel images={expertiseImages} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="order-1 lg:order-2 space-y-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Our Expertise</p>
              <p className="text-base leading-8 text-slate-300/90">
                With professional practices and high-level of expertise, the road to success is easily completed with
                DigiGate Group, where risks are reduced, business issues are challenged, and digital transformation
                platform and solutions [<strong className="text-white">DigiGate Digital Platform</strong> and{' '}
                <strong className="text-white">DigiGate AI</strong>] are introduced through the latest technologies.
              </p>
              <p className="text-base leading-8 text-slate-300/90">
                DigiGate will stop at nothing but to aid you in achieving all your business objectives and to go
                digital smoothly and effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 — value proposition cards */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Our Commitment</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Your Digital Transformation <span className="text-gradient">Partner</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                Icon: Compass,
                title: 'Clear Digital Approach',
                text: 'Our advanced digital transformation business solutions and industry-specific expertise will present a very clear approach to guide you face any challenges your business may encounter to go digital.',
                spin: true,
                color: 'from-brand-400 to-cyan-400',
                glow: 'shadow-brand-500/40',
              },
              {
                Icon: TrendingUp,
                title: 'Increased Efficiency',
                text: 'Consequently increase your business efficiency, enabling you to take full advantage of all your opportunities and granting your business long-term success.',
                spin: false,
                color: 'from-emerald-400 to-brand-400',
                glow: 'shadow-emerald-500/40',
              },
              {
                Icon: Users,
                title: 'Client-Centric Goals',
                text: "At DigiGate Group, our goals revolve around catering to our clients' needs and addressing all challenges head on during their digital transformation journey.",
                spin: false,
                color: 'from-accent-400 to-pink-400',
                glow: 'shadow-accent-500/40',
              },
              {
                Icon: Globe,
                title: 'Global Technology Network',
                text: 'Working closely with several technology partners around the world, we bring global best practices to every engagement — from strategy through to deployment.',
                spin: true,
                color: 'from-cyan-400 to-accent-400',
                glow: 'shadow-cyan-500/40',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-xl shadow-black/10 hover:border-white/20 transition-colors"
              >
                {/* Animated icon */}
                <motion.div
                  animate={card.spin
                    ? { rotate: 360 }
                    : { y: [0, -4, 0] }
                  }
                  transition={card.spin
                    ? { duration: 8, repeat: Infinity, ease: 'linear' }
                    : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg ${card.glow}`}
                >
                  <card.Icon className="h-6 w-6 text-white drop-shadow" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
