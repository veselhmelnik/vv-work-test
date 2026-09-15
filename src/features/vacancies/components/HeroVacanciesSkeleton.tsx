export function HeroVacanciesSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-3xl md:p-6"
      aria-hidden="true"
    >
      <div className="animate-pulse">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-3 w-24 rounded bg-surface-soft" />
            <div className="mt-2 h-5 w-40 rounded bg-surface-soft" />
          </div>

          <div className="h-7 w-20 rounded-full bg-surface-soft" />
        </div>

        <div className="mt-4 divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="py-4">
              <div className="h-3 w-16 rounded bg-surface-soft" />
              <div className="mt-2 h-5 w-40 rounded bg-surface-soft" />
              <div className="mt-2 h-4 w-32 rounded bg-surface-soft" />
              <div className="mt-3 h-4 w-28 rounded bg-surface-soft" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}