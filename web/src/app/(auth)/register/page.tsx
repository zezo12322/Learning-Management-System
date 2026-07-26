'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type FormValues = { name: string; email: string; nationalId: string; password: string }

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const t = useT()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const schema = z.object({
    name: z.string().min(2, t('reg.val.name')).max(50),
    email: z.string().email(t('auth.val.email')),
    nationalId: z.string().regex(/^\d{14}$/, t('reg.val.nationalId')),
    password: z
      .string()
      .min(8, t('reg.val.pwLen'))
      .regex(/[A-Z]/, t('reg.val.pwUpper'))
      .regex(/[0-9]/, t('reg.val.pwNum')),
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      await registerUser(values)
      router.push('/dashboard')
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : t('reg.err.generic'))
    }
  }

  return (
    <Card className="rounded-[24px] p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-9">
      <h1 className="text-3xl font-bold tracking-tight text-content">{t('reg.title')}</h1>
      <p className="mb-6 mt-2 text-sm text-content-secondary">{t('reg.subtitle')}</p>
      {error && <div className="mb-4 rounded-input bg-error/10 px-3 py-2 text-xs text-error">{error}</div>}
      {/* method="post" so a pre-hydration native submit sends fields in the
          request body, not the URL query string (avoids leaking password /
          nationalId into history & logs). preventDefault still applies once hydrated. */}
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div><Label htmlFor="name">{t('reg.fullName')}</Label><Input id="name" icon={<User size={17} />} invalid={!!errors.name} {...register('name')} />{errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}</div>
        <div><Label htmlFor="email">{t('auth.email')}</Label><Input id="email" type="email" icon={<Mail size={17} />} placeholder="you@example.com" invalid={!!errors.email} {...register('email')} />{errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}</div>
        <div><Label htmlFor="nationalId">{t('reg.nationalId')}</Label><Input id="nationalId" inputMode="numeric" maxLength={14} icon={<CreditCard size={17} />} invalid={!!errors.nationalId} {...register('nationalId')} />{errors.nationalId && <p className="mt-1 text-xs text-error">{errors.nationalId.message}</p>}</div>
        <div>
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input id="password" type={showPassword ? 'text' : 'password'} icon={<Lock size={17} />} invalid={!!errors.password} endAdornment={<button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={t('auth.togglePassword')}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>} {...register('password')} />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>{t('reg.createAccount')}</Button>
      </form>
      <p className="mt-6 text-center text-xs text-content-secondary">{t('reg.haveAccount')} <Link href="/login" className="font-semibold text-primary">{t('auth.signIn')}</Link></p>
    </Card>
  )
}
