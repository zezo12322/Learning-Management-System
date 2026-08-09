'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  Lock,
  PlayCircle,
} from 'lucide-react'
import { catalogApi, enrollmentApi, progressApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import type { Lecture } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'
import { SaveButton } from '@/components/course/SaveButton'
import { TabBar } from '@/components/student/FilterChips'
import { LecturePlayer } from '@/components/learn/LecturePlayer'
import { NotesTab } from '@/components/learn/NotesTab'
import { ResourcesTab } from '@/components/learn/ResourcesTab'
import { DiscussionTab } from '@/components/learn/DiscussionTab'
import { formatDuration, cn } from '@/lib/utils'

type Tab = 'CURRICULUM' | 'NOTES' | 'RESOURCES' | 'DISCUSSION'

/**
 * Course learning screen (Figma "8. Course Learning" + tabs 9–11): secure video
 * player on top, then the lesson header and the Curriculum / Notes / Resources /
 * Discussion tabs, with Previous / Mark complete / Next at the foot.
 */
export default function LearnPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const qc = useQueryClient()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('CURRICULUM')

  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
  })
  const enrollment = useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => enrollmentApi.get(courseId),
  })
  const progress = useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => progressApi.course(courseId),
  })

  const sections = useMemo(() => curriculum.data?.sections ?? [], [curriculum.data])
  const lectures = useMemo(() => sections.flatMap((section) => section.lectures), [sections])
  const isEnrolled =
    enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'

  useEffect(() => {
    if (!activeId && lectures.length) setActiveId(lectures[0].id)
  }, [lectures, activeId])

  const activeIndex = lectures.findIndex((lecture) => lecture.id === activeId)
  const active = activeIndex >= 0 ? lectures[activeIndex] : null
  const previous = activeIndex > 0 ? lectures[activeIndex - 1] : null
  const next = activeIndex >= 0 && activeIndex < lectures.length - 1 ? lectures[activeIndex + 1] : null

  // Resume where this lecture was left off, and know whether it is already done.
  const lectureState = useQuery({
    queryKey: ['lecture-progress', activeId],
    queryFn: () => progressApi.lecture(activeId as string),
    enabled: Boolean(activeId) && isEnrolled,
  })

  const complete = useMutation({
    mutationFn: (lectureId: string) =>
      progressApi.markComplete(lectureId, lectureState.data?.lastWatchedSecond ?? 0),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course-progress', courseId] })
      qc.invalidateQueries({ queryKey: ['lecture-progress', activeId] })
      qc.invalidateQueries({ queryKey: ['continue-learning'] })
    },
  })

  if (curriculum.isLoading || enrollment.isLoading) return <PageSpinner />

  if (!isEnrolled) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <Lock size={40} className="text-content-secondary" />
        <p className="text-content-secondary">{t('learn.mustEnroll')}</p>
        <Link href={`/courses/${courseId}`}>
          <Button>{t('learn.goToCourse')}</Button>
        </Link>
      </div>
    )
  }

  const completedAt = lectureState.data?.completedAt ?? null
  const lessonNumber = activeIndex + 1

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Player */}
      {active?.type === 'VIDEO' ? (
        <LecturePlayer
          key={active.id}
          lectureId={active.id}
          title={active.title}
          posterSeed={active.id}
          resumeAtSecond={lectureState.data?.lastWatchedSecond ?? 0}
          onEnded={() => next && setActiveId(next.id)}
        />
      ) : active?.type === 'READING' ? (
        <Card className="p-6">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <FileText size={18} />
            <h2 className="font-semibold">{t('learn.reading')}</h2>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">
            {active.content?.trim() ? active.content : t('learn.readingEmpty')}
          </p>
        </Card>
      ) : active?.type === 'QUIZ' ? (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <ClipboardList size={40} className="text-primary" />
          <h2 className="text-base font-bold text-content">{active.title}</h2>
          <p className="text-sm text-content-secondary">{t('learn.quizIntro')}</p>
          <Link href={`/quiz/${courseId}/${active.id}/take`}>
            <Button>{t('learn.openQuiz')}</Button>
          </Link>
        </Card>
      ) : (
        <Card className="flex aspect-video items-center justify-center bg-content/90 text-white">
          <p className="text-sm opacity-80">{t('learn.selectLesson')}</p>
        </Card>
      )}

      {/* Lesson header */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-content"
            >
              <ArrowLeft size={13} className="rtl:rotate-180" />
              <span className="truncate">{curriculum.data?.title}</span>
            </Link>
            <h1 className="mt-1 truncate text-xl font-bold text-content">
              {active ? `${lessonNumber}. ${active.title}` : t('learn.selectLesson')}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
              {active && <span>{formatDuration(Math.round((active.duration ?? 0) / 60))}</span>}
              <span>
                {t('learn.lessonOf')
                  .replace('{n}', String(Math.max(1, lessonNumber)))
                  .replace('{total}', String(lectures.length))}
              </span>
              <Badge tone={completedAt ? 'success' : 'primary'}>
                {completedAt ? t('student.completed') : t('student.inProgress')}
              </Badge>
            </div>
          </div>
          <SaveButton courseId={courseId} className="shrink-0 border border-border" />
        </div>

        {progress.data && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-content">{t('learn.yourProgress')}</span>
              <span className="font-bold text-primary">{progress.data.overallPercentage}%</span>
            </div>
            <Progress value={progress.data.overallPercentage} />
          </div>
        )}
      </Card>

      {/* Tabs */}
      <TabBar
        items={[
          { value: 'CURRICULUM' as Tab, label: t('learn.tab.curriculum') },
          { value: 'NOTES' as Tab, label: t('learn.tab.notes') },
          { value: 'RESOURCES' as Tab, label: t('learn.tab.resources') },
          { value: 'DISCUSSION' as Tab, label: t('learn.tab.discussion') },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'CURRICULUM' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-content">{t('learn.curriculum')}</h3>
            <span className="text-xs text-content-secondary">
              {t('learning.lessons').replace('{n}', String(lectures.length))}
            </span>
          </div>
          <Card className="divide-y divide-border">
            {sections.map((section) => (
              <div key={section.id} className="p-3">
                <p className="mb-1.5 px-1 text-xs font-bold uppercase tracking-wide text-content-muted">
                  {section.title}
                </p>
                {section.lectures.map((lecture) => (
                  <LessonRow
                    key={lecture.id}
                    lecture={lecture}
                    index={lectures.findIndex((item) => item.id === lecture.id) + 1}
                    active={lecture.id === activeId}
                    onSelect={() => setActiveId(lecture.id)}
                  />
                ))}
              </div>
            ))}
          </Card>

          {active?.content?.trim() && active.type !== 'READING' && (
            <Card className="p-4">
              <h3 className="text-sm font-bold text-content">{t('learn.aboutLesson')}</h3>
              <p className="mt-1.5 whitespace-pre-wrap text-xs leading-5 text-content-secondary">
                {active.content}
              </p>
            </Card>
          )}
        </div>
      )}

      {tab === 'NOTES' && (
        <NotesTab
          lectureId={activeId}
          lectureTitle={active?.title ?? ''}
          lectureIds={lectures.map((lecture) => lecture.id)}
          currentSecond={lectureState.data?.lastWatchedSecond ?? 0}
        />
      )}

      {tab === 'RESOURCES' && <ResourcesTab sections={sections} />}

      {tab === 'DISCUSSION' && <DiscussionTab />}

      {/* Lesson navigation */}
      <Card className="flex flex-wrap items-center justify-between gap-3 p-3">
        <Button
          variant="outline"
          size="sm"
          disabled={!previous}
          onClick={() => previous && setActiveId(previous.id)}
        >
          <ArrowLeft size={15} className="rtl:rotate-180" /> {t('learn.previous')}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          loading={complete.isPending}
          disabled={!active || Boolean(completedAt)}
          onClick={() => active && complete.mutate(active.id)}
          className={completedAt ? 'text-success' : 'text-primary'}
        >
          {t(completedAt ? 'learn.completed' : 'learn.completeLesson')}
          <CheckCircle2 size={16} />
        </Button>

        <Button size="sm" disabled={!next} onClick={() => next && setActiveId(next.id)}>
          {t('learn.next')} <ArrowRight size={15} className="rtl:rotate-180" />
        </Button>
      </Card>

      {complete.isError && (
        <p className="text-center text-xs text-error">{t('learn.completeError')}</p>
      )}
    </div>
  )
}

function LessonRow({
  lecture,
  index,
  active,
  onSelect,
}: {
  lecture: Lecture
  index: number
  active: boolean
  onSelect: () => void
}) {
  const t = useT()
  const Icon = lecture.type === 'VIDEO' ? PlayCircle : lecture.type === 'QUIZ' ? ClipboardList : BookOpen
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-start text-sm transition-colors',
        active ? 'bg-brand-soft text-primary' : 'text-content hover:bg-subtle',
      )}
    >
      <Icon size={17} className="shrink-0" />
      <span className="shrink-0 text-xs font-semibold text-content-muted">{index}.</span>
      <span className="flex-1 truncate">{lecture.title}</span>
      {lecture.isFreePreview && <Badge tone="info">{t('common.preview')}</Badge>}
      {active && <Badge tone="primary">{t('learn.nowPlaying')}</Badge>}
      <span className="shrink-0 text-xs text-content-secondary">
        {formatDuration(Math.round((lecture.duration ?? 0) / 60))}
      </span>
    </button>
  )
}
