import { describe, it, expect } from 'vitest'
import { sanitizeStoredAttempt } from './quizAttempt'

describe('sanitizeStoredAttempt', () => {
  const valid = {
    attemptId: 'attempt-1',
    startedAtMs: 1_700_000_000_000,
    answers: { 'q-1': 'o-1', 'q-2': 'o-9' },
    synced: ['q-1'],
  }

  it('accepts a well-formed attempt unchanged', () => {
    expect(sanitizeStoredAttempt(valid)).toEqual(valid)
  })

  it.each([
    ['not an object', 'nope'],
    ['null', null],
    ['no attempt id', { ...valid, attemptId: '' }],
    ['non-numeric start time', { ...valid, startedAtMs: 'soon' }],
    ['NaN start time', { ...valid, startedAtMs: Number.NaN }],
    ['answers not an object', { ...valid, answers: [] as unknown }],
    ['synced not an array', { ...valid, synced: 'q-1' }],
  ])('rejects %s', (_label, value) => {
    expect(sanitizeStoredAttempt(value)).toBeNull()
  })

  it('drops answer entries whose option id is not a usable string', () => {
    const result = sanitizeStoredAttempt({
      ...valid,
      answers: { 'q-1': 'o-1', 'q-2': 42, 'q-3': null, 'q-4': '' },
    })
    expect(result?.answers).toEqual({ 'q-1': 'o-1' })
  })

  it('drops synced ids that have no answer, so the retry is not suppressed', () => {
    // The dangerous direction: a leftover id here would mark an unsent answer as
    // already saved, and submit() skips exactly those.
    const result = sanitizeStoredAttempt({
      ...valid,
      answers: { 'q-1': 'o-1' },
      synced: ['q-1', 'q-2', 7],
    })
    expect(result?.synced).toEqual(['q-1'])
  })
})
