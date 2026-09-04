import { useLanguage } from '../../i18n/LanguageContext'
import ClimateReport from '../../dashboard/components/ClimateReport'
import styles from './ContentPage.module.css'

export default function Climate() {
  const { t } = useLanguage()
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className={styles.pageEyebrow}>DATASET // 1994–2024 · 30-YEAR BASELINE</p>
          <h1 className={styles.pageTitle}>{t.pages.climateTitle}</h1>
          <p className={styles.pageSubtitle}>{t.pages.climateSubtitle}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container">
          <ClimateReport />
          <p style={{ marginTop: 12, fontSize: 11, color: 'var(--slate-light)', textAlign: 'center' }}>
            {t.dashboard.dataSourcedFrom} · {t.climate.dataSource}: IMD/WMO · {t.climate.lastUpdated}: — · {t.common.tryAgain} if {t.climate.error}
          </p>
        </div>
      </section>
    </>
  )
}
