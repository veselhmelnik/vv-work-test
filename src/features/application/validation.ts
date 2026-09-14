import type {
  ApplicationFormErrors,
  ApplicationFormValues,
} from './types'

export function validateApplication(
  values: ApplicationFormValues,
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {}

  const name = values.name.trim()
  const contact = values.contact.trim()
  const message = values.message.trim()

  const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s'-]*$/u

  if (name.length < 2) {
    errors.name = 'Ім’я має містити щонайменше 2 символи'
  } else if (!namePattern.test(name)) {
    errors.name =
      'Ім’я може містити лише літери, пробіли, дефіс або апостроф'
  }

  const phonePattern = /^\+?[0-9\s\-()]{7,20}$/
  const telegramPattern = /^@[a-zA-Z0-9_]{5,32}$/

  if (!contact) {
    errors.contact = 'Вкажіть телефон або Telegram'
  } else if (
    !phonePattern.test(contact) &&
    !telegramPattern.test(contact)
  ) {
    errors.contact =
      'Вкажіть коректний номер телефону або Telegram у форматі @username'
  }

  if (message.length > 500) {
    errors.message = 'Повідомлення не може перевищувати 500 символів'
  }

  return errors
}