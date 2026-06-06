import { useEffect, useRef } from 'react'
import { hackathons } from '../data/hackathons'

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function HackCard({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="hack-card animate"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="hack-card-top">
        <div className="hack-event-badge">{item.event}</div>
        <div className="hack-links">
          <a href={item.github} target="_blank" rel="noreferrer" className="hack-link">
            <GitHubIcon /> GitHub <ArrowIcon />
          </a>
          {item.devpost && (
            <a href={item.devpost} target="_blank" rel="noreferrer" className="hack-link">
              <LinkIcon /> Devpost <ArrowIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className="hack-project-name">{item.project}</h3>
      <p className="hack-tagline">{item.tagline}</p>
      <p className="hack-desc">{item.description}</p>

      <div className="hack-tags">
        {item.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
      </div>

      <div className="hack-learning">
        <div className="hack-learning-label">Key Learning</div>
        <p className="hack-learning-text">{item.learning}</p>
      </div>
    </div>
  )
}

export default function HackathonsSection() {
  const headingRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const els = [headingRef.current, subRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hackathons" className="section">
      <div className="section-label">Competition</div>
      <h2 ref={headingRef} className="section-title animate">Built at Hackathons</h2>
      <p ref={subRef} className="hack-intro animate animate-delay-1">
        Compressed timelines force clarity. These are projects I built under pressure. Each one taught me something I couldn't have learned any other way.
      </p>

      <div className="hack-grid">
        {hackathons.map((item, i) => (
          <HackCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
