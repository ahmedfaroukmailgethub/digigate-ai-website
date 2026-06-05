import { Github, Twitter, Linkedin } from 'lucide-react'
import Logo from './Logo'

const cols = [
  {
    title: 'Product',
    links: ['Platform', 'Agents', 'Vision', 'Analytics', 'Pricing'],
  },
  {
    title: 'Solutions',
    links: ['Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Government'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'API Reference', 'Blog', 'Changelog', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Contact', 'Press'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              The unified AI platform for the modern enterprise. Build agents,
              ship vision, and forecast the future.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg glass hover:bg-white/10 transition"
                  aria-label="social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-400 hover:text-white transition">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Digigate AI, Inc. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
