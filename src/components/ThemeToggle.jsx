import { MoonIcon, SunIcon } from './icons.jsx'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle__icon" key={theme}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}
