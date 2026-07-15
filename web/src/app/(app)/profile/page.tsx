'use client'

import { Bell, BookOpen, HelpCircle, LogOut, Settings, ShieldCheck, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthProvider'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function ProfilePage() {
  const { me, isDemoMode, logout } = useAuth()
  const router = useRouter()
  const signOut = async () => { await logout(); router.push('/login') }

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your instructor identity and workspace preferences." />
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit p-6 text-center">
          <Avatar src={me?.avatar} name={me?.name} size={92} className="mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-content">{me?.name ?? 'Instructor'}</h2>
          <p className="mt-1 text-sm text-content-secondary">{me?.email}</p>
          <div className="mt-3 flex justify-center gap-2"><StatusPill tone="brand">Instructor</StatusPill>{isDemoMode && <StatusPill tone="warning">Demo</StatusPill>}</div>
          <Button variant="outline" fullWidth className="mt-6" onClick={signOut}><LogOut size={16} /> Sign out</Button>
        </Card>
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[[BookOpen,'6','Courses'],[Users,'1,284','Learners'],[ShieldCheck,'3','Published']].map(([Icon,value,label]) => <Card key={String(label)} className="p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-primary"><Icon size={18} /></span><p className="mt-4 text-2xl font-bold text-content">{String(value)}</p><p className="text-xs text-content-secondary">{String(label)}</p></Card>)}
          </div>
          <Card className="p-5 sm:p-6"><h2 className="text-lg font-semibold text-content">Workspace settings</h2><div className="mt-4 divide-y divide-border">{[[Settings,'Account settings','Name, email, and organization'],[Bell,'Notification preferences','Course and learner activity'],[ShieldCheck,'Privacy & security','Sessions and data access'],[HelpCircle,'Help & support','Guides and contact options']].map(([Icon,title,body]) => <button key={String(title)} className="flex w-full items-center gap-3 py-4 text-left"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-subtle text-content-secondary"><Icon size={17} /></span><span className="flex-1"><span className="block text-sm font-semibold text-content">{String(title)}</span><span className="mt-1 block text-xs text-content-secondary">{String(body)}</span></span><span className="text-content-muted">→</span></button>)}</div></Card>
        </div>
      </div>
    </div>
  )
}
