import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, CalendarDays, CheckCircle2, FileText, FolderOpen, LogOut, Mail, ShieldAlert, UsersRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getApplicationSubmissions, subscribeToApplicationSubmissions } from '../data/applicationSubmissions'
import { clearAuthentication } from './LoginPage'

const metrics = (applicationCount: number) => [
  { label: 'Revenue growth', value: '18.4%', note: 'Quarter over quarter', trend: '+3.2%' },
  { label: 'Active programs', value: '42', note: 'Across priority sectors', trend: '+6' },
  { label: 'Delivery health', value: '94%', note: 'On-track milestones', trend: '+4%' },
  { label: 'Applications', value: String(applicationCount), note: 'Career submissions', trend: applicationCount > 0 ? 'New' : 'None' },
]

const agenda = [
  'Approve FY26 AI investment envelope',
  'Review government sector delivery portfolio',
  'Confirm regional expansion milestones',
]

const programs = [
  { name: 'Enterprise AI Platform', owner: 'Technology Committee', status: 'On track', progress: 82 },
  { name: 'Governance Automation', owner: 'Risk Committee', status: 'Review', progress: 64 },
  { name: 'Executive Intelligence Hub', owner: 'Strategy Committee', status: 'On track', progress: 76 },
]

const todayMeetingDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date())

const formatSubmittedAt = (submittedAt: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(submittedAt))

export default function DashboardPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState(() => getApplicationSubmissions())
  const dashboardMetrics = useMemo(() => metrics(applications.length), [applications.length])

  useEffect(() => subscribeToApplicationSubmissions(() => setApplications(getApplicationSubmissions())), [])

  const handleLogout = () => {
    clearAuthentication()
    navigate('/login', { replace: true })
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] pt-28 pb-16 lg:pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">Platform</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Executive overview</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              A concise view of performance, governance priorities, and decisions ready for executive attention.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-slate-300">{metric.label}</p>
                <span className="rounded-lg bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">{metric.trend}</span>
              </div>
              <p className="mt-5 font-display text-4xl font-bold text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-500">{metric.note}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/58 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Portfolio health</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Strategic programs</h2>
              </div>
              <BarChart3 className="h-5 w-5 text-brand-300" />
            </div>

            <div className="mt-6 space-y-4">
              {programs.map((program) => (
                <div key={program.name} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{program.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{program.owner}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-brand-400/10 px-3 py-1 text-xs font-semibold text-brand-200">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {program.status}
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500" style={{ width: `${program.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <Link to="/workspace" className="group rounded-2xl border border-white/10 bg-[rgb(142,179,255)] p-6 text-slate-950 shadow-xl shadow-brand-500/20 transition hover:-translate-y-0.5 hover:shadow-brand-400/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">Documents</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">My workspace</h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950/10 text-slate-950 transition group-hover:bg-slate-950/15">
                  <FolderOpen className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-800">
                Upload, open, preview, and download documents from your secure workspace.
              </p>
            </Link>

            <a href="https://demo.digigate.ai" target="_blank" rel="noreferrer" className="group rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-6 shadow-xl shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:bg-emerald-400/15 hover:shadow-emerald-400/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Demo</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">Active Demo Environment</h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-300/10 text-emerald-200 transition group-hover:bg-emerald-300/15">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-emerald-50/75">
                Open the live DigiGate demo environment for product walkthroughs and stakeholder reviews.
              </p>
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-brand-300" />
                <h2 className="font-display text-2xl font-bold text-white">Next meeting</h2>
              </div>
              <p className="mt-4 text-sm text-slate-400">{todayMeetingDate} at 10:00 GST</p>
              <div className="mt-5 space-y-3">
                {agenda.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl bg-slate-950/55 p-3 text-sm text-slate-300">
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Talent</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">Submitted applications</h2>
                </div>
                <UsersRound className="h-5 w-5 text-brand-300" />
              </div>

              <div className="mt-5 space-y-3">
                {applications.length > 0 ? (
                  applications.slice(0, 4).map((application) => (
                    <div key={application.id} className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{application.fullName}</h3>
                          <p className="mt-1 text-sm text-brand-200">{application.role}</p>
                        </div>
                        <span className="w-fit rounded-lg bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                          {formatSubmittedAt(application.submittedAt)}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-brand-300" />
                          {application.email}
                        </span>
                        <span>{application.location}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-950/45 p-4 text-sm leading-6 text-slate-400">
                    No career applications have been submitted yet. New applications will appear here automatically.
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: FileText, label: 'Executive papers', value: '12 ready' },
                { icon: ShieldAlert, label: 'Risk actions', value: '3 open' },
                { icon: UsersRound, label: 'Committee updates', value: '5 posted' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-1 font-semibold text-white">{item.value}</p>
                    </div>
                    <Icon className="h-5 w-5 text-brand-300" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}