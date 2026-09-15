import { useCallback } from 'react'

import { useAsync } from './useAsync'
import { getPartnerBySlug } from '../lib/api/partners'

export function usePartner(slug?: string) {
  const fetchPartner = useCallback(() => {
    if (!slug) {
      return Promise.reject(
        new Error('Partner slug is missing'),
      )
    }

    return getPartnerBySlug(slug)
  }, [slug])

  return useAsync(fetchPartner)
}