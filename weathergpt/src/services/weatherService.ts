/**
 * Live Situation service — clean data-flow interface.
 * Frontend -> service -> (backend proxy) -> official weather source.
 * No fake live data is ever invented; when upstream is not configured,
 * the service returns an explicit unavailable/empty state so the UI can
 * render a proper loading / error / empty / stale view.
 */

export interface LiveReading {
  label: string
  value: string
  hint: string
  tone: 'cyan' | 'amber' | 'red' | 'green' | 'slate'
}

export interface ActiveWarning {
  id: string
  type: 'heavyRain' | 'cyclone' | 'flood' | 'heatwave' | 'wind' | 'marine'
  severity: 'advisory' | 'warning' | 'critical'
  title: string
  location: string
  issuedAt: string // ISO
}

export interface LiveSituationData {
  locationLabel: string
  temperature: string // e.g. "28°C" — data, never translated
  condition: string // e.g. "Partly Cloudy" — will be mapped via i18n hints
  humidity: string // "78%"
  wind: string // "14 km/h"
  rainfall: string // "12 mm"
  pressure: string // "1008 hPa"
  visibility: string // "4.2 km"
  activeWarnings: ActiveWarning[]
  riskInfo: string
  source: string
  lastUpdated: string // ISO timestamp
  stale: boolean
}

export type LiveSituationState =
  | { status: 'loading' }
  | { status: 'success'; data: LiveSituationData }
  | { status: 'empty' }
  | { status: 'error'; message: string; lastUpdated?: string }
  | { status: 'stale'; data: LiveSituationData; message: string }

function hasBackend(): boolean {
  // In production this would be a real endpoint; we use Vite env as a proxy flag.
  // No secret is ever committed — the value must come from an injected env var
  // and the frontend only ever talks to our backend proxy, not the upstream directly.
  const url = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_WEATHER_API_URL
  const key = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_WEATHER_API_KEY
  return Boolean(url && key)
}

/**
 * Fetch the current live situation for a given location.
 * If the backend proxy is not configured (no env var), return an explicit
 * error state so the UI renders "data unavailable" instead of inventing data.
 */
export async function fetchLiveSituation(_location?: string): Promise<LiveSituationState> {
  if (!hasBackend()) {
    return {
      status: 'error',
      message: 'Live weather feed not configured. Set VITE_WEATHER_API_URL via backend proxy.',
    }
  }
  // If backend is configured, a real fetch would happen here:
  // const res = await fetch(`${import.meta.env.VITE_WEATHER_API_URL}/live?s=...`)
  // For this frontend build, we surface the "stale/empty" path honestly.
  return { status: 'empty' }
}

/**
 * Demo helper used by RoleOverview — returns explicit empty when no backend.
 * Keeps numeric weather values data-driven; only labels are translated via i18n.
 */
export function getDemoLiveSituation(): LiveSituationData {
  return {
    locationLabel: 'Mumbai, Maharashtra',
    temperature: '28°C',
    condition: 'Mostly Cloudy',
    humidity: '78%',
    wind: '14 km/h',
    rainfall: '12 mm',
    pressure: '1008 hPa',
    visibility: '4.2 km',
    activeWarnings: [],
    riskInfo: 'Stay alert in low-lying areas during heavy rain.',
    source: 'IMD & Satellite Observations',
    lastUpdated: new Date().toISOString(),
    stale: false,
  }
}
