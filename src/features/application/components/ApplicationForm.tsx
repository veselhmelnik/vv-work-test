import { useState } from 'react'

import { Button } from '../../../components/ui/Button'
import { submitApplication } from '../../../lib/api/applications'
import type { Vacancy } from '../../vacancies/types'
import type { ApplicationFormErrors, ApplicationFormValues } from '../types'
import { validateApplication } from '../validation'

const initialValues: ApplicationFormValues = {
  name: '',
  contact: '',
  message: '',
}

type ApplicationFormProps = {
  vacancy: Vacancy
  titleId?: string
}

export function ApplicationForm({ vacancy, titleId }: ApplicationFormProps) {
  const [values, setValues] = useState<ApplicationFormValues>(initialValues)

  const [errors, setErrors] = useState<ApplicationFormErrors>({})

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  function updateField(field: keyof ApplicationFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))

    if (status === 'success' || status === 'error') {
      setStatus('idle')
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateApplication(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus('submitting')

    try {
      await submitApplication({
        ...values,
        vacancyId: vacancy.id,
      })

      setStatus('success')
      setValues(initialValues)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6"
    >
      <div>
        <p className="text-sm font-medium text-primary">Заявка на вакансію</p>

        <h2 id={titleId} className="mt-2 text-2xl font-bold">{vacancy.title}</h2>

        <p className="mt-2 text-muted">
          {vacancy.company} · {vacancy.city}, {vacancy.country}
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="application-name"
            className="mb-2 block text-sm font-medium"
          >
            Ім’я
          </label>

          <input
            id="application-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? 'application-name-error' : undefined
            }
            className="
              h-12 w-full rounded-[10px]
              border border-border bg-surface px-4
              outline-none transition-colors
              focus:border-primary
            "
          />

          {errors.name && (
            <p id="application-name-error" className="mt-2 text-sm text-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="application-contact"
            className="mb-2 block text-sm font-medium"
          >
            Телефон або Telegram
          </label>

          <input
            id="application-contact"
            name="contact"
            value={values.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            placeholder="+380... або @username"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={
              errors.contact ? 'application-contact-error' : undefined
            }
            className="
              h-12 w-full rounded-[10px]
              border border-border bg-surface px-4
              outline-none transition-colors
              placeholder:text-muted
              focus:border-primary
            "
          />

          {errors.contact && (
            <p
              id="application-contact-error"
              className="mt-2 text-sm text-error"
            >
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="application-message"
            className="mb-2 block text-sm font-medium"
          >
            Повідомлення
            <span className="ml-1 text-muted">(необов’язково)</span>
          </label>

          <textarea
            id="application-message"
            name="message"
            rows={5}
            maxLength={501}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message
                ? 'application-message-error'
                : 'application-message-counter'
            }
            className="
              w-full resize-none rounded-[10px]
              border border-border bg-surface p-4
              outline-none transition-colors
              focus:border-primary
            "
          />

          <div className="mt-2 flex justify-between gap-4 text-sm">
            <div>
              {errors.message && (
                <p id="application-message-error" className="text-error">
                  {errors.message}
                </p>
              )}
            </div>

            <span id="application-message-counter" className="text-muted">
              {values.message.length}/500
            </span>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-error" role="alert">
          Не вдалося надіслати заявку. Спробуйте ще раз.
        </p>
      )}

      {status === 'success' && (
        <p className="mt-4 text-sm text-success" role="status">
          Заявку успішно надіслано.
        </p>
      )}

      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Надсилаємо...' : 'Надіслати заявку'}
      </Button>
    </form>
  )
}
