import type { Vacancy } from "../features/vacancies/types";

export const heroVacancies = [
  {
    id: '1',
    title: 'Warehouse Worker',
    company: 'DHL Logistics',
    city: 'Berlin',
    country: 'Germany',
    category: 'Logistics',
    salary: '€2,400–2,800 / month',
    employmentType: 'Full-time',
  },
  {
    id: '2',
    title: 'Hotel Staff',
    company: 'Hotel Group',
    city: 'Amsterdam',
    country: 'Netherlands',
    category: 'Hospitality',
    salary: '€2,200–2,500 / month',
    employmentType: 'Full-time',
  },
  {
    id: '3',
    title: 'Production Worker',
    company: 'Work Partner',
    city: 'Warsaw',
    country: 'Poland',
    category: 'Manufacturing',
    salary: '€1,800–2,100 / month',
    employmentType: 'Full-time',
  },
] satisfies Vacancy[]