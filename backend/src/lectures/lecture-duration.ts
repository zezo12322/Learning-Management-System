/**
 * Deriving a lecture's length from what it actually contains, rather than from
 * a number somebody typed.
 *
 * `duration` drives more than a label: the server credits completion at
 * `duration * COMPLETION_THRESHOLD` (see progress/lecture-progress.queue.ts), so
 * a lecture carrying a guess is credited at the wrong moment — early if the
 * guess is short, never if it is zero.
 */

/**
 * Exact duration of a packaged lecture, summed from its HLS playlist.
 *
 * The playlist is the transcode's own record of what it produced: FFmpeg writes
 * one `#EXTINF:<seconds>,` per segment, and their sum is the media's length to
 * the millisecond. Reading it costs one small text download, where re-probing
 * would mean pulling the whole source MP4 back out of storage.
 *
 * Returns null when the text carries no segment lines at all — an ABR *master*
 * that only references variant playlists, an error page, a truncated read. Null
 * means "this playlist cannot answer", which callers must not confuse with a
 * genuine zero.
 */
export function hlsPlaylistDurationSeconds(playlist: string): number | null {
  // `#EXTINF:12.345,` — the trailing title after the comma is optional and
  // ignored. Anchored to the line start so a title containing the tag cannot
  // contribute a phantom segment.
  const matches = playlist.matchAll(/^#EXTINF:\s*([0-9]+(?:\.[0-9]+)?)\s*,/gm);
  let total = 0;
  let found = false;
  for (const match of matches) {
    const seconds = Number(match[1]);
    if (!Number.isFinite(seconds)) continue;
    total += seconds;
    found = true;
  }
  if (!found) return null;
  return Math.round(total);
}

/**
 * Words per minute used to time a reading, by script.
 *
 * Arabic is set lower than Latin: it is read more slowly in controlled studies,
 * and the gap is wide enough that one shared figure would misjudge every reading
 * in one of the two languages the platform ships.
 */
const WORDS_PER_MINUTE = { arabic: 180, latin: 230 } as const;

/** Arabic block + Arabic Supplement/Extended-A, which is what the copy uses. */
const ARABIC_CHAR = /[؀-ۿݐ-ݿࢠ-ࣿ]/g;

/**
 * Estimated time to read a lesson's body text.
 *
 * A word count, not a language model: reading speed is a property of the reader
 * and the script, so the same text must always produce the same number. An
 * estimate that drifts between calls would move the completion bar underneath
 * learners who are part-way through.
 *
 * Returns 0 for empty or whitespace-only content, which callers should treat as
 * "nothing to time" rather than writing a zero that makes the lesson
 * uncompletable.
 */
export function readingDurationSeconds(
  content: string | null | undefined,
): number {
  const text = (content ?? '').trim();
  if (!text) return 0;

  const words = text.split(/\s+/).filter(Boolean).length;
  if (!words) return 0;

  // Script is decided by the body of the text, not by its first character: a
  // heading in English above Arabic prose must not retime the whole lesson.
  const arabicChars = text.match(ARABIC_CHAR)?.length ?? 0;
  const letters = text.replace(/[^\p{L}]/gu, '').length;
  const arabic = letters > 0 && arabicChars / letters >= 0.5;

  const wpm = arabic ? WORDS_PER_MINUTE.arabic : WORDS_PER_MINUTE.latin;
  // At least a minute: the player and the course page both round to minutes, so
  // anything shorter would display as "0m" — which reads as "not timed yet" and
  // is the value that makes a lecture uncompletable.
  return Math.max(60, Math.round((words / wpm) * 60));
}
