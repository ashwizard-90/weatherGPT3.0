import { useLanguage } from '../../i18n/LanguageContext'
import styles from '../dashboard.module.css'

export default function OperationsWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800 }}>{t.widgets.operationsControlCenter}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" style={{ padding: '8px 14px', border: '1px solid var(--line-light)', borderRadius: 8, background: 'var(--white)', fontSize: 12 }}>Force Sync</button>
          <button type="button" style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--ink)', color: 'white', border: 'none', fontSize: 12 }}>Add Source</button>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 4 }}>Monitor meteorological data sources, telemetry pipelines, and system health to ensure mission-critical data integrity.</p>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.widgets.operationsApiHealth.toUpperCase()}</span>
          <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>99.9%</div>
          <div style={{ fontSize: 11, color: 'var(--green)' }}>● 99.9% · Healthy</div>
          <p style={{ fontSize: 11, color: 'var(--slate)', marginTop: 4 }}>IMD & NWS endpoints</p>
        </div>
        <div className={styles.panel} data-tone="cyan">
          <span className={styles.panelLabel}>{t.widgets.operationsSatelliteIngest.toUpperCase()}</span>
          <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>120ms</div>
          <div style={{ fontSize: 11, color: 'var(--green)' }}>● Healthy</div>
          <p style={{ fontSize: 11, color: 'var(--slate)', marginTop: 4 }}>GOES-16 & Himawari</p>
        </div>
        <div className={styles.panel} data-tone="amber">
          <span className={styles.panelLabel}>{t.widgets.operationsRadarNetwork.toUpperCase()}</span>
          <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>850ms</div>
          <div style={{ fontSize: 11, color: '#8a3b00' }}>● Delayed (12s)</div>
          <p style={{ fontSize: 11, color: 'var(--slate)', marginTop: 4 }}>Doppler composites</p>
        </div>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.widgets.operationsNwpModels.toUpperCase()}</span>
          <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>Syncing</div>
          <div style={{ fontSize: 11, color: 'var(--green)' }}>● Syncing</div>
          <p style={{ fontSize: 11, color: 'var(--slate)', marginTop: 4 }}>GFS, ECMWF runs</p>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>{t.widgets.operationsDataConfidence}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: 'var(--white)', border: '1px solid var(--line-light)' }}>
          <thead>
            <tr style={{ background: 'var(--paper-2)', textAlign: 'left' }}>
              <th style={{ padding: 10, fontSize: 11, color: 'var(--slate-light)' }}>SOURCE</th>
              <th style={{ padding: 10, fontSize: 11, color: 'var(--slate-light)' }}>STATUS</th>
              <th style={{ padding: 10, fontSize: 11, color: 'var(--slate-light)' }}>LAST UPDATED</th>
              <th style={{ padding: 10, fontSize: 11, color: 'var(--slate-light)' }}>LATENCY</th>
              <th style={{ padding: 10, fontSize: 11, color: 'var(--slate-light)' }}>COVERAGE</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid var(--line-light)' }}><td style={{ padding: 10 }}>IMD Primary API</td><td><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>● HEALTHY</span></td><td>2 mins ago</td><td>45ms</td><td><span style={{ display: 'block', width: 60, height: 6, background: 'var(--ink)', borderRadius: 999 }} /></td></tr>
            <tr style={{ borderTop: '1px solid var(--line-light)' }}><td style={{ padding: 10 }}>GOES-16 Feed</td><td><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>● HEALTHY</span></td><td>5 mins ago</td><td>120ms</td><td><span style={{ display: 'block', width: 60, height: 6, background: 'var(--ink)', borderRadius: 999 }} /></td></tr>
            <tr style={{ borderTop: '1px solid var(--line-light)' }}><td style={{ padding: 10 }}>NEXRAD L2</td><td><span style={{ background: 'rgba(242,169,59,0.18)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>● DELAYED</span></td><td>12 mins ago</td><td>850ms</td><td><span style={{ display: 'block', width: 40, height: 6, background: '#8a3b00', borderRadius: 999 }} /></td></tr>
            <tr style={{ borderTop: '1px solid var(--line-light)' }}><td style={{ padding: 10 }}>Ground Stations (Region 4)</td><td><span style={{ background: 'rgba(214,69,80,0.12)', color: 'var(--red)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>● UNAVAILABLE</span></td><td>2 hrs ago</td><td>Timeout</td><td><span style={{ display: 'block', width: 20, height: 6, background: 'var(--red)', borderRadius: 999 }} /></td></tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 8 }}>{t.widgets.operationsGlobalIngest} · Monitoring 14,204 active nodes · {t.common.lastUpdated}: just now</p>
    </>
  )
}
