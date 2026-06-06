import { useEffect, useRef } from 'react'

const categories = [
  {
    title: 'Data Engineering',
    tags: ['Python', 'SQL', 'Apache Spark', 'PySpark', 'Kafka', 'Airflow', 'dbt'],
  },
  {
    title: 'Cloud & Infrastructure',
    tags: ['AWS (S3, EMR, Redshift)', 'Databricks', 'Docker', 'Kubernetes', 'GCP'],
  },
  {
    title: 'Machine Learning & Research',
    tags: ['Scikit-learn', 'TensorFlow', 'Neural Signal Processing', 'Spike Sorting', 'NLTK'],
  },
  {
    title: 'Storage & Formats',
    tags: ['PostgreSQL', 'MySQL', 'Delta Lake', 'Parquet', 'Avro', 'NoSQL', 'Neo4j'],
  },
  {
    title: 'Backend & APIs',
    tags: ['Django', 'REST APIs', 'GraphRAG', 'Next.js'],
  },
  {
    title: 'Visualization & Tooling',
    tags: ['Tableau', 'Matplotlib', 'Seaborn', 'Git', 'Linux'],
  },
]

export default function SkillsSection() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const els = [headerRef.current, gridRef.current]
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.08 }
    )
    els.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="section">
      <div ref={headerRef} className="animate">
        <div className="section-label">Skills</div>
        <h2 className="section-title">What I work with.</h2>
      </div>
      <div ref={gridRef} className="skills-grid animate animate-delay-1">
        {categories.map(cat => (
          <div key={cat.title} className="skill-category">
            <div className="skill-category-title">{cat.title}</div>
            <div className="skill-tags">
              {cat.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
