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

/*
  Snake layout (newest → oldest, top → bottom):

  Row 0:  [M.S. @ GWU]          [Research Asst @ GWU Med]   → uturn RIGHT
  Row 1:  [phantom]             [Senior DE @ Stridely]       → uturn LEFT
  Row 2:  [B.E. @ LDRP]        [SWE @ Shine Software]
*/
const SEGMENTS = [
  {
    left: {
      type: 'edu', icon: <GradIcon />,
      title: 'M.S. @ George Washington University',
      desc: 'Computer Science: Machine Learning, Data Systems, Neuroscience.',
      date: 'Jan 2024 – Dec 2025',
    },
    right: {
      type: 'work', icon: <WorkIcon />,
      title: 'Research Assistant III @ GWU Medicine',
      desc: 'ML pipelines for neural signal processing and spike sorting.',
      date: 'May 2025 – Present',
    },
    uturn: 'right',
  },
  {
    left: null,
    right: {
      type: 'work', icon: <WorkIcon />,
      title: 'Senior Data Engineer @ Stridely Solutions',
      desc: 'BI Intern → Data Engineer → Senior DE. Enterprise ETL pipelines.',
      date: 'Nov 2019 – Nov 2023',
    },
    uturn: 'left',
  },
  {
    left: {
      type: 'edu', icon: <GradIcon />,
      title: 'B.E. Information Technology @ LDRP',
      desc: 'Gujarat Technological University.',
      date: '2014 – 2017',
    },
    right: {
      type: 'work', icon: <WorkIcon />,
      title: 'Software Engineer @ Shine Software',
      desc: 'Mobile app development with Flutter, sentiment analysis pipelines.',
      date: 'Aug 2017 – Dec 2018',
    },
    uturn: null,
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
      <h2 ref={headingRef} className="journey-heading animate">My Journey</h2>

      <div className="snake-wrap">
        {SEGMENTS.map((seg, i) => (
          <div key={i}>
            <div className="snake-seg">
              {/* Cards row */}
              <div className="snake-cards">
                <div className={`snake-card-slot left${!seg.left ? ' empty' : ''}`}>
                  <JourneyCard item={seg.left} />
                </div>
                <div className="snake-card-slot right">
                  <JourneyCard item={seg.right} />
                </div>
              </div>

              {/* Rail: line + dots */}
              <div className="snake-rail">
                <div className={`snake-dot ${seg.left ? seg.left.type : 'empty'}`} />
                <div className={`snake-dot ${seg.right ? seg.right.type : 'empty'}`} />
              </div>
            </div>

            {/* U-turn between segments */}
            {seg.uturn && <div className={`snake-uturn ${seg.uturn}`} />}
          </div>
        ))}
      </div>
    </section>
  )
}
