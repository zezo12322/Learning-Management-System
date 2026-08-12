/**
 * One localised way to state a duration and a count.
 *
 * Every user-visible duration and lesson/section count goes through here, so
 * the same six-hour course cannot read "360 minutes" on one screen and "6h" on
 * the next, and the bare `h`/`m` letters never leak into an Arabic page.
 *
 * `formatDuration` in lib/utils.ts stays for non-display maths, but must not be
 * used for text a user reads.
 *
 * The `t` parameter is the translate function from useT(); it is typed as the
 * narrowest shape these helpers need so they stay usable outside React too.
 */
type Translate = (key: string) => string

function fill(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (text, [token, value]) => text.replace(`{${token}}`, value),
    template
  )
}

/** State a duration given in seconds: "0m" / "45m" / "2h" / "2h 15m". */
export function formatSecondsLocalized(
  seconds: number | null | undefined,
  t: Translate
): string {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.round(seconds as number)) : 0
  if (total === 0) return t('common.duration.none')

  if (total < 3600) {
    // A lesson that lasts 20 seconds is still not "0m" — anything non-zero
    // reads as at least one minute.
    const minutes = Math.max(1, Math.round(total / 60))
    if (minutes === 60) return fill(t('common.duration.h'), { h: '1' })
    return fill(t('common.duration.m'), { m: String(minutes) })
  }

  let hours = Math.floor(total / 3600)
  let minutes = Math.round((total % 3600) / 60)
  if (minutes === 60) {
    hours += 1
    minutes = 0
  }
  if (minutes === 0) return fill(t('common.duration.h'), { h: String(hours) })
  return fill(t('common.duration.hm'), { h: String(hours), m: String(minutes) })
}

/** State a duration given in minutes (the shape the authoring API returns). */
export function formatMinutesLocalized(
  minutes: number | null | undefined,
  t: Translate
): string {
  const total = Number.isFinite(minutes) ? Math.max(0, minutes as number) : 0
  return formatSecondsLocalized(Math.round(total * 60), t)
}

/** "12 lessons" — one interpolated key per locale, so Arabic reads naturally. */
export function lessonCountLabel(n: number, t: Translate): string {
  return fill(t('common.lessons'), { n: String(Number.isFinite(n) ? n : 0) })
}

/** "3 sections". */
export function sectionCountLabel(n: number, t: Translate): string {
  return fill(t('common.sections'), { n: String(Number.isFinite(n) ? n : 0) })
}
