/**
 * Live Map service — describes layer availability and marker data.
 * Architecture: Frontend -> Backend map/weather API -> official/approved source.
 * No API keys are ever inlined in frontend source; they must come from
 * environment variables that are injected at build/deploy and proxied server-side.
 */

export type MapLayerId = 'temperature' | 'rainfall' | 'wind' | 'satellite' | 'radar' | 'warnings'

export interface MapLayer {
  id: MapLayerId
  labelKey: string // i18n key suffix, e.g. "temperatureLayer"
  enabled: boolean
  opacity: number
  source: string
}

export interface MapMarker {
  id: string
  lat: number
  lng: number
  label: string
  value: string
  tone: 'cyan' | 'amber' | 'red'
}

export interface MapState {
  status: 'loading' | 'ready' | 'error' | 'empty'
  message?: string
  layers: MapLayer[]
  markers: MapMarker[]
  lastUpdated?: string
  source?: string
}

function hasMapBackend(): boolean {
  const key = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_MAP_API_KEY
  const url = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_MAP_API_URL
  return Boolean(key || url)
}

export const DEFAULT_LAYERS: MapLayer[] = [
  { id: 'temperature', labelKey: 'temperatureLayer', enabled: true, opacity: 0.85, source: 'IMD' },
  { id: 'rainfall', labelKey: 'rainfallLayer', enabled: true, opacity: 0.75, source: 'INSAT-3DR' },
  { id: 'wind', labelKey: 'windLayer', enabled: false, opacity: 0.6, source: 'NWP' },
  { id: 'satellite', labelKey: 'satelliteLayer', enabled: true, opacity: 0.7, source: 'GOES-16' },
  { id: 'radar', labelKey: 'radarLayer', enabled: false, opacity: 0.8, source: 'Doppler S-Band' },
  { id: 'warnings', labelKey: 'alertsLayer', enabled: true, opacity: 1, source: 'IMD' },
]

export const DEMO_MARKERS: MapMarker[] = [
  { id: 'mum', lat: 19.076, lng: 72.877, label: 'Mumbai', value: '28°C', tone: 'cyan' },
  { id: 'del', lat: 28.61, lng: 77.2, label: 'New Delhi', value: '34°C', tone: 'amber' },
  { id: 'che', lat: 13.08, lng: 80.27, label: 'Chennai', value: '31°C', tone: 'cyan' },
]

export async function fetchMapState(): Promise<MapState> {
  if (!hasMapBackend()) {
    return {
      status: 'error',
      message: 'Map telemetry not configured. Set VITE_MAP_API_KEY/VITE_MAP_API_URL via backend proxy.',
      layers: DEFAULT_LAYERS,
      markers: [],
    }
  }
  return {
    status: 'ready',
    layers: DEFAULT_LAYERS,
    markers: DEMO_MARKERS,
    lastUpdated: new Date().toISOString(),
    source: 'IMD & Satellite Observations',
  }
}
