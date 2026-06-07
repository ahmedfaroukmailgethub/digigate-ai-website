import { motion } from 'framer-motion'
import { Compass, Cpu, Brain, Cloud, Headphones, ShieldCheck, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Compass,
    title: 'Strategy & Advisory',
    desc: 'Digital strategy, target operating model, and roadmaps grounded in business outcomes.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    color: 'from-blue-500/20 to-cyan-500/20',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Consulting team planning a digital transformation roadmap around a table',
  },
  {
    icon: Brain,
    title: 'AI & Data',
    desc: 'Generative AI, predictive analytics, and data platforms — production-grade.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    color: 'from-purple-500/20 to-pink-500/20',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=75',
    imageAlt: 'Analytics dashboard displaying data charts and business intelligence metrics',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    desc: 'Sovereign cloud, hybrid, edge, and OT/IT — designed, deployed, and hardened.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    color: 'from-sky-500/20 to-blue-500/20',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=75',
    imageAlt: 'Server racks in a modern data center',
  },
  {
    icon: Cpu,
    title: 'Engineering & Integration',
    desc: 'End-to-end build, systems integration, and modernization across legacy and modern stacks.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    color: 'from-orange-500/20 to-red-500/20',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Software engineer working on an integrated application platform',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Compliance',
    desc: 'SOC 2, GDPR, HIPAA, ICAO. Private deployments, audit logs, and granular RBAC.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    color: 'from-emerald-500/20 to-teal-500/20',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Cybersecurity analyst monitoring secure systems and compliance dashboards',
  },
  {
    icon: Headphones,
    title: 'Managed Operations',
    desc: '24/7 NOC/SOC, application management, and SLA-backed support.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    color: 'from-brand-500/20 to-accent-500/20',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=75',
    imageAlt: 'Operations team reviewing live service dashboards in a control room',
  },
]

export default function Features() {
  return (
    <section id="services" className="py-8 lg:py-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-300 uppercase tracking-wide">
            Services
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tight">
            One partner. <br/><span className="text-gradient">Every service.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            DigiGate is your single accountable partner across the entire technology value chain — from strategy to live operations.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`group relative rounded-3xl glass p-8 overflow-hidden flex flex-col justify-between ${f.colSpan} transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 cursor-pointer`}
            >
              <img
                src={f.image}
                alt={f.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.45] saturate-[0.9] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.58] group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/95 via-[#05060f]/65 to-[#05060f]/25" />
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-70 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white/50">
                <ArrowRight size={24} />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">{f.title}</h3>
              </div>
              
              <p className="relative z-10 text-slate-300/80 leading-relaxed text-sm md:text-base max-w-[90%]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
