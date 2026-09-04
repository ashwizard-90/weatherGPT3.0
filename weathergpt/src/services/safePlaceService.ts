export interface SafePlace {
  id: string
  name: string
  type: 'shelter' | 'reliefCenter' | 'evacuationCenter' | 'hospital' | 'fireStation' | 'policeStation'
  address: string
  distanceKm: number
  travelTimeMin?: number
  lat: number
  lng: number
  open: boolean
  verified: boolean
  source: string
}

export type SafePlaceState =
  | { status: 'loading' }
  | { status: 'success'; places: SafePlace[]; lastUpdated: string }
  | { status: 'error'; message: string }
  | { status: 'empty' }

// In production, safe places must come from official sources via backend.
// For demo, we provide an EMPTY verified set — the UI will show "unavailable" until admin configures.
// To preview, set VITE_SAFE_PLACES_DEMO=true to show demo verified places.
const DEMO_PLACES: SafePlace[] = [
  { id: 's1', name: 'Chennai Corporation Shelter — Mylapore', type: 'shelter', address: 'Mylapore, Chennai, Tamil Nadu', distanceKm: 1.2, travelTimeMin: 8, lat: 13.033, lng: 80.27, open: true, verified: true, source: 'Chennai District Administration' },
  { id: 's2', name: 'Relief Center — Marina', type: 'reliefCenter', address: 'Marina Beach Road, Chennai', distanceKm: 2.4, travelTimeMin: 15, lat: 13.05, lng: 80.280, open: true, verified: true, source: 'SDMA Tamil Nadu' },
  { id: 's3', name: 'Government Hospital — Royapettah', type: 'hospital', address: 'Royapettah, Chennai', distanceKm: 3.1, travelTimeMin: 18, lat: 13.05, lng: 80.26, open: true, verified: true, source: 'Health Dept.' },
]

export async function fetchNearestSafePlaces(_userLocation?: { lat: number; lng: number }): Promise<SafePlaceState> {
  const demo = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_SAFE_PLACES_DEMO
  const url = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_SAFE_PLACES_API_URL

  if (url) {
    try {
      const res = await fetch(url)
      if (!res.ok) return { status: 'error', message: `Safe places unavailable (${res.status})` }
      const data = (await res.json()) as SafePlace[]
      if (!data.length) return { status: 'empty' }
      // Only return verified places
      const verified = data.filter((p) => p.verified)
      if (!verified.length) return { status: 'empty' }
      return { status: 'success', places: verified, lastUpdated: new Date().toISOString() }
    } catch (e) {
      return { status: 'error', message: e instanceof Error ? e.message : 'Network error' }
    }
  }

  if (demo === 'true') {
    return { status: 'success', places: DEMO_PLACES, lastUpdated: new Date().toISOString() }
  }

  // No verified data configured — honest empty state, do NOT invent shelters.
  return { status: 'empty' }
}
