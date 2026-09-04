import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { fetchNearestSafePlaces, type SafePlaceState } from '../../services/safePlaceService'
import styles from '../dashboard.module.css'

export default function NearestSafePlaces() {
  const { t } = useLanguage()
  const [state, setState] = useState<SafePlaceState>({ status: 'loading' })

  useEffect(() => {
    fetchNearestSafePlaces().then(setState)
  }, [])

  if (state.status === 'loading') return <div className="state-loading">{t.common.loading}</div>
  if (state.status === 'error') return <div className="state-error">{state.message}</div>
  if (state.status === 'empty') {
    return <div className="state-empty">{t.safePlace.noVerified}</div>
  }

  return (
    <div className={styles.panel} data-tone="cyan">
      <strong>{t.safePlace.nearestSafePlaces}</strong>
      <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>{t.safePlace.subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        {state.places.map((p) => (
          <div key={p.id} style={{ background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 13 }}>{p.name}</strong>
              <span style={{ fontSize: 11, background: p.open ? 'rgba(63,166,106,0.12)' : 'rgba(214,69,80,0.12)', color: p.open ? 'var(--green)' : 'var(--red)', padding: '2px 8px', borderRadius: 999 }}>{p.open ? t.safePlace.open : t.safePlace.closed}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--slate-light)', marginTop: 4 }}>{p.type} · {p.address}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11, color: 'var(--slate)' }}>
              <span>{t.safePlace.distance}: <strong className="mono">{p.distanceKm} km</strong></span>
              {p.travelTimeMin && <span>{t.safePlace.travelTime}: <strong className="mono">{p.travelTimeMin} min</strong></span>}
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'var(--ink)', color: 'white', padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
              >
                {t.safePlace.navigate} →
              </a>
              <span style={{ fontSize: 11, color: 'var(--slate-light)', alignSelf: 'center' }}>{t.safePlace.lastUpdated}: {new Date(state.lastUpdated).toLocaleTimeString()} · {p.source} · {t.emergency.verified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
