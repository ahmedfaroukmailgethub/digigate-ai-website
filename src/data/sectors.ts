export type Sector = {
  slug: string
  name: string
  tagline: string
  hero: string
  description: string
  challenges: string[]
  solutions: { title: string; desc: string; image?: string; imageAlt?: string }[]
  benefitGroups?: {
    eyebrow: string
    title: string
    summary: string
    image: string
    imageAlt: string
    benefits: { title: string; desc: string }[]
  }[]
  collaborators?: {
    name: string
    url: string
    logo: string
    description: string
  }[]
  outcomes: { value: string; label: string }[]
  caseStudy: { client: string; result: string; quote: string; author: string }
  iconKey: 'public' | 'education' | 'aviation' | 'finance' | 'construction' | 'smart-cities'
  accent: string // tailwind gradient classes
  image: string // hero/cover image URL
  imageAlt: string
}

export const sectors: Sector[] = [
  {
    slug: 'public',
    name: 'Public Sector',
    tagline: 'Citizen-first government, powered by intelligent infrastructure',
    hero: 'Modern, secure, and sovereign technology that helps government agencies serve citizens faster.',
    description:
      'Digigate delivers turnkey digital transformation programs for ministries, municipalities, and public authorities — from sovereign cloud and identity to AI-driven citizen services. We design, deploy, integrate, train, and operate end-to-end.',
    challenges: [
      'Fragmented legacy systems and data silos across agencies',
      'Rising citizen expectations for digital, 24/7 services',
      'Strict data residency, sovereignty, and cybersecurity mandates',
      'Limited in-house capacity to deliver large transformation programs',
    ],
    solutions: [
      { title: 'Digital Government Platforms', desc: 'Unified citizen portals, e-services, and omnichannel service delivery.' },
      { title: 'Sovereign AI & Cloud', desc: 'On-premise and sovereign-cloud deployments with full data residency.' },
      { title: 'Smart City Operations', desc: 'Command centers, IoT integration, and predictive urban analytics.' },
      { title: 'Document & Identity Intelligence', desc: 'OCR, verification, e-signature, and national-ID integration.' },
    ],
    outcomes: [
      { value: '−65%', label: 'Service processing time' },
      { value: '4.8/5', label: 'Citizen satisfaction' },
      { value: '24/7', label: 'Always-on services' },
    ],
    caseStudy: {
      client: 'National Services Authority',
      result: 'Consolidated 38 services into a single digital portal, processing 2.1M transactions per month.',
      quote:
        'Digigate did not just deliver software. They delivered a working program — change management, training, integration, and operations included.',
      author: 'Director of Digital Transformation',
    },
    iconKey: 'public',
    accent: 'from-sky-500 to-brand-500',
    image: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1600&q=70',
    imageAlt: 'White concrete government building under sky',
  },
  {
    slug: 'education',
    name: 'Education',
    tagline: 'SIS and LMS with AI for student success',
    hero: 'Digigate AI combines a powerful Student Information System and Learning Management System with embedded intelligence for every student, advisor, faculty member, and administrator.',
    description:
      'Digigate AI gives education leaders a connected operating platform for admissions, academic planning, advising, teaching, assessment, engagement, compliance, and always-on student support.',
    challenges: [
      'Admissions, advising, learning, and compliance data fragmented across disconnected systems',
      'Students need personalized pathways while staff need fewer manual workflows',
      'Faculty lack timely analytics that connect assessment results to instructional design',
      'At-risk students are often identified only after attendance, grades, and engagement have already declined',
    ],
    solutions: [
      {
        title: 'AI-Powered Student Information System',
        desc: 'Enrollment, admissions, academic planning, advising profiles, student success alerts, and compliance reporting in one intelligent SIS.',
        image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1400&q=75',
        imageAlt: 'Education administrator reviewing analytics on a laptop',
      },
      {
        title: 'Adaptive Learning Management System',
        desc: 'Personalized learning pathways, content recommendations, automated feedback, faculty analytics, and engagement monitoring built into the LMS.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=75',
        imageAlt: 'Students collaborating with laptops in a modern classroom',
      },
      {
        title: 'Virtual AI Advising Assistant',
        desc: 'Students get personalized answers about requirements, registration, deadlines, and aid at any time, reducing routine inquiry volume for staff.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=75',
        imageAlt: 'Student using an online learning platform on a laptop',
      },
      {
        title: 'Student Success Command Center',
        desc: 'A unified view of attendance, grades, engagement, advising, and learning signals so teams can act before students fall behind.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=75',
        imageAlt: 'Team reviewing digital dashboards in a meeting room',
      },
    ],
    benefitGroups: [
      {
        eyebrow: 'Student Information System with AI',
        title: 'A smarter operating system for enrollment, advising, and student success',
        summary:
          'The AI-enhanced SIS turns institutional data into prioritized actions for admissions teams, advisors, compliance leaders, and student support staff.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=75',
        imageAlt: 'Education team planning with notes and laptops around a table',
        benefits: [
          {
            title: 'AI-Powered Enrollment and Admissions',
            desc: 'Machine learning analyzes applicant data, predicts enrollment likelihood, and ranks applicants against configurable eligibility criteria to reduce manual review time.',
          },
          {
            title: 'Intelligent Academic Planning',
            desc: 'The system recommends course sequences from degree requirements and flags scheduling conflicts, prerequisite gaps, and at-risk graduation timelines early.',
          },
          {
            title: 'Early Alert and Student Success Prediction',
            desc: 'Attendance patterns, grade trends, and engagement signals are monitored continuously so advisors receive prioritized alerts for timely intervention.',
          },
          {
            title: 'Personalized Advising Profiles',
            desc: 'Advisors get a single intelligent view with grades, schedules, AI-generated trajectory insights, recommended interventions, and predicted outcomes.',
          },
          {
            title: 'Automated Compliance and Reporting',
            desc: 'AI assists regulatory and accreditation reporting by cross-referencing institutional data against requirements in real time to reduce audit effort and errors.',
          },
        ],
      },
      {
        eyebrow: 'Learning Management System with AI',
        title: 'Adaptive learning experiences that support students and faculty at scale',
        summary:
          'The AI-powered LMS personalizes content, accelerates feedback, surfaces course analytics, and keeps student engagement visible before risk becomes crisis.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=75',
        imageAlt: 'Teacher helping students in a bright classroom',
        benefits: [
          {
            title: 'Adaptive Learning Pathways',
            desc: 'The LMS assesses comprehension and performance, then adjusts content difficulty, sequence, and format to match each student\'s pace and learning needs.',
          },
          {
            title: 'AI-Driven Content Recommendations',
            desc: 'Students receive targeted readings, videos, and practice exercises based on learning history, performance data, and course objectives.',
          },
          {
            title: 'Automated Assessment and Feedback',
            desc: 'Objective grading and instant feedback are automated, while AI-assisted written-work evaluation helps faculty focus on higher-order coaching.',
          },
          {
            title: 'Intelligent Faculty Grade Entry and Analytics',
            desc: 'Faculty see class-wide trends, weak assessment items, and curriculum adjustment recommendations that close the loop between data and instruction.',
          },
          {
            title: 'Engagement and Participation Monitoring',
            desc: 'Login frequency, time-on-task, discussion activity, and submission patterns are analyzed so faculty and advisors can reach out proactively.',
          },
          {
            title: 'Virtual AI Advising Assistant',
            desc: 'Students can ask personalized questions about degree requirements, registration, deadlines, and financial aid without waiting for office hours.',
          },
        ],
      },
    ],
    collaborators: [
      {
        name: 'Al-Azhar Al-Sharif',
        url: 'https://azhar.eg/homepage2',
        logo: 'https://azhar.eg/Portals/_default/skins/azhar_2016//images/logo.png',
        description:
          'A historic Egyptian Islamic and educational institution with a broad digital portal for Al-Azhar institutes, Al-Azhar University, the mosque, foreign students, learning resources, training, and public services.',
      },
      {
        name: 'Arabic Language Academy in Sharjah',
        url: 'https://www.alashj.ae',
        logo: 'https://www.alashj.ae/wp-content/uploads/Website-Logo-9.png',
        description:
          'A Sharjah-based academic government institution focused on Arabic language scholarship, linguistic research, publications, and cultural knowledge exchange.',
      },
      {
        name: 'University of Dubai',
        url: 'https://ud.ac.ae',
        logo: 'https://ud.ac.ae/wp-content/uploads/2020/02/udlogo2-1.png',
        description:
          'A private UAE university offering business, law, engineering, and IT programs with an emphasis on career readiness, sustainability, and applied research.',
      },
      {
        name: 'IEEE',
        url: 'https://www.ieee.org',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg',
        description:
          'A global professional organization advancing technology, engineering standards, research communities, publications, and lifelong learning for technical professionals.',
      },
      {
        name: 'Arab Academy for Science, Technology and Maritime Transport',
        url: 'https://aast.edu/en/',
        logo: 'https://pythagoras.rnu.tn/wp-content/uploads/2023/04/mainlogoforbanner.png',
        description:
          'A regional Arab university institution delivering education, research, and professional development across science, technology, maritime transport, engineering, and business disciplines.',
      },
      {
        name: 'Education Basket',
        url: '#',
        logo: '/education%20basket.png',
        description:
          'At Education Basket, a dedicated team to empowering students in their academic and career journey.',
      },
    ],
    outcomes: [
      { value: 'Early', label: 'At-risk alerts' },
      { value: '24/7', label: 'AI advising access' },
      { value: 'Unified', label: 'SIS + LMS data' },
    ],
    caseStudy: {
      client: 'Regional University Network',
      result: 'Unified SIS, LMS, advising, assessment, and student engagement data across 14 campuses, giving advisors and faculty a shared view of student progress.',
      quote:
        'Digigate AI changed the conversation from reactive reporting to timely action. Advisors can see who needs help, faculty can see what is not landing, and students get answers when they need them.',
      author: 'CIO, University Council',
    },
    iconKey: 'education',
    accent: 'from-emerald-500 to-brand-500',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'University students walking together across campus',
  },
  {
    slug: 'aviation',
    name: 'Aviation',
    tagline: 'Mission-critical systems for Aviation Sector Related Business',
    hero: 'Turnkey aviation technology — from terminal operations to passenger experience and predictive maintenance.',
    description:
      'DigiGate delivers integrated catering aviation programs for airport catering operator, and related handling operation. We combine domain expertise, mission-critical engineering, and AI to keep operations safe, on-time, and profitable.',
    challenges: [
      'Coordinating dozens of stakeholders across airside and landside',
      'Predicting and preventing operational disruption',
      'Delivering a seamless, contactless passenger journey',
      'Meeting strict ICAO, IATA, and cybersecurity standards',
    ],
    solutions: [
      { title: 'Airport Operations Center (APOC)', desc: 'Real-time situational awareness across all stakeholders.' },
      { title: 'Smart logistic process', desc: 'Biometric flow, self-service, and real-time wayfinding.' },
      { title: 'Predictive Maintenance', desc: 'AI-driven asset health for Hi Loaders, Machines , and equipment.' },
      { title: 'Critical systems Cybersecurity', desc: 'OT/IT segmentation, SOC, and ICAO-compliant resilience.' },
    ],
    outcomes: [
      { value: '−28%', label: 'On-time-departure delays' },
      { value: '+42%', label: 'Self-service adoption' },
      { value: '99.99%', label: 'Critical-system uptime' },
    ],
    caseStudy: {
      client: 'International Hub Airport',
      result: 'Deployed an integrated APOC and biometric journey, reducing average passenger transit by 11 minutes.',
      quote:
        'Digigate brought the full stack — consultants, engineers, integrators, and 24/7 operations. One accountable partner.',
      author: 'COO, Airport Operator',
    },
    iconKey: 'aviation',
    accent: 'from-cyan-500 to-brand-500',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=70',
    imageAlt: 'Aircraft wing above clouds at sunset',
  },
  {
    slug: 'finance',
    name: 'Financial Services',
    tagline: 'Financial, insurance, and capital markets — re-engineered',
    hero: 'Turnkey solutions for digital banking, intelligent risk, and AI-powered customer engagement.',
    description:
      'DigiGate partners with fintechs to design and deliver end-to-end transformation: digital onboarding, core integrations, AML/fraud, advisor copilots, and contact-center modernization — all on regulated, compliant foundations.',
    challenges: [
      'Legacy core systems slowing down product launches',
      'Rising fraud, AML, and regulatory complexity',
      'Customer expectations set by global digital-native players',
      'Pressure on cost-to-income and operational efficiency',
    ],
    solutions: [
      { title: 'Digital Onboarding & KYC', desc: 'Biometric onboarding, eKYC, and orchestration across channels.' },
      { title: 'AI Risk & Fraud', desc: 'Real-time fraud, AML, and credit risk with explainable models.' },
      { title: 'Advisor & Agent Copilots', desc: 'Generative AI copilots for relationship managers and call centers.' },
      { title: 'Core & Channel Integration', desc: 'API gateways, event mesh, and modernization of core platforms.' },
    ],
    outcomes: [
      { value: '−70%', label: 'Onboarding time' },
      { value: '+3.2x', label: 'Fraud detection rate' },
      { value: '−38%', label: 'Cost-to-serve' },
    ],
    caseStudy: {
      client: 'Tier-1 Retail Bank',
      result: 'Launched digital onboarding + AI fraud platform in 7 months. 1.4M new customers in year one.',
      quote:
        'They owned the outcome. Strategy, build, integration, regulation — Digigate handled the entire program.',
      author: 'Chief Digital Officer',
    },
    iconKey: 'finance',
    accent: 'from-amber-500 to-accent-500',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=70',
    imageAlt: 'Financial trading screens with charts',
  },
  {
    slug: 'construction',
    name: 'Construction & Real Estate',
    tagline: 'Connected construction and intelligent built environments',
    hero: 'From BIM and digital twins to on-site IoT and smart-building operations — delivered turnkey.',
    description:
      'Digigate enables developers, contractors, and asset owners to digitize the full project lifecycle. We integrate BIM, ERP, IoT, and AI to bring projects in on time, on budget, and operationally intelligent from day one.',
    challenges: [
      'Cost and schedule overruns on complex mega-projects',
      'Disconnected design, construction, and operations data',
      'Health, safety, and quality at scale across worksites',
      'Operating efficient, sustainable buildings post-handover',
    ],
    solutions: [
      { title: 'Digital Twin & BIM Integration', desc: 'Federated models linked to live IoT and operations data.' },
      { title: 'Connected Worksite', desc: 'Computer vision for safety, progress capture, and equipment tracking.' },
      { title: 'Project Controls & ERP', desc: 'Cost, schedule, procurement, and document control unified.' },
      { title: 'Smart Building Operations', desc: 'Energy optimization, occupancy analytics, and tenant experience apps.' },
    ],
    outcomes: [
      { value: '−22%', label: 'Schedule overrun' },
      { value: '−35%', label: 'Safety incidents' },
      { value: '−18%', label: 'Building energy use' },
    ],
    caseStudy: {
      client: 'Mixed-use Mega Development',
      result: 'Delivered a federated digital twin connecting 14 contractors, 8 systems, and 12,000 IoT points.',
      quote:
        'Digigate is rare — they understand construction and technology. They delivered a single source of truth.',
      author: 'Program Director',
    },
    iconKey: 'construction',
    accent: 'from-orange-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=70',
    imageAlt: 'Modern construction site at dusk',
  },
  {
    slug: 'smart-cities',
    name: 'Smart Cities',
    tagline: 'AI-powered mobility, safety, and city operations',
    hero: 'Connected city platforms for traffic safety, enforcement, inspection, parking, emergency response, and real-time operations.',
    description:
      'Inspired by Tatweer MEA\'s smart-city product portfolio, Digigate brings together engineering services, intelligent systems, AI, edge devices, and city-scale operations into one integrated urban technology program.',
    challenges: [
      'City data is spread across roads, sensors, vehicles, inspections, parking, and enforcement systems',
      'Traffic congestion, crashes, weather events, and incidents require real-time decision support',
      'Manual inspection and enforcement workflows slow down field teams and reduce data accuracy',
      'Public safety teams need high-availability platforms that scale to millions of live transactions',
    ],
    solutions: [
      {
        title: 'RITSMS',
        desc: 'Real-time intelligent traffic safety management with integrated datasets, risk scoring, AI-driven predictive analytics, and actionable safety insights.',
        image: 'https://www.tatweermea.com/Uploads/Products/1cfb3d8f-8a10-4c64-8026-a47c374a429d_RITMS.jpg',
        imageAlt: 'Tatweer RITSMS traffic safety management system product image',
      },
      {
        title: 'Smart Towers',
        desc: 'Roadside monitoring towers for highways that track traffic, security, and environmental conditions during congestion, accidents, fog, and storms.',
        image: 'https://www.tatweermea.com/Uploads/Products/f92bf4ef-44a5-4e5d-a9dc-42edaf311fde_smart%20tower%201.jpg',
        imageAlt: 'Tatweer smart tower product image',
      },
      {
        title: 'Fleet Management System',
        desc: 'Live vehicle tracking, fleet control, and operational analytics for organizations that depend on mobile assets and field teams.',
        image: 'https://www.tatweermea.com/Uploads/Products/b11153d7-a5d5-43a8-8c9d-b8bab09c0326_Fleet%20Management%20System.jpg',
        imageAlt: 'Tatweer fleet management system product image',
      },
      {
        title: 'Smart Inspection Vehicle',
        desc: 'AI and edge-powered inspection using LiDAR and machine vision cameras to detect road defects automatically and send data to backend systems.',
        image: 'https://www.tatweermea.com/Uploads/Products/694c389f-0196-4c7c-a736-f807bbbd9323_SIV%20Thumbnail.png',
        imageAlt: 'Tatweer smart inspection vehicle product image',
      },
      {
        title: 'Unified Inspection System',
        desc: 'A standardized inspection platform for city authorities, helping unify inspection procedures, tools, and intelligent field mechanisms.',
        image: 'https://www.tatweermea.com/Uploads/Products/7041057a-3b48-469d-a9b3-f4f173baad8c_UIS%20Thumbnail.png',
        imageAlt: 'Tatweer unified inspection system product image',
      },
      {
        title: 'Parking Management System',
        desc: 'Indoor and outdoor parking management with accurate parking-duration tracking and plate recognition without inspector intervention.',
        image: 'https://www.tatweermea.com/Uploads/Products/2b353b97-1ef1-4ba2-8e62-f43a4c569492_Parking%20Management%20System.jpg',
        imageAlt: 'Tatweer parking management system product image',
      },
      {
        title: 'Undercover Police Vehicle',
        desc: 'Unmarked enforcement vehicles equipped with hidden devices to support stronger security and field enforcement procedures.',
        image: 'https://www.tatweermea.com/Uploads/Products/e56e07de-c37d-447a-bbbe-6ded7a7d2c43_under%20cover%20V.jpg',
        imageAlt: 'Tatweer undercover police vehicle product image',
      },
      {
        title: 'High-Speed Weigh-In-Motion System',
        desc: 'Roadway enforcement technology that measures the weight and height of moving vehicles for safety and compliance use cases.',
        image: 'https://www.tatweermea.com/Uploads/Products/ce080d7d-fe2a-4e7c-b287-64b564d73569_High%20Speed%20Weigh%20In%20Motion%20System.jpg',
        imageAlt: 'Tatweer high-speed weigh-in-motion system product image',
      },
      {
        title: 'Traffic Signal Optimization',
        desc: 'Signal timing review and corridor optimization to reduce delays, improve safety, support maintenance planning, and synchronize routes.',
        image: 'https://www.tatweermea.com/Uploads/Products/4d68c8a7-76da-459c-8d89-1890cf8af1a2_MicrosoftTeams-image%20(52).png',
        imageAlt: 'Tatweer traffic signal optimization product image',
      },
      {
        title: 'Smart Driving Test System',
        desc: 'Automated driving behavior assessment using AI, sensors, cameras, scoring criteria, evidence capture, and standardized licensing workflows.',
        image: 'https://www.tatweermea.com/Uploads/Products/0c09a5f9-92f2-48ba-9737-a6b37021e598_SMART%20DRIVING%20TEST%20SYSTEM.jpg',
        imageAlt: 'Tatweer smart driving test system product image',
      },
      {
        title: 'Smart Vehicle Impounding System',
        desc: 'A customer-friendly smart impounding model that allows vehicles to remain at the owner\'s premises during the impounding period.',
        image: 'https://www.tatweermea.com/Uploads/Products/97b18f8f-cf3a-4c94-b37c-921671d18bf8_5381b431-8a84-484b-8831-861b1d9b4cfd_Untitled-7_0000s_0001s_0000_SVIS.jpg',
        imageAlt: 'Tatweer smart vehicle impounding system product image',
      },
      {
        title: 'Smart Safe City System',
        desc: 'Event-driven command-center architecture that ingests road and sensor data at scale, generates intelligent SOPs, and supports emergency response.',
        image: 'https://www.tatweermea.com/Uploads/Products/0ba988a4-3186-451d-b5ec-9cac98e840ba_SMART%20SAFE%20CITY%20SYSTEM%202.jpg',
        imageAlt: 'Tatweer smart safe city system product image',
      },
      {
        title: 'Intelligent Patrol Vehicle',
        desc: 'Integrated patrol ecosystem with ANPR, seatbelt and distracted-driver detection, 360-degree surveillance, facial recognition, speed detection, and mobile apps.',
        image: 'https://www.tatweermea.com/Uploads/Products/1a3cdad6-6e46-472e-9c1b-495674a6eac9_Intelligent%20Patrol%20Vehicle.jpg',
        imageAlt: 'Tatweer intelligent patrol vehicle product image',
      },
    ],
    outcomes: [
      { value: '24/7', label: 'City monitoring' },
      { value: 'AI', label: 'Predictive safety' },
      { value: 'Real-time', label: 'Operations control' },
    ],
    caseStudy: {
      client: 'Integrated Smart City Operations Program',
      result: 'Unified mobility, safety, inspection, parking, enforcement, and patrol capabilities into a single operating model for faster decisions and safer streets.',
      quote:
        'The value of a smart city program is not one device or one dashboard. It is the connected operating model across every road, vehicle, field team, and command center.',
      author: 'Smart Cities Program Lead',
    },
    iconKey: 'smart-cities',
    accent: 'from-cyan-400 to-emerald-500',
    image: 'https://www.tatweermea.com/Uploads/Products/0ba988a4-3186-451d-b5ec-9cac98e840ba_SMART%20SAFE%20CITY%20SYSTEM%202.jpg',
    imageAlt: 'Tatweer smart safe city system product image',
  },
]

export const getSector = (slug?: string) => sectors.find((s) => s.slug === slug)
