/**
 * URL sanitising for values that came from the API.
 *
 * Course thumbnails, transcript links, avatars and submission files are all
 * authored by other users (instructors, or the learners themselves). Putting
 * such a value straight into `href` or `src` is an XSS sink: `javascript:`,
 * `data:text/html` and `vbscript:` URLs all execute when the link is clicked or
 * the element is rendered. These helpers keep the allowed set to http(s) — plus
 * relative paths, and `blob:`/`data:image` where an image is genuinely expected.
 */

const SAFE_LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])
const SAFE_MEDIA_PROTOCOLS = new Set(['http:', 'https:', 'blob:'])

function parse(value: string): URL | null {
  try {
    // A relative value resolves against a fixed base, so `/x` and `foo.png` stay
    // relative-safe without depending on `window` (this runs during SSR too).
    return new URL(value, 'https://optima.invalid/')
  } catch {
    return null
  }
}

/**
 * A link target safe to put in `href`, or `null` when it is not.
 * Relative paths are preserved as-is; absolute URLs must be http(s)/mailto.
 */
export function safeLinkUrl(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const url = parse(trimmed)
  if (!url || !SAFE_LINK_PROTOCOLS.has(url.protocol)) return null
  // Relative input stays relative — only reject it if it smuggled a protocol.
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed
  return url.href
}

/**
 * An image/media source safe to put in `src`, or `null` when it is not.
 * `data:` is allowed only for images, never for `data:text/html`.
 */
export function safeMediaUrl(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^data:image\/(png|jpe?g|gif|webp|avif);/i.test(trimmed)) return trimmed
  const url = parse(trimmed)
  if (!url || !SAFE_MEDIA_PROTOCOLS.has(url.protocol)) return null
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed
  return url.href
}

/** Uppercase file extension for display, e.g. "PDF". Empty when unknown. */
export function fileExtension(value: string | null | undefined): string {
  if (!value) return ''
  const path = parse(value)?.pathname ?? value
  const match = /\.([a-zA-Z0-9]{1,6})$/.exec(path)
  return match ? match[1].toUpperCase() : ''
}

/** Last path segment, for showing a file name instead of a long signed URL. */
export function fileNameFromUrl(value: string | null | undefined, fallback = ''): string {
  if (!value) return fallback
  const path = parse(value)?.pathname ?? value
  const name = path.split('/').filter(Boolean).pop()
  if (!name) return fallback
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}
