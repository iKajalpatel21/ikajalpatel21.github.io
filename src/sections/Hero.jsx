export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-label">Software Engineer · Data Systems</div>
        <h1 className="hero-name">Kajal Patel</h1>
        <p className="hero-title">
          Building scalable data infrastructure&nbsp;&&nbsp;AI-integrated pipelines.
        </p>
        <div className="hero-ctas">
          <a
            href="https://www.linkedin.com/in/kajal-patel-cs/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/iKajalpatel21"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub
          </a>
          <a href="mailto:ikajalpatel21@gmail.com" className="btn btn-ghost">
            Email
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        scroll
      </div>
    </section>
  )
}
