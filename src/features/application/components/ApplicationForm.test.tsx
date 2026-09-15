import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { submitApplication } from '../../../lib/api/applications'
import type { Vacancy } from '../../vacancies/types'
import { ApplicationForm } from './ApplicationForm'

vi.mock('../../../lib/api/applications', () => ({
  submitApplication: vi.fn(),
}))

const mockedSubmitApplication = vi.mocked(submitApplication)

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

describe('ApplicationForm', () => {
  beforeEach(() => {
    mockedSubmitApplication.mockReset()
  })

  it('does not submit an invalid form', async () => {
    const user = userEvent.setup()

    render(<ApplicationForm vacancy={vacancy} />)

    await user.click(
      screen.getByRole('button', {
        name: /надіслати заявку/i,
      }),
    )

    expect(mockedSubmitApplication).not.toHaveBeenCalled()

    const nameInput = screen.getByLabelText('Ім’я')

    expect(nameInput).toHaveAttribute('aria-invalid', 'true')

    expect(nameInput).toHaveAttribute(
      'aria-describedby',
      'application-name-error',
    )

    expect(
      document.getElementById('application-name-error'),
    ).toBeInTheDocument()
  })

  it('submits valid form data', async () => {
    mockedSubmitApplication.mockResolvedValue({
      id: 'application-1',
      createdAt: '2026-09-15T12:00:00.000Z',
    })

    const user = userEvent.setup()

    render(<ApplicationForm vacancy={vacancy} />)

    await user.type(screen.getByLabelText('Ім’я'), 'Никита')

    await user.type(screen.getByLabelText('Телефон або Telegram'), '@nikita')

    await user.click(
      screen.getByRole('button', {
        name: /надіслати заявку/i,
      }),
    )

    expect(mockedSubmitApplication).toHaveBeenCalledTimes(1)

    expect(mockedSubmitApplication).toHaveBeenCalledWith({
      name: 'Никита',
      contact: '@nikita',
      message: '',
      vacancyId: vacancy.id,
    })
  })

  it('shows submitting state while request is pending', async () => {
    let resolveRequest!: (value: { id: string; createdAt: string }) => void

    mockedSubmitApplication.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve
        }),
    )

    const user = userEvent.setup()

    render(<ApplicationForm vacancy={vacancy} />)

    await user.type(screen.getByLabelText('Ім’я'), 'Никита')

    await user.type(screen.getByLabelText('Телефон або Telegram'), '@nikita')

    await user.click(
      screen.getByRole('button', {
        name: /надіслати заявку/i,
      }),
    )

    expect(screen.getByRole('status')).toHaveTextContent('Надсилаємо заявку')

    resolveRequest({
      id: 'application-1',
      createdAt: '2026-09-15T12:00:00.000Z',
    })

    expect(await screen.findByText('Заявку надіслано')).toBeInTheDocument()
  })

  it('shows success state after successful submit', async () => {
    mockedSubmitApplication.mockResolvedValue({
      id: 'application-1',
      createdAt: '2026-09-15T12:00:00.000Z',
    })

    const user = userEvent.setup()

    render(<ApplicationForm vacancy={vacancy} />)

    await user.type(screen.getByLabelText('Ім’я'), 'Никита')

    await user.type(screen.getByLabelText('Телефон або Telegram'), '@nikita')

    await user.click(
      screen.getByRole('button', {
        name: /надіслати заявку/i,
      }),
    )

    expect(await screen.findByText('Заявку надіслано')).toBeInTheDocument()

    expect(screen.getByRole('status')).toHaveTextContent('Warehouse Worker')
  })

  it('shows an error when submit fails', async () => {
    mockedSubmitApplication.mockRejectedValue(new Error('Network error'))

    const user = userEvent.setup()

    render(<ApplicationForm vacancy={vacancy} />)

    await user.type(screen.getByLabelText('Ім’я'), 'Никита')

    await user.type(screen.getByLabelText('Телефон або Telegram'), '@nikita')

    await user.click(
      screen.getByRole('button', {
        name: /надіслати заявку/i,
      }),
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Не вдалося надіслати заявку. Спробуйте ще раз.',
    )

    // После rollback значения формы должны сохраниться.
    expect(screen.getByLabelText('Ім’я')).toHaveValue('Никита')

    expect(screen.getByLabelText('Телефон або Telegram')).toHaveValue('@nikita')
  })
})
