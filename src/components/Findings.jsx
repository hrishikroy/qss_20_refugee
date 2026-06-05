import { findings, regression } from '../data.js'
import { ArrowUpRight } from './icons.jsx'
import figureUrl from '../assets/figure-scatter.png'

function RegressionTable() {
  return (
    <figure className="regtable">
      <figcaption className="regtable__cap">{regression.caption}</figcaption>
      <div className="regtable__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col" className="regtable__term">Term</th>
              <th scope="col" className="regtable__num">{regression.depVar}</th>
            </tr>
          </thead>
          <tbody>
            {regression.rows.map((r) => (
              <tr key={r.label} className={r.highlight ? 'is-key' : ''}>
                <th scope="row" className="regtable__term">{r.label}</th>
                <td className="regtable__num">
                  <span className="regtable__coef">
                    {r.coef}
                    <sup className="regtable__stars">{r.stars}</sup>
                  </span>
                  <span className="regtable__se">({r.se})</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {regression.stats.map((s) => (
              <tr key={s.label}>
                <th scope="row" className="regtable__term">{s.label}</th>
                <td className="regtable__num">{s.value}</td>
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <p className="regtable__notes">{regression.notes}</p>
      <a className="link link--ext regtable__src" href={regression.sourceHref} target="_blank" rel="noreferrer">
        View original table <ArrowUpRight />
      </a>
    </figure>
  )
}

export default function Findings() {
  const { value, unit } = findings.headlineStat
  return (
    <div className="findings">
      <div className="callout">
        <span className="callout__tag">Short answer — Yes</span>
        <p className="callout__text">{findings.shortAnswer}</p>
      </div>

      <div className="findings__grid">
        <div className="stat">
          <div className="stat__value">
            {value}
            <span className="stat__unit">{unit}</span>
          </div>
          <p className="stat__caption">{findings.headlineStat.caption}</p>
          <span className="stat__sig">{findings.headlineStat.sig}</span>
        </div>

        <figure className="figure">
          <div className="figure__frame">
            <img src={figureUrl} alt={findings.figure.caption} />
          </div>
          <figcaption className="figure__cap">{findings.figure.caption}</figcaption>
          <a className="link link--ext figure__src" href={findings.figure.sourceHref} target="_blank" rel="noreferrer">
            View original figure <ArrowUpRight />
          </a>
        </figure>
      </div>

      <RegressionTable />
    </div>
  )
}
