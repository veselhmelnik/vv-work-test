import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToHash } from '../ScrollToHash'

type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToHash />
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}