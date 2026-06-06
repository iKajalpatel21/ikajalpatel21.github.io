import { useEffect, useRef } from 'react'

const blogs = [
  {
    title: 'Data Engineering Agent in BigQuery: The Future of Autonomous Data Pipelines',
    url: 'https://medium.com/@k.patel1/data-engineering-agent-in-bigquery-the-future-of-autonomous-data-pipelines-b13310d3d77c',
  },
  {
    title: "NVIDIA's $500B Bet: Five Strategic Moves That Signal a New Era in AI Infrastructure",
    url: 'https://medium.com/@k.patel1/nvidias-washington-moment-how-jensen-huang-just-declared-america-s-ai-independence-37cb95139a46',
  },
  {
    title: "Why Amazon Is Really Laying People Off (Hint: It's Not Robots)",
    url: 'https://medium.com/@k.patel1/the-hidden-cost-of-ai-why-tech-layoffs-arent-about-automation-yet-2e8d4dd1faa3',
  },
  {
    title: 'The Hidden Hardware Layer of AI: What Nobody Talks About Beyond GPUs',
    url: 'https://medium.com/@k.patel1/the-hidden-hardware-layer-of-ai-what-nobody-talks-about-beyond-gpus-0075928591a0',
  },
  {
    title: 'The Data Engineering Landscape Just Shifted Overnight! Here\'s What You Missed',
    url: 'https://medium.com/@k.patel1',
  },
  {
    title: 'Why Pinterest Feels Different',
    url: 'https://medium.com/@k.patel1',
  },
]

export default function BlogsSection() {
  const headerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const els = [headerRef.current, listRef.current]
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.08 }
    )
    els.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="writing" className="section">
      <div ref={headerRef} className="animate">
        <div className="section-label">Writing</div>
        <h2 className="section-title">What I think about.</h2>
      </div>
      <p className="blog-intro animate-delay-1">
        I write about data engineering, AI infrastructure, and the systems behind emerging tech on{' '}
        <a href="https://medium.com/@k.patel1" target="_blank" rel="noreferrer">Medium</a>.
      </p>
      <div ref={listRef} className="blog-list animate animate-delay-2">
        {blogs.map(b => (
          <div key={b.title} className="blog-item">
            <a href={b.url} target="_blank" rel="noreferrer">{b.title}</a>
            <svg className="blog-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  )
}
