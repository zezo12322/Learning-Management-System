'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Bot, Check, UploadCloud } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { useT } from '@/lib/i18n'

const VALUE_POINTS = [
  { icon: BookOpen, titleKey: 'auth.value.builder.title', bodyKey: 'auth.value.builder.body' },
  { icon: UploadCloud, titleKey: 'auth.value.video.title', bodyKey: 'auth.value.video.body' },
  { icon: Bot, titleKey: 'auth.value.ai.title', bodyKey: 'auth.value.ai.body' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const t = useT()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace('/home')
  }, [loading, isAuthenticated, router])

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-[minmax(520px,43%)_1fr]">
      {/* Painted from tokens, not palette literals. `bg-primary-600` +
          `bg-white/10` + `text-primary-100` are static hexes with no dark
          counterpart, so this half of the screen stayed a fixed bright indigo
          slab while the form column beside it followed the theme. The gradient
          and the on-stage foregrounds both have per-theme values. */}
      <section className="panel-grid gradient-primary relative hidden min-h-screen overflow-hidden px-14 py-12 text-on-stage lg:flex lg:flex-col">
        {/* Logical insets, so the decorative composition mirrors in Arabic
            instead of both blobs staying pinned to the same physical corners. */}
        <div className="absolute -end-32 -top-32 h-96 w-96 rounded-full bg-on-stage/15" />
        <div className="absolute -bottom-36 -start-36 h-80 w-80 rounded-full bg-primary/45" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-on-stage/20 text-lg font-bold">O</span>
          <span className="text-2xl font-bold">Optima</span>
        </div>

        <div className="relative mt-24 max-w-lg">
          <p className="text-xs font-semibold tracking-[0.14em] text-on-stage/85">{t('auth.hero.eyebrow')}</p>
          {/* ltr:tracking-tight — negative letter-spacing pulls Arabic joins
              into each other, and this heading is a translated string. */}
          <h1 className="mt-6 text-[44px] font-bold leading-[1.45] ltr:tracking-tight">
            {t('auth.hero.title1')}<br />{t('auth.hero.title2')}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-on-stage">
            {t('auth.hero.subtitle')}
          </p>

          <div className="mt-12 space-y-4">
            {VALUE_POINTS.map((item) => (
              <div key={item.titleKey} className="flex items-center gap-4 rounded-2xl border border-on-stage/20 bg-on-stage/10 p-4 backdrop-blur-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-on-stage/15">
                  <item.icon size={19} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t(item.titleKey)}</p>
                  <p className="mt-1 text-xs text-on-stage">{t(item.bodyKey)}</p>
                </div>
                {/* ms-auto, not ml-auto: this pushes the tick to the row's
                    trailing edge in both directions. */}
                <Check size={16} className="ms-auto text-on-stage" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        <p className="relative mt-auto text-xs text-on-stage/85">{t('auth.hero.footer')}</p>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-surface px-5 py-10 sm:px-10">
        {/* Arabic-first product: the language toggle has to be reachable before
            sign-in, otherwise a user who cannot read the UI cannot change it. */}
        <LanguageSwitcher className="absolute end-4 top-4 sm:end-6 sm:top-6" />
        <div className="w-full max-w-[520px]">{children}</div>
      </section>
    </div>
  )
}
