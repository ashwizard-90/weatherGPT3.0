import { useLanguage } from '../../i18n/LanguageContext'
import LiveMap from '../components/LiveMap'
import styles from '../dashboard.module.css'

export default function FarmerWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div className={styles.panel} data-tone="red" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{t.widgets.farmerActionAlert}</strong>
          <p style={{ fontSize: 13, color: 'var(--slate)' }}>Review irrigation plans immediately.</p>
        </div>
        <span style={{ background: 'var(--red)', color: 'white', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{t.dashboard.highRisk.toUpperCase()}!</span>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="amber">
          <span className={styles.panelLabel}>{t.widgets.farmerPrecipitationRisk.toUpperCase()}</span>
          <div className="mono" style={{ color: 'var(--red)', fontWeight: 800, marginTop: 4 }}>85%</div>
          <div style={{ fontSize: 11, color: 'var(--slate)' }}>{t.widgets.farmerTimeframe}: 14:00-18:00</div>
        </div>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.widgets.farmerTimeframe.toUpperCase()}</span>
          <div className="mono" style={{ fontWeight: 800 }}>14:00 - 18:00</div>
        </div>
        <div className={styles.panel} data-tone="slate">
          <span className={styles.panelLabel}>{t.widgets.farmerRecommendation.toUpperCase()}</span>
          <p style={{ fontSize: 12, color: 'var(--slate)' }}>Halt automated irrigation in sectors A and B to prevent waterlogging.</p>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>{t.widgets.farmerNext24Hour}</h2>
      <div className={styles.grid}>
        <div className={styles.panel} data-tone="red">
          <span className={styles.panelLabel}>{t.liveSituation.rainfall} · {t.dashboard.highRisk}</span>
          <p className={styles.panelHint}>Heavy downpours expected. Est. 45 mm</p>
        </div>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.liveSituation.wind} · {t.dashboard.lowRisk}</span>
          <p className={styles.panelHint}>Stable conditions. Gust 12 km/h</p>
        </div>
        <div className={styles.panel} data-tone="cyan">
          <span className={styles.panelLabel}>{t.liveSituation.temperature} · {t.dashboard.moderateRisk}</span>
          <p className={styles.panelHint}>Optimal range for crops. 18°C - 24°C</p>
        </div>
        <div className={styles.panel} data-tone="amber">
          <span className={styles.panelLabel}>{t.liveSituation.humidity} · {t.dashboard.moderateRisk}</span>
          <p className={styles.panelHint}>Fungal risk increasing. 88%</p>
        </div>
      </div>

      <div className={styles.panel} data-tone="amber" style={{ marginTop: 16 }}>
        <strong>{t.widgets.farmerAgriAdvisory}</strong>
        <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 6 }}>
          The combination of high humidity (88%) and impending heavy rainfall creates a significant risk for blight in tomato crops.
        </p>
        <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 6 }}>Do NOT claim guaranteed 24-hour forecast accuracy.</p>
      </div>

      <h2 className={styles.sectionTitle}>{t.dashboard.liveSituation}</h2>
      <LiveMap />
    </>
  )
}
