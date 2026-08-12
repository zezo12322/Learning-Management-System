'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PageSpinner } from '@/components/ui/spinner'

/**
 * /catalog/[id] no longer exists as a screen: it is a redirect to /courses/[id].
 *
 * The two pages described the same course and disagreed on almost everything.
 * This one asked no enrolment question, so a learner 60% through a course was
 * shown a stranger's sales page whose only action was an "Enroll now" button
 * that turned into a disabled "Enrollment active" and led nowhere. It also
 * printed the duration as `Math.ceil(seconds / 60) + ' minutes'` where every
 * other surface says "6h", drew initials in a gradient box while ignoring
 * `course.thumbnail`, and offered two contradictory CTAs on one page.
 *
 * /courses/[id] is the Figma-mapped screen, queries the enrolment, swaps the CTA
 * and pushes into /learn — so it is the one that survives. Existing links and
 * bookmarks keep working through this replacement (not a push, so the dead URL
 * stays out of the back history).
 */
export default function CatalogDetailRedirectPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  useEffect(() => {
    router.replace(`/courses/${id}`)
  }, [id, router])

  return <PageSpinner />
}
