import { describe, expect, it } from 'vitest'
import { parseTosContent } from './tosContent'

const textOf = (blocks: ReturnType<typeof parseTosContent>) =>
  blocks
    .map((block) =>
      block.kind === 'list'
        ? block.items.map((item) => item.map((part) => part.text).join('')).join(' | ')
        : block.content.map((part) => part.text).join(''),
    )
    .join('\n')

describe('parseTosContent', () => {
  it('parses headings, paragraphs and lists', () => {
    const blocks = parseTosContent(
      '<h1>Terms</h1><p>You agree to the following:</p><ul><li>Be nice</li><li>Pay on time</li></ul>',
    )
    expect(blocks).toEqual([
      { kind: 'heading', level: 2, content: [{ text: 'Terms' }] },
      { kind: 'paragraph', content: [{ text: 'You agree to the following:' }] },
      {
        kind: 'list',
        ordered: false,
        items: [[{ text: 'Be nice' }], [{ text: 'Pay on time' }]],
      },
    ])
  })

  it('returns no blocks for empty, nullish or markup-only input', () => {
    expect(parseTosContent(null)).toEqual([])
    expect(parseTosContent('')).toEqual([])
    expect(parseTosContent('   ')).toEqual([])
    expect(parseTosContent('<div><p></p></div>')).toEqual([])
  })

  it('drops script bodies instead of showing them as prose', () => {
    // Rendering the source of a script as text would be absurd but harmless;
    // what must never happen is it reaching the DOM as markup. Since the output
    // is React elements, the text form is the only risk, and it is dropped.
    const blocks = parseTosContent('<p>Hello</p><script>alert("xss")</script><p>Bye</p>')
    expect(textOf(blocks)).toBe('Hello\nBye')
    expect(JSON.stringify(blocks)).not.toContain('alert')
  })

  it('keeps link text but discards unsafe hrefs', () => {
    const blocks = parseTosContent(
      '<p>See <a href="javascript:alert(1)">this</a> and <a href="https://example.com/tos">that</a></p>',
    )
    const paragraph = blocks[0]
    expect(paragraph.kind).toBe('paragraph')
    if (paragraph.kind !== 'paragraph') throw new Error('expected a paragraph')
    expect(paragraph.content).toEqual([
      { text: 'See ' },
      { text: 'this' },
      { text: ' and ' },
      { text: 'that', href: 'https://example.com/tos' },
    ])
  })

  it('strips unsupported tags but keeps their text', () => {
    const blocks = parseTosContent('<p>An <em>emphasised</em> <span>word</span></p>')
    expect(textOf(blocks)).toBe('An emphasised word')
  })

  it('marks strong and b runs as bold', () => {
    const blocks = parseTosContent('<p>You <strong>must</strong> agree</p>')
    const paragraph = blocks[0]
    if (paragraph.kind !== 'paragraph') throw new Error('expected a paragraph')
    expect(paragraph.content).toEqual([
      { text: 'You ' },
      { text: 'must', bold: true },
      { text: ' agree' },
    ])
  })

  it('decodes entities and collapses whitespace', () => {
    const blocks = parseTosContent('<p>Terms\n   &amp;   conditions &#39;24</p>')
    expect(textOf(blocks)).toBe("Terms & conditions '24")
  })

  it('keeps ordered lists ordered', () => {
    const blocks = parseTosContent('<ol><li>First</li><li>Second</li></ol>')
    expect(blocks[0]).toEqual({
      kind: 'list',
      ordered: true,
      items: [[{ text: 'First' }], [{ text: 'Second' }]],
    })
  })

  it('recovers from unclosed tags rather than losing the rest of the document', () => {
    // Hand-written or editor-mangled HTML should still be readable — a legal
    // document silently truncating is worse than it rendering flat.
    const blocks = parseTosContent('<p>One<p>Two<ul><li>Three<li>Four</ul><p>Five')
    expect(textOf(blocks)).toBe('One\nTwo\nThree | Four\nFive')
  })

  it('treats plain text with no markup as a paragraph', () => {
    expect(textOf(parseTosContent('Just the terms.'))).toBe('Just the terms.')
  })
})
