'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Check, Clock, Globe2, ListChecks, Rocket } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi } from '@/lib/api/services'
import { lectureReadiness, useCourseReadiness } from '@/lib/builder/readiness'
import { safeMediaUrl } from '@/lib/safeUrl'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized, lessonCountLabel, sectionCountLabel } from '@/lib/i18n/format'
import { PageHeader } from '@/components/workspace/PageHeader'
import { useAnnounce } from '@/components/builder/BuilderAnnouncer'
import { BlockedHint } from '@/components/builder/BlockedHint'
import { LectureRow } from '@/components/builder/LectureRow'
import { PublishSummary } from '@/components/builder/PublishSummary'
import { ReadinessPanel } from '@/components/builder/ReadinessPanel'
import { SectionRow } from '@/components/builder/SectionRow'
import { StudioStepLayout } from '@/components/builder/StudioStepLayout'
import { EmptyState } from '@/components/student/EmptyState'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button, buttonClasses } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function PreviewPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const queryClient = useQueryClient()
  const announce = useAnnounce()
  const [published, setPublished] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  // "new" is a placeholder id until the setup step creates the course.
  const isNew = courseId === 'new'
  const courseQuery = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isNew,
  })
  const course = courseQuery.data
  const thumbnail = safeMediaUrl(course?.thumbnail)
  const sections = useMemo(() => course?.sections ?? [], [course?.sections])
  // The one readiness engine. This screen used to compute its own three checks,
  // ignore the cover image entirely, and render the optional AI item with the
  // blockers' amber warning icon and a hard-coded `complete={false}`.
  const readiness = useCourseReadiness(courseId)
  const isPublished = published || course?.status === 'PUBLISHED'
  const courseInitials = course?.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('') || 'C'

  useEffect(() => {
    const first = sections[0]?.id
    if (!first) return
    setExpanded((current) => (current.size ? current : new Set([first])))
  }, [sections])

  const publish = useMutation({
    mutationFn: () => authoringApi.setStatus(courseId, 'PUBLISHED'),
    onSuccess: async () => {
      setPublished(true)
      announce(t('builder.announce.published'))
      // Without this the shell header kept reading "Draft" while this card said
      // "Published".
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
    },
    onError: () => announce(t('builder.announce.publishFailed')),
  })

  const publishCourse = async () => {
    if (!readiness.canPublish || isPublished) return
    announce(t('builder.announce.publishing'))
    try {
      await publish.mutateAsync()
    } catch {
      // The mutation error is rendered next to the button.
    }
  }

  const toggleSection = (sectionId: string) =>
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })

  if (isNew) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('builder.preview.title')} description={t('builder.preview.subtitle')} />
        <Card className="p-6">
          <h2 className="text-base font-semibold text-content">{t('builder.preview.needsCourseTitle')}</h2>
          <p className="mt-2 max-w-lg text-xs leading-5 text-content-secondary">
            {t('builder.preview.needsCourseBody')}
          </p>
          <Link href="/studio/new/setup" className={buttonClasses({ className: 'mt-5' })}>
            {t('builder.preview.goToSetup')}
          </Link>
        </Card>
      </div>
    )
  }

  const firstBlocked = readiness.checks.find(
    (check) => check.severity === 'required' && check.state !== 'complete'
  )

  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.preview.title')} description={t('builder.preview.subtitle')} />

      {courseQuery.isError && <Card role="alert" className="border-error bg-error-soft p-4 text-sm text-error">{t('builder.preview.loadError')}</Card>}

      {published && (
        <Card className="border-success bg-success-soft p-4 text-sm font-medium text-success">
          <span className="inline-flex items-center gap-2"><Check size={17} aria-hidden /> {t('builder.preview.publishSuccess')}</span>
        </Card>
      )}

      <StudioStepLayout
        railLabel={t('builder.readiness.title')}
        rail={
          <ReadinessPanel
            title={t('builder.readiness.title')}
            score={readiness.score}
            checks={readiness.checks}
            footer={
              <div className="space-y-4">
                {/* The last thing read before the most consequential action in
                    the product is a factual manifest, not a percentage. */}
                <PublishSummary
                  lessonCount={readiness.lessonCount}
                  totalSeconds={readiness.totalSeconds}
                  readyVideos={readiness.readyVideoLessons.length}
                  totalVideos={readiness.videoLessons.length}
                  hasCover={readiness.hasCover}
                />
                <p className="text-[11px] leading-5 text-content-secondary">{t('builder.preview.publishNote')}</p>
                {!readiness.canPublish && firstBlocked && (
                  <BlockedHint
                    id="preview-publish-blocked"
                    reason={`${t('builder.shell.publishBlockedReason')} ${t('builder.shell.publishBlockedItem').replace('{item}', firstBlocked.label)}`}
                    href={firstBlocked.href}
                    linkLabel={t('builder.readiness.fixIn').replace('{step}', firstBlocked.stepLabel ?? '')}
                  />
                )}
                <Button
                  id="publish-course"
                  fullWidth
                  size="lg"
                  loading={publish.isPending}
                  disabled={!readiness.canPublish || isPublished || courseQuery.isLoading}
                  aria-describedby={readiness.canPublish ? undefined : 'preview-publish-blocked'}
                  onClick={publishCourse}
                >
                  <Rocket size={17} aria-hidden /> {isPublished ? t('common.published') : t('builder.preview.publishCourse')}
                </Button>
                {publish.isError && <p role="alert" className="text-xs text-error">{apiErrorMessage(publish.error, t('builder.preview.publishError'))}</p>}
              </div>
            }
          />
        }
      >
        <Card className="overflow-hidden">
          <div className="grid gap-6 bg-brand-soft p-5 sm:p-7 lg:grid-cols-[220px_1fr] lg:items-center">
            <div
              className="flex aspect-video items-center justify-center rounded-card bg-surface bg-cover bg-center"
              style={thumbnail ? { backgroundImage: `url(${JSON.stringify(thumbnail)})` } : undefined}
            >
              {!thumbnail && <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">{courseInitials}</span>}
            </div>
            <div>
              {/* Casing and letter-spacing are Latin-only: `.toUpperCase()` is a
                  no-op on an Arabic category while `tracking-wide` still breaks
                  its cursive joins, so the treatment moved to `ltr:` classes. */}
              <p className="text-[9px] font-semibold text-on-brand-soft ltr:tracking-wide"><span className="ltr:uppercase">{course?.category ?? t('builder.preview.uncategorized')}</span> · {course?.level ? t(`level.${course.level}`, course.level) : t('level.BEGINNER')}</p>
              {/* h2, not h1: PageHeader already renders the page's only h1. */}
              <h2 className="mt-3 text-2xl font-bold text-content ltr:tracking-tight">{course?.title ?? t('builder.preview.loadingCourse')}</h2>
              <p className="mt-3 max-w-xl text-xs leading-5 text-content-secondary">{course?.description || t('builder.preview.noDescription')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill tone="neutral" dot={false}><BookOpen size={12} aria-hidden /> {lessonCountLabel(readiness.lessonCount, t)}</StatusPill>
                <StatusPill tone="neutral" dot={false}><Clock size={12} aria-hidden /> {formatSecondsLocalized(readiness.totalSeconds, t)}</StatusPill>
                <StatusPill tone="neutral" dot={false}><Globe2 size={12} aria-hidden /> {course?.language ? t(`courseLanguage.${course.language}`, course.language) : t('builder.preview.notSet')}</StatusPill>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {/* The overview/instructor tabs were removed: this preview only
                renders the curriculum, and the tabs switched nothing. */}
            <h2 className="text-lg font-semibold text-content">{t('builder.preview.curriculumTitle')}</h2>
            <p className="mt-1 text-[11px] text-content-secondary">
              {sectionCountLabel(sections.length, t)} · {lessonCountLabel(readiness.lessonCount, t)}
            </p>

            {courseQuery.isLoading ? (
              <div aria-busy="true" className="mt-5 space-y-3">
                <p className="text-xs text-content-secondary">{t('builder.preview.loadingCurriculum')}</p>
                {[0, 1, 2].map((row) => <Skeleton key={row} className="h-16 w-full rounded-input" />)}
              </div>
            ) : sections.length === 0 ? (
              <EmptyState
                icon={ListChecks}
                title={t('builder.preview.empty.title')}
                description={t('builder.preview.empty.body')}
                actionLabel={t('builder.curriculum.backToStudio')}
                actionHref={`/studio/${courseId}/curriculum`}
              />
            ) : (
              <div className="mt-5 space-y-3">
                {sections.map((section, index) => (
                  <SectionRow
                    key={section.id}
                    section={section}
                    index={index}
                    expanded={expanded.has(section.id)}
                    onToggle={() => toggleSection(section.id)}
                  >
                    {/* Every lesson, not the first two: the final review screen
                        could not verify lesson order for any real section. */}
                    <ul role="list" className="divide-y divide-border border-t border-border">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <LectureRow
                          key={lecture.id}
                          lecture={lecture}
                          index={lectureIndex + 1}
                          readiness={lectureReadiness(lecture)}
                        />
                      ))}
                    </ul>
                  </SectionRow>
                ))}
              </div>
            )}
          </div>
        </Card>
      </StudioStepLayout>
    </div>
  )
}
