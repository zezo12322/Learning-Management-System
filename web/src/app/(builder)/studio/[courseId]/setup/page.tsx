'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ImagePlus, Info, Loader2, Save } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi, coursesApi } from '@/lib/api/services'
import { uploadCourseAsset } from '@/lib/api/upload'
import { safeMediaUrl } from '@/lib/safeUrl'
import { useT } from '@/lib/i18n'
import type { CourseLevel } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { FormField, SelectField } from '@/components/builder/FormField'
import { ReadinessItem } from '@/components/builder/ReadinessItem'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

export default function CourseSetupPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
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
  const [coverError, setCoverError] = useState<string | null>(null)
  const [coverUploading, setCoverUploading] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const hydrated = useRef(false)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isNew,
  })
  const categories = useQuery({
    queryKey: ['course-categories'],
    queryFn: coursesApi.categories,
  })

  useEffect(() => {
    if (!course.data || hydrated.current) return
    hydrated.current = true
    setTitle(course.data.title)
    setDescription(course.data.description)
    setCategoryId(course.data.categoryId ?? '')
    setLevel(course.data.level)
    setLanguage(course.data.language)
    setPrice(String(course.data.price ?? 0))
    setTags((course.data.tags ?? []).join(', '))
  }, [course.data])

  const save = useMutation({
    mutationFn: () =>
      isNew
        ? authoringApi.create({ title, description, categoryId, level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) })
        : authoringApi.update(courseId, { title, description, ...(categoryId ? { categoryId } : {}), level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }),
    onSuccess: (result) => {
      setSaved(true)
      if (isNew && result.id) router.replace(`/studio/${result.id}/curriculum`)
    },
  })

  const saveSetup = async () => {
    if (isNew && !categoryId) return
    await save.mutateAsync()
  }

  const thumbnail = safeMediaUrl(course.data?.thumbnail)

  const uploadCover = async (file: File) => {
    setCoverError(null)
    // Mirrors the backend THUMBNAIL limit so an oversized file fails here
    // instead of after the signed-URL round trip.
    if (file.size > 5 * 1024 * 1024) {
      setCoverError(t('builder.setup.coverTooLarge', 'Cover images must be 5 MB or smaller.'))
      return
    }
    setCoverUploading(true)
    try {
      await uploadCourseAsset({ courseId, file })
      await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
    } catch (error) {
      setCoverError(apiErrorMessage(error, t('builder.setup.coverUploadError', 'The cover image could not be uploaded. Try again.')))
    } finally {
      setCoverUploading(false)
    }
  }

  const readiness = [Boolean(title), Boolean(description), Boolean(course.data?.thumbnail), Boolean(categoryId && level)]
  const readinessScore = Math.round((readiness.filter(Boolean).length / readiness.length) * 100)

  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.setup.title')} description={t('builder.setup.subtitle')} />

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_336px]">
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-content">{t('builder.setup.detailsTitle')}</h2>
          <p className="mt-1 text-xs text-content-secondary">{t('builder.setup.detailsSubtitle')}</p>

          <div className="mt-6 space-y-5">
            <FormField label={t('builder.setup.titleLabel')} hint={t('builder.setup.titleHint')}>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('builder.setup.titlePlaceholder')} maxLength={70} />
            </FormField>

            <FormField label={t('builder.setup.descLabel')} hint={`${description.length}/240 ${t('builder.setup.characters')}`}>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={240}
                rows={5}
                className="w-full resize-none rounded-input border border-border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label={t('builder.setup.categoryLabel')} hint={t('builder.setup.categoryHint')}>
                {categories.isError ? (
                  <div className="rounded-input bg-error/10 px-4 py-3 text-xs text-error">{t('builder.setup.categoriesError')}</div>
                ) : (
                  <SelectField value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
                    <option value="">{categories.isLoading ? t('builder.setup.loadingCategories') : t('builder.setup.selectCategory')}</option>
                    {(categories.data ?? []).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </SelectField>
                )}
              </FormField>
              <FormField label={t('builder.setup.levelLabel')} hint={t('builder.setup.levelHint')}>
                <SelectField value={level} onChange={(event) => setLevel(event.target.value)}>
                  <option value="BEGINNER">{t('level.BEGINNER')}</option><option value="INTERMEDIATE">{t('level.INTERMEDIATE')}</option><option value="ADVANCED">{t('level.ADVANCED')}</option>
                </SelectField>
              </FormField>
              <FormField label={t('builder.setup.languageLabel')} hint={t('builder.setup.languageHint')}>
                <SelectField value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <option>English</option><option>Arabic</option><option>French</option>
                </SelectField>
              </FormField>
              {/* No visibility field: the API models this as the course status
                  (DRAFT/PUBLISHED), which the Preview step owns. */}
              <FormField label={t('builder.setup.priceLabel')} hint={t('builder.setup.priceHint')}>
                <Input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} />
              </FormField>
              <FormField label={t('builder.setup.tagsLabel')} hint={t('builder.setup.tagsHint')}>
                <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder={t('builder.setup.tagsPlaceholder')} />
              </FormField>
            </div>

            <div className="flex items-start gap-3 rounded-input bg-secondary/10 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-secondary"><Info size={15} /></span>
              <div><p className="text-xs font-semibold text-content">{t('builder.setup.draftPrivate', 'Drafts stay private')}</p><p className="mt-1 text-[11px] leading-5 text-content-secondary">{t('builder.setup.draftPrivateBody', 'Nothing is stored until you save. Your course stays private to you until you publish it from the Preview step.')}</p></div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
              {saved && <span className="text-xs font-medium text-success">{t('builder.setup.saved')}</span>}
              {save.isError && <span className="text-xs font-medium text-error">{apiErrorMessage(save.error, t('builder.setup.saveError'))}</span>}
              {isNew && !categoryId && <span className="text-xs font-medium text-warning">{t('builder.setup.chooseCategory')}</span>}
              <Button onClick={saveSetup} loading={save.isPending} disabled={!title || (isNew && !categoryId)}><Save size={16} /> {t('builder.setup.saveButton')}</Button>
            </div>
          </div>
        </Card>

        <Card className="h-fit p-5">
          <h2 className="text-base font-semibold text-content">{t('builder.setup.previewTitle')}</h2>
          {isNew ? (
            // A signed thumbnail upload needs a real course id, so the tile is a
            // static hint until the course has been saved once.
            <div className="mt-5 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-card bg-subtle px-4 text-center text-content-secondary">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-content-muted"><ImagePlus size={22} /></span>
              <span className="text-xs font-medium">{t('builder.setup.coverAfterSave', 'Save your course details first to add a cover image.')}</span>
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
                className="mt-5 flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-card bg-brand-soft bg-cover bg-center text-content-secondary transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                style={thumbnail ? { backgroundImage: `url(${JSON.stringify(thumbnail)})` } : undefined}
              >
                {coverUploading ? (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><Loader2 size={22} className="animate-spin" /></span>
                    <span className="rounded-input bg-surface/90 px-2 py-1 text-xs font-medium">{t('builder.setup.coverUploading', 'Uploading cover…')}</span>
                  </>
                ) : thumbnail ? (
                  <span className="rounded-input bg-surface/90 px-2 py-1 text-xs font-medium">{t('builder.setup.replaceCover', 'Replace cover image')}</span>
                ) : (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><ImagePlus size={22} /></span>
                    <span className="text-xs font-medium">{t('builder.setup.uploadCover', 'Upload a 16:9 course cover')}</span>
                  </>
                )}
              </button>
              {coverError && <p className="mt-2 rounded-input bg-error/10 px-3 py-2 text-[11px] text-error">{coverError}</p>}
            </>
          )}
          <h3 className="mt-5 text-base font-semibold text-content">{title || t('builder.setup.untitled')}</h3>
          <p className="mt-2 text-xs text-content-secondary">{course.data?.category ?? t('builder.setup.categoryPending')} · {t(`level.${level}`, level.toLowerCase())} · {language}</p>

          <div className="mt-5 rounded-input bg-subtle p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold text-content">{t('builder.setup.readiness')}</span><span className="text-xs font-bold text-primary">{readinessScore}%</span></div>
            <Progress value={readinessScore} className="mt-3 h-1.5" />
            <div className="mt-4 space-y-2">
              <ReadinessItem label={t('builder.setup.readinessTitle')} complete={readiness[0]} />
              <ReadinessItem label={t('builder.setup.readinessDesc')} complete={readiness[1]} />
              <ReadinessItem label={t('builder.setup.readinessCover')} complete={readiness[2]} />
              <ReadinessItem label={t('builder.setup.readinessCategoryLevel')} complete={readiness[3]} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
