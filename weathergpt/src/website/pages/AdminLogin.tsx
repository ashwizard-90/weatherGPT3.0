import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSession } from '../../shared/context/SessionContext'
import ThemeToggle from '../../shared/components/ThemeToggle'

export default function AdminLogin() {
  const { t } = useLanguage()
  const { adminLogin, isAdminAuthenticated } = useSession()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminAuthenticated) {
    navigate('/admin')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = adminLogin(username.trim(), password)
    if (ok) navigate('/admin')
    else setError(t.auth.invalidCredentials)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--line-light)', background: 'var(--white)' }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)' }}>WeatherGPT</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ThemeToggle size={34} />
          <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate)' }}>{t.auth.backToHome}</Link>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ width: '100%', maxWidth: 420, background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 12, padding: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>{t.auth.adminLoginTitle}</h1>
          <p style={{ marginTop: 8, fontSize: 12, color: 'var(--slate)', lineHeight: 1.6 }}>{t.auth.adminLoginSubtitle}</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>{t.auth.username}</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" autoComplete="username" style={{ border: '1px solid var(--line-light)', borderRadius: 8, padding: '12px 14px', fontSize: 14 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>{t.auth.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" style={{ border: '1px solid var(--line-light)', borderRadius: 8, padding: '12px 14px', fontSize: 14 }} />
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>}
            <button type="submit" style={{ background: 'var(--ink)', color: 'white', padding: '13px 22px', borderRadius: 8, fontWeight: 700, border: 'none' }}>
              {t.auth.login}
            </button>
          </form>
          <p style={{ marginTop: 12, fontSize: 11, color: 'var(--slate-light)', textAlign: 'center' }}>Demo: admin / WeatherGPT@2024 (override via VITE_ADMIN_* env)</p>
        </div>
      </div>
    </div>
  )
}
