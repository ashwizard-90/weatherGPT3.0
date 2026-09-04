/**
 * Roles a person can select for themselves during signup.
 * Deliberately excludes 'administrator' — system administrator accounts are
 * provisioned by WeatherGPT staff, never self-selected at signup.
 */
export type UserRole =
  | 'citizen'
  | 'farmer'
  | 'marine'
  | 'institution'
  | 'researcher'
  | 'disasterManagement'
  | 'districtAuthority'
  | 'weatherOperations'

/** Every dashboard the product renders, including the staff-only admin view. */
export type DashboardRole = UserRole | 'administrator'

export const SELECTABLE_ROLES: UserRole[] = [
  'citizen',
  'farmer',
  'marine',
  'institution',
  'researcher',
  'disasterManagement',
  'districtAuthority',
  'weatherOperations',
]

export interface AlertPreferences {
  channel: 'sms' | 'voice' | 'both'
  triggers: {
    heavyRain: boolean
    flood: boolean
    cyclone: boolean
    heatwave: boolean
    districtEmergency: boolean
  }
}

export interface LocationInfo {
  state: string
  district: string
  cityTown: string
}

export interface SignupData {
  fullName: string
  mobileNumber: string
  email: string
  language: string
  location: LocationInfo
  role: UserRole | null
  alerts: AlertPreferences
  agreedToTerms: boolean
  avatarUrl?: string
}

export const EMPTY_SIGNUP_DATA: SignupData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  language: 'en',
  location: { state: '', district: '', cityTown: '' },
  role: null,
  alerts: {
    channel: 'both',
    triggers: {
      heavyRain: true,
      flood: true,
      cyclone: true,
      heatwave: false,
      districtEmergency: true,
    },
  },
  agreedToTerms: false,
}
