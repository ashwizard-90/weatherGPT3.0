import { useState } from 'react'
import { useSession } from '../shared/context/SessionContext'
import Sidebar, { type DashboardSection } from './Sidebar'
import Topbar from './Topbar'
import RoleOverview from './pages/RoleOverview'
import LiveSituation from './components/LiveSituation'
import LiveMap from './components/LiveMap'
import ClimateReport from './components/ClimateReport'
import AlertsPanel from './components/AlertsPanel'
import SettingsPanel from './components/SettingsPanel'
import ChatBot from './components/ChatBot'
import styles from './dashboard.module.css'

function DashboardContent() {
  const [section, setSection] = useState<DashboardSection>('overview')

  let content: React.ReactNode
  switch (section) {
    case 'live':
      content = <LiveSituation />
      break
    case 'map':
      content = <LiveMap />
      break
    case 'climate':
      content = <ClimateReport />
      break
    case 'alerts':
      content = <AlertsPanel />
      break
    case 'settings':
      content = <SettingsPanel />
      break
    case 'overview':
    default:
      content = <RoleOverview />
      break
  }

  return (
    <div className={styles.shell}>
      <Sidebar activeSection={section} onSectionChange={setSection} />
      <div className={styles.content}>
        <Topbar />
        <div className={styles.body}>{content}</div>
      </div>
      <ChatBot />
    </div>
  )
}

export default function DashboardShell() {
  const { activeDashboard } = useSession()
  // Administrator is no longer reachable via the role switch — it lives at /admin behind password.
  // If a stale session still has administrator, fall back to citizen.
  if (activeDashboard === 'administrator') {
    return <DashboardContent />
  }
  return <DashboardContent />
}
