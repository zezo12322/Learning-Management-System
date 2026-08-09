import Image from 'next/image'
import { cn } from '@/lib/utils'
import { safeMediaUrl } from '@/lib/safeUrl'

interface AvatarProps {
  src?: string | null
  name?: string | null
  size?: number
  online?: boolean
  className?: string
}

function initials(name?: string | null) {
  if (!name) return '؟'
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 40, online, className }: AvatarProps) {
  // Avatar URLs come from the API (and ultimately from user profiles), so an
  // unvalidated value would put an arbitrary scheme into <img src>. An
  // unusable URL falls back to the initials rather than a broken image.
  const safeSrc = safeMediaUrl(src)
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ width: size, height: size }}>
      {safeSrc ? (
        <Image
          src={safeSrc}
          alt={name ?? ''}
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
          style={{ fontSize: size * 0.38 }}
        >
          {initials(name)}
        </span>
      )}
      {online && (
        <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-surface bg-success" />
      )}
    </span>
  )
}
