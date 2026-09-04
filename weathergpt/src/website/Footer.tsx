import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from '../shared/components/Logo'
import StatusPill from '../shared/components/StatusPill'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div>
          <Logo variant="light" size={24} />
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>
        <div className={styles.linkCols}>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.nav.home.toUpperCase()}</span>
            <Link className={styles.colLink} to="/live-weather">
              {t.nav.liveWeather}
            </Link>
            <Link className={styles.colLink} to="/alerts">
              {t.nav.alerts}
            </Link>
            <Link className={styles.colLink} to="/maps">
              {t.nav.maps}
            </Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>LEGAL</span>
            <Link className={styles.colLink} to="/about">
              {t.footer.privacy}
            </Link>
            <Link className={styles.colLink} to="/about">
              {t.footer.terms}
            </Link>
            <Link className={styles.colLink} to="/about">
              {t.footer.apiDocs}
            </Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>SUPPORT</span>
            <Link className={styles.colLink} to="/about">
              {t.footer.contact}
            </Link>
          </div>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <StatusPill label="IMD & Satellite Observations synced" tone="green" />
      </div>
    </footer>
  )
}
