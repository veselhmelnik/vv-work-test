import type { Partner } from "../../features/partners/types";
import { partners } from "../../mocks/mock-partners";
import { mockFetch } from "./mockFetch";

export async function getPartnerBySlug(slug: string): Promise<Partner> {
    const partner = partners.find(
        (partner) => partner.slug === slug
    )
    if (!partner) {
        throw new Error('Partner not found')
    }

    return mockFetch(partner)
}