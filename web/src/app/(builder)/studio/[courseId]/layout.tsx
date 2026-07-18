import { BuilderShell } from '@/components/layout/BuilderShell'

export default async function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  return <BuilderShell courseId={courseId}>{children}</BuilderShell>
}
