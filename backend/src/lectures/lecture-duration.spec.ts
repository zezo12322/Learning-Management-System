import {
  hlsPlaylistDurationSeconds,
  readingDurationSeconds,
} from './lecture-duration';

describe('hlsPlaylistDurationSeconds', () => {
  const playlist = (extinfs: string[]) =>
    [
      '#EXTM3U',
      '#EXT-X-VERSION:3',
      '#EXT-X-TARGETDURATION:6',
      '#EXT-X-KEY:METHOD=AES-128,URI="enc.key",IV=0x00',
      ...extinfs,
      '#EXT-X-ENDLIST',
    ].join('\n');

  it('sums the segment durations', () => {
    const text = playlist([
      '#EXTINF:6.000000,',
      'seg_000.ts',
      '#EXTINF:6.000000,',
      'seg_001.ts',
      '#EXTINF:5.023000,',
      'seg_002.ts',
    ]);
    expect(hlsPlaylistDurationSeconds(text)).toBe(17);
  });

  it('keeps the fractional total rather than truncating each segment', () => {
    // Three 5.6s segments are 16.8s. Flooring each one would report 15.
    const text = playlist([
      '#EXTINF:5.600000,',
      'a.ts',
      '#EXTINF:5.600000,',
      'b.ts',
      '#EXTINF:5.600000,',
      'c.ts',
    ]);
    expect(hlsPlaylistDurationSeconds(text)).toBe(17);
  });

  it('accepts a segment title after the comma', () => {
    const text = playlist(['#EXTINF:6.0,part one', 'a.ts']);
    expect(hlsPlaylistDurationSeconds(text)).toBe(6);
  });

  it('returns null for a playlist with no segments', () => {
    // An ABR master references variants and has no EXTINF of its own; treating
    // that as zero would blank the lecture's duration.
    const master = [
      '#EXTM3U',
      '#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360',
      '360p.m3u8',
    ].join('\n');
    expect(hlsPlaylistDurationSeconds(master)).toBeNull();
  });

  it('returns null for text that is not a playlist at all', () => {
    expect(hlsPlaylistDurationSeconds('<html>404</html>')).toBeNull();
    expect(hlsPlaylistDurationSeconds('')).toBeNull();
  });

  it('ignores an EXTINF-looking string that is not at the start of a line', () => {
    const text = playlist([
      '#EXTINF:6.0,see #EXTINF:999.0, in the title',
      'a.ts',
    ]);
    expect(hlsPlaylistDurationSeconds(text)).toBe(6);
  });
});

describe('readingDurationSeconds', () => {
  const words = (n: number, word = 'word') => Array(n).fill(word).join(' ');

  it('times Latin text at 230 wpm', () => {
    // 230 words is one minute exactly.
    expect(readingDurationSeconds(words(230))).toBe(60);
    expect(readingDurationSeconds(words(460))).toBe(120);
  });

  it('times Arabic text more slowly than Latin', () => {
    const arabic = readingDurationSeconds(words(900, 'كلمة'));
    const latin = readingDurationSeconds(words(900));
    expect(arabic).toBeGreaterThan(latin);
    // 900 words at 180 wpm is 5 minutes.
    expect(arabic).toBe(300);
  });

  it('picks the script from the bulk of the text, not its first word', () => {
    // An English heading above Arabic prose is still an Arabic reading.
    const text = `Introduction\n${words(900, 'كلمة')}`;
    expect(readingDurationSeconds(text)).toBe(300);
  });

  it('never returns less than a minute for text that exists', () => {
    // Both surfaces round to minutes, and 0 is the value that makes a lecture
    // uncompletable — so a two-word reading is a minute, not zero.
    expect(readingDurationSeconds('two words')).toBe(60);
  });

  it('returns 0 when there is nothing to read', () => {
    expect(readingDurationSeconds('')).toBe(0);
    expect(readingDurationSeconds('   \n\t ')).toBe(0);
    expect(readingDurationSeconds(null)).toBe(0);
    expect(readingDurationSeconds(undefined)).toBe(0);
  });

  it('is deterministic — the same text always gives the same length', () => {
    const text = words(517, 'كلمة');
    const runs = new Set([
      readingDurationSeconds(text),
      readingDurationSeconds(text),
      readingDurationSeconds(text),
    ]);
    expect(runs.size).toBe(1);
  });
});
