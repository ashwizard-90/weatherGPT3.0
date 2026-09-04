import { useLanguage } from '../../i18n/LanguageContext'
import styles from '../dashboard.module.css'

export default function MarineWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div className={styles.panel} data-tone="cyan">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>{t.widgets.marineSafetyWindow}</strong>
          <span className="mono" style={{ fontSize: 11, background: 'var(--paper-2)', padding: '4px 8px', borderRadius: 999 }}>{t.liveSituation.lastUpdated}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 12 }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{t.widgets.marineCurrent}</div>
            <div style={{ color: 'var(--green)', fontWeight: 800, marginTop: 6 }}>● {t.widgets.marineSafe}</div>
            <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>Optimal for near-shore and deep-sea operations.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11 }}>
              <span>{t.widgets.marineWaveHeight}: <strong>0.5-1.2m</strong></span>
              <span>{t.widgets.marineWindGusts}: <strong>12 knots</strong></span>
            </div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{t.widgets.marineUpcoming}</div>
            <div style={{ color: '#8a3b00', fontWeight: 800, marginTop: 6 }}>● {t.widgets.marineCaution}</div>
            <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>Increasing swells. Small craft advisory.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11 }}>
              <span>{t.widgets.marineWaveHeight}: <strong>1.8-2.5m</strong></span>
              <span>{t.widgets.marineWindGusts}: <strong>22 knots</strong></span>
            </div>
          </div>
          <div style={{ background: 'rgba(214,69,80,0.12)', border: '1px solid rgba(214,69,80,0.3)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{t.widgets.marineLater}</div>
            <div style={{ color: 'var(--red)', fontWeight: 800, marginTop: 6 }}>● {t.widgets.marineUnsafe}</div>
            <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>Severe squalls forming offshore. Return to port mandate active.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11 }}>
              <span>{t.widgets.marineWaveHeight}: <strong>4.0m+</strong></span>
              <span>{t.widgets.marineWindGusts}: <strong>45 knots</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="amber">
          <strong>{t.widgets.marineCycloneWatch}</strong>
          <div style={{ marginTop: 8, background: 'var(--paper)', padding: 12, borderRadius: 8 }}>
            <strong>System 94B (Developing)</strong>
            <p style={{ fontSize: 12, color: 'var(--slate)' }}>Located 450nm SE of Coastal Zone Alpha. Moving NW at 8 knots.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 11 }}>
              <span style={{ background: 'var(--paper-2)', padding: '4px 8px', borderRadius: 4 }}>PROB: 60%</span>
              <span style={{ background: 'var(--paper-2)', padding: '4px 8px', borderRadius: 4 }}>ETA: 48HRS</span>
            </div>
          </div>
        </div>
        <div className={styles.panel} data-tone="cyan">
          <strong>{t.widgets.marinePortAuthority}</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 6 }}><span>Port of Marina (North)</span><span style={{ background: 'rgba(63,166,106,0.15)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>OPEN</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 6 }}><span>Terminal Bravo (South)</span><span style={{ background: 'rgba(242,169,59,0.18)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>RESTRICTED</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 6 }}><span>Deepwater Dock</span><span style={{ background: 'rgba(214,69,80,0.12)', color: 'var(--red)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>CLOSED</span></div>
          </div>
        </div>
      </div>

      <div className={styles.panel} data-tone="slate" style={{ marginTop: 16 }}>
        <strong>{t.liveMap.title} · Marine GIS</strong>
        <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>Wind vectors, swell period, and cyclone track area — via backend GIS proxy. No API keys in frontend.</p>
        <div style={{ marginTop: 10, height: 120, background: 'var(--paper-2)', borderRadius: 8, display: 'grid', placeItems: 'center', color: 'var(--slate-light)', fontSize: 12 }}>Map preview — Marine GIS layer</div>
      </div>
    </>
  )
}
