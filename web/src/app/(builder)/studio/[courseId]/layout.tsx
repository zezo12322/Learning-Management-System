import { BuilderShell } from '@/components/layout/BuilderShell'
import { StaffGate } from '@/components/layout/StaffGate'

export default async function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  return (
    <StaffGate>
      <BuilderShell courseId={courseId}>{children}</BuilderShell>
    </StaffGate>
  )
}
