import type { Vacancy } from "../vacancies/types"

export type Partner = {
  id: string
  slug: string
  name: string
  description: string
  location: string
  vacancies: Vacancy[]
}