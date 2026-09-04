import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSession } from '../shared/context/SessionContext'
import { EMPTY_SIGNUP_DATA, type SignupData } from '../shared/types/user'
import Logo from '../shared/components/Logo'
import LanguagePicker from '../shared/components/LanguagePicker'
import ThemeToggle from '../shared/components/ThemeToggle'
import StepRail from './StepRail'
import StepDetails from './steps/StepDetails'
import StepLanguage from './steps/StepLanguage'
import StepLocation from './steps/StepLocation'
import StepRole from './steps/StepRole'
import StepAlerts from './steps/StepAlerts'
import StepReview from './steps/StepReview'
import StepSuccess from './steps/StepSuccess'
import styles from './signup.module.css'

const TOTAL_STEPS = 6

export default function SignupFlow() {
  const { t } = useLanguage()
  const { setProfile, setActiveDashboard } = useSession()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [data, setData] = useState<SignupData>(EMPTY_SIGNUP_DATA)

  function patch(update: Partial<SignupData>) {
    setData((prev) => ({ ...prev, ...update }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function submit() {
    setProfile(data)
    if (data.role) setActiveDashboard(data.role)
    setComplete(true)
  }

  const roleNameMap: Record<string, string> = {
    citizen: t.roles.citizen,
    farmer: t.roles.farmer,
    marine: t.roles.marine,
    institution: t.roles.institution,
    researcher: t.roles.researcher,
    disasterManagement: t.roles.disasterManagement,
    weatherOperations: t.roles.weatherOperations,
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Link to="/">
          <Logo size={24} />
        </Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ThemeToggle size={34} />
          <LanguagePicker />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.card}>
          {!complete && (
            <StepRail
              step={step + 1}
              total={TOTAL_STEPS}
              label={t.signup.stepOf.replace('{n}', String(step + 1))}
            />
          )}

          {complete ? (
            <StepSuccess roleName={data.role ? roleNameMap[data.role] : ''} />
          ) : (
            <>
              {step === 0 && <StepDetails data={data} onChange={patch} onNext={next} />}
              {step === 1 && <StepLanguage data={data} onChange={patch} onNext={next} onBack={back} />}
              {step === 2 && <StepLocation data={data} onChange={patch} onNext={next} onBack={back} />}
              {step === 3 && <StepRole data={data} onChange={patch} onNext={next} onBack={back} />}
              {step === 4 && <StepAlerts data={data} onChange={patch} onNext={next} onBack={back} />}
              {step === 5 && (
                <StepReview
                  data={data}
                  onChange={patch}
                  onEditStep={setStep}
                  onBack={back}
                  onSubmit={submit}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
