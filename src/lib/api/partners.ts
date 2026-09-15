import type { Partner } from '../../features/partners/types'
import { partners } from '../../mocks/partners'
import { mockFetch } from './mockFetch'

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export async function getPartners(): Promise<Partner[]> {
  return mockFetch(partners)
}

export async function getPartnerBySlug(
  slug: string,
): Promise<Partner> {
  const partner = await mockFetch(
    partners.find((partner) => partner.slug === slug),
  )

  if (!partner) {
    throw new NotFoundError('Partner not found')
  }

  return partner
}