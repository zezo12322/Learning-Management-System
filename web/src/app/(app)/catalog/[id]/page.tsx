import Link from 'next/link'
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Globe2, PlayCircle } from 'lucide-react'
import { demoCourses } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function CatalogDetailPage({ params }: { params: { id: string } }) {
  const course = demoCourses.find((item) => item.id === params.id) ?? demoCourses.find((item) => item.status === 'PUBLISHED')!
  return (
    <div className="space-y-6">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary"><ArrowLeft size={14} /> Back to catalog</Link>
      <Card className="overflow-hidden">
        <div className="grid gap-8 bg-brand-soft p-6 sm:p-10 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="flex aspect-video items-center justify-center rounded-card bg-gradient-to-br from-primary-500 to-primary-800 text-4xl font-bold text-white">UX</div>
          <div>
            <StatusPill tone="brand">{course.category}</StatusPill>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-content">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-content-secondary">{course.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-content-secondary">
              <span className="inline-flex items-center gap-1"><BookOpen size={15} /> {course.lessonCount} lessons</span>
              <span className="inline-flex items-center gap-1"><Clock size={15} /> {course.durationMinutes} minutes</span>
              <span className="inline-flex items-center gap-1"><Globe2 size={15} /> {course.language}</span>
            </div>
            <Button className="mt-6"><PlayCircle size={17} /> Start learning</Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card className="p-6"><h2 className="text-lg font-semibold text-content">What you’ll learn</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Apply user-centered design principles','Plan a qualitative research study','Create wireframes and prototypes','Review accessibility and hierarchy'].map((item) => <p key={item} className="flex gap-2 text-sm text-content-secondary"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" /> {item}</p>)}</div></Card>
        <Card className="p-6"><h2 className="text-lg font-semibold text-content">Course access</h2><p className="mt-2 text-sm text-content-secondary">Published and ready for enrollment.</p><Button fullWidth className="mt-5">Enroll now</Button></Card>
      </div>
    </div>
  )
}
