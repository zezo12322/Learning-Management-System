import { cn } from '@/lib/utils'
import { safeMediaUrl } from '@/lib/safeUrl'

const GRADIENTS = [
  'from-indigo-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-green-600',
  'from-pink-500 to-rose-600',
  'from-violet-500 to-fuchsia-600',
]

function pick(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return GRADIENTS[h % GRADIENTS.length]
}

/** Course thumbnail: uses the real image if present, else a deterministic brand gradient. */
export function CourseThumbnail({
  src,
  seed,
  label,
  className,
}: {
  src?: string | null
  seed: string
  label?: string
  className?: string
}) {
  // Instructor-supplied URL — validate before it reaches <img src>, and fall
  // back to the brand gradient when it is not a usable image source.
  const safeSrc = safeMediaUrl(src)
  if (safeSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={safeSrc} alt={label ?? ''} className={cn('object-cover', className)} />
  }
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br p-3 text-center font-bold text-white/95',
        pick(seed),
        className
      )}
    >
      <span className="line-clamp-2 text-sm drop-shadow">{label}</span>
    </div>
  )
}
