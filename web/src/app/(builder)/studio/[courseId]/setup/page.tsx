'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImagePlus, Info, Save } from 'lucide-react'
import { apiErrorMessage } from '@/lib/api/client'
import { authoringApi, coursesApi } from '@/lib/api/services'
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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID ?? '')
  const [level, setLevel] = useState('BEGINNER')
  const [language, setLanguage] = useState('English')
  const [visibility, setVisibility] = useState('Private draft')
  const [price, setPrice] = useState('0')
  const [tags, setTags] = useState('')
  const [saved, setSaved] = useState(false)
  const hydrated = useRef(false)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: courseId !== 'new',
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
      courseId === 'new'
        ? authoringApi.create({ title, description, categoryId, level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) })
        : authoringApi.update(courseId, { title, description, ...(categoryId ? { categoryId } : {}), level: level as CourseLevel, language, price: Number(price) || 0, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }),
    onSuccess: (result) => {
      setSaved(true)
      if (courseId === 'new' && result.id) router.replace(`/studio/${result.id}/curriculum`)
    },
  })

  const saveSetup = async () => {
    if (courseId === 'new' && !categoryId) return
    await save.mutateAsync()
  }

  const readiness = [Boolean(title), Boolean(description), false, Boolean(categoryId && level)]
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
              <FormField label={t('builder.setup.visibilityLabel')} hint={t('builder.setup.visibilityHint')}>
                <SelectField value={visibility} onChange={(event) => setVisibility(event.target.value)}>
                  <option>Private draft</option><option>Unlisted</option><option>Public</option>
                </SelectField>
              </FormField>
              <FormField label={t('builder.setup.priceLabel')} hint={t('builder.setup.priceHint')}>
                <Input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} />
              </FormField>
              <FormField label={t('builder.setup.tagsLabel')} hint={t('builder.setup.tagsHint')}>
                <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder={t('builder.setup.tagsPlaceholder')} />
              </FormField>
            </div>

            <div className="flex items-start gap-3 rounded-input bg-secondary/10 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-secondary"><Info size={15} /></span>
              <div><p className="text-xs font-semibold text-content">{t('builder.setup.autosaved')}</p><p className="mt-1 text-[11px] leading-5 text-content-secondary">{t('builder.setup.autosavedBody')}</p></div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
              {saved && <span className="text-xs font-medium text-success">{t('builder.setup.saved')}</span>}
              {save.isError && <span className="text-xs font-medium text-error">{apiErrorMessage(save.error, t('builder.setup.saveError'))}</span>}
              {courseId === 'new' && !categoryId && <span className="text-xs font-medium text-warning">{t('builder.setup.chooseCategory')}</span>}
              <Button onClick={saveSetup} loading={save.isPending} disabled={!title || (courseId === 'new' && !categoryId)}><Save size={16} /> {t('builder.setup.saveButton')}</Button>
            </div>
          </div>
        </Card>

        <Card className="h-fit p-5">
          <h2 className="text-base font-semibold text-content">{t('builder.setup.previewTitle')}</h2>
          <button className="mt-5 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-card bg-brand-soft text-content-secondary transition-colors hover:bg-primary-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><ImagePlus size={22} /></span>
            <span className="text-xs font-medium">{t('builder.setup.uploadCover')}</span>
          </button>
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
