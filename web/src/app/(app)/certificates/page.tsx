'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Award, BadgeCheck, ChevronRight, ShieldCheck } from 'lucide-react'
import { certificatesFromEnrollments, coursesApi } from '@/lib/api/services'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/workspace/PageHeader'
import { EmptyState } from '@/components/student/EmptyState'
import { CertificateArtwork } from '@/components/student/CertificateArtwork'
import { formatDate } from '@/lib/utils'

/**
 * Certificates list (Figma "14. certificates"). Certificates are projected from
 * COMPLETED enrollments — see `certificatesFromEnrollments`.
 */
export default function CertificatesPage() {
  const { t, locale } = useI18n()
  const { me } = useAuth()
  const enrollments = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const certificates = useMemo(
    () => certificatesFromEnrollments(enrollments.data ?? []),
    [enrollments.data],
  )

  return (
    <div className="space-y-5">
      <PageHeader
        title={t('certificates.title')}
        description={t('certificates.subtitle')}
      />

      {enrollments.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-card" />
          ))}
        </div>
      ) : enrollments.isError ? (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {t('certificates.loadError')}
        </Card>
      ) : certificates.length ? (
        <>
          <div className="space-y-3">
            {certificates.map((certificate) => (
              <Link key={certificate.enrollmentId} href={`/certificates/${certificate.enrollmentId}`}>
                <Card hover className="flex items-center gap-3 p-3">
                  <div className="w-28 shrink-0 sm:w-32">
                    <CertificateArtwork
                      compact
                      learnerName={me?.name ?? ''}
                      courseTitle={certificate.course.title}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-bold text-content">
                      {certificate.course.title}
                    </h3>
                    <p className="mt-1 text-xs text-content-secondary">
                      {t('certificates.completedOn')} {formatDate(certificate.completedAt, locale)}
                    </p>
                    <Badge tone="success" className="mt-2">
                      <BadgeCheck size={13} /> {t('certificates.verified')}
                    </Badge>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-content-muted rtl:rotate-180" />
                </Card>
              </Link>
            ))}
          </div>

          <Card className="flex items-start gap-3 bg-brand-soft p-4">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-primary">{t('certificates.verifiedTitle')}</p>
              <p className="mt-1 text-xs leading-5 text-content-secondary">
                {t('certificates.verifiedBody')}
              </p>
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <EmptyState
            icon={Award}
            title={t('certificates.empty')}
            description={t('certificates.emptyHint')}
            actionLabel={t('student.browseCourses')}
            actionHref="/catalog"
          />
        </Card>
      )}
    </div>
  )
}
