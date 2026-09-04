export type LanguageCode =
  | 'en'
  | 'ta'
  | 'ml'
  | 'te'
  | 'kn'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'or'
  | 'ur'

export interface LanguageDefinition {
  code: LanguageCode
  /** Name shown in its own script, used on the language picker */
  nativeName: string
  /** English name, used in admin-only surfaces */
  englishName: string
  /** Text direction */
  dir: 'ltr' | 'rtl'
}

export const LANGUAGES: LanguageDefinition[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', dir: 'ltr' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', dir: 'ltr' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', dir: 'ltr' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', dir: 'ltr' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', dir: 'ltr' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam', dir: 'ltr' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', dir: 'ltr' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', dir: 'rtl' },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'en'

/** The language the Administrator dashboard is locked to, no matter what. */
export const ADMIN_LOCKED_LANGUAGE: LanguageCode = 'en'
