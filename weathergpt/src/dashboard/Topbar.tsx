import { useLanguage } from '../i18n/LanguageContext'
import { useSession } from '../shared/context/SessionContext'
import LanguagePicker from '../shared/components/LanguagePicker'
import StatusPill from '../shared/components/StatusPill'
import ThemeToggle from '../shared/components/ThemeToggle'
import { ROLE_DASHBOARD_CONFIG } from './roleConfig'
import styles from './dashboard.module.css'

export default function Topbar() {
  const { t } = useLanguage()
  const { activeDashboard } = useSession()
  const isAdmin = activeDashboard === 'administrator'

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.roleBadge} data-admin={isAdmin}>
          {ROLE_DASHBOARD_CONFIG[activeDashboard].displayName.toUpperCase()}
        </span>
        <input className={styles.search} placeholder={t.dashboard.askWeatherGpt} aria-label={t.dashboard.askWeatherGpt} />
      </div>
      <div className={styles.topbarRight}>
        <ThemeToggle variant="topbar" size={38} />
        <StatusPill label={t.dashboard.aiActive} tone="green" />
        <LanguagePicker />
      </div>
    </header>
  )
}
