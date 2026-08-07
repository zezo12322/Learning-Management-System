import { apiClient } from './client'

/**
 * Client for the sales CRM.
 *
 * Everything goes through the LMS backend rather than the sales-agent service
 * directly: the agent authenticates with a shared secret, and a secret that
 * reaches a browser bundle is not a secret.
 */

export type LeadStage =
  | 'NEW'
  | 'ENGAGED'
  | 'QUALIFYING'
  | 'QUALIFIED'
  | 'DEMO_BOOKED'
  | 'PROPOSAL_SENT'
  | 'WON'
  | 'LOST'
  | 'UNQUALIFIED'
  | 'NURTURE'

export type SalesChannel = 'WHATSAPP' | 'MESSENGER' | 'WEB' | 'EMAIL'

export interface LeadSummary {
  id: string
  full_name: string | null
  phone_e164: string | null
  email: string | null
  segment: 'UNKNOWN' | 'B2C' | 'B2B'
  company_name: string | null
  stage: LeadStage
  score: number
  locale: string | null
  source_channel: SalesChannel | null
  source_campaign: string | null
  owner_user_id: string | null
  human_takeover: boolean
  marketing_opt_in: boolean
  opted_out: boolean
  last_inbound_at: string | null
  last_outbound_at: string | null
  created_at: string | null
  updated_at: string | null
}

export interface LeadMessage {
  id: string
  direction: 'INBOUND' | 'OUTBOUND'
  channel: SalesChannel
  author: 'LEAD' | 'AGENT' | 'HUMAN' | 'SYSTEM'
  text: string
  status: string
  template_name: string | null
  citations: Array<{ title?: string; doc_type?: string; similarity?: number }> | null
  tool_calls: Array<{ tool: string; ok: boolean }> | null
  created_at: string | null
}

export interface LeadEvent {
  id: string
  event_type: string
  actor: string
  payload: Record<string, unknown> | null
  created_at: string | null
}

export interface OutboundRow {
  id: string
  channel: SalesChannel
  kind: string
  template_name: string | null
  body: string | null
  status: string
  skip_reason: string | null
  scheduled_at: string | null
  sent_at: string | null
  attempt_count: number
}

export interface LeadDetail {
  lead: LeadSummary
  qualification: Record<string, unknown>
  score_breakdown: Record<string, number> | null
  missing_fields: string[]
  messages: LeadMessage[]
  events: LeadEvent[]
  outbound: OutboundRow[]
  notes: string | null
}

export interface LeadList {
  items: LeadSummary[]
  total: number
  limit: number
  offset: number
}

export interface SalesStats {
  leads_total: number
  leads_by_stage: Record<string, number>
  leads_by_channel: Record<string, number>
  qualified_or_better: number
  opted_out: number
  awaiting_human: number
  messages_in_last_7d: number
  messages_out_last_7d: number
  outbound_pending: number
  outbound_skipped_last_7d: number
  top_campaigns: Array<{ campaign: string; leads: number }>
}

export interface KnowledgeDocument {
  id: string
  title: string
  doc_type: string
  audience: string
  locale: string
  is_active: boolean
  chunk_count: number | null
  created_at: string | null
  updated_at: string | null
}

export interface SalesSequence {
  id: string
  name: string
  description: string | null
  audience: string
  is_active: boolean
  step_count: number
}

export interface PreviewReply {
  lead_id: string
  reply: string
  stage: LeadStage
  score: number
  citations: Array<{ title?: string; doc_type?: string }>
  tool_calls: Array<{ tool: string; ok: boolean }>
  handoff: { reason: string; urgency: string; summary: string } | null
  agent_ok: boolean
}

export interface LeadFilters {
  stage?: LeadStage
  channel?: SalesChannel
  min_score?: number
  awaiting_human?: boolean
  q?: string
  limit?: number
  offset?: number
}

export const salesApi = {
  listLeads: async (filters: LeadFilters = {}) => {
    const { data } = await apiClient.get<LeadList>('/sales/leads', {
      params: filters,
    })
    return data
  },

  getLead: async (leadId: string) => {
    const { data } = await apiClient.get<LeadDetail>(`/sales/leads/${leadId}`)
    return data
  },

  patchLead: async (
    leadId: string,
    body: Partial<{
      stage: LeadStage
      segment: 'UNKNOWN' | 'B2C' | 'B2B'
      owner_user_id: string
      notes: string
      human_takeover: boolean
      full_name: string
      email: string
      phone: string
      company_name: string
      company_size: number
      opt_out: boolean
    }>,
  ) => {
    const { data } = await apiClient.patch<LeadSummary>(`/sales/leads/${leadId}`, body)
    return data
  },

  sendMessage: async (leadId: string, text: string, channel?: SalesChannel) => {
    const { data } = await apiClient.post<LeadMessage>(
      `/sales/leads/${leadId}/messages`,
      { text, channel },
    )
    return data
  },

  enroll: async (leadId: string, sequenceName: string) => {
    const { data } = await apiClient.post(`/sales/leads/${leadId}/sequences`, {
      sequence_name: sequenceName,
    })
    return data as { enrolled: boolean; reason?: string }
  },

  stopSequences: async (leadId: string) => {
    const { data } = await apiClient.delete(`/sales/leads/${leadId}/sequences`)
    return data as { stopped: number }
  },

  stats: async () => {
    const { data } = await apiClient.get<SalesStats>('/sales/stats')
    return data
  },

  sequences: async () => {
    const { data } = await apiClient.get<SalesSequence[]>('/sales/sequences')
    return data
  },

  listKnowledge: async () => {
    const { data } = await apiClient.get<KnowledgeDocument[]>('/sales/knowledge')
    return data
  },

  addKnowledge: async (body: {
    title: string
    content: string
    doc_type?: string
    audience?: string
    locale?: string
  }) => {
    const { data } = await apiClient.post('/sales/knowledge', body)
    return data as { chunk_count: number; created: boolean }
  },

  retireKnowledge: async (documentId: string) => {
    await apiClient.delete(`/sales/knowledge/${documentId}`)
  },

  seedKnowledge: async () => {
    const { data } = await apiClient.post('/sales/knowledge/seed')
    return data as {
      documents_created: number
      documents_existing: number
      sequences_created: number
      sequences_existing: number
    }
  },

  previewChat: async (sessionId: string, message: string) => {
    const { data } = await apiClient.post<PreviewReply>('/sales/preview/chat', {
      session_id: sessionId,
      message,
    })
    return data
  },

  readiness: async () => {
    const { data } = await apiClient.get<{
      agent_enabled: boolean
      integrations: Record<string, boolean>
      policy: Record<string, unknown>
    }>('/sales/readiness')
    return data
  },
}
