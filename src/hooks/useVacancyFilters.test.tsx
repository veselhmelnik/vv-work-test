import { act, renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useVacancyFilters } from './useVacancyFilters'

describe('useVacancyFilters', () => {
  it('reads search from URL', () => {
    const { result } = renderHook(() => useVacancyFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/vacancies?search=warehouse']}>
          {children}
        </MemoryRouter>
      ),
    })

    expect(result.current.search).toBe('warehouse')
  })

  it('reads valid category from URL', () => {
    const { result } = renderHook(() => useVacancyFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/vacancies?category=logistics']}>
          {children}
        </MemoryRouter>
      ),
    })

    expect(result.current.category).toBe('logistics')
  })

  it('ignores invalid category from URL', () => {
    const { result } = renderHook(() => useVacancyFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/vacancies?category=banana']}>
          {children}
        </MemoryRouter>
      ),
    })

    expect(result.current.category).toBe('')
  })

  it('updates category', async () => {
    let locationSearch = ''

    function TestLocation() {
      const location = useLocation()
      locationSearch = location.search

      return null
    }

    const { result } = renderHook(() => useVacancyFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/vacancies']}>
          <TestLocation />
          {children}
        </MemoryRouter>
      ),
    })

    act(() => {
      result.current.setCategory('drivers')
    })

    await waitFor(() => {
      expect(locationSearch).toContain('category=drivers')
    })
  })

  it('updates search param after debounce', async () => {
    vi.useFakeTimers()

    let locationSearch = ''

    function TestLocation() {
      const location = useLocation()

      locationSearch = location.search

      return null
    }

    const { result } = renderHook(() => useVacancyFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/vacancies']}>
          <TestLocation />
          {children}
        </MemoryRouter>
      ),
    })

    act(() => {
      result.current.setSearch('frontend')
    })

    expect(result.current.search).toBe('frontend')
    
    expect(locationSearch).not.toContain('search=frontend')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })

    expect(locationSearch).toContain('search=frontend')

    vi.useRealTimers()
  })
})
