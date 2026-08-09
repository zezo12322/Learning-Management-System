'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Clock,
  PlayCircle,
  BarChart3,
  Award,
  Lock,
  CheckCircle2,
  CreditCard,
  Star,
} from 'lucide-react'
import { catalogApi, checkoutBillingFromMe, enrollmentApi, paymentsApi, ratingsApi } from '@/lib/api/services'
import { apiErrorMessage } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import type { CourseCard } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { RatingStars } from '@/components/common/RatingStars'
import { formatCompact, formatDuration, formatPrice, cn } from '@/lib/utils'

export default function CourseDetailsPage() {
  const t = useT()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const qc = useQueryClient()
  const { me } = useAuth()

  const curriculum = useQuery({
    queryKey: ['curriculum', id],
    queryFn: () => catalogApi.curriculum(id),
  })
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const reviews = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => ratingsApi.list(id, 5),
  })
  const enrollment = useQuery({
    queryKey: ['enrollment', id],
    queryFn: () => enrollmentApi.get(id),
  })

  const meta: CourseCard | undefined = useMemo(
    () => catalog.data?.find((c) => c.id === id),
    [catalog.data, id]
  )

  const lectures = curriculum.data?.sections.flatMap((s) => s.lectures) ?? []
  const totalLessons = lectures.length
  const totalSeconds = lectures.reduce((s, l) => s + (l.duration ?? 0), 0)
  const isEnrolled = enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'
  const isPaid = (meta?.price ?? 0) > 0
  const summary = curriculum.data?.ratingSummary

  const enroll = useMutation({
    mutationFn: () => enrollmentApi.enroll(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['enrollment', id] })
      qc.invalidateQueries({ queryKey: ['continue-learning'] })
      router.push(`/learn/${id}`)
    },
  })

  // Paid courses go through Paymob's hosted checkout; the backend's webhook
  // creates the enrollment once the transaction settles, so there is nothing to
  // invalidate here — the browser leaves this page entirely.
  const checkout = useMutation({
    mutationFn: async () => {
      const url = await paymentsApi.checkout({
        items: [{ targetType: 'COURSE', courseId: id }],
        billingData: checkoutBillingFromMe(me),
        returnUrl: window.location.origin,
      })
      if (!url) throw new Error('Checkout URL missing')
      window.location.href = url
    },
  })

  const actionPending = enroll.isPending || checkout.isPending
  const actionError = enroll.error ?? checkout.error

  if (curriculum.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-56 w-full rounded-card" />
        <Skeleton className="h-24 w-full rounded-card" />
        <Skeleton className="h-64 w-full rounded-card" />
      </div>
    )
  }

  if (curriculum.isError) {
    return <p className="py-12 text-center text-content-secondary">{t('courseDetail.loadError')}</p>
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Hero */}
      <div className="gradient-primary relative overflow-hidden rounded-card p-6 text-white">
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
          aria-label={t('courseDetail.back')}
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
        </button>
        {meta?.category?.name && (
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            {meta.category.name}
          </span>
        )}
        <h1 className="text-title-md font-bold">{curriculum.data?.title}</h1>
        {meta?.description && (
          <p className="mt-2 max-w-2xl text-sm text-white/85">{meta.description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm">
          {summary && summary.count > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star size={15} className="fill-white text-white" />
              <span className="font-bold">{summary.average.toFixed(1)}</span>
              <span className="text-white/80">({formatCompact(summary.count)})</span>
            </span>
          )}
          <span className="text-white/80">{totalLessons} {t('courseDetail.lessons')}</span>
        </div>
      </div>

      {/* Instructor */}
      {meta?.author?.name && (
        <Card className="flex items-center gap-3 p-4">
          <Avatar src={meta.author.avatar} name={meta.author.name} size={48} />
          <div>
            <p className="font-semibold text-content">{meta.author.name}</p>
            <p className="text-xs text-content-secondary">{t('courseDetail.instructor')}</p>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Clock size={18} />} value={formatDuration(Math.round(totalSeconds / 60))} label={t('courseDetail.duration')} />
        <StatTile icon={<PlayCircle size={18} />} value={totalLessons} label={t('courseDetail.lessons')} />
        <StatTile
          icon={<BarChart3 size={18} />}
          value={meta?.level ? t(`level.${meta.level}`, meta.level) : '—'}
          label={t('courseDetail.level')}
        />
        <StatTile icon={<Award size={18} />} value={t('courseDetail.yes')} label={t('courseDetail.certificate')} />
      </div>

      {/* Curriculum */}
      <section>
        <h2 className="mb-3 text-title-sm font-bold text-content">{t('courseDetail.curriculum')}</h2>
        <Card className="divide-y divide-border">
          {curriculum.data?.sections.map((section) => (
            <div key={section.id} className="p-4">
              <p className="mb-2 text-sm font-semibold text-content">{section.title}</p>
              <ul className="space-y-1">
                {section.lectures.map((lecture, idx) => {
                  const locked = !isEnrolled && !lecture.isFreePreview
                  return (
                    <li
                      key={lecture.id}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-background"
                    >
                      <span className="text-content-secondary">
                        {locked ? (
                          <Lock size={16} />
                        ) : (
                          <PlayCircle size={16} className="text-primary" />
                        )}
                      </span>
                      <span className={cn('flex-1', locked ? 'text-content-secondary' : 'text-content')}>
                        {idx + 1}. {lecture.title}
                      </span>
                      {lecture.isFreePreview && !isEnrolled && (
                        <Badge tone="info">{t('common.preview')}</Badge>
                      )}
                      <span className="text-xs text-content-secondary">
                        {formatDuration(Math.round((lecture.duration ?? 0) / 60))}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </Card>
      </section>

      {/* Reviews */}
      {reviews.data && reviews.data.length > 0 && (
        <section>
          <h2 className="mb-3 text-title-sm font-bold text-content">
            {t('courseDetail.reviews')} {summary?.count ? `(${formatCompact(summary.count)})` : ''}
          </h2>
          <div className="space-y-3">
            {reviews.data.map((r, i) => (
              <Card key={i} className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Avatar src={r.user.avatar} name={r.user.name} size={32} />
                  <span className="text-sm font-semibold text-content">{r.user.name}</span>
                  <RatingStars value={r.rating} size={12} showValue={false} className="ms-auto" />
                </div>
                {r.review && <p className="text-sm text-content-secondary">{r.review}</p>}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Sticky enroll bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface p-4 lg:ms-[260px]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            {meta && (
              <p className="text-xl font-bold text-content">
                {meta.price > 0 ? formatPrice(meta.price / 100) : t('courseDetail.free')}
              </p>
            )}
          </div>
          {isEnrolled ? (
            <Button size="lg" onClick={() => router.push(`/learn/${id}`)}>
              <CheckCircle2 size={18} /> {t('courseDetail.continue')}
            </Button>
          ) : (
            <Button
              size="lg"
              loading={actionPending}
              onClick={() => (isPaid ? checkout.mutate() : enroll.mutate())}
            >
              {isPaid ? (
                <>
                  <CreditCard size={18} /> {t('courseDetail.buyNow', 'Buy now')}
                </>
              ) : (
                t('courseDetail.enrollNow')
              )}
            </Button>
          )}
        </div>
        {actionError && (
          <p className="mx-auto mt-2 max-w-5xl text-xs text-error">
            {apiErrorMessage(
              actionError,
              isPaid
                ? t('courseDetail.checkoutError', 'Could not start checkout. Please try again.')
                : t('courseDetail.enrollError')
            )}
          </p>
        )}
      </div>
    </div>
  )
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
}) {
  return (
    <Card className="flex flex-col items-center gap-1 p-4 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="text-sm font-bold text-content">{value}</span>
      <span className="text-xs text-content-secondary">{label}</span>
    </Card>
  )
}
