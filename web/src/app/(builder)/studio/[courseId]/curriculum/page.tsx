'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ListChecks, Pencil, Plus, Trash2 } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi } from '@/lib/api/services'
import { lectureReadiness, useCourseReadiness } from '@/lib/builder/readiness'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized, lessonCountLabel, sectionCountLabel } from '@/lib/i18n/format'
import type { AuthoringSection, Lecture, LectureType } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { useAnnounce } from '@/components/builder/BuilderAnnouncer'
import { FormField, SelectField } from '@/components/builder/FormField'
import { LectureRow } from '@/components/builder/LectureRow'
import { ReadinessPanel } from '@/components/builder/ReadinessPanel'
import { ReorderControls } from '@/components/builder/ReorderControls'
import { SectionRow } from '@/components/builder/SectionRow'
import { StudioStepLayout } from '@/components/builder/StudioStepLayout'
import { TextareaField } from '@/components/builder/TextareaField'
import { EmptyState } from '@/components/student/EmptyState'
import { FilterChips } from '@/components/student/FilterChips'
import { Button, buttonClasses } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

type LessonFilter = 'all' | 'needsMedia' | 'needsContent' | 'ready'
type AuthorableType = 'READING' | 'VIDEO' | 'QUIZ'

const AUTHORABLE_TYPES: AuthorableType[] = ['READING', 'VIDEO', 'QUIZ']

function matchesFilter(lecture: Lecture, filter: LessonFilter) {
  if (filter === 'all') return true
  const state = lectureReadiness(lecture)
  if (filter === 'ready') return state === 'ready'
  if (filter === 'needsMedia') return state === 'missing' && lecture.type === 'VIDEO'
  return state === 'missing' && lecture.type !== 'VIDEO'
}

