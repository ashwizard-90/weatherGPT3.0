import { Outlet } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatBot from '../dashboard/components/ChatBot'

export default function WebsiteLayout() {
  const { dir } = useLanguage()
  return (
    <div dir={dir} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
