import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function useAnimate(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link
      to={`/project/${project.id}`}
      ref={ref}
      className={`project-card animate${project.featured ? ' featured' : ''}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div className="project-badge">{project.badge}</div>
      <h3 className="project-card-title">{project.title}</h3>
      {project.thumbnail && (
        <img src={project.thumbnail} alt={project.title} className="project-card-image" />
      )}
      <p className="project-card-excerpt">{project.subtitle}</p>
      <div className="project-tags">
        {project.tags.slice(0, 4).map(t => (
          <span key={t} className="project-tag">{t}</span>
        ))}
      </div>
      <div className="project-card-footer">
        <span className="project-card-arrow">
          View project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function ProjectsGrid() {
  const labelRef = useAnimate()

  return (
    <section id="work" className="section">
      <div ref={labelRef} className="animate">
        <div className="section-label">Work</div>
        <h2 className="section-title">What I've built.</h2>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
