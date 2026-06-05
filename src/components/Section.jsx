import { useReveal } from '../hooks/useReveal.js'

export default function Section({ id, number, kicker, title, children, className = '' }) {
  const { ref, visible } = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-title`}
      className={`section reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      <div className="section__head">
        <span className="section__number">{number}</span>
        <div>
          {kicker ? <p className="section__kicker">{kicker}</p> : null}
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
        </div>
      </div>
      <div className="section__body">{children}</div>
    </section>
  )
}
