import { safeLinkUrl } from '@/lib/safeUrl'

/**
 * Terms-of-service content arrives from the API as an HTML string
 * (`TermsOfService.contentHtml`, authored by an admin through POST /admin/tos).
 *
 * It is deliberately NOT rendered with `dangerouslySetInnerHTML`. This parses it
 * into a small block model that the component renders as ordinary React
 * elements, so every piece of text goes through React's own escaping. The worst
 * a malformed — or hostile — document can do is come out formatted wrongly;
 * it cannot execute. That matters because the value is stored HTML that a
 * compromised or careless admin account can set, and the web app has no HTML
 * sanitiser of its own.
 *
 * The supported subset is what a legal document actually needs: headings,
 * paragraphs, lists and links. Anything else contributes its text and loses its
 * markup, which is the safe direction to fail in.
 */

export type TosInline = { text: string; href?: string; bold?: boolean }

export type TosBlock =
  | { kind: 'heading'; level: 2 | 3; content: TosInline[] }
  | { kind: 'paragraph'; content: TosInline[] }
  | { kind: 'list'; ordered: boolean; items: TosInline[][] }

type Token = { tag: string; closing: boolean; attrs: string } | { text: string }

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  '#39': "'",
  nbsp: ' ',
}

/** Decode the handful of entities a rich-text editor emits. */
function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, name: string) => {
    const named = ENTITIES[name.toLowerCase()] ?? ENTITIES[name]
    if (named) return named
    if (name.startsWith('#x') || name.startsWith('#X')) {
      const code = Number.parseInt(name.slice(2), 16)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    if (name.startsWith('#')) {
      const code = Number.parseInt(name.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    return whole
  })
}

/**
 * Split into tags and text runs.
 *
 * `<script>`/`<style>` bodies are dropped wholesale rather than treated as text
 * — otherwise the source of a script would be shown to the reader as prose.
 */
function tokenize(html: string): Token[] {
  const tokens: Token[] = []
  const pattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g
  let index = 0
  let match: RegExpExecArray | null
  let skipUntil: string | null = null

  while ((match = pattern.exec(html)) !== null) {
    const [whole, rawTag, attrs] = match
    const tag = rawTag.toLowerCase()
    const closing = whole.startsWith('</')

    if (skipUntil) {
      // Inside <script>/<style>: discard everything up to the matching close.
      if (closing && tag === skipUntil) skipUntil = null
      index = pattern.lastIndex
      continue
    }

    if (match.index > index) tokens.push({ text: html.slice(index, match.index) })
    index = pattern.lastIndex

    if (!closing && (tag === 'script' || tag === 'style')) {
      skipUntil = tag
      continue
    }
    tokens.push({ tag, closing, attrs })
  }

  if (index < html.length) tokens.push({ text: html.slice(index) })
  return tokens
}

/** `href` of an `<a>`, but only when it is a safe link target. */
function hrefOf(attrs: string): string | undefined {
  const match = /\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/i.exec(attrs)
  if (!match) return undefined
  const raw = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '')
  return safeLinkUrl(raw) ?? undefined
}

const BLOCK_TAGS = new Set([
  'p',
  'div',
  'section',
  'article',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'br',
  'blockquote',
  'table',
  'tr',
  'hr',
])

const BOLD_TAGS = new Set(['strong', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

/** Collapse runs of whitespace the way HTML rendering would. */
function collapse(value: string): string {
  return value.replace(/\s+/g, ' ')
}

function pushText(target: TosInline[], text: string, href?: string, bold?: boolean) {
  if (!text) return
  const last = target[target.length - 1]
  if (last && last.href === href && last.bold === bold) {
    last.text += text
    return
  }
  target.push({ text, ...(href ? { href } : {}), ...(bold ? { bold: true } : {}) })
}

function trimInline(content: TosInline[]): TosInline[] {
  const parts = content
    .map((part) => ({ ...part }))
    .filter((part) => part.text.length > 0)
  if (parts.length > 0) {
    parts[0].text = parts[0].text.replace(/^\s+/, '')
    parts[parts.length - 1].text = parts[parts.length - 1].text.replace(/\s+$/, '')
  }
  return parts.filter((part) => part.text.length > 0)
}

/**
 * Parse an admin-authored ToS document into renderable blocks.
 *
 * Returns an empty array for empty or markup-only input, which the caller shows
 * as "terms unavailable" rather than an empty page.
 */
export function parseTosContent(html: string | null | undefined): TosBlock[] {
  if (!html || typeof html !== 'string') return []

  const blocks: TosBlock[] = []
  let inline: TosInline[] = []
  let heading: 2 | 3 | null = null
  let list: { ordered: boolean; items: TosInline[][] } | null = null
  let listItem: TosInline[] | null = null
  let href: string | undefined
  let boldDepth = 0

  const flushListItem = () => {
    if (listItem && list) {
      const trimmed = trimInline(listItem)
      if (trimmed.length > 0) list.items.push(trimmed)
    }
    listItem = null
  }

  const flushList = () => {
    flushListItem()
    if (list && list.items.length > 0) blocks.push({ kind: 'list', ...list })
    list = null
  }

  const flushInline = () => {
    const trimmed = trimInline(inline)
    inline = []
    if (trimmed.length === 0) {
      heading = null
      return
    }
    blocks.push(
      heading ? { kind: 'heading', level: heading, content: trimmed } : { kind: 'paragraph', content: trimmed },
    )
    heading = null
  }

  for (const token of tokenize(html)) {
    if ('text' in token) {
      const text = collapse(decodeEntities(token.text))
      if (!text.trim() && !(listItem ?? inline).length) continue
      pushText(listItem ?? inline, text, href, boldDepth > 0)
      continue
    }

    const { tag, closing, attrs } = token

    if (tag === 'a') {
      // A link's text is kept even when its target is unsafe or missing.
      href = closing ? undefined : hrefOf(attrs)
      continue
    }

    if (BOLD_TAGS.has(tag) && !BLOCK_TAGS.has(tag)) {
      boldDepth = closing ? Math.max(0, boldDepth - 1) : boldDepth + 1
      continue
    }

    if (!BLOCK_TAGS.has(tag)) continue // em, span, u, img, … keep their text only

    if (tag === 'br') {
      pushText(listItem ?? inline, ' ', href, boldDepth > 0)
      continue
    }

    if (tag === 'ul' || tag === 'ol') {
      if (closing) {
        flushList()
      } else {
        flushInline()
        flushList()
        list = { ordered: tag === 'ol', items: [] }
      }
      continue
    }

    if (tag === 'li') {
      flushListItem()
      if (!closing) {
        // A stray <li> outside any list still reads as a list to the user.
        if (!list) list = { ordered: false, items: [] }
        listItem = []
      }
      continue
    }

    // Any other block boundary ends the current paragraph/heading.
    if (list) {
      // Block tags inside a list item just separate text within the item.
      if (listItem) pushText(listItem, ' ', href, boldDepth > 0)
      continue
    }

    flushInline()
    if (!closing && /^h[1-6]$/.test(tag)) {
      // Headings carry their own weight from styling, so they are not marked bold.
      heading = tag === 'h1' || tag === 'h2' ? 2 : 3
    }
  }

  flushList()
  flushInline()
  return blocks
}
