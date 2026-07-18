import type { AIAvailability } from '@/lib/types'

export interface AISource {
  id: string
  title: string
  kind: 'COURSE' | 'SECTION' | 'LECTURE' | 'RESOURCE'
}

export interface AICitation {
  sourceId: string
  label: string
  excerpt?: string
}

export interface AIGenerationRequest {
  courseId: string
  kind: 'OUTCOMES' | 'SUMMARY' | 'QUIZ' | 'LESSON_PLAN'
  prompt: string
  sourceIds: string[]
}

export interface AIChatMessage {
  role: 'user' | 'assistant'
  content: string
  citations?: AICitation[]
}

export interface AIResponse {
  content: string
  citations: AICitation[]
  provider: string
  model: string
}

export class AIUnavailableError extends Error {
  readonly code = 'AI_NOT_CONFIGURED'

  constructor() {
    super('Connect an AI provider and configure the provider-neutral API contract to enable this action.')
  }
}

const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL

export function getAIAvailability(): AIAvailability {
  if (!AI_BASE_URL) return { available: false, reason: 'NOT_CONFIGURED' }
  return { available: true, provider: process.env.NEXT_PUBLIC_AI_PROVIDER || 'configured provider' }
}

async function request<T>(path: string, body: unknown): Promise<T> {
  if (!AI_BASE_URL) throw new AIUnavailableError()
  const response = await fetch(`${AI_BASE_URL.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error('The AI service could not complete the request.')
  return response.json() as Promise<T>
}

export const aiApi = {
  generate: (payload: AIGenerationRequest) => request<AIResponse>('/generate', payload),
  chat: (payload: { courseId: string; messages: AIChatMessage[]; sourceIds: string[] }) =>
    request<AIResponse>('/chat', payload),
}
