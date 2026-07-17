import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'

export default function AITutorPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="AI Tutor" description="Learner conversations planned for a future release." />
      <AIUnavailable />
    </div>
  )
}
