import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from './languages'
import { DICTIONARIES } from './dictionaries'
import type { Dictionary } from './types'

const STORAGE_KEY = 'weathergpt.language'

interface LanguageContextValue {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: Dictionary
  dir: 'ltr' | 'rtl'
  /** True inside a locked subtree (e.g. the Administrator dashboard) where the
   *  language cannot be changed by the user, regardless of the site-wide setting. */
  locked: boolean
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function readStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null
  if (stored && DICTIONARIES[stored]) return stored
  return DEFAULT_LANGUAGE
}

/**
 * Site-wide language provider. Wrap the whole app in this once, at the root.
 * Every public page and every non-admin dashboard reads from this context and
 * re-renders in the person's chosen language.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage)

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, code)
    }
  }

  const def = LANGUAGES.find((l) => l.code === language)
  const dir = def?.dir ?? 'ltr'

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir
      document.documentElement.lang = language
      // For RTL languages, ensure body also reflects direction for proper layout mirroring
      document.body.setAttribute('dir', dir)
    }
  }, [dir, language])

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      t: DICTIONARIES[language],
      dir,
      locked: false,
    }
  }, [language, dir])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/**
 * Locks every descendant to English, no matter what language the rest of the
 * site is set to, and disables language switching within the subtree.
 *
 * This is used exclusively around the Administrator dashboard: system
 * administrators always see WeatherGPT in English so that logs, audit
 * trails, and cross-team support stay unambiguous. It is enforced here in
 * the provider tree — not with a UI toggle the admin surface could bypass.
 */
export function AdminEnglishLock({ children }: { children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(
    () => ({
      language: 'en',
      setLanguage: () => {
        // Intentionally a no-op: the Administrator dashboard cannot change language.
      },
      t: DICTIONARIES.en,
      dir: 'ltr',
      locked: true,
    }),
    [],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
