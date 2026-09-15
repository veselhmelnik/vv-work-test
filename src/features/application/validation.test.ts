import { describe, expect, it } from 'vitest'

import { validateApplication } from './validation'

describe('validateApplication', () => {
  it('returns no errors for valid values', () => {
    const result = validateApplication({
      name: 'Никита',
      contact: '@nikita',
      message: 'Хочу подати заявку',
    })

    expect(result).toEqual({})
  })

  it('returns an error when name is empty', () => {
    const result = validateApplication({
      name: '',
      contact: '@nikita',
      message: '',
    })

    expect(result.name).toBeDefined()
  })

  it('returns an error when name contains numbers', () => {
    const result = validateApplication({
      name: 'Никита123',
      contact: '@nikita',
      message: '',
    })

    expect(result.name).toBeDefined()
  })

  it('returns an error when contact is empty', () => {
    const result = validateApplication({
      name: 'Никита',
      contact: '',
      message: '',
    })

    expect(result.contact).toBeDefined()
  })

  it('returns an error when message is longer than 500 characters', () => {
    const result = validateApplication({
      name: 'Никита',
      contact: '@nikita',
      message: 'a'.repeat(501),
    })

    expect(result.message).toBeDefined()
  })
})