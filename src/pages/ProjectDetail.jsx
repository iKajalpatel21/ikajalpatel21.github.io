import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const [activeSection, setActiveSection] = useState(project?.sections[0]?.id ?? '')
  const sectionRefs = useRef({})
  const contentRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!project) return
    const observers = []

    project.sections.forEach(sec => {
      const el = sectionRefs.current[sec.id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sec.id)
          el.classList.toggle('visible', entry.isIntersecting || el.getBoundingClientRect().top < 0)
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    // Trigger visibility for elements already in view
    setTimeout(() => {
      project.sections.forEach(sec => {
        const el = sectionRefs.current[sec.id]
        if (el && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        }
      })
    }, 100)

    return () => observers.forEach(o => o.disconnect())
  }, [project])

  if (!project) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center', color: 'var(--text-3)' }}>
        <p>Project not found.</p>
        <Link to="/" style={{ color: 'var(--accent-l)', marginTop: 16, display: 'inline-block' }}>
          ← Back home
        </Link>
      </div>
    )
  }

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId]
    if (el) {
      const offset = 96
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="detail-layout">
      {/* Sidebar */}
      <aside className="detail-sidebar">
        <div className="sidebar-header">Contents</div>
        {project.sections.map(sec => (
          <button
            key={sec.id}
            className={`sidebar-link${activeSection === sec.id ? ' active' : ''}`}
            onClick={() => scrollToSection(sec.id)}
          >
            {sec.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="detail-content" ref={contentRef}>
        {/* Header */}
        <div className="detail-header">
          <div className="detail-badge">{project.badge}</div>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>
          <div className="detail-links">
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="detail-link"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {project.sections.map(sec => (
          <section
            key={sec.id}
            id={sec.id}
            ref={el => sectionRefs.current[sec.id] = el}
            className="detail-section animate"
          >
            <div className="detail-section-title">{sec.label}</div>

            {/* Text content */}
            {sec.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Single image */}
            {sec.image && (
              <img src={sec.image} alt={sec.label} className="detail-image" />
            )}

            {/* Multiple images */}
            {sec.images && (
              <div className="detail-images">
                {sec.images.map(src => (
                  <img key={src} src={src} alt="" className="detail-image" style={{ margin: 0 }} />
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Tags */}
        <div style={{ paddingTop: 40, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map(t => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>

        {/* Back link */}
        <div style={{ paddingTop: 48 }}>
          <Link to="/" className="detail-link" style={{ display: 'inline-flex' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All projects
          </Link>
        </div>
      </div>
    </div>
  )
}
