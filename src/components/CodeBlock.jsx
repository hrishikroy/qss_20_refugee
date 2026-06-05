import { useState } from 'react'
import { CheckIcon, CopyIcon } from './icons.jsx'

const KEYWORDS = new Set([
  'import', 'from', 'as', 'def', 'return', 'for', 'in', 'if', 'else', 'elif',
  'while', 'and', 'or', 'not', 'None', 'True', 'False', 'with', 'lambda',
])
const BUILTINS = new Set(['print', 'len', 'range', 'list', 'dict', 'sum', 'min', 'max'])

const isIdentStart = (c) => /[A-Za-z_]/.test(c)
const isIdent = (c) => /[A-Za-z0-9_]/.test(c)
const isDigit = (c) => /[0-9]/.test(c)

// Tokenize a single line into typed spans. Char-by-char so output is always
// well-formed (no regex overlap, no dangerouslySetInnerHTML).
function tokenizeLine(line, lineKey) {
  const out = []
  let i = 0
  let buf = ''
  const flush = () => {
    if (buf) {
      out.push(buf)
      buf = ''
    }
  }
  const push = (cls, text, k) =>
    out.push(
      <span className={`tok tok--${cls}`} key={`${lineKey}-${k}`}>
        {text}
      </span>,
    )

  while (i < line.length) {
    const c = line[i]

    // comment
    if (c === '#') {
      flush()
      push('comment', line.slice(i), i)
      break
    }

    // string literal
    if (c === '"' || c === "'") {
      flush()
      const quote = c
      let j = i + 1
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++
        j++
      }
      j = Math.min(j + 1, line.length)
      push('str', line.slice(i, j), i)
      i = j
      continue
    }

    // number
    if (isDigit(c)) {
      flush()
      let j = i
      while (j < line.length && /[0-9._]/.test(line[j])) j++
      push('num', line.slice(i, j), i)
      i = j
      continue
    }

    // identifier
    if (isIdentStart(c)) {
      flush()
      let j = i
      while (j < line.length && isIdent(line[j])) j++
      const word = line.slice(i, j)
      let k = j
      while (k < line.length && line[k] === ' ') k++
      const isCall = line[k] === '('
      let cls = 'ident'
      if (KEYWORDS.has(word)) cls = 'kw'
      else if (BUILTINS.has(word)) cls = 'builtin'
      else if (isCall) cls = 'fn'
      push(cls, word, i)
      i = j
      continue
    }

    // punctuation / operators
    if (/[()[\]{}=+\-*/%~,.:<>]/.test(c)) {
      flush()
      push('punc', c, i)
      i++
      continue
    }

    buf += c
    i++
  }
  flush()
  return out
}

export default function CodeBlock({ code, language = 'python' }) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      /* clipboard blocked; no-op */
    }
  }

  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span className="code__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="code__lang">{language}</span>
        <button type="button" className="code__copy" onClick={copy} aria-label="Copy code">
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="code__pre" tabIndex={0}>
        <code>
          {lines.map((line, idx) => (
            <span className="code__line" key={idx}>
              <span className="code__ln" aria-hidden="true">{idx + 1}</span>
              <span className="code__txt">
                {line.length ? tokenizeLine(line, idx) : '\u200b'}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
