import { useEffect, useRef } from 'react'
import type { Vacancy } from '../../vacancies/types'
import { ApplicationForm } from './ApplicationForm'

type ApplicationModalProps = {
  vacancy: Vacancy
  onClose: () => void
}

export function ApplicationModal({ vacancy, onClose }: ApplicationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const dialog = dialogRef.current

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog) {
        return
      }

      const focusableElements = dialog.querySelectorAll<HTMLElement>(`
        button:not([disabled]),
        input:not([disabled]),
        textarea:not([disabled]),
        select:not([disabled]),
        a[href],
        [tabindex]:not([tabindex="-1"])
      `)

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousOverflow

      previousActiveElement?.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Закрити форму заявки"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
        tabIndex={-1}
        className="
          relative z-10 max-h-[90vh] w-full max-w-2xl
          overflow-y-auto rounded-2xl bg-surface
          shadow-xl
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити"
          className="
            absolute right-4 top-4 z-10
            flex h-10 w-10 items-center justify-center
            rounded-lg text-xl
            hover:bg-surface-soft
          "
        >
          ×
        </button>

        <ApplicationForm vacancy={vacancy} titleId="application-modal-title" />
      </div>
    </div>
  )
}
