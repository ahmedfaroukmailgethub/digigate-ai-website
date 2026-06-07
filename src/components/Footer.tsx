import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Logo from './Logo'

const serviceLinks = [
  { label: 'Strategy & Advisory', href: '/services#strategy-advisory' },
  { label: 'Engineering & Integration', href: '/services#engineering-integration' },
  { label: 'AI & Data', href: '/services#ai-data' },
  { label: 'Cloud & Infrastructure', href: '/services#cloud-infrastructure' },
  { label: 'Managed Operations', href: '/services#managed-operations' },
]
const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Customers', href: '#' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/#cta' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-2 pb-6">
        {/* Top row: brand + CTA buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex flex-col gap-3 max-w-md">
            <Logo src="/DigiGate_AI_Logo-removebg-preview.png" large />
            <p className="text-sm text-slate-400">
              A turnkey technology partner — strategy, engineering, AI, infrastructure,
              and 24/7 operations under one accountable team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div
              animate={{ boxShadow: [
                '0 0 0 0 rgba(91,138,255,0.55)',
                '0 0 32px 6px rgba(91,138,255,0.55)',
                '0 0 0 0 rgba(91,138,255,0.55)',
              ] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl"
            >
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 bg-[length:200%_100%] px-5 py-3 text-sm font-semibold text-white transition-[background-position] duration-700 hover:bg-[position:100%_0]"
              >
                Explore our services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              animate={{ boxShadow: [
                '0 0 0 0 rgba(251,191,36,0.55)',
                '0 0 32px 6px rgba(251,191,36,0.55)',
                '0 0 0 0 rgba(251,191,36,0.55)',
              ] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="rounded-xl"
            >
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-[length:200%_100%] px-5 py-3 text-sm font-semibold text-slate-950 transition-[background-position] duration-700 hover:bg-[position:100%_0]"
              >
                Explore DigiGate Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} DigiGate AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
