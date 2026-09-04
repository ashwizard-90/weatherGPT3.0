import { useLanguage } from '../../i18n/LanguageContext'
import { useSession } from '../../shared/context/SessionContext'
import styles from '../dashboard.module.css'

export default function AdminWidgets() {
  const { t } = useLanguage()
  const { users } = useSession()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{t.widgets.adminControlCenter}</h2>
          <p style={{ fontSize: 13, color: 'var(--slate)' }}>System, users and data infrastructure overview. High-level telemetry for WeatherGPT operations.</p>
        </div>
        <button type="button" style={{ background: 'var(--red)', color: 'white', padding: '10px 16px', borderRadius: 8, border: 'none', fontWeight: 700 }}>* Disaster Mode</button>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.panel} data-tone="cyan">
          <span className={styles.panelLabel}>{t.widgets.adminTotalUsers.toUpperCase()} · ↑12%</span>
          <div className="mono" style={{ fontSize: 24, fontWeight: 800 }}>12,450</div>
        </div>
        <div className={styles.panel} data-tone="green">
          <span className={styles.panelLabel}>{t.widgets.adminActiveUsers.toUpperCase()} · Current</span>
          <div className="mono" style={{ fontSize: 24, fontWeight: 800 }}>3,291</div>
        </div>
        <div className={styles.panel} data-tone="cyan" style={{ background: 'var(--ink)', color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{t.widgets.adminApiHealth.toUpperCase()} · Optimal</span>
          <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>99.98%</div>
        </div>
        <div className={styles.panel} data-tone="red">
          <span className={styles.panelLabel} style={{ color: 'var(--red)' }}>{t.widgets.adminActiveAlerts.toUpperCase()} · Live</span>
          <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--red)' }}>14 <span style={{ fontSize: 12 }}>critical</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginTop: 16 }}>
        <div className={styles.panel} data-tone="slate">
          <strong>{t.widgets.adminInfrastructure}</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 8, border: '1px solid var(--line-light)' }}><span>● IMD Feed</span><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>Healthy</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 8, border: '1px solid var(--line-light)' }}><span>● Satellite Ingest</span><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>Healthy</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 8, border: '1px solid var(--line-light)' }}><span>● Radar Synth</span><span style={{ background: 'rgba(242,169,59,0.18)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>Delayed (12s)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 8, border: '1px solid var(--line-light)' }}><span>● NWP Models</span><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>Healthy</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--white)', padding: 10, borderRadius: 8, border: '1px solid var(--line-light)' }}><span>● Push Gateway</span><span style={{ background: 'rgba(63,166,106,0.12)', color: 'var(--green)', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>Healthy</span></div>
          </div>
        </div>
        <div className={styles.panel} data-tone="slate">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{t.widgets.adminRecentActivity}</strong><span style={{ color: 'var(--cyan)', fontSize: 12 }}>View Full Audit Log</span></div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--slate-light)', display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr 0.6fr 0.4fr', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--line-light)' }}><span>Time</span><span>Event</span><span>User/System</span><span>Status</span><span>Action</span></div>
          <div style={{ fontSize: 12, display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr 0.6fr 0.4fr', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--line-light)' }}><span className="mono">14:32:01 UTC</span><span>Cyclone Alert Propagated</span><span>SYS_AUTOMATION</span><span style={{ background: 'rgba(63,166,106,0.12)', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>SUCCESS</span><span>⋮</span></div>
          <div style={{ fontSize: 12, display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr 0.6fr 0.4fr', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--line-light)' }}><span className="mono">14:28:15 UTC</span><span>Role Update: Analyst → Admin</span><span>j.doe@weather.gov</span><span style={{ background: 'rgba(63,166,106,0.12)', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>SUCCESS</span><span>⋮</span></div>
          <div style={{ fontSize: 12, display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr 0.6fr 0.4fr', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--line-light)' }}><span className="mono">14:15:22 UTC</span><span>Radar Feed Interruption</span><span>NODE_MUMBAI_01</span><span style={{ background: 'rgba(214,69,80,0.12)', color: 'var(--red)', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>WARN</span><span>⋮</span></div>
        </div>
      </div>

      {/* Stored user details — admin board */}
      <div className={styles.panel} data-tone="cyan" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Registered Users — Stored Details</strong>
          <span className="mono" style={{ fontSize: 11, color: 'var(--slate)', background: 'var(--paper-2)', padding: '4px 8px', borderRadius: 999 }}>{users.length} total</span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 4 }}>Every completed signup is persisted locally (localStorage `weathergpt.users`) and visible only to authenticated admin. In production this would be a database.</p>
        {users.length === 0 ? (
          <div style={{ marginTop: 12, padding: 20, textAlign: 'center', color: 'var(--slate)', fontSize: 13, background: 'var(--paper-2)', borderRadius: 8, border: '1px dashed var(--line-light)' }}>
            No users registered yet. Complete a signup to see stored details here.
          </div>
        ) : (
          <div style={{ marginTop: 12, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: 10, color: 'var(--slate-light)', borderBottom: '1px solid var(--line-light)' }}>
                  <th style={{ padding: '8px 6px' }}>Name</th>
                  <th style={{ padding: '8px 6px' }}>Mobile</th>
                  <th style={{ padding: '8px 6px' }}>Location</th>
                  <th style={{ padding: '8px 6px' }}>Role</th>
                  <th style={{ padding: '8px 6px' }}>Lang</th>
                  <th style={{ padding: '8px 6px' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--line-light)' }}>
                    <td style={{ padding: '8px 6px', fontWeight: 700 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {u.avatarUrl ? <img src={u.avatarUrl} alt="" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} /> : <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--paper-2)', display: 'grid', placeItems: 'center', fontSize: 10 }}>👤</span>}
                        {u.fullName}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--slate-light)', fontWeight: 400 }}>{u.email || '—'}</div>
                    </td>
                    <td style={{ padding: '8px 6px' }} className="mono">{u.mobileNumber}</td>
                    <td style={{ padding: '8px 6px' }}>{u.location.district ? `${u.location.cityTown}, ${u.location.district}, ${u.location.state}` : u.location.state || '—'}</td>
                    <td style={{ padding: '8px 6px' }}><span style={{ background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 999, fontSize: 10 }}>{u.role ?? '—'}</span></td>
                    <td style={{ padding: '8px 6px', textTransform: 'uppercase' }}>{u.language}</td>
                    <td style={{ padding: '8px 6px' }} className="mono" title={u.createdAt}>{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
