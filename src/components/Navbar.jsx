import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isDetail = location.pathname.startsWith('/project/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        Kajal <span>Patel</span>
      </Link>

      {isDetail ? (
        <Link to="/" className="nav-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      ) : (
        <div className="nav-links">
          <a onClick={() => scrollTo('about')} style={{ cursor: 'pointer' }}>About</a>
          <a onClick={() => scrollTo('work')} style={{ cursor: 'pointer' }}>Work</a>
          <a onClick={() => scrollTo('hackathons')} style={{ cursor: 'pointer' }}>Hackathons</a>
          <a onClick={() => scrollTo('experience')} style={{ cursor: 'pointer' }}>Experience</a>
          <a onClick={() => scrollTo('writing')} style={{ cursor: 'pointer' }}>Writing</a>
          <a onClick={() => scrollTo('contact')} style={{ cursor: 'pointer' }}>Contact</a>
        </div>
      )}
    </nav>
  )
}
