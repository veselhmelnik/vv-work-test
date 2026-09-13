import type { Partner } from '../features/partners/types'

export const partners: Partner[] = [
    {
        id: '1',
        slug: 'dhl-logistics',
        name: 'DHL Logistics',
        description:
            'Міжнародний логістичний партнер з вакансіями у Німеччині та інших країнах Європи.',
        location: 'Germany',
        vacancies: [
            {
                id: '1',
                title: 'Warehouse Worker',
                company: 'DHL Logistics',
                city: 'Berlin',
                country: 'Germany',
                category: 'logistics',
                salary: '€2,400–2,800 / month',
                employmentType: 'Full-time',
            },
            {
                id: '2',
                title: 'Forklift Driver',
                company: 'DHL Logistics',
                city: 'Hamburg',
                country: 'Germany',
                category: 'drivers',
                salary: '€2,600–3,000 / month',
                employmentType: 'Full-time',
            },
            {
                id: '3',
                title: 'Production Worker',
                company: 'DHL Logistics',
                city: 'Leipzig',
                country: 'Germany',
                category: 'manufacturing',
                salary: '€2,200–2,500 / month',
                employmentType: 'Full-time',
            },
        ],
    },
]