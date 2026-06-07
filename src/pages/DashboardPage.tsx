import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderOpen, LogOut, PlayCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import BinaryFloat from '../components/BinaryFloat'
import { getApplicationSubmissions, subscribeToApplicationSubmissions } from '../data/applicationSubmissions'
import { clearAuthentication } from './LoginPage'

const agenda = [
  'DigiGate Education Platform -\nEducational Institutions',
  'DigiGate Education Platform -\nOpen Platform [ Students & Teachers ]',
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [, setApplications] = useState(() => getApplicationSubmissions())

  useEffect(() => subscribeToApplicationSubmissions(() => setApplications(getApplicationSubmissions())), [])

  const handleLogout = () => {
    clearAuthentication()
    navigate('/login', { replace: true })
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] pt-28 pb-16 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <BinaryFloat />
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">Platform</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Executive Demos</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              Quick demo for DigiGate Products, Engines, Modules and Tools
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


        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/58 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Products</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">DigiGate Products Demo</h2>
              </div>
              <PlayCircle className="h-5 w-5 text-brand-300" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                { name: 'Documents Management System', href: '/products/documents-management-system' },
                { name: 'Correspondence Management System', href: '/products/correspondence-management-system' },
                { name: 'Records Management System', href: '/products/records-management-system' },
                { name: 'Workflow Engine', href: '/products/workflow-engine' },
                { name: 'Information Right Management System', href: '/products/information-right-management-system' },
                { name: 'Standard Capture Tool', href: '/products/standard-capture-tool' },
                { name: 'Advanced Viewer Tool', href: '/products/advanced-viewer-tool' },
                { name: 'Data Storage Optimization Tool', href: '/products/data-storage-optimization-tool' },
                { name: 'Integration Enabler Module', href: '/products/integration-enabler-module' },
                { name: 'Artificial Intelligence Engines', href: '/products/artificial-intelligence-engines' },
                { name: 'Intelligent Automation Module', href: '/products/intelligent-automation-module' },
                { name: 'Intelligent Documents Recognition Engine', href: '/products/intelligent-documents-recognition-engine' },
                { name: 'Intelligent Document Capture Module', href: '/products/intelligent-document-capture-module' },
                { name: 'Intelligent Data Extraction Module', href: '/products/intelligent-data-extraction-module' },
                { name: 'Intelligent Document Exporting Module', href: '/products/intelligent-document-exporting-module' },
                { name: 'Intelligent Documents Classification Engine', href: '/products/intelligent-documents-classification-engine' },
                { name: 'Voice Recognition Engine', href: '/products/voice-recognition-engine' },
                { name: 'Education Platform', href: '/products/education-platform' },
              ].map((product) => (
                <div key={product.name} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <Link
                    to={product.href}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Open Demo
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-6 shadow-xl shadow-emerald-500/10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Demo</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Active Demo Environment</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-emerald-50/75">
                Open the live DigiGate demo environment for product walkthroughs and stakeholder reviews.
              </p>
              <div className="mt-5 space-y-5">
                {agenda.map((item, i) => (
                  <div key={item} className="space-y-2">
                    <motion.div
                      className="relative flex gap-3 rounded-xl bg-violet-300/30 p-3 text-sm text-white whitespace-pre-line overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(167,139,250,0.0)',
                          '0 0 24px 4px rgba(167,139,250,0.55)',
                          '0 0 0 0 rgba(167,139,250,0.0)',
                        ],
                        backgroundColor: [
                          'rgba(196,181,253,0.28)',
                          'rgba(196,181,253,0.45)',
                          'rgba(196,181,253,0.28)',
                        ],
                      }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                    >
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        animate={{ x: ['0%', '500%'] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
                      />
                      <motion.div
                        animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        className="mt-0.5 shrink-0"
                      >
                        <ArrowUpRight className="h-4 w-4 text-violet-100 drop-shadow-[0_0_6px_rgba(196,181,253,0.85)]" />
                      </motion.div>
                      <span className="relative">{item}</span>
                      <motion.span
                        aria-hidden="true"
                        className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-rose-500/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Live
                      </motion.span>
                    </motion.div>
                    <a
                      href="https://demo.digigate.ai"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/20"
                      aria-label="Open demo environment"
                    >
                      Open demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-1 items-center justify-center">
                <img
                  src="/DigiGate_AI_Logo-removebg-preview.png"
                  alt="DigiGate AI"
                  className="h-20 w-auto object-contain opacity-90"
                />
              </div>
            </div>

            <Link to="/workspace" className="group flex flex-col rounded-2xl border border-white/10 bg-[rgb(200,219,255)] p-6 text-slate-950 shadow-xl shadow-brand-500/20 transition hover:-translate-y-0.5 hover:shadow-brand-400/30">
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
              <div className="mt-6 flex flex-1 items-center justify-center">
                <img
                  src="/DigiGate-R-Frame-removebg.png"
                  alt="DigiGate ® Digital Transformation Platform"
                  className="h-[14.85rem] w-auto object-contain"
                  style={{ background: 'transparent' }}
                />
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}