export default function CurriculumPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const queryClient = useQueryClient()
  const announce = useAnnounce()
  const [sections, setSections] = useState<AuthoringSection[]>([])
  // A Set, not a single id: the whole curriculum has to be reviewable at once,
  // which is also what "Expand all" always claimed to do.
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<LessonFilter>('all')
  const [notice, setNotice] = useState<string | null>(null)
  const [lessonSectionId, setLessonSectionId] = useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [lessonType, setLessonType] = useState<AuthorableType>('READING')
  const [lessonError, setLessonError] = useState<string | null>(null)
  const [editingSectionId, setEditingSectionId] = useState('')
  const [sectionTitle, setSectionTitle] = useState('')
  const [deleteSectionId, setDeleteSectionId] = useState('')
  const [sectionError, setSectionError] = useState<string | null>(null)
  const [editingLectureId, setEditingLectureId] = useState('')
  const [lectureTitle, setLectureTitle] = useState('')
  const [lectureType, setLectureType] = useState<LectureType>('READING')
  const [lectureMinutes, setLectureMinutes] = useState('0')
  const [lectureError, setLectureError] = useState<string | null>(null)
  const focusSectionId = useRef('')
  // "new" is a placeholder id until the setup step creates the course —
  // GET /courses/new would just 404, so nothing is fetched until it is real.
  const isNew = courseId === 'new'
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isNew,
  })
  const readiness = useCourseReadiness(courseId)

  useEffect(() => {
    if (!course.data?.sections) return
    setSections(course.data.sections)
    setExpanded((current) => {
      if (current.size) return current
      const first = course.data.sections?.[0]?.id
      return first ? new Set([first]) : current
    })
  }, [course.data])

  const showNotice = (message: string) => {
    setNotice(message)
    announce(message)
    window.setTimeout(() => setNotice(null), 1600)
  }

  const createSection = useMutation({
    mutationFn: (title: string) => authoringApi.createSection(courseId, { title }),
  })
  const updateSection = useMutation({
    mutationFn: ({ sectionId, title }: { sectionId: string; title: string }) =>
      authoringApi.updateSection(courseId, sectionId, { title }),
  })
  const deleteSection = useMutation({
    mutationFn: (sectionId: string) => authoringApi.deleteSection(courseId, sectionId),
  })
  const createLecture = useMutation({
    mutationFn: ({ sectionId, title, content, type }: { sectionId: string; title: string; content: string; type: AuthorableType }) => authoringApi.createLecture(courseId, sectionId, {
      title,
      type,
      content: type === 'READING' ? content : '',
      duration: 0,
      isFreePreview: false,
    }),
  })
  const updateLecture = useMutation({
    mutationFn: ({ sectionId, lectureId, payload }: { sectionId: string; lectureId: string; payload: Record<string, unknown> }) =>
      authoringApi.updateLecture(courseId, sectionId, lectureId, payload),
  })
  const reorderSections = useMutation({
    mutationFn: (orderedIds: string[]) => authoringApi.reorderSections(courseId, orderedIds),
  })

  const toggleSection = (sectionId: string) =>
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })

  const openSection = (sectionId: string) =>
    setExpanded((current) => (current.has(sectionId) ? current : new Set(current).add(sectionId)))

  const addSection = async () => {
    // From max(order)+1, not length+1: after deleting a section, length-based
    // numbering handed the next section a title that already existed.
    const nextNumber = sections.reduce((max, section) => Math.max(max, section.order), 0) + 1
    const title = `${t('builder.curriculum.newSection')} ${nextNumber}`
    const created = await createSection.mutateAsync(title)
    setSections((current) => [...current, { ...created, lectures: created.lectures ?? [] }])
    openSection(created.id)
    // Focus the section that just appeared, so the keyboard lands on the new work.
    focusSectionId.current = created.id
    void queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
    showNotice(t('builder.curriculum.sectionAdded'))
  }

  const startEditingSection = (section: AuthoringSection) => {
    openSection(section.id)
    setEditingSectionId(section.id)
    setSectionTitle(section.title)
    setDeleteSectionId('')
    setSectionError(null)
    updateSection.reset()
  }

  const cancelEditingSection = () => {
    setEditingSectionId('')
    setSectionTitle('')
    setSectionError(null)
    updateSection.reset()
  }

  const saveSection = async (sectionId: string) => {
    const title = sectionTitle.trim()
    if (!title) {
      setSectionError(t('builder.curriculum.enterSectionTitle'))
      return
    }

    setSectionError(null)
    try {
      await updateSection.mutateAsync({ sectionId, title })
      setSections((current) => current.map((section) =>
        section.id === sectionId ? { ...section, title } : section
      ))
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      cancelEditingSection()
      showNotice(t('builder.curriculum.sectionUpdated'))
    } catch (error) {
      setSectionError(apiErrorMessage(error, t('builder.curriculum.sectionUpdateError')))
    }
  }

  const requestSectionDelete = (sectionId: string) => {
    openSection(sectionId)
    setDeleteSectionId(sectionId)
    setEditingSectionId('')
    setSectionTitle('')
    setSectionError(null)
    deleteSection.reset()
  }

  const cancelSectionDelete = () => {
    setDeleteSectionId('')
    setSectionError(null)
    deleteSection.reset()
  }

  const removeSection = async (sectionId: string) => {
    setSectionError(null)
    try {
      await deleteSection.mutateAsync(sectionId)
      setSections((current) => current.filter((section) => section.id !== sectionId))
      setExpanded((current) => {
        const next = new Set(current)
        next.delete(sectionId)
        return next
      })
      if (lessonSectionId === sectionId) closeLessonForm()
      setDeleteSectionId('')
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      showNotice(t('builder.curriculum.sectionDeleted'))
    } catch (error) {
      setSectionError(apiErrorMessage(error, t('builder.curriculum.sectionDeleteError')))
    }
  }

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const previous = sections
    const next = [...sections]
    ;[next[index], next[target]] = [next[target], next[index]]
    const reordered = next.map((section, order) => ({ ...section, order: order + 1 }))
    setSections(reordered)
    reorderSections.mutate(reordered.map((section) => section.id), {
      onSuccess: () => announce(t('builder.curriculum.reorderSaved')),
      onError: () => {
        // A failed PUT used to leave the UI confidently asserting an order the
        // server had rejected.
        setSections(previous)
        announce(t('builder.curriculum.reorderFailed'))
        setSectionError(t('builder.curriculum.reorderFailed'))
        void queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      },
    })
  }

  const openLessonForm = (sectionId: string) => {
    openSection(sectionId)
    setLessonSectionId(sectionId)
    setLessonTitle('')
    setLessonContent('')
    setLessonType('READING')
    setLessonError(null)
    createLecture.reset()
  }

  const closeLessonForm = () => {
    setLessonSectionId('')
    setLessonTitle('')
    setLessonContent('')
    setLessonType('READING')
    setLessonError(null)
    createLecture.reset()
  }

  const addLesson = async (sectionId: string) => {
    const title = lessonTitle.trim()
    const content = lessonContent.trim()
    if (!title || (lessonType === 'READING' && !content)) {
      setLessonError(t('builder.curriculum.enterLesson'))
      return
    }

    setLessonError(null)
    try {
      const created = await createLecture.mutateAsync({ sectionId, title, content, type: lessonType })
      setSections((current) => current.map((section) => section.id === sectionId
        ? { ...section, lectures: [...section.lectures, { ...created, order: section.lectures.length + 1 }] }
        : section))
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      closeLessonForm()
      showNotice(t('builder.curriculum.lessonAdded'))
    } catch (error) {
      setLessonError(apiErrorMessage(error, t('builder.curriculum.lessonAddError')))
    }
  }

  const startEditingLecture = (lecture: Lecture) => {
    setEditingLectureId(lecture.id)
    setLectureTitle(lecture.title)
    setLectureType(lecture.type)
    setLectureMinutes(String(Math.round(lecture.duration / 60)))
    setLectureError(null)
    updateLecture.reset()
  }

  const cancelEditingLecture = () => {
    setEditingLectureId('')
    setLectureError(null)
    updateLecture.reset()
  }

  const saveLecture = async (sectionId: string, lectureId: string) => {
    const title = lectureTitle.trim()
    const minutes = Number(lectureMinutes)
    if (!title || !Number.isFinite(minutes) || minutes < 0) {
      setLectureError(t('builder.curriculum.enterLesson'))
      return
    }

    // createLecture hard-codes `duration: 0`, which is why every lesson read
    // "0 min" and every course total "0h 0m" while duration is a headline stat.
    const duration = Math.round(minutes * 60)
    setLectureError(null)
    try {
      await updateLecture.mutateAsync({ sectionId, lectureId, payload: { title, type: lectureType, duration } })
      setSections((current) => current.map((section) => section.id === sectionId
        ? {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.id === lectureId ? { ...lecture, title, type: lectureType, duration } : lecture
            ),
          }
        : section))
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      cancelEditingLecture()
      showNotice(t('builder.curriculum.lessonSaved'))
    } catch (error) {
      setLectureError(apiErrorMessage(error, t('builder.curriculum.lessonSaveFailed')))
    }
  }

  const allLectures = useMemo(() => sections.flatMap((section) => section.lectures), [sections])
  const totalLessons = allLectures.length
  const totalSeconds = useMemo(
    () => allLectures.reduce((sum, lecture) => sum + lecture.duration, 0),
    [allLectures]
  )
  const filterCounts = useMemo(() => ({
    all: allLectures.length,
    needsMedia: allLectures.filter((lecture) => matchesFilter(lecture, 'needsMedia')).length,
    needsContent: allLectures.filter((lecture) => matchesFilter(lecture, 'needsContent')).length,
    ready: allLectures.filter((lecture) => matchesFilter(lecture, 'ready')).length,
  }), [allLectures])

  const visibleSections = useMemo(
    () => (filter === 'all'
      ? sections
      : sections.filter((section) => section.lectures.some((lecture) => matchesFilter(lecture, filter)))),
    [filter, sections]
  )
  const allExpanded = sections.length > 0 && sections.every((section) => expanded.has(section.id))

  if (isNew) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('builder.curriculum.title')} description={t('builder.curriculum.subtitle')} />
        <Card className="p-6">
          <h2 className="text-base font-semibold text-content">{t('builder.curriculum.needsCourseTitle')}</h2>
          <p className="mt-2 max-w-lg text-xs leading-5 text-content-secondary">
            {t('builder.curriculum.needsCourseBody')}
          </p>
          {/* buttonClasses on the anchor: a <Button> inside a <Link> is invalid
              HTML and adds a dead keyboard stop. */}
          <Link href="/studio/new/setup" className={buttonClasses({ className: 'mt-5' })}>
            {t('builder.curriculum.goToSetup')}
          </Link>
        </Card>
      </div>
    )
  }

  const stats = (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          [t('builder.curriculum.statSections'), String(sections.length)],
          [t('builder.curriculum.statLessons'), String(totalLessons)],
          [t('builder.curriculum.statDuration'), formatSecondsLocalized(totalSeconds, t)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-input bg-subtle p-3">
            <p className="text-[10px] text-content-secondary">{label}</p>
            <p className="mt-1 text-sm font-bold text-content">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('builder.curriculum.title')}
        description={t('builder.curriculum.subtitle')}
        action={
          <div className="flex items-center gap-3">
            {notice && <span className="text-xs font-medium text-success">{notice}</span>}
            <Button onClick={addSection} loading={createSection.isPending}><Plus size={16} aria-hidden /> {t('builder.curriculum.addSection')}</Button>
          </div>
        }
      />

      <StudioStepLayout
        railLabel={t('builder.readiness.title')}
        rail={
          <div className="space-y-5">
            {stats}
            <ReadinessPanel
              title={t('builder.readiness.title')}
              score={readiness.score}
              checks={readiness.checks}
            />
          </div>
        }
      >
        <Card className="p-4 sm:p-5">
          {course.isError && <div role="alert" className="mb-4 rounded-input bg-error-soft p-3 text-xs text-error">{t('builder.curriculum.loadError')}</div>}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-content-secondary">
            <span>
              {sectionCountLabel(sections.length, t)} · {lessonCountLabel(totalLessons, t)} · {formatSecondsLocalized(totalSeconds, t)}
            </span>
            <button
              type="button"
              onClick={() => setExpanded(allExpanded ? new Set() : new Set(sections.map((section) => section.id)))}
              className="font-semibold text-primary"
            >
              {allExpanded ? t('builder.curriculum.collapseAll') : t('builder.curriculum.expandAll')}
            </button>
          </div>

          {sections.length > 0 && (
            <div role="group" aria-label={t('builder.curriculum.filterLabel')} className="mb-4">
              <FilterChips
                value={filter}
                onChange={setFilter}
                items={[
                  { value: 'all', label: t('builder.curriculum.filter.all'), count: filterCounts.all },
                  { value: 'needsMedia', label: t('builder.curriculum.filter.needsMedia'), count: filterCounts.needsMedia },
                  { value: 'needsContent', label: t('builder.curriculum.filter.needsContent'), count: filterCounts.needsContent },
                  { value: 'ready', label: t('builder.curriculum.filter.ready'), count: filterCounts.ready },
                ]}
              />
            </div>
          )}

          {course.isLoading ? (
            // A loading course and a genuinely empty course used to be
            // pixel-identical: both rendered nothing at all.
            <div aria-busy="true" className="space-y-3">
              <p className="text-xs text-content-secondary">{t('builder.curriculum.loading')}</p>
              {[0, 1, 2].map((row) => <Skeleton key={row} className="h-[76px] w-full rounded-card" />)}
            </div>
          ) : sections.length === 0 ? (
            <div>
              <EmptyState
                // h2: in the DOM the work column precedes the rail, so the
                // ReadinessPanel h2 comes AFTER this and the nearest preceding
                // heading is PageHeader's h1.
                headingLevel="h2"
                icon={ListChecks}
                title={t('builder.curriculum.empty.title')}
                description={t('builder.curriculum.empty.body')}
                className="pb-6"
              />
              <div className="flex justify-center pb-6">
                <Button onClick={addSection} loading={createSection.isPending}>
                  <Plus size={16} aria-hidden /> {t('builder.curriculum.empty.action')}
                </Button>
              </div>
            </div>
          ) : visibleSections.length === 0 ? (
            <p className="rounded-input bg-subtle px-4 py-6 text-center text-xs text-content-secondary">
              {t('builder.curriculum.noMatch')}
            </p>
          ) : (
            <div className="space-y-3">
              {visibleSections.map((section) => {
                const sectionIndex = sections.findIndex((item) => item.id === section.id)
                const open = expanded.has(section.id)
                const lessons = section.lectures.filter((lecture) => matchesFilter(lecture, filter))
                return (
                  <SectionRow
                    key={section.id}
                    section={section}
                    index={sectionIndex}
                    expanded={open}
                    onToggle={() => toggleSection(section.id)}
                    toggleRef={(node) => {
                      if (node && focusSectionId.current === section.id) {
                        focusSectionId.current = ''
                        node.focus()
                      }
                    }}
                    reorder={
                      <ReorderControls
                        name={section.title}
                        isFirst={sectionIndex === 0}
                        isLast={sectionIndex === sections.length - 1}
                        onMoveUp={() => moveSection(sectionIndex, -1)}
                        onMoveDown={() => moveSection(sectionIndex, 1)}
                      />
                    }
                    actions={
                      <>
                        <button
                          type="button"
                          onClick={() => startEditingSection(section)}
                          disabled={updateSection.isPending || deleteSection.isPending}
                          className="shrink-0 rounded-lg p-2 text-content-muted hover:bg-surface hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`${t('builder.curriculum.edit')} — ${section.title}`}
                        >
                          <Pencil size={15} aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestSectionDelete(section.id)}
                          disabled={updateSection.isPending || deleteSection.isPending}
                          className="shrink-0 rounded-lg p-2 text-content-muted hover:bg-error-soft hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`${t('builder.curriculum.delete')} — ${section.title}`}
                        >
                          <Trash2 size={15} aria-hidden />
                        </button>
                      </>
                    }
                  >
                    <div className="divide-y divide-border">
                      {editingSectionId === section.id && (
                        <div className="space-y-3 bg-subtle p-4">
                          <FormField id={`section-title-${section.id}`} label={t('builder.curriculum.sectionTitleLabel')}>
                            {(field) => (
                              <Input
                                {...field}
                                value={sectionTitle}
                                onChange={(event) => setSectionTitle(event.target.value)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter') void saveSection(section.id)
                                  if (event.key === 'Escape') cancelEditingSection()
                                }}
                                maxLength={120}
                                autoFocus
                              />
                            )}
                          </FormField>
                          {sectionError && <p role="alert" className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{sectionError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={cancelEditingSection} disabled={updateSection.isPending}>{t('common.cancel')}</Button>
                            <Button size="sm" onClick={() => void saveSection(section.id)} loading={updateSection.isPending}>{t('builder.curriculum.saveChanges')}</Button>
                          </div>
                        </div>
                      )}

                      {deleteSectionId === section.id && (
                        <div className="space-y-3 bg-error-soft/60 p-4">
                          {/* One interpolated sentence per locale, instead of
                              gluing four fragments around a Latin "?". */}
                          <p className="text-sm font-semibold text-content">
                            {t('builder.curriculum.deleteSectionConfirm')
                              .replace('{name}', section.title)
                              .replace('{n}', String(section.lectures.length))}
                          </p>
                          {sectionError && <p role="alert" className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{sectionError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={cancelSectionDelete} disabled={deleteSection.isPending}>{t('common.cancel')}</Button>
                            <Button variant="danger" size="sm" onClick={() => void removeSection(section.id)} loading={deleteSection.isPending}>
                              <Trash2 size={14} aria-hidden /> {t('builder.curriculum.deleteSection')}
                            </Button>
                          </div>
                        </div>
                      )}

                      <ul role="list" className="divide-y divide-border">
                        {lessons.map((lecture) => (
                          <LectureRow
                            key={lecture.id}
                            lecture={lecture}
                            // Position within the section, not within the filtered
                            // view, so a filter never renumbers the curriculum.
                            index={section.lectures.indexOf(lecture) + 1}
                            density="comfortable"
                            readiness={lectureReadiness(lecture)}
                            onEdit={() => startEditingLecture(lecture)}
                            quizHref={lecture.type === 'QUIZ' ? `/quiz/${courseId}/${lecture.id}` : undefined}
                          >
                            {editingLectureId === lecture.id && (
                              <div className="space-y-3 bg-subtle p-4">
                                <FormField id={`lecture-title-${lecture.id}`} label={t('builder.curriculum.lessonTitleLabel')}>
                                  {(field) => (
                                    <Input
                                      {...field}
                                      value={lectureTitle}
                                      onChange={(event) => setLectureTitle(event.target.value)}
                                      maxLength={120}
                                      autoFocus
                                    />
                                  )}
                                </FormField>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <FormField id={`lecture-type-${lecture.id}`} label={t('builder.curriculum.lessonTypeLabel')}>
                                    {(field) => (
                                      <SelectField
                                        id={field.id}
                                        describedBy={field['aria-describedby']}
                                        value={lectureType}
                                        onChange={(event) => setLectureType(event.target.value as LectureType)}
                                      >
                                        {AUTHORABLE_TYPES.map((type) => (
                                          <option key={type} value={type}>{t(`builder.curriculum.type.${type}`)}</option>
                                        ))}
                                      </SelectField>
                                    )}
                                  </FormField>
                                  <FormField
                                    id={`lecture-duration-${lecture.id}`}
                                    label={t('builder.curriculum.durationLabel')}
                                    hint={t('builder.curriculum.durationHint')}
                                  >
                                    {(field) => (
                                      <Input
                                        {...field}
                                        type="number"
                                        min="0"
                                        inputMode="numeric"
                                        value={lectureMinutes}
                                        onChange={(event) => setLectureMinutes(event.target.value)}
                                      />
                                    )}
                                  </FormField>
                                </div>
                                {lectureError && <p role="alert" className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{lectureError}</p>}
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditingLecture} disabled={updateLecture.isPending}>{t('common.cancel')}</Button>
                                  <Button size="sm" onClick={() => void saveLecture(section.id, lecture.id)} loading={updateLecture.isPending}>{t('builder.curriculum.saveLesson')}</Button>
                                </div>
                              </div>
                            )}
                          </LectureRow>
                        ))}
                      </ul>

                      {lessonSectionId === section.id ? (
                        <div className="space-y-3 bg-subtle p-4">
                          <FormField id={`lesson-title-${section.id}`} label={t('builder.curriculum.lessonTitleLabel')}>
                            {(field) => (
                              <Input
                                {...field}
                                value={lessonTitle}
                                onChange={(event) => setLessonTitle(event.target.value)}
                                placeholder={t('builder.curriculum.lessonTitlePlaceholder')}
                                maxLength={120}
                              />
                            )}
                          </FormField>
                          <div>
                            {/* The caption is tied to the toggle set with
                                role="group" + aria-labelledby, matching the
                                filter row further down. As a bare span the three
                                aria-pressed buttons had no group name, so a
                                screen-reader user heard "Reading, toggle button,
                                pressed" with nothing saying what was chosen. */}
                            <span id={`lesson-type-label-${section.id}`} className="text-xs font-semibold text-content">{t('builder.curriculum.lessonTypeLabel')}</span>
                            <div
                              role="group"
                              aria-labelledby={`lesson-type-label-${section.id}`}
                              className="mt-2 flex gap-2"
                            >
                              {AUTHORABLE_TYPES.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  aria-pressed={lessonType === type}
                                  onClick={() => setLessonType(type)}
                                  className={lessonType === type
                                    ? 'rounded-input border border-primary bg-brand-soft px-3 py-1.5 text-xs font-semibold text-on-brand-soft'
                                    : 'rounded-input border border-border px-3 py-1.5 text-xs font-semibold text-content-secondary'}
                                >
                                  {t(`builder.curriculum.type.${type}`)}
                                </button>
                              ))}
                            </div>
                          </div>
                          {lessonType === 'READING' ? (
                            <FormField id={`lesson-content-${section.id}`} label={t('builder.curriculum.lessonContentLabel')}>
                              {(field) => (
                                <TextareaField
                                  id={field.id}
                                  describedBy={field['aria-describedby']}
                                  value={lessonContent}
                                  onChange={(event) => setLessonContent(event.target.value)}
                                  placeholder={t('builder.curriculum.lessonContentPlaceholder')}
                                  rows={4}
                                />
                              )}
                            </FormField>
                          ) : (
                            <p className="rounded-input bg-brand-soft px-3 py-2 text-xs text-content-secondary">
                              {lessonType === 'VIDEO' ? t('builder.curriculum.videoNote') : t('builder.curriculum.quizNote')}
                            </p>
                          )}
                          {lessonError && <p role="alert" className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{lessonError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={closeLessonForm} disabled={createLecture.isPending}>{t('common.cancel')}</Button>
                            <Button size="sm" onClick={() => void addLesson(section.id)} loading={createLecture.isPending}>{t('builder.curriculum.addLesson')}</Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openLessonForm(section.id)}
                          className="flex w-full items-center justify-center gap-2 bg-subtle py-4 text-xs font-semibold text-primary"
                        >
                          <Plus size={15} aria-hidden /> {t('builder.curriculum.addLesson')}
                        </button>
                      )}
                    </div>
                  </SectionRow>
                )
              })}
            </div>
          )}
        </Card>
      </StudioStepLayout>
    </div>
  )
}
