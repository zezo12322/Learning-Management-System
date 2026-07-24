'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Copy, CreditCard, Mail, ShieldAlert, User, UserPlus } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { callCloudFunction } from '@/lib/auth/cloudFunctions'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type FormValues = { name: string; email: string; nationalId: string }
type Created = { email: string; password: string }

/**
 * Admin-created students get a generated temporary password (the admin never
 * invents one). It satisfies the backend policy — >= 8 chars with an uppercase
 * letter and a digit — plus a lowercase letter and symbol for strength.
 */
function generateTempPassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lower = 'abcdefghijkmnpqrstuvwxyz'
  const digits = '23456789'
  const symbols = '@#$%&*'
  const all = upper + lower + digits + symbols
  const bytes = new Uint32Array(12)
  crypto.getRandomValues(bytes)
  const at = (set: string, n: number) => set[n % set.length]
  const chars = [
    at(upper, bytes[0]),
    at(lower, bytes[1]),
    at(digits, bytes[2]),
    at(symbols, bytes[3]),
    ...Array.from(bytes.slice(4), (b) => at(all, b)),
  ]
  // Fisher–Yates shuffle so the guaranteed characters aren't always up front.
  const order = new Uint32Array(chars.length)
  crypto.getRandomValues(order)
  for (let i = chars.length - 1; i > 0; i--) {
    const j = order[i] % (i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

export default function StudentsPage() {
  const t = useT()
  const { roles } = useAuth()
  const canManage = roles.includes('admin') || roles.includes('instructor')

  const [created, setCreated] = useState<Created | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const schema = z.object({
    name: z.string().min(2, t('reg.val.name')).max(50),
    email: z.string().email(t('auth.val.email')),
    nationalId: z.string().regex(/^\d{14}$/, t('reg.val.nationalId')),
  })
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  if (!canManage) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('students.title')} description={t('students.subtitle')} />
        <Card className="flex items-center gap-3 p-5 text-sm text-content-secondary">
          <ShieldAlert size={18} className="shrink-0 text-error" />
          {t('students.accessDenied')}
        </Card>
      </div>
    )
  }

  const onSubmit = async (values: FormValues) => {
    setError(null)
    const password = generateTempPassword()
    try {
      // registerStudent is deployed to europe-west3; it creates the auth user,
      // the DB row, and fires the welcome email (KAN-40). The admin stays signed
      // in — we deliberately do NOT sign in as the new student.
      await callCloudFunction('registerStudent', 'europe-west3', { ...values, password })
      setCreated({ email: values.email, password })
      reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t('students.err.generic'))
    }
  }

  const copyPassword = async () => {
    if (!created) return
    try {
      await navigator.clipboard.writeText(created.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — the password is visible on screen anyway */
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t('students.title')} description={t('students.subtitle')} />

      {created ? (
        <Card className="max-w-xl space-y-4 p-6">
          <div className="flex items-center gap-2 text-success">
            <Check size={18} />
            <span className="font-semibold">{t('students.successTitle')}</span>
          </div>
          <p className="text-sm leading-6 text-content-secondary">{t('students.successBody')}</p>
          <div className="space-y-2 rounded-input border border-border bg-background p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-content-muted">{t('students.credEmail')}</span>
              <span className="font-medium text-content">{created.email}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-content-muted">{t('students.tempPassword')}</span>
              <span className="flex items-center gap-2">
                <code className="rounded bg-subtle px-2 py-1 font-mono text-content">{created.password}</code>
                <button
                  type="button"
                  onClick={copyPassword}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  {copied ? <><Check size={13} /> {t('students.copied')}</> : <><Copy size={13} /> {t('students.copy')}</>}
                </button>
              </span>
            </div>
          </div>
          <Button onClick={() => setCreated(null)}>
            <UserPlus size={16} /> {t('students.addAnother')}
          </Button>
        </Card>
      ) : (
        <Card className="max-w-xl p-6">
          <h2 className="text-lg font-semibold text-content">{t('students.formTitle')}</h2>
          <p className="mb-5 mt-1 text-sm text-content-secondary">{t('students.formSubtitle')}</p>
          {error && <div className="mb-4 rounded-input bg-error/10 px-3 py-2 text-xs text-error">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('reg.fullName')}</Label>
              <Input id="name" icon={<User size={17} />} invalid={!!errors.name} {...register('name')} />
              {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input id="email" type="email" icon={<Mail size={17} />} placeholder="student@example.com" invalid={!!errors.email} {...register('email')} />
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="nationalId">{t('reg.nationalId')}</Label>
              <Input id="nationalId" inputMode="numeric" maxLength={14} icon={<CreditCard size={17} />} invalid={!!errors.nationalId} {...register('nationalId')} />
              {errors.nationalId && <p className="mt-1 text-xs text-error">{errors.nationalId.message}</p>}
            </div>
            <Button type="submit" size="lg" loading={isSubmitting}>{t('students.submit')}</Button>
          </form>
        </Card>
      )}
    </div>
  )
}
