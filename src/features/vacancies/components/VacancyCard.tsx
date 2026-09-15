import { getCategoryLabel } from '../categories'
import type { Vacancy } from '../types'

type VacancyCardProps = {
  vacancy: Vacancy
  onApply: () => void
}

export function VacancyCard({ vacancy, onApply }: VacancyCardProps) {
  return (
    <article
      className="
        relative rounded-2xl border border-border bg-surface p-6
        transition-[transform,box-shadow,border-color]
        duration-200
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg
      "
    >
      <button
        type="button"
        onClick={onApply}
        aria-label={`Подати заявку на вакансію ${vacancy.title}`}
        className="
  absolute inset-0 z-10 cursor-pointer rounded-2xl
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-primary
"
      />

      <div className="relative z-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">
              {getCategoryLabel(vacancy.category)}
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              {vacancy.title}
            </h2>
          </div>

          <span className="rounded-full bg-surface-soft px-3 py-1">
            {vacancy.country}
          </span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-muted">
          <p>{vacancy.company}</p>

          <p>{vacancy.city}</p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">{vacancy.salary}</p>

            <p className="mt-1 text-sm text-muted">{vacancy.employmentType}</p>
          </div>

          <span aria-hidden="true" className="text-sm font-medium text-primary">
            Подати заявку →
          </span>
        </div>
      </div>
    </article>
  )
}
