'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BookOpen, Check, ChevronDown, Clock, Globe2, Play, Rocket } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { ReadinessItem } from '@/components/builder/ReadinessItem'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function PreviewPage() {
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
      <PageHeader title="Preview & publish" description="Review the learner experience and resolve required checks before publishing." />

      {courseQuery.isError && <Card className="border-error/20 bg-error/10 p-4 text-sm text-error">The course could not be loaded. Try again in a moment.</Card>}

      {published && (
        <Card className="border-success/20 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="inline-flex items-center gap-2"><Check size={17} /> Course published successfully.</span>
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
              <p className="text-[9px] font-semibold tracking-wide text-primary">{course?.category?.toUpperCase() ?? 'UNCATEGORIZED'} · {course?.level ?? 'BEGINNER'}</p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-content">{course?.title ?? 'Loading course…'}</h1>
              <p className="mt-3 max-w-xl text-xs leading-5 text-content-secondary">{course?.description || 'Add a course description before publishing.'}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill tone="neutral" dot={false}><BookOpen size={12} /> {lessonCount} lessons</StatusPill>
                <StatusPill tone="neutral" dot={false}><Clock size={12} /> {Math.floor(totalSeconds / 3600)}h {Math.round((totalSeconds % 3600) / 60)}m</StatusPill>
                <StatusPill tone="neutral" dot={false}><Globe2 size={12} /> {course?.language ?? 'Not set'}</StatusPill>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex gap-5 border-b border-border pb-4 text-xs font-semibold"><button className="text-content-secondary">Overview</button><button className="text-primary">Curriculum</button><button className="text-content-secondary">Instructor</button></div>
            <h2 className="mt-6 text-lg font-semibold text-content">Course curriculum</h2>
            <p className="mt-1 text-[11px] text-content-secondary">{sections.length} {sections.length === 1 ? 'section' : 'sections'} · {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}</p>

            <div className="mt-5 space-y-3">
              {sections.map((section, index) => {
                const open = openSection === section.id
                return (
                  <div key={section.id} className="overflow-hidden rounded-input border border-border">
                    <button onClick={() => setOpenSection(open ? '' : section.id)} className={open ? 'flex w-full items-center gap-3 bg-brand-soft p-3 text-left sm:p-4' : 'flex w-full items-center gap-3 bg-surface p-3 text-left sm:p-4'}>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-[10px] font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-content">{section.title}</span><span className="mt-1 block text-[9px] text-content-secondary">{section.lectures.length} lessons</span></span>
                      <ChevronDown size={15} className={open ? 'rotate-180 text-primary transition-transform' : 'text-content-muted transition-transform'} />
                    </button>
                    {open && section.lectures.slice(0, 2).map((lecture) => (
                      <div key={lecture.id} className="flex items-center gap-3 border-t border-border px-4 py-3 text-xs"><Play size={13} className="text-secondary" /><span className="flex-1 text-content">{lecture.title}</span><span className="text-[10px] text-content-muted">{Math.round(lecture.duration / 60)} min</span></div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <Card className="h-fit p-5 xl:sticky xl:top-24">
          <h2 className="text-base font-semibold text-content">Publish readiness</h2>
          <p className="mt-2 text-[11px] leading-5 text-content-secondary">
            {courseQuery.isLoading
              ? 'Checking course requirements…'
              : readyToPublish
                ? 'All required course checks are complete. AI remains optional.'
                : 'Complete the missing requirements before publishing.'}
          </p>
          <div className={readyToPublish ? 'mt-5 rounded-input bg-success/10 p-4' : 'mt-5 rounded-input bg-warning/10 p-4'}>
            <div className="flex items-center justify-between">
              <span className={readyToPublish ? 'text-xs font-semibold text-success' : 'text-xs font-semibold text-warning'}>{readyToPublish ? 'Ready to publish' : 'Action required'}</span>
              <span className={readyToPublish ? 'text-lg font-bold text-success' : 'text-lg font-bold text-warning'}>{readinessScore}%</span>
            </div>
            <Progress value={readinessScore} tone={readyToPublish ? 'success' : 'primary'} className="mt-3 h-1.5" />
            <p className="mt-2 text-[10px] text-content-secondary">{readyToPublish ? 'All required checks passed.' : 'Review the missing items below.'}</p>
          </div>
          <div className="mt-4 space-y-2">
            <ReadinessItem label="Course setup" complete={courseSetupComplete} />
            <ReadinessItem label="Curriculum" complete={curriculumComplete} value={curriculumComplete ? `${lessonCount} ${lessonCount === 1 ? 'lesson' : 'lessons'}` : 'Add lessons to every section'} />
            <ReadinessItem label="Video media" complete={mediaComplete} value={videoLessons.length ? `${readyVideoLessons}/${videoLessons.length} ready` : 'Not required'} />
            <ReadinessItem label="AI tutor" complete={false} value="Optional · Off" />
          </div>

          <div className="mt-5 rounded-input bg-subtle p-4 text-[11px] leading-5 text-content-secondary">
            Publishing makes this course available in the learner catalog. AI tools remain optional and are coming soon.
          </div>

          <Button id="publish-course" fullWidth size="lg" className="mt-5" loading={publish.isPending} disabled={!readyToPublish || isPublished || courseQuery.isLoading} onClick={publishCourse}>
            <Rocket size={17} /> {isPublished ? 'Published' : 'Publish course'}
          </Button>
          {publish.isError && <p className="mt-2 text-xs text-error">{apiErrorMessage(publish.error, 'The course could not be published. Try again.')}</p>}
        </Card>
      </div>
    </div>
  )
}
