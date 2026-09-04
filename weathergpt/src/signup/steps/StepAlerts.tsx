import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { AlertPreferences, SignupData } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepAlerts({ data, onChange, onNext, onBack }: Props) {
  const { t } = useLanguage()
  const selectAllRef = useRef<HTMLInputElement>(null)

  function setChannel(channel: AlertPreferences['channel']) {
    onChange({ alerts: { ...data.alerts, channel } })
  }

  function toggleTrigger(key: keyof AlertPreferences['triggers']) {
    onChange({
      alerts: {
        ...data.alerts,
        triggers: { ...data.alerts.triggers, [key]: !data.alerts.triggers[key] },
      },
    })
  }

  const triggers: { key: keyof AlertPreferences['triggers']; label: string }[] = [
    { key: 'heavyRain', label: t.signup.triggerHeavyRain },
    { key: 'flood', label: t.signup.triggerFlood },
    { key: 'cyclone', label: t.signup.triggerCyclone },
    { key: 'heatwave', label: t.signup.triggerHeatwave },
    { key: 'districtEmergency', label: t.signup.triggerDistrictEmergency },
  ]

  const allKeys = triggers.map((tr) => tr.key)
  const allSelected = allKeys.every((k) => data.alerts.triggers[k])
  const someSelected = allKeys.some((k) => data.alerts.triggers[k]) && !allSelected

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected
  }, [someSelected])

  function toggleSelectAll() {
    const next = !allSelected
    const nextTriggers = { ...data.alerts.triggers } as AlertPreferences['triggers']
    allKeys.forEach((k) => {
      nextTriggers[k] = next
    })
    onChange({ alerts: { ...data.alerts, triggers: nextTriggers } })
  }

  // Quick-select chips use the same toggleTrigger — they are not duplicated controls,
  // just a compact chip UI that drives the same state as the checkboxes.
  const quickChips: { key: keyof AlertPreferences['triggers']; label: string }[] = [
    { key: 'cyclone', label: t.signup.triggerCyclone },
    { key: 'heatwave', label: t.signup.triggerHeatwave },
    { key: 'flood', label: t.signup.triggerFlood },
    { key: 'heavyRain', label: t.signup.triggerHeavyRain },
    { key: 'districtEmergency', label: t.signup.triggerDistrictEmergency },
  ]

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.alertsTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.alertsSubtitle}</p>

      <div className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>{t.signup.stepAlerts}</span>
          <div className={styles.pillRow}>
            <button
              type="button"
              className={styles.pill}
              data-selected={data.alerts.channel === 'sms'}
              onClick={() => setChannel('sms')}
            >
              {t.signup.channelSms}
            </button>
            <button
              type="button"
              className={styles.pill}
              data-selected={data.alerts.channel === 'voice'}
              onClick={() => setChannel('voice')}
            >
              {t.signup.channelVoice}
            </button>
            <button
              type="button"
              className={styles.pill}
              data-selected={data.alerts.channel === 'both'}
              onClick={() => setChannel('both')}
            >
              {t.signup.channelBoth}
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>{t.pages.activeAlertsHeading}</span>

          {/* Select All */}
          <label className={styles.selectAllRow}>
            <input ref={selectAllRef} type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
            {t.signup.selectAll}
          </label>

          {/* Quick-select chips — compact, same state as checkboxes */}
          <div className={styles.chipRow} aria-label={t.signup.quickSelect}>
            {quickChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={styles.chip}
                data-active={data.alerts.triggers[chip.key]}
                onClick={() => toggleTrigger(chip.key)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className={styles.checkList}>
            {triggers.map((tr) => (
              <label className={styles.checkRow} key={tr.key}>
                <input
                  type="checkbox"
                  checked={data.alerts.triggers[tr.key]}
                  onChange={() => toggleTrigger(tr.key)}
                />
                {tr.label}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            {t.signup.back}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={onNext}>
            {t.signup.continueToReview}
          </button>
        </div>
      </div>
    </div>
  )
}
