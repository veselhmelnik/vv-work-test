import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Vacancy } from '../../vacancies/types'
import { ApplicationModal } from './ApplicationModal'

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

describe('ApplicationModal', () => {
  it('renders an accessible dialog', () => {
    render(
      <ApplicationModal
        vacancy={vacancy}
        onClose={() => {}}
      />,
    )

    expect(
      screen.getByRole('dialog', {
        name: 'Warehouse Worker',
      }),
    ).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(
      <ApplicationModal
        vacancy={vacancy}
        onClose={onClose}
      />,
    )

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})