import { useTheme } from './hooks/useTheme.js'
import {
  code,
  dataSources,
  limitations,
  motivation,
  researchQuestion,
} from './data.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Findings from './components/Findings.jsx'
import CodeBlock from './components/CodeBlock.jsx'
import Footer from './components/Footer.jsx'
import { ArrowUpRight } from './components/icons.jsx'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Nav theme={theme} onToggle={toggle} />
      <Hero />

      <main className="content">
        <Section id="question" number="01" kicker="The puzzle" title="Research question">
          <blockquote className="bigquote">
            <span className="bigquote__mark" aria-hidden="true">“</span>
            {researchQuestion}
          </blockquote>
        </Section>

        <Section
          id="motivation"
          number="02"
          kicker="Motivation & literature"
          title="From attitudes to action"
        >
          <div className="prose">
            {motivation.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="prose__cite">
              <a className="link link--ext" href={motivation.citation.href} target="_blank" rel="noreferrer">
                {motivation.citation.text} <ArrowUpRight />
              </a>
            </p>
            <p className="prose__pull">{motivation.question}</p>
          </div>
        </Section>

        <Section id="data" number="03" kicker="Where the numbers come from" title="Data sources">
          <ul className="sources">
            {dataSources.map((s) => (
              <li key={s.name} className="source-card">
                <div className="source-card__head">
                  <h3 className="source-card__name">{s.name}</h3>
                  <span className="source-card__full">{s.full}</span>
                </div>
                <p className="source-card__desc">{s.description}</p>
                <a className="link link--ext source-card__link" href={s.href} target="_blank" rel="noreferrer">
                  {s.site} <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="findings" number="04" kicker="What the data shows" title="Findings">
          <Findings />
        </Section>

        <Section id="code" number="05" kicker="Reproducibility" title="The model">
          <p className="prose prose--lead">
            A linear (OLS) regression of the change in centre-left vote share on refugee
            presence, with employment and the 2018 baseline as controls.
          </p>
          <CodeBlock code={code} language="python" />
        </Section>

        <Section id="limitations" number="06" kicker="Reading with care" title="Limitations">
          <ul className="limits">
            {limitations.map((l, i) => (
              <li key={l.title} className="limit">
                <span className="limit__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="limit__title">{l.title}</h3>
                  <p className="limit__detail">{l.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <Footer />
    </>
  )
}
