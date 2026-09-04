import { useLanguage } from '../../i18n/LanguageContext'
import LiveMap from '../../dashboard/components/LiveMap'
import styles from './ContentPage.module.css'

export default function Maps() {
  const { t } = useLanguage()
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className={styles.pageEyebrow}>GIS ENGINE // 5 LAYERS AVAILABLE</p>
          <h1 className={styles.pageTitle}>{t.pages.mapsTitle}</h1>
          <p className={styles.pageSubtitle}>{t.pages.mapsSubtitle}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container">
          <LiveMap />
          <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11, color: 'var(--slate-light)' }}>
            <span>{t.liveMap.temperatureLayer}</span>
            <span>{t.liveMap.rainfallLayer}</span>
            <span>{t.liveMap.windLayer}</span>
            <span>{t.liveMap.satelliteLayer}</span>
            <span>{t.liveMap.radarLayer}</span>
            <span>{t.liveMap.alertsLayer}</span>
          </div>
        </div>
      </section>
    </>
  )
}
