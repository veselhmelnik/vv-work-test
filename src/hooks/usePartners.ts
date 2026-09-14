import { useCallback } from 'react'

import { getPartners } from '../lib/api/api-partners'
import { useAsync } from './useAsync'

export function usePartners() {
  const fetchPartners = useCallback(
    () => getPartners(),
    [],
  )

  return useAsync(fetchPartners)
}