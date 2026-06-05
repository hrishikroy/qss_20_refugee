import { dataSources, links, meta } from '../data.js'
import { ArrowUpRight, GithubIcon } from './icons.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="repo">
      <div className="footer__cta">
        <div>
          <p className="footer__kicker">Code & data</p>
          <h2 className="footer__title">Explore the full analysis</h2>
          <p className="footer__lede">
            Cleaning scripts, the regression model, and the underlying commune-level
            dataset are all on GitHub.
          </p>
        </div>
        <a className="btn btn--primary" href={links.github} target="_blank" rel="noreferrer">
          <GithubIcon />
          View the repository
          <ArrowUpRight />
        </a>
      </div>

      <div className="footer__meta">
        <p>
          <strong>{meta.author}</strong> · {meta.title} {meta.subtitle}.
        </p>
        <p className="footer__sources">
          Data:{' '}
          {dataSources.map((s, i) => (
            <span key={s.name}>
              <a className="link" href={s.href} target="_blank" rel="noreferrer">
                {s.name}
              </a>
              {i < dataSources.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
        <p className="footer__fine">© {year} · Built with React & Vite</p>
      </div>
    </footer>
  )
}
