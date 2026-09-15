import { Link } from 'react-router-dom'

import { ErrorState } from '../../../components/ui/ErrorState'
import { usePartners } from '../../../hooks/usePartners'
import { formatVacanciesCount } from '../../../lib/pluralize'
import { SectionHeader } from '../../../components/SectionHeader'
import { PartnersGridSkeleton } from './PartnersGridSkeleton'

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
      <SectionHeader
  eyebrow="Партнери"
  title="Перевірені роботодавці"
  description="Перегляньте вакансії наших партнерів у різних країнах Європи."
/>

      {isLoading ? (
        <PartnersGridSkeleton />
      ) : error ? (
        <div className="mt-10">
          <ErrorState onRetry={retry} title="Не вдалося завантажити партнерів"/>
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
                {formatVacanciesCount(partner.vacancies.length)}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}

