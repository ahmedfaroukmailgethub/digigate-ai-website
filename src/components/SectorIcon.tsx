import { Landmark, GraduationCap, Plane, Banknote, HardHat, Building2, type LucideIcon } from 'lucide-react'
import type { Sector } from '../data/sectors'

const map: Record<Sector['iconKey'], LucideIcon> = {
  public: Landmark,
  education: GraduationCap,
  aviation: Plane,
  finance: Banknote,
  construction: HardHat,
  'smart-cities': Building2,
}

export function SectorIcon({ iconKey, className }: { iconKey: Sector['iconKey']; className?: string }) {
  const Icon = map[iconKey]
  return <Icon className={className} />
}
