import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Soft floating "01" binary background ── */
function BinaryFloat() {
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
      ch: string; size: number; targetAlpha: number
      phase: number; phaseSpeed: number
    }
    const COUNT = 150
    const bits: Bit[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() * 0.16 + 0.04) * (Math.random() > 0.85 ? -1 : 1),
      ch: Math.random() > 0.5 ? '0' : '1',
      size: 10 + Math.random() * 7,
      targetAlpha: 0.14 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.004 + Math.random() * 0.010,
    }))

    function draw() {
      const W = canvas!.width, H = canvas!.height
      ctx!.clearRect(0, 0, W, H)
      for (const b of bits) {
        b.x += b.vx; b.y += b.vy; b.phase += b.phaseSpeed
        if (b.x < -20) b.x = W + 20
        if (b.x > W + 20) b.x = -20
        if (b.y < -20) { b.y = H + 20; b.ch = Math.random() > 0.5 ? '0' : '1' }
        if (b.y > H + 20) { b.y = -20; b.ch = Math.random() > 0.5 ? '0' : '1' }
        const breath = 0.5 + 0.5 * Math.sin(b.phase)
        const a = b.targetAlpha * breath
        if (Math.random() < 0.001) b.ch = b.ch === '0' ? '1' : '0'
        ctx!.font = `${b.size}px "Courier New", monospace`
        ctx!.fillStyle = `rgba(180,200,255,${a})`
        ctx!.fillText(b.ch, b.x, b.y)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}

// All partner logos in /public/Partners in Success Logos.
// .wdp (HD Photo) excluded — browsers can't render it.
const ALL_LOGOS = [
  '002_Sheet1_D6_image33.png',
  '003_Sheet1_D7_image34.png',
  '004_Sheet1_D8_image35.png',
  '005_Sheet1_D9_image67.png',
  '006_Sheet1_D10_image36.png',
  '007_Sheet1_D11_image37.jpeg',
  '009_Sheet1_D13_image39.png',
  '010_Sheet1_D14_image40.png',
  '011_Sheet1_D15_image43.jpeg',
  '012_Sheet1_D16_image41.png',
  '013_Sheet1_D17_image42.png',
  '014_Sheet1_D18_image71.png',
  '015_Sheet1_D19_image44.jpg',
  '016_Sheet1_D20_image45.png',
  '017_Sheet1_D21_image46.png',
  '018_Sheet1_D22_image47.jpg',
  '019_Sheet1_D22_image48.png',
  '020_Sheet1_D24_image49.jpeg',
  '021_Sheet1_D25_image50.jpeg',
  '022_Sheet1_D26_image51.gif',
  '023_Sheet1_D27_image52.png',
  '024_Sheet1_D28_image53.png',
  '025_Sheet1_D28_image54.png',
  '026_Sheet1_D29_image55.jpeg',
  '027_Sheet1_D30_image56.png',
  '028_Sheet1_D31_image57.jpeg',
  '029_Sheet1_D32_image58.png',
  '030_Sheet1_D33_image59.jpeg',
  '031_Sheet1_D34_image88.png',
  '032_Sheet1_D35_image60.jpeg',
  '033_Sheet1_D36_image61.jpeg',
  '034_Sheet1_D37_image62.jpeg',
  '035_Sheet1_D38_image63.png',
  '036_Sheet1_D39_image64.jpg',
  '037_Sheet1_D40_image65.png',
  '038_Sheet1_D41_image66.jpg',
  '039_Sheet1_D42_image68.png',
  '04.jpg',
  '040_Sheet1_D43_image69.png',
  '043_Sheet1_D71_image73.png',
  '044_Sheet1_D72_image74.png',
  '045_Sheet1_D73_image75.png',
  '046_Sheet1_D74_image85.png',
  '047_Sheet1_D75_image87.png',
  '048_Sheet1_D76_image86.png',
  '049_Sheet1_D77_image80.png',
  '050_Sheet1_D78_image78.png',
  '051_Sheet1_D79_image83.png',
  '052_Sheet1_D80_image81.png',
  '053_Sheet1_D81_image84.png',
  '054_Sheet1_D82_image77.png',
  '055_Sheet1_D83_image82.png',
  '056_Sheet1_D84_image79.png',
  '057_Sheet1_D85_image76.png',
  '058_Sheet1_D89_image89.jpeg',
  '060_image1.jpeg',
  '061_image2.jpeg',
  '062_image3.jpeg',
  '063_image4.jpeg',
  '064_image5.jpeg',
  '065_image6.jpeg',
  '066_image7.png',
  '067_image8.jpeg',
  '068_image9.jpeg',
  '069_image10.jpeg',
  '070_image11.jpeg',
  '071_image12.jpeg',
  '072_image13.jpeg',
  '073_image14.jpeg',
  '074_image15.jpeg',
  '075_image16.jpeg',
  '076_image17.jpeg',
  '077_image18.jpeg',
  '078_image19.png',
  '079_image20.png',
  '080_image21.png',
  '081_image22.jpeg',
  '082_image23.png',
  '083_image24.jpeg',
  '084_image25.png',
  '085_image26.png',
  '086_image27.jpeg',
  '087_image28.jpeg',
  '088_image29.jpeg',
  '089_image30.jpeg',
  '090_image31.jpeg',
  '10.jpg',
  'Picture3.png',
]

const BASE = '/Partners%20in%20Success%20Logos'

function shuffle<T>(arr: T[]): T[] {
  const copy = arr.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Slot — cycles through its own deck of logos with a dissolve + 3D revolve effect.
 * Each slot uses a different sub-sequence so the row never repeats a logo at the same time.
 */
function LogoSlot({ deck, interval, delay }: { deck: string[]; interval: number; delay: number }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const start = setTimeout(() => {
      const id = setInterval(() => setIdx((i) => (i + 1) % deck.length), interval)
      ;(start as unknown as { id?: number }).id = id as unknown as number
    }, delay)
    return () => {
      clearTimeout(start)
      const id = (start as unknown as { id?: number }).id
      if (id) clearInterval(id)
    }
  }, [deck.length, interval, delay])

  const file = deck[idx]

  return (
    <div className="relative">
      <div className="relative flex h-[5.184rem] w-[9.72rem] md:h-[5.832rem] md:w-[11.664rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white px-3.5 py-2.5 shadow-xl shadow-black/30 [perspective:800px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={file}
            src={`${BASE}/${encodeURIComponent(file)}`}
            alt="Partner logo"
            loading="lazy"
            initial={{ opacity: 0, rotateY: 90, scale: 0.7, filter: 'blur(6px)' }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.7, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-full max-w-full object-contain"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function LogoCloud() {
  // Split the deck into 7 sub-decks, one per visible slot.
  // Shuffle once on mount so each render gives a unique starting order.
  const [decks] = useState(() => {
    const shuffled = shuffle(ALL_LOGOS)
    const SLOTS = 6
    const out: string[][] = Array.from({ length: SLOTS }, () => [])
    shuffled.forEach((f, i) => out[i % SLOTS].push(f))
    return out
  })

  return (
    <section className="relative py-12 border-y border-white/5 bg-white/[0.015] overflow-hidden">
      <BinaryFloat />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400">
          Partners in success — trusted by organisations worldwide
        </p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-5">
          {decks.map((deck, i) => (
            <LogoSlot
              key={i}
              deck={deck}
              interval={8000 + i * 600}
              delay={i * 900}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
