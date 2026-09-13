import { Hero } from '../components/Hero'
import { PageLayout } from '../components/layout/PageLayout'
import { PopularCategories } from '../components/PopularCategories'

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PopularCategories />
    </PageLayout>
  )
}
