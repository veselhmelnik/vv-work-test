import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto bg-dark text-white">
      <div className="container-page py-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="inline-block text-xl font-bold tracking-tight"
              aria-label="VV Work — головна"
            >
              <span className="text-primary">VV</span> Work
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Допомагаємо кандидатам знаходити роботу, а роботодавцям —
              працівників у Європі.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Кандидатам</h2>

            <nav
              className="mt-4 flex flex-col gap-3 text-sm text-white/60"
              aria-label="Навігація для кандидатів"
            >
              <Link
                to="/#search"
                className="transition-colors hover:text-white"
              >
                Знайти роботу
              </Link>

              <Link
                to="/#categories"
                className="transition-colors hover:text-white"
              >
                Категорії
              </Link>

              <Link
                to="/#partners"
                className="transition-colors hover:text-white"
              >
                Партнери
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Роботодавцям</h2>

            <nav
              className="mt-4 flex flex-col gap-3 text-sm text-white/60"
              aria-label="Навігація для роботодавців"
            >
              <Link
                to="/#employers"
                className="transition-colors hover:text-white"
              >
                Знайти працівників
              </Link>

              <Link
                to="/contacts"
                className="transition-colors hover:text-white"
              >
                Зв’язатися з нами
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Компанія</h2>

            <nav
              className="mt-4 flex flex-col gap-3 text-sm text-white/60"
              aria-label="Навігація компанії"
            >
              <Link to="/#about" className="transition-colors hover:text-white">
                Про нас
              </Link>

              <Link
                to="/contacts"
                className="transition-colors hover:text-white"
              >
                Контакти
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} VV Work</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <p>Політика конфіденційності</p>
            <p>Умови використання</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
