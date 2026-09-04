import { useLanguage } from '../../i18n/LanguageContext'
import LiveSituation from '../../dashboard/components/LiveSituation'
import styles from './ContentPage.module.css'

export default function LiveWeather() {
  const { t } = useLanguage()
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className={styles.pageEyebrow}>NODE // MESONET-742 · SYNCHRONISED</p>
          <h1 className={styles.pageTitle}>{t.pages.liveWeatherTitle}</h1>
          <p className={styles.pageSubtitle}>{t.pages.liveWeatherSubtitle}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.liveSituation.title}</h2>
          <LiveSituation />
          <p style={{ marginTop: 12, fontSize: 11, color: 'var(--slate-light)' }}>
            {t.liveSituation.source}: IMD & Satellite Observations · {t.common.dataUnavailable} handling via {t.liveSituation.staleWarning}
          </p>
        </div>
      </section>
    </>
  )
}
