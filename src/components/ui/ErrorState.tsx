import { Button } from './Button'

type ErrorStateProps = {
  onRetry: () => void
  title?: string
  description?: string
}

export function ErrorState({ onRetry, title = 'Не вдалося завантажити дані', description = 'Спробуйте ще раз.' }: ErrorStateProps) {
  return (
    <div
      className="rounded-2xl border border-border bg-surface p-6"
      role="alert"
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-muted">{description}</p>

      <Button type="button" className="mt-5" onClick={onRetry}>
        Повторити
      </Button>
    </div>
  )
}
