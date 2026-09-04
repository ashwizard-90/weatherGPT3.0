import type { LanguageCode } from '../languages'
import type { Dictionary } from '../types'
import en from './en'
import hiRaw from './hi'
import bnRaw from './bn'
import teRaw from './te'
import mrRaw from './mr'
import taRaw from './ta'
import knRaw from './kn'
import mlRaw from './ml'
import orRaw from './or'
import urRaw from './ur'

function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(base)) {
    const b = base[key as keyof T]
    const o = (override as Record<string, unknown>)[key]
    if (o === undefined) {
      out[key] = b
    } else if (isObject(b) && isObject(o)) {
      out[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>)
    } else {
      out[key] = o
    }
  }
  // include any extra keys from override that are not in base (future-proof)
  for (const key of Object.keys(override)) {
    if (!(key in out)) out[key] = (override as Record<string, unknown>)[key]
  }
  return out as T
}

// Each translation file may be a partial override; missing keys fall back to English
// so that new i18n keys never break the build and never render "undefined".
export const DICTIONARIES: Record<LanguageCode, Dictionary> = {
  en,
  hi: deepMerge(en as unknown as Record<string, unknown>, hiRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  bn: deepMerge(en as unknown as Record<string, unknown>, bnRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  te: deepMerge(en as unknown as Record<string, unknown>, teRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  mr: deepMerge(en as unknown as Record<string, unknown>, mrRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  ta: deepMerge(en as unknown as Record<string, unknown>, taRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  kn: deepMerge(en as unknown as Record<string, unknown>, knRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  ml: deepMerge(en as unknown as Record<string, unknown>, mlRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  or: deepMerge(en as unknown as Record<string, unknown>, orRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
  ur: deepMerge(en as unknown as Record<string, unknown>, urRaw as unknown as Record<string, unknown>) as unknown as Dictionary,
}
