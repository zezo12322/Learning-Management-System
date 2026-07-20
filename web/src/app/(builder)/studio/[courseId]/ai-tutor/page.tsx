'use client'

import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'

export default function AITutorPage() {
  const t = useT()
  return (
    <div className="space-y-5">
      <PageHeader title={t('aiTutor.title')} description={t('aiTutor.description')} />
      <AIUnavailable />
    </div>
  )
}
