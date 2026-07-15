import Link from 'next/link'
import { BookOpen, Clock, Search, Star } from 'lucide-react'
import { demoCourses } from '@/lib/demo-data'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function CatalogPage() {
  const published = demoCourses.filter((course) => course.status === 'PUBLISHED')
  return (
    <div className="space-y-6">
      <PageHeader title="Course catalog" description="Browse published learning experiences available to learners." />
      <Input icon={<Search size={17} />} placeholder="Search the catalog…" className="max-w-xl" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {published.map((course, index) => (
          <Link key={course.id} href={`/catalog/${course.id}`}>
            <Card hover className="h-full overflow-hidden">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-800 text-3xl font-bold text-white">
                {index === 0 ? 'DS' : index === 1 ? 'PD' : 'AX'}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between"><StatusPill tone="success">Published</StatusPill><span className="inline-flex items-center gap-1 text-xs font-semibold text-content"><Star size={13} className="fill-warning text-warning" /> 4.8</span></div>
                <h2 className="mt-4 text-base font-semibold text-content">{course.title}</h2>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-content-secondary">{course.description}</p>
                <div className="mt-4 flex gap-4 text-[11px] text-content-muted"><span className="inline-flex items-center gap-1"><BookOpen size={13} /> {course.lessonCount} lessons</span><span className="inline-flex items-center gap-1"><Clock size={13} /> {course.durationMinutes} min</span></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
