'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * The shared multi-line control, replacing the textarea classes that were
 * re-declared by hand on the setup and curriculum steps (and drifted apart).
 *
 * It mirrors `Input`: same border tokens, same focus ring, same `invalid`
 * treatment, so a textarea and a text field never look like different products.
 */
export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  {
    id?: string
    value: string
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    rows?: number
    maxLength?: number
    invalid?: boolean
    describedBy?: string
    placeholder?: string
    disabled?: boolean
    className?: string
  }
>(function TextareaField(
  { id, value, onChange, rows = 4, maxLength, invalid, describedBy, placeholder, disabled, className },
  ref
) {
  return (
    <textarea
      ref={ref}
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={describedBy}
      className={cn(
        // placeholder:text-content-muted, matching FormField's input. The `/70`
        // alpha on an already-mid-contrast token resolved to 2.49:1, and it made
        // the new textarea and the new input disagree on placeholder weight.
        'w-full resize-y rounded-input border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none transition-colors placeholder:text-content-muted focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60',
        invalid
          ? 'border-error focus:border-error focus:ring-error'
          : 'border-border focus:border-primary focus:ring-primary',
        className
      )}
    />
  )
})
