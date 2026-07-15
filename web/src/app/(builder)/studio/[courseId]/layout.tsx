import { BuilderShell } from '@/components/layout/BuilderShell'

export default function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) {
  return <BuilderShell courseId={params.courseId}>{children}</BuilderShell>
}
