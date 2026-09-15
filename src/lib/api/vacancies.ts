import type { Vacancy } from '../../features/vacancies/types'
import { partners } from '../../mocks/partners'
import { mockFetch } from './mockFetch'

export async function getVacancies(): Promise<Vacancy[]> {
  const vacancies = partners.flatMap(
    (partner) => partner.vacancies,
  )

  return mockFetch(vacancies)
}