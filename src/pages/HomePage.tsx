import { EmployerSection } from '../components/EmployerSection'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/layout/PageLayout'
import { PopularCategories } from '../components/PopularCategories'
import { PartnersSection } from '../features/partners/components/PartnersSection'

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PopularCategories />
      <PartnersSection />
      <EmployerSection />
    </PageLayout>
  )
}
