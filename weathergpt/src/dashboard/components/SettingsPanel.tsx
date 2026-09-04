import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSession } from '../../shared/context/SessionContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { SELECTABLE_ROLES } from '../../shared/types/user'
import LanguagePicker from '../../shared/components/LanguagePicker'

type Tab = 'profile' | 'persona' | 'alerts'

export default function SettingsPanel() {
  const { t, language } = useLanguage()
  const { profile, setProfile, activeDashboard, setActiveDashboard, clearProfile } = useSession()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const dark = theme === 'dark'
  const [tab, setTab] = useState<Tab>('profile')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const fileRef = useRef<HTMLInputElement>(null)
  const [done, setDone] = useState(false)

  const roleNameMap: Record<string, string> = {
    citizen: t.roles.citizen,
    farmer: t.roles.farmer,
    marine: t.roles.marine,
    institution: t.roles.institution,
    researcher: t.roles.researcher,
    disasterManagement: t.roles.disasterManagement,
    districtAuthority: t.roles.districtAuthority,
    weatherOperations: t.roles.weatherOperations,
  }

  const activeRoleLabel = roleNameMap[activeDashboard] ?? activeDashboard

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const url = reader.result as string
      setDraft((d) => ({ ...d, avatarUrl: url }))
      setProfile({ ...profile, avatarUrl: url })
    }
    reader.readAsDataURL(file)
  }

  function saveProfile() {
    setProfile(draft)
    setEditing(false)
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  function handleSignOut() {
    clearProfile()
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 40px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: 860,
          background: dark ? '#0b1220' : 'var(--white)',
          color: dark ? '#f5f7fa' : 'var(--ink)',
          border: '1px solid var(--line-light)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(11,18,32,0.12)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line-light)'}`, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#0052cc', display: 'grid', placeItems: 'center', color: 'white', fontSize: 16 }}>👤</div>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 16 }}>Account Details</strong>
                <span style={{ fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: 999, border: '1px solid #bbf7d0' }}>✓ Gov-AI Verified</span>
              </div>
              <div style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate-light)', marginTop: 2 }}>User Identity, Jurisdiction Grid, and Active Dashboard Persona</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700,
                padding: '6px 12px', borderRadius: 999, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--line-light)'}`,
                background: dark ? 'rgba(255,255,255,0.08)' : 'var(--white)', color: dark ? 'white' : 'var(--ink)',
              }}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span> {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button type="button" onClick={() => navigate(-1)} aria-label={t.chat.close} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--line-light)'}`, background: 'transparent', color: dark ? 'white' : 'var(--slate)', fontSize: 14 }}>✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 18, padding: '0 20px', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line-light)'}`, overflowX: 'auto' }}>
          {[
            { key: 'profile' as Tab, label: 'User Profile' },
            { key: 'persona' as Tab, label: `Switch Dashboard Persona`, badge: '8 Roles' },
            { key: 'alerts' as Tab, label: 'Alert Preferences' },
          ].map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              style={{
                padding: '14px 2px',
                fontSize: 13, fontWeight: 700,
                border: 'none', background: 'transparent',
                borderBottom: tb.key === tab ? '2px solid #0052cc' : '2px solid transparent',
                color: tb.key === tab ? '#0052cc' : dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)',
                whiteSpace: 'nowrap', display: 'flex', gap: 6, alignItems: 'center',
              }}
            >
              {tb.label} {tb.badge && <span style={{ fontSize: 10, background: tb.key === tab ? '#e0e7ff' : 'var(--paper-2)', color: '#0052cc', padding: '2px 6px', borderRadius: 999 }}>{tb.badge}</span>}
            </button>
          ))}
        </div>

        <div style={{ padding: 20 }}>
          {tab === 'profile' && (
            <>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line-light)'}`, borderRadius: 12, padding: 16, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: 'var(--white)', border: '2px solid white', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                    {(editing ? draft.avatarUrl : profile.avatarUrl) ? (
                      <img src={editing ? draft.avatarUrl : profile.avatarUrl} alt={profile.fullName || 'User'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={`https://i.pravatar.cc/150?u=${profile.email || 'user'}`} alt={profile.fullName || 'User'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  {editing && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: '#0052cc', color: 'white', border: '2px solid white', display: 'grid', placeItems: 'center', fontSize: 10 }}
                      aria-label="Change profile picture"
                    >
                      📷
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: 15 }}>{profile.fullName || 'Ramesh Kumar'}</strong>
                    <span style={{ fontSize: 10, fontWeight: 700, background: dark ? 'rgba(255,255,255,0.1)' : '#e0f2fe', color: '#0052cc', padding: '3px 8px', borderRadius: 999 }}>{activeRoleLabel}</span>
                  </div>
                  <div style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)', marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span aria-hidden="true">✉️</span> {profile.email || 'ashwin10012008ashwin@gmail.com'}
                  </div>
                  <div style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', marginTop: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span aria-hidden="true">🏢</span> National Agromet & Disaster Response Network
                  </div>
                </div>
                {!editing ? (
                  <button type="button" onClick={() => { setDraft(profile); setEditing(true) }} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, fontWeight: 700, color: '#0052cc', background: dark ? 'rgba(255,255,255,0.06)' : 'var(--white)', border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : '#bfdbfe'}`, padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    <span aria-hidden="true">✎</span> Edit Details
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => { setEditing(false); setDraft(profile) }} style={{ fontSize: 12, padding: '8px 14px', borderRadius: 999, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--line-light)'}`, background: 'transparent', color: dark ? 'white' : 'var(--slate)' }}>Cancel</button>
                    <button type="button" onClick={saveProfile} style={{ fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 999, border: 'none', background: '#0052cc', color: 'white' }}>Save</button>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>FULL NAME</label>
                  {editing ? (
                    <input value={draft.fullName} onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))} style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', color: dark ? 'white' : 'var(--ink)' }} />
                  ) : (
                    <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc' }}>{profile.fullName || 'Ramesh Kumar'}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>EMAIL ADDRESS</label>
                  {editing ? (
                    <input value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', color: dark ? 'white' : 'var(--ink)' }} />
                  ) : (
                    <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email || 'ashwin10012008ashwin@gmail.com'}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>MOBILE NUMBER (ALERT SMS)</label>
                  {editing ? (
                    <input value={draft.mobileNumber} onChange={(e) => setDraft((d) => ({ ...d, mobileNumber: e.target.value }))} style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', color: dark ? 'white' : 'var(--ink)' }} />
                  ) : (
                    <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc' }}>{profile.mobileNumber || '+91 98765 43210'}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>ASSIGNED TELEMETRY GRID</label>
                  <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc' }}>Node #42-S (Chennai Metro)</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>STATE / PROVINCE</label>
                  {editing ? (
                    <input value={draft.location.state} onChange={(e) => setDraft((d) => ({ ...d, location: { ...d.location, state: e.target.value } }))} style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', color: dark ? 'white' : 'var(--ink)' }} />
                  ) : (
                    <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc' }}>{profile.location.state || 'Tamil Nadu'}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>DISTRICT / CITY ZONE</label>
                  {editing ? (
                    <input value={draft.location.district} onChange={(e) => setDraft((d) => ({ ...d, location: { ...d.location, district: e.target.value } }))} placeholder="District" style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', color: dark ? 'white' : 'var(--ink)' }} />
                  ) : (
                    <div style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc' }}>
                      {profile.location.district ? `${profile.location.district} — ${profile.location.cityTown || 'Chennai Urban (Mylapore / T. Nagar Zone)'}` : 'Chennai Urban (Mylapore / T. Nagar Zone)'}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 16, background: dark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'var(--line-light)'}`, borderRadius: 12, padding: '14px 12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>MEMBER SINCE</div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>January 2024</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>ACTIVE PERSONA</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#0052cc', marginTop: 4, textTransform: 'uppercase' }}>{activeDashboard}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>SYSTEM LANGUAGE</div>
                  <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4, textTransform: 'uppercase' }}>{language}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)', letterSpacing: '0.04em' }}>NODE HEALTH</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#16a34a', marginTop: 4 }}>100% OPERATIONAL</div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)' }}>{t.common.language}:</span>
                <LanguagePicker />
                <span style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)' }}>{t.signup.chooseLanguageSubtitle}</span>
              </div>
            </>
          )}

          {tab === 'persona' && (
            <div>
              <p style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)', marginBottom: 12 }}>Choose the persona that matches how you use WeatherGPT. Your dashboard, map layers and alerts will adapt.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {SELECTABLE_ROLES.map((role) => {
                  const active = role === activeDashboard
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setActiveDashboard(role)}
                      style={{
                        textAlign: 'left', padding: 14, borderRadius: 10,
                        border: `1.5px solid ${active ? '#0052cc' : dark ? 'rgba(255,255,255,0.1)' : 'var(--line-light)'}`,
                        background: active ? (dark ? 'rgba(0,82,204,0.2)' : '#eff6ff') : dark ? 'rgba(255,255,255,0.03)' : 'var(--white)',
                        display: 'flex', flexDirection: 'column', gap: 4,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 13, color: dark ? 'white' : 'var(--ink)' }}>{roleNameMap[role]}</span>
                      <span style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)' }}>{role}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'alerts' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{t.signup.alertsTitle}</div>
                  <div style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--slate)' }}>{t.signup.alertsSubtitle}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { k: 'sms', l: t.signup.channelSms },
                    { k: 'voice', l: t.signup.channelVoice },
                    { k: 'both', l: t.signup.channelBoth },
                  ].map((ch) => (
                    <button
                      key={ch.k}
                      type="button"
                      onClick={() => setProfile({ ...profile, alerts: { ...profile.alerts, channel: ch.k as never } })}
                      style={{
                        padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                        border: `1px solid ${profile.alerts.channel === ch.k ? '#0052cc' : 'var(--line-light)'}`,
                        background: profile.alerts.channel === ch.k ? '#eff6ff' : 'var(--white)', color: profile.alerts.channel === ch.k ? '#0052cc' : 'var(--ink)',
                      }}
                    >
                      {ch.l}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { k: 'heavyRain', l: t.signup.triggerHeavyRain },
                    { k: 'flood', l: t.signup.triggerFlood },
                    { k: 'cyclone', l: t.signup.triggerCyclone },
                    { k: 'heatwave', l: t.signup.triggerHeatwave },
                    { k: 'districtEmergency', l: t.signup.triggerDistrictEmergency },
                  ].map((tr) => (
                    <label key={tr.k} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, background: dark ? 'rgba(255,255,255,0.04)' : 'var(--white)', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line-light)'}`, borderRadius: 8, padding: '10px 12px' }}>
                      <input
                        type="checkbox"
                        checked={(profile.alerts.triggers as Record<string, boolean>)[tr.k]}
                        onChange={(e) => setProfile({ ...profile, alerts: { ...profile.alerts, triggers: { ...profile.alerts.triggers, [tr.k]: e.target.checked } } })}
                      />
                      {tr.l}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line-light)'}`, background: dark ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}>
          <button type="button" onClick={handleSignOut} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.7)' : 'var(--slate)', background: 'transparent', border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--line-light)'}`, padding: '8px 14px', borderRadius: 999 }}>
            <span aria-hidden="true">↩</span> Sign Out / Switch User
          </button>
          <button type="button" onClick={() => setDone(true)} style={{ fontSize: 13, fontWeight: 800, color: 'white', background: '#0052cc', border: 'none', padding: '10px 20px', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,82,204,0.3)' }}>
            {done ? '✓ Saved' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  )
}
