import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Роботодавцям', to: '/#employers' },
  { label: 'Партнери', to: '/#partners' },
  { label: 'Про нас', to: '/#about' },
  { label: 'Контакти', to: '/contacts' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
          aria-label="VV Work — головна"
        >
          <span className="text-primary">VV</span> Work
        </Link>

        <nav
          className="hidden items-center gap-5 min-[850px]:flex lg:gap-8"
          aria-label="Основна навігація"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `
                text-sm font-medium transition-colors
                hover:text-primary
                ${isActive ? 'text-primary' : 'text-muted'}
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-[850px]:block">
          <VacanciesLink setIsMenuOpen={setIsMenuOpen} />
        </div>

        <button
          type="button"
          className="
    inline-flex h-11 w-11 items-center justify-center
    rounded-[10px]
    hover:bg-surface-soft
    min-[850px]:hidden
  "
          aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="sr-only">
            {isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          </span>

          <span aria-hidden="true" className="text-2xl">
            {isMenuOpen ? '×' : '☰'}
          </span>
        </button>
      </div>
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  )
}

function MobileMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (v: boolean) => void
}) {
  return (
    <nav
      id="mobile-navigation"
      className="border-t border-border bg-background min-[850px]:hidden"
      aria-label="Мобільна навігація"
    >
      <div className="container-page flex flex-col py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => setIsMenuOpen(false)}
            className="
                  rounded-lg px-3 py-3
                  font-medium text-foreground
                  transition-colors
                  hover:bg-surface-soft
                  focus-visible:bg-surface-soft
                "
          >
            {item.label}
          </NavLink>
        ))}

        <VacanciesLink setIsMenuOpen={setIsMenuOpen} additionalStyles="mt-3" />
      </div>
    </nav>
  )
}

function VacanciesLink({
  setIsMenuOpen,
  additionalStyles = '',
}: {
  setIsMenuOpen: (v: boolean) => void
  additionalStyles?: string
}) {
  return (
    <Link
      to="/vacancies"
      onClick={() => setIsMenuOpen(false)}
      className={`inline-flex h-11 items-center justify-center
                rounded-[10px]
                bg-primary px-5
                font-medium text-white
                hover:bg-primary-hover ${additionalStyles}`}
    >
      Знайти роботу
    </Link>
  )
}
