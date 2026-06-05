import { Link } from 'react-router-dom'

type Props = {
  className?: string
  asLink?: boolean
  to?: string
  ariaLabel?: string
}

const Mark = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 520 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Speed with AI"
    className={className}
  >
    <defs>
      <linearGradient id="swai-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="55%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="swai-grad-soft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>

    <g fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif" fontWeight={700}>
      <text x="0" y="78" fontSize="72" letterSpacing="-3" fill="url(#swai-grad-soft)" transform="skewX(-10)">
        Speed
      </text>
      <text x="232" y="78" fontSize="34" fontWeight={400} fill="#64748b" fontStyle="italic">
        with
      </text>
      <text x="318" y="84" fontSize="86" letterSpacing="-4" fill="url(#swai-grad)">
        AI
      </text>
    </g>

    <g>
      <rect x="0" y="92" width="210" height="3" rx="1.5" fill="url(#swai-grad)" opacity="0.85" />
      <rect x="214" y="92" width="14" height="3" rx="1.5" fill="url(#swai-grad)" opacity="0.55" />
      <rect x="232" y="92" width="6" height="3" rx="1.5" fill="url(#swai-grad)" opacity="0.3" />
    </g>
  </svg>
)

export default function SpeedWithAILogo({
  className = 'h-10 w-auto',
  asLink = false,
  to = '/',
  ariaLabel = 'Speed with AI',
}: Props) {
  if (asLink) {
    return (
      <Link to={to} aria-label={ariaLabel} className="inline-block">
        <Mark className={className} />
      </Link>
    )
  }
  return <Mark className={className} />
}
