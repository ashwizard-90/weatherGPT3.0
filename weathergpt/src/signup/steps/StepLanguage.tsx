import { useLanguage } from '../../i18n/LanguageContext'
import { LANGUAGES, type LanguageCode } from '../../i18n/languages'
import type { SignupData } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepLanguage({ data, onChange, onNext, onBack }: Props) {
  const { t, setLanguage } = useLanguage()

  function choose(code: LanguageCode) {
    onChange({ language: code })
    // Applying immediately lets the person preview the rest of the signup
    // flow, and the whole site, in their chosen language right away.
    setLanguage(code)
  }

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.chooseLanguageTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.chooseLanguageSubtitle}</p>

      <div className={styles.form}>
        <div className={styles.optionGrid}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={styles.optionCard}
              data-selected={data.language === lang.code}
              onClick={() => choose(lang.code)}
            >
              <span className={styles.optionName}>{lang.nativeName}</span>
              <span className={styles.optionNative}>{lang.englishName}</span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            {t.signup.back}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={onNext} disabled={!data.language}>
            {t.signup.continueToLocation}
          </button>
        </div>
      </div>
    </div>
  )
}
