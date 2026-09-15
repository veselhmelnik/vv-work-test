export function formatVacanciesCount(count: number) {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} вакансій`
  }

  if (lastDigit === 1) {
    return `${count} вакансія`
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} вакансії`
  }

  return `${count} вакансій`
}