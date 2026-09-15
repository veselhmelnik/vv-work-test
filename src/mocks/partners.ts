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
                id: 'dhl-1',
                title: 'Warehouse Worker',
                company: 'DHL Logistics',
                city: 'Berlin',
                country: 'Germany',
                category: 'logistics',
                salary: '€2,400–2,800 / month',
                employmentType: 'Full-time',
            },
            {
                id: 'dhl-2',
                title: 'Forklift Driver',
                company: 'DHL Logistics',
                city: 'Hamburg',
                country: 'Germany',
                category: 'drivers',
                salary: '€2,600–3,000 / month',
                employmentType: 'Full-time',
            },
        ],
    },

    {
        id: '2',
        slug: 'euro-production',
        name: 'Euro Production',
        description:
            'Виробничий партнер з вакансіями на підприємствах у Польщі та Чехії.',
        location: 'Poland',
        vacancies: [
            {
                id: 'production-1',
                title: 'Production Worker',
                company: 'Euro Production',
                city: 'Warsaw',
                country: 'Poland',
                category: 'manufacturing',
                salary: '€1,800–2,100 / month',
                employmentType: 'Full-time',
            },
            {
                id: 'production-2',
                title: 'Construction Worker',
                company: 'Euro Production',
                city: 'Prague',
                country: 'Czech Republic',
                category: 'construction',
                salary: '€2,100–2,500 / month',
                employmentType: 'Full-time',
            },
        ],
    },

    {
        id: '3',
        slug: 'hospitality-group',
        name: 'Hospitality Group',
        description:
            'Робота у готелях та ресторанах Нідерландів і Німеччини.',
        location: 'Netherlands',
        vacancies: [
            {
                id: 'hospitality-1',
                title: 'Hotel Staff',
                company: 'Hospitality Group',
                city: 'Amsterdam',
                country: 'Netherlands',
                category: 'hospitality',
                salary: '€2,200–2,500 / month',
                employmentType: 'Full-time',
            },
            {
                id: 'hospitality-2',
                title: 'Restaurant Assistant',
                company: 'Hospitality Group',
                city: 'Rotterdam',
                country: 'Netherlands',
                category: 'hospitality',
                salary: '€2,100–2,400 / month',
                employmentType: 'Full-time',
            },
        ],
    },

    {
        id: '4',
        slug: 'tech-europe',
        name: 'Tech Europe',
        description:
            'Європейські вакансії для спеціалістів у сфері IT та digital.',
        location: 'Europe',
        vacancies: [
            {
                id: 'tech-1',
                title: 'Frontend Developer',
                company: 'Tech Europe',
                city: 'Berlin',
                country: 'Germany',
                category: 'it',
                salary: '€3,500–4,500 / month',
                employmentType: 'Full-time',
            },
        ],
    },
]