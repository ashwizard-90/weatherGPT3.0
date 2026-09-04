import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSession } from '../../shared/context/SessionContext'
import ThemeToggle from '../../shared/components/ThemeToggle'

export default function Login() {
  const { t } = useLanguage()
  const { profile } = useSession()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // Demo: if user has completed signup, mobile must match profile.mobileNumber
    // Otherwise allow any 10-digit number to proceed to dashboard for preview.
    if (mobile.trim().length < 10) {
      setError(t.errors.generic)
      return
    }
    if (profile.fullName && profile.mobileNumber && mobile.trim() !== profile.mobileNumber.trim()) {
      setError(t.auth.loginFailed)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--line-light)', background: 'var(--white)' }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)' }}>WeatherGPT</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ThemeToggle size={34} />
          <Link to="/signup" style={{ fontSize: 13, fontWeight: 700, color: 'var(--cyan)' }}>{t.auth.signUp}</Link>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ width: '100%', maxWidth: 420, background: 'var(--white)', border: '1px solid var(--line-light)', borderRadius: 12, padding: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>{t.auth.signIn}</h1>
          <p style={{ marginTop: 8, fontSize: 13, color: 'var(--slate)' }}>{t.signup.createAccountSubtitle}</p>
          <form onSubmit={handleLogin} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>{t.signup.mobileNumber}</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 98765 43210"
                inputMode="tel"
                style={{ border: '1px solid var(--line-light)', borderRadius: 8, padding: '12px 14px', fontSize: 14 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>{t.auth.password}</label>
              <input type="password" placeholder="••••••••" style={{ border: '1px solid var(--line-light)', borderRadius: 8, padding: '12px 14px', fontSize: 14 }} />
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>}
            <button type="submit" style={{ background: 'var(--ink)', color: 'white', padding: '13px 22px', borderRadius: 8, fontWeight: 700, border: 'none' }}>
              {t.auth.login}
            </button>
          </form>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--slate)', textAlign: 'center' }}>
            {t.signup.alreadyHaveAccount} <Link to="/signup" style={{ color: 'var(--cyan)', fontWeight: 700 }}>{t.auth.signUp}</Link>
          </p>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link to="/admin-login" style={{ fontSize: 12, color: 'var(--slate-light)', textDecoration: 'underline' }}>{t.auth.adminAccess}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
