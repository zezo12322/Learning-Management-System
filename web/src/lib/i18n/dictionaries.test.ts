import { describe, it, expect } from 'vitest'
import { dictionaries } from './dictionaries'

describe('dictionaries', () => {
  it('defines every key in both locales', () => {
    const en = Object.keys(dictionaries.en).sort()
    const ar = Object.keys(dictionaries.ar).sort()
    expect(ar.filter((key) => !dictionaries.en[key])).toEqual([])
    expect(en.filter((key) => !dictionaries.ar[key])).toEqual([])
  })

  it('has no empty translations', () => {
    for (const [locale, table] of Object.entries(dictionaries)) {
      for (const [key, value] of Object.entries(table)) {
        expect(value.trim(), `${locale}:${key}`).not.toBe('')
      }
    }
  })

  it('keeps the same placeholders in both locales', () => {
    // A dropped {n} silently renders a sentence with a missing number.
    const placeholders = (value: string) => (value.match(/\{[a-zA-Z]+\}/g) ?? []).sort()
    for (const key of Object.keys(dictionaries.en)) {
      expect(placeholders(dictionaries.ar[key]), key).toEqual(placeholders(dictionaries.en[key]))
    }
  })
})
