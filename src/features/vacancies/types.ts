import type { JobCategory } from "./categories"

export type Vacancy = {
  id: string
  title: string
  company: string
  city: string
  country: string
  category: JobCategory
  salary: string
  employmentType: string
}