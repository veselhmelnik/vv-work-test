import { useCallback, useEffect, useState } from 'react'

type AsyncState<T> =
  | {
      status: 'loading'
      data: null
      error: null
    }
  | {
      status: 'success'
      data: T
      error: null
    }
  | {
      status: 'error'
      data: null
      error: string
    }

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    asyncFunction()
      .then((data) => {
        if (cancelled) {
          return
        }

        setState({
          status: 'success',
          data,
          error: null,
        })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setState({
          status: 'error',
          data: null,
          error:
            error instanceof Error
              ? error.message
              : 'Something went wrong',
        })
      })

    return () => {
      cancelled = true
    }
  }, [asyncFunction])

  const retry = useCallback(() => {
    setState({
      status: 'loading',
      data: null,
      error: null,
    })

    asyncFunction()
      .then((data) => {
        setState({
          status: 'success',
          data,
          error: null,
        })
      })
      .catch((error: unknown) => {
        setState({
          status: 'error',
          data: null,
          error:
            error instanceof Error
              ? error.message
              : 'Something went wrong',
        })
      })
  }, [asyncFunction])

  return {
    data: state.data,
    error: state.error,
    isLoading: state.status === 'loading',
    retry,
  }
}