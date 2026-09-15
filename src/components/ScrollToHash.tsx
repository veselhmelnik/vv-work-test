import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      return
    }

    const element = document.getElementById(hash.slice(1))

    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [hash])
  return null
}
