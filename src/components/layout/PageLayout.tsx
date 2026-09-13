import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
