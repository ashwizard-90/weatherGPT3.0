import { useTheme } from '../context/ThemeContext'

interface Props {
  size?: number
  variant?: 'navbar' | 'topbar' | 'default'
}

export default function ThemeToggle({ size = 36, variant = 'default' }: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const title = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const bg = variant === 'navbar'
    ? 'rgba(245,247,250,0.12)'
    : isDark ? 'rgba(245,247,250,0.10)' : 'var(--paper-2)'
  const border = variant === 'navbar' ? '1px solid var(--line-dark)' : '1px solid var(--line-light)'
  const color = variant === 'navbar' ? 'var(--paper)' : 'var(--ink)'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={title}
      title={title}
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        border,
        background: bg,
        color,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        transition: 'background 0.2s, color 0.2s, border-color 0.2s',
      }}
    >
      {isDark ? (
        // Sun — visible on dark background (light color)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <path d="M12 2v1.8M12 20.2V22M4.2 4.2l1.3 1.3M18.5 18.5l1.3 1.3M2 12h1.8M20.2 12H22M4.2 19.8l1.3-1.3M18.5 5.5l1.3-1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon — visible on light background (dark color)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17.8 14.6A7.2 7.2 0 0 1 9.4 6.2 6 6 0 0 0 17.8 14.6z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.0" />
        </svg>
      )}
    </button>
  )
}
