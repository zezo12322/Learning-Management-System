'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ImagePlus, Info, Loader2, Save } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi, coursesApi } from '@/lib/api/services'
import { UPLOAD_ERROR_KEYS, uploadCourseAsset, uploadErrorCodeOf } from '@/lib/api/upload'
import { MIN_DESCRIPTION_LENGTH, useCourseReadiness } from '@/lib/builder/readiness'
import { safeMediaUrl } from '@/lib/safeUrl'
import { useT } from '@/lib/i18n'
import type { CourseLevel } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { useAnnounce } from '@/components/builder/BuilderAnnouncer'
import { FormField, SelectField } from '@/components/builder/FormField'
import { ReadinessPanel } from '@/components/builder/ReadinessPanel'
import { StudioStepLayout } from '@/components/builder/StudioStepLayout'
import { TextareaField } from '@/components/builder/TextareaField'
import { useBuilderDirty } from '@/components/layout/BuilderShell'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const MAX_DESCRIPTION_LENGTH = 240

/**
 * The languages a course can be authored in. These are the values persisted by
 * the authoring API, not display text — `courseLanguage.<code>` translates them.
 */
const COURSE_LANGUAGES = ['English', 'Arabic', 'French'] as const

export default function CourseSetupPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const announce = useAnnounce()
  const setBuilderDirty = useBuilderDirty()
  // "new" is a placeholder id: the course does not exist until this step saves.
  const isNew = courseId === 'new'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID ?? '')
  const [level, setLevel] = useState('BEGINNER')
  const [language, setLanguage] = useState('English')
  const [price, setPrice] = useState('0')
  const [tags, setTags] = useState('')
  const [saved, setSaved] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [coverError, setCoverError] = useState<string | null>(null)
  const [coverUploading, setCoverUploading] = useState(false)
  const [coverProgress, setCoverProgress] = useState(0)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const hydrated = useRef(false)
  // Once the instructor has typed, a slow query must not overwrite the field
  // they are in the middle of editing.
  const touched = useRef(false)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isNew,
  })
  const categories = useQuery({
    queryKey: ['course-categories'],
    queryFn: coursesApi.categories,
  })
  const readiness = useCourseReadiness(courseId)

  useEffect(() => {
    if (!course.data || hydrated.current || touched.current) return
    hydrated.current = true
    setTitle(course.data.title)
    setDescription(course.data.description)
    setCategoryId(course.data.categoryId ?? '')
    setLevel(course.data.level)
    setLanguage(course.data.language)
    setPrice(String(course.data.price ?? 0))
    setTags((course.data.tags ?? []).join(', '))
  }, [course.data])

  /** Any edit invalidates the "Saved" confirmation and marks the form dirty. */
  const edited = () => {
    touched.current = true
    // `saved` was only ever set to true, so the green "Saved" line was permanent:
    // an instructor could retitle the course, still read "Saved", and leave
    // believing it had persisted.
    setSaved(false)
  }

  const serverValues = useMemo(
    () => ({
      title: course.data?.title ?? '',
      description: course.data?.description ?? '',
      categoryId: course.data?.categoryId ?? '',
      level: course.data?.level ?? 'BEGINNER',
      language: course.data?.language ?? 'English',
      price: String(course.data?.price ?? 0),
      tags: (course.data?.tags ?? []).join(', '),
    }),
    [course.data]
  )

  const dirty = isNew
    ? Boolean(title || description || tags)
    : Boolean(course.data) &&
      (title !== serverValues.title ||
        description !== serverValues.description ||
        categoryId !== serverValues.categoryId ||
        level !== serverValues.level ||
        language !== serverValues.language ||
        price !== serverValues.price ||
        tags !== serverValues.tags)

  useEffect(() => {
    setBuilderDirty(dirty)
  }, [dirty, setBuilderDirty])

  const save = useMutation({
    mutationFn: () =>
      isNew
        ? authoringApi.create({ title, description, categoryId, level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) })
        : authoringApi.update(courseId, { title, description, ...(categoryId ? { categoryId } : {}), level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }),
    onSuccess: async (result) => {
      setSaved(true)
      touched.current = false
      announce(t('builder.announce.saved'))
      // Without this the shell header, the readiness rail and every other step
      // kept rendering the values the course had before this save.
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      if (isNew && result.id) router.replace(`/studio/${result.id}/curriculum`)
    },
    onError: () => announce(t('builder.announce.saveFailed')),
  })

  // Validation the form can actually show: `Input` has always had an `invalid`
  // prop, but nothing could drive it through the old FormField.
  const errors = {
    title: title.trim() ? undefined : t('builder.setup.titleRequired'),
    description:
      description.trim().length >= MIN_DESCRIPTION_LENGTH ? undefined : t('builder.setup.descTooShort'),
    categoryId: categoryId ? undefined : t('builder.setup.categoryRequired'),
    price: Number.isFinite(Number(price)) && Number(price) >= 0 ? undefined : t('builder.setup.priceInvalid'),
  }
  const invalidFields = Object.entries(errors).filter(([, message]) => Boolean(message))
  const shownError = (field: keyof typeof errors) => (showErrors ? errors[field] : undefined)

  const saveSetup = async () => {
    setShowErrors(true)
    if (invalidFields.length) {
      // Focus the first field that needs attention instead of failing silently.
      const first = invalidFields[0][0]
      if (first === 'title') titleRef.current?.focus()
      else if (first === 'description') descriptionRef.current?.focus()
      else if (first === 'categoryId') categoryRef.current?.focus()
      else priceRef.current?.focus()
      return
    }
    try {
      await save.mutateAsync()
    } catch {
      // The mutation error renders next to the button.
    }
  }

  const thumbnail = safeMediaUrl(course.data?.thumbnail)

  const uploadCover = async (file: File) => {
    setCoverError(null)
    setCoverProgress(0)
    // Mirrors the backend THUMBNAIL limit so an oversized file fails here
    // instead of after the signed-URL round trip.
    if (file.size > 5 * 1024 * 1024) {
      setCoverError(t('builder.setup.coverTooLarge'))
      return
    }
    setCoverUploading(true)
    try {
      await uploadCourseAsset({
        courseId,
        file,
        onProgress: ({ loaded, total }) =>
          setCoverProgress(total ? Math.round((loaded / total) * 100) : 0),
      })
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
      announce(t('builder.announce.coverUploaded'))
    } catch (error) {
      const message = t(UPLOAD_ERROR_KEYS[uploadErrorCodeOf(error)])
      setCoverError(apiErrorMessage(error, message))
      announce(message)
    } finally {
      setCoverUploading(false)
    }
  }

  const previewCard = (
    <Card className="h-fit p-5">
      <h2 className="text-base font-semibold text-content">{t('builder.setup.previewTitle')}</h2>
      {isNew ? (
        // A signed thumbnail upload needs a real course id, so the tile is a
        // static hint until the course has been saved once.
        <div className="mt-5 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-card bg-subtle px-4 text-center text-content-secondary">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-content-muted"><ImagePlus size={22} aria-hidden /></span>
          <span className="text-xs font-medium">{t('builder.setup.coverNeedsSave')}</span>
        </div>
      ) : (
        <>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              // Reset so re-picking the same file fires change again.
              event.target.value = ''
              if (file) void uploadCover(file)
            }}
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
            aria-busy={coverUploading}
            // The hover state used to be `hover:bg-primary-100` — the literal hex
            // #e0e7ff, a near-white lavender that flashed against a dark surface
            // under white overlay text. The ring also gives the state a
            // non-colour cue.
            className="mt-5 flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-card bg-brand-soft bg-cover bg-center text-content-secondary transition-shadow hover:ring-2 hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
            style={thumbnail ? { backgroundImage: `url(${JSON.stringify(thumbnail)})` } : undefined}
          >
            {coverUploading ? (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><Loader2 size={22} className="animate-spin" aria-hidden /></span>
                <span className="rounded-input bg-surface/90 px-2 py-1 text-xs font-medium">
                  {t('builder.setup.coverUploading').replace('{n}', String(coverProgress))}
                </span>
              </>
            ) : thumbnail ? (
              <span className="rounded-input bg-surface/90 px-2 py-1 text-xs font-medium">{t('builder.setup.replaceCover')}</span>
            ) : (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><ImagePlus size={22} aria-hidden /></span>
                <span className="text-xs font-medium">{t('builder.setup.uploadCover')}</span>
              </>
            )}
          </button>
          {coverUploading && (
            <Progress
              value={coverProgress}
              label={t('builder.setup.coverProgressLabel')}
              className="mt-3 h-1.5"
            />
          )}
          {coverError && <p role="alert" className="mt-2 rounded-input bg-error-soft px-3 py-2 text-[11px] text-error">{coverError}</p>}
        </>
      )}
      <h3 className="mt-5 text-base font-semibold text-content">{title || t('builder.setup.untitled')}</h3>
      <p className="mt-2 text-xs text-content-secondary">
        {course.data?.category ?? t('builder.setup.categoryPending')} · {t(`level.${level}`, level)} · {language}
      </p>
    </Card>
  )

  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.setup.title')} description={t('builder.setup.subtitle')} />

      <StudioStepLayout
        railLabel={t('builder.readiness.title')}
        rail={
          <div className="space-y-5">
            {previewCard}
            <ReadinessPanel
              title={t('builder.readiness.title')}
              score={readiness.score}
              checks={readiness.checks}
            />
          </div>
        }
      >
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-content">{t('builder.setup.detailsTitle')}</h2>
          <p className="mt-1 text-xs text-content-secondary">{t('builder.setup.detailsSubtitle')}</p>

          <div className="mt-6 space-y-5">
            <FormField
              id="course-title"
              label={t('builder.setup.titleLabel')}
              hint={t('builder.setup.titleHint')}
              error={shownError('title')}
              required
            >
              {(field) => (
                <Input
                  {...field}
                  ref={titleRef}
                  value={title}
                  invalid={Boolean(shownError('title'))}
                  onChange={(event) => { edited(); setTitle(event.target.value) }}
                  placeholder={t('builder.setup.titlePlaceholder')}
                  maxLength={70}
                />
              )}
            </FormField>

            <FormField
              id="course-description"
              label={t('builder.setup.descLabel')}
              hint={`${description.length}/${MAX_DESCRIPTION_LENGTH} ${t('builder.setup.characters')}`}
              error={shownError('description')}
              required
            >
              {(field) => (
                <TextareaField
                  ref={descriptionRef}
                  id={field.id}
                  describedBy={field['aria-describedby']}
                  invalid={Boolean(shownError('description'))}
                  value={description}
                  onChange={(event) => { edited(); setDescription(event.target.value) }}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  rows={5}
                />
              )}
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="course-category"
                label={t('builder.setup.categoryLabel')}
                hint={t('builder.setup.categoryHint')}
                // The load failure is the field's error, so the <label> keeps
                // pointing at a real control instead of at a replacement div.
                error={categories.isError ? t('builder.setup.categoriesError') : shownError('categoryId')}
                required
              >
                {(field) => (
                  <SelectField
                    id={field.id}
                    describedBy={field['aria-describedby']}
                    invalid={Boolean(categories.isError || shownError('categoryId'))}
                    disabled={categories.isError}
                    value={categoryId}
                    onChange={(event) => { edited(); setCategoryId(event.target.value) }}
                  >
                    <option value="">{categories.isLoading ? t('builder.setup.loadingCategories') : t('builder.setup.selectCategory')}</option>
                    {(categories.data ?? []).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </SelectField>
                )}
              </FormField>
              <FormField id="course-level" label={t('builder.setup.levelLabel')} hint={t('builder.setup.levelHint')}>
                {(field) => (
                  <SelectField id={field.id} describedBy={field['aria-describedby']} value={level} onChange={(event) => { edited(); setLevel(event.target.value) }}>
                    <option value="BEGINNER">{t('level.BEGINNER')}</option><option value="INTERMEDIATE">{t('level.INTERMEDIATE')}</option><option value="ADVANCED">{t('level.ADVANCED')}</option>
                  </SelectField>
                )}
              </FormField>
              <FormField id="course-language" label={t('builder.setup.languageLabel')} hint={t('builder.setup.languageHint')}>
                {(field) => (
                  <SelectField id={field.id} describedBy={field['aria-describedby']} value={language} onChange={(event) => { edited(); setLanguage(event.target.value) }}>
                    {/* Explicit value: the label is translated, but the stored
                        value stays the English string the API persists. Without
                        `value`, an Arabic page would have saved "العربية". */}
                    {COURSE_LANGUAGES.map((code) => (
                      <option key={code} value={code}>{t(`courseLanguage.${code}`, code)}</option>
                    ))}
                  </SelectField>
                )}
              </FormField>
              {/* No visibility field: the API models this as the course status
                  (DRAFT/PUBLISHED), which the Preview step owns. */}
              <FormField
                id="course-price"
                label={t('builder.setup.priceLabel')}
                hint={t('builder.setup.priceHint')}
                error={shownError('price')}
              >
                {(field) => (
                  <Input
                    {...field}
                    ref={priceRef}
                    type="number"
                    min="0"
                    inputMode="decimal"
                    invalid={Boolean(shownError('price'))}
                    value={price}
                    onChange={(event) => { edited(); setPrice(event.target.value) }}
                  />
                )}
              </FormField>
              <FormField id="course-tags" label={t('builder.setup.tagsLabel')} hint={t('builder.setup.tagsHint')}>
                {(field) => (
                  <Input {...field} value={tags} onChange={(event) => { edited(); setTags(event.target.value) }} placeholder={t('builder.setup.tagsPlaceholder')} />
                )}
              </FormField>
            </div>

            <div className="flex items-start gap-3 rounded-input bg-secondary/10 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-secondary"><Info size={15} aria-hidden /></span>
              <div><p className="text-xs font-semibold text-content">{t('builder.setup.draftPrivate')}</p><p className="mt-1 text-[11px] leading-5 text-content-secondary">{t('builder.setup.draftPrivateBody')}</p></div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
              {saved && <span className="text-xs font-medium text-success">{t('builder.setup.saved')}</span>}
              {!saved && dirty && <span className="text-xs font-medium text-warning">{t('builder.setup.unsavedChanges')}</span>}
              {save.isError && <span role="alert" className="text-xs font-medium text-error">{apiErrorMessage(save.error, t('builder.setup.saveError'))}</span>}
              {showErrors && invalidFields.length > 0 && (
                <span className="text-xs font-medium text-warning">{t('builder.setup.fixFieldsFirst')}</span>
              )}
              <Button onClick={saveSetup} loading={save.isPending}><Save size={16} aria-hidden /> {t('builder.setup.saveButton')}</Button>
            </div>
          </div>
        </Card>
      </StudioStepLayout>
    </div>
  )
}
