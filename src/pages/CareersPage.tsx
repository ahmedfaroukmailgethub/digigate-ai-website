import { FormEvent, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import { saveApplicationSubmission } from '../data/applicationSubmissions'

type Career = {
  id: string
  title: string
  department: string
  location: string
  salary: string
  description: string
  highlights: string[]
}

const careers: Career[] = [
  {
    id: 'senior-ai-ml-engineer',
    title: 'Senior AI/ML Engineer',
    department: 'AI Solutions',
    location: 'Dubai (Hybrid)',
    salary: 'AED 360,000 - AED 520,000 annually',
    description:
      "We are looking for a Senior AI/ML Engineer to design, build, and deploy machine learning models that power DigiGate's core intelligence capabilities. You will work closely with our data science and product teams to take models from research to production, ensuring they meet the performance, reliability, and explainability standards required in regulated enterprise environments. The ideal candidate has deep experience with NLP, computer vision, or predictive modelling, a strong command of Python-based ML frameworks, and a track record of deploying models at scale. Experience in public sector, aviation, or financial services contexts is a significant advantage.",
    highlights: ['Production ML systems', 'NLP, vision, or predictive modelling', 'Regulated enterprise environments'],
  },
  {
    id: 'enterprise-solutions-architect',
    title: 'Enterprise Solutions Architect',
    department: 'Pre-Sales & Architecture',
    location: 'London / Dubai',
    salary: 'GBP 110,000 - GBP 150,000 or AED 480,000 - AED 660,000 annually',
    description:
      "The Enterprise Solutions Architect is a senior technical role responsible for designing end-to-end solution architectures for DigiGate's most complex client engagements. Working at the intersection of business requirements and technical delivery, you will translate client challenges into coherent platform architectures that leverage DigiGate's AI, document management, and workflow capabilities. You will lead technical discovery workshops, produce architecture documentation, and serve as the technical authority during pre-sales and early delivery phases. This role demands both breadth across cloud, integration, security, and data, and depth in at least one of DigiGate's core sectors.",
    highlights: ['End-to-end architecture', 'Technical discovery workshops', 'Cloud, integration, security, and data'],
  },
  {
    id: 'digital-transformation-consultant',
    title: 'Digital Transformation Consultant',
    department: 'Consulting',
    location: 'Riyadh',
    salary: 'SAR 360,000 - SAR 520,000 annually',
    description:
      "DigiGate's Digital Transformation Consultants are the strategic advisors who guide clients through the full arc of their transformation journey from initial maturity assessment through to benefits realisation. In this role, you will lead discovery engagements, develop transformation roadmaps, facilitate stakeholder workshops, and oversee the change management workstreams that determine whether technology investments deliver lasting value. You will work across multiple client accounts simultaneously, bringing structured thinking, strong communication skills, and genuine sector expertise to every engagement. Experience in management consulting or a senior in-house transformation role is essential.",
    highlights: ['Transformation roadmaps', 'Stakeholder workshops', 'Change management leadership'],
  },
  {
    id: 'product-manager-workflow-automation',
    title: 'Product Manager - Workflow Automation',
    department: 'Product',
    location: 'Dubai',
    salary: 'AED 330,000 - AED 470,000 annually',
    description:
      "We are seeking an experienced Product Manager to own the roadmap and strategic direction of DigiGate's Workflow Automation platform. You will be responsible for deeply understanding the needs of enterprise clients across our four sectors, translating those needs into a prioritised product backlog, and working closely with engineering to deliver features that are both technically excellent and commercially impactful. This role requires a rare combination of analytical rigour, user empathy, and the ability to communicate clearly with both technical teams and executive stakeholders. Prior experience with BPM, low-code workflow, or process automation products is strongly preferred.",
    highlights: ['Workflow platform roadmap', 'Enterprise product discovery', 'BPM or automation experience'],
  },
  {
    id: 'cybersecurity-compliance-lead',
    title: 'Cybersecurity & Compliance Lead',
    department: 'Security & Governance',
    location: 'London',
    salary: 'GBP 100,000 - GBP 140,000 annually',
    description:
      "DigiGate operates in some of the world's most security-sensitive environments: government agencies, airlines, and financial institutions. The Cybersecurity & Compliance Lead is responsible for maintaining and evolving our security posture, managing our ISO 27001 and SOC 2 programmes, and ensuring that our platform and delivery practices meet the regulatory requirements of every market we operate in. You will work closely with engineering, delivery, and legal teams to embed security by design across the organisation. The ideal candidate brings hands-on experience with enterprise security architecture, a deep understanding of data protection regulation, and the credibility to engage directly with client CISOs and compliance officers.",
    highlights: ['ISO 27001 and SOC 2', 'Enterprise security architecture', 'Client CISO engagement'],
  },
  {
    id: 'data-engineer-government-public-sector',
    title: 'Data Engineer - Government & Public Sector',
    department: 'Data & Analytics',
    location: 'Riyadh',
    salary: 'SAR 260,000 - SAR 380,000 annually',
    description:
      "This role sits within DigiGate's Public Sector practice and focuses on the design, build, and optimisation of data pipelines, integration layers, and analytics infrastructure for government clients. You will work on projects that connect legacy government systems to DigiGate's AI platform, ensuring that data flows reliably, securely, and in compliance with national data sovereignty requirements. Strong skills in SQL, Python, and cloud data services such as Azure, AWS, or GCP are essential. Experience working with government data environments, including understanding of classification frameworks, data residency requirements, and public sector procurement, is highly valued.",
    highlights: ['Government data pipelines', 'SQL, Python, and cloud data services', 'Data sovereignty requirements'],
  },
  {
    id: 'ux-ui-designer-enterprise-products',
    title: 'UX/UI Designer - Enterprise Products',
    department: 'Design',
    location: 'Dubai (Hybrid)',
    salary: 'AED 240,000 - AED 340,000 annually',
    description:
      "DigiGate's UX/UI Designer for Enterprise Products is responsible for crafting the user experience across our platform, from the document management interface used by government clerks to the analytics dashboards reviewed by airline operations directors. This is not a role for generic design patterns; our users operate in high-stakes, high-volume environments where clarity, efficiency, and accessibility are non-negotiable. You will conduct user research, produce wireframes and high-fidelity prototypes, and collaborate closely with product and engineering to ensure designs are implemented with precision. A portfolio demonstrating experience with complex enterprise applications is required.",
    highlights: ['Enterprise product UX', 'Research and high-fidelity prototypes', 'Accessibility and workflow clarity'],
  },
  {
    id: 'client-success-manager-financial-services',
    title: 'Client Success Manager - Financial Services',
    department: 'Client Success',
    location: 'London',
    salary: 'GBP 80,000 - GBP 115,000 annually',
    description:
      "The Client Success Manager for Financial Services is the primary relationship owner for DigiGate's banking, insurance, and capital markets clients. You will be responsible for ensuring that clients achieve and sustain the outcomes they committed to when they selected DigiGate, managing adoption, identifying expansion opportunities, and serving as the internal advocate for client needs. This role requires a combination of commercial acumen, technical literacy, and genuine relationship-building skill. You will work closely with delivery, product, and sales teams to ensure a seamless client experience from onboarding through to renewal and growth. Prior experience in a client-facing role within enterprise software or financial services technology is essential.",
    highlights: ['Financial services clients', 'Adoption and expansion', 'Enterprise software relationships'],
  },
  {
    id: 'technical-support-specialist',
    title: 'Technical Support Specialist',
    department: 'Technical Support',
    location: 'Indonesia',
    salary: 'IDR 96,000,000 - IDR 134,400,000 annually',
    description:
      "The Technical Support Specialist is the first line of technical guidance for DigiGate clients as they adopt and operate our AI, document management, and workflow solutions. You will troubleshoot platform issues, investigate user-reported incidents, document resolutions, and coordinate with engineering, product, and client success teams to keep enterprise deployments running smoothly. This role suits someone with strong communication skills, practical experience supporting SaaS or enterprise applications, and the curiosity to understand both the technology and the business workflows behind each client request.",
    highlights: ['Client technical troubleshooting', 'SaaS or enterprise application support', 'Incident documentation and escalation'],
  },
  {
    id: 'aviation-domain-specialist',
    title: 'Aviation Domain Specialist',
    department: 'Sector Solutions',
    location: 'Dubai / London',
    salary: 'AED 360,000 - AED 500,000 or GBP 85,000 - GBP 120,000 annually',
    description:
      "DigiGate's Aviation Domain Specialist brings deep operational knowledge of the aviation industry to our product, sales, and delivery teams. You will serve as the internal authority on aviation regulatory frameworks including ICAO, EASA, and FAA, maintenance and operations processes, and the specific document management and workflow challenges faced by airlines, MRO providers, and aviation authorities. In this role, you will contribute to product requirements, support pre-sales engagements, review solution designs for sector accuracy, and help clients understand how DigiGate's platform maps to their operational context. A background in aviation operations, airworthiness, or aviation IT, combined with strong communication and advisory skills, is essential.",
    highlights: ['ICAO, EASA, and FAA knowledge', 'Aviation operations workflows', 'Product and pre-sales advisory'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-300/60 focus:ring-4 focus:ring-brand-500/10'

const allLocations = 'All locations'

const getCareerLocations = (location: string) =>
  location
    .replace(/\s*\([^)]*\)/g, '')
    .split('/')
    .map((careerLocation) => careerLocation.trim())
    .filter(Boolean)

export default function CareersPage() {
  const [selectedCareerId, setSelectedCareerId] = useState(careers[0].id)
  const [selectedLocation, setSelectedLocation] = useState(allLocations)
  const [submitted, setSubmitted] = useState(false)
  const hiringDepartmentCount = useMemo(() => new Set(careers.map((career) => career.department)).size, [])
  const globalHubCount = useMemo(
    () =>
      new Set(careers.flatMap((career) => getCareerLocations(career.location))).size,
    [],
  )
  const locationOptions = useMemo(
    () => [allLocations, ...Array.from(new Set(careers.flatMap((career) => getCareerLocations(career.location)))).sort()],
    [],
  )
  const filteredCareers = useMemo(
    () =>
      selectedLocation === allLocations
        ? careers
        : careers.filter((career) => getCareerLocations(career.location).includes(selectedLocation)),
    [selectedLocation],
  )

  const selectedCareer = useMemo(
    () => careers.find((career) => career.id === selectedCareerId) ?? careers[0],
    [selectedCareerId],
  )

  useEffect(() => {
    if (filteredCareers.some((career) => career.id === selectedCareerId)) {
      return
    }

    setSelectedCareerId(filteredCareers[0]?.id ?? careers[0].id)
    setSubmitted(false)
  }, [filteredCareers, selectedCareerId])

  const handleApply = (careerId: string) => {
    setSelectedCareerId(careerId)
    setSubmitted(false)
    window.requestAnimationFrame(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    saveApplicationSubmission({
      role: selectedCareer.title,
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      location: String(formData.get('location') ?? ''),
      profile: String(formData.get('profile') ?? ''),
      resume: String(formData.get('resume') ?? ''),
      message: String(formData.get('message') ?? ''),
    })

    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=75"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-26"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060f] via-[#05060f]/93 to-[#05060f]/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/15 to-[#05060f]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-end lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              Careers
            </div>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[78px]">
              Build the future of <span className="text-gradient">enterprise AI</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300/90 md:text-xl md:leading-9">
              Join DigiGate AI to build regulated, reliable, and deeply practical technology for government, education, aviation, and financial services teams.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-100"
              >
                Submit Your Application
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/72 p-5 shadow-2xl shadow-black/30 backdrop-blur">
              {[
                { icon: BriefcaseBusiness, value: '2', label: 'Open roles' },
                { icon: Building2, value: '1', label: 'Departments hiring' },
                { icon: MapPin, value: '1', label: 'Global hubs' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
                    <span className="inline-flex items-center gap-3 text-sm text-slate-400">
                      <Icon className="h-4 w-4 text-brand-300" />
                      {item.label}
                    </span>
                    <span className="font-display text-2xl font-bold text-white">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="open-roles" className="pt-14 pb-2 lg:pt-20 lg:pb-4">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Available careers</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Choose the work that fits your edge</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:col-span-5">
              Each role contributes to DigiGate's platform, delivery model, or sector expertise. Select a career to review the details and apply.
            </p>
          </motion.div>


        </div>
      </section>

      <section id="apply" className="pt-2 pb-12 lg:pt-4 lg:pb-20">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
              <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Application form</p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-white">Apply for a Career with DigiGate Group</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <FileText className="h-3.5 w-3.5 text-brand-300" />
                  DigiGate Talent
                </span>
              </div>

              <input type="hidden" name="role" value={selectedCareer.title} />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Full name
                  <input className={fieldClass} name="fullName" type="text" placeholder="Your full name" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Email address
                  <input className={fieldClass} name="email" type="email" placeholder="name@company.com" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Phone number
                  <input className={fieldClass} name="phone" type="tel" placeholder="+971 50 000 0000" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Current location
                  <input className={fieldClass} name="location" type="text" placeholder="City, country" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200 md:col-span-2">
                  LinkedIn or portfolio
                  <input className={fieldClass} name="profile" type="url" placeholder="https://" />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200 md:col-span-2">
                  Resume link
                  <input className={fieldClass} name="resume" type="url" placeholder="Link to your CV or resume" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200 md:col-span-2">
                  Why are you a strong fit?
                  <textarea
                    className={`${fieldClass} min-h-36 resize-y`}
                    name="message"
                    placeholder="Share your relevant experience, sector knowledge, and what you would bring to DigiGate."
                    required
                  />
                </label>
              </div>

              {submitted && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  Your application has been prepared for the DigiGate talent team. We will review your details and contact shortlisted candidates.
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="h-4 w-4 text-brand-300" />
                  Response time: 5-7 business days
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-brand-500/30"
                >
                  Submit application
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}