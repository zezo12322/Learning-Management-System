import { describe, it, expect } from 'vitest'
import { fileExtension, fileNameFromUrl, safeLinkUrl, safeMediaUrl } from './safeUrl'

describe('safeLinkUrl', () => {
  it('allows http, https and mailto', () => {
    expect(safeLinkUrl('https://example.com/a.pdf')).toBe('https://example.com/a.pdf')
    expect(safeLinkUrl('http://example.com')).toBe('http://example.com/')
    expect(safeLinkUrl('mailto:a@b.com')).toBe('mailto:a@b.com')
  })

  it('keeps relative paths relative', () => {
    expect(safeLinkUrl('/files/a.pdf')).toBe('/files/a.pdf')
    expect(safeLinkUrl('a.pdf')).toBe('a.pdf')
  })

  it('rejects script-bearing protocols', () => {
    for (const value of [
      'javascript:alert(1)',
      'JavaScript:alert(1)',
      '  javascript:alert(1)  ',
      'vbscript:msgbox(1)',
      'data:text/html,<script>alert(1)</script>',
      'data:image/png;base64,AAAA',
    ]) {
      expect(safeLinkUrl(value), value).toBeNull()
    }
  })

  it('rejects empty and missing values', () => {
    expect(safeLinkUrl(null)).toBeNull()
    expect(safeLinkUrl(undefined)).toBeNull()
    expect(safeLinkUrl('   ')).toBeNull()
  })
})

describe('safeMediaUrl', () => {
  it('allows http(s), blob and data:image', () => {
    expect(safeMediaUrl('https://cdn.example.com/x.png')).toBe('https://cdn.example.com/x.png')
    expect(safeMediaUrl('blob:https://example.com/abc')).toBe('blob:https://example.com/abc')
    expect(safeMediaUrl('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })

  it('rejects data:text/html and javascript', () => {
    expect(safeMediaUrl('data:text/html,<script>alert(1)</script>')).toBeNull()
    expect(safeMediaUrl('javascript:alert(1)')).toBeNull()
  })

  it('does not allow mailto as a media source', () => {
    expect(safeMediaUrl('mailto:a@b.com')).toBeNull()
  })
})

describe('fileExtension', () => {
  it('reads the extension from a path or signed URL', () => {
    expect(fileExtension('https://x.test/a/b/guide.pdf?sig=abc')).toBe('PDF')
    expect(fileExtension('notes.DOCX')).toBe('DOCX')
    expect(fileExtension('https://x.test/nofile')).toBe('')
    expect(fileExtension(null)).toBe('')
  })
})

describe('fileNameFromUrl', () => {
  it('takes the last segment and decodes it', () => {
    expect(fileNameFromUrl('https://x.test/a/User%20Guide.pdf?sig=abc')).toBe('User Guide.pdf')
    expect(fileNameFromUrl('', 'fallback')).toBe('fallback')
  })

  it('survives a malformed percent-escape', () => {
    expect(fileNameFromUrl('https://x.test/a/%E0%A4%A.pdf')).toBe('%E0%A4%A.pdf')
  })
})
