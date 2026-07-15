'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Database, ExternalLink, UploadCloud } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi, catalogApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseUploadWorkspace } from '@/components/uploads/CourseUploadWorkspace'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function UploadsPage() {
  const { isDemoMode } = useAuth()
  const [courseId, setCourseId] = useState('')
  const catalogQuery = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const authoringQuery = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list, enabled: !isDemoMode })
  const courses = useMemo(
    () => isDemoMode ? (catalogQuery.data ?? []) : (authoringQuery.data ?? []),
    [authoringQuery.data, catalogQuery.data, isDemoMode]
  )
  const activeQuery = isDemoMode ? catalogQuery : authoringQuery

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
              disabled={activeQuery.isLoading || activeQuery.isError || !courses.length}
              className="mt-2 w-full rounded-input border border-border bg-surface px-3 py-3 text-sm text-content outline-none focus:border-primary"
            >
              {!courses.length && <option value="">No courses available</option>}
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-input bg-brand-soft px-3 py-3 text-xs font-semibold text-primary"><Database size={15} /> {activeQuery.isLoading ? 'Loading API' : `${courses.length} courses`}</span>
            {courseId && (
              <Link href={isDemoMode ? `/courses/${courseId}` : `/studio/${courseId}/setup`}>
                <Button variant="outline"><ExternalLink size={15} /> View course</Button>
              </Link>
            )}
          </div>
        </div>
        {activeQuery.isError && <div className="mt-4 rounded-input bg-error/10 p-3 text-xs text-error">Courses could not be loaded from the API.</div>}
      </Card>
      {courseId ? <CourseUploadWorkspace courseId={courseId} /> : !activeQuery.isLoading && !activeQuery.isError ? (
        <Card className="py-16 text-center"><UploadCloud className="mx-auto text-content-muted" /><p className="mt-3 text-sm font-semibold text-content">No course selected</p><p className="mt-1 text-xs text-content-secondary">Add a database course before uploading media.</p></Card>
      ) : null}
    </div>
  )
}
