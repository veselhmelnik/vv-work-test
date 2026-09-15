import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from './useDebounce'
import { jobCategories } from '../features/vacancies/categories'

type SearchState = {
  value: string
  source: string
}

export function useVacancyFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlSearch = searchParams.get('search') ?? ''
  const rawCategory = searchParams.get('category') ?? ''

  const isValidCategory = jobCategories.some(
    (category) => category.value === rawCategory,
  )

  const category = isValidCategory ? rawCategory : ''

  const [searchState, setSearchState] = useState<SearchState>({
    value: urlSearch,
    source: urlSearch,
  })

  const search =
    searchState.source === urlSearch
      ? searchState.value
      : urlSearch

  const debouncedSearch = useDebounce(search, 300)

  function setSearch(value: string) {
    setSearchState({
      value,
      source: urlSearch,
    })
  }

  function setCategory(value: string) {
    setSearchParams(
      (params) => {
        const nextParams = new URLSearchParams(params)

        if (value) {
          nextParams.set('category', value)
        } else {
          nextParams.delete('category')
        }

        return nextParams
      },
      { replace: true },
    )
  }

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim()

    if (normalizedSearch === urlSearch) {
      return
    }

    setSearchParams(
      (params) => {
        const nextParams = new URLSearchParams(params)

        if (normalizedSearch) {
          nextParams.set('search', normalizedSearch)
        } else {
          nextParams.delete('search')
        }

        return nextParams
      },
      { replace: true },
    )
  }, [debouncedSearch, urlSearch, setSearchParams])

  return {
    search,
    category,
    debouncedSearch,
    setSearch,
    setCategory,
  }
}