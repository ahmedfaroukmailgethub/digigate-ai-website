import { motion } from 'framer-motion'
import { BriefcaseBusiness, Loader2, Mail, Send } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { getApplicationSubmissions, subscribeToApplicationSubmissions } from '../data/applicationSubmissions'

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
}

export default function CTA() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [applications, setApplications] = useState(() => getApplicationSubmissions())

  useEffect(() => subscribeToApplicationSubmissions(() => setApplications(getApplicationSubmissions())), [])

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (status !== 'submitting') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Unable to save contact request')
      }

      setForm(initialForm)
      setStatus('success')
      setFeedback('Thanks. Your request has been saved and our team will contact you shortly.')
    } catch {
      setStatus('error')
      setFeedback('We could not save your request. Please try again in a moment.')
    }
  }

  return (
    <section id="cta" className="py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center glow-ring"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600" />
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=70"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <motion.div
            className="absolute inset-0 -z-10 opacity-40"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 35%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2), transparent 35%)',
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 -z-10 grid-bg opacity-20" />

          <div className="mx-auto grid max-w-6xl gap-10 text-left lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                <Mail className="h-3.5 w-3.5" />
                Contact us
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Ready to start your transformation program?
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                Tell us what you want to transform. We will save your request and route it to the right DigiGate team.
              </p>

              <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 text-white/85">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Submitted applications
                  </span>
                  <span className="font-display text-2xl font-bold text-white">{applications.length}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {applications.length > 0 ? (
                    applications.slice(0, 3).map((application) => (
                      <div key={application.id} className="rounded-xl bg-[#05060f]/45 p-3">
                        <p className="text-sm font-semibold text-white">{application.fullName}</p>
                        <p className="mt-1 text-xs leading-5 text-white/65">{application.role}</p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl bg-[#05060f]/35 p-3 text-sm leading-6 text-white/65">
                      Career applications submitted from the careers page will appear here.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/15 bg-[#05060f]/55 p-5 shadow-2xl shadow-black/25 backdrop-blur md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-white/85">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/15"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium text-white/85">
                  Work email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/15"
                    placeholder="name@company.com"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium text-white/85">
                Company
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(event) => updateField('company', event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/15"
                  placeholder="Organisation name"
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-white/85">
                What would you like to discuss?
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  required
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/15"
                  placeholder="Briefly describe your program or service need"
                />
              </label>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className={`min-h-5 text-sm ${status === 'error' ? 'text-red-200' : 'text-white/70'}`} role="status">
                  {feedback}
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === 'submitting' ? 'Saving' : 'Send request'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
