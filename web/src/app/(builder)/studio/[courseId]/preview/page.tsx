'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BookOpen, Check, ChevronDown, Clock, Globe2, Play, Rocket } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { ReadinessItem } from '@/components/builder/ReadinessItem'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function PreviewPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const [published, setPublished] = useState(false)
  const [openSection, setOpenSection] = useState('')
  const courseQuery = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
  })
  const course = courseQuery.data
  const sections = useMemo(() => course?.sections ?? [], [course?.sections])
  const lessonCount = sections.reduce((total, section) => total + section.lectures.length, 0)
  const totalSeconds = sections.flatMap((section) => section.lectures).reduce((total, lecture) => total + lecture.duration, 0)
  const courseSetupComplete = Boolean(
    course?.title.trim() &&
    course.description.trim() &&
    course.categoryId &&
    course.level &&
    course.language.trim()
  )
  const curriculumComplete = sections.length > 0 && sections.every(
    (section) => Boolean(section.title.trim()) && section.lectures.length > 0
  )
  const videoLessons = sections.flatMap((section) => section.lectures).filter((lecture) => lecture.type === 'VIDEO')
  const readyVideoLessons = videoLessons.filter((lecture) => Boolean(lecture.videoUrl)).length
  const mediaComplete = videoLessons.length === 0 || readyVideoLessons === videoLessons.length
  const requiredChecks = [courseSetupComplete, curriculumComplete, mediaComplete]
  const readinessScore = course ? Math.round((requiredChecks.filter(Boolean).length / requiredChecks.length) * 100) : 0
  const readyToPublish = Boolean(course) && requiredChecks.every(Boolean)
  const isPublished = published || course?.status === 'PUBLISHED'
  const courseInitials = course?.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('') || 'C'

  useEffect(() => {
    if (!openSection && sections[0]) setOpenSection(sections[0].id)
  }, [openSection, sections])
  const publish = useMutation({
    mutationFn: () => authoringApi.setStatus(courseId, 'PUBLISHED'),
    onSuccess: () => setPublished(true),
  })

  const publishCourse = async () => {
    if (!readyToPublish || isPublished) return
    try {
      await publish.mutateAsync()
    } catch {
      // The mutation error is rendered next to the button.
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.preview.title')} description={t('builder.preview.subtitle')} />

      {courseQuery.isError && <Card className="border-error/20 bg-error/10 p-4 text-sm text-error">{t('builder.preview.loadError')}</Card>}

      {published && (
        <Card className="border-success/20 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="inline-flex items-center gap-2"><Check size={17} /> {t('builder.preview.publishSuccess')}</span>
        </Card>
      )}

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_334px]">
        <Card className="overflow-hidden">
          <div className="grid gap-6 bg-brand-soft p-5 sm:p-7 lg:grid-cols-[220px_1fr] lg:items-center">
            <div
              className="flex aspect-video items-center justify-center rounded-card bg-surface bg-cover bg-center"
              style={course?.thumbnail ? { backgroundImage: `url(${JSON.stringify(course.thumbnail)})` } : undefined}
            >
              {!course?.thumbnail && <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">{courseInitials}</span>}
            </div>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-primary">{course?.category?.toUpperCase() ?? t('builder.preview.uncategorized')} · {course?.level ? t(`level.${course.level}`, course.level) : t('level.BEGINNER')}</p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-content">{course?.title ?? t('builder.preview.loadingCourse')}</h1>
              <p className="mt-3 max-w-xl text-xs leading-5 text-content-secondary">{course?.description || t('builder.preview.noDescription')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill tone="neutral" dot={false}><BookOpen size={12} /> {lessonCount} {t('builder.preview.lessons')}</StatusPill>
                <StatusPill tone="neutral" dot={false}><Clock size={12} /> {Math.floor(totalSeconds / 3600)}h {Math.round((totalSeconds % 3600) / 60)}m</StatusPill>
                <StatusPill tone="neutral" dot={false}><Globe2 size={12} /> {course?.language ?? t('builder.preview.notSet')}</StatusPill>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex gap-5 border-b border-border pb-4 text-xs font-semibold"><button className="text-content-secondary">{t('builder.preview.tabOverview')}</button><button className="text-primary">{t('builder.preview.tabCurriculum')}</button><button className="text-content-secondary">{t('builder.preview.tabInstructor')}</button></div>
            <h2 className="mt-6 text-lg font-semibold text-content">{t('builder.preview.curriculumTitle')}</h2>
            <p className="mt-1 text-[11px] text-content-secondary">{sections.length} {sections.length === 1 ? t('builder.preview.sectionSingular') : t('builder.preview.sectionPlural')} · {lessonCount} {lessonCount === 1 ? t('builder.preview.lessonSingular') : t('builder.preview.lessonPlural')}</p>

            <div className="mt-5 space-y-3">
              {sections.map((section, index) => {
                const open = openSection === section.id
                return (
                  <div key={section.id} className="overflow-hidden rounded-input border border-border">
                    <button onClick={() => setOpenSection(open ? '' : section.id)} className={open ? 'flex w-full items-center gap-3 bg-brand-soft p-3 text-left sm:p-4' : 'flex w-full items-center gap-3 bg-surface p-3 text-left sm:p-4'}>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-[10px] font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-content">{section.title}</span><span className="mt-1 block text-[9px] text-content-secondary">{section.lectures.length} {t('builder.preview.lessons')}</span></span>
                      <ChevronDown size={15} className={open ? 'rotate-180 text-primary transition-transform' : 'text-content-muted transition-transform'} />
                    </button>
                    {open && section.lectures.slice(0, 2).map((lecture) => (
                      <div key={lecture.id} className="flex items-center gap-3 border-t border-border px-4 py-3 text-xs"><Play size={13} className="text-secondary" /><span className="flex-1 text-content">{lecture.title}</span><span className="text-[10px] text-content-muted">{Math.round(lecture.duration / 60)} {t('builder.preview.min')}</span></div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <Card className="h-fit p-5 xl:sticky xl:top-24">
          <h2 className="text-base font-semibold text-content">{t('builder.preview.readinessTitle')}</h2>
          <p className="mt-2 text-[11px] leading-5 text-content-secondary">
            {courseQuery.isLoading
              ? t('builder.preview.checking')
              : readyToPublish
                ? t('builder.preview.allComplete')
                : t('builder.preview.completeMissing')}
          </p>
          <div className={readyToPublish ? 'mt-5 rounded-input bg-success/10 p-4' : 'mt-5 rounded-input bg-warning/10 p-4'}>
            <div className="flex items-center justify-between">
              <span className={readyToPublish ? 'text-xs font-semibold text-success' : 'text-xs font-semibold text-warning'}>{readyToPublish ? t('builder.preview.readyToPublish') : t('builder.preview.actionRequired')}</span>
              <span className={readyToPublish ? 'text-lg font-bold text-success' : 'text-lg font-bold text-warning'}>{readinessScore}%</span>
            </div>
            <Progress value={readinessScore} tone={readyToPublish ? 'success' : 'primary'} className="mt-3 h-1.5" />
            <p className="mt-2 text-[10px] text-content-secondary">{readyToPublish ? t('builder.preview.allPassed') : t('builder.preview.reviewMissing')}</p>
          </div>
          <div className="mt-4 space-y-2">
            <ReadinessItem label={t('builder.preview.checkSetup')} complete={courseSetupComplete} />
            <ReadinessItem label={t('builder.preview.checkCurriculum')} complete={curriculumComplete} value={curriculumComplete ? `${lessonCount} ${lessonCount === 1 ? t('builder.preview.lessonSingular') : t('builder.preview.lessonPlural')}` : t('builder.preview.addLessonsEverySection')} />
            <ReadinessItem label={t('builder.preview.checkVideo')} complete={mediaComplete} value={videoLessons.length ? `${readyVideoLessons}/${videoLessons.length} ${t('builder.preview.ready')}` : t('builder.preview.notRequired')} />
            <ReadinessItem label={t('builder.preview.checkAi')} complete={false} value={t('builder.preview.optionalOff')} />
          </div>

          <div className="mt-5 rounded-input bg-subtle p-4 text-[11px] leading-5 text-content-secondary">
            {t('builder.preview.publishNote')}
          </div>

          <Button id="publish-course" fullWidth size="lg" className="mt-5" loading={publish.isPending} disabled={!readyToPublish || isPublished || courseQuery.isLoading} onClick={publishCourse}>
            <Rocket size={17} /> {isPublished ? t('common.published') : t('builder.preview.publishCourse')}
          </Button>
          {publish.isError && <p className="mt-2 text-xs text-error">{apiErrorMessage(publish.error, t('builder.preview.publishError'))}</p>}
        </Card>
      </div>
    </div>
  )
}
