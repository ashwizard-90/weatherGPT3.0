import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { fetchLiveSituation, type LiveSituationState } from '../../services/weatherService'
import styles from './LiveSituation.module.css'

export default function LiveSituation() {
  const { t } = useLanguage()
  const [state, setState] = useState<LiveSituationState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetchLiveSituation().then((res) => {
      if (!cancelled) setState(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') {
    return <div className="state-loading" role="status" aria-live="polite">{t.liveSituation.loading}</div>
  }

  if (state.status === 'error') {
    return (
      <div className="state-error" role="alert">
        <strong>{t.liveSituation.error}</strong>
        <p style={{ marginTop: 8, fontSize: 13 }}>{state.message}</p>
        {state.lastUpdated && <p className="mono" style={{ marginTop: 8, fontSize: 11 }}>{t.common.lastUpdated}: {state.lastUpdated}</p>}
        <button
          type="button"
          onClick={() => setState({ status: 'loading' })}
          style={{ marginTop: 12, padding: '8px 14px', border: '1px solid var(--line-light)', borderRadius: 6, background: 'var(--white)' }}
        >
          {t.common.retry}
        </button>
      </div>
    )
  }

  if (state.status === 'empty') {
    return (
      <div className="state-empty" role="status">
        <strong>{t.liveSituation.empty}</strong>
        <p style={{ marginTop: 8, fontSize: 13 }}>{t.common.dataUnavailable}</p>
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--slate-light)' }}>{t.liveSituation.source}: IMD & Satellite Observations</p>
      </div>
    )
  }

  // Success / stale — render data-driven values (numbers stay data, labels translated)
  const data = state.status === 'success' || state.status === 'stale' ? state.data : null
  if (!data) return null

  const staleFlag = state.status === 'stale'

  return (
    <div className={styles.wrap}>
      {staleFlag && (
        <div className="state-error" style={{ marginBottom: 16 }}>
          {t.liveSituation.staleWarning}: {data.lastUpdated}
        </div>
      )}
      <div className={styles.header}>
        <h2 className={styles.title}>{t.liveSituation.title}</h2>
        <p className={styles.subtitle}>{t.liveSituation.subtitle}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card} data-tone="cyan">
          <span className={styles.label}>{t.liveSituation.temperature.toUpperCase()}</span>
          <div className={`mono ${styles.value}`}>{data.temperature}</div>
          <span className={styles.hint}>{data.condition}</span>
        </div>
        <div className={styles.card} data-tone="cyan">
          <span className={styles.label}>{t.liveSituation.humidity.toUpperCase()}</span>
          <div className={`mono ${styles.value}`}>{data.humidity}</div>
        </div>
        <div className={styles.card} data-tone="amber">
          <span className={styles.label}>{t.liveSituation.wind.toUpperCase()}</span>
          <div className={`mono ${styles.value}`}>{data.wind}</div>
        </div>
        <div className={styles.card} data-tone="cyan">
          <span className={styles.label}>{t.liveSituation.rainfall.toUpperCase()}</span>
          <div className={`mono ${styles.value}`}>{data.rainfall}</div>
        </div>
      </div>

      <div className={styles.meta}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--slate-light)' }}>
          {t.liveSituation.source}: {data.source} · {t.liveSituation.lastUpdated}: {new Date(data.lastUpdated).toLocaleString()}
        </span>
        <button type="button" className={styles.refresh} onClick={() => setState({ status: 'loading' })}>
          {t.liveSituation.refresh}
        </button>
      </div>

      <div className={styles.warnings}>
        <h3 className={styles.warningsTitle}>{t.liveSituation.activeWarnings}</h3>
        {data.activeWarnings.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--slate)' }}>{t.liveSituation.noActiveWarnings}</p>
        ) : (
          data.activeWarnings.map((w) => (
            <div key={w.id} className={styles.warningRow} data-sev={w.severity}>
              <strong>{w.title}</strong>
              <span>{w.location} · {w.issuedAt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
