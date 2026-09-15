import { useMemo } from 'react'

import { PageLayout } from '../components/layout/PageLayout'
import { SectionHeader } from '../components/SectionHeader'
import { ErrorState } from '../components/ui/ErrorState'
import { VacancyFilters } from '../features/vacancies/components/VacancyFilters'
import { VacancyList } from '../features/vacancies/components/VacancyList'
import { filterVacancies } from '../features/vacancies/filterVacancies'
import { formatVacanciesCount } from '../lib/pluralize'
import { useVacancies } from '../hooks/useVacancies'
import { useVacancyFilters } from '../hooks/useVacancyFilters'
import { VacanciesSkeleton } from '../features/vacancies/components/VacanciesSkeleton'

export function VacanciesPage() {
  const {
    search,
    category,
    debouncedSearch,
    setSearch,
    setCategory,
  } = useVacancyFilters()

  const {
    data: vacancies,
    isLoading,
    error,
    retry,
  } = useVacancies()

  const filteredVacancies = useMemo(() => {
    if (!vacancies) {
      return []
    }

    return filterVacancies(vacancies, {
      search: debouncedSearch,
      category,
    })
  }, [vacancies, debouncedSearch, category])

  return (
    <PageLayout>
      <section className="container-page py-16 md:py-20">
        <SectionHeader
          as="h1"
          eyebrow="Вакансії"
          title="Знайдіть роботу, яка вам підходить"
          description="Переглядайте вакансії від перевірених партнерів VV Work."
        />

        <div className="mt-10">
          <VacancyFilters
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />

          <div className="mt-8">
            {isLoading ? (
              <VacanciesSkeleton />
            ) : error ? (
              <ErrorState onRetry={retry} />
            ) : vacancies ? (
              <>
                <p className="mb-6 text-muted" aria-live="polite">
                  {formatVacanciesCount(filteredVacancies.length)}
                </p>

                <VacancyList vacancies={filteredVacancies} hasActiveFilters={Boolean(search.trim() || category)}/>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}