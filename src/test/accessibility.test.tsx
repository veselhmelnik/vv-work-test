import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'

import { ApplicationModal } from '../features/application/components/ApplicationModal'
import type { Vacancy } from '../features/vacancies/types'

const vacancy: Vacancy = {
  id: '1',
  title: 'Warehouse Worker',
  category: 'logistics',
  company: 'DHL Logistics',
  city: 'Berlin',
  country: 'Germany',
  salary: '€2,400–2,800 / month',
  employmentType: 'Full-time',
}

describe('accessibility', () => {
  it('ApplicationModal has no accessibility violations', async () => {
    const { container } = render(
      <ApplicationModal
        vacancy={vacancy}
        onClose={() => {}}
      />,
    )

    const results = await axe(container)

    expect(results.violations).toHaveLength(0)
  })
})