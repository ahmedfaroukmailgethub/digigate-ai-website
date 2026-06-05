import { motion } from 'framer-motion'

const customerLogos = [
  'image001.jpg',
  'image002.jpg',
  'image003.png',
  'image004.jpg',
  'image005.png',
  'image006.png',
  'image007.png',
  'image008.png',
  'image009.jpg',
  'image010.png',
  'image011.jpg',
  'image012.png',
  'image013.png',
  'image014.gif',
  'image015.jpg',
  'image016.png',
  'image017.png',
  'image018.png',
  'image019.jpg',
  'image020.png',
  'image021.png',
  'image022.jpg',
  'image023.png',
  'image024.png',
  'image025.jpg',
  'image026.png',
  'image027.jpg',
  'image028.png',
  'image029.jpg',
  'image030.png',
]

export default function LogoCloud() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400">
          Trusted by forward-thinking teams worldwide
        </p>
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex items-center gap-10 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            {[...customerLogos, ...customerLogos].map((logo, i) => (
              <span
                key={i}
                className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white px-4 py-3 transition hover:bg-slate-100"
              >
                <img
                  src={`/Customers/${logo}`}
                  alt={`Customer logo ${(i % customerLogos.length) + 1}`}
                  loading="lazy"
                  className="h-10 w-full object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
