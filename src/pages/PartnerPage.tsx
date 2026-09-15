import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { ErrorState } from '../components/ui/ErrorState'
import { VacancyFilters } from '../features/vacancies/components/VacancyFilters'
import type { Vacancy } from '../features/vacancies/types'
import { usePartner } from '../hooks/usePartner'
import { ApplicationModal } from '../features/application/components/ApplicationModal'
import { formatVacanciesCount } from '../lib/pluralize'
import { NotFoundError } from '../lib/api/partners'
import { useVacancyFilters } from '../hooks/useVacancyFilters'
import { filterVacancies } from '../features/vacancies/filterVacancies'
import { VacancyList } from '../features/vacancies/components/VacancyList'
import { VacanciesSkeleton } from '../features/vacancies/components/VacanciesSkeleton'

export function PartnerPage() {
  const { slug } = useParams<{ slug: string }>()
  const { search, category, debouncedSearch, setSearch, setCategory } =
    useVacancyFilters()

  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const handleCloseApplication = useCallback(() => {
    setSelectedVacancy(null)
  }, [])

  const { data: partner, isLoading, error, retry } = usePartner(slug)

  const filteredVacancies = useMemo(() => {
    if (!partner) {
      return []
    }

    return filterVacancies(partner.vacancies, {
      search: debouncedSearch,
      category,
    })
  }, [partner, debouncedSearch, category])

  return (
    <PageLayout>
      <section className="container-page py-16">
        {isLoading ? (
          <VacanciesSkeleton />
        ) : error instanceof NotFoundError ? (
          <div className="py-16 text-center">
            <h1 className="text-3xl font-bold">Партнера не знайдено</h1>

            <p className="mt-3 text-muted">
              Перевірте адресу або поверніться на головну.
            </p>
          </div>
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : partner ? (
          <>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Партнер VV Work
              </p>

              <h1 className="mt-3 text-4xl font-bold">{partner.name}</h1>

              <p className="mt-4 max-w-2xl text-muted">{partner.description}</p>
            </div>

            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Вакансії</h2>

                <p className="mt-2 text-muted" aria-live="polite">
                  {formatVacanciesCount(filteredVacancies.length)}
                </p>
              </div>

              <VacancyFilters
                search={search}
                category={category}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
              />

              <VacancyList vacancies={filteredVacancies} hasActiveFilters={Boolean(search.trim() || category)}/>
            </div>

            {selectedVacancy && (
              <ApplicationModal
                vacancy={selectedVacancy}
                onClose={handleCloseApplication}
              />
            )}
          </>
        ) : null}
      </section>
    </PageLayout>
  )
}
