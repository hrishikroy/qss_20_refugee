# Does greater exposure to refugees shift voter behavior? — Evidence from Italy

A single-page research site (React + Vite) presenting a commune-level analysis of
refugee reception and centre-left vote share change in Italy, 2018 → 2022.
By **Hrishik Roy**.

Features a dark/light theme (persisted, with system-preference detection), a fully
responsive editorial layout, the headline regression result rendered as a native
HTML table, the project's scatterplot figure, the model code, and links to every
data source.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
.
├── index.html              # entry HTML (fonts + pre-paint theme script)
├── vite.config.js          # Vite + @vitejs/plugin-react, base: './'
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # page composition
│   ├── data.js             # all content (text, sources, table, code)
│   ├── index.css           # design tokens + all styles (dark/light)
│   ├── assets/
│   │   └── figure-scatter.png
│   ├── hooks/
│   │   ├── useTheme.js     # theme state + persistence
│   │   └── useReveal.js    # scroll-reveal (IntersectionObserver)
│   └── components/
│       ├── Nav.jsx  Hero.jsx  Section.jsx
│       ├── Findings.jsx  CodeBlock.jsx  Footer.jsx
│       ├── ThemeToggle.jsx  icons.jsx
└── ...
```

## Deploying

The build uses a relative `base` (`./`), so the contents of `dist/` can be hosted
from any path — including a GitHub Pages project site. Just build and publish `dist/`.

## Notes

The figure is the project's own scatterplot. The regression table is rendered as
semantic HTML (rather than an image) so it themes correctly and stays accessible.
Typography uses Fraunces (display), Hanken Grotesk (body), and JetBrains Mono
(figures/code), loaded from Google Fonts.

## Data sources

- ISTAT — Istituto Nazionale di Statistica
- Ministero dell'Interno — historical election results
- Openpolis & ActionAid — *Centri d'Italia* reception-system open data

Repository: https://github.com/hrishikroy/qss_20_refugee
