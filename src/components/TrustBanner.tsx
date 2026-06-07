import { motion } from 'framer-motion'

export default function TrustBanner() {
  return (
    <div className="w-full bg-brand-600/10 border-y border-white/5 py-3 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap items-center gap-12 font-display text-sm tracking-widest uppercase text-slate-400"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            <span>Enterprise Grade</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Certified Engineers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            <span>99.99% Guaranteed SLA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Global Delivery Network</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>100%-Trust Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
