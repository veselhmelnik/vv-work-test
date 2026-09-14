import { useEffect, useRef } from 'react'
import type { Vacancy } from '../../vacancies/types'
import { ApplicationForm } from './ApplicationForm'

type ApplicationModalProps = {
  vacancy: Vacancy
  onClose: () => void
}

export function ApplicationModal({
  vacancy,
  onClose,
}: ApplicationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousActiveElement =
      document.activeElement as HTMLElement | null

    dialogRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previousActiveElement?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="presentation"
    >
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

        <ApplicationForm
          vacancy={vacancy}
          titleId="application-modal-title"
        />
      </div>
    </div>
  )
}