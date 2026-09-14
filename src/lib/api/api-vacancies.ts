import type { Vacancy } from '../../features/vacancies/types'
import { partners } from '../../mocks/mock-partners'
import { mockFetch } from './mockFetch'

export type VacancyWithPartner = Vacancy & {
  partnerSlug: string
}

export async function getVacancies(): Promise<VacancyWithPartner[]> {
  const vacancies = partners.flatMap((partner) =>
    partner.vacancies.map((vacancy) => ({
      ...vacancy,
      partnerSlug: partner.slug,
    })),
  )

  return mockFetch(vacancies)
}