'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Info, Sparkles } from 'lucide-react'
import { catalogApi } from '@/lib/api/services'
import { isAiTutorEnabled } from '@/lib/ai/tutor'
import { useT } from '@/lib/i18n'
import type { Lecture } from '@/lib/types'
import { AiLessonPicker } from '@/components/ai/AiLessonPicker'
import { StudioStepLayout } from '@/components/builder/StudioStepLayout'
import { EmptyState } from '@/components/student/EmptyState'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { PageHeader } from '@/components/workspace/PageHeader'
import { buttonClasses } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export type AiTab = 'studio' | 'tutor'

const TAB_HREF: Record<AiTab, string> = {
  studio: 'ai-studio',
  tutor: 'ai-tutor',
}

/**
 * Everything the two AI steps had in common — the feature gate, the curriculum
 * query, the video-only filter, the lesson picker and the empty state. They were
 * 88 and 89 lines of near-identical code.
 *
 * The sub-nav is real links, not tab buttons: these are two routes, and the
 * shell shows a single "AI tools" step for both, so the highlighted rail entry
 * used to navigate AWAY from ai-tutor with no way back except the browser.
 */
export function AiStepScaffold({
  courseId,
  tab,
  title,
  description,
  children,
}: {
  courseId: string
  tab: AiTab
  title: string
  description: string
  children: (lecture: Lecture) => React.ReactNode
}) {
  const t = useT()
  const enabled = isAiTutorEnabled()
  // "new" is a placeholder id until the setup step creates the course.
  const isNew = courseId === 'new'
  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
    enabled: enabled && Boolean(courseId) && !isNew,
  })

  // Both tools are grounded in a video transcript, so only VIDEO lessons apply.
  const videoLectures = useMemo(
    () => (curriculum.data?.sections ?? []).flatMap((section) => section.lectures).filter((lecture) => lecture.type === 'VIDEO'),
    [curriculum.data]
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const active = videoLectures.find((lecture) => lecture.id === selectedId) ?? videoLectures[0] ?? null

  const subNav = (
    <nav aria-label={t('ai.step.navLabel')} className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border">
      {(['studio', 'tutor'] as AiTab[]).map((item) => {
        const current = item === tab
        return (
          <Link
            key={item}
            href={`/studio/${courseId}/${TAB_HREF[item]}`}
            aria-current={current ? 'page' : undefined}
            className={cn(
              '-mb-px shrink-0 border-b-2 px-4 pb-3 pt-2 text-sm font-semibold transition-colors',
              current ? 'border-primary text-primary' : 'border-transparent text-content-secondary hover:text-content'
            )}
          >
            {item === 'studio' ? t('ai.step.studioTab') : t('ai.step.tutorTab')}
          </Link>
        )
      })}
    </nav>
  )

  const rail = (
    <Card className="h-fit p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-content">
        <Sparkles size={16} className="text-primary" aria-hidden /> {t('ai.step.navLabel')}
      </h2>
      {/* Optional severity, stated in the informational colour — this step never
          blocks publishing, so it must never wear the blockers' amber. */}
      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-info">
        <Info size={14} className="mt-0.5 shrink-0" aria-hidden /> {t('ai.step.optionalNote')}
      </p>
      <p className="mt-3 text-[11px] leading-5 text-content-secondary">{t('ai.studio.draftDisclaimer')}</p>
    </Card>
  )

  return (
    <div className="space-y-5">
      <PageHeader title={title} description={description} />
      {subNav}

      <StudioStepLayout railLabel={t('ai.step.navLabel')} rail={enabled && !isNew ? rail : undefined}>
        {!enabled ? (
          <AIUnavailable />
        ) : isNew ? (
          <Card className="p-6">
            <h2 className="text-base font-semibold text-content">{t('builder.media.needsCourseTitle')}</h2>
            <p className="mt-2 max-w-lg text-xs leading-5 text-content-secondary">{t('ai.step.noVideoLessonsHint')}</p>
            <Link href="/studio/new/setup" className={buttonClasses({ className: 'mt-5' })}>
              {t('builder.media.goToSetup')}
            </Link>
          </Card>
        ) : curriculum.isLoading ? (
          <PageSpinner />
        ) : videoLectures.length === 0 ? (
          <Card>
            <EmptyState
              icon={Sparkles}
              title={t('ai.step.noVideoLessons')}
              description={t('ai.step.noVideoLessonsHint')}
              actionLabel={t('builder.curriculum.backToStudio')}
              actionHref={`/studio/${courseId}/curriculum`}
            />
          </Card>
        ) : (
          <div className="space-y-4">
            <AiLessonPicker
              id={`ai-${tab}-lesson`}
              lectures={videoLectures}
              value={active?.id ?? ''}
              onChange={setSelectedId}
            />
            {active && children(active)}
          </div>
        )}
      </StudioStepLayout>
    </div>
  )
}
