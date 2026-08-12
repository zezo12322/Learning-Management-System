'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Download,
  Share2,
  Trophy,
} from 'lucide-react'
import { certificatesFromEnrollments, coursesApi } from '@/lib/api/services'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CertificateArtwork } from '@/components/student/CertificateArtwork'
import { InfoRow } from '@/components/student/InfoRow'
import { formatDate } from '@/lib/utils'

/**
 * Certificate details (Figma "14. certificates" — details panel): the full
 * certificate sheet, verification badge, completion metadata and the
 * download / share actions.
 *
 * "Download PDF" prints the certificate sheet (the `#certificate-print` rule in
 * globals.css isolates it), which is the only server-free way to produce a PDF
 * until a certificates endpoint exists.
 */
export default function CertificateDetailPage() {
  const { t, locale } = useI18n()
  const { me } = useAuth()
  const { enrollmentId } = useParams<{ enrollmentId: string }>()
  const [shareNote, setShareNote] = useState<string | null>(null)

  const enrollments = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const certificate = useMemo(
    () =>
      certificatesFromEnrollments(enrollments.data ?? []).find(
        (item) => item.enrollmentId === enrollmentId,
      ),
    [enrollments.data, enrollmentId],
  )

  const share = async () => {
    const url = window.location.href
    const title = certificate ? `${t('certificates.shareTitle')} — ${certificate.course.title}` : ''
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShareNote(t('certificates.linkCopied'))
    } catch (error) {
      // Dismissing the native share sheet rejects with AbortError — that is a
      // deliberate cancel, not a failure worth reporting.
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareNote(t('certificates.shareFailed'))
    }
  }

  if (enrollments.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-72 rounded-card" />
      </div>
    )
  }

  if (enrollments.isError) {
    return (
      <Card className="border-error bg-error-soft p-6 text-sm text-error">
        {t('certificates.loadError')}
      </Card>
    )
  }

  if (!certificate) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm font-semibold text-content">{t('certificates.notFound')}</p>
        <p className="mt-1 text-xs text-content-secondary">{t('certificates.notFoundHint')}</p>
        <Link href="/certificates" className="mt-4 inline-block">
          <Button variant="outline">{t('certificates.backToList')}</Button>
        </Link>
      </Card>
    )
  }

  const completedOn = formatDate(certificate.completedAt, locale)

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        href="/certificates"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary print:hidden"
      >
        <ArrowLeft size={14} className="rtl:rotate-180" /> {t('certificates.backToList')}
      </Link>

      <Card className="p-4 sm:p-6" id="certificate-print">
        <CertificateArtwork
          learnerName={me?.name ?? ''}
          courseTitle={certificate.course.title}
          completedOn={completedOn}
          issuerName={certificate.course.author?.name}
        />
      </Card>

      <div className="text-center">
        <Badge tone="success">
          <BadgeCheck size={14} /> {t('certificates.verifiedCertificate')}
        </Badge>
        <h1 className="mt-3 text-2xl font-bold text-content">{certificate.course.title}</h1>
        <p className="mt-1 text-sm text-content-secondary">
          {t('certificates.issuedOn')} {completedOn}
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-content-secondary">
          {t('certificates.verifyBody')
            .replace('{name}', me?.name ?? '')
            .replace('{course}', certificate.course.title)}
        </p>
      </div>

      <Card className="divide-y divide-border">
        <InfoRow icon={CalendarDays} label={t('certificates.completionDate')} value={completedOn} />
        <InfoRow
          icon={BookOpen}
          label={t('certificates.totalLessons')}
          value={String(certificate.totalLessons)}
        />
        <InfoRow
          icon={Trophy}
          label={t('certificates.credentialId')}
          value={<span className="font-mono text-xs">{certificate.credentialId}</span>}
        />
      </Card>

      <div className="space-y-3 print:hidden">
        <Button fullWidth size="lg" onClick={() => window.print()}>
          <Download size={18} /> {t('certificates.downloadPdf')}
        </Button>
        <Button fullWidth size="lg" variant="outline" onClick={share}>
          <Share2 size={18} /> {t('certificates.share')}
        </Button>
        {shareNote && <p className="text-center text-xs text-content-secondary">{shareNote}</p>}
      </div>
    </div>
  )
}
