import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() =>
      useDebounce('initial', 300),
    )

    expect(result.current).toBe('initial')
  })

  it('does not update before the delay', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'first',
        },
      },
    )

    rerender({
      value: 'second',
    })

    act(() => {
      vi.advanceTimersByTime(299)
    })

    expect(result.current).toBe('first')
  })

  it('updates after the delay', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'first',
        },
      },
    )

    rerender({
      value: 'second',
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('second')
  })

  it('resets the timer when the value changes again', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'first',
        },
      },
    )

    rerender({
      value: 'second',
    })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    rerender({
      value: 'third',
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('third')
  })
})