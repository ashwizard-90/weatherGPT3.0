import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { fetchEmergencyContacts, type EmergencyState } from '../../services/emergencyService'
import styles from '../dashboard.module.css'

export default function EmergencyContacts() {
  const { t } = useLanguage()
  const [state, setState] = useState<EmergencyState>({ status: 'loading' })

  useEffect(() => {
    fetchEmergencyContacts().then(setState)
  }, [])

  if (state.status === 'loading') return <div className="state-loading">{t.common.loading}</div>
  if (state.status === 'error') return <div className="state-error">{state.message}</div>
  if (state.status === 'empty') return <div className="state-empty">{t.emergency.unavailable}</div>

  return (
    <div className={styles.panel} data-tone="red">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{t.emergency.title}</strong>
        <span className="mono" style={{ fontSize: 11, color: 'var(--slate-light)' }}>{t.emergency.verified} · {new Date(state.lastUpdated).toLocaleTimeString()}</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>{t.emergency.subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {state.contacts.map((c) => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 8, padding: '10px 14px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{c.service}</div>
              <div style={{ fontSize: 11, color: 'var(--slate-light)' }}>{t.emergency.source}: {c.authority} · {c.verified ? t.emergency.verified : t.common.unavailable}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="mono" style={{ fontWeight: 800, fontSize: 14 }}>{c.phone}</span>
              <a
                href={`tel:${c.phone}`}
                aria-label={`${t.emergency.call} ${c.service} ${c.phone}`}
                style={{ background: 'var(--red)', color: 'white', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
              >
                {t.emergency.call}
              </a>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 8 }}>{t.emergency.source}: {state.source}</p>
    </div>
  )
}
