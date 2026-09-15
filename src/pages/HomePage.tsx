import { AboutSection } from '../components/home/AboutSection'
import { EmployerSection } from '../components/home/EmployerSection'
import { Hero } from '../components/home/Hero'
import { PopularCategories } from '../components/home/PopularCategories'
import { PageLayout } from '../components/layout/PageLayout'
import { PartnersSection } from '../features/partners/components/PartnersSection'

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PopularCategories />
      <PartnersSection />
       <AboutSection />
      <EmployerSection />
    </PageLayout>
  )
}
