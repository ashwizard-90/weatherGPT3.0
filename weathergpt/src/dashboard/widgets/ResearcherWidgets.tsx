import { useLanguage } from '../../i18n/LanguageContext'
import ClimateReport from '../components/ClimateReport'
import styles from '../dashboard.module.css'

export default function ResearcherWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div className={styles.panel} data-tone="cyan" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, color: 'var(--slate-light)', fontWeight: 700 }}>{t.widgets.researcherClimateIntelligence.toUpperCase()}</span>
          <div style={{ fontWeight: 700 }}>Good morning. — Explore weather and climate intelligence.</div>
        </div>
        <span className="mono" style={{ background: 'var(--paper-2)', padding: '8px 12px', borderRadius: 999, fontSize: 12 }}>Active Dataset: Global IMD Archive (1990-2024)</span>
      </div>

      <ClimateReport />

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="slate">
          <strong>{t.widgets.researcherQuickActions}</strong>
          <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
            <button type="button" style={{ textAlign: 'left', padding: 10, border: '1px solid var(--line-light)', borderRadius: 6, background: 'var(--paper)' }}>Historical Data Archive</button>
            <button type="button" style={{ textAlign: 'left', padding: 10, border: '1px solid var(--line-light)', borderRadius: 6, background: 'var(--paper)' }}>Generate Trend Report</button>
            <button type="button" style={{ textAlign: 'left', padding: 10, border: '1px solid var(--line-light)', borderRadius: 6, background: 'var(--paper)' }}>Download CSV / NetCDF</button>
          </div>
        </div>
        <div className={styles.panel} data-tone="cyan">
          <strong>Data Explorer</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <select style={{ padding: 8, borderRadius: 6, border: '1px solid var(--line-light)' }}><option>Global (All Regions)</option></select>
            <select style={{ padding: 8, borderRadius: 6, border: '1px solid var(--line-light)' }}><option>Surface Temperature</option></select>
            <select style={{ padding: 8, borderRadius: 6, border: '1px solid var(--line-light)' }}><option>1990 - 2024</option></select>
            <button type="button" style={{ background: 'var(--ink)', color: 'white', padding: 10, borderRadius: 6, border: 'none' }}>{t.climate.runAnalysis}</button>
          </div>
        </div>
      </div>
    </>
  )
}
