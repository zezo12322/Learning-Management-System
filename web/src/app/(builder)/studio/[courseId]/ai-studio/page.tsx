'use client'

import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'

export default function AIStudioPage() {
  const t = useT()
  return (
    <div className="space-y-5">
      <PageHeader title={t('aiStudio.title')} description={t('aiStudio.description')} />
      <AIUnavailable />
    </div>
  )
}
