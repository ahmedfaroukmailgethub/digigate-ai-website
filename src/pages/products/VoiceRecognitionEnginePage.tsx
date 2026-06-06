import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Mic, Filter, Cpu, Network, CheckCircle2, MessageSquare, FileText, Languages, Brain, Waves, Volume2 } from 'lucide-react'

export default function VoiceRecognitionEnginePage() {
  useEffect(() => {
    document.title = 'DigiGate Voice Recognition Engine'
  }, [])

  return (
    <div className="relative min-h-screen bg-[#05060f] text-slate-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[640px] h-[640px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-[0.22em]">AI Voice Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.18] md:leading-[1.18] pb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-brand-300"
          >
            DigiGate Intelligent Voice Recognition Engine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed text-justify"
          >
            DigiGate Intelligent Voice Recognition Engine is an advanced intelligent, powerful voice technology. The voice
            recognition tool expands dramatically the data entry productivity by converting the voice text talking into
            text editing. That supports the long text documents that need to be edited fully. The version supports Arabic
            perfectly with self-learning technology for automatic accumulative enhancement. Speech recognition technology
            allows for hands-free control of smartphones, speakers, and even vehicles in a wide variety of languages.
          </motion.p>
        </div>

        {/* Pipeline Diagram */}
        <div className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center mb-8">
            Speech Recognition Pipeline
          </h2>
          <VoicePipelineDiagram />
        </div>

        {/* Technology Steps */}
        <div className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center underline underline-offset-8 decoration-amber-400/60">
            How Speech Recognition Technology Works
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-5 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 hover:bg-amber-400/[0.10] transition-colors"
              >
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-[0.18em]">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40">
                    {i + 1}
                  </span>
                  Step {i + 1}
                </div>
                <div className="mt-3 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-brand-500/20 border border-amber-400/30">
                  <s.icon className="w-6 h-6 text-amber-200" />
                </div>
                <h3 className="mt-3 font-semibold text-slate-100">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Models */}
        <div className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-300 text-center underline underline-offset-8 decoration-amber-400/60">
            Models Used to Build the Speech Recognition System
          </h2>
          <p className="mt-3 text-center text-slate-400 text-sm max-w-3xl mx-auto">
            DigiGate Intelligent Voice Recognition Engine uses different models to build a speech recognition system in
            order to enhance the accuracy.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {models.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-xl shadow-amber-900/20 hover:border-amber-400/40 transition-colors overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent blur-2xl" />
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-brand-500/20 border border-amber-400/30">
                  <m.icon className="w-7 h-7 text-amber-200" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-amber-100">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-slate-400 text-sm leading-relaxed text-justify max-w-5xl mx-auto">
            Algorithms can also combine the predictions of acoustic and language models to offer outputs the most likely
            text string for a given speech file input. To further highlight the challenge, speech recognition systems have
            to be able to distinguish between homophones (words with the same pronunciation but different meanings), to
            learn the difference between proper names and separate words ("Tim Cook" is a person, not a request for Tim to
            cook), and more.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-brand-500 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            Talk to DigiGate
          </a>
        </div>
      </section>
    </div>
  )
}

const steps = [
  { title: 'Microphone Capture', icon: Mic, desc: 'A microphone transmits the vibrations of a person\'s voice into a wavelike electrical signal.' },
  { title: 'Digital Conversion', icon: Waves, desc: 'The signal is converted by the system\'s hardware sound card into a digital signal.' },
  { title: 'Phoneme Analysis', icon: Cpu, desc: 'Speech recognition software analyzes the digital signal to register phonemes — units of sound that distinguish words.' },
  { title: 'Word Reconstruction', icon: FileText, desc: 'The phonemes are reconstructed into words using lexical and acoustic dictionaries.' },
  { title: 'Context & Trigrams', icon: Brain, desc: 'To pick the correct word, the engine relies on context cues accomplished through trigram analysis.' },
]

const models = [
  { title: 'Acoustic', icon: Waves, desc: 'Take the waveform of speech and break it up into small fragments to predict the most likely phonemes in the speech.' },
  { title: 'Pronunciation', icon: Volume2, desc: 'Take the sounds and tie them together to make words — associate words with their phonetic representations.' },
  { title: 'Language', icon: Languages, desc: 'Take the words and tie them together to make sentences — predict the most likely sequence of words among a set of text strings.' },
]

