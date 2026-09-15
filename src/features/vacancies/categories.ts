export const jobCategories = [
  {
    label: 'Будівництво',
    value: 'construction',
  },
  {
    label: 'Виробництво',
    value: 'manufacturing',
  },
  {
    label: 'Логістика',
    value: 'logistics',
  },
  {
    label: 'Готельно-ресторанна сфера',
    value: 'hospitality',
  },
  {
    label: 'IT',
    value: 'it',
  },
  {
    label: 'Водії',
    value: 'drivers',
  },
] as const

export function getCategoryLabel(
  value: JobCategory,
) {
  return (
    jobCategories.find(
      (category) => category.value === value,
    )?.label ?? value
  )
}

export type JobCategory =
  (typeof jobCategories)[number]['value']