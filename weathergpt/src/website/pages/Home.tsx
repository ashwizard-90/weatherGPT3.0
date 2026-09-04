import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Home.module.css'

export default function Home() {
  const { t } = useLanguage()

  const features = [
    { title: t.home.featRealtimeTitle, body: t.home.featRealtimeBody },
    { title: t.home.featAiTitle, body: t.home.featAiBody },
    { title: t.home.featAlertsTitle, body: t.home.featAlertsBody },
    { title: t.home.featMapsTitle, body: t.home.featMapsBody },
    { title: t.home.featClimateTitle, body: t.home.featClimateBody },
    { title: t.home.featVoiceTitle, body: t.home.featVoiceBody },
  ]

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>{t.home.heroEyebrow}</p>
          <h1 className={styles.title}>{t.home.heroTitle}</h1>
          <p className={styles.subtitle}>{t.home.heroSubtitle}</p>

          <div className={styles.searchRow}>
            <input
              className={styles.search}
              placeholder={t.home.searchPlaceholder}
              aria-label={t.home.searchPlaceholder}
            />
            <Link to="/signup" className={styles.searchBtn}>
              {t.nav.getStarted}
            </Link>
          </div>

          <div className={styles.tags}>
            <span className={styles.tag}>{t.home.tailoredFarmers}</span>
            <span className={styles.tag}>{t.home.tailoredFishers}</span>
            <span className={styles.tag}>{t.home.tailoredResponders}</span>
          </div>

          <div className={styles.ticker}>
            <div className={styles.tickerItem}>
              <span className={`mono ${styles.tickerValue}`}>742</span>
              <span className={styles.tickerLabel}>Observatories online</span>
            </div>
            <div className={styles.tickerItem}>
              <span className={`mono ${styles.tickerValue}`}>99.98%</span>
              <span className={styles.tickerLabel}>API health</span>
            </div>
            <div className={styles.tickerItem}>
              <span className={`mono ${styles.tickerValue}`}>10</span>
              <span className={styles.tickerLabel}>Languages supported</span>
            </div>
            <div className={styles.tickerItem}>
              <span className={`mono ${styles.tickerValue}`}>15-min</span>
              <span className={styles.tickerLabel}>Nowcast refresh</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capSection}>
        <div className="container">
          <div className={styles.capHead}>
            <p className={styles.capEyebrow}>{t.home.capabilitiesSubtitle}</p>
            <h2 className={styles.capTitle}>{t.home.capabilitiesTitle}</h2>
          </div>

          {features.map((f, i) => (
            <div className={styles.featureRow} key={f.title}>
              <div>
                <span className={styles.featureNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.featureName}>{f.title}</h3>
              </div>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sources}>
        <div className="container">
          <h2 className={styles.sourcesTitle}>{t.home.sourcesTitle}</h2>
          <p className={styles.sourcesBody}>{t.home.sourcesBody}</p>
          <div className={styles.sourceLogos}>
            <span>IMD DATA</span>
            <span>INSAT-3DR</span>
            <span>GOES-16</span>
            <span>HIMAWARI</span>
            <span>NWS</span>
          </div>
        </div>
      </section>
    </>
  )
}
