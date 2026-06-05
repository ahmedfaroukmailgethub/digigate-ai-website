import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  Compass,
  Cpu,
  Gauge,
  Headphones,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 'strategy-advisory',
    number: '01',
    icon: Compass,
    title: 'Strategy & Advisory',
    short: 'Business value drivers, TOM, governance, and digital roadmap design.',
    approach: 'We move beyond "AI for AI\'s sake" by aligning roadmaps to measurable business value drivers.',
    delivery:
      'We define the target operating model, governance, talent plan, and prioritized transformation roadmap your teams can execute with confidence.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Consulting team planning a digital roadmap with notes and laptops',
    accent: 'from-sky-500 to-cyan-400',
    tags: ['TOM', 'Roadmaps', 'Governance'],
  },
  {
    id: 'ai-data',
    number: '02',
    icon: Brain,
    title: 'AI & Data',
    short: 'Production data pipelines, RAG, LLM enablement, and predictive analytics.',
    approach: 'We take AI from experimental pilots to essential capabilities embedded in daily operations.',
    delivery:
      'We build governed data foundations, production-grade pipelines, RAG systems, LLM workflows, and predictive analytics that teams can trust.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Analytics dashboard with charts and operational data',
    accent: 'from-violet-500 to-fuchsia-400',
    tags: ['RAG', 'LLMs', 'Analytics'],
  },
  {
    id: 'cloud-infrastructure',
    number: '03',
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    short: 'Sovereign cloud, hybrid infrastructure, edge platforms, and OT/IT hardening.',
    approach: 'We design infrastructure that respects geography, latency, resilience, and security constraints.',
    delivery:
      'We deliver sovereign, hybrid, and edge patterns that bridge OT and IT while keeping critical platforms performant and hardened.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Modern data center server racks with blue lighting',
    accent: 'from-blue-500 to-brand-400',
    tags: ['Hybrid', 'Edge', 'OT/IT'],
  },
  {
    id: 'engineering-integration',
    number: '04',
    icon: Cpu,
    title: 'Engineering & Integration',
    short: 'Legacy modernization, API wrapping, product engineering, and systems integration.',
    approach: 'We modernize without breaking the backbone of your business.',
    delivery:
      'We wrap legacy systems in modern APIs, build modular applications, and connect platforms through resilient integration patterns.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Engineer working on a software platform on a laptop',
    accent: 'from-amber-400 to-rose-500',
    tags: ['APIs', 'Modernization', 'Apps'],
  },
  {
    id: 'cybersecurity-compliance',
    number: '05',
    icon: ShieldCheck,
    title: 'Cybersecurity & Compliance',
    short: 'Compliance-as-Code, RBAC, audit logs, privacy, and control frameworks.',
    approach: 'Security is built into the delivery model from architecture through operations.',
    delivery:
      'We implement Compliance-as-Code, role-based access control, immutable audit logs, privacy guardrails, and control frameworks for regulated teams.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Cybersecurity analyst reviewing secure system dashboards',
    accent: 'from-emerald-400 to-teal-500',
    tags: ['RBAC', 'Audit', 'Privacy'],
  },
  {
    id: 'managed-operations',
    number: '06',
    icon: Headphones,
    title: 'Managed Operations',
    short: '24/7 NOC/SOC, SLA-backed support, uptime, and proactive threat hunting.',
    approach: 'We keep platforms reliable after launch so internal teams can stay focused on innovation.',
    delivery:
      'Our 24/7 NOC/SOC provides application uptime, incident response, proactive threat hunting, observability, and SLA-backed support.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=75',
    imageAlt: 'Operations team reviewing live service dashboards',
    accent: 'from-brand-400 to-purple-500',
    tags: ['NOC/SOC', 'SLA', 'Uptime'],
  },
]

const deliveryModel = [
  {
    icon: Compass,
    title: 'Discover',
    desc: 'Clarify value drivers, platform constraints, security needs, and the operating model before delivery begins.',
  },
  {
    icon: Network,
    title: 'Connect',
    desc: 'Unify systems, data, cloud services, and user workflows into one accountable delivery path.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    desc: 'Design controls, access, auditability, privacy, and compliance into the platform from day one.',
  },
  {
    icon: Gauge,
    title: 'Operate',
    desc: 'Measure reliability, automate improvement, and keep services healthy after go-live.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const compactIconTileClass =
  'grid h-10 w-10 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-brand-400 to-accent-500 text-white shadow-lg shadow-brand-500/25'

const iconTileClass =
  'grid h-14 w-14 shrink-0 place-items-center rounded-[24px] bg-gradient-to-br from-brand-400 to-accent-500 text-white shadow-xl shadow-brand-500/25'

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2200&q=75"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-24"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/94 to-[#05060f]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              Services
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[76px]">
              Intelligent services for the <span className="text-gradient">modern enterprise</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300/90 md:text-xl md:leading-9">
              Digigate AI brings strategy, engineering, AI, infrastructure, security, and operations into one accountable delivery model.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#cta"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-100"
              >
                Start a services conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#service-catalog"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5 lg:pt-14"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=75"
                  alt="Enterprise team reviewing connected operations dashboards"
                  className="h-full w-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">One delivery chain</p>
                <div className="mt-5 grid gap-3">
                  {deliveryModel.map((step) => {
                    const Icon = step.icon

                    return (
                      <div key={step.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                        <span className={compactIconTileClass}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold text-white">{step.title}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="service-catalog" className="py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Service catalog</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Six connected services, one consistent standard
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:col-span-5">
              Each pillar can stand alone, but the model is strongest when strategy, build, protection, and operations move together.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon
              const imageOnRight = index === 2 || index === 3

              return (
                <motion.article
                  id={service.id}
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: index * 0.04 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-xl shadow-black/10 transition hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <div className="grid min-h-full md:grid-cols-5">
                    <div className={`relative min-h-[260px] overflow-hidden md:col-span-2 ${imageOnRight ? 'md:order-2' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover brightness-[0.68] saturate-[0.95] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.78]"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-25 mix-blend-screen`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/85 via-[#05060f]/15 to-transparent" />
                      <div className="absolute left-5 top-5 rounded-full bg-slate-950/70 px-3 py-1 text-sm font-bold text-white backdrop-blur">
                        {service.number}
                      </div>
                    </div>

                    <div className={`flex flex-col p-6 md:col-span-3 md:p-7 ${imageOnRight ? 'md:order-1' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className={iconTileClass}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <a href={`#${service.id}`} className="text-sm font-semibold text-slate-500" aria-label={`Service ${service.number}`}>
                          {service.number}
                        </a>
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{service.short}</p>

                      <div className="mt-6 border-l border-white/10 pl-5">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Approach</p>
                        <p className="mt-2 text-base font-semibold leading-7 text-white">{service.approach}</p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">{service.delivery}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">How delivery stays aligned</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              A practical model from first workshop to live operations
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-400">
              One clear method keeps every service connected, so business goals, architecture, security, and support do not drift apart.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
            {deliveryModel.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-950 shadow-xl shadow-black/10"
                >
                  <div className={iconTileClass}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-lg font-semibold text-slate-950">{step.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="relative overflow-hidden rounded-3xl p-8 text-center glow-ring md:p-14"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600" />
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=70"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
            <div className={`${iconTileClass} mx-auto`}>
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">The Digigate difference</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/85">
              We build, deploy, secure, and manage the platforms behind transformation programs, with one team accountable from strategy through operations.
            </p>
            <Link
              to="/#cta"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-slate-100"
            >
              Start a services conversation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}