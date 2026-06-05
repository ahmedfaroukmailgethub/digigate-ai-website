import { Link } from 'react-router-dom'
import Logo from './Logo'
import { sectors } from '../data/sectors'

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo src="/DigiGate_AI_Logo-removebg-preview.png" large />
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              A turnkey technology partner — strategy, engineering, AI, infrastructure,
              and 24/7 operations under one accountable team.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-sm font-semibold text-white">Sectors</p>
              <ul className="mt-4 space-y-2.5">
                {sectors.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/sectors/${s.slug}`} className="text-sm text-slate-400 hover:text-white transition">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Services</p>
              <ul className="mt-4 space-y-2.5">
                {serviceLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-400 hover:text-white transition">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Company</p>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-400 hover:text-white transition">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Digigate AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
