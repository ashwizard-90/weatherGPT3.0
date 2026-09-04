import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { fetchClimateReport, type ClimateState } from '../../services/climateService'
import styles from './ClimateReport.module.css'

export default function ClimateReport() {
  const { t } = useLanguage()
  const [state, setState] = useState<ClimateState>({ status: 'loading' })
  const [period, setPeriod] = useState('1990-2020 (30-Year Norm)')
  const [region, setRegion] = useState('Chennai Metro Region')

  useEffect(() => {
    let cancelled = false
    fetchClimateReport({ region, baseline: period }).then((res) => {
      if (!cancelled) setState(res)
    })
    return () => { cancelled = true }
  }, [region, period])

  if (state.status === 'loading') return <div className="state-loading">{t.climate.loading}</div>
  if (state.status === 'error') return (
    <div className="state-error" role="alert">
      <strong>{t.climate.error}</strong>
      <p style={{ marginTop: 8 }}>{state.message}</p>
      <p style={{ marginTop: 8, fontSize: 12 }}>{t.climate.dataSource}: IMD/WMO · {t.climate.lastUpdated}: —</p>
      <button type="button" onClick={() => setState({ status: 'loading' })} style={{ marginTop: 12, padding: '8px 14px', border: '1px solid var(--line-light)', borderRadius: 6, background: 'var(--white)' }}>{t.common.retry}</button>
    </div>
  )
  if (state.status === 'empty') return (
    <div className="state-empty">
      <strong>{t.climate.empty}</strong>
      <p style={{ marginTop: 8 }}>{state.message}</p>
      <p style={{ marginTop: 8, fontSize: 12 }}>{t.climate.historical} · {t.climate.selectedLocation}: {region} · {t.climate.selectedPeriod}: {period}</p>
    </div>
  )

  const d = state.data
  return (
    <div className={styles.wrap}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>{t.climate.region}</label>
          <select className={styles.select} value={region} onChange={(e) => setRegion(e.target.value)}>
            <option>Chennai Metro Region</option>
            <option>Mumbai Metro Region</option>
            <option>National Composite</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.label}>{t.climate.baselinePeriod}</label>
          <select className={styles.select} value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option>1990-2020 (30-Year Norm)</option>
            <option>1961-1990</option>
            <option>Max Record</option>
          </select>
        </div>
        <button type="button" className={styles.runBtn}>{t.climate.runAnalysis}</button>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHead}>
          <h3 className={styles.chartTitle}>{t.climate.temperatureTrends} & {t.climate.rainfallTrends}</h3>
          <span className={`mono ${styles.meta}`}>{d.locationLabel} · {d.baselinePeriod}</span>
        </div>
        <div className={styles.chartPlaceholder} role="img" aria-label={`${t.climate.temperatureAnomaly} vs ${t.climate.precipitationDeviation}`}>
          <svg viewBox="0 0 640 200" className={styles.svg}>
            {/* bars for precipitation */}
            {d.points.map((p, i) => {
              const x = 40 + (i * 70)
              const h = Math.abs(p.precipitationDeviation) * 4
              const y = 100 - h / 2
              return <rect key={p.year} x={x} y={y} width="36" height={h} fill={p.precipitationDeviation > 5 ? 'rgba(63,166,106,0.5)' : 'rgba(45,168,216,0.25)'} />
            })}
            {/* line for anomaly */}
            <path
              d={d.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${56 + i * 70} ${120 - p.tempAnomaly * 30}`).join(' ')}
              fill="none" stroke="var(--red)" strokeWidth="3"
            />
            <text x="10" y="20" fontSize="10" fill="var(--slate-light)">+2.0°</text>
            <text x="10" y="120" fontSize="10" fill="var(--slate-light)">0.0°</text>
            {d.points.map((p, i) => (
              <text key={p.year} x={56 + i * 70} y="140" fontSize="9" fill="var(--slate)" textAnchor="middle">{String(p.year).slice(2)}</text>
            ))}
          </svg>
          <div className={styles.legendLine}>
            <span><i style={{ background: 'var(--red)' }} /> {t.climate.temperatureAnomaly}</span>
            <span><i style={{ background: 'rgba(63,166,106,0.5)' }} /> {t.climate.precipitationDeviation}</span>
          </div>
        </div>
        <p className={`mono ${styles.source}`}>{t.climate.dataSource}: {d.dataSource} · {t.climate.lastUpdated}: {new Date(d.lastUpdated).toLocaleString()}</p>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.smallCard}>
          <h4>{t.climate.seasonalShift}</h4>
          <div className={styles.metricRow}>
            <span>{t.climate.summerDuration}</span>
            <strong className="mono" style={{ color: 'var(--red)' }}>+{d.seasonalShift.summerDays} Days ↑</strong>
          </div>
          <div className={styles.bar}><span style={{ width: '60%', background: 'var(--red)' }} /></div>
          <div className={styles.metricRow}>
            <span>{t.climate.winterFrostDays}</span>
            <strong className="mono" style={{ color: 'var(--cyan)' }}>{d.seasonalShift.winterFrostDays} Days ↓</strong>
          </div>
          <div className={styles.bar}><span style={{ width: '35%', background: 'var(--cyan)' }} /></div>
        </div>
        <div className={styles.smallCard}>
          <h4>{t.climate.extremeEvents}</h4>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1, background: 'var(--paper-2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{d.extremeEvents.heatwaveMultiplier}x</div>
              <div style={{ fontSize: 11, color: 'var(--slate)' }}>{t.climate.heatwaves.toUpperCase()}</div>
            </div>
            <div style={{ flex: 1, background: 'var(--paper-2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{d.extremeEvents.heavyRainMultiplier}x</div>
              <div style={{ fontSize: 11, color: 'var(--slate)' }}>{t.climate.heavyRain.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
