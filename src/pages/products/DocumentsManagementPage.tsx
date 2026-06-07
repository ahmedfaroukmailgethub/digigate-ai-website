import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Sparkles } from 'lucide-react'
import BinaryFloat from '../../components/BinaryFloat'

/* ── Animated DMS Diagram ── */
function DMSDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    // Fixed Y-offset based layout — guarantees no vertical overlap
    const modules = [
      { label: 'OCR',                color: '#22d3ee', yFactor: -0.85 },
      { label: 'WORKFLOW',           color: '#5b8aff', yFactor: -0.43 },
      { label: 'VERSION CONTROL',    color: '#a855f7', yFactor:  0    },
      { label: 'DOCUMENT RETRIEVAL', color: '#ec4899', yFactor:  0.43 },
      { label: 'DOCUMENT ARCHIVING', color: '#f59e0b', yFactor:  0.85 },
    ]
    const satellites = [
      { label: 'SEARCH',    color: '#f59e0b', angleDeg: 230 },
      { label: 'META DATA', color: '#f59e0b', angleDeg: 150 },
    ]

    let tick = 0

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx!.clearRect(0, 0, W, H)
      const cx = W * 0.32, cy = H / 2
      const R = Math.min(W, H) * 0.28

      // Background
      ctx!.fillStyle = '#05060f'
      ctx!.fillRect(0, 0, W, H)

      // Draw module connections — Y-position based layout
      modules.forEach((mod, i) => {
        const my = cy + R * 1.05 * mod.yFactor
        // X-position: dot sits on the right side of the central circle
        const yOff = my - cy
        const circleR = R * 0.32
        const xOnCircle = Math.sqrt(Math.max(0, circleR * circleR - yOff * yOff))
        const mx = Math.abs(yOff) < circleR ? cx + xOnCircle + 6 : cx + R * 0.15

        // Animated dashed line
        const dashOffset = (tick * 1.5) % 20
        ctx!.setLineDash([6, 6])
        ctx!.lineDashOffset = -dashOffset
        ctx!.beginPath()
        ctx!.moveTo(cx, cy)
        ctx!.lineTo(mx, my)
        ctx!.strokeStyle = mod.color + '66'
        ctx!.lineWidth = 1.5
        ctx!.stroke()
        ctx!.setLineDash([])

        // Travelling packet
        const p = ((tick * 0.008 + i * 0.2) % 1)
        const px2 = cx + (mx - cx) * p
        const py2 = cy + (my - cy) * p
        ctx!.beginPath()
        ctx!.arc(px2, py2, 4, 0, Math.PI * 2)
        ctx!.fillStyle = mod.color
        ctx!.fill()

        // Module pill — wider, taller, bigger font
        const pw = 220, ph = 50
        const rx = mx + 18
        const ry = my - ph / 2
        const grad = ctx!.createLinearGradient(rx, ry, rx + pw, ry)
        grad.addColorStop(0, mod.color + 'dd')
        grad.addColorStop(1, mod.color + '88')
        ctx!.beginPath()
        ctx!.roundRect(rx, ry, pw, ph, 25)
        ctx!.fillStyle = grad
        ctx!.fill()
        ctx!.font = 'bold 16px sans-serif'
        ctx!.fillStyle = '#fff'
        ctx!.textAlign = 'center'
        ctx!.fillText(mod.label, rx + pw / 2, ry + ph / 2 + 6)

        // Module dot — bigger
        const pulse = 1 + Math.sin(tick * 0.06 + i) * 0.25
        ctx!.beginPath()
        ctx!.arc(mx, my, 10 * pulse, 0, Math.PI * 2)
        ctx!.fillStyle = mod.color + '44'
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(mx, my, 7, 0, Math.PI * 2)
        ctx!.fillStyle = mod.color
        ctx!.fill()
      })

      // Satellite nodes (SEARCH, META DATA)
      satellites.forEach((sat, i) => {
        const angleRad = (sat.angleDeg * Math.PI) / 180
        const sr = R * 0.65
        const sx = cx + sr * Math.cos(angleRad)
        const sy = cy + sr * Math.sin(angleRad)

        // Orbit ring
        ctx!.beginPath()
        ctx!.arc(cx, cy, sr, 0, Math.PI * 2)
        ctx!.strokeStyle = 'rgba(245,158,11,0.08)'
        ctx!.lineWidth = 1
        ctx!.stroke()

        // Moving satellite
        const orbitAngle = angleRad + tick * 0.008 * (i === 0 ? 1 : -1)
        const osx = cx + sr * Math.cos(orbitAngle)
        const osy = cy + sr * Math.sin(orbitAngle)

        const pulse = 1 + Math.sin(tick * 0.05 + i * 2) * 0.3
        const grad2 = ctx!.createRadialGradient(osx, osy, 0, osx, osy, 36 * pulse)
        grad2.addColorStop(0, sat.color + 'cc')
        grad2.addColorStop(1, sat.color + '00')
        ctx!.beginPath()
        ctx!.arc(osx, osy, 36 * pulse, 0, Math.PI * 2)
        ctx!.fillStyle = grad2
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(osx, osy, 26, 0, Math.PI * 2)
        ctx!.fillStyle = sat.color + 'cc'
        ctx!.fill()
        ctx!.font = 'bold 11px sans-serif'
        ctx!.fillStyle = '#fff'
        ctx!.textAlign = 'center'
        ctx!.fillText(sat.label, osx, osy + 4)
      })

      // Central circle glow
      const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 0.45)
      cg.addColorStop(0, 'rgba(91,138,255,0.25)')
      cg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.beginPath()
      ctx!.arc(cx, cy, R * 0.45, 0, Math.PI * 2)
      ctx!.fillStyle = cg
      ctx!.fill()

      // Rotating outer ring
      ctx!.save()
      ctx!.translate(cx, cy)
      ctx!.rotate(tick * 0.005)
      ctx!.beginPath()
      ctx!.arc(0, 0, R * 0.38, 0, Math.PI * 2)
      ctx!.strokeStyle = 'rgba(91,138,255,0.20)'
      ctx!.lineWidth = 1.5
      ctx!.setLineDash([4, 8])
      ctx!.stroke()
      ctx!.setLineDash([])
      ctx!.restore()

      // Central circle
      const ccg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 0.32)
      ccg.addColorStop(0, '#1e2a6e')
      ccg.addColorStop(1, '#0d1240')
      ctx!.beginPath()
      ctx!.arc(cx, cy, R * 0.32, 0, Math.PI * 2)
      ctx!.fillStyle = ccg
      ctx!.fill()
      ctx!.strokeStyle = 'rgba(91,138,255,0.5)'
      ctx!.lineWidth = 2
      ctx!.stroke()

      // Central label
      ctx!.fillStyle = '#fff'
      ctx!.font = 'bold 12px sans-serif'
      ctx!.textAlign = 'center'
      ctx!.fillText('Documents', cx, cy - 14)
      ctx!.fillText('Management', cx, cy + 1)
      ctx!.fillText('System', cx, cy + 16)

      tick++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 shadow-2xl bg-[#05060f]" style={{ height: '560px' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

const benefits = [
  'Reduced Storage Space',
  'Enhanced Security',
  'Improved Regulatory Compliance',
  'Easier Retrieval',
  'Better Collaboration',
  'Better Backup and Disaster Recovery',
  'Increased Productivity',
  'Improved data analytics',
  'Improved the verification of data',
  'Enhanced reports',
  'Enhanced data analytics',
  'Efficient workflow process',
  'Electronic Form Creation',
  'Faster transaction processing',
  'Multi-language support',
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function DocumentsManagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/95 to-[#05060f]/80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-3xl" />
        <BinaryFloat />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              DigiGate Products
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[60px]">
              DigiGate <span className="text-gradient">Document Management</span> System
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300/90 text-justify">
              <strong className="text-white">DigiGate Document Management Software</strong> helps store, access, manage, control, and track
              digital documents and electronic images of paper-based information scanned or ingested as digital documents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Diagram */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 mb-3">About the System</p>
                <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent mb-6" />
              </div>
              <p className="text-base leading-8 text-slate-300/90 text-justify">
                DigiGate Document Management Systems are essential tools for sharing, managing, and organizing digital files.
                They can be part of a more complex enterprise content management system that includes information governance
                and records management. They are very capable of keeping a record of the various versions created and modified
                by different users and tracking history.
              </p>

              {/* Benefits */}
              <div>
                <p className="text-sm font-bold text-white mb-4 underline underline-offset-4">Assured System Benefits:</p>
                <div className="grid grid-cols-2 gap-2">
                  {benefits.map((b) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-5">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Animated Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-24"
            >
              <DMSDiagram />
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'OCR', color: 'bg-cyan-400' },
                  { label: 'Workflow', color: 'bg-brand-400' },
                  { label: 'Version Control', color: 'bg-violet-400' },
                  { label: 'Doc Retrieval', color: 'bg-pink-400' },
                  { label: 'Doc Archiving', color: 'bg-amber-400' },
                  { label: 'Search & Metadata', color: 'bg-amber-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className={`h-2 w-2 rounded-full ${item.color} shrink-0`} />
                    <span className="text-[10px] text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-14 lg:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300">Core Modules</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              System <span className="text-gradient">Capabilities</span>
            </h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔍', title: 'OCR Engine', desc: 'Optical Character Recognition for automatic text extraction from scanned documents.', color: 'border-cyan-400/20 bg-cyan-400/[0.05]' },
              { icon: '⚙️', title: 'Workflow Engine', desc: 'Automate document routing, approvals, and business process management.', color: 'border-brand-400/20 bg-brand-400/[0.05]' },
              { icon: '🔄', title: 'Version Control', desc: 'Track every version created and modified by different users with full history.', color: 'border-violet-400/20 bg-violet-400/[0.05]' },
              { icon: '📥', title: 'Document Retrieval', desc: 'Instant and precise document search and retrieval across all repositories.', color: 'border-pink-400/20 bg-pink-400/[0.05]' },
              { icon: '🗄️', title: 'Document Archiving', desc: 'Secure long-term storage with compliance-ready archiving capabilities.', color: 'border-amber-400/20 bg-amber-400/[0.05]' },
              { icon: '🏷️', title: 'Metadata Management', desc: 'Rich metadata tagging and indexing for powerful search and classification.', color: 'border-emerald-400/20 bg-emerald-400/[0.05]' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`rounded-3xl border p-6 shadow-xl ${card.color} hover:brightness-110 transition-all`}
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <FileText className="h-12 w-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to modernise your document management?</h2>
            <p className="text-slate-400 mb-8">Transform how your organisation handles documents with DigiGate's intelligent DMS solution.</p>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
