import { useLanguage } from '../i18n/LanguageContext'
import { useSession } from '../shared/context/SessionContext'
import Logo from '../shared/components/Logo'
import type { DashboardRole } from '../shared/types/user'
import { ROLE_DASHBOARD_CONFIG } from './roleConfig'
import styles from './dashboard.module.css'

const NAV_ICONS: Record<string, JSX.Element> = {
  overview: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="11" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  live: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  alerts: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  ),
  map: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  climate: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 15a4 4 0 0 1 1-7.9A5.5 5.5 0 0 1 15.9 9 4.5 4.5 0 0 1 15 18H6a3 3 0 0 1-2-3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.6-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export type DashboardSection = 'overview' | 'live' | 'alerts' | 'map' | 'climate' | 'settings'

interface Props {
  activeSection: DashboardSection
  onSectionChange: (s: DashboardSection) => void
}

export default function Sidebar({ activeSection, onSectionChange, showRoleSwitch = true }: Props & { showRoleSwitch?: boolean }) {
  const { t } = useLanguage()
  const { activeDashboard, setActiveDashboard } = useSession()

  const navItems: { key: DashboardSection; label: string }[] = [
    { key: 'overview', label: t.dashboard.overview },
    { key: 'live', label: t.dashboard.liveSituation },
    { key: 'alerts', label: t.dashboard.alerts },
    { key: 'map', label: t.dashboard.map },
    { key: 'climate', label: t.dashboard.climateReports },
    { key: 'settings', label: t.dashboard.settings },
  ]

  const previewableRoles = (Object.keys(ROLE_DASHBOARD_CONFIG) as DashboardRole[]).filter((r) => r !== 'administrator')

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <Logo variant="light" size={22} />
      </div>

      <nav className={styles.nav} aria-label="Dashboard sections">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={styles.navItem}
            aria-current={activeSection === item.key ? 'page' : undefined}
            onClick={() => onSectionChange(item.key)}
            style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {NAV_ICONS[item.key]}
            {item.label}
          </button>
        ))}
      </nav>

      {showRoleSwitch && (
        <div className={styles.roleSwitch}>
          <p className={styles.roleSwitchLabel}>{t.dashboard.changeDashboard.toUpperCase()}</p>
          <select
            className={styles.roleSelect}
            value={activeDashboard}
            onChange={(e) => setActiveDashboard(e.target.value as DashboardRole)}
          >
          {previewableRoles.map((role) => {
            const translated =
              role === 'citizen' ? t.roles.citizen :
              role === 'farmer' ? t.roles.farmer :
              role === 'marine' ? t.roles.marine :
              role === 'institution' ? t.roles.institution :
              role === 'researcher' ? t.roles.researcher :
              role === 'disasterManagement' ? t.roles.disasterManagement :
              role === 'districtAuthority' ? t.roles.districtAuthority :
              role === 'weatherOperations' ? t.roles.weatherOperations :
              role
            return (
              <option key={role} value={role}>
                {translated}
              </option>
            )
          })}
          </select>
        </div>
      )}
    </aside>
  )
}
