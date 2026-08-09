'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { apiErrorMessage } from '@/lib/api/client'
import { certificatesFromEnrollments, coursesApi, meApi, submissionsApi } from '@/lib/api/services'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { StatCard } from '@/components/student/StatCard'
import { SectionHeader } from '@/components/student/SectionHeader'
import { InfoRow, SettingsRow } from '@/components/student/InfoRow'
import { CertificateArtwork } from '@/components/student/CertificateArtwork'
import { formatDate } from '@/lib/utils'

/**
 * Student profile (Figma "16. Student profile"): identity header with the
 * four headline stats, editable User Information, Learning Statistics,
 * Certificates, Completed Courses and the Settings list.
 */
export default function ProfilePage() {
  const { t, locale } = useI18n()
  const { me, roles, logout, refreshMe } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  const profileQuery = useQuery({ queryKey: ['me'], queryFn: meApi.get })
  const enrollments = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const submissions = useQuery({
    queryKey: ['my-submissions'],
    queryFn: submissionsApi.mine,
    // Instructors/admins may have no submissions; a failure here must not blank
    // the whole profile, so the stat falls back to "—".
    retry: false,
  })
  const user = profileQuery.data ?? me

  useEffect(() => {
    setBio(user?.profile?.bio ?? '')
    setCompany(user?.profile?.company ?? '')
    setPhone(user?.profile?.phone ?? '')
  }, [user])

  const updateProfile = useMutation({
    mutationFn: () => meApi.updateProfile({ bio, company, phone }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      await refreshMe()
      setEditing(false)
    },
  })

  const items = useMemo(() => enrollments.data ?? [], [enrollments.data])
  const certificates = useMemo(() => certificatesFromEnrollments(items), [items])
  const completed = useMemo(() => items.filter((item) => item.status === 'COMPLETED'), [items])
  const lessonsDone = useMemo(
    () => items.reduce((total, item) => total + item.completedLessons, 0),
    [items],
  )
  const gradedCount = (submissions.data ?? []).filter((item) => item.status === 'GRADED').length
  const assessmentsValue = submissions.isError ? '—' : gradedCount

  const signOut = async () => {
    await logout()
    router.push('/login')
  }

  if (profileQuery.isLoading && !user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 rounded-card" />
        <Skeleton className="h-60 rounded-card" />
      </div>
    )
  }
  if (profileQuery.isError || !user) {
    return (
      <Card className="border-error/20 bg-error/5 p-6 text-sm text-error">{t('profile.loadError')}</Card>
    )
  }

  const roleLabel = roles.includes('admin')
    ? t('role.admin')
    : roles.includes('instructor')
      ? t('role.instructor')
      : t('role.student')

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Identity header */}
      <Card className="overflow-hidden">
        <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-start">
          <Avatar src={user.avatar} name={user.name} size={96} online />
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-content">{user.name}</h1>
            <Badge tone="primary" className="mt-2">
              <GraduationCap size={14} /> {roleLabel}
            </Badge>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-content-secondary">
              <CalendarDays size={13} /> {user.email}
            </p>
          </div>
          <Link href="/notifications" className="sm:ms-auto" aria-label={t('notifications.title')}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-content-secondary transition-colors hover:text-primary">
              <Settings size={18} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 divide-border border-t border-border sm:grid-cols-4 sm:divide-x sm:rtl:divide-x-reverse">
          {[
            { icon: BookOpen, value: items.length, label: t('student.stat.enrolled'), note: t('student.stat.enrolledActive') },
            { icon: GraduationCap, value: lessonsDone, label: t('student.stat.lessons'), note: t('student.stat.lessonsNote') },
            { icon: ClipboardCheck, value: assessmentsValue, label: t('profile.stat.assessments'), note: t('profile.stat.assessmentsNote') },
            { icon: Award, value: certificates.length, label: t('student.stat.certificates'), note: t('student.stat.certificatesNote') },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={index < 2 ? 'border-b border-border p-4 text-center sm:border-b-0' : 'p-4 text-center'}
            >
              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-primary">
                <stat.icon size={17} />
              </span>
              <p className="mt-2 text-xl font-bold text-content">
                {enrollments.isLoading ? '…' : stat.value}
              </p>
              <p className="text-[11px] text-content-secondary">{stat.label}</p>
              <p className="mt-1 text-[10px] font-semibold text-success">{stat.note}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* User information */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-content">{t('profile.userInformation')}</h2>
          <button
            type="button"
            onClick={() => setEditing((current) => !current)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            {editing ? <X size={15} /> : null}
            {editing ? t('common.cancel') : t('profile.edit')}
          </button>
        </div>

        {editing ? (
          <Card className="space-y-5 p-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label>{t('reg.fullName')}</Label>
                <Input value={user.name} disabled />
              </div>
              <div>
                <Label>{t('auth.email')}</Label>
                <Input value={user.email} disabled />
              </div>
              <div>
                <Label htmlFor="profile-phone">{t('profile.phone')}</Label>
                <Input
                  id="profile-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="profile-company">{t('profile.company')}</Label>
                <Input
                  id="profile-company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="profile-bio">{t('profile.bio')}</Label>
                <textarea
                  id="profile-bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows={4}
                  className="w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            {updateProfile.isError && (
              <p className="text-xs text-error">
                {apiErrorMessage(updateProfile.error, t('profile.updateFailed'))}
              </p>
            )}
            <div className="flex justify-end">
              <Button loading={updateProfile.isPending} onClick={() => updateProfile.mutate()}>
                {t('profile.save')}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="divide-y divide-border">
            <InfoRow icon={UserRound} label={t('reg.fullName')} value={user.name} />
            <InfoRow icon={Mail} label={t('auth.email')} value={user.email} />
            <InfoRow
              icon={Phone}
              label={t('profile.phone')}
              value={user.profile?.phone || t('profile.notSet')}
            />
            <InfoRow
              icon={Building2}
              label={t('profile.company')}
              value={user.profile?.company || t('profile.notSet')}
            />
            <InfoRow
              icon={ShieldCheck}
              label={t('profile.stat.roles')}
              value={roles.length ? roles.join(', ') : t('profile.noRole')}
            />
          </Card>
        )}
        {updateProfile.isSuccess && !editing && (
          <p className="text-xs text-success">{t('profile.saveSuccess')}</p>
        )}
      </section>

      {/* Learning statistics */}
      <section className="space-y-3">
        <SectionHeader title={t('profile.learningStatistics')} href="/learning" actionLabel={t('student.viewAll')} />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            tinted
            icon={GraduationCap}
            tone="primary"
            value={lessonsDone}
            label={t('student.stat.lessons')}
            note={t('student.stat.lessonsNote')}
          />
          <StatCard
            tinted
            icon={BookOpen}
            tone="secondary"
            value={items.length}
            label={t('student.stat.enrolled')}
            note={t('student.stat.enrolledActive')}
          />
          <StatCard
            tinted
            icon={Award}
            tone="success"
            value={certificates.length}
            label={t('student.stat.certificates')}
            note={t('student.completed')}
          />
          <StatCard
            tinted
            icon={ClipboardCheck}
            tone="warning"
            value={assessmentsValue}
            label={t('profile.stat.assessments')}
            note={t('profile.stat.assessmentsNote')}
          />
        </div>
      </section>

      {/* Certificates */}
      {certificates.length > 0 && (
        <section className="space-y-3">
          <SectionHeader
            title={t('certificates.title')}
            href="/certificates"
            actionLabel={t('student.viewAll')}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {certificates.slice(0, 2).map((certificate) => (
              <Link key={certificate.enrollmentId} href={`/certificates/${certificate.enrollmentId}`}>
                <Card hover className="flex items-center gap-3 p-3">
                  <div className="w-24 shrink-0">
                    <CertificateArtwork
                      compact
                      learnerName={user.name}
                      courseTitle={certificate.course.title}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold text-content">
                      {certificate.course.title}
                    </p>
                    <p className="mt-1 text-[11px] text-content-secondary">
                      {t('certificates.issuedOn')} {formatDate(certificate.completedAt, locale)}
                    </p>
                    <Badge tone="success" className="mt-2">
                      <BadgeCheck size={12} /> {t('certificates.verified')}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Completed courses */}
      {completed.length > 0 && (
        <section className="space-y-3">
          <SectionHeader
            title={t('profile.completedCourses')}
            href="/learning"
            actionLabel={t('student.viewAll')}
          />
          <Card className="divide-y divide-border">
            {completed.slice(0, 3).map((item) => (
              <Link
                key={item.enrollmentId}
                href={`/courses/${item.course.id}`}
                className="flex items-center gap-3 p-3 transition-colors hover:bg-subtle"
              >
                <CourseThumbnail
                  src={item.course.thumbnail}
                  seed={item.course.id}
                  label={item.course.title}
                  className="h-12 w-16 shrink-0 rounded-lg text-[9px]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-content">
                    {item.course.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-content-secondary">
                    {t('certificates.completedOn')} {formatDate(item.completedAt, locale)}
                  </span>
                </span>
                <Badge tone="success">{t('student.completed')}</Badge>
                <ChevronRight size={16} className="shrink-0 text-content-muted rtl:rotate-180" />
              </Link>
            ))}
          </Card>
        </section>
      )}

      {/* Settings */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-content">{t('profile.settings')}</h2>
        <Card className="divide-y divide-border">
          <SettingsRow icon={Settings} label={t('profile.accountSettings')} onClick={() => setEditing(true)} />
          <SettingsRow icon={Bell} label={t('profile.notificationPreferences')} href="/notifications" />
          <SettingsRow icon={ShieldCheck} label={t('profile.privacySecurity')} href="/profile" />
          <SettingsRow icon={HelpCircle} label={t('profile.helpSupport')} href="/catalog" />
          <SettingsRow icon={LogOut} label={t('nav.signOut')} onClick={signOut} danger />
        </Card>
        <p className="flex items-center gap-1.5 px-1 text-[11px] text-content-muted">
          <LifeBuoy size={12} /> {t('profile.userId')}: <span className="break-all font-mono">{user.uid}</span>
        </p>
      </section>
    </div>
  )
}
