import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogIn, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { sectors } from '../data/sectors'
import { SectorIcon } from './SectorIcon'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Careers', href: '/careers' },
]

const aboutLinks = [
  { label: 'About DigiGate',       href: '/about' },
  { label: 'DigiGate Intro',       href: '/about/intro' },
  { label: 'DigiGate Values',      href: '/about/values' },
  { label: 'DigiGate Philosophy',  href: '/about/philosophy' },
  { label: 'DigiGate Vision',      href: '/about/vision' },
  { label: 'DigiGate Mission',     href: '/about/mission' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [sectorsOpen, setSectorsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const location = useLocation()
  const [primaryLink, ...secondaryLinks] = links

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSectorsOpen(false)
    setAboutOpen(false)
  }, [location.pathname])

  const solid = scrolled || location.pathname !== '/'

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center self-stretch pr-3 border-r border-slate-200/60">
            <img src="/softtech-logo.png" alt="SoftTech London Logo" className="h-[53px] w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center pr-3 border-r border-slate-200">
            <img src="/wbn-logo-hd.jpg" alt="WBN Logo" className="h-14 w-auto object-contain" />
          </div>
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-1">
          <a
            href={primaryLink.href}
            className="relative px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
          >
            {primaryLink.label}
            <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-brand-400 to-accent-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
          </a>

          <div
            className="relative"
            onMouseEnter={() => setSectorsOpen(true)}
            onMouseLeave={() => setSectorsOpen(false)}
          >
            <NavLink
              to="/sectors"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors ${
                  isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Sectors
              <ChevronDown size={14} className={`transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
            </NavLink>
            <AnimatePresence>
              {sectorsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[420px]"
                >
                  <div className="rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-black/60">
                    {sectors.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/sectors/${s.slug}`}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-brand-500/10 transition-colors"
                      >
                        <span className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 ring-1 ring-white/10 transition group-hover:ring-brand-300/50">
                          <img
                            src={s.image}
                            alt={s.imageAlt}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover brightness-50 transition duration-300 group-hover:brightness-75 group-hover:saturate-125"
                          />
                          <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/15" />
                          <span className={`absolute inset-0 bg-gradient-to-br ${s.accent} mix-blend-multiply opacity-45 transition group-hover:opacity-70`} />
                          <span className="absolute inset-0 grid place-items-center">
                            <SectorIcon iconKey={s.iconKey} className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                          </span>
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white transition-colors group-hover:text-brand-100">{s.name}</p>
                          <p className="text-xs text-slate-400 truncate transition-colors group-hover:text-slate-200">{s.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors ${
                  isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              About
              <ChevronDown size={14} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
            </NavLink>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                >
                  <div className="rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-black/60">
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-brand-500/10 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {secondaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
            >
              {l.label}
              <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-brand-400 to-accent-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-500 hover:shadow-lg hover:shadow-brand-500/30 transition-shadow"
          >
            <LogIn className="h-4 w-4" />
            Login
          </a>
        </div>

        <button
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <a href={primaryLink.href} className="px-2 py-3 text-slate-600 hover:text-slate-900 border-b border-slate-100">
                {primaryLink.label}
              </a>
              <Link to="/sectors" className="px-2 py-3 text-slate-600 hover:text-slate-900 border-b border-slate-100">
                All sectors
              </Link>
              {sectors.map((s) => (
                <Link
                  key={s.slug}
                  to={`/sectors/${s.slug}`}
                  className="flex items-center gap-3 px-2 py-3 text-slate-600 hover:text-slate-900 border-b border-slate-100"
                >
                  <SectorIcon iconKey={s.iconKey} className="w-4 h-4 text-brand-300" />
                  <span>{s.name}</span>
                </Link>
              ))}
              <p className="px-2 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">About</p>
              {aboutLinks.map((item) => (
                <Link key={item.href} to={item.href} className="px-4 py-2.5 text-slate-600 hover:text-slate-900 border-b border-slate-100 block">
                  {item.label}
                </Link>
              ))}
              {secondaryLinks.map((l) => (
                <a key={l.href} href={l.href} className="px-2 py-3 text-slate-600 hover:text-slate-900 border-b border-slate-100">
                  {l.label}
                </a>
              ))}
              <a
                href="/login"
                className="mt-3 text-center px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-brand-500 to-accent-500"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
