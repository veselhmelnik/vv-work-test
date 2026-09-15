import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { jobCategories } from '../../features/vacancies/categories'
import { HeroVacanciesPreview } from '../../features/vacancies/components/HeroVacanciesPreview'

export function Hero() {
  const fieldClassName = `
  h-12 w-full rounded-control
  border border-border
  bg-surface px-4
  text-foreground
  outline-none
  transition-colors
  focus:border-primary
`
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()

    const normalizedSearch = search.trim()

    if (normalizedSearch) {
      params.set('search', normalizedSearch)
    }

    if (category) {
      params.set('category', category)
    }

    navigate(`/vacancies?${params.toString()}`)
  }

  return (
    <section id="search" className="container-page py-8 md:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Робота в Європі
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Робота в Європі без зайвих пошуків
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Перевірені вакансії від роботодавців та партнерів VV Work. Знайдіть
            роботу, яка вам підходить.
          </p>
          <form className="mt-8" onSubmit={handleSearch}>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
              <div>
                <label htmlFor="job-search" className="sr-only">
                  Посада або ключове слово
                </label>

                <input
                  id="job-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Посада або ключове слово"
                  className={`${fieldClassName} placeholder:text-muted`}
                />
              </div>

              <Button type="submit" className="h-12 px-6">
                Знайти роботу
              </Button>
            </div>

            <div className="mt-3">
              <label htmlFor="job-category" className="sr-only">
                Категорія
              </label>

              <select
                id="job-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={fieldClassName}
              >
                <option value="">Всі категорії</option>

                {jobCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div className="mt-4 md:mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-xs text-primary">
                ✓
              </span>
              Перевірені роботодавці
            </span>
            <span className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-xs text-primary">
                ✓
              </span>
              Вакансії по всій Європі
            </span>
          </div>
        </div>
        <div>
          <HeroVacanciesPreview />
        </div>
      </div>
    </section>
  )
}
