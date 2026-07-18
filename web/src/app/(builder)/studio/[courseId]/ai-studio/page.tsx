import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'

export default function AIStudioPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="AI Course Studio" description="Course generation tools planned for a future release." />
      <AIUnavailable />
    </div>
  )
}
