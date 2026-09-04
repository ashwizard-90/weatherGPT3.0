import { useLanguage } from '../../i18n/LanguageContext'
import { LANGUAGES } from '../../i18n/languages'
import type { SignupData, UserRole } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onEditStep: (step: number) => void
  onBack: () => void
  onSubmit: () => void
}

export default function StepReview({ data, onChange, onEditStep, onBack, onSubmit }: Props) {
  const { t } = useLanguage()

  const roleName: Record<UserRole, string> = {
    citizen: t.roles.citizen,
    farmer: t.roles.farmer,
    marine: t.roles.marine,
    institution: t.roles.institution,
    researcher: t.roles.researcher,
    disasterManagement: t.roles.disasterManagement,
    districtAuthority: t.roles.districtAuthority,
    weatherOperations: t.roles.weatherOperations,
  }

  const languageName = LANGUAGES.find((l) => l.code === data.language)?.nativeName ?? data.language

  const triggerLabels: string[] = []
  if (data.alerts.triggers.heavyRain) triggerLabels.push(t.signup.triggerHeavyRain)
  if (data.alerts.triggers.flood) triggerLabels.push(t.signup.triggerFlood)
  if (data.alerts.triggers.cyclone) triggerLabels.push(t.signup.triggerCyclone)
  if (data.alerts.triggers.heatwave) triggerLabels.push(t.signup.triggerHeatwave)
  if (data.alerts.triggers.districtEmergency) triggerLabels.push(t.signup.triggerDistrictEmergency)

  const channelLabel =
    data.alerts.channel === 'sms' ? t.signup.channelSms : data.alerts.channel === 'voice' ? t.signup.channelVoice : t.signup.channelBoth

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.reviewTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.reviewSubtitle}</p>

      <div className={styles.form}>
        <div className={styles.reviewSection}>
          <div>
            <p className={styles.reviewLabel}>{t.signup.sectionPersonal.toUpperCase()}</p>
            <p className={styles.reviewValue}>
              {data.fullName}
              <br />
              {data.mobileNumber}
              {data.email && (
                <>
                  <br />
                  {data.email}
                </>
              )}
            </p>
          </div>
          <button type="button" className={styles.editLink} onClick={() => onEditStep(0)}>
            {t.signup.edit}
          </button>
        </div>

        <div className={styles.reviewSection}>
          <div>
            <p className={styles.reviewLabel}>{t.signup.sectionLanguage.toUpperCase()}</p>
            <p className={styles.reviewValue}>{languageName}</p>
          </div>
          <button type="button" className={styles.editLink} onClick={() => onEditStep(1)}>
            {t.signup.edit}
          </button>
        </div>

        <div className={styles.reviewSection}>
          <div>
            <p className={styles.reviewLabel}>{t.signup.sectionLocation.toUpperCase()}</p>
            <p className={styles.reviewValue}>
              {[data.location.cityTown, data.location.district, data.location.state].filter(Boolean).join(', ')}
            </p>
          </div>
          <button type="button" className={styles.editLink} onClick={() => onEditStep(2)}>
            {t.signup.edit}
          </button>
        </div>

        <div className={styles.reviewSection}>
          <div>
            <p className={styles.reviewLabel}>{t.signup.sectionRole.toUpperCase()}</p>
            <p className={styles.reviewValue}>{data.role ? roleName[data.role] : '—'}</p>
          </div>
          <button type="button" className={styles.editLink} onClick={() => onEditStep(3)}>
            {t.signup.edit}
          </button>
        </div>

        <div className={styles.reviewSection}>
          <div>
            <p className={styles.reviewLabel}>{t.signup.sectionAlerts.toUpperCase()}</p>
            <p className={styles.reviewValue}>
              {channelLabel} · {triggerLabels.join(', ') || '—'}
            </p>
          </div>
          <button type="button" className={styles.editLink} onClick={() => onEditStep(4)}>
            {t.signup.edit}
          </button>
        </div>

        <label className={styles.consentRow}>
          <input
            type="checkbox"
            checked={data.agreedToTerms}
            onChange={(e) => onChange({ agreedToTerms: e.target.checked })}
          />
          <span>{t.signup.agreeTerms}</span>
        </label>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            {t.signup.back}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={onSubmit} disabled={!data.agreedToTerms}>
            {t.signup.createAccount}
          </button>
        </div>
      </div>
    </div>
  )
}
