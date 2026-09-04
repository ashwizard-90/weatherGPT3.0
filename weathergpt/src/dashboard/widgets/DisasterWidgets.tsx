import { useLanguage } from '../../i18n/LanguageContext'
import LiveMap from '../components/LiveMap'
import EmergencyContacts from '../components/EmergencyContacts'
import NearestSafePlaces from '../components/NearestSafePlaces'
import styles from '../dashboard.module.css'

export default function DisasterWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{t.widgets.disasterNationalOverview}</h2>
          <p style={{ fontSize: 13, color: 'var(--slate)' }}>Real-time situational awareness and threat monitoring.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="mono" style={{ background: 'var(--white)', border: '1px solid var(--line-light)', padding: '8px 12px', borderRadius: 8, fontSize: 12 }}>Sep 2, 2026, 06:07 PM UTC</span>
          <button type="button" style={{ background: 'var(--ink)', color: 'white', padding: '10px 16px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Broadcast Alert</button>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="cyan"><span className={styles.panelLabel}>{t.widgets.disasterActiveAlerts.toUpperCase()}</span><div className="mono" style={{ fontSize: 28, fontWeight: 800 }}>142 <span style={{ fontSize: 12, color: 'var(--green)' }}>↗12%</span></div></div>
        <div className={styles.panel} data-tone="red"><span className={styles.panelLabel} style={{ color: 'var(--red)' }}>{t.widgets.disasterCriticalAlerts.toUpperCase()}</span><div className="mono" style={{ fontSize: 28, fontWeight: 800, color: 'var(--red)' }}>18 <span style={{ fontSize: 12 }}>↗4 new</span></div></div>
        <div className={styles.panel} data-tone="slate"><span className={styles.panelLabel}>{t.widgets.disasterAffectedLocations.toUpperCase()}</span><div className="mono" style={{ fontSize: 28, fontWeight: 800 }}>47 <span style={{ fontSize: 12 }}>Districts</span></div></div>
        <div className={styles.panel} data-tone="cyan"><span className={styles.panelLabel}>{t.widgets.disasterFieldTeams.toUpperCase()}</span><div className="mono" style={{ fontSize: 28, fontWeight: 800 }}>32 <span style={{ fontSize: 12 }}>Active</span></div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }} className={styles.responsiveStack}>
        <LiveMap />
        <div className={styles.panel} data-tone="slate">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{t.widgets.disasterLiveAlertFeed}</strong><span style={{ color: 'var(--cyan)', fontSize: 12 }}>View All</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <div style={{ background: 'rgba(214,69,80,0.08)', padding: 10, borderRadius: 8, borderLeft: '3px solid var(--red)' }}><div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 700 }}>! CRITICAL · 2m ago</div><strong style={{ fontSize: 13 }}>Flash Flood Warning</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Mumbai Metro Region</div></div>
            <div style={{ background: 'rgba(242,169,59,0.12)', padding: 10, borderRadius: 8, borderLeft: '3px solid var(--amber)' }}><div style={{ fontSize: 11, color: '#8a3b00', fontWeight: 700 }}>⚠ WARNING · 15m ago</div><strong style={{ fontSize: 13 }}>Cyclone Path Update</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Coastal Odisha</div></div>
            <div style={{ background: 'var(--paper)', padding: 10, borderRadius: 8, borderLeft: '3px solid var(--cyan)' }}><div style={{ fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>◎ ADVISORY · 1h ago</div><strong style={{ fontSize: 13 }}>Heavy Rainfall Expected</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Kerala North</div></div>
          </div>
          <div style={{ marginTop: 12, background: 'var(--paper-2)', padding: 12, borderRadius: 8 }}>
            <strong>Active Deployments</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}><span>NDRF Alpha · Mumbai - En Route</span><span style={{ color: 'var(--green)' }}>●</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 12 }}><span>State Team 4 · Odisha - Deployed</span><span style={{ color: 'var(--green)' }}>●</span></div>
          </div>
        </div>
      </div>

      {/* Disaster Mode — prioritize safe places & emergency contacts */}
      <div style={{ marginTop: 16 }}>
        <NearestSafePlaces />
      </div>
      <div style={{ marginTop: 16 }}>
        <EmergencyContacts />
      </div>
    </>
  )
}
