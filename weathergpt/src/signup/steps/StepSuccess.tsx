import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from '../signup.module.css'

interface Props {
  roleName: string
}

export default function StepSuccess({ roleName }: Props) {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(63,166,106,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M4 12.5 9.5 18 20 6" stroke="#3FA66A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className={styles.stepTitle}>{t.signup.successTitle}</h1>
      <p className={styles.stepSubtitle} style={{ margin: '10px auto 0' }}>
        {t.signup.successSubtitle.replace('{role}', roleName)}
      </p>

      <div className={styles.actions} style={{ marginTop: 32 }}>
        <button type="button" className={styles.primaryBtn} onClick={() => navigate('/dashboard')}>
          {t.signup.goToDashboard} →
        </button>
      </div>
    </div>
  )
}
