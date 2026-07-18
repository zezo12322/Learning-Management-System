'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bookmark } from 'lucide-react'
import { catalogApi } from '@/lib/api/services'
import { useSavedCourseIds, clearSavedCourses } from '@/lib/saved'
import { CourseGridCard } from '@/components/course/CourseCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function SavedPage() {
  const savedIds = useSavedCourseIds()
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })

  const savedCourses = useMemo(() => {
    const order = new Map(savedIds.map((id, i) => [id, i]))
    return (catalog.data ?? [])
      .filter((course) => order.has(course.id))
      .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
  }, [catalog.data, savedIds])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-title-md font-bold text-content">الدورات المحفوظة</h1>
        {savedIds.length > 0 && (
          <button
            type="button"
            onClick={clearSavedCourses}
            className="text-xs font-semibold text-content-secondary hover:text-content"
          >
            مسح الكل
          </button>
        )}
      </div>

      {savedIds.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center text-content-secondary">
          <Bookmark size={40} />
          <p>لا توجد دورات محفوظة بعد.</p>
          <p className="text-xs">اضغط على أيقونة الحفظ على أي دورة لإضافتها هنا.</p>
        </div>
      ) : catalog.isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: Math.min(savedIds.length, 8) }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-2xl" />
          ))}
        </div>
      ) : savedCourses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center text-content-secondary">
          <Bookmark size={40} />
          <p>الدورات المحفوظة لم تعد متاحة في الكتالوج.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {savedCourses.map((course) => (
            <CourseGridCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
