import { motion } from 'framer-motion'
import { ArrowRight, Building2, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const offices = [
  {
    city: 'Milton Keynes',
    country: 'United Kingdom',
    label: 'UK Office',
    address: '100 Avebury Blvd, Milton Keynes MK9 1FH',
    image: 'https://assets.iwgplc.com/image/upload/c_fill,f_auto,h_667,q_auto,w_1000/v1/CentreImagery/5089/5089_1',
    imageAlt: 'Office building at 100 Avebury Boulevard in Milton Keynes',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    label: 'UAE Office',
    address: 'Ibn Battuta Business Gate, Sheikh Zayed Road, Jebel Ali, Dubai, UAE',
    image: '/ibn-battuta-gate.jpg',
    imageAlt: 'Ibn Battuta Business Gate in Dubai, UAE',
  },
]

const stats = [
  { value: '100+', label: 'Successful Projects' },
  { value: '50+', label: 'DigiGate Products' },
  { value: '20+', label: 'Innovated Tech Ideas' },
  { value: '4', label: 'Served Continents' },
]

const timeline = [
  {
    year: '2012',
    text: 'DigiGate founded in Dubai with a focus on intelligent document management for government.',
  },
  {
    year: '2017',
    text: 'Launched AI Solutions practice; first deployment of machine learning for a national records authority.',
  },
  {
    year: '2018',
    text: 'Expanded into education and aviation sectors; opened London offices.',
  },
  {
    year: '2019',
    text: 'Launched Workflow Automation platform; and Advanced OCR Engine for Arabic.',
  },
  {
    year: '2020',
    text: 'Accelerated growth during digital acceleration wave; delivered 25+ remote transformation programmes.',
  },
  {
    year: '2021',
    text: 'Starting the innovation center for helping our clients modernize, automate, and stay ahead in a changing digital environment.',
  },
  {
    year: '2022',
    text: 'Launched DigiGate AI Platform v1.0 — unified platform combining AI, DMS, and workflow.',
  },
  {
    year: '2023',
    text: 'Introducing the first Education Platform based on AI to shift the learning to next level.',
  },
  {
    year: '2024',
    text: 'Launched Generative AI capabilities; recognised as a leader in enterprise AI by three independent analysts.',
  },
  {
    year: '2026',
    text: 'Scalability & Future Readiness for our solutions integrated with DigiGate AI to grow with the business, allowing easy upgrades, integrations, and expansion when needed.',
  },
]

const principles = [
  {
    icon: ShieldCheck,
    title: 'Built for regulated work',
    text: 'We focus on sectors where auditability, security, resilience, and evidence matter from day one.',
    color: 'from-emerald-400 to-brand-400',
    glow: 'shadow-emerald-500/40',
    animation: { scale: [1, 1.18, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Building2,
    title: 'Designed around operations',
    text: 'Our platforms reflect how agencies, universities, airlines, and banks actually work.',
    color: 'from-brand-400 to-cyan-400',
    glow: 'shadow-brand-500/40',
    animation: { rotate: [0, -8, 8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Users,
    title: 'Delivered with adoption in mind',
    text: 'Implementation methodology and change management are treated as core product capabilities.',
    color: 'from-accent-400 to-pink-400',
    glow: 'shadow-accent-500/40',
    animation: { y: [0, -5, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <img
            src={offices[0].image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-24"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/92 to-[#05060f]/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/20 to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-end lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              About DigiGate
            </div>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[78px]">
              We build the <span className="text-gradient">intelligence</span> behind enterprise
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300/90 md:text-xl md:leading-9">
              DigiGate AI is an enterprise technology company on a singular mission: to make organisations in the world's most demanding sectors — government, education, aviation, and finance — dramatically more intelligent, efficient, and capable through the disciplined application of artificial intelligence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-100"
              >
                Explore our services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#offices"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View offices
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/72 p-5 shadow-2xl shadow-black/30 backdrop-blur">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <span className="font-display text-2xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Founded on a conviction, built on evidence
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4 text-sm leading-7 text-slate-300/90 md:text-base lg:col-span-7 text-justify"
          >
            <p>
              DigiGate was founded in Dubai in 2012, following a decade and a half spent advising governments and enterprises on technology strategy. The founding insight was straightforward but profound: the organisations that most needed the benefits of digital intelligence — public agencies, educational institutions, airlines, banks — were precisely the ones least equipped to access it.
            </p>
            <p>
              Enterprise AI, at the time, was a capability available primarily to technology companies with vast engineering resources. The platforms that existed were generic, complex, and required significant customisation before they could deliver value in regulated, document-intensive environments. The gap between the promise of AI and the reality of enterprise deployment was enormous.
            </p>
            <p>
              DigiGate was built to close that gap. From the outset, we focused exclusively on sectors where the operational complexity was highest, the regulatory requirements most demanding, and the potential impact most significant. We built AI models trained on sector-specific data. We designed workflows that reflected how government agencies, airlines, and financial institutions actually operate. We invested in implementation methodology and change management, because we understood that technology alone is never enough.
            </p>
            <p>
              A decade later, DigiGate serves over 100 projects across 8 countries, with a dedicated team members whom were dedicated to a single purpose: making our clients measurably more capable than they were before they worked with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon

              return (
                <motion.article
                  key={principle.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/10 hover:border-white/20 transition-colors"
                >
                  <motion.div
                    animate={principle.animation}
                    transition={principle.transition}
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${principle.color} text-white shadow-lg ${principle.glow}`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_16px_rgba(91,138,255,0.9)]" />
              A Decade of Progress
            </p>
            <h2 className="sr-only">A Decade of Progress</h2>
          </motion.div>

          <div className="relative mt-8 space-y-5 before:absolute before:left-[72px] before:top-2 before:h-[calc(100%-18px)] before:w-px before:bg-white/10 md:before:left-[86px]">
            {timeline.map((item, index) => {
              const active = item.year === '2026'

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.025 }}
                  className="grid grid-cols-[52px_18px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[64px_20px_minmax(0,1fr)]"
                >
                  <span
                    className={`pt-0.5 font-display text-sm font-bold transition-colors ${
                      active ? 'text-brand-300' : 'text-slate-600'
                    }`}
                  >
                    {item.year}
                  </span>
                  <span className="relative z-10 flex h-6 items-center justify-center">
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        active
                          ? 'bg-brand-400 shadow-[0_0_18px_rgba(91,138,255,0.95)] ring-4 ring-brand-500/15'
                          : 'bg-slate-700'
                      }`}
                    />
                  </span>
                  <p className={`max-w-4xl text-sm leading-6 md:text-base ${active ? 'text-slate-100' : 'text-slate-500'}`}>
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="offices" className="py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Global presence</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                HQ Offices
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:col-span-5">
              DigiGate combines regional delivery teams with international enterprise standards for clients operating across regulated markets.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {offices.map((office, index) => (
              <motion.article
                key={office.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/20 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    <MapPin className="h-3.5 w-3.5" />
                    {office.label}
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{office.country}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">{office.city}</h3>
                  <p className="mt-4 flex gap-3 text-sm leading-6 text-slate-300">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-300" />
                    <span>{office.address}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}