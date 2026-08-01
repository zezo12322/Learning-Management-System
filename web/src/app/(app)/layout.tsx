import { AppShell } from '@/components/layout/AppShell'
import { StaffGate } from '@/components/layout/StaffGate'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <StaffGate>
      <AppShell>{children}</AppShell>
    </StaffGate>
  )
}
