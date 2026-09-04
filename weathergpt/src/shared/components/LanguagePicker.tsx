import { useEffect, useRef, useState } from 'react'
import { LANGUAGES } from '../../i18n/languages'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './LanguagePicker.module.css'

interface LanguagePickerProps {
  onDark?: boolean
}

export default function LanguagePicker({ onDark = false }: LanguagePickerProps) {
  const { language, setLanguage, locked } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0]

  if (locked) {
    // Administrator surfaces show a static English badge, not a picker.
    return (
      <span className={styles.trigger} data-on-dark={onDark} aria-label="Language: English (locked)">
        EN · English
      </span>
    )
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        data-on-dark={onDark}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.code.toUpperCase()} · {current.nativeName}
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                className={styles.item}
                data-active={lang.code === language}
                role="option"
                aria-selected={lang.code === language}
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
              >
                <span>{lang.nativeName}</span>
                <span className={styles.itemEnglish}>{lang.englishName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
