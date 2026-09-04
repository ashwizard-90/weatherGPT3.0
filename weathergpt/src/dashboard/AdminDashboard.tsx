import { Navigate } from 'react-router-dom'
import { AdminEnglishLock } from '../i18n/LanguageContext'
import { useSession } from '../shared/context/SessionContext'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import AdminWidgets from './widgets/AdminWidgets'
import ChatBot from './components/ChatBot'
import styles from './dashboard.module.css'
import { useState } from 'react'
import type { DashboardSection } from './Sidebar'

export default function AdminDashboard() {
  const { isAdminAuthenticated } = useSession()
  const [section, setSection] = useState<DashboardSection>('overview')

  if (!isAdminAuthenticated) return <Navigate to="/admin-login" replace />

  // Admin is always English locked, per design notes
  return (
    <AdminEnglishLock>
      <div className={styles.shell}>
        <Sidebar activeSection={section} onSectionChange={setSection} showRoleSwitch={false} />
        <div className={styles.content}>
          <Topbar />
          <div className={styles.body}>
            <div className={styles.adminNotice}>Administrator dashboards are always shown in English.</div>
            <AdminWidgets />
          </div>
        </div>
        <ChatBot />
      </div>
    </AdminEnglishLock>
  )
}
