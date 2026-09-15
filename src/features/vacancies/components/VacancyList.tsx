import { useCallback, useState } from 'react'

import { ApplicationModal } from '../../application/components/ApplicationModal'
import { VacancyCard } from './VacancyCard'
import type { Vacancy } from '../types'

type VacancyListProps<T extends Vacancy> = {
  vacancies: T[]
  hasActiveFilters?: boolean
}

export function VacancyList<T extends Vacancy>({
  vacancies,
  hasActiveFilters,
}: VacancyListProps<T>) {
  const [selectedVacancy, setSelectedVacancy] = useState<T | null>(null)

  const handleClose = useCallback(() => {
    setSelectedVacancy(null)
  }, [])

  if (vacancies.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-lg font-semibold">
          {hasActiveFilters ? 'Вакансій не знайдено' : 'Наразі вакансій немає'}
        </h2>

        <p className="mt-2 text-muted">
          {hasActiveFilters
            ? 'Спробуйте змінити пошуковий запит або категорію.'
            : 'Нові вакансії цього роботодавця з’являться тут.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-8 grid gap-4">
        {vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onApply={() => setSelectedVacancy(vacancy)}
          />
        ))}
      </div>

      {selectedVacancy && (
        <ApplicationModal vacancy={selectedVacancy} onClose={handleClose} />
      )}
    </>
  )
}
