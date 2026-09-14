import { useCallback } from 'react'

import { getVacancies } from '../lib/api/api-vacancies'
import { useAsync } from './useAsync'

export function useVacancies() {
  const fetchVacancies = useCallback(
    () => getVacancies(),
    [],
  )

  return useAsync(fetchVacancies)
}