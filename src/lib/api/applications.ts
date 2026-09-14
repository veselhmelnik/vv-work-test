import type { ApplicationPayload } from '../../features/application/types'
import { mockFetch } from './mockFetch'

export type ApplicationResponse = {
  id: string
  createdAt: string
}

export async function submitApplication(
  application: ApplicationPayload,
): Promise<ApplicationResponse> {
  void application

  return mockFetch({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  })
}