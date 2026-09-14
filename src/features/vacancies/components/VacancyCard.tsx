import type { Vacancy } from '../types'

type VacancyCardProps = {
  vacancy: Vacancy
  compact?: boolean
  onApply?: () => void
}

export function VacancyCard({
  vacancy,
  compact = false,
  onApply,
}: VacancyCardProps) {
  const isInteractive = Boolean(onApply && !compact)

  return (
    <article
      className={`relative rounded-2xl border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 ${
        isInteractive
          ? 'hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg'
          : ''
      } ${compact ? 'p-5' : 'p-6'}`}
    >
      {isInteractive && (
        <button
          type="button"
          onClick={onApply}
          aria-label={`Подати заявку на вакансію ${vacancy.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl"
        />
      )}

      <div className="relative z-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">
              {vacancy.category}
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              {vacancy.title}
            </h3>
          </div>

          <span className="rounded-full bg-surface-soft px-3 py-1">
            {vacancy.country}
          </span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-muted">
          <p>{vacancy.company}</p>

          <p>
            {vacancy.city}, {vacancy.country}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">
              {vacancy.salary}
            </p>

            <p className="mt-1 text-sm text-muted">
              {vacancy.employmentType}
            </p>
          </div>

          {!compact && (
            <span className="text-sm font-medium text-primary">
              Подати заявку →
            </span>
          )}
        </div>
      </div>
    </article>
  )
}