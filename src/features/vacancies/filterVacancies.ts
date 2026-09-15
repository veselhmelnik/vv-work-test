import type { Vacancy } from './types'

type VacancyFilters = {
  search: string
  category: string
}

export function filterVacancies<T extends Vacancy>(
  vacancies: T[],
  { search, category }: VacancyFilters,
): T[] {
  const normalizedSearch = search.trim().toLowerCase()

  return vacancies.filter((vacancy) => {
    const matchesSearch =
      normalizedSearch === '' ||
      vacancy.title.toLowerCase().includes(normalizedSearch)

    const matchesCategory =
      category === '' ||
      vacancy.category === category

    return matchesSearch && matchesCategory
  })
}