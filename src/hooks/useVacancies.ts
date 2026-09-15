import { getVacancies } from '../lib/api/vacancies'
import { useAsync } from './useAsync'

export function useVacancies() {
  return useAsync(getVacancies)
}