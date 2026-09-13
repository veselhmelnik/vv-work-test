export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-skeleton ${className}`}
      aria-hidden="true"
    ></div>
  )
}
