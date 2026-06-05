import { useEffect, useState } from 'react'
import { nav } from '../data.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Nav({ theme, onToggle }) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
        setScrolled(h.scrollTop > 12)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="Back to top">
          <span className="nav__mark" aria-hidden="true">HR</span>
          <span className="nav__brandtext">Refugees & the Vote</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
      <div className="nav__progress" style={{ transform: `scaleX(${progress / 100})` }} />
    </header>
  )
}
