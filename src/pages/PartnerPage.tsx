import { useParams, useSearchParams } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { usePartner } from '../hooks/usePartner'
import { PartnerSkeleton } from '../features/partners/components/PartnerSkeleton'
import { ErrorState } from '../components/ui/ErrorState'
import { useMemo, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { VacancyFilters } from '../features/vacancies/components/VacancyFilters'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'

export function PartnerPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data: partner, isLoading, error, retry } = usePartner(slug)

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
    if (!partner) {
      return []
    }

    const normalizedSearch = debouncedSearch.trim().toLowerCase()

    return partner.vacancies.filter((vacancy) => {
      const matchesSearch =
        normalizedSearch === '' ||
        vacancy.title.toLowerCase().includes(normalizedSearch)

      const matchesCategory = category === '' || vacancy.category === category

      return matchesSearch && matchesCategory
    })
  }, [partner, debouncedSearch, category])
  return (
    <PageLayout>
      <section className="container-page py-16">
        {isLoading ? (
          <PartnerSkeleton />
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : partner ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Партнер VV Work
            </p>

            <h1 className="mt-3 text-4xl font-bold">{partner.name}</h1>

            <p className="mt-4 max-w-2xl text-muted">{partner.description}</p>
          </>
        ) : null}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Вакансії</h2>

            <p className="mt-2 text-muted">
              {filteredVacancies.length} доступних вакансій
            </p>
          </div>
          <VacancyFilters
            search={search}
            category={category}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearch}
          />
        </div>
        {filteredVacancies.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {filteredVacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
            <h3 className="text-lg font-semibold">Вакансій не знайдено</h3>

            <p className="mt-2 text-muted">
              Спробуйте змінити пошуковий запит або категорію.
            </p>
          </div>
        )}
      </section>
    </PageLayout>
  )
}
