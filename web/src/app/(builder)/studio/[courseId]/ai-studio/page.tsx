'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { BookOpenCheck, Check, FileQuestion, ListChecks, RefreshCw, Sparkles, Wand2 } from 'lucide-react'
import { aiApi, getAIAvailability, type AIGenerationRequest } from '@/lib/ai/contract'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const TYPES: Array<{ kind: AIGenerationRequest['kind']; label: string; icon: typeof Sparkles }> = [
  { kind: 'OUTCOMES', label: 'Learning outcomes', icon: ListChecks },
  { kind: 'SUMMARY', label: 'Module summary', icon: BookOpenCheck },
  { kind: 'QUIZ', label: 'Quiz questions', icon: FileQuestion },
  { kind: 'LESSON_PLAN', label: 'Lesson plan', icon: Wand2 },
]

const EXAMPLE_OUTCOMES = [
  'Explain core user-centered design principles.',
  'Plan a lightweight qualitative research study.',
  'Translate evidence into wireframes and prototypes.',
  'Critique a design using accessibility and hierarchy.',
]

export default function AIStudioPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const availability = getAIAvailability()
  const [kind, setKind] = useState<AIGenerationRequest['kind']>('OUTCOMES')
  const [prompt, setPrompt] = useState('Write 4 measurable outcomes for beginner learners.')
  const [sources, setSources] = useState(['course', 'transcripts', 'resources'])
  const [outputs, setOutputs] = useState(EXAMPLE_OUTCOMES)
  const [accepted, setAccepted] = useState(false)

  const generate = useMutation({
    mutationFn: () => aiApi.generate({ courseId, kind, prompt, sourceIds: sources }),
    onSuccess: (response) => {
      setOutputs(response.content.split(/\n+/).filter(Boolean))
      setAccepted(false)
    },
  })

  const toggleSource = (source: string) => setSources((current) => current.includes(source) ? current.filter((item) => item !== source) : [...current, source])

  return (
    <div className="space-y-5">
      <PageHeader title="AI Course Studio" description="Generate reviewable assets from selected course sources." />
      <AIUnavailable />

      <div className="grid gap-5 xl:grid-cols-[318px_minmax(0,1fr)_268px]">
        <Card className="flex flex-col p-4 sm:p-5">
          <h2 className="text-base font-semibold text-content">Generate</h2>
          <p className="mt-1 text-[11px] leading-5 text-content-secondary">Choose an asset and ground it in approved sources.</p>

          <div className="mt-5 space-y-2">
            {TYPES.map((type) => (
              <button
                key={type.kind}
                onClick={() => setKind(type.kind)}
                className={cn('flex w-full items-center gap-3 rounded-input border px-3 py-3 text-left text-xs font-medium', kind === type.kind ? 'border-primary bg-brand-soft text-primary' : 'border-border bg-surface text-content hover:bg-subtle')}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface"><type.icon size={15} /></span>
                {type.label}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-[10px] font-semibold tracking-wide text-content-muted">PROMPT</label>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4} className="mt-2 w-full resize-none rounded-input border border-border bg-surface px-3 py-2.5 text-xs leading-5 text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

          <p className="mt-5 text-[10px] font-semibold tracking-wide text-content-muted">GROUNDING SOURCES</p>
          <div className="mt-2 space-y-2">
            {[
              ['course', 'Course outline'],
              ['transcripts', '8 lesson transcripts'],
              ['resources', '3 uploaded resources'],
            ].map(([id, label]) => (
              <label key={id} className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-[11px] text-content-secondary">
                <input type="checkbox" checked={sources.includes(id)} onChange={() => toggleSource(id)} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                {label}
              </label>
            ))}
          </div>

          <Button fullWidth className="mt-6" disabled={!availability.available || sources.length === 0} loading={generate.isPending} onClick={() => generate.mutate()}>
            <Sparkles size={16} /> Generate draft
          </Button>
          {generate.isError && <p className="mt-2 text-xs text-error">{generate.error instanceof Error ? generate.error.message : 'Generation failed.'}</p>}
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div><h2 className="text-base font-semibold text-content">Generated draft</h2><p className="mt-1 text-[10px] text-content-muted">{availability.available ? 'Provider response' : 'Example review state · Not generated live'}</p></div>
            <StatusPill tone={accepted ? 'success' : 'brand'}>{accepted ? 'Accepted' : 'Needs review'}</StatusPill>
          </div>

          <div className="mt-5 rounded-input bg-subtle p-3">
            <p className="text-[9px] font-semibold tracking-wide text-content-muted">PROMPT</p>
            <p className="mt-1 text-[11px] leading-5 text-content-secondary">{prompt}</p>
          </div>

          <p className="mt-5 text-[10px] font-semibold tracking-wide text-content-muted">LEARNING OUTCOMES</p>
          <div className="mt-3 space-y-3">
            {outputs.map((output, index) => (
              <div key={`${output}-${index}`} className={cn('flex items-center gap-3 rounded-input p-3.5', index === 0 ? 'bg-brand-soft' : 'bg-subtle')}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-[10px] font-bold text-primary">{index + 1}</span>
                <textarea
                  value={output}
                  onChange={(event) => setOutputs((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                  rows={2}
                  className="min-h-10 flex-1 resize-none bg-transparent text-xs leading-5 text-content outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <Button variant="outline" disabled={!availability.available} onClick={() => generate.mutate()}><RefreshCw size={15} /> Regenerate</Button>
            <Button onClick={() => setAccepted(true)} disabled={accepted}><Check size={15} /> {accepted ? 'Draft accepted' : 'Accept draft'}</Button>
          </div>
        </Card>

        <Card className="h-fit p-4 sm:p-5 xl:sticky xl:top-24">
          <h2 className="text-base font-semibold text-content">Grounding & review</h2>
          <p className="mt-2 text-[11px] leading-5 text-content-secondary">Verify each draft before it becomes course content.</p>
          <div className="mt-4 rounded-input bg-warning/10 p-3"><p className="text-[10px] font-semibold text-warning">Provider</p><p className="mt-1 text-xs font-semibold text-content">{availability.available ? availability.provider : 'Not configured'}</p><p className="mt-1 text-[10px] text-content-secondary">{availability.available ? 'Live requests are enabled.' : 'No live request will be sent.'}</p></div>
          <p className="mt-5 text-xs font-semibold text-content">Selected sources</p>
          <div className="mt-2 space-y-2">{[['Course outline', 'Ready'], ['Lesson transcripts', '8/8'], ['Resources', '3/3']].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-xl bg-subtle px-3 py-3 text-[10px]"><span className="text-content-secondary">{label}</span><span className="font-semibold text-success">{value}</span></div>)}</div>
          <div className="mt-5 rounded-input bg-secondary/10 p-3"><p className="text-xs font-semibold text-secondary">Review checklist</p><div className="mt-3 space-y-2 text-[10px] text-content-secondary">{['Grounded in course','Measurable language','No unsupported claims','Instructor approval'].map((item) => <label key={item} className="flex items-center gap-2"><input type="checkbox" className="h-3.5 w-3.5 rounded border-border text-primary" />{item}</label>)}</div></div>
        </Card>
      </div>
    </div>
  )
}
