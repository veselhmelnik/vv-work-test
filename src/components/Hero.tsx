import { useState } from 'react'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { heroVacancies } from '../mocks/mock-hero-vacancies'
import { Button } from './ui/Button'
import {
  getAllVacancies,
  type VacancyWithPartner,
} from '../features/vacancies/getAllVacancies'
import { jobCategories } from '../mocks/mock-categories'
import { ApplicationModal } from '../features/application/components/ApplicationModal'

export function Hero() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [results, setResults] = useState<VacancyWithPartner[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedVacancy, setSelectedVacancy] =
    useState<VacancyWithPartner | null>(null)

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedSearch = search.trim().toLowerCase()

    const nextResults = getAllVacancies().filter((vacancy) => {
      const matchesSearch =
        normalizedSearch === '' ||
        vacancy.title.toLowerCase().includes(normalizedSearch)

      const matchesCategory = category === '' || vacancy.category === category

      return matchesSearch && matchesCategory
    })

    setResults(nextResults)
    setHasSearched(true)
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
            <div className="cursor-pointer absolute left-0 top-0 z-30 w-[88%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[0]} />
            </div>

            <div className="cursor-pointer absolute bottom-0 left-12 z-10 w-[68%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[2]} compact />
            </div>

            <div className="cursor-pointer absolute bottom-5 right-0 z-20 w-[68%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[1]} compact />
            </div>
          </div>
        </div>
      </div>
      {hasSearched && (
        <div className="mt-16 border-t border-border pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Результати пошуку
              </p>

              <h2 className="mt-2 text-2xl font-bold">Знайдені вакансії</h2>
            </div>

            <span className="text-sm text-muted">
              {results.length} результатів
            </span>
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {results.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onApply={() => setSelectedVacancy(vacancy)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center">
              <h3 className="font-semibold">Вакансій не знайдено</h3>

              <p className="mt-2 text-muted">
                Спробуйте змінити пошуковий запит або категорію.
              </p>
            </div>
          )}
        </div>
      )}
      {selectedVacancy && (
        <ApplicationModal
          vacancy={selectedVacancy}
          onClose={() => setSelectedVacancy(null)}
        />
      )}
    </section>
  )
}
