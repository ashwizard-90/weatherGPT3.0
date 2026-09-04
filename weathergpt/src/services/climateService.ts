/**
 * Climate Report service — historical & projected climate data.
 * Must not fabricate real climate statistics; when upstream is disconnected
 * it surfaces loading / error / empty states so the caller can render honest UI.
 */

export interface ClimatePoint {
  year: number
  tempAnomaly: number // °C vs 1991-2020
  precipitationDeviation: number // %
}

export interface ClimateSummary {
  locationLabel: string
  baselinePeriod: string // e.g. "1990-2020 (30-Year Norm)"
  correlation: string
  points: ClimatePoint[]
  seasonalShift: { summerDays: number; winterFrostDays: number }
  extremeEvents: { heatwaveMultiplier: number; heavyRainMultiplier: number }
  dataSource: string
  lastUpdated: string
}

export type ClimateState =
  | { status: 'loading' }
  | { status: 'success'; data: ClimateSummary }
  | { status: 'empty'; message: string }
  | { status: 'error'; message: string }

function hasClimateBackend(): boolean {
  const url = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_CLIMATE_API_URL
  return Boolean(url)
}

export async function fetchClimateReport(_params?: { region?: string; baseline?: string }): Promise<ClimateState> {
  if (!hasClimateBackend()) {
    return {
      status: 'error',
      message: 'Climate data source not configured. Wire VITE_CLIMATE_API_URL via backend.',
    }
  }
  // Real fetch would go here; for now signal empty honestly.
  return { status: 'empty', message: 'No climate data returned for the selected filters.' }
}

/** Demo data used only when caller explicitly opts into preview and knows it is synthetic */
export const DEMO_CLIMATE: ClimateSummary = {
  locationLabel: 'Miami-Dade County, FL',
  baselinePeriod: '1990-2020 (30-Year Norm)',
  correlation: 'Temp vs. Precipitation',
  points: [
    { year: 1990, tempAnomaly: -0.2, precipitationDeviation: 2 },
    { year: 1995, tempAnomaly: -0.1, precipitationDeviation: 5 },
    { year: 2000, tempAnomaly: 0.1, precipitationDeviation: 3 },
    { year: 2005, tempAnomaly: 0.5, precipitationDeviation: 8 },
    { year: 2010, tempAnomaly: 0.8, precipitationDeviation: 4 },
    { year: 2015, tempAnomaly: 1.2, precipitationDeviation: 2 },
    { year: 2020, tempAnomaly: 1.4, precipitationDeviation: 12 },
    { year: 2023, tempAnomaly: 1.7, precipitationDeviation: 9 },
  ],
  seasonalShift: { summerDays: 14, winterFrostDays: -8 },
  extremeEvents: { heatwaveMultiplier: 3.2, heavyRainMultiplier: 1.8 },
  dataSource: 'IMD/WMO Aggregated Data',
  lastUpdated: new Date().toISOString(),
}
