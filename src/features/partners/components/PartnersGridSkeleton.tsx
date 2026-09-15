export function PartnersGridSkeleton() {
  return (
    <div
      className="mt-10 grid gap-4 md:grid-cols-2"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface p-6"
        >
          <div className="h-6 w-40 rounded bg-surface-soft" />
          <div className="mt-3 h-4 w-24 rounded bg-surface-soft" />

          <div className="mt-6 h-4 w-full rounded bg-surface-soft" />
          <div className="mt-2 h-4 w-2/3 rounded bg-surface-soft" />

          <div className="mt-6 h-4 w-20 rounded bg-surface-soft" />
        </div>
      ))}
    </div>
  )
}