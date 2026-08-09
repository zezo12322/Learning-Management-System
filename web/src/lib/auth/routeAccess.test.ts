import { describe, it, expect } from 'vitest'
import { canTeach, isRouteForbidden, isTeachingRoute } from './routeAccess'

describe('canTeach', () => {
  it('accepts instructors and admins', () => {
    expect(canTeach(['instructor'])).toBe(true)
    expect(canTeach(['admin'])).toBe(true)
    expect(canTeach(['student', 'instructor'])).toBe(true)
  })

  it('rejects learners and accounts with no role', () => {
    expect(canTeach(['student'])).toBe(false)
    expect(canTeach([])).toBe(false)
  })
})

describe('isTeachingRoute', () => {
  it('covers every instructor surface, including nested paths', () => {
    for (const path of [
      '/dashboard',
      '/students',
      '/uploads',
      '/insights',
      '/insights/abc-123',
      '/studio/abc-123/curriculum',
      '/studio/new/setup',
      '/courses',
    ]) {
      expect(isTeachingRoute(path), path).toBe(true)
    }
  })

  it('leaves the learner surfaces alone', () => {
    for (const path of [
      '/home',
      '/learning',
      '/catalog',
      '/catalog/abc-123',
      '/saved',
      '/profile',
      '/assignments',
      '/certificates',
      '/certificates/abc-123',
      '/notifications',
      '/learn/abc-123',
      '/quiz/abc-123/def-456',
    ]) {
      expect(isTeachingRoute(path), path).toBe(false)
    }
  })

  it('treats /courses/:id as a learner page even though /courses is not', () => {
    // Course details is where the catalogue and My Courses link; guarding the
    // prefix would lock every student out of every course.
    expect(isTeachingRoute('/courses')).toBe(true)
    expect(isTeachingRoute('/courses/abc-123')).toBe(false)
  })

  it('does not match a route that merely starts with the same characters', () => {
    expect(isTeachingRoute('/dashboards')).toBe(false)
    expect(isTeachingRoute('/uploads-archive')).toBe(false)
  })
})

describe('isRouteForbidden', () => {
  it('blocks a learner from the instructor workspace', () => {
    expect(isRouteForbidden('/dashboard', ['student'])).toBe(true)
    expect(isRouteForbidden('/studio/abc/setup', ['student'])).toBe(true)
    expect(isRouteForbidden('/uploads', [])).toBe(true)
  })

  it('lets instructors and admins through', () => {
    expect(isRouteForbidden('/dashboard', ['instructor'])).toBe(false)
    expect(isRouteForbidden('/uploads', ['admin'])).toBe(false)
  })

  it('never blocks a learner page', () => {
    expect(isRouteForbidden('/home', ['student'])).toBe(false)
    expect(isRouteForbidden('/courses/abc-123', ['student'])).toBe(false)
  })
})
