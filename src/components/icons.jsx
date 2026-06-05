// Lightweight inline icons — no external icon library needed.

export function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </g>
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 14.2A8 8 0 1 1 9.8 4 6.3 6.3 0 0 0 20 14.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49v-1.9c-2.84.62-3.44-1.2-3.44-1.2-.47-1.18-1.14-1.5-1.14-1.5-.93-.64.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.92 1.57 2.4 1.12 2.99.86.09-.67.36-1.12.65-1.38-2.27-.26-4.66-1.14-4.66-5.06 0-1.12.4-2.03 1.05-2.74-.1-.26-.46-1.3.1-2.71 0 0 .86-.28 2.82 1.05a9.7 9.7 0 0 1 5.13 0c1.96-1.33 2.82-1.05 2.82-1.05.56 1.41.21 2.45.1 2.71.66.71 1.05 1.62 1.05 2.74 0 3.93-2.4 4.79-4.68 5.05.37.32.7.94.7 1.9v2.82c0 .27.18.6.7.49A10.2 10.2 0 0 0 12 1.8Z"
      />
    </svg>
  )
}

export function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" {...props}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CopyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 15H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 3h8.5A1.5 1.5 0 0 1 15 4.5V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true" {...props}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
