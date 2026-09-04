import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSession } from '../../shared/context/SessionContext'
import EmergencyContacts from '../components/EmergencyContacts'
import NearestSafePlaces from '../components/NearestSafePlaces'
import styles from '../dashboard.module.css'

import CitizenWidgets from '../widgets/CitizenWidgets'
import FarmerWidgets from '../widgets/FarmerWidgets'
import MarineWidgets from '../widgets/MarineWidgets'
import InstitutionWidgets from '../widgets/InstitutionWidgets'
import ResearcherWidgets from '../widgets/ResearcherWidgets'
import DisasterWidgets from '../widgets/DisasterWidgets'
import DistrictWidgets from '../widgets/DistrictWidgets'
import OperationsWidgets from '../widgets/OperationsWidgets'
import AdminWidgets from '../widgets/AdminWidgets'

const WIDGET_MAP: Record<string, React.ComponentType> = {
  citizen: CitizenWidgets,
  farmer: FarmerWidgets,
  marine: MarineWidgets,
  institution: InstitutionWidgets,
  researcher: ResearcherWidgets,
  disasterManagement: DisasterWidgets,
  districtAuthority: DistrictWidgets,
  weatherOperations: OperationsWidgets,
  administrator: AdminWidgets,
}

export default function RoleOverview() {
  const { t } = useLanguage()
  const { activeDashboard, profile } = useSession()
  const isAdmin = activeDashboard === 'administrator'
  const firstName = profile.fullName.split(' ')[0]
  const Widget = WIDGET_MAP[activeDashboard] ?? CitizenWidgets
  const [showEmergency, setShowEmergency] = useState(true)

  // Display name comes from i18n roles mapping for proper translation
  const roleDisplayNames: Record<string, string> = {
    citizen: t.roles.citizen,
    farmer: t.roles.farmer,
    marine: t.roles.marine,
    institution: t.roles.institution,
    researcher: t.roles.researcher,
    disasterManagement: t.roles.disasterManagement,
    districtAuthority: t.roles.districtAuthority,
    weatherOperations: t.roles.weatherOperations,
    administrator: 'System Administrator',
  }

  const displayName = roleDisplayNames[activeDashboard] ?? activeDashboard

  return (
    <div className={styles.body}>
      {isAdmin && <div className={styles.adminNotice}>{t.dashboard.adminOnlyNotice}</div>}

      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>
          {firstName ? `${t.dashboard.goodMorning}, ${firstName}` : displayName}
        </h1>
        <p className={styles.pageSubtitle}>{displayName} · {t.dashboard.currentRole}</p>
      </div>

      {/* New Emergency Alert — shows on dashboard when emergency (demo: always visible until dismissed) */}
      {showEmergency && (
        <div
          role="alert"
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            color: 'white',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
            boxShadow: '0 8px 24px rgba(220,38,38,0.25)',
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 800, fontSize: 13 }}>
              <span style={{ background: 'white', color: '#dc2626', borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 800 }}>● {t.alerts.critical}</span>
              {t.alerts.critical} — {t.emergency.title}
            </div>
            <div style={{ fontWeight: 700, marginTop: 6, fontSize: 14 }}>{t.alerts.heavyRain} — {profile.location.district || 'Chennai'} • {t.safePlace.nearestSafePlaces} & {t.emergency.title} updated</div>
            <div style={{ fontSize: 12, opacity: 0.92, marginTop: 4 }}>{t.emergency.subtitle} — {t.safePlace.subtitle}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={() => document.getElementById('emergency-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'white', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13 }}>
              {t.safePlace.nearestSafePlaces}
            </button>
            <button type="button" onClick={() => setShowEmergency(false)} aria-label={t.common.dismiss} style={{ background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* DashboardShell stays visually consistent: same grid, cards, typography.
          Only the widgets inside change per role. */}
      <Widget />

      {/* Important Phone Numbers + Nearest Safe Place — always accessible from dashboard, especially in disaster */}
      <div id="emergency-section" style={{ marginTop: 28 }}>
        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--red)', color: 'white', borderRadius: 999, padding: '4px 8px', fontSize: 10, fontWeight: 800 }}>EMERGENCY</span>
          {t.emergency.title} & {t.safePlace.title}
        </h2>
        <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4, marginBottom: 14 }}>{t.emergency.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <EmergencyContacts />
          <NearestSafePlaces />
        </div>
      </div>

      <footer style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--line-light)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--slate-light)' }}>
        <span>© 2024 WeatherGPT Intelligence Platform. All rights reserved.</span>
        <span>{t.dashboard.dataSourcedFrom}</span>
      </footer>
    </div>
  )
}
