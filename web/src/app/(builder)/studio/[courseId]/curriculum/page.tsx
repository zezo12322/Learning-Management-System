'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ChevronDown, ChevronUp, FileText, GripVertical, MoreHorizontal, Play, Plus } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi } from '@/lib/api/services'
import { demoSections } from '@/lib/demo-data'
import type { AuthoringSection } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { ReadinessItem } from '@/components/builder/ReadinessItem'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function CurriculumPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { isDemoMode } = useAuth()
  const [sections, setSections] = useState<AuthoringSection[]>(demoSections)
  const [expanded, setExpanded] = useState<string>(demoSections[0].id)
  const [notice, setNotice] = useState<string | null>(null)

  const createSection = useMutation({
    mutationFn: (title: string) => authoringApi.createSection(courseId, { title }),
  })

  const addSection = async () => {
    const title = `New section ${sections.length + 1}`
    if (!isDemoMode) {
      const created = await createSection.mutateAsync(title)
      setSections((current) => [...current, { ...created, lectures: created.lectures ?? [] }])
    } else {
      setSections((current) => [...current, { id: `section-${Date.now()}`, title, order: current.length + 1, lectures: [] }])
    }
    setNotice('Section added')
    window.setTimeout(() => setNotice(null), 1600)
  }

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    setSections((current) => {
      const next = [...current]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next.map((section, order) => ({ ...section, order: order + 1 }))
    })
  }

  const totalLessons = useMemo(() => sections.reduce((sum, section) => sum + section.lectures.length, 0), [sections])
  const totalSeconds = useMemo(() => sections.flatMap((section) => section.lectures).reduce((sum, lecture) => sum + lecture.duration, 0), [sections])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum builder"
        description="Organize sections and lessons. Reorder them without losing their content."
        action={<div className="flex items-center gap-3">{notice && <span className="text-xs font-medium text-success">{notice}</span>}<Button onClick={addSection} loading={createSection.isPending}><Plus size={16} /> Add section</Button></div>}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_302px]">
        <Card className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between text-xs text-content-secondary">
            <span>{sections.length} sections · {totalLessons} lessons · {Math.floor(totalSeconds / 3600)}h {Math.round((totalSeconds % 3600) / 60)}m</span>
            <button onClick={() => setExpanded(expanded ? '' : sections[0]?.id)} className="font-semibold text-primary">{expanded ? 'Collapse all' : 'Expand first'}</button>
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
                      <p className="mt-1 text-[10px] text-content-secondary">{section.lectures.length} lessons</p>
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                      <button onClick={() => moveSection(sectionIndex, -1)} className="rounded-lg p-2 text-content-muted hover:bg-surface hover:text-content" aria-label="Move section up"><ChevronUp size={15} /></button>
                      <button onClick={() => moveSection(sectionIndex, 1)} className="rounded-lg p-2 text-content-muted hover:bg-surface hover:text-content" aria-label="Move section down"><ChevronDown size={15} /></button>
                    </div>
                    <button onClick={() => setExpanded(open ? '' : section.id)} className="rounded-lg p-2 text-primary" aria-label="Toggle section">{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
                  </div>

                  {open && (
                    <div className="divide-y divide-border">
                      {section.lectures.map((lecture, lectureIndex) => {
                        const status = lectureIndex === 0 ? 'Ready' : lectureIndex === 1 ? 'Processing' : 'Draft'
                        return (
                          <div key={lecture.id} className="flex items-center gap-3 px-3 py-4 sm:px-4">
                            <GripVertical size={15} className="shrink-0 text-content-muted" />
                            <span className={lecture.type === 'VIDEO' ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary' : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-subtle text-content-secondary'}>
                              {lecture.type === 'VIDEO' ? <Play size={14} /> : <FileText size={14} />}
                            </span>
                            <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-content">{lecture.title}</span><span className="mt-1 block text-[10px] text-content-muted">{lecture.type.toLowerCase()} · {Math.round(lecture.duration / 60)} min</span></span>
                            <StatusPill tone={status === 'Ready' ? 'success' : status === 'Processing' ? 'info' : 'warning'}>{status}</StatusPill>
                            <button className="p-1.5 text-content-muted"><MoreHorizontal size={16} /></button>
                          </div>
                        )
                      })}
                      <button
                        onClick={() => setSections((current) => current.map((item) => item.id === section.id ? { ...item, lectures: [...item.lectures, { id: `lesson-${Date.now()}`, title: 'Untitled lesson', type: 'ARTICLE', duration: 0, order: item.lectures.length + 1, isFreePreview: false }] } : item))}
                        className="flex w-full items-center justify-center gap-2 bg-subtle py-4 text-xs font-semibold text-primary"
                      >
                        <Plus size={15} /> Add lesson
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="h-fit p-5 xl:sticky xl:top-24">
          <h2 className="text-base font-semibold text-content">Curriculum readiness</h2>
          <p className="mt-2 text-xs leading-5 text-content-secondary">Build a coherent path before adding AI generation.</p>
          <div className="mt-5 grid grid-cols-3 gap-2 xl:grid-cols-1">
            {[['Sections', sections.length], ['Lessons', totalLessons], ['Duration', `${Math.floor(totalSeconds / 3600)}h ${Math.round((totalSeconds % 3600) / 60)}m`]].map(([label, value]) => (
              <div key={String(label)} className="rounded-input bg-subtle p-3 xl:flex xl:items-center xl:justify-between"><p className="text-[10px] text-content-secondary">{label}</p><p className="mt-1 text-sm font-bold text-content xl:mt-0">{value}</p></div>
            ))}
          </div>
          <div className="mt-5 rounded-input bg-brand-soft p-4">
            <p className="text-xs font-semibold text-primary">Curriculum checks</p>
            <div className="mt-3 space-y-2">
              <ReadinessItem label="Every section has a title" complete={sections.every((section) => Boolean(section.title))} />
              <ReadinessItem label="At least one lesson" complete={sections.every((section) => section.lectures.length > 0)} />
              <ReadinessItem label="Media can process later" complete value="Allowed" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
