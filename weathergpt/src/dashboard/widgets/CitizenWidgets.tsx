import { useLanguage } from '../../i18n/LanguageContext'
import LiveSituation from '../components/LiveSituation'
import LiveMap from '../components/LiveMap'
import styles from '../dashboard.module.css'

export default function CitizenWidgets() {
  const { t } = useLanguage()
  return (
    <>
      {/* Current weather + Hourly forecast — from PDF Citizen dashboard */}
      <div className={styles.grid}>
        <div className={styles.panel} data-tone="cyan">
          <span className={styles.panelLabel}>{t.dashboard.currentWeather.toUpperCase()} · New York, NY</span>
          <div className={`mono ${styles.panelValue}`}>72° <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--slate)' }}>Partly Cloudy</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, fontSize: 12.5 }}>
            <span>{t.dashboard.humidity}: <strong>45%</strong></span>
            <span>{t.dashboard.wind}: <strong>12 mph NW</strong></span>
            <span>{t.dashboard.rainProbability}: <strong>10%</strong></span>
            <span>{t.dashboard.uvIndex}: <strong>Moderate (5)</strong></span>
          </div>
        </div>
        <div className={styles.panel} data-tone="cyan">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 14 }}>{t.dashboard.hourlyForecast}</strong>
            <span style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 700 }}>{t.dashboard.view10Day}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8, marginTop: 12, textAlign: 'center', fontSize: 12 }}>
            {[
              { h: 'Now', t: '72°' },
              { h: '1 PM', t: '74°' },
              { h: '2 PM', t: '75°' },
              { h: '3 PM', t: '73°' },
              { h: '4 PM', t: '70°' },
              { h: '5 PM', t: '68°' },
            ].map((x) => (
              <div key={x.h}><div style={{ color: 'var(--slate)', fontWeight: 700 }}>{x.h}</div><div className="mono" style={{ fontWeight: 700 }}>{x.t}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety overview 4 cards */}
      <h2 className={styles.sectionTitle}>{t.dashboard.safetyOverview}</h2>
      <div className={styles.grid}>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.dashboard.travelSafety.toUpperCase()}</span>
          <p className={styles.panelHint}>{t.widgets.citizenTravelSafety}</p>
          <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700 }}>{t.dashboard.lowRisk}</span>
        </div>
        <div className={styles.panel} data-tone="amber">
          <span className={styles.panelLabel}>{t.dashboard.rainRisk.toUpperCase()}</span>
          <p className={styles.panelHint}>{t.widgets.citizenRainRisk}</p>
          <span style={{ fontSize: 11, color: 'var(--amber)', fontWeight: 700 }}>{t.dashboard.moderateRisk}</span>
        </div>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.dashboard.heatRisk.toUpperCase()}</span>
          <p className={styles.panelHint}>Temperatures remaining comfortable today.</p>
          <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700 }}>{t.dashboard.lowRisk}</span>
        </div>
        <div className={styles.panel} data-tone="red">
          <span className={styles.panelLabel}>{t.dashboard.localAlerts.toUpperCase()}</span>
          <p className={styles.panelHint}>Air Quality Alert until 8 PM.</p>
          <span style={{ fontSize: 11, color: 'var(--red)', fontWeight: 700 }}>1 {t.alerts.activeAlert}</span>
        </div>
      </div>

      {/* Live Situation & Map — common components */}
      <h2 className={styles.sectionTitle}>{t.dashboard.liveSituation}</h2>
      <LiveSituation />

      <h2 className={styles.sectionTitle}>{t.dashboard.interactiveRadar}</h2>
      <LiveMap />

      <h2 className={styles.sectionTitle}>{t.dashboard.quickActions}</h2>
      <div className={styles.grid}>
        <button type="button" className={styles.panel} style={{ textAlign: 'left' }}>{t.dashboard.checkRain}</button>
        <button type="button" className={styles.panel} style={{ textAlign: 'left' }}>{t.dashboard.travelWeather}</button>
        <button type="button" className={styles.panel} style={{ textAlign: 'left' }}>{t.dashboard.viewAlerts}</button>
        <button type="button" className={styles.panel} data-tone="cyan" style={{ background: 'var(--ink)', color: 'var(--paper)', textAlign: 'left' }}>{t.dashboard.askWeatherGptAction}</button>
      </div>
    </>
  )
}
