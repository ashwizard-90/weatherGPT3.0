export interface EmergencyContact {
  id: string
  service: string
  phone: string
  authority: string
  verified: boolean
  available: boolean
}

// Verified official Indian emergency numbers — configurable via backend/admin.
// Frontend never invents local numbers; this list is the fallback verified set.
// In production, fetch from VITE_EMERGENCY_API_URL or admin config.
export const VERIFIED_CONTACTS: EmergencyContact[] = [
  { id: '112', service: 'Emergency', phone: '112', authority: 'National Emergency Response System (NERS)', verified: true, available: true },
  { id: 'police', service: 'Police', phone: '100', authority: 'State Police', verified: true, available: true },
  { id: 'fire', service: 'Fire & Rescue', phone: '101', authority: 'Fire Services', verified: true, available: true },
  { id: 'ambulance', service: 'Ambulance', phone: '108', authority: 'National Health Mission', verified: true, available: true },
  { id: 'disaster', service: 'Disaster Management', phone: '1078', authority: 'NDMA / SDMA', verified: true, available: true },
  { id: 'women', service: 'Women Helpline', phone: '181', authority: 'Ministry of WCD', verified: true, available: true },
  { id: 'child', service: 'Child Helpline', phone: '1098', authority: 'Childline India', verified: true, available: true },
]

export type EmergencyState =
  | { status: 'loading' }
  | { status: 'success'; contacts: EmergencyContact[]; source: string; lastUpdated: string }
  | { status: 'error'; message: string }
  | { status: 'empty' }

export async function fetchEmergencyContacts(): Promise<EmergencyState> {
  const url = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_EMERGENCY_API_URL
  if (!url) {
    // No backend configured — return the verified static fallback as success,
    // but clearly marked as configurable. Never invent unverified numbers.
    return {
      status: 'success',
      contacts: VERIFIED_CONTACTS,
      source: 'NDMA / MHA Verified Contacts (static fallback — configure via admin)',
      lastUpdated: new Date().toISOString(),
    }
  }
  try {
    const res = await fetch(url)
    if (!res.ok) return { status: 'error', message: `Emergency contacts unavailable (${res.status})` }
    const data = (await res.json()) as EmergencyContact[]
    if (!data.length) return { status: 'empty' }
    return { status: 'success', contacts: data, source: 'Admin Configured', lastUpdated: new Date().toISOString() }
  } catch (e) {
    return { status: 'error', message: e instanceof Error ? e.message : 'Network error' }
  }
}
