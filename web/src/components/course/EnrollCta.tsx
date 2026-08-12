'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreditCard } from 'lucide-react'
import { checkoutBillingFromMe, enrollmentApi, paymentsApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { ResumeButton, type ResumeStatus } from '@/components/student/ResumeButton'
import { cn } from '@/lib/utils'

/**
 * Is this failure really "you already have this course"?
 *
 * Enrolling twice is a conflict, not an error the learner has to act on — and
 * showing it as a red message under a dead button was the exact dead end an
 * already-enrolled learner used to hit after arriving from Home's recommended
 * strip. 409 is the status the API answers with; the message check covers the
 * deployments that answer 400 with the same sentence.
 */
function isAlreadyEnrolled(error: unknown): boolean {
  if (apiErrorStatus(error) === 409) return true
  return /already\s*enrolled/i.test(apiErrorMessage(error, ''))
}

/**
 * The one CTA state machine for the surviving course-detail page.
 *
 * It has exactly three outcomes and no fourth:
 *  - enrolled → say so, and offer the lesson the learner is actually up to;
 *  - not enrolled, free → enrol and go straight into the course;
 *  - not enrolled, paid → hand over to the hosted checkout.
 *
 * Crucially it never ends in a disabled button. The two pages this replaces both
 * settled into one ("Enrolled" / "Enrollment active") that could not be clicked,
 * left the tab order and led nowhere, so a successful enrolment looked like a
 * failure.
 */
export function EnrollCta({
  courseId,
  price,
  isEnrolled,
  percentage,
  nextLessonId,
  size = 'lg',
  fullWidth,
  className,
}: {
  courseId: string
  /** Minor units, as the catalog reports it. Only used to pick free vs paid. */
  price: number
  isEnrolled: boolean
  percentage?: number
  nextLessonId?: string | null
  size?: 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}) {
  const t = useT()
  const router = useRouter()
  const qc = useQueryClient()
  const { me } = useAuth()
  /** Set when the API tells us the enrolment already exists (see above). */
  const [conflictEnrolled, setConflictEnrolled] = useState(false)

  const isPaid = price > 0

  const enroll = useMutation({
    mutationFn: () => enrollmentApi.enroll(courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['enrollment', courseId] })
      qc.invalidateQueries({ queryKey: ['continue-learning'] })
      // Enrolling is only ever a step towards watching something, so it always
      // ends inside the course.
      router.push(`/learn/${courseId}`)
    },
    onError: (error) => {
      if (isAlreadyEnrolled(error)) {
        setConflictEnrolled(true)
        qc.invalidateQueries({ queryKey: ['enrollment', courseId] })
      }
    },
  })

  // Paid courses go through Paymob's hosted checkout; the backend's webhook
  // creates the enrollment once the transaction settles, so there is nothing to
  // invalidate here — the browser leaves the app entirely.
  const checkout = useMutation({
    mutationFn: async () => {
      const url = await paymentsApi.checkout({
        items: [{ targetType: 'COURSE', courseId }],
        billingData: checkoutBillingFromMe(me),
        returnUrl: window.location.origin,
      })
      if (!url) throw new Error('Checkout URL missing')
      window.location.href = url
    },
  })

  if (isEnrolled || conflictEnrolled) {
    const percent = percentage == null ? null : Math.round(percentage)
    // While progress is still unknown the wording stays "Resume": an enrolled
    // learner is never told to "Start course" and then corrected a moment later.
    const status: ResumeStatus =
      percent == null
        ? 'ACTIVE'
        : percent <= 0
          ? 'NOT_STARTED'
          : percent >= 100
            ? 'COMPLETED'
            : 'ACTIVE'

    return (
      <div className={cn('space-y-3', className)}>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          <span className="font-semibold text-content">{t('course.youAreEnrolled')}</span>
          {percent != null && (
            <span className="font-semibold text-primary">
              {t('common.percentComplete').replace('{n}', String(percent))}
            </span>
          )}
        </p>
        {conflictEnrolled && !isEnrolled && (
          <p className="text-xs text-content-secondary">{t('course.alreadyEnrolledNotice')}</p>
        )}
        <ResumeButton
          courseId={courseId}
          lessonId={nextLessonId}
          status={status}
          variant="labelled"
          className={fullWidth ? 'w-full' : undefined}
        />
      </div>
    )
  }

  const pending = enroll.isPending || checkout.isPending
  const failure = enroll.error ?? checkout.error

  return (
    <div className={cn('space-y-2', className)}>
      <Button
        size={size}
        fullWidth={fullWidth}
        loading={pending}
        onClick={() => (isPaid ? checkout.mutate() : enroll.mutate())}
      >
        {isPaid ? (
          <>
            <CreditCard size={18} aria-hidden="true" /> {t('courseDetail.buyNow')}
          </>
        ) : (
          t('courseDetail.enrollNow')
        )}
      </Button>
      {failure && (
        <p role="alert" className="text-xs text-error">
          {apiErrorMessage(
            failure,
            isPaid ? t('courseDetail.checkoutError') : t('courseDetail.enrollError'),
          )}
        </p>
      )}
    </div>
  )
}
