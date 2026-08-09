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
  /** Live playback position for the active lecture, reported by the player. */
  const [position, setPosition] = useState(0)

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

  const allSections = useMemo(() => curriculum.data?.sections ?? [], [curriculum.data])
  const isEnrolled =
    enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'

  // Without an enrollment the screen is limited to the lessons the instructor
  // marked as free previews — the lecture and stream endpoints open exactly
  // those to any signed-in user, so this is a real preview, not a teaser.
  const sections = useMemo(
    () =>
      isEnrolled
        ? allSections
        : allSections
            .map((section) => ({
              ...section,
              lectures: section.lectures.filter((lecture) => lecture.isFreePreview),
            }))
            .filter((section) => section.lectures.length > 0),
    [allSections, isEnrolled],
  )
  const lectures = useMemo(() => sections.flatMap((section) => section.lectures), [sections])
  const previewOnly = !isEnrolled && lectures.length > 0

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

  // Reset the reported position when the lecture changes, so one lesson's
  // progress can never be written against another.
  useEffect(() => {
    setPosition(0)
  }, [activeId])

  const storedSecond = lectureState.data?.lastWatchedSecond ?? 0
  /** Watch time already banked server-side, which seeds the player's accumulator. */
  const storedWatchedSeconds = lectureState.data?.watchedSeconds ?? 0
  /**
   * Never send a position behind what the server already has. The sync write
   * re-derives completion from the position it receives and overwrites
   * `completedAt` — so posting a stale value would rewind the saved place and
   * un-complete a lecture the heartbeat had already finished.
   */
  const furthestSecond = Math.max(position, storedSecond)

  const complete = useMutation({
    mutationFn: (lectureId: string) => progressApi.markComplete(lectureId, furthestSecond),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course-progress', courseId] })
      qc.invalidateQueries({ queryKey: ['lecture-progress', activeId] })
      qc.invalidateQueries({ queryKey: ['continue-learning'] })
    },
  })

  if (curriculum.isLoading || enrollment.isLoading) return <PageSpinner />

  // A failed lookup is not a negative answer: locking an enrolled learner out
  // of a lesson they paid for because a request dropped is the worse failure.
  if (enrollment.isError || curriculum.isError) {
    return (
      <Card className="mx-auto max-w-lg space-y-3 p-8 text-center">
        <p className="text-sm text-error">{t('learn.loadError')}</p>
        <Button
          variant="outline"
          onClick={() => {
            void enrollment.refetch()
            void curriculum.refetch()
          }}
        >
          {t('learn.player.retry')}
        </Button>
      </Card>
    )
  }

  if (!isEnrolled && lectures.length === 0) {
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
  /**
   * Completion is derived server-side at 90% of the lecture's stored duration,
   * and the `completed` flag a client sends is ignored. So the button is only
   * offered once the learner has actually reached that point — otherwise it
   * would report success while changing nothing.
   */
  const duration = active?.duration ?? 0
  const canComplete = duration > 0 && furthestSecond >= duration * 0.9

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {previewOnly && (
        <Card className="flex flex-wrap items-center justify-between gap-3 bg-brand-soft p-4">
          <p className="text-sm font-semibold text-primary">{t('learn.previewOnly')}</p>
          <Link href={`/courses/${courseId}`}>
            <Button size="sm">{t('learn.enrollForFull')}</Button>
          </Link>
        </Card>
      )}

      {/* Player */}
      {active?.type === 'VIDEO' ? (
        <LecturePlayer
          key={active.id}
          lectureId={active.id}
          title={active.title}
          posterSeed={active.id}
          resumeAtSecond={storedSecond}
          watchedSecondsSoFar={storedWatchedSeconds}
          onPosition={setPosition}
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
      ) : active ? (
        <Card className="flex aspect-video flex-col items-center justify-center gap-2 p-8 text-center">
          <BookOpen size={36} className="text-content-muted" />
          <h2 className="text-base font-bold text-content">{active.title}</h2>
          <p className="text-sm text-content-secondary">{t('learn.unsupportedType')}</p>
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
          currentSecond={furthestSecond}
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
          disabled={!active || previewOnly || Boolean(completedAt) || !canComplete}
          title={!canComplete && !completedAt ? t('learn.completeHint') : undefined}
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
      {active && !previewOnly && !completedAt && !canComplete && (
        <p className="text-center text-xs text-content-secondary">
          {duration > 0 ? t('learn.completeHint') : t('learn.completeNoDuration')}
        </p>
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
