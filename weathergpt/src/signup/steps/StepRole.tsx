import { useLanguage } from '../../i18n/LanguageContext'
import { SELECTABLE_ROLES, type SignupData, type UserRole } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepRole({ data, onChange, onNext, onBack }: Props) {
  const { t } = useLanguage()

  const roleCopy: Record<UserRole, { name: string; desc: string }> = {
    citizen: { name: t.roles.citizen, desc: t.roles.citizenDesc },
    farmer: { name: t.roles.farmer, desc: t.roles.farmerDesc },
    marine: { name: t.roles.marine, desc: t.roles.marineDesc },
    institution: { name: t.roles.institution, desc: t.roles.institutionDesc },
    researcher: { name: t.roles.researcher, desc: t.roles.researcherDesc },
    disasterManagement: { name: t.roles.disasterManagement, desc: t.roles.disasterManagementDesc },
    districtAuthority: { name: t.roles.districtAuthority, desc: t.roles.districtAuthorityDesc },
    weatherOperations: { name: t.roles.weatherOperations, desc: t.roles.weatherOperationsDesc },
  }

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.roleTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.roleSubtitle}</p>

      <div className={styles.form}>
        <div className={styles.optionGrid}>
          {SELECTABLE_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              className={styles.optionCard}
              data-selected={data.role === role}
              onClick={() => onChange({ role })}
            >
              <span className={styles.optionName}>{roleCopy[role].name}</span>
              <span className={styles.optionDesc}>{roleCopy[role].desc}</span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            {t.signup.back}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={onNext} disabled={!data.role}>
            {t.signup.continueToAlerts}
          </button>
        </div>
      </div>
    </div>
  )
}
