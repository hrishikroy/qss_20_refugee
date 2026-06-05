import { useMemo } from 'react'
import { meta } from '../data.js'
import { ChevronDown } from './icons.jsx'

// Deterministic pseudo-random generator so the scatter is stable across renders.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Echoes the real scatterplot: points cluster near low x and thin out to the right.
function useScatter(count = 80) {
  return useMemo(() => {
    const rnd = mulberry32(20240517)
    const W = 1200
    const H = 720
    const pts = []
    for (let i = 0; i < count; i++) {
      const xr = Math.pow(rnd(), 2.4) // bias toward the left
      const x = 40 + xr * (W - 80)
      const spread = 70 + (1 - xr) * 150 // wider vertical scatter at low x
      const y = H / 2 + (rnd() - 0.5) * 2 * spread
      const r = 2 + rnd() * 3.4
      const o = 0.18 + rnd() * 0.5
      pts.push({ x, y, r, o, key: i })
    }
    return { W, H, pts }
  }, [count])
}

export default function Hero() {
  const { W, H, pts } = useScatter()

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <svg className="hero__scatter" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
          <line x1="40" y1={H / 2} x2={W - 40} y2={H / 2 + 46} className="hero__trend" />
          {pts.map((p) => (
            <circle key={p.key} cx={p.x} cy={p.y} r={p.r} className="hero__dot" style={{ opacity: p.o }} />
          ))}
        </svg>
      </div>

      <div className="hero__content reveal-hero">
        <p className="hero__eyebrow">
          <span>Quantitative Social Science</span>
          <span className="hero__eyebrow-dot" aria-hidden="true">·</span>
          <span>Italy, 2018 — 2022</span>
        </p>

        <h1 className="hero__title">
          Does greater exposure to refugees{' '}
          <span className="hero__title-accent">shift voter behavior?</span>
        </h1>

        <p className="hero__subtitle">{meta.subtitle}</p>
        <p className="hero__context">{meta.context}</p>

        <div className="hero__byline">
          <span className="hero__byline-rule" aria-hidden="true" />
          <span>{meta.author}</span>
        </div>
      </div>

      <a className="hero__scroll" href="#question" aria-label="Scroll to the research question">
        <span>Read the study</span>
        <ChevronDown />
      </a>
    </section>
  )
}
