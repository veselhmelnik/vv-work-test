import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  className = '',
}: SectionHeaderProps) {
  const headingStyles =
    Heading === 'h1'
      ? 'mt-3 text-4xl font-bold tracking-tight md:text-5xl'
      : 'mt-3 text-3xl font-bold tracking-tight md:text-4xl'
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>

      <Heading className={headingStyles}>{title}</Heading>

      {description && (
        <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
      )}
    </div>
  )
}
