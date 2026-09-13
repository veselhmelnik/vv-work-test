import { Button } from './Button'

type ErrorStateProps = {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div
      className="rounded-2xl border border-border bg-surface p-6"
      role="alert"
    >
      <h2 className="text-xl font-semibold">
        Не вдалося завантажити дані
      </h2>

      <p className="mt-2 text-muted">
        Спробуйте ще раз.
      </p>

      <Button
        type="button"
        className="mt-5"
        onClick={onRetry}
      >
        Повторити
      </Button>
    </div>
  )
}