import { Link } from 'react-router-dom'

import { ErrorState } from '../../../components/ui/ErrorState'
import { usePartners } from '../../../hooks/usePartners'

export function PartnersSection() {
  const {
    data: partners,
    isLoading,
    error,
    retry,
  } = usePartners()

  return (
    <section
      id="partners"
      className="container-page py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Партнери
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Перевірені роботодавці
        </h2>

        <p className="mt-4 text-lg leading-8 text-muted">
          Перегляньте вакансії наших партнерів у різних країнах Європи.
        </p>
      </div>

      {isLoading ? (
        <PartnersSkeleton />
      ) : error ? (
        <div className="mt-10">
          <ErrorState onRetry={retry} />
        </div>
      ) : partners ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              to={`/partners/${partner.slug}`}
              className="
                group rounded-2xl border border-border
                bg-surface p-6
                transition-[transform,border-color,box-shadow]
                duration-200
                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-lg
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {partner.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted">
                    {partner.location}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    text-muted transition-transform duration-200
                    group-hover:translate-x-1
                    group-hover:text-primary
                  "
                >
                  →
                </span>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
                {partner.description}
              </p>

              <p className="mt-5 text-sm font-medium text-primary">
                {partner.vacancies.length} вакансій
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function PartnersSkeleton() {
  return (
    <div
      className="mt-10 grid gap-4 md:grid-cols-2"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface p-6"
        >
          <div className="h-6 w-40 rounded bg-surface-soft" />
          <div className="mt-3 h-4 w-24 rounded bg-surface-soft" />

          <div className="mt-6 h-4 w-full rounded bg-surface-soft" />
          <div className="mt-2 h-4 w-2/3 rounded bg-surface-soft" />

          <div className="mt-6 h-4 w-20 rounded bg-surface-soft" />
        </div>
      ))}
    </div>
  )
}