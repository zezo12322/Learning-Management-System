'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, CheckCircle2, LockKeyhole, LogOut, Save, ShieldCheck, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthProvider'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi, meApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function ProfilePage() {
  const { me, isDemoMode, logout, refreshMe } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [bio, setBio] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const profileQuery = useQuery({ queryKey: ['me'], queryFn: meApi.get, enabled: !isDemoMode })
  const coursesQuery = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list, enabled: !isDemoMode })
  const user = profileQuery.data ?? (!isDemoMode ? me : null)

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

  if (isDemoMode) {
    return (
      <div className="space-y-6">
        <PageHeader title="User profile" description="Identity and personal workspace settings." />
        <Card className="mx-auto max-w-2xl p-6 sm:p-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning"><LockKeyhole size={24} /></span>
          <h2 className="mt-5 text-xl font-bold text-content">Profile data is protected</h2>
          <p className="mt-2 text-sm leading-6 text-content-secondary">The backend provides real <code>GET /me</code> and <code>PATCH /me/profile</code> endpoints, but this Firebase project does not yet have a Web App configuration. No sample user is shown.</p>
          <div className="mt-5 rounded-input bg-subtle p-4 text-xs leading-5 text-content-secondary">
            Once Firebase Web authentication is configured, this page will load the signed-in database user and allow bio, company, and phone updates.
          </div>
          <Button variant="outline" className="mt-6" onClick={signOut}><LogOut size={16} /> Sign out of preview</Button>
        </Card>
      </div>
    )
  }

  if (profileQuery.isLoading && !user) return <Card className="p-8 text-sm text-content-secondary">Loading the signed-in user…</Card>
  if (profileQuery.isError || !user) return <Card className="border-error/20 bg-error/5 p-6 text-sm text-error">The signed-in database user could not be loaded.</Card>

  const authoredCourses = coursesQuery.data ?? []
  const publishedCourses = authoredCourses.filter((course) => course.status === 'PUBLISHED').length
  const profileStats = [
    { icon: BookOpen, value: coursesQuery.isLoading ? '…' : coursesQuery.isError ? 'Unavailable' : authoredCourses.length, label: 'Authored courses' },
    { icon: CheckCircle2, value: coursesQuery.isLoading ? '…' : coursesQuery.isError ? 'Unavailable' : publishedCourses, label: 'Published' },
    { icon: ShieldCheck, value: user.roles.length, label: 'Assigned roles' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="User profile" description="Manage the signed-in database user and instructor profile." />
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit p-6 text-center">
          <Avatar src={user.avatar} name={user.name} size={92} className="mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-content">{user.name}</h2>
          <p className="mt-1 text-sm text-content-secondary">{user.email}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {user.roles.map((role) => <StatusPill key={role} tone="brand">{role}</StatusPill>)}
            {!user.roles.length && <StatusPill tone="neutral">No role assigned</StatusPill>}
          </div>
          <div className="mt-5 rounded-input bg-subtle p-3 text-left text-[11px] text-content-secondary"><span className="font-semibold text-content">User ID</span><span className="mt-1 block break-all">{user.uid}</span></div>
          <Button variant="outline" fullWidth className="mt-6" onClick={signOut}><LogOut size={16} /> Sign out</Button>
        </Card>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {profileStats.map(({ icon: Icon, value, label }) => (
              <Card key={label} className="p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-primary"><Icon size={18} /></span><p className="mt-4 text-2xl font-bold text-content">{String(value)}</p><p className="text-xs text-content-secondary">{label}</p></Card>
            ))}
          </div>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-primary"><UserRound size={19} /></span><div><h2 className="text-lg font-semibold text-content">Profile details</h2><p className="text-xs text-content-secondary">Saved to the current user record.</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><Label>Full name</Label><Input value={user.name} disabled /></div>
              <div><Label>Email address</Label><Input value={user.email} disabled /></div>
              <div><Label htmlFor="profile-company">Company</Label><Input id="profile-company" value={company} onChange={(event) => setCompany(event.target.value)} /></div>
              <div><Label htmlFor="profile-phone">Phone</Label><Input id="profile-phone" value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
              <div className="sm:col-span-2"><Label htmlFor="profile-bio">Bio</Label><textarea id="profile-bio" value={bio} onChange={(event) => setBio(event.target.value)} rows={5} className="w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary" /></div>
            </div>
            {updateProfile.isError && <p className="mt-4 text-xs text-error">{apiErrorMessage(updateProfile.error, 'Profile update failed.')}</p>}
            {updateProfile.isSuccess && <p className="mt-4 text-xs text-success">Profile saved to the database.</p>}
            <div className="mt-5 flex justify-end"><Button loading={updateProfile.isPending} onClick={() => updateProfile.mutate()}><Save size={16} /> Save profile</Button></div>
          </Card>
        </div>
      </div>
    </div>
  )
}
