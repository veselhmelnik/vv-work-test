import { getPartners } from '../lib/api/partners'
import { useAsync } from './useAsync'

export function usePartners() {
  return useAsync(getPartners)
}