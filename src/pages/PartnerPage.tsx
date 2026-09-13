import { useParams } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { usePartner } from '../hooks/usePartner'
import { PartnerSkeleton } from '../features/partners/components/PartnerSkeleton'
import { ErrorState } from '../components/ui/ErrorState'

export function PartnerPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: partner, isLoading, error, retry } = usePartner(slug)

  return (
    <PageLayout>
      <section className="container-page py-16">
        {isLoading ? (
          <PartnerSkeleton />
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : partner ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Партнер VV Work
            </p>

            <h1 className="mt-3 text-4xl font-bold">{partner.name}</h1>

            <p className="mt-4 max-w-2xl text-muted">{partner.description}</p>
          </>
        ) : null}
      </section>
    </PageLayout>
  )
}
