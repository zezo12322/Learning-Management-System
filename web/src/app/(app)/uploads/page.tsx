'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Database, ExternalLink, UploadCloud } from 'lucide-react'
import { authoringApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseUploadWorkspace } from '@/components/uploads/CourseUploadWorkspace'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function UploadsPage() {
  const [courseId, setCourseId] = useState('')
  const authoringQuery = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list })
  const courses = useMemo(() => authoringQuery.data ?? [], [authoringQuery.data])

  useEffect(() => {
    if (!courses.some((course) => course.id === courseId)) setCourseId(courses[0]?.id ?? '')
  }, [courseId, courses])

  return (
    <div className="space-y-6">
      <PageHeader title="Uploads" description="Choose a database course, upload media, and track storage processing." />
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label htmlFor="upload-course" className="text-xs font-semibold text-content">Database course</label>
            <select
              id="upload-course"
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              disabled={authoringQuery.isLoading || authoringQuery.isError || !courses.length}
              className="mt-2 w-full rounded-input border border-border bg-surface px-3 py-3 text-sm text-content outline-none focus:border-primary"
            >
              {!courses.length && <option value="">No courses available</option>}
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-input bg-brand-soft px-3 py-3 text-xs font-semibold text-primary"><Database size={15} /> {authoringQuery.isLoading ? 'Loading API' : `${courses.length} courses`}</span>
            {courseId && (
              <Link href={`/studio/${courseId}/setup`}>
                <Button variant="outline"><ExternalLink size={15} /> View course</Button>
              </Link>
            )}
          </div>
        </div>
        {authoringQuery.isError && <div className="mt-4 rounded-input bg-error/10 p-3 text-xs text-error">Courses could not be loaded from the API.</div>}
      </Card>
      {courseId ? <CourseUploadWorkspace courseId={courseId} /> : !authoringQuery.isLoading && !authoringQuery.isError ? (
        <Card className="py-16 text-center"><UploadCloud className="mx-auto text-content-muted" /><p className="mt-3 text-sm font-semibold text-content">No course selected</p><p className="mt-1 text-xs text-content-secondary">Add a database course before uploading media.</p></Card>
      ) : null}
    </div>
  )
}
