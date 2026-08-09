'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type FormValues = { email: string; password: string; remember: boolean }

export default function LoginPage() {
  const { login, loginWithGoogle, resetPassword, configurationError } = useAuth()
  const t = useT()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const schema = z.object({
    email: z.string().email(t('auth.val.email')),
    password: z.string().min(1, t('auth.val.passwordRequired')),
    remember: z.boolean(),
  })

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', remember: true },
  })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    setNotice(null)
    try {
      await login(values.email, values.password, values.remember)
      router.push('/home')
    } catch {
      setError(t('auth.err.signIn'))
    }
  }

  const requestPasswordReset = async () => {
    const email = getValues('email').trim()
    setError(null)
    setNotice(null)
    if (!z.string().email().safeParse(email).success) {
      setError(t('auth.err.emailFirst'))
      return
    }
    try {
      await resetPassword(email)
      setNotice(t('auth.notice.resetSent'))
    } catch {
      setError(t('auth.err.resetFailed'))
    }
  }

  const googleLogin = async () => {
    setError(null)
    try {
      await loginWithGoogle()
      router.push('/home')
    } catch (err) {
      // Every Google sign-in failure used to collapse into one message, which
      // made the two setup mistakes that actually cause it indistinguishable
      // from a network blip. The code is Firebase's and stable; name the two
      // that are fixable, and log the rest so a console screenshot is enough
      // to diagnose the next one.
      const code = (err as { code?: string } | null)?.code
      if (code === 'auth/unauthorized-domain') {
        setError(t('auth.err.googleUnauthorizedDomain'))
      } else if (code === 'auth/operation-not-allowed') {
        setError(t('auth.err.googleProviderDisabled'))
      } else {
        setError(t('auth.err.googleUnavailable'))
      }
      // eslint-disable-next-line no-console
      console.error('[auth] Google sign-in failed', code ?? err)
    }
  }

  return (
    <>
      <div className="mb-8 lg:hidden">
        <div className="flex items-center gap-3 text-xl font-bold text-content">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">O</span>
          Optima
        </div>
      </div>

      <Card className="rounded-[24px] p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-content">{t('auth.welcomeBack')}</h2>
        <p className="mb-7 mt-2 text-sm text-content-secondary">{t('auth.signInSubtitle')}</p>

        {configurationError && (
          <div className="mb-5 flex items-start gap-2 rounded-input bg-error/10 px-3 py-2.5 text-xs text-error">
            <ShieldCheck size={16} className="mt-0.5 shrink-0" />
            {t('auth.configError')}
          </div>
        )}

        {error && <div className="mb-4 rounded-input bg-error/10 px-3 py-2 text-sm text-error">{error}</div>}
        {notice && <div className="mb-4 rounded-input bg-success/10 px-3 py-2 text-sm text-success">{notice}</div>}

        <Button variant="outline" fullWidth size="lg" onClick={googleLogin} disabled={configurationError}>
          <span className="mr-1 text-base font-bold">G</span> {t('auth.continueGoogle')}
        </Button>

        <div className="my-6 flex items-center gap-3 text-[10px] font-medium text-content-muted">
          <span className="h-px flex-1 bg-border" /> {t('auth.or')} <span className="h-px flex-1 bg-border" />
        </div>

        {/* method="post" so that if a submit fires before hydration (native
            submit), credentials go in the request body — never the URL query
            string / browser history / proxy logs. preventDefault still applies
            once hydrated. */}
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" type="email" placeholder="you@example.com" icon={<Mail size={17} />} invalid={!!errors.email} {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <button
                type="button"
                onClick={requestPasswordReset}
                disabled={configurationError}
                className="mb-1 text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('auth.forgot')}
              </button>
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock size={17} />}
              invalid={!!errors.password}
              endAdornment={
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={t('auth.togglePassword')}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
              {...register('password')}
            />
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
          </div>

          <label className="flex items-center gap-2 text-xs text-content-secondary">
            <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" {...register('remember')} />
            {t('auth.rememberMe')}
          </label>

          <Button type="submit" fullWidth size="lg" loading={isSubmitting} disabled={configurationError}>
            {t('auth.signIn')} <ArrowRight size={17} />
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-content-secondary">
          {t('auth.newToOptima')}{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">{t('auth.createAccount')}</Link>
        </p>
      </Card>

      <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-input bg-brand-soft px-4 py-3 text-xs text-content-secondary">
        <ShieldCheck size={15} className="text-primary" /> {t('auth.secureFooter')}
      </div>
    </>
  )
}
