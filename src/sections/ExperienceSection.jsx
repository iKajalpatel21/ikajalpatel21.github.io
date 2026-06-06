import { useEffect, useRef } from 'react'

function GradIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function WorkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

const EXPERIENCE = [
  {
    type: 'work',
    icon: <WorkIcon />,
    title: 'Software Engineer @ GWU Medicine',
    desc: 'Designed ML data pipeline infrastructure for large-scale neural signal processing workflows using SpikeInterface.',
    date: 'May 2025 - Present',
  },
  {
    type: 'work',
    icon: <WorkIcon />,
    title: 'Senior Data Engineer @ Stridely Solutions',
    desc: 'Led enterprise ETL and BI pipelines across data engineering roles, supporting scalable reporting and analytics infrastructure.',
    date: 'Nov 2019 - Nov 2023',
  },
  {
    type: 'work',
    icon: <WorkIcon />,
    title: 'Software Engineer @ Shine Software',
    desc: 'Built mobile applications with Flutter and Android, with applied work in sentiment analysis and user-focused product features.',
    date: 'Aug 2017 - Dec 2018',
  },
]

const EDUCATION = [
  {
    type: 'edu',
    icon: <GradIcon />,
    title: 'M.S. Computer Science @ George Washington University',
    desc: 'Focused on machine learning, data systems, and neuroscience-oriented computing.',
    date: 'Jan 2024 - Dec 2025',
  },
  {
    type: 'edu',
    icon: <GradIcon />,
    title: 'B.E. Information Technology @ LDRP',
    desc: 'Gujarat Technological University.',
    date: '2014 - 2017',
  },
]

function JourneyCard({ item }) {
  if (!item) return null
  return (
    <div className="journey-card">
      <div className="journey-card-header">
        <div className={`journey-card-icon ${item.type}`}>{item.icon}</div>
        <div className="journey-card-title">{item.title}</div>
      </div>
      <div className="journey-card-desc">{item.desc}</div>
      <div className="journey-card-date">{item.date}</div>
    </div>
  )
}

export default function ExperienceSection() {
  const headingRef = useRef(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="section">
      <div ref={headingRef} className="experience-heading animate">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Work and education</h2>
      </div>

      <div className="experience-layout">
        <div className="experience-column">
          <div className="experience-column-label">Professional</div>
          <div className="journey-list">
            {EXPERIENCE.map((item) => (
              <JourneyCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="experience-column">
          <div className="experience-column-label">Education</div>
          <div className="journey-list">
            {EDUCATION.map((item) => (
              <JourneyCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
