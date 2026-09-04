interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function Logo({ variant = 'dark', size = 28 }: LogoProps) {
  const fg = variant === 'dark' ? '#0B1220' : '#F5F7FA'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0B1220" />
        <circle cx="13" cy="14" r="6" fill="#2DA8D8" />
        <path
          d="M9 22h14a4 4 0 0 0 0-8 6.5 6.5 0 0 0-12.5-1.8A5 5 0 0 0 9 22Z"
          fill="#F5F7FA"
        />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 800,
          fontSize: size * 0.62,
          letterSpacing: '-0.02em',
          color: fg,
        }}
      >
        WeatherGPT
      </span>
    </span>
  )
}
