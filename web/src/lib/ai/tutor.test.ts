import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios'

import { apiClient } from '@/lib/api/client'
import {
  askTutor,
  generateAsset,
  getAiIngestStatus,
  retryAiIngest,
  toTutorError,
  TutorError,
} from './tutor'

/** Build an AxiosError the way axios itself would for an HTTP error response. */
function httpError(status: number, data?: unknown): AxiosError {
  const headers = new AxiosHeaders()
  const config = { headers }
  const response = { status, data, statusText: '', headers, config } as AxiosResponse
  return new AxiosError('failed', 'ERR_BAD_REQUEST', config, {}, response)
}

/** A transport failure — no response at all (offline, DNS, CORS preflight). */
function networkError(): AxiosError {
  const headers = new AxiosHeaders()
  return new AxiosError('Network Error', 'ERR_NETWORK', { headers }, {})
}

/** An axios timeout: also no response, but the request did reach the server. */
function timeoutError(): AxiosError {
  const headers = new AxiosHeaders()
  return new AxiosError('timeout of 90000ms exceeded', 'ECONNABORTED', { headers }, {})
}

function ok<T>(data: T): AxiosResponse<T> {
  const headers = new AxiosHeaders()
  return { data, status: 200, statusText: 'OK', headers, config: { headers } } as AxiosResponse<T>
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('toTutorError', () => {
  it('maps 403 to NOT_ENROLLED and surfaces the backend reason', () => {
    const err = toTutorError(
      httpError(403, {
        statusCode: 403,
        message: 'You must be enrolled in this course to chat with this lecture',
      }),
    )
    expect(err.code).toBe('NOT_ENROLLED')
    expect(err.message).toContain('enrolled')
  })

  it('joins ValidationPipe array messages instead of rendering [object Object]', () => {
    const err = toTutorError(
      httpError(400, { statusCode: 400, message: ['message should not be empty', 'bad sessionId'] }),
    )
    expect(err.code).toBe('AI_ERROR')
    expect(err.message).toBe('message should not be empty; bad sessionId')
  })

  it('distinguishes a transport failure from an HTTP error', () => {
    expect(toTutorError(networkError()).code).toBe('AI_UNREACHABLE')
  })

  it('reports a timeout as a timeout, not as a connection problem', () => {
    const err = toTutorError(timeoutError())
    expect(err.code).toBe('AI_TIMEOUT')
    // Telling the user to check their connection would misdirect them.
    expect(err.message).not.toMatch(/connection/i)
  })

  it.each([
    [401, 'UNAUTHENTICATED'],
    [404, 'LECTURE_NOT_FOUND'],
    [429, 'RATE_LIMITED'],
    [500, 'AI_UNAVAILABLE'],
    [502, 'AI_UNAVAILABLE'],
  ])('maps %i to %s', (status, code) => {
    expect(toTutorError(httpError(status, { statusCode: status })).code).toBe(code)
  })

  it('passes an existing TutorError through unchanged', () => {
    const original = new TutorError('CUSTOM', 'already mapped')
    expect(toTutorError(original)).toBe(original)
  })

  it('never leaks a raw non-axios throw to the UI', () => {
    const err = toTutorError(new Error('boom'))
    expect(err).toBeInstanceOf(TutorError)
    expect(err.message).not.toContain('boom')
  })
})

describe('askTutor', () => {
  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('11111111-2222-4333-8444-555555555555')
  })

  it('calls the backend lecture route — never a Next.js proxy or the AI service', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(ok({ answer: 'hi' }))
    await askTutor({ lectureId: 'lec-1', message: 'what is this?' })

    const [url, body, config] = post.mock.calls[0]
    expect(url).toBe('/ai/lectures/lec-1/chat')
    expect(body).toEqual({
      message: 'what is this?',
      playbackMs: 0,
      sessionId: '11111111-2222-4333-8444-555555555555',
    })
    // No courseId: the backend derives it from the lecture.
    expect(body).not.toHaveProperty('courseId')
    // Must override apiClient's 20s default — a RAG answer takes longer than
    // that, and aborting would look like a network failure to the user.
    expect(config?.timeout).toBeGreaterThan(20_000)
  })

  it('mints a sessionId on the first turn and reuses the caller’s afterwards', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(ok({ answer: 'a' }))

    await askTutor({ lectureId: 'lec-1', message: 'one' })
    expect((post.mock.calls[0][1] as { sessionId: string }).sessionId).toBe(
      '11111111-2222-4333-8444-555555555555',
    )

    await askTutor({ lectureId: 'lec-1', message: 'two', sessionId: 'existing-session' })
    expect((post.mock.calls[1][1] as { sessionId: string }).sessionId).toBe('existing-session')
  })

  it('percent-encodes the lecture id into the path', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(ok({ answer: 'x' }))
    await askTutor({ lectureId: 'a/../b', message: 'q' })
    expect(post.mock.calls[0][0]).toBe('/ai/lectures/a%2F..%2Fb/chat')
  })

  it('maps the RAG snake_case body onto the camelCase contract', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue(
      ok({
        session_id: 'sess-9',
        answer: 'Because of X.',
        grounded: true,
        scope_used: 'video',
        citations: [
          { video_id: 'v1', video_title: 'Lesson 1', start_ms: 1000, end_ms: 4000, label: '0:01' },
        ],
        follow_up_suggestions: ['And Y?'],
      }),
    )

    const res = await askTutor({ lectureId: 'lec-1', message: 'why?' })
    expect(res).toEqual({
      sessionId: 'sess-9',
      answer: 'Because of X.',
      grounded: true,
      scopeUsed: 'video',
      citations: [
        { videoId: 'v1', videoTitle: 'Lesson 1', startMs: 1000, endMs: 4000, label: '0:01' },
      ],
      followUpSuggestions: ['And Y?'],
    })
  })

  it('survives a sparse body without throwing on undefined fields', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue(ok({}))
    const res = await askTutor({ lectureId: 'lec-1', message: 'q' })

    expect(res.answer).toBe('')
    expect(res.grounded).toBe(false)
    expect(res.citations).toEqual([])
    expect(res.followUpSuggestions).toEqual([])
    // Falls back to the id we sent, so the next turn stays in the same session.
    expect(res.sessionId).toBe('11111111-2222-4333-8444-555555555555')
  })

  it('throws a mapped TutorError rather than the raw axios error', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(httpError(403, { message: 'not enrolled' }))
    await expect(askTutor({ lectureId: 'lec-1', message: 'q' })).rejects.toMatchObject({
      code: 'NOT_ENROLLED',
    })
  })
})

