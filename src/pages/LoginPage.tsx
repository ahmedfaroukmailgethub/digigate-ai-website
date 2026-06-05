import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LockKeyhole, LogIn, ShieldCheck, UserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const VALID_USERNAME = 'Admin'
const VALID_PASSWORD = 'Wbncorp'
const AUTH_STORAGE_KEY = 'digigate-authenticated'

const containerMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

const itemMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function clearAuthentication() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = typeof location.state === 'object' && location.state !== null && 'from' in location.state
    ? String(location.state.from)
    : '/dashboard'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      navigate(redirectTo, { replace: true })
      return
    }

    setError('Username or password is incorrect.')
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden pt-28 pb-20 lg:pt-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05060f] via-[#071027] to-[#05060f]" />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <motion.div
          variants={containerMotion}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={itemMotion} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Login
          </motion.div>
          <motion.div variants={itemMotion} className="relative mt-8 h-[230px] max-w-xl sm:h-[280px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-28 w-[340px] rounded-full bg-brand-500/20 blur-[60px] sm:h-36 sm:w-[480px]"
                animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[185px] w-[300px] rounded-full border border-white/10 sm:h-[245px] sm:w-[410px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[150px] w-[330px] rounded-full border border-brand-300/20 sm:h-[205px] sm:w-[470px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <motion.img
                src="/logo-infinity.png"
                alt="Digigate infinity logo"
                className="w-[360px] max-w-none drop-shadow-[0_30px_70px_rgba(91,138,255,0.32)] sm:w-[520px]"
                animate={{ y: [-8, 8, -8], scale: [1, 1.035, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.div
              className="absolute bottom-5 left-1/2 h-px w-[260px] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent sm:w-[390px]"
              animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.h1 variants={itemMotion} className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Secure access to <span className="text-gradient">the platform</span>
          </motion.h1>
          <motion.p variants={itemMotion} className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Review executive performance, transformation progress, and governance signals from one focused platform.
          </motion.p>

          <motion.div variants={containerMotion} className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Strategy', 'Risk', 'Performance'].map((item) => (
              <motion.div
                key={item}
                variants={itemMotion}
                whileHover={{ y: -3, borderColor: 'rgba(142,179,255,0.45)', backgroundColor: 'rgba(255,255,255,0.07)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          whileHover={{ y: -4, borderColor: 'rgba(142,179,255,0.24)' }}
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950/78 p-6 shadow-2xl shadow-black/35 backdrop-blur md:p-8"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/80 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div variants={containerMotion} initial="hidden" animate="show" className="relative">
          <div className="mb-7">
            <motion.div
              variants={itemMotion}
              animate={{ boxShadow: ['0 12px 36px rgba(53,99,255,0.18)', '0 18px 44px rgba(147,51,234,0.28)', '0 12px 36px rgba(53,99,255,0.18)'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white"
            >
              <LockKeyhole className="h-5 w-5" />
            </motion.div>
            <motion.h2 variants={itemMotion} className="mt-5 font-display text-2xl font-bold text-white">Login</motion.h2>
            <motion.p variants={itemMotion} className="mt-2 text-sm leading-6 text-slate-400">Enter your credentials to continue.</motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.label variants={itemMotion} className="block text-sm font-medium text-slate-200">
              User name
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 transition focus-within:border-brand-300/60 focus-within:bg-white/[0.075]">
                <UserRound className="h-4 w-4 shrink-0 text-brand-300" />
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="User name"
                  required
                />
              </span>
            </motion.label>

            <motion.label variants={itemMotion} className="block text-sm font-medium text-slate-200">
              Password
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 transition focus-within:border-brand-300/60 focus-within:bg-white/[0.075]">
                <LockKeyhole className="h-4 w-4 shrink-0 text-brand-300" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </motion.label>

            <p className="min-h-5 text-sm text-red-200" role="alert">
              {error}
            </p>

            <motion.button
              variants={itemMotion}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:shadow-brand-500/40"
            >
              <LogIn className="h-4 w-4" />
              Login
            </motion.button>
          </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}