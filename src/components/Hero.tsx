import { useState } from 'react'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { heroVacancies } from '../mocks/mock-hero-vacancies'
import { Button } from './ui/Button'
import { jobCategories } from '../mocks/mock-categories'
import { Link, useNavigate } from 'react-router-dom'

export function Hero() {
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
    <section id="vacancies" className="container-page py-8 md:py-16 lg:py-20">
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
                  className="
          h-12 w-full rounded-[10px]
          border border-border
          bg-surface px-4
          text-foreground
          outline-none
          transition
          placeholder:text-muted
          focus:border-primary
        "
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
                className="
        h-12 w-full rounded-[10px]
        border border-border
        bg-surface px-4
        text-foreground
        outline-none
        transition
        focus:border-primary
      "
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
        <div className="relative">
          <div className="grid gap-4 lg:hidden">
            <VacancyCard vacancy={heroVacancies[0]} />
            <VacancyCard vacancy={heroVacancies[1]} compact />
          </div>

          <div className="relative hidden min-h-107.5 lg:block">
            <Link
              to={`/vacancies?search=${encodeURIComponent(
                heroVacancies[0].title,
              )}`}
              className="cursor-pointer absolute left-0 top-0 z-30 w-[88%] hover:z-40"
            >
              <VacancyCard vacancy={heroVacancies[0]} />
            </Link>

            <Link
              to={`/vacancies?search=${encodeURIComponent(
                heroVacancies[2].title,
              )}`}
              className="cursor-pointer absolute bottom-0 left-12 z-10 w-[68%] hover:z-40"
            >
              <VacancyCard vacancy={heroVacancies[2]} compact />
            </Link>

            <Link
              to={`/vacancies?search=${encodeURIComponent(
                heroVacancies[1].title,
              )}`}
              className="cursor-pointer absolute bottom-5 right-0 z-20 w-[68%] hover:z-40"
            >
              <VacancyCard vacancy={heroVacancies[1]} compact />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
