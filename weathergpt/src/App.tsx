import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { SessionProvider } from './shared/context/SessionContext'
import { ThemeProvider } from './shared/context/ThemeContext'
import WebsiteLayout from './website/WebsiteLayout'
import Home from './website/pages/Home'
import LiveWeather from './website/pages/LiveWeather'
import Alerts from './website/pages/Alerts'
import Maps from './website/pages/Maps'
import Climate from './website/pages/Climate'
import About from './website/pages/About'
import Login from './website/pages/Login'
import AdminLogin from './website/pages/AdminLogin'
import SignupFlow from './signup/SignupFlow'
import DashboardShell from './dashboard/DashboardShell'
import AdminDashboard from './dashboard/AdminDashboard'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SessionProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<WebsiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/live-weather" element={<LiveWeather />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/climate" element={<Climate />} />
                <Route path="/about" element={<About />} />
              </Route>

              <Route path="/signup" element={<SignupFlow />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/dashboard" element={<DashboardShell />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
