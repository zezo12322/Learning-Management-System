import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-title-sm font-bold text-content">{title}</h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary hover:underline"
        >
          عرض الكل
          <ChevronLeft size={16} />
        </Link>
      )}
    </div>
  )
}
