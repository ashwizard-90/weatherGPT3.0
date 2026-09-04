import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { fetchMapState, DEFAULT_LAYERS, type MapLayer, type MapState } from '../../services/mapService'
import styles from './LiveMap.module.css'

export default function LiveMap() {
  const { t } = useLanguage()
  const [state, setState] = useState<MapState>({ status: 'loading', layers: DEFAULT_LAYERS, markers: [] })
  const [overrideLayers, setOverrideLayers] = useState<MapLayer[]>(DEFAULT_LAYERS)

  useEffect(() => {
    let cancelled = false
    fetchMapState().then((res) => {
      if (!cancelled) {
        setState(res)
        if (res.layers?.length) setOverrideLayers(res.layers)
      }
    })
    return () => { cancelled = true }
  }, [])

  const [layersOpen, setLayersOpen] = useState(true)

  const toggle = (id: string) => {
    setOverrideLayers((prev) => prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)))
  }

  if (state.status === 'loading') {
    return <div className="state-loading">{t.liveMap.loading}</div>
  }

  const isError = state.status === 'error'

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.liveMap.title}</h2>
        <span className={`mono ${styles.updated}`}>
          {t.liveMap.lastUpdated}: {state.lastUpdated ? new Date(state.lastUpdated).toLocaleString() : '—'} · {state.source ?? t.dashboard.dataSourcedFrom}
        </span>
      </div>

      <div className={styles.layout} style={{ gridTemplateColumns: '1fr' }}>
        <div className={styles.canvas} style={{ background: 'linear-gradient(180deg, #e8f4e8 0%, #f5e6c8 60%, #78b6e8 100%)' }}>
          {/* Hamburger to open/close map layers */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setLayersOpen((v) => !v)}
            aria-label={layersOpen ? 'Close map layers' : 'Open map layers'}
            aria-expanded={layersOpen}
            aria-controls="map-layers-panel"
          >
            {layersOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>

          {/* Map Layers floating card — top left, matches screenshot */}
          {layersOpen && (
            <div id="map-layers-panel" className={styles.floatingLayers}>
            <div className={styles.floatingTitle}>Map Layers</div>
            <label className={styles.floatingRow}>
              <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'temperature')?.enabled} onChange={() => toggle('temperature')} />
              <span>{t.liveMap.temperature}</span> <span style={{ marginLeft: 'auto' }}>🌡️</span>
            </label>
            <label className={styles.floatingRow}>
              <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'rainfall')?.enabled} onChange={() => toggle('rainfall')} />
              <span>{t.liveMap.rainfall}</span> <span style={{ marginLeft: 'auto' }}>💧</span>
            </label>
            <label className={styles.floatingRow}>
              <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'wind')?.enabled} onChange={() => toggle('wind')} />
              <span>{t.liveMap.windSpeed}</span> <span style={{ marginLeft: 'auto' }}>🌬️</span>
            </label>
            <label className={styles.floatingRow}>
              <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'satellite')?.enabled} onChange={() => toggle('satellite')} />
              <span>{t.liveMap.satelliteIr}</span> <span style={{ marginLeft: 'auto' }}>🛰️</span>
            </label>
            <label className={styles.floatingRow}>
              <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'radar')?.enabled} onChange={() => toggle('radar')} />
              <span>{t.liveMap.dopplerRadar}</span> <span style={{ marginLeft: 'auto' }}>◎</span>
            </label>
            <div className={styles.floatingWarning}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--red)', fontWeight: 700, fontSize: 12 }}>
                <input type="checkbox" checked={overrideLayers.find((l) => l.id === 'warnings')?.enabled} onChange={() => toggle('warnings')} />
                {t.liveMap.activeWarnings} ⚠️
              </label>
            </div>
          </div>
          )}

          {/* India SVG with realistic styling */}
          <svg viewBox="0 0 400 420" className={styles.svg} aria-label={t.liveMap.indiaMap}>
            {/* Sea */}
            <rect x="0" y="0" width="400" height="420" fill="url(#seaGrad)" opacity="0.3" />
            <defs>
              <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e40af" /></linearGradient>
              <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8f5d8" /><stop offset="60%" stopColor="#f5e6c8" /><stop offset="100%" stopColor="#fde68a" /></linearGradient>
            </defs>
            {/* India land */}
            <path
              d="M120 40 L230 55 L260 110 L290 160 L275 220 L300 270 L260 330 L210 380 L160 360 L130 300 L95 250 L80 180 L95 110 Z"
              fill="url(#landGrad)"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
            {/* State boundaries faint */}
            <path d="M120 120 L230 130 L260 180 M95 250 L160 260 L210 300" stroke="rgba(148,163,184,0.4)" strokeWidth="0.8" fill="none" />
            {/* Clouds over Bay of Bengal */}
            <ellipse cx="320" cy="280" rx="28" ry="16" fill="white" opacity="0.7" />
            <ellipse cx="340" cy="300" rx="18" ry="10" fill="white" opacity="0.6" />
            <ellipse cx="310" cy="320" rx="22" ry="12" fill="white" opacity="0.5" />
            {/* Small cloud over south */}
            <ellipse cx="240" cy="350" rx="14" ry="8" fill="white" opacity="0.6" />
          </svg>

          {/* Mumbai marker — matches screenshot: blue dot with pill label "Mumbai: 28°C" */}
          <div className={styles.cityLabel} style={{ left: '42%', top: '48%' }}>
            <span className={styles.cityPill}>Mumbai: 28°C</span>
            <span className={styles.cityDot} style={{ background: '#1e40af' }} />
          </div>
          {/* New Delhi marker */}
          <div className={styles.cityLabel} style={{ left: '62%', top: '30%' }}>
            <span className={styles.cityPill}>New Delhi: 34°C</span>
            <span className={styles.cityDot} style={{ background: '#1e40af' }} />
          </div>
          {/* Heavy Rain red pill — south central */}
          <div className={styles.heavyRain} style={{ left: '53%', top: '62%' }}>
            <span className={styles.heavyPill}>⚠️ Heavy Rain</span>
            <span className={styles.heavyDot} />
          </div>

          {/* Top right controls */}
          <div className={styles.mapControls} role="toolbar" aria-label={t.liveMap.zoomControls}>
            <button type="button" className={styles.zoomBtn} aria-label="Zoom in">+</button>
            <button type="button" className={styles.zoomBtn} aria-label="Zoom out">−</button>
            <button type="button" className={styles.zoomBtn} aria-label={t.liveMap.locationControl}>◎</button>
          </div>

          {/* Mumbai detail popup — matches screenshot: top right white card */}
          <div className={styles.detailPopup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Mumbai, IN</strong>
              <button type="button" style={{ background: 'transparent', border: 'none', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ fontSize: 11, color: 'var(--slate)' }}>📍 18.96°N, 72.82°E</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 20 }}>☁️</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>28°<span style={{ fontSize: 14, fontWeight: 400 }}>C</span></div>
                <div style={{ fontSize: 12, color: 'var(--slate)' }}>Mostly Cloudy</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <div style={{ background: 'var(--paper-2)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--slate-light)', fontWeight: 700 }}>Humidity</div>
                <div style={{ fontWeight: 800 }}>78%</div>
              </div>
              <div style={{ background: 'var(--paper-2)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--slate-light)', fontWeight: 700 }}>Wind</div>
                <div style={{ fontWeight: 800 }}>14 <span style={{ fontSize: 11, fontWeight: 400 }}>km/h ↗</span></div>
              </div>
              <div style={{ background: 'var(--paper-2)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--slate-light)', fontWeight: 700 }}>Pressure</div>
                <div style={{ fontWeight: 800 }}>1008 <span style={{ fontSize: 11, fontWeight: 400 }}>hPa</span></div>
              </div>
              <div style={{ background: 'var(--paper-2)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--slate-light)', fontWeight: 700 }}>Visibility</div>
                <div style={{ fontWeight: 800 }}>4.2 <span style={{ fontSize: 11, fontWeight: 400 }}>km</span></div>
              </div>
            </div>
            <button type="button" style={{ marginTop: 12, width: '100%', background: 'var(--ink)', color: 'white', padding: '10px', borderRadius: 8, border: 'none', fontWeight: 700 }}>
              View Full Forecast →
            </button>
          </div>

          {/* Insight card — bottom right, matches screenshot */}
          <div className={styles.insightCard}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink)', display: 'flex', gap: 6, alignItems: 'center' }}>☁️ WeatherGPT Insight</div>
            <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6, lineHeight: 1.5 }}>
              "Atmospheric pressure dropping rapidly along the western coast. Potential squall lines developing near Mumbai over the next 3 hours."
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input placeholder="Ask about this region..." style={{ flex: 1, border: '1px solid var(--line-light)', borderRadius: 8, padding: '8px 10px', fontSize: 12 }} />
              <button type="button" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'white', border: 'none' }}>🎤</button>
            </div>
          </div>

          {/* Bottom timeline */}
          <div className={styles.timeline}>
            <div className={styles.timelineTicks}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className={styles.tick} />
              ))}
            </div>
          </div>

          {isError && (
            <div className={styles.errorOverlay}>
              <strong>{t.liveMap.error}</strong>
              <p style={{ fontSize: 11 }}>{t.liveMap.mapUnavailable}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
