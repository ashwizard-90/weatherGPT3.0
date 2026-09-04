import { useLanguage } from '../../i18n/LanguageContext'
import styles from '../dashboard.module.css'

export default function InstitutionWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div className={styles.panel} data-tone="red" style={{ borderTop: '4px solid var(--red)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{t.widgets.institutionClosureStatus}</strong>
            <p style={{ fontSize: 12, color: 'var(--slate)' }}>District Administration Order</p>
          </div>
          <span style={{ background: 'var(--red)', color: 'white', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{t.widgets.institutionActiveOrder}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--slate-light)', fontWeight: 700 }}>STATUS</div>
            <div style={{ color: 'var(--red)', fontWeight: 800, fontSize: 20 }}>{t.widgets.institutionClosed}</div>
            <div style={{ fontSize: 13, marginTop: 8 }}><strong>Coastal Region, Sector 4</strong></div>
            <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4 }}>Oct 24, 2024 (Next 48 Hours)</div>
          </div>
          <div style={{ background: 'var(--paper)', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--slate-light)', fontWeight: 700 }}>REASON</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Severe Cyclonic Storm Warning (Red Alert)</div>
            <div style={{ fontSize: 11, marginTop: 8, color: 'var(--slate-light)' }}>AUTHORITY</div>
            <div style={{ fontSize: 12 }}>District Magistrate Office</div>
            <div style={{ fontSize: 11, marginTop: 8, color: 'var(--slate-light)' }}>SOURCE</div>
            <div style={{ fontSize: 12, color: 'var(--cyan)' }}>Official Notification #DM/2024/89</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: 'var(--slate)' }}>
          <span>{t.dashboard.lastVerified}</span>
          <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>View Full Document</span>
        </div>
      </div>

      <div className={styles.panel} data-tone="amber" style={{ marginTop: 16, borderLeft: '4px solid #8a3b00', background: 'rgba(242,169,59,0.08)' }}>
        <strong>{t.widgets.institutionImportantDistinction}</strong>
        <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 6 }}>
          A Weather Warning (e.g., Heavy Rain Alert) does not automatically mean institutions are closed. An <span style={{ color: 'var(--red)' }}>Official Closure Order</span> must be issued by the District Administration. The status above reflects official orders only.
        </p>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="cyan">
          <strong>{t.widgets.institutionDistrictWeather}</strong>
          <div style={{ marginTop: 8 }}>
            <span className="mono" style={{ fontSize: 28, fontWeight: 800 }}>24°</span> <span>Heavy Rain</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}>
              <span>Precipitation <strong>95%</strong></span>
              <span>Wind Gusts <strong style={{ color: 'var(--red)' }}>65 km/h</strong></span>
            </div>
          </div>
        </div>
        <div className={styles.panel} data-tone="slate">
          <strong>{t.widgets.institutionAnnouncements}</strong>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: 'var(--paper)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 700 }}>30 MINS AGO · DM OFFICE</div>
              <strong style={{ fontSize: 13 }}>Section 144 Imposed in Coastal</strong>
              <p style={{ fontSize: 12, color: 'var(--slate)' }}>Residents advised to stay indoors.</p>
            </div>
            <div style={{ background: 'var(--paper)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700 }}>2 HOURS AGO · DEO</div>
              <strong style={{ fontSize: 13 }}>Online Classes Advisory</strong>
              <p style={{ fontSize: 12, color: 'var(--slate)' }}>Schools may conduct online sessions at their discretion.</p>
            </div>
          </div>
          <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 8 }}>WeatherGPT must NEVER declare a school/college holiday itself. Only display verified official orders.</p>
        </div>
      </div>
    </>
  )
}
