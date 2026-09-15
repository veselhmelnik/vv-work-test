import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAsync } from './useAsync'

describe('useAsync', () => {
  it('resolves data successfully', async () => {
    const asyncFunction = vi.fn().mockResolvedValue('data')

    const { result } = renderHook(() => useAsync(asyncFunction))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBe('data')
    expect(result.current.error).toBeNull()
    expect(result.current.status).toBe('success')
  })

  it('returns an error when request fails', async () => {
    const requestError = new Error('Network error')

    const asyncFunction = vi.fn().mockRejectedValue(requestError)

    const { result } = renderHook(() => useAsync(asyncFunction))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe(requestError)
  })

  it('retries the request after an error', async () => {
    const asyncFunction = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce('success')

    const { result } = renderHook(() => useAsync(asyncFunction))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    act(() => {
      result.current.retry()
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.data).toBe('success')
    expect(asyncFunction).toHaveBeenCalledTimes(2)
  })

  it('ignores the result of an outdated request', async () => {
    let resolveFirst!: (value: string) => void
    let resolveSecond!: (value: string) => void

    const firstPromise = new Promise<string>((resolve) => {
      resolveFirst = resolve
    })

    const secondPromise = new Promise<string>((resolve) => {
      resolveSecond = resolve
    })

    const asyncFunction = vi
      .fn()
      .mockReturnValueOnce(firstPromise)
      .mockReturnValueOnce(secondPromise)

    const { result } = renderHook(() => useAsync(asyncFunction))

    act(() => {
      result.current.retry()
    })

    await act(async () => {
      resolveSecond('new')
      await secondPromise
    })

    expect(result.current.data).toBe('new')

    await act(async () => {
      resolveFirst('old')
      await firstPromise
    })

    expect(result.current.data).toBe('new')
  })
})
