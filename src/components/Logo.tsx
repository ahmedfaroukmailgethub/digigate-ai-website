import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Logo({ className = '', large = false, src = '/DigiGate-R-HD.png' }: { className?: string; large?: boolean; src?: string }) {
  const imgHeight = large ? '65px' : '52px'
  return (
    <Link to="/" className={`inline-flex items-center group ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative"
        style={{ height: imgHeight }}
      >
        <img src={src} alt="DigiGate" className="h-full w-auto object-contain" />
      </motion.div>
    </Link>
  )
}
