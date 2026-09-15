import { useCallback, useEffect, useState } from 'react'

type AsyncFunction<T> = () => Promise<T>

type AsyncState<T> =
  | {
      status: 'loading'
      data: null
      error: null
      source: AsyncFunction<T>
    }
  | {
      status: 'success'
      data: T
      error: null
      source: AsyncFunction<T>
    }
  | {
      status: 'error'
      data: null
      error: Error
      source: AsyncFunction<T>
    }

export function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
) {
  const [attempt, setAttempt] = useState(0)

  const [state, setState] = useState<AsyncState<T>>({
    status: 'loading',
    data: null,
    error: null,
    source: asyncFunction,
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
          source: asyncFunction,
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
              ? error
              : new Error('Something went wrong'),
          source: asyncFunction,
        })
      })

    return () => {
      cancelled = true
    }
  }, [asyncFunction, attempt])

  const retry = useCallback(() => {
    setState({
      status: 'loading',
      data: null,
      error: null,
      source: asyncFunction,
    })

    setAttempt((current) => current + 1)
  }, [asyncFunction])

  const isCurrentSource =
    state.source === asyncFunction

  const status = isCurrentSource
    ? state.status
    : 'loading'

  return {
    status,
    data: isCurrentSource ? state.data : null,
    error: isCurrentSource ? state.error : null,
    isLoading: status === 'loading',
    retry,
  }
}