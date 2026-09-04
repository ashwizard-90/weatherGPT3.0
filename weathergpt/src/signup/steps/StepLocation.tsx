import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { SignupData } from '../../shared/types/user'
import styles from '../signup.module.css'

interface Props {
  data: SignupData
  onChange: (patch: Partial<SignupData>) => void
  onNext: () => void
  onBack: () => void
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
]

// Suggested locations — 5 different states & their capitals (easily extended via backend config)
// Previously only Tamil Nadu was shown; now covers pan-India for better coverage.
const SUGGESTED_LOCATIONS = [
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu' }, // TN capital
  { city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka' }, // KA capital
  { city: 'Mumbai', district: 'Mumbai', state: 'Maharashtra' }, // MH capital
  { city: 'Kolkata', district: 'Kolkata', state: 'West Bengal' }, // WB capital
  { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana' }, // TG capital
]

export default function StepLocation({ data, onChange, onNext, onBack }: Props) {
  const { t } = useLanguage()
  const [detected, setDetected] = useState(false)

  const valid = data.location.state.trim().length > 0 && data.location.district.trim().length > 0

  function useCurrentLocation() {
    onChange({
      location: { state: 'Tamil Nadu', district: 'Chennai', cityTown: 'Mylapore' },
    })
    setDetected(true)
  }

  function selectSuggested(city: string, district: string, state: string) {
    onChange({ location: { state, district, cityTown: city } })
    setDetected(false)
  }

  const selectedKey = `${data.location.cityTown}__${data.location.district}__${data.location.state}`

  return (
    <div>
      <h1 className={styles.stepTitle}>{t.signup.whereLocatedTitle}</h1>
      <p className={styles.stepSubtitle}>{t.signup.whereLocatedSubtitle}</p>

      <div className={styles.form}>
        {/* 1. Use Current Location */}
        <div className={styles.locationBox}>
          <span style={{ fontSize: 13.5, color: 'var(--slate)' }}>
            {detected ? `${data.location.cityTown}, ${data.location.district}` : 'Location not set'}
          </span>
          <button type="button" className={styles.editLink} onClick={useCurrentLocation}>
            {t.signup.useCurrentLocation}
          </button>
        </div>

        {/* Selected Location Card — visually highlights current selection */}
        <div className={styles.selectedLocationCard} data-has={valid ? 'true' : 'false'}>
          <div className={styles.selectedLocationHead}>
            <span aria-hidden="true">📍</span> {t.signup.selectedLocation}
          </div>
          {valid ? (
            <div className={styles.selectedLocationBody}>
              <div>{data.location.state}</div>
              <div style={{ fontWeight: 700 }}>{data.location.district}</div>
              <div>{data.location.cityTown || '—'}</div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--slate-light)', padding: '8px 0' }}>{t.emptyStates.noLocation}</div>
          )}
        </div>

        {/* 2. Select Suggested Location — 5 major TN cities */}
        <div className={styles.field}>
          <span className={styles.label}>{t.signup.suggestedLocations}</span>
          <p className={styles.helpText}>{t.signup.selectSuggestedLocation}</p>
          <div className={styles.suggestedGrid}>
            {SUGGESTED_LOCATIONS.map((loc) => {
              const key = `${loc.city}__${loc.district}__${loc.state}`
              const active = key === selectedKey
              return (
                <button
                  key={key}
                  type="button"
                  className={styles.suggestedCard}
                  data-active={active}
                  onClick={() => selectSuggested(loc.city, loc.district, loc.state)}
                >
                  <span className={styles.suggestedCity}>{loc.city}</span>
                  <span className={styles.suggestedMeta}>{loc.district}, {loc.state}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Manual selection */}
        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="state">
              {t.signup.state}
            </label>
            <select
              id="state"
              className={styles.input}
              value={data.location.state}
              onChange={(e) => onChange({ location: { ...data.location, state: e.target.value } })}
            >
              <option value="">—</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="district">
              {t.signup.district}
            </label>
            <input
              id="district"
              className={styles.input}
              value={data.location.district}
              onChange={(e) => onChange({ location: { ...data.location, district: e.target.value } })}
              placeholder="e.g. Chennai"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="city">
            {t.signup.cityTown}
          </label>
          <input
            id="city"
            className={styles.input}
            value={data.location.cityTown}
            onChange={(e) => onChange({ location: { ...data.location, cityTown: e.target.value } })}
            placeholder="e.g. Mylapore"
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            {t.signup.back}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={onNext} disabled={!valid}>
            {t.signup.continueToRole}
          </button>
        </div>
      </div>
    </div>
  )
}
