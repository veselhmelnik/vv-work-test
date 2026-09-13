import { useParams } from 'react-router-dom'
import type { Partner } from '../features/partners/types'
import { useEffect, useState } from 'react'
import { getPartnerBySlug } from '../lib/api/api-partners'
import { PageLayout } from '../components/layout/PageLayout'

export function PartnerPage() {
  const { slug } = useParams<{ slug: string }>()

  const [partner, setPartner] = useState<Partner | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      return
    }
    async function loadPartners(partnerSlug: string) {
      try {
        setIsLoading(true)
        setError(null)
        setPartner(null)

        const data = await getPartnerBySlug(partnerSlug)

        setPartner(data)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong',
        )
      } finally {
        setIsLoading(false)
      }
    }
    loadPartners(slug)
  }, [slug])

  return (
    <PageLayout>
      <section className="container-page py-16">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
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
