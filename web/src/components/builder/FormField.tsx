'use client'

import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** Joins only the ids that exist, so aria-describedby is never `"undefined"`. */
function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean) as string[]
  return list.length ? list.join(' ') : undefined
}

/**
 * A labelled form field.
 *
 * The <label> now wraps ONLY the label text. It used to wrap the control AND the
 * hint, so the hint was absorbed into the accessible name: the description field
 * announced as "Description 0/240 characters" and re-announced the whole thing on
 * every keystroke. Hint and error are siblings with their own ids, joined into
 * aria-describedby, which is what a description is for.
 *
 * `children` is a render prop so the field can hand the control its id and its
 * aria wiring — without it there was nowhere for validation state to go, which is
 * why `Input`'s `invalid` prop existed unused.
 */
export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: (props: {
    id: string
    'aria-describedby': string | undefined
    'aria-invalid': true | undefined
  }) => React.ReactNode
  className?: string
}) {
  const t = useT()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('block', className)}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-content">
        {label}
        {required && (
          <span className="ms-1 text-content-muted">({t('builder.form.required')})</span>
        )}
      </label>
      {children({
        id,
        'aria-describedby': describedBy(errorId, hintId),
        'aria-invalid': error ? true : undefined,
      })}
      {hint && (
        <p id={hintId} className="mt-1.5 text-[11px] text-content-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[11px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function SelectField({
  id,
  value,
  onChange,
  invalid,
  disabled,
  describedBy: described,
  children,
  className,
}: {
  id?: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  invalid?: boolean
  disabled?: boolean
  describedBy?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={described}
      className={cn(
        'h-12 w-full rounded-input border bg-surface px-4 text-sm text-content outline-none transition-colors placeholder:text-content-muted focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60',
        invalid
          ? 'border-error focus:border-error focus:ring-error'
          : 'border-border focus:border-primary focus:ring-primary',
        className
      )}
    >
      {children}
    </select>
  )
}
