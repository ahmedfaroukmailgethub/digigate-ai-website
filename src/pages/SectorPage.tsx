import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { getSector, sectors } from '../data/sectors'
import { SectorIcon } from '../components/SectorIcon'
import NotFoundPage from './NotFoundPage'

const benefitCardStyles = [
  {
    dot: 'bg-brand-400',
    activeDot: 'bg-gradient-to-r from-brand-500 to-accent-500',
    badge: 'from-brand-500 to-accent-500',
    label: 'text-slate-950',
    body: 'text-slate-600',
    control: 'hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600',
  },
  {
    dot: 'bg-accent-400',
    activeDot: 'bg-gradient-to-r from-brand-500 to-accent-500',
    badge: 'from-brand-500 to-accent-500',
    label: 'text-slate-950',
    body: 'text-slate-600',
    control: 'hover:border-accent-300 hover:bg-accent-50 hover:text-accent-600',
  },
]

function BenefitSlideDeck({ benefits }: { benefits: { title: string; desc: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const activeBenefit = benefits[activeIndex]
  const cardStyle = benefitCardStyles[activeIndex % benefitCardStyles.length]

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1)
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    setDirection(-1)
    setActiveIndex((current) => (current === 0 ? benefits.length - 1 : current - 1))
  }

  const next = () => {
    setDirection(1)
    setActiveIndex((current) => (current === benefits.length - 1 ? 0 : current + 1))
  }

  useEffect(() => {
    if (benefits.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current === benefits.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => window.clearInterval(timer)
  }, [benefits.length])

  return (
    <div className="mt-7">
      <div className="relative min-h-[280px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeBenefit.title}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -36, scale: 0.98 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4 md:gap-5">
                  <span className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${cardStyle.badge} shrink-0 shadow-lg shadow-black/25`}>
                    <span className="text-sm font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-start gap-2">
                      <span className={`mt-2.5 h-2 w-2 rounded-full ${cardStyle.dot} shrink-0`} />
                      <h4 className={`font-display text-2xl font-semibold leading-tight ${cardStyle.label}`}>{activeBenefit.title}</h4>
                    </div>
                    <p className={`mt-5 max-w-2xl text-base leading-8 ${cardStyle.body}`}>{activeBenefit.desc}</p>
                  </div>
                </div>
                <p className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {activeIndex + 1}/{benefits.length}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-6">
                <div className="flex gap-2" aria-label="Benefit slides">
                  {benefits.map((benefit, index) => {
                    const dotStyle = benefitCardStyles[index % benefitCardStyles.length]
                    return (
                      <button
                        key={benefit.title}
                        type="button"
                        onClick={() => goTo(index)}
                        className={`h-2.5 rounded-full transition-all ${activeIndex === index ? `w-8 ${dotStyle.activeDot}` : 'w-2.5 bg-slate-300 hover:bg-slate-500'}`}
                        aria-label={`Show benefit ${index + 1}: ${benefit.title}`}
                        aria-current={activeIndex === index}
                      />
                    )
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    className={`grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition ${cardStyle.control}`}
                    aria-label="Previous benefit"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className={`grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition ${cardStyle.control}`}
                    aria-label="Next benefit"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function CollaboratorSlider({
  collaborators,
}: {
  collaborators: { name: string; url: string; logo: string; description: string }[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const activePartner = collaborators[activeIndex]

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1)
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    setDirection(-1)
    setActiveIndex((current) => (current === 0 ? collaborators.length - 1 : current - 1))
  }

  const next = () => {
    setDirection(1)
    setActiveIndex((current) => (current === collaborators.length - 1 ? 0 : current + 1))
  }

  useEffect(() => {
    if (collaborators.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current === collaborators.length - 1 ? 0 : current + 1))
    }, 4500)

    return () => window.clearInterval(timer)
  }, [collaborators.length])

  return (
    <div className="mt-12">
      <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.a
            key={activePartner.name}
            href={activePartner.url}
            target="_blank"
            rel="noreferrer"
            custom={direction}
            initial={{ opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -48 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 grid gap-0 md:grid-cols-12"
          >
            <div className="grid place-items-center bg-slate-50 p-8 md:col-span-7 md:p-12">
              <img
                src={activePartner.logo}
                alt={`${activePartner.name} logo`}
                loading="lazy"
                className="max-h-48 max-w-[86%] object-contain md:max-h-60"
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:col-span-5 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600">
                {String(activeIndex + 1).padStart(2, '0')} / {String(collaborators.length).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-950">{activePartner.name}</h3>
              <p className="mt-5 text-base leading-8 text-slate-600">{activePartner.description}</p>
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-label="Collaborator slides">
          {collaborators.map((partner, index) => (
            <button
              key={partner.name}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${activeIndex === index ? 'w-9 bg-gradient-to-r from-brand-500 to-accent-500' : 'w-2.5 bg-slate-300 hover:bg-slate-500'}`}
              aria-label={`Show collaborator ${index + 1}: ${partner.name}`}
              aria-current={activeIndex === index}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600"
            aria-label="Previous collaborator"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600"
            aria-label="Next collaborator"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SectorPage() {
  const { slug } = useParams()
  const sector = getSector(slug)
  if (!sector) return <NotFoundPage />

  const others = sectors.filter((s) => s.slug !== sector.slug)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <motion.div
            className={`absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 bg-gradient-to-br ${sector.accent}`}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={`absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 bg-gradient-to-br ${sector.accent}`}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/sectors"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={14} /> All sectors
          </Link>

          <div className="mt-6 grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass`}>
                <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${sector.accent}`} />
                <span className="text-sm text-slate-200">{sector.name}</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
                {sector.tagline.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-gradient">{sector.tagline.split(' ').slice(-2).join(' ')}</span>
              </h1>
              <p className="mt-5 text-lg text-slate-300/90">{sector.hero}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 glow-ring"
                >
                  Discuss your program
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#case-study"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-100 glass hover:bg-white/5 transition"
                >
                  See case study
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden glass">
                <div className="relative aspect-[4/5]">
                  <img
                    src={sector.image}
                    alt={sector.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${sector.accent} opacity-30 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">Outcomes our clients see</p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {sector.outcomes.map((o) => (
                        <div key={o.label} className="rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 p-3 text-center">
                          <p className="font-display text-[clamp(1.15rem,2vw,1.5rem)] leading-tight font-bold text-gradient break-words">{o.value}</p>
                          <p className="mt-1 text-[10px] text-slate-300 leading-snug">{o.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-300/85">{sector.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 lg:py-24 bg-slate-50 text-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(53,99,255,0.10),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(168,85,247,0.10),transparent_30%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-brand-600">Challenges</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              The problems we solve
            </h2>
            <p className="mt-4 text-slate-600">
              Every {sector.name.toLowerCase()} program we deliver tackles a familiar
              set of root causes — with proven, end-to-end remedies.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {sector.challenges.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/80 overflow-hidden transition hover:border-brand-300/50 hover:shadow-xl hover:shadow-brand-100/60"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-10 bg-gradient-to-br from-brand-500 to-accent-500 transition-opacity group-hover:opacity-20" />
                <div className="flex items-start gap-3 relative">
                  <span className="mt-1 grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 shrink-0 shadow-lg shadow-brand-200/70">
                    <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed">{c}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-24 relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Our programs</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Turnkey programs for {sector.name.toLowerCase()}
            </h2>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {sector.solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl glass relative overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 w-44 h-44 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${sector.accent} transition-opacity group-hover:opacity-50`} />
                <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${sector.accent} opacity-60`} />
                {sol.image && (
                  <div className="relative h-48 overflow-hidden border-b border-white/10">
                    <img
                      src={sol.image}
                      alt={sol.imageAlt ?? sol.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${sector.accent} opacity-20 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/80 via-transparent to-transparent" />
                    <span className={`absolute left-5 bottom-5 inline-grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br ${sector.accent} shadow-lg shadow-black/30`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </span>
                  </div>
                )}
                <div className="relative p-6">
                  {!sol.image && (
                    <span className={`inline-grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br ${sector.accent} shadow-lg shadow-black/30`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </span>
                  )}
                  <h3 className={`${sol.image ? '' : 'mt-4'} font-display text-lg font-semibold`}>{sol.title}</h3>
                  <p className="mt-2 text-sm text-slate-300/85 leading-relaxed">{sol.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {sector.benefitGroups && (
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent-400">Specific benefits</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                {sector.name === 'Education' ? 'Digigate AI across SIS and LMS' : `How ${sector.name.toLowerCase()} teams benefit`}
              </h2>
              <p className="mt-4 text-slate-300/90">
                A practical view of the workflows, decisions, and daily experiences improved by the platform.
              </p>
            </motion.div>

            <div className="mt-12 space-y-8">
              {sector.benefitGroups.map((group, groupIndex) => (
                <motion.article
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
                  className="grid md:grid-cols-12 gap-0 rounded-3xl glass overflow-hidden"
                >
                  <div className={`relative min-h-[300px] md:col-span-5 ${groupIndex === 1 ? 'md:order-2' : 'md:order-1'}`}>
                    <img
                      src={group.image}
                      alt={group.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${sector.accent} opacity-25 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/20 to-transparent" />
                    <div className="absolute left-6 right-6 bottom-6">
                      <span className={`inline-grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${sector.accent} shadow-lg shadow-black/30`}>
                        <Sparkles className="w-5 h-5 text-white" />
                      </span>
                      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/75">{group.eyebrow}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{group.title}</h3>
                    </div>
                  </div>

                  <div className={`md:col-span-7 ${groupIndex === 1 ? 'md:order-1' : 'md:order-2'} bg-white text-slate-950 p-6 md:p-8 lg:p-10`}>
                    <p className="text-slate-600 leading-relaxed">{group.summary}</p>
                    <BenefitSlideDeck benefits={group.benefits} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sector.collaborators && (
        <section className="py-20 lg:py-24 relative overflow-hidden bg-slate-50 text-slate-950">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(53,99,255,0.10),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.10),transparent_32%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600">Collaborate with</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                Education institutions and knowledge partners
              </h2>
              <p className="mt-4 text-slate-600">
                Digigate AI is positioned to support institutions that advance learning, research, culture, and student success across the region.
              </p>
            </motion.div>

            <CollaboratorSlider collaborators={sector.collaborators} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`rounded-3xl p-10 md:p-14 text-center relative overflow-hidden bg-gradient-to-br ${sector.accent}`}>
            <img
              src={sector.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Ready to start your {sector.name.toLowerCase()} program?
            </h2>
            <p className="mt-3 text-white/85 max-w-xl mx-auto">
              Talk to our experts about your specific challenges. We'll come back with a roadmap and a delivery plan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-100 transition">
                Book a discovery call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other sectors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Other sectors</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/sectors/${o.slug}`}
                className="group rounded-xl p-4 glass hover:border-brand-400/40 transition flex items-center gap-3"
              >
                <span className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10 transition group-hover:ring-brand-300/50">
                  <img
                    src={o.image}
                    alt={o.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover brightness-50 transition duration-300 group-hover:brightness-75 group-hover:saturate-125"
                  />
                  <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/15" />
                  <span className={`absolute inset-0 bg-gradient-to-br ${o.accent} mix-blend-multiply opacity-45 transition group-hover:opacity-70`} />
                  <span className="absolute inset-0 grid place-items-center">
                    <SectorIcon iconKey={o.iconKey} className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                  </span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{o.name}</p>
                  <p className="text-xs text-slate-400 truncate">{o.tagline}</p>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
