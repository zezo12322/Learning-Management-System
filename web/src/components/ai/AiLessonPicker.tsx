'use client'

import type { Lecture } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { FormField, SelectField } from '@/components/builder/FormField'
import { cn } from '@/lib/utils'

/**
 * Which lesson the AI tools work from. Both AI screens hand-rolled this select
 * with a bare `<label>` and their own classes; it is the shared SelectField now,
 * so it focuses and validates like every other control in the studio.
 */
export function AiLessonPicker({
  id,
  lectures,
  value,
  onChange,
  className,
}: {
  id: string
  lectures: Lecture[]
  value: string
  onChange: (lectureId: string) => void
  className?: string
}) {
  const t = useT()
  return (
    <FormField id={id} label={t('ai.step.pickLesson')} className={cn('max-w-md', className)}>
      {(field) => (
        <SelectField
          id={field.id}
          describedBy={field['aria-describedby']}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {lectures.map((lecture) => (
            <option key={lecture.id} value={lecture.id}>{lecture.title}</option>
          ))}
        </SelectField>
      )}
    </FormField>
  )
}
