'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, ChevronUp, FileText, GripVertical, ListChecks, MoreHorizontal, Pencil, Play, Plus, Trash2 } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import type { AuthoringSection } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { ReadinessItem } from '@/components/builder/ReadinessItem'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CurriculumPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const queryClient = useQueryClient()
  const [sections, setSections] = useState<AuthoringSection[]>([])
  const [expanded, setExpanded] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [lessonSectionId, setLessonSectionId] = useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [lessonType, setLessonType] = useState<'READING' | 'VIDEO' | 'QUIZ'>('READING')
  const [lessonError, setLessonError] = useState<string | null>(null)
  const [editingSectionId, setEditingSectionId] = useState('')
  const [sectionTitle, setSectionTitle] = useState('')
  const [deleteSectionId, setDeleteSectionId] = useState('')
  const [sectionError, setSectionError] = useState<string | null>(null)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
  })

  useEffect(() => {
    if (!course.data?.sections) return
    setSections(course.data.sections)
    setExpanded((current) => current || course.data.sections?.[0]?.id || '')
  }, [course.data])

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
    mutationFn: ({ sectionId, title, content, type }: { sectionId: string; title: string; content: string; type: 'READING' | 'VIDEO' | 'QUIZ' }) => authoringApi.createLecture(courseId, sectionId, {
      title,
      type,
      content: type === 'READING' ? content : '',
      duration: 0,
      isFreePreview: false,
    }),
  })
  const reorderSections = useMutation({
    mutationFn: (orderedIds: string[]) => authoringApi.reorderSections(courseId, orderedIds),
  })

  const addSection = async () => {
    const title = `${t('builder.curriculum.newSection')} ${sections.length + 1}`
    const created = await createSection.mutateAsync(title)
    setSections((current) => [...current, { ...created, lectures: created.lectures ?? [] }])
    void queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
    setNotice(t('builder.curriculum.sectionAdded'))
    window.setTimeout(() => setNotice(null), 1600)
  }

  const startEditingSection = (section: AuthoringSection) => {
    setExpanded(section.id)
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
      setNotice(t('builder.curriculum.sectionUpdated'))
      window.setTimeout(() => setNotice(null), 1600)
    } catch (error) {
      setSectionError(apiErrorMessage(error, t('builder.curriculum.sectionUpdateError')))
    }
  }

  const requestSectionDelete = (sectionId: string) => {
    setExpanded(sectionId)
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
      const remainingSections = sections.filter((section) => section.id !== sectionId)
      setSections(remainingSections)
      setExpanded((current) => current === sectionId ? remainingSections[0]?.id ?? '' : current)
      if (lessonSectionId === sectionId) closeLessonForm()
      setDeleteSectionId('')
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      setNotice(t('builder.curriculum.sectionDeleted'))
      window.setTimeout(() => setNotice(null), 1600)
    } catch (error) {
      setSectionError(apiErrorMessage(error, t('builder.curriculum.sectionDeleteError')))
    }
  }

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const next = [...sections]
    ;[next[index], next[target]] = [next[target], next[index]]
    const reordered = next.map((section, order) => ({ ...section, order: order + 1 }))
    setSections(reordered)
    reorderSections.mutate(reordered.map((section) => section.id))
  }

  const openLessonForm = (sectionId: string) => {
    setExpanded(sectionId)
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
      setNotice(t('builder.curriculum.lessonAdded'))
      window.setTimeout(() => setNotice(null), 1600)
    } catch (error) {
      setLessonError(apiErrorMessage(error, t('builder.curriculum.lessonAddError')))
    }
  }

  const totalLessons = useMemo(() => sections.reduce((sum, section) => sum + section.lectures.length, 0), [sections])
  const totalSeconds = useMemo(() => sections.flatMap((section) => section.lectures).reduce((sum, lecture) => sum + lecture.duration, 0), [sections])

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('builder.curriculum.title')}
        description={t('builder.curriculum.subtitle')}
        action={<div className="flex items-center gap-3">{notice && <span className="text-xs font-medium text-success">{notice}</span>}<Button onClick={addSection} loading={createSection.isPending}><Plus size={16} /> {t('builder.curriculum.addSection')}</Button></div>}
      />

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_302px]">
        <Card className="p-4 sm:p-5">
          {course.isError && <div className="mb-4 rounded-input bg-error/10 p-3 text-xs text-error">{t('builder.curriculum.loadError')}</div>}
          <div className="mb-4 flex items-center justify-between text-xs text-content-secondary">
            <span>{sections.length} {t('builder.curriculum.sections')} · {totalLessons} {t('builder.curriculum.lessons')} · {Math.floor(totalSeconds / 3600)}h {Math.round((totalSeconds % 3600) / 60)}m</span>
            <button onClick={() => setExpanded(expanded ? '' : sections[0]?.id)} className="font-semibold text-primary">{expanded ? t('builder.curriculum.collapseAll') : t('builder.curriculum.expandFirst')}</button>
          </div>

          <div className="space-y-3">
            {sections.map((section, sectionIndex) => {
              const open = expanded === section.id
              return (
                <div key={section.id} className="overflow-hidden rounded-card border border-border bg-surface">
                  <div className={open ? 'flex items-center gap-3 bg-brand-soft px-3 py-4 sm:px-4' : 'flex items-center gap-3 px-3 py-4 sm:px-4'}>
                    <GripVertical size={17} className="shrink-0 text-content-muted" />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary ring-1 ring-border">{String(sectionIndex + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-content">{section.title}</p>
                      <p className="mt-1 text-[10px] text-content-secondary">{section.lectures.length} {t('builder.curriculum.lessons')}</p>
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                      <button onClick={() => moveSection(sectionIndex, -1)} className="rounded-lg p-2 text-content-muted hover:bg-surface hover:text-content" aria-label={t('builder.curriculum.moveUp')}><ChevronUp size={15} /></button>
                      <button onClick={() => moveSection(sectionIndex, 1)} className="rounded-lg p-2 text-content-muted hover:bg-surface hover:text-content" aria-label={t('builder.curriculum.moveDown')}><ChevronDown size={15} /></button>
                    </div>
                    <button
                      onClick={() => startEditingSection(section)}
                      disabled={updateSection.isPending || deleteSection.isPending}
                      className="rounded-lg p-2 text-content-muted hover:bg-surface hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`${t('builder.curriculum.edit')} ${section.title}`}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => requestSectionDelete(section.id)}
                      disabled={updateSection.isPending || deleteSection.isPending}
                      className="rounded-lg p-2 text-content-muted hover:bg-error/10 hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`${t('builder.curriculum.delete')} ${section.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                    <button onClick={() => setExpanded(open ? '' : section.id)} className="rounded-lg p-2 text-primary" aria-label={t('builder.curriculum.toggleSection')}>{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
                  </div>

                  {open && (
                    <div className="divide-y divide-border">
                      {editingSectionId === section.id && (
                        <div className="space-y-3 bg-subtle p-4">
                          <div>
                            <label htmlFor={`section-title-${section.id}`} className="text-xs font-semibold text-content">{t('builder.curriculum.sectionTitleLabel')}</label>
                            <Input
                              id={`section-title-${section.id}`}
                              value={sectionTitle}
                              onChange={(event) => setSectionTitle(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') void saveSection(section.id)
                                if (event.key === 'Escape') cancelEditingSection()
                              }}
                              className="mt-2"
                              maxLength={120}
                              autoFocus
                            />
                          </div>
                          {sectionError && <p className="rounded-input bg-error/10 px-3 py-2 text-xs text-error">{sectionError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={cancelEditingSection} disabled={updateSection.isPending}>{t('common.cancel')}</Button>
                            <Button size="sm" onClick={() => void saveSection(section.id)} loading={updateSection.isPending}>{t('builder.curriculum.saveChanges')}</Button>
                          </div>
                        </div>
                      )}

                      {deleteSectionId === section.id && (
                        <div className="space-y-3 bg-error/5 p-4">
                          <div>
                            <p className="text-sm font-semibold text-content">{t('builder.curriculum.deletePrompt')} “{section.title}”?</p>
                            <p className="mt-1 text-xs leading-5 text-content-secondary">
                              {t('builder.curriculum.deleteBodyBefore')} {section.lectures.length} {section.lectures.length === 1 ? t('builder.curriculum.lessonSingular') : t('builder.curriculum.lessonPlural')} {t('builder.curriculum.deleteBodyAfter')}
                            </p>
                          </div>
                          {sectionError && <p className="rounded-input bg-error/10 px-3 py-2 text-xs text-error">{sectionError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={cancelSectionDelete} disabled={deleteSection.isPending}>{t('common.cancel')}</Button>
                            <Button variant="danger" size="sm" onClick={() => void removeSection(section.id)} loading={deleteSection.isPending}>
                              <Trash2 size={14} /> {t('builder.curriculum.deleteSection')}
                            </Button>
                          </div>
                        </div>
                      )}

                      {section.lectures.map((lecture) => {
                        const ready = lecture.type === 'VIDEO' ? Boolean(lecture.videoUrl) : Boolean(lecture.content)
                        return (
                          <div key={lecture.id} className="flex items-center gap-3 px-3 py-4 sm:px-4">
                            <GripVertical size={15} className="shrink-0 text-content-muted" />
                            <span className={lecture.type === 'VIDEO' ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary' : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-subtle text-content-secondary'}>
                              {lecture.type === 'VIDEO' ? <Play size={14} /> : lecture.type === 'QUIZ' ? <ListChecks size={14} /> : <FileText size={14} />}
                            </span>
                            <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-content">{lecture.title}</span><span className="mt-1 block text-[10px] text-content-muted">{t(`builder.curriculum.type.${lecture.type}`, lecture.type.toLowerCase())} · {Math.round(lecture.duration / 60)} {t('builder.curriculum.min')}</span></span>
                            {lecture.type === 'QUIZ' && (
                              <Link href={`/quiz/${courseId}/${lecture.id}`} className="inline-flex shrink-0 items-center gap-1 rounded-input border border-border px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-brand-soft">
                                <ListChecks size={13} /> {t('builder.curriculum.manageQuiz')}
                              </Link>
                            )}
                            <StatusPill tone={ready ? 'success' : 'warning'}>{ready ? t('builder.curriculum.ready') : lecture.type === 'VIDEO' ? t('builder.curriculum.needsMedia') : lecture.type === 'QUIZ' ? t('builder.curriculum.type.QUIZ') : t('common.draft')}</StatusPill>
                            <button className="p-1.5 text-content-muted"><MoreHorizontal size={16} /></button>
                          </div>
                        )
                      })}
                      {lessonSectionId === section.id ? (
                        <div className="space-y-3 bg-subtle p-4">
                          <div>
                            <label htmlFor={`lesson-title-${section.id}`} className="text-xs font-semibold text-content">{t('builder.curriculum.lessonTitleLabel')}</label>
                            <Input
                              id={`lesson-title-${section.id}`}
                              value={lessonTitle}
                              onChange={(event) => setLessonTitle(event.target.value)}
                              placeholder={t('builder.curriculum.lessonTitlePlaceholder')}
                              className="mt-2"
                              maxLength={120}
                            />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-content">{t('builder.curriculum.lessonTypeLabel')}</span>
                            <div className="mt-2 flex gap-2">
                              {(['READING', 'VIDEO', 'QUIZ'] as const).map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setLessonType(type)}
                                  className={lessonType === type
                                    ? 'rounded-input border border-primary bg-brand-soft px-3 py-1.5 text-xs font-semibold text-primary'
                                    : 'rounded-input border border-border px-3 py-1.5 text-xs font-semibold text-content-secondary'}
                                >
                                  {t(`builder.curriculum.type.${type}`)}
                                </button>
                              ))}
                            </div>
                          </div>
                          {lessonType === 'READING' ? (
                            <div>
                              <label htmlFor={`lesson-content-${section.id}`} className="text-xs font-semibold text-content">{t('builder.curriculum.lessonContentLabel')}</label>
                              <textarea
                                id={`lesson-content-${section.id}`}
                                value={lessonContent}
                                onChange={(event) => setLessonContent(event.target.value)}
                                placeholder={t('builder.curriculum.lessonContentPlaceholder')}
                                rows={4}
                                className="mt-2 w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          ) : lessonType === 'VIDEO' ? (
                            <p className="rounded-input bg-brand-soft px-3 py-2 text-xs text-content-secondary">
                              {t('builder.curriculum.videoNoteBefore')} <span className="font-semibold text-primary">{t('builder.curriculum.mediaStep')}</span> {t('builder.curriculum.videoNoteAfter')}
                            </p>
                          ) : (
                            <p className="rounded-input bg-brand-soft px-3 py-2 text-xs text-content-secondary">
                              {t('builder.curriculum.quizNoteBefore')} “{t('builder.curriculum.manageQuiz')}” {t('builder.curriculum.quizNoteAfter')}
                            </p>
                          )}
                          {lessonError && <p className="rounded-input bg-error/10 px-3 py-2 text-xs text-error">{lessonError}</p>}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={closeLessonForm} disabled={createLecture.isPending}>{t('common.cancel')}</Button>
                            <Button size="sm" onClick={() => void addLesson(section.id)} loading={createLecture.isPending}>{t('builder.curriculum.addLesson')}</Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => openLessonForm(section.id)}
                          className="flex w-full items-center justify-center gap-2 bg-subtle py-4 text-xs font-semibold text-primary"
                        >
                          <Plus size={15} /> {t('builder.curriculum.addLesson')}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="h-fit p-5 xl:sticky xl:top-24">
          <h2 className="text-base font-semibold text-content">{t('builder.curriculum.readinessTitle')}</h2>
          <p className="mt-2 text-xs leading-5 text-content-secondary">{t('builder.curriculum.readinessHint')}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 xl:grid-cols-1">
            {[[t('builder.curriculum.statSections'), sections.length], [t('builder.curriculum.statLessons'), totalLessons], [t('builder.curriculum.statDuration'), `${Math.floor(totalSeconds / 3600)}h ${Math.round((totalSeconds % 3600) / 60)}m`]].map(([label, value]) => (
              <div key={String(label)} className="rounded-input bg-subtle p-3 xl:flex xl:items-center xl:justify-between"><p className="text-[10px] text-content-secondary">{label}</p><p className="mt-1 text-sm font-bold text-content xl:mt-0">{value}</p></div>
            ))}
          </div>
          <div className="mt-5 rounded-input bg-brand-soft p-4">
            <p className="text-xs font-semibold text-primary">{t('builder.curriculum.checksTitle')}</p>
            <div className="mt-3 space-y-2">
              <ReadinessItem label={t('builder.curriculum.checkOneSection')} complete={sections.length > 0} />
              <ReadinessItem label={t('builder.curriculum.checkTitles')} complete={sections.length > 0 && sections.every((section) => Boolean(section.title.trim()))} />
              <ReadinessItem label={t('builder.curriculum.checkLessons')} complete={sections.length > 0 && sections.every((section) => section.lectures.length > 0)} />
              <ReadinessItem label={t('builder.curriculum.checkMedia')} complete value={t('builder.curriculum.allowed')} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
