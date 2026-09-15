import { Link } from 'react-router-dom'

import { ErrorState } from './ui/ErrorState'
import { useVacancies } from '../hooks/useVacancies'

export function HeroVacanciesPreview() {
  const { data: vacancies, isLoading, error, retry } = useVacancies()

  const previewVacancies = vacancies?.slice(0, 3) ?? []

  if (isLoading) {
    return <HeroVacanciesSkeleton />
  }

  if (error) {
    return (
      <ErrorState onRetry={retry}/>
    )
  }

  if (!vacancies) {
    return null
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-3xl md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-primary md:text-sm">
            Актуальні вакансії
          </p>

          <h2 className="mt-1 text-lg font-semibold md:text-xl">
            Робота просто зараз
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-dark px-2.5 py-1 text-xs text-white md:px-3 md:text-sm">
          {vacancies.length} вакансій
        </span>
      </div>

      <div className="mt-4 divide-y divide-border">
        {previewVacancies.map((vacancy, index) => (
          <Link
            key={vacancy.id}
            to={`/vacancies?search=${encodeURIComponent(vacancy.title)}`}
            className={`
              group block py-4
              ${index === 2 ? 'hidden md:block' : ''}
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium text-primary">
                  {vacancy.category}
                </p>

                <h3 className="mt-1 truncate font-semibold">
                  {vacancy.title}
                </h3>

                <p className="mt-1 truncate text-sm text-muted">
                  {vacancy.company} · {vacancy.city}
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {vacancy.salary}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        <Link
          to="/vacancies"
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          Переглянути всі вакансії →
        </Link>
      </div>
    </div>
  )
}

function HeroVacanciesSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-3xl md:p-6"
      aria-hidden="true"
    >
      <div className="animate-pulse">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-3 w-24 rounded bg-surface-soft" />
            <div className="mt-2 h-5 w-40 rounded bg-surface-soft" />
          </div>

          <div className="h-7 w-20 rounded-full bg-surface-soft" />
        </div>

        <div className="mt-4 divide-y divide-border">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="py-4">
              <div className="h-3 w-16 rounded bg-surface-soft" />
              <div className="mt-2 h-5 w-40 rounded bg-surface-soft" />
              <div className="mt-2 h-4 w-32 rounded bg-surface-soft" />
              <div className="mt-3 h-4 w-28 rounded bg-surface-soft" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
