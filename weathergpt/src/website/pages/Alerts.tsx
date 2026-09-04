import { useLanguage } from '../../i18n/LanguageContext'
import styles from './ContentPage.module.css'

const ALERTS = [
  {
    tone: 'red' as const,
    title: "Severe Cyclonic Storm 'Mocha'",
    place: 'Bay of Bengal Coast (Odisha, West Bengal)',
    meta: '2m ago · IMD',
  },
  {
    tone: 'amber' as const,
    title: 'Heat Wave Conditions',
    place: 'Northern Plains (Delhi, Haryana, Punjab)',
    meta: '10m ago · Watch',
  },
  {
    tone: 'amber' as const,
    title: 'Heavy Rainfall Expected',
    place: 'Kerala North, coastal districts',
    meta: '25m ago · Advisory',
  },
  {
    tone: 'green' as const,
    title: 'Cleared: Coastal Fog Advisory',
    place: 'Mumbai Metro Region',
    meta: '1h ago · Resolved',
  },
]

export default function Alerts() {
  const { t } = useLanguage()
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className={styles.pageEyebrow}>12 ACTIVE · 2 CRITICAL</p>
          <h1 className={styles.pageTitle}>{t.pages.alertsTitle}</h1>
          <p className={styles.pageSubtitle}>{t.pages.alertsSubtitle}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.pages.activeAlertsHeading}</h2>
          {ALERTS.map((a) => (
            <div className={styles.listRow} key={a.title}>
              <div className={styles.panel} data-tone={a.tone} style={{ flex: 1, padding: '14px 18px' }}>
                <strong style={{ fontSize: 15, color: 'var(--ink)' }}>{a.title}</strong>
                <p className={styles.panelHint} style={{ marginTop: 4 }}>
                  {a.place}
                </p>
              </div>
              <span className={styles.listMeta}>{a.meta}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
