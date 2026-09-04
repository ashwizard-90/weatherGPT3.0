import { useLanguage } from '../../i18n/LanguageContext'
import styles from '../dashboard.module.css'

export default function AlertsPanel() {
  const { t } = useLanguage()
  return (
    <div>
      <h2 className={styles.sectionTitle}>{t.dashboard.alerts}</h2>
      <div className={styles.grid}>
        <div className={styles.panel} data-tone="red">
          <span className={styles.panelLabel} style={{ color: 'var(--red)' }}>{t.alerts.critical} · IMD</span>
          <strong style={{ display: 'block', marginTop: 8 }}>Severe Cyclonic Storm 'Mocha'</strong>
          <p className={styles.panelHint}>Bay of Bengal Coast (Odisha, West Bengal)</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button type="button" style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid var(--line-light)', background: 'var(--white)' }}>{t.alerts.viewOnMap}</button>
            <button type="button" style={{ flex: 1, padding: '8px 10px', borderRadius: 6, background: 'var(--ink)', color: 'white', border: 'none' }}>{t.alerts.acknowledge}</button>
          </div>
        </div>
        <div className={styles.panel} data-tone="amber">
          <span className={styles.panelLabel} style={{ color: '#8a3b00' }}>{t.alerts.warning} · IMD</span>
          <strong style={{ display: 'block', marginTop: 8 }}>{t.alerts.heatwave}</strong>
          <p className={styles.panelHint}>Northern Plains (Delhi, Haryana, Punjab) — Temperatures expected to exceed 45°C.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button type="button" style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid var(--line-light)', background: 'var(--white)' }}>{t.alerts.viewOnMap}</button>
            <button type="button" style={{ flex: 1, padding: '8px 10px', borderRadius: 6, background: 'var(--white)', border: '1px solid var(--line-light)' }}>{t.alerts.shareIntel}</button>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 12 }}>{t.common.lastUpdated}: {new Date().toLocaleString()} · {t.common.source}: IMD</p>
    </div>
  )
}
