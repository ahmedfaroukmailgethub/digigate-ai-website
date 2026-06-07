import Hero from '../components/Hero'
import TrustBanner from '../components/TrustBanner'
import LogoCloud from '../components/LogoCloud'
import Features from '../components/Features'
import AIWorkflow from '../components/AIWorkflow'
import Solutions from '../components/Solutions'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Approach from '../components/Approach'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <Approach />
      <Features />
      <AIWorkflow />
      <LogoCloud />
      <Testimonials />
      <CTA />
    </>
  )
}
