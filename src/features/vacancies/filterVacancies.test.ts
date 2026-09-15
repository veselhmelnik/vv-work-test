import { describe, expect, it } from 'vitest'

import { filterVacancies } from './filterVacancies'
import type { Vacancy } from './types'

const vacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Warehouse Worker',
    category: 'logistics',
    company: 'DHL Logistics',
    city: 'Berlin',
    country: 'Germany',
    salary: '€2,400–2,800 / month',
    employmentType: 'Full-time',
  },
  {
    id: '2',
    title: 'Forklift Driver',
    category: 'drivers',
    company: 'DHL Logistics',
    city: 'Hamburg',
    country: 'Germany',
    salary: '€2,600–3,000 / month',
    employmentType: 'Full-time',
  },
  {
    id: '3',
    title: 'Production Worker',
    category: 'manufacturing',
    company: 'Euro Production',
    city: 'Warsaw',
    country: 'Poland',
    salary: '€1,800–2,100 / month',
    employmentType: 'Full-time',
  },
]

describe('filterVacancies', () => {
  it('returns all vacancies when filters are empty', () => {
    const result = filterVacancies(vacancies, {
      search: '',
      category: '',
    })

    expect(result).toEqual(vacancies)
  })

  it('filters vacancies by title', () => {
    const result = filterVacancies(vacancies, {
      search: 'warehouse',
      category: '',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Warehouse Worker')
  })

  it('search is case-insensitive', () => {
    const result = filterVacancies(vacancies, {
      search: 'FORKLIFT',
      category: '',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Forklift Driver')
  })

  it('trims search value', () => {
    const result = filterVacancies(vacancies, {
      search: '  production  ',
      category: '',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Production Worker')
  })

  it('filters vacancies by category', () => {
    const result = filterVacancies(vacancies, {
      search: '',
      category: 'drivers',
    })

    expect(result).toHaveLength(1)
    expect(result[0].category).toBe('drivers')
  })

  it('applies search and category together', () => {
    const result = filterVacancies(vacancies, {
      search: 'forklift',
      category: 'drivers',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Forklift Driver')
  })

  it('returns an empty array when nothing matches', () => {
    const result = filterVacancies(vacancies, {
      search: 'frontend',
      category: '',
    })

    expect(result).toEqual([])
  })
})