describe('generateAsset', () => {
  it('reuses the chat endpoint with a kind-specific prompt', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(ok({ answer: 'summary' }))
    await generateAsset({ lectureId: 'lec-7', kind: 'QUIZ' })

    expect(post.mock.calls[0][0]).toBe('/ai/lectures/lec-7/chat')
    expect((post.mock.calls[0][1] as { message: string }).message).toContain('multiple-choice')
  })
})

describe('getAiIngestStatus', () => {
  it('passes a real status through and keeps the raw body', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue(ok({ status: 'COMPLETED', progress: 100 }))
    const res = await getAiIngestStatus('lec-1')
    expect(res.status).toBe('COMPLETED')
    expect(res.raw).toEqual({ status: 'COMPLETED', progress: 100 })
  })

  it('falls back to UNKNOWN when the body has no usable status', async () => {
    const get = vi.spyOn(apiClient, 'get')

    get.mockResolvedValueOnce(ok({}))
    expect((await getAiIngestStatus('a')).status).toBe('UNKNOWN')

    // A non-string status must not be rendered as-is.
    get.mockResolvedValueOnce(ok({ status: 3 }))
    expect((await getAiIngestStatus('b')).status).toBe('UNKNOWN')

    get.mockResolvedValueOnce(ok({ status: '' }))
    expect((await getAiIngestStatus('c')).status).toBe('UNKNOWN')
  })
})

describe('retryAiIngest', () => {
  it('posts to the retry route and returns the new job id', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(ok({ success: true, aiJobId: 'job-3' }))
    const res = await retryAiIngest('lec-4')

    expect(post.mock.calls[0][0]).toBe('/ai/lectures/lec-4/retry')
    expect(res.aiJobId).toBe('job-3')
  })

  it('maps a 403 from the roles guard', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(httpError(403, { message: 'Forbidden resource' }))
    await expect(retryAiIngest('lec-4')).rejects.toMatchObject({ code: 'NOT_ENROLLED' })
  })
})
