import { useLanguage } from '../../i18n/LanguageContext'
import styles from './ContentPage.module.css'

export default function About() {
  const { t } = useLanguage()
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className={styles.pageEyebrow}>ABOUT WEATHERGPT</p>
          <h1 className={styles.pageTitle}>{t.pages.aboutTitle}</h1>
          <p className={styles.pageSubtitle}>{t.pages.aboutSubtitle}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)' }}>{t.pages.aboutBody}</p>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Trust & data sources</h2>
            <div className={styles.listRow}>
              <div>
                <strong style={{ fontSize: 15, color: 'var(--ink)' }}>India Meteorological Department</strong>
                <p className={styles.panelHint}>Primary observational and forecast data</p>
              </div>
            </div>
            <div className={styles.listRow}>
              <div>
                <strong style={{ fontSize: 15, color: 'var(--ink)' }}>National mesonet & AWS network</strong>
                <p className={styles.panelHint}>742 automated weather stations, updated every 15 minutes</p>
              </div>
            </div>
            <div className={styles.listRow}>
              <div>
                <strong style={{ fontSize: 15, color: 'var(--ink)' }}>Satellite consortium</strong>
                <p className={styles.panelHint}>INSAT-3DR, GOES-16, and Himawari-9 cross-validated imagery</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
