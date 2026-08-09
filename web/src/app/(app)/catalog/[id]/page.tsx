'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, BookOpen, CheckCircle2, Clock, CreditCard, Globe2, PlayCircle } from 'lucide-react'
import { catalogApi, checkoutBillingFromMe, enrollmentApi, paymentsApi } from '@/lib/api/services'
import { apiErrorMessage } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function CatalogDetailPage() {
  const t = useT()
  const { id } = useParams<{ id: string }>()
  const { me } = useAuth()
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const curriculum = useQuery({ queryKey: ['catalog-curriculum', id], queryFn: () => catalogApi.curriculum(id) })
  const enroll = useMutation({ mutationFn: () => enrollmentApi.enroll(id) })
  // Paid courses can't be enrolled directly: Paymob's hosted checkout takes the
  // payment and the backend webhook creates the enrollment once it settles.
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
  const course = catalog.data?.find((item) => item.id === id)
  const isPaid = (course?.price ?? 0) > 0
  const actionPending = enroll.isPending || checkout.isPending
  const actionError = enroll.error ?? checkout.error
  const startAction = () => (isPaid ? checkout.mutate() : enroll.mutate())
  const sections = curriculum.data?.sections ?? []
  const lessonCount = sections.reduce((total, section) => total + section.lectures.length, 0)
  const duration = Math.ceil(sections.flatMap((section) => section.lectures).reduce((total, lecture) => total + lecture.duration, 0) / 60)

  if (!course && (catalog.isLoading || curriculum.isLoading)) return <Card className="p-8 text-sm text-content-secondary">{t('catalogDetail.loadingCourse')}</Card>
  if (!course) return <Card className="p-8 text-sm text-error">{t('catalogDetail.notFound')}</Card>

  return (
    <div className="space-y-6">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary"><ArrowLeft size={14} className="rtl:rotate-180" /> {t('catalogDetail.backToCatalog')}</Link>
      <Card className="overflow-hidden">
        <div className="grid gap-8 bg-brand-soft p-6 sm:p-10 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="flex aspect-video items-center justify-center rounded-card bg-gradient-to-br from-primary-500 to-primary-800 text-4xl font-bold text-white">{course.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()}</div>
          <div>
            <StatusPill tone="brand">{course.category?.name ?? t('catalog.courseFallback')}</StatusPill>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-content">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-content-secondary">{curriculum.data?.description || course.description || t('catalogDetail.descFallback')}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-content-secondary">
              <span className="inline-flex items-center gap-1"><BookOpen size={15} /> {lessonCount} {t('catalog.lessons')}</span>
              <span className="inline-flex items-center gap-1"><Clock size={15} /> {duration} {t('catalogDetail.minutes')}</span>
              <span className="inline-flex items-center gap-1"><Globe2 size={15} /> {curriculum.data?.language || course.language || t('catalogDetail.notSpecified')}</span>
            </div>
            <Button className="mt-6" onClick={startAction} loading={actionPending} disabled={enroll.isSuccess}>
              {isPaid ? (
                <><CreditCard size={17} /> {t('catalogDetail.buyNow', 'Buy now')}</>
              ) : (
                <><PlayCircle size={17} /> {enroll.isSuccess ? t('catalogDetail.enrolled') : t('catalogDetail.enrollNow')}</>
              )}
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card className="p-6"><h2 className="text-lg font-semibold text-content">{t('catalogDetail.curriculum')}</h2><div className="mt-5 space-y-3">{sections.map((section) => <div key={section.id} className="rounded-input bg-subtle p-4"><p className="flex gap-2 text-sm font-semibold text-content"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" /> {section.title}</p><p className="mt-1 pl-6 text-xs text-content-secondary">{section.lectures.length} {t('catalog.lessons')}</p></div>)}</div></Card>
        <Card className="h-fit p-6">
          <h2 className="text-lg font-semibold text-content">{t('catalogDetail.access')}</h2>
          <p className="mt-2 text-xl font-bold text-content">{isPaid ? formatPrice(course.price / 100) : t('catalogDetail.free', 'Free')}</p>
          <p className="mt-2 text-sm text-content-secondary">{isPaid ? t('catalogDetail.paidNote', 'Payment is handled on a secure checkout page. Your enrollment activates as soon as the payment goes through.') : t('catalogDetail.readyNote')}</p>
          <Button fullWidth className="mt-5" onClick={startAction} loading={actionPending} disabled={enroll.isSuccess}>
            {isPaid ? t('catalogDetail.buyNow', 'Buy now') : enroll.isSuccess ? t('catalogDetail.enrollmentActive') : t('catalogDetail.enrollNow')}
          </Button>
          {actionError && (
            <p className="mt-2 text-xs text-error">
              {apiErrorMessage(
                actionError,
                isPaid
                  ? t('catalogDetail.checkoutFailed', 'Could not start checkout. Please try again.')
                  : t('catalogDetail.enrollFailed')
              )}
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
