import { NavLink, Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from '../shared/components/Logo'
import LanguagePicker from '../shared/components/LanguagePicker'
import ThemeToggle from '../shared/components/ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { t } = useLanguage()

  const items = [
    { to: '/', label: t.nav.home },
    { to: '/live-weather', label: t.nav.liveWeather },
    { to: '/alerts', label: t.nav.alerts },
    { to: '/maps', label: t.nav.maps },
    { to: '/climate', label: t.nav.climate },
    { to: '/about', label: t.nav.about },
  ]

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.row}`}>
        <Link to="/" aria-label="WeatherGPT home">
          <Logo variant="light" size={26} />
        </Link>
        <nav className={styles.links} aria-label="Primary">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={styles.link}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle variant="navbar" size={36} />
          <LanguagePicker onDark />
          <Link to="/login" className={styles.signIn}>
            {t.nav.signIn}
          </Link>
          <Link to="/signup" className={styles.cta}>
            {t.nav.getStarted}
          </Link>
        </div>
      </div>
    </header>
  )
}
