import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PageLayout } from '../components/layout/PageLayout'
import { ErrorState } from '../components/ui/ErrorState'
import { ApplicationModal } from '../features/application/components/ApplicationModal'
import { PartnerSkeleton } from '../features/partners/components/PartnerSkeleton'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { VacancyFilters } from '../features/vacancies/components/VacancyFilters'
import type { VacancyWithPartner } from '../lib/api/api-vacancies'
import { useDebounce } from '../hooks/useDebounce'
import { useVacancies } from '../hooks/useVacancies'

export function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialSearch = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''

  const [search, setSearch] = useState(initialSearch)

  const [selectedVacancy, setSelectedVacancy] =
    useState<VacancyWithPartner | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const {
    data: vacancies,
    isLoading,
    error,
    retry,
  } = useVacancies()

  function handleCategoryChange(value: string) {
    setSearchParams((params) => {
      const nextParams = new URLSearchParams(params)

      if (value) {
        nextParams.set('category', value)
      } else {
        nextParams.delete('category')
      }

      return nextParams
    })
  }

  const filteredVacancies = useMemo(() => {
    if (!vacancies) {
      return []
    }

    const normalizedSearch =
      debouncedSearch.trim().toLowerCase()

    return vacancies.filter((vacancy) => {
      const matchesSearch =
        normalizedSearch === '' ||
        vacancy.title
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesCategory =
        category === '' ||
        vacancy.category === category

      return matchesSearch && matchesCategory
    })
  }, [vacancies, debouncedSearch, category])

  return (
    <PageLayout>
      <section className="container-page py-16 md:py-20">
        {isLoading ? (
          <PartnerSkeleton />
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : vacancies ? (
          <>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Вакансії
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Знайдіть роботу, яка вам підходить
              </h1>

              <p className="mt-4 text-lg leading-8 text-muted">
                Переглядайте вакансії від перевірених партнерів VV Work.
              </p>
            </div>

            <div className="mt-10">
              <p className="mb-6 text-muted">
                {filteredVacancies.length} доступних вакансій
              </p>

              <VacancyFilters
                search={search}
                category={category}
                onSearchChange={setSearch}
                onCategoryChange={handleCategoryChange}
              />

              {filteredVacancies.length > 0 ? (
                <div className="mt-8 grid gap-4">
                  {filteredVacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      onApply={() =>
                        setSelectedVacancy(vacancy)
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
                  <h2 className="text-lg font-semibold">
                    Вакансій не знайдено
                  </h2>

                  <p className="mt-2 text-muted">
                    Спробуйте змінити пошуковий запит або категорію.
                  </p>
                </div>
              )}
            </div>

            {selectedVacancy && (
              <ApplicationModal
                vacancy={selectedVacancy}
                onClose={() => setSelectedVacancy(null)}
              />
            )}
          </>
        ) : null}
      </section>
    </PageLayout>
  )
}