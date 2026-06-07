import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

/* ─── Floating binary "01" particle background ─── */
function BinaryFloatBackground() {
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

    interface Bit {
      x: number; y: number; vx: number; vy: number
      ch: string; size: number; alpha: number; targetAlpha: number
      phase: number; phaseSpeed: number
    }

    const COUNT = 160
    const bits: Bit[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.85 ? -1 : 1),
      ch: Math.random() > 0.5 ? '0' : '1',
      size: 11 + Math.random() * 8,
      alpha: 0,
      targetAlpha: 0.18 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.005 + Math.random() * 0.012,
    }))

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx!.clearRect(0, 0, W, H)
      ctx!.font = '13px "Courier New", monospace'

      for (const b of bits) {
        b.x += b.vx
        b.y += b.vy
        b.phase += b.phaseSpeed

        if (b.x < -20) b.x = W + 20
        if (b.x > W + 20) b.x = -20
        if (b.y < -20) { b.y = H + 20; b.ch = Math.random() > 0.5 ? '0' : '1' }
        if (b.y > H + 20) { b.y = -20; b.ch = Math.random() > 0.5 ? '0' : '1' }

        // Soft breathing alpha
        const breathing = 0.5 + 0.5 * Math.sin(b.phase)
        b.alpha = b.targetAlpha * breathing

        if (Math.random() < 0.0015) b.ch = b.ch === '0' ? '1' : '0'

        ctx!.font = `${b.size}px "Courier New", monospace`
        ctx!.fillStyle = `rgba(180,200,255,${b.alpha})`
        ctx!.fillText(b.ch, b.x, b.y)
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=70"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/80 via-[#05060f]/95 to-[#05060f]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <BinaryFloatBackground />
        <motion.div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="text-left text-center lg:text-left">
            <motion.div
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
                <img src="/logo-infinity.png" alt="" aria-hidden="true" className="object-contain" style={{ height: '84px', width: '84px' }} />
                <span className="font-display text-[44px] font-bold uppercase leading-none tracking-[0.18em] text-white">
                  DIGIGATE <span className="text-gradient">AI</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Next-Generation AI-Digital Partner
              <Sparkles size={12} className="text-accent-400" />
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Architecting <br className="hidden lg:block" /> the <span className="text-gradient">Future</span> of <br className="hidden lg:block" /> Businesses.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-slate-400"
            >
              DigiGate doesn't just consult—we build, deploy, and operate high-performance digital ecosystems. We combine deep engineering expertise with AI to solve mission-critical challenges.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
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
            </motion.div>
          </div>

          {/* Right Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-12 min-h-[260px] lg:mt-0 lg:min-h-[460px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[220px] w-[320px] rounded-full bg-brand-500/20 blur-[70px] lg:h-[380px] lg:w-[560px] lg:blur-[90px]"
                animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.9, 1.08, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Rotating orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[170px] w-[300px] rounded-full border border-white/10 lg:h-[300px] lg:w-[460px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[130px] w-[340px] rounded-full border border-brand-300/20 lg:h-[220px] lg:w-[540px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Expanding light wave rings */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="absolute rounded-full border border-brand-400/40"
                  style={{ width: '200px', height: '120px' }}
                  animate={{
                    width:  ['200px', '680px'],
                    height: ['120px', '360px'],
                    opacity: [0.55, 0],
                    borderColor: [
                      'rgba(91,138,255,0.5)',
                      'rgba(168,85,247,0)',
                    ],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: i * 0.9,
                  }}
                />
              </div>
            ))}

            {/* Horizontal energy beam left */}
            <motion.div
              className="absolute inset-0 flex items-center justify-start pointer-events-none"
              style={{ paddingLeft: '0' }}
            >
              <motion.div
                className="h-px w-0 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
                style={{ marginTop: '0', alignSelf: 'center', width: '100%' }}
                animate={{ opacity: [0, 0.7, 0], scaleX: [0.2, 1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </motion.div>

            {/* Diagonal light streaks */}
            {[
              { rotate: 30,  delay: 0 },
              { rotate: -30, delay: 1.2 },
              { rotate: 15,  delay: 2.2 },
            ].map((s, i) => (
              <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent"
                  style={{ width: '400px', rotate: `${s.rotate}deg` }}
                  animate={{ opacity: [0, 0.6, 0], scaleX: [0.3, 1.1, 0.3] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
                />
              </div>
            ))}

            {/* Corner spark dots */}
            {[
              { top: '20%', left: '10%', delay: 0 },
              { top: '70%', left: '15%', delay: 0.8 },
              { top: '25%', right: '8%', delay: 1.5 },
              { top: '65%', right: '12%', delay: 0.4 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-brand-300 pointer-events-none"
                style={{ ...pos }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
              />
            ))}

            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{ perspective: '900px' }}
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateY: [0, 22, 0, -22, 0],
                  rotateX: [2, 8, 2, -4, 2],
                  y: [-10, 10, -10],
                }}
                transition={{
                  rotateY: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                  rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative w-[340px] lg:w-[520px]"
              >
                {/* 3D depth layer — slightly behind */}
                <motion.img
                  src="/logo-infinity.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full max-w-none"
                  style={{ transform: 'translateZ(-18px) scale(1.04)', opacity: 0.25, filter: 'blur(6px) hue-rotate(30deg)' }}
                />
                {/* Main image */}
                <motion.img
                  src="/logo-infinity.png"
                  alt=""
                  aria-hidden="true"
                  className="relative w-full max-w-none"
                  style={{ transform: 'translateZ(0px)' }}
                  animate={{
                    filter: [
                      'drop-shadow(0 30px 70px rgba(91,138,255,0.45)) drop-shadow(0 0 30px rgba(168,85,247,0.3))',
                      'drop-shadow(0 30px 90px rgba(91,138,255,0.7)) drop-shadow(0 0 50px rgba(168,85,247,0.5))',
                      'drop-shadow(0 30px 70px rgba(91,138,255,0.45)) drop-shadow(0 0 30px rgba(168,85,247,0.3))',
                    ],
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Specular highlight that shifts as it "rotates" */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(ellipse 60% 40% at 35% 40%, rgba(255,255,255,0.18) 0%, transparent 70%)',
                      'radial-gradient(ellipse 60% 40% at 65% 40%, rgba(255,255,255,0.18) 0%, transparent 70%)',
                      'radial-gradient(ellipse 60% 40% at 35% 40%, rgba(255,255,255,0.18) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-6 left-1/2 h-px w-[280px] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent lg:bottom-10 lg:w-[420px]"
              animate={{ opacity: [0.25, 0.85, 0.25], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
