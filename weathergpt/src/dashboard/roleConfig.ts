import type { DashboardRole } from '../shared/types/user'

export interface MetricPanel {
  label: string
  value: string
  hint: string
  tone: 'cyan' | 'amber' | 'red' | 'green' | 'slate'
}

export interface TableRow {
  primary: string
  secondary: string
  meta: string
}

export interface RoleDashboardConfig {
  displayName: string
  panels: MetricPanel[]
  tableTitle: string
  tableRows: TableRow[]
}

export const ROLE_DASHBOARD_CONFIG: Record<DashboardRole, RoleDashboardConfig> = {
  citizen: {
    displayName: 'Everyday Weather',
    panels: [
      { label: 'Current temperature', value: '31°C', hint: 'Feels like 35°C · Humidity 78%', tone: 'cyan' },
      { label: "Today's rain chance", value: '62%', hint: 'Peak likelihood 4–7 PM', tone: 'amber' },
      { label: 'Air quality index', value: '96', hint: 'Moderate · PM2.5 dominant', tone: 'slate' },
      { label: 'UV index', value: '9', hint: 'Very high · limit midday exposure', tone: 'red' },
    ],
    tableTitle: '7-day outlook',
    tableRows: [
      { primary: 'Today', secondary: 'Thunderstorms, humid', meta: '31° / 26°C' },
      { primary: 'Tomorrow', secondary: 'Partly cloudy', meta: '30° / 25°C' },
      { primary: 'Wed', secondary: 'Light rain, evening', meta: '29° / 24°C' },
      { primary: 'Thu', secondary: 'Clear skies', meta: '32° / 25°C' },
    ],
  },
  farmer: {
    displayName: 'Farming',
    panels: [
      { label: 'Soil moisture (0–10cm)', value: '38%', hint: 'Adequate for sowing window', tone: 'green' },
      { label: 'Days to next rain', value: '2', hint: 'Moderate rainfall expected, 18mm', tone: 'cyan' },
      { label: 'Pest risk index', value: 'Medium', hint: 'Brown planthopper watch, paddy belt', tone: 'amber' },
      { label: 'Growing degree days', value: '1,240', hint: 'On track for harvest window', tone: 'slate' },
    ],
    tableTitle: 'Crop advisories',
    tableRows: [
      { primary: 'Paddy — Kharif', secondary: 'Delay top-dressing urea until after rain', meta: 'High priority' },
      { primary: 'Groundnut', secondary: 'Monitor for leaf spot in high humidity', meta: 'Watch' },
      { primary: 'Cotton', secondary: 'Irrigation window: next 48 hours', meta: 'Scheduled' },
    ],
  },
  marine: {
    displayName: 'Fishing & Marine',
    panels: [
      { label: 'Wave height', value: '2.4 m', hint: 'Swell period 8s · SW direction', tone: 'amber' },
      { label: 'Wind speed (offshore)', value: '28 km/h', hint: 'Gusting to 40 km/h after 3 PM', tone: 'red' },
      { label: 'Sea surface temp', value: '29.1°C', hint: 'Favourable for pelagic species', tone: 'cyan' },
      { label: 'Potential fishing zone', value: '12 nm SE', hint: 'Chlorophyll front detected', tone: 'green' },
    ],
    tableTitle: 'Coastal advisories',
    tableRows: [
      { primary: 'Small craft advisory', secondary: 'Winds exceeding 25 km/h expected', meta: 'Active' },
      { primary: 'Squall watch', secondary: 'Offshore Kochi, next 6 hours', meta: 'Watch' },
    ],
  },
  institution: {
    displayName: 'School / College',
    panels: [
      { label: 'Heat index today', value: '41°C', hint: 'Exceeds outdoor-activity threshold', tone: 'red' },
      { label: 'Campus rainfall (24h)', value: '12 mm', hint: 'Grounds may be waterlogged', tone: 'cyan' },
      { label: 'Attendance-risk flag', value: 'Elevated', hint: 'Heatwave advisory in effect', tone: 'amber' },
    ],
    tableTitle: 'Institutional notices',
    tableRows: [
      { primary: 'Outdoor sports suspended', secondary: 'Until heat index drops below 38°C', meta: 'Active' },
      { primary: 'Early dismissal review', secondary: 'District circular pending', meta: 'Pending' },
    ],
  },
  researcher: {
    displayName: 'Research & Academia',
    panels: [
      { label: 'Active datasets', value: '46', hint: 'Gridded rainfall, temperature anomaly, SST', tone: 'cyan' },
      { label: 'Anomaly (regional mean)', value: '+0.8°C', hint: 'Vs. 1991–2020 baseline', tone: 'amber' },
      { label: 'Model runs this week', value: '112', hint: 'WRF regional downscaling', tone: 'slate' },
    ],
    tableTitle: 'Recent exports',
    tableRows: [
      { primary: 'Gridded rainfall archive', secondary: 'NetCDF · 0.25° · 1901–2024', meta: '4.2 GB' },
      { primary: 'Temperature anomaly index', secondary: 'CSV · district-level, monthly', meta: '180 MB' },
    ],
  },
  districtAuthority: {
    displayName: 'District Authority',
    panels: [
      { label: 'Active district warnings', value: '2', hint: 'Flash flood · Wind damage', tone: 'red' },
      { label: 'Affected population', value: '12.4k', hint: 'Across 3 sub-districts', tone: 'amber' },
      { label: 'Evacuation centres', value: '18 / 24', hint: '75% capacity', tone: 'cyan' },
      { label: 'Official orders issued', value: '3', hint: 'Last: Evacuation advisory, 10m ago', tone: 'green' },
    ],
    tableTitle: 'Administrative log',
    tableRows: [
      { primary: 'North River Basin', secondary: 'Evacuation Standby · Embankment stress', meta: 'Severe' },
      { primary: 'Official order #DM/2024/89', secondary: 'District closure, Coastal Sector 4', meta: 'Verified 10m ago' },
    ],
  },
  disasterManagement: {
    displayName: 'Disaster Management',
    panels: [
      { label: 'Active cyclone tracks', value: '1', hint: "Severe Cyclonic Storm 'Mocha'", tone: 'red' },
      { label: 'Flood risk districts', value: '6', hint: 'Odisha, West Bengal coastal belt', tone: 'amber' },
      { label: 'Evacuation centres ready', value: '212 / 240', hint: '88% operational capacity', tone: 'cyan' },
      { label: 'Field teams deployed', value: '34', hint: 'Across 9 coastal districts', tone: 'green' },
    ],
    tableTitle: 'District coordination log',
    tableRows: [
      { primary: 'Puri district control room', secondary: 'Evacuation order issued, coastal wards', meta: '12m ago' },
      { primary: 'Balasore district', secondary: 'Shelter capacity confirmed', meta: '40m ago' },
    ],
  },
  weatherOperations: {
    displayName: 'Weather Operations',
    panels: [
      { label: 'AWS nodes online', value: '738 / 742', hint: '4 nodes offline, Andaman cluster', tone: 'amber' },
      { label: 'Doppler radar uptime', value: '99.4%', hint: 'S-band network, 24h rolling', tone: 'green' },
      { label: 'Data ingest latency', value: '38 ms', hint: 'p95, satellite downlink', tone: 'cyan' },
      { label: 'Nowcast model version', value: 'v4.2.1', hint: 'Last retrained 6 days ago', tone: 'slate' },
    ],
    tableTitle: 'Node diagnostics',
    tableRows: [
      { primary: 'AWS-INA-0417 (Port Blair)', secondary: 'Signal loss, sensor fault suspected', meta: 'Offline' },
      { primary: 'Doppler-S · Chennai', secondary: 'Nominal sweep, 10-min cycle', meta: 'Nominal' },
    ],
  },
  administrator: {
    displayName: 'System Administrator',
    panels: [
      { label: 'Total registered users', value: '2,148,302', hint: '+12,406 in the last 24 hours', tone: 'cyan' },
      { label: 'API uptime (30d)', value: '99.98%', hint: 'SLA target: 99.9%', tone: 'green' },
      { label: 'Open support tickets', value: '17', hint: '3 flagged high priority', tone: 'amber' },
      { label: 'Failed auth attempts (24h)', value: '212', hint: 'Auto-blocked, no action needed', tone: 'red' },
    ],
    tableTitle: 'Audit log',
    tableRows: [
      { primary: 'API key rotated', secondary: 'weather-operations-prod', meta: '2m ago' },
      { primary: 'Role permissions updated', secondary: 'disasterManagement → +export_access', meta: '1h ago' },
      { primary: 'New admin session', secondary: 'ops-console-04, Chennai DC', meta: '3h ago' },
    ],
  },
}
