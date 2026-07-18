'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Globe2, PlayCircle } from 'lucide-react'
import { catalogApi, enrollmentApi } from '@/lib/api/services'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function CatalogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const curriculum = useQuery({ queryKey: ['catalog-curriculum', id], queryFn: () => catalogApi.curriculum(id) })
  const enroll = useMutation({ mutationFn: () => enrollmentApi.enroll(id) })
  const course = catalog.data?.find((item) => item.id === id)
  const isPaid = (course?.price ?? 0) > 0
  const sections = curriculum.data?.sections ?? []
  const lessonCount = sections.reduce((total, section) => total + section.lectures.length, 0)
  const duration = Math.ceil(sections.flatMap((section) => section.lectures).reduce((total, lecture) => total + lecture.duration, 0) / 60)

  if (!course && (catalog.isLoading || curriculum.isLoading)) return <Card className="p-8 text-sm text-content-secondary">Loading course…</Card>
  if (!course) return <Card className="p-8 text-sm text-error">Course not found in the published catalog.</Card>

  return (
    <div className="space-y-6">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary"><ArrowLeft size={14} /> Back to catalog</Link>
      <Card className="overflow-hidden">
        <div className="grid gap-8 bg-brand-soft p-6 sm:p-10 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="flex aspect-video items-center justify-center rounded-card bg-gradient-to-br from-primary-500 to-primary-800 text-4xl font-bold text-white">{course.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()}</div>
          <div>
            <StatusPill tone="brand">{course.category?.name ?? 'Course'}</StatusPill>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-content">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-content-secondary">{curriculum.data?.description || course.description || 'Explore the curriculum and start learning.'}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-content-secondary">
              <span className="inline-flex items-center gap-1"><BookOpen size={15} /> {lessonCount} lessons</span>
              <span className="inline-flex items-center gap-1"><Clock size={15} /> {duration} minutes</span>
              <span className="inline-flex items-center gap-1"><Globe2 size={15} /> {curriculum.data?.language || course.language || 'Not specified'}</span>
            </div>
            <Button className="mt-6" onClick={() => enroll.mutate()} loading={enroll.isPending} disabled={isPaid || enroll.isSuccess}><PlayCircle size={17} /> {isPaid ? 'Payments coming soon' : enroll.isSuccess ? 'Enrolled' : 'Enroll now'}</Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card className="p-6"><h2 className="text-lg font-semibold text-content">Course curriculum</h2><div className="mt-5 space-y-3">{sections.map((section) => <div key={section.id} className="rounded-input bg-subtle p-4"><p className="flex gap-2 text-sm font-semibold text-content"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" /> {section.title}</p><p className="mt-1 pl-6 text-xs text-content-secondary">{section.lectures.length} lessons</p></div>)}</div></Card>
        <Card className="h-fit p-6"><h2 className="text-lg font-semibold text-content">Course access</h2><p className="mt-2 text-sm text-content-secondary">{isPaid ? 'Secure online payments are coming soon.' : 'Published and ready for enrollment.'}</p><Button fullWidth className="mt-5" onClick={() => enroll.mutate()} loading={enroll.isPending} disabled={isPaid || enroll.isSuccess}>{isPaid ? 'Payments coming soon' : enroll.isSuccess ? 'Enrollment active' : 'Enroll now'}</Button>{enroll.isError && <p className="mt-2 text-xs text-error">Enrollment failed. Please try again.</p>}</Card>
      </div>
    </div>
  )
}
