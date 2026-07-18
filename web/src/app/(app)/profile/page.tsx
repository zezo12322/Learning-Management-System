'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, CheckCircle2, LogOut, Save, ShieldCheck, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthProvider'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi, meApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function ProfilePage() {
  const t = useT()
  const { me, logout, refreshMe } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [bio, setBio] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const profileQuery = useQuery({ queryKey: ['me'], queryFn: meApi.get })
  const coursesQuery = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list })
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
    },
  })
  const signOut = async () => { await logout(); router.push('/login') }

  if (profileQuery.isLoading && !user) return <Card className="p-8 text-sm text-content-secondary">{t('profile.loadingUser')}</Card>
  if (profileQuery.isError || !user) return <Card className="border-error/20 bg-error/5 p-6 text-sm text-error">{t('profile.loadError')}</Card>

  const authoredCourses = coursesQuery.data ?? []
  const publishedCourses = authoredCourses.filter((course) => course.status === 'PUBLISHED').length
  const profileStats = [
    { icon: BookOpen, value: coursesQuery.isLoading ? '…' : coursesQuery.isError ? t('profile.unavailable') : authoredCourses.length, label: t('profile.stat.authored') },
    { icon: CheckCircle2, value: coursesQuery.isLoading ? '…' : coursesQuery.isError ? t('profile.unavailable') : publishedCourses, label: t('profile.stat.published') },
    { icon: ShieldCheck, value: user.roles.length, label: t('profile.stat.roles') },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title={t('profile.title')} description={t('profile.subtitle')} />
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit p-6 text-center">
          <Avatar src={user.avatar} name={user.name} size={92} className="mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-content">{user.name}</h2>
          <p className="mt-1 text-sm text-content-secondary">{user.email}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {user.roles.map((role) => <StatusPill key={role} tone="brand">{role}</StatusPill>)}
            {!user.roles.length && <StatusPill tone="neutral">{t('profile.noRole')}</StatusPill>}
          </div>
          <div className="mt-5 rounded-input bg-subtle p-3 text-left text-[11px] text-content-secondary"><span className="font-semibold text-content">{t('profile.userId')}</span><span className="mt-1 block break-all">{user.uid}</span></div>
          <Button variant="outline" fullWidth className="mt-6" onClick={signOut}><LogOut size={16} /> {t('nav.signOut')}</Button>
        </Card>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {profileStats.map(({ icon: Icon, value, label }) => (
              <Card key={label} className="p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-primary"><Icon size={18} /></span><p className="mt-4 text-2xl font-bold text-content">{String(value)}</p><p className="text-xs text-content-secondary">{label}</p></Card>
            ))}
          </div>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-primary"><UserRound size={19} /></span><div><h2 className="text-lg font-semibold text-content">{t('profile.detailsTitle')}</h2><p className="text-xs text-content-secondary">{t('profile.detailsSubtitle')}</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><Label>{t('reg.fullName')}</Label><Input value={user.name} disabled /></div>
              <div><Label>{t('auth.email')}</Label><Input value={user.email} disabled /></div>
              <div><Label htmlFor="profile-company">{t('profile.company')}</Label><Input id="profile-company" value={company} onChange={(event) => setCompany(event.target.value)} /></div>
              <div><Label htmlFor="profile-phone">{t('profile.phone')}</Label><Input id="profile-phone" value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
              <div className="sm:col-span-2"><Label htmlFor="profile-bio">{t('profile.bio')}</Label><textarea id="profile-bio" value={bio} onChange={(event) => setBio(event.target.value)} rows={5} className="w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary" /></div>
            </div>
            {updateProfile.isError && <p className="mt-4 text-xs text-error">{apiErrorMessage(updateProfile.error, t('profile.updateFailed'))}</p>}
            {updateProfile.isSuccess && <p className="mt-4 text-xs text-success">{t('profile.saveSuccess')}</p>}
            <div className="mt-5 flex justify-end"><Button loading={updateProfile.isPending} onClick={() => updateProfile.mutate()}><Save size={16} /> {t('profile.save')}</Button></div>
          </Card>
        </div>
      </div>
    </div>
  )
}
