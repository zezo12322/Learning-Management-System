'use client'

import { useMemo, useState } from 'react'
import { Clock, FileText, Pencil, Plus, Search, Star, Trash2, X } from 'lucide-react'
import { addNote, deleteNote, updateNote, useCourseNotes, type LectureNote } from '@/lib/notes'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/student/EmptyState'
import { relativeTime } from '@/lib/notifications'
import { cn } from '@/lib/utils'

function stamp(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(total / 60)
  return `${String(minutes).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

/**
 * Notes tab (Figma "9. Course notes"): counters, search, an editor, and the
 * note list with star / edit / delete. Notes are per-account and local — see
 * lib/notes.ts for why.
 */
export function NotesTab({
  lectureId,
  lectureTitle,
  lectureIds,
  currentSecond,
}: {
  lectureId: string | null
  lectureTitle: string
  lectureIds: string[]
  /** Playback position stamped onto a new note. */
  currentSecond: number
}) {
  const { t, locale } = useI18n()
  const notes = useCourseNotes(lectureIds)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<LectureNote | null>(null)
  const [composing, setComposing] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return notes
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(needle) || note.body.toLowerCase().includes(needle),
    )
  }, [notes, search])

  const lastEdited = notes[0]?.updatedAt
  const starred = notes.filter((note) => note.starred).length

  const openCompose = () => {
    setEditing(null)
    setTitle('')
    setBody('')
    setComposing(true)
  }

  const openEdit = (note: LectureNote) => {
    setEditing(note)
    setTitle(note.title)
    setBody(note.body)
    setComposing(true)
  }

  const save = () => {
    const cleanTitle = title.trim()
    const cleanBody = body.trim()
    if (!cleanTitle && !cleanBody) return
    if (editing) {
      updateNote(editing.lectureId, editing.id, { title: cleanTitle, body: cleanBody })
    } else if (lectureId) {
      addNote({
        lectureId,
        lectureTitle,
        title: cleanTitle || t('learn.notes.untitled'),
        body: cleanBody,
        atSecond: currentSecond,
      })
    }
    setComposing(false)
    setEditing(null)
    setTitle('')
    setBody('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FileText, value: String(notes.length), label: t('learn.notes.total'), tone: 'bg-brand-soft text-primary' },
          {
            icon: Clock,
            value: lastEdited ? relativeTime(lastEdited, locale) : '—',
            label: t('learn.notes.lastEdited'),
            tone: 'bg-secondary/10 text-secondary',
          },
          { icon: Star, value: String(starred), label: t('learn.notes.starred'), tone: 'bg-success/10 text-success' },
        ].map((stat) => (
          <Card key={stat.label} className="flex items-center gap-2.5 p-3">
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', stat.tone)}>
              <stat.icon size={16} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-content">{stat.value}</span>
              <span className="block truncate text-[11px] text-content-secondary">{stat.label}</span>
            </span>
          </Card>
        ))}
      </div>

      <Input
        icon={<Search size={17} />}
        placeholder={t('learn.notes.search')}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label={t('learn.notes.search')}
      />

      {composing ? (
        <Card className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-content">
              {editing ? t('learn.notes.editNote') : t('learn.notes.newNote')}
            </h3>
            <button
              type="button"
              onClick={() => setComposing(false)}
              aria-label={t('common.cancel')}
              className="text-content-muted hover:text-content"
            >
              <X size={16} />
            </button>
          </div>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t('learn.notes.titlePlaceholder')}
            aria-label={t('learn.notes.titlePlaceholder')}
            maxLength={120}
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={t('learn.notes.bodyPlaceholder')}
            aria-label={t('learn.notes.bodyPlaceholder')}
            rows={4}
            maxLength={2000}
            className="w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setComposing(false)}>
              {t('common.cancel')}
            </Button>
            <Button size="sm" onClick={save} disabled={!lectureId && !editing}>
              {t('learn.notes.save')}
            </Button>
          </div>
        </Card>
      ) : (
        <Button fullWidth onClick={openCompose} disabled={!lectureId}>
          <Plus size={17} /> {t('learn.notes.add')}
        </Button>
      )}

      {visible.length ? (
        <div className="space-y-3">
          {visible.map((note) => (
            <Card key={note.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="shrink-0 rounded-lg bg-brand-soft px-2 py-1 font-mono text-[11px] font-semibold text-primary">
                  {stamp(note.atSecond)}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-bold text-content">{note.title}</h4>
                  {note.body && (
                    <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-content-secondary">
                      {note.body}
                    </p>
                  )}
                  <p className="mt-2 truncate text-[11px] text-content-muted">{note.lectureTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateNote(note.lectureId, note.id, { starred: !note.starred })}
                  aria-pressed={note.starred}
                  aria-label={t('learn.notes.star')}
                  className={note.starred ? 'text-warning' : 'text-content-muted hover:text-warning'}
                >
                  <Star size={16} fill={note.starred ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="mt-3 flex justify-end gap-3 border-t border-border pt-2.5">
                <button
                  type="button"
                  onClick={() => openEdit(note)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  <Pencil size={13} /> {t('learn.notes.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => deleteNote(note.lectureId, note.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-error"
                >
                  <Trash2 size={13} /> {t('learn.notes.delete')}
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={FileText}
            title={notes.length ? t('learn.notes.noMatch') : t('learn.notes.empty')}
            description={notes.length ? t('learn.notes.noMatchHint') : t('learn.notes.emptyHint')}
          />
        </Card>
      )}
    </div>
  )
}
