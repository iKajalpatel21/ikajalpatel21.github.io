import Hero from '../sections/Hero'
import WhoAmI from '../sections/WhoAmI'
import ProjectsGrid from '../sections/ProjectsGrid'
import HackathonsSection from '../sections/HackathonsSection'
import ExperienceSection from '../sections/ExperienceSection'
import SkillsSection from '../sections/SkillsSection'
import BlogsSection from '../sections/BlogsSection'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="content-body">
        <WhoAmI />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <ProjectsGrid />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <HackathonsSection />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <ExperienceSection />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <SkillsSection />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <BlogsSection />
        <div className="section-divider" style={{ maxWidth: 1100, margin: '0 auto 0' }} />
        <ContactSection />
        <footer>
          <div className="footer">
            <span className="footer-copy">© 2025 Kajal Patel</span>
            <div className="footer-links">
              <a href="https://medium.com/@k.patel1" target="_blank" rel="noreferrer">Medium</a>
              <a href="https://github.com/iKajalpatel21" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/kajal-patel-cs/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
