'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Download, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { salesApi } from '@/lib/api/sales'
import { useI18n } from '@/lib/i18n'

const DOC_TYPES = [
  'PRODUCT',
  'PRICING',
  'FAQ',
  'OBJECTION',
  'CASE_STUDY',
  'POLICY',
  'COURSE',
] as const
const AUDIENCES = ['ALL', 'B2B', 'B2C'] as const

/**
 * The knowledge base is what the agent is allowed to say.
 *
 * Retiring a document is a soft retire, not a delete: knowing what the agent was
 * grounding on last month is the only way to explain an answer it gave last
 * month.
 */
export function KnowledgeManager() {
  const { t } = useI18n()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [docType, setDocType] = useState<string>('PRODUCT')
  const [audience, setAudience] = useState<string>('ALL')
  const [locale, setLocale] = useState('ar')

  const documentsQuery = useQuery({
    queryKey: ['sales-knowledge'],
    queryFn: salesApi.listKnowledge,
  })

  const invalidate = () =>
    void queryClient.invalidateQueries({ queryKey: ['sales-knowledge'] })

  const add = useMutation({
    mutationFn: () =>
      salesApi.addKnowledge({
        title: title.trim(),
        content: content.trim(),
        doc_type: docType,
        audience,
        locale,
      }),
    onSuccess: () => {
      setTitle('')
      setContent('')
      invalidate()
    },
  })
  const retire = useMutation({
    mutationFn: (documentId: string) => salesApi.retireKnowledge(documentId),
    onSuccess: invalidate,
  })
  const seed = useMutation({ mutationFn: salesApi.seedKnowledge, onSuccess: invalidate })

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BookOpen className="h-4 w-4" />
            {t('sales.kb.title')}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => seed.mutate()}
            disabled={seed.isPending}
          >
            <Download className="me-1 h-3.5 w-3.5" />
            {t('sales.kb.seed')}
          </Button>
        </div>

        {seed.data && (
          <p className="mb-2 text-xs text-emerald-700">
            {t('sales.kb.seedDone')} +{seed.data.documents_created} /{' '}
            {seed.data.documents_existing} · +{seed.data.sequences_created}
          </p>
        )}

        {documentsQuery.isLoading ? (
          <div className="flex justify-center p-6">
            <Spinner />
          </div>
        ) : (documentsQuery.data ?? []).length === 0 ? (
          <p className="text-sm text-slate-500">{t('sales.kb.empty')}</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {(documentsQuery.data ?? []).map((document) => (
              <li key={document.id} className="flex items-start justify-between gap-2 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {document.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                    <Badge tone="muted">{document.doc_type}</Badge>
                    <Badge tone="muted">{document.audience}</Badge>
                    <span>{document.locale}</span>
                    <span>· {document.chunk_count ?? 0} {t('sales.kb.chunks')}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => retire.mutate(document.id)}
                  disabled={retire.isPending}
                  aria-label={t('sales.kb.retire')}
                >
                  <Trash2 className="h-4 w-4 text-slate-400" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          {t('sales.kb.addTitle')}
        </h3>
        <p className="mb-3 text-xs text-slate-500">{t('sales.kb.addHint')}</p>

        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            if (title.trim() && content.trim()) add.mutate()
          }}
        >
          <div>
            <Label htmlFor="kb-title">{t('sales.kb.docTitle')}</Label>
            <Input
              id="kb-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={300}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="kb-type">{t('sales.kb.docType')}</Label>
              <select
                id="kb-type"
                value={docType}
                onChange={(event) => setDocType(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
              >
                {DOC_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="kb-audience">{t('sales.kb.audience')}</Label>
              <select
                id="kb-audience"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
              >
                {AUDIENCES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="kb-locale">{t('sales.kb.locale')}</Label>
              <select
                id="kb-locale"
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
              >
                <option value="ar">ar</option>
                <option value="en">en</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="kb-content">{t('sales.kb.content')}</Label>
            <textarea
              id="kb-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={10}
              maxLength={200000}
              required
              className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm"
              placeholder={t('sales.kb.contentPlaceholder')}
            />
          </div>

          <Button type="submit" disabled={add.isPending || !title.trim() || !content.trim()}>
            {t('sales.kb.add')}
          </Button>

          {add.data && (
            <p className="text-xs text-emerald-700">
              {add.data.created ? t('sales.kb.added') : t('sales.kb.duplicate')} ·{' '}
              {add.data.chunk_count} {t('sales.kb.chunks')}
            </p>
          )}
          {add.isError && (
            <p className="text-xs text-rose-700">{t('sales.kb.addFailed')}</p>
          )}
        </form>
      </Card>
    </div>
  )
}