function VoicePipelineDiagram() {
  const nodes = [
    { label: 'Human\nSpeaking', sub: '', icon: Mic, color: '#f472b6', x: 8 },
    { label: 'Convert speech\nto text', sub: '', icon: FileText, color: '#f59e0b', x: 22 },
    { label: 'Filter out\nthe noise', sub: '', icon: Filter, color: '#22d3ee', x: 36 },
    { label: 'Process with\nneural networks', sub: '', icon: Network, color: '#3b82f6', x: 50 },
    { label: 'Understand\ncontext with AI', sub: '', icon: Cpu, color: '#ec4899', x: 64 },
    { label: 'Evaluate response\nto find a match', sub: '', icon: CheckCircle2, color: '#10b981', x: 78 },
    { label: 'Communicate\nto the user', sub: '', icon: MessageSquare, color: '#8b5cf6', x: 92 },
  ]

  return (
    <div className="relative rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.05] via-transparent to-brand-500/[0.05] p-8 md:p-12 shadow-2xl shadow-amber-900/20 overflow-hidden">
      {/* SVG Background flow */}
      <svg viewBox="0 0 100 38" className="w-full" preserveAspectRatio="none" style={{ minHeight: 360 }}>
        <defs>
          {nodes.map((n, i) => (
            <radialGradient key={i} id={`g-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Zig-zag connecting dotted curves */}
        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1]
          const y1 = i % 2 === 0 ? 12 : 24
          const y2 = (i + 1) % 2 === 0 ? 12 : 24
          const midX = (n.x + next.x) / 2
          const midY = (y1 + y2) / 2 + (i % 2 === 0 ? 3 : -3)
          return (
            <g key={`l-${i}`}>
              <path
                d={`M ${n.x} ${y1} Q ${midX} ${midY} ${next.x} ${y2}`}
                stroke="#fbbf24"
                strokeOpacity="0.35"
                strokeWidth="0.25"
                strokeDasharray="0.6 0.8"
                fill="none"
              />
              {/* Animated packet */}
              <circle r="0.45" fill="#fbbf24">
                <animateMotion
                  dur={`${3 + i * 0.2}s`}
                  repeatCount="indefinite"
                  path={`M ${n.x} ${y1} Q ${midX} ${midY} ${next.x} ${y2}`}
                />
                <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* Nodes (circles) */}
        {nodes.map((n, i) => {
          const y = i % 2 === 0 ? 12 : 24
          return (
            <g key={`n-${i}`}>
              <circle cx={n.x} cy={y} r="3.2" fill={`url(#g-${i})`} filter="url(#glow)">
                <animate attributeName="r" values="3.2;3.6;3.2" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
              <circle cx={n.x} cy={y} r="3.2" fill="none" stroke={n.color} strokeOpacity="0.6" strokeWidth="0.15">
                <animate attributeName="r" values="3.2;5;3.2" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            </g>
          )
        })}
      </svg>

      {/* Overlay HTML icons + labels */}
      <div className="absolute inset-0 p-8 md:p-12 pointer-events-none">
        <div className="relative w-full h-full">
          {nodes.map((n, i) => {
            const top = i % 2 === 0 ? '20%' : '54%'
            const labelTop = i % 2 === 0 ? '0%' : '78%'
            const Icon = n.icon
            return (
              <div key={`o-${i}`} className="absolute -translate-x-1/2" style={{ left: `${n.x}%`, top }}>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg"
                  style={{ backgroundColor: n.color, boxShadow: `0 0 24px ${n.color}80` }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 text-center text-[10px] md:text-xs font-semibold text-slate-200 whitespace-pre w-32"
                  style={{ top: i % 2 === 0 ? '-44px' : '60px' }}
                >
                  {n.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative waveform */}
      <div className="mt-6 flex items-end justify-center gap-1 h-12">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-amber-500 to-brand-400"
            animate={{ height: [`${10 + (i % 5) * 8}%`, `${30 + (i % 7) * 9}%`, `${10 + (i % 5) * 8}%`] }}
            transition={{ duration: 1.6 + (i % 4) * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
          />
        ))}
      </div>
    </div>
  )
}
