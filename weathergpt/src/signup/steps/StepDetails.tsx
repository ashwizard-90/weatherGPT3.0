import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { SignupData } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onNext: () => void
}

export default function StepDetails({ data, onChange, onNext }: Props) {
  const { t } = useLanguage()
  const [touched, setTouched] = useState(false)

  const valid = data.fullName.trim().length > 1 && data.mobileNumber.trim().length >= 10 && data.agreedToTerms

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange({ avatarUrl: reader.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.createAccountTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.createAccountSubtitle}</p>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          setTouched(true)
          if (valid) onNext()
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--paper-2)', border: '1px solid var(--line-light)', borderRadius: 12, padding: 14 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', background: 'var(--white)', border: '2px solid var(--line-light)', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
            {data.avatarUrl ? (
              <img src={data.avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 28 }}>👤</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Profile photo</div>
            <div style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 2 }}>Shown in Settings and on your dashboard. Stored locally for demo.</div>
            <label style={{ display: 'inline-block', marginTop: 8, fontSize: 12, fontWeight: 700, color: '#0052cc', border: '1px solid #bfdbfe', background: 'var(--white)', padding: '6px 12px', borderRadius: 999, cursor: 'pointer' }}>
              {data.avatarUrl ? 'Change photo' : 'Upload photo'}
              <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
            </label>
            {data.avatarUrl && (
              <button type="button" onClick={() => onChange({ avatarUrl: undefined })} style={{ marginLeft: 8, fontSize: 11, color: 'var(--slate)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                Remove
              </button>
            )}
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="fullName">
            {t.signup.fullName}
          </label>
          <input
            id="fullName"
            className={styles.input}
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Ananya Krishnan"
            autoComplete="name"
          />
          <span className={styles.helpText}>{t.signup.fullNameHelp}</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mobile">
            {t.signup.mobileNumber}
          </label>
          <input
            id="mobile"
            className={styles.input}
            value={data.mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value.replace(/[^\d+ ]/g, '') })}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
          />
          <span className={styles.helpText}>{t.signup.mobileHelp}</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            {t.signup.emailOptional}
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <label className={styles.consentRow}>
          <input
            type="checkbox"
            checked={data.agreedToTerms}
            onChange={(e) => onChange({ agreedToTerms: e.target.checked })}
          />
          <span>{t.signup.consentText}</span>
        </label>
        {touched && !valid && (
          <span style={{ color: 'var(--red)', fontSize: 13 }}>{t.errors.generic}</span>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primaryBtn}>
            {t.signup.continueToVerification}
          </button>
        </div>
      </form>

      <p className={styles.footNote}>
        {t.signup.alreadyHaveAccount} <a href="#">{t.signup.signIn}</a>
      </p>
    </div>
  )
}
