import { partners } from '../../mocks/mock-partners'
import type { Vacancy } from '../../features/vacancies/types'

export type VacancyWithPartner = Vacancy & {
    partnerSlug: string
}

export function getAllVacancies(): VacancyWithPartner[] {
    return partners.flatMap((partner) =>
        partner.vacancies.map((vacancy) => ({
            ...vacancy,
            partnerSlug: partner.slug,
        })),
    )
}