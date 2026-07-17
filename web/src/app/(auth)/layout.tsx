'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Bot, Check, UploadCloud } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'

const VALUE_POINTS = [
  { icon: BookOpen, title: 'Course builder', body: 'Structure sections, lessons, and resources.' },
  { icon: UploadCloud, title: 'Reliable video flow', body: 'Track upload and transcoding end to end.' },
  { icon: Bot, title: 'AI tools', body: 'Course generation and tutor experiences are coming soon.' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace('/dashboard')
  }, [loading, isAuthenticated, router])

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-[minmax(520px,43%)_1fr]">
      <section className="panel-grid relative hidden min-h-screen overflow-hidden bg-primary-600 px-14 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-400/55" />
        <div className="absolute -bottom-36 -left-36 h-80 w-80 rounded-full bg-primary-500/55" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary-400 text-lg font-bold">O</span>
          <span className="text-2xl font-bold">Optima</span>
        </div>

        <div className="relative mt-24 max-w-lg">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary-200">THE COMPLETE LMS WORKSPACE</p>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.45] tracking-tight">
            Build courses faster.<br />Teach with confidence.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-primary-100">
            Create, upload, and publish structured learning experiences. AI tools will be introduced in a future release.
          </p>

          <div className="mt-12 space-y-4">
            {VALUE_POINTS.map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <item.icon size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-primary-100">{item.body}</p>
                </div>
                <Check size={16} className="ml-auto text-primary-200" />
              </div>
            ))}
          </div>
        </div>

        <p className="relative mt-auto text-xs text-primary-200">Built for instructors, reviewers, and learners.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-surface px-5 py-10 sm:px-10">
        <div className="w-full max-w-[520px]">{children}</div>
      </section>
    </div>
  )
}
