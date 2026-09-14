import { Link } from 'react-router-dom'
import { jobCategories } from '../mocks/mock-categories'

export function PopularCategories() {
  return (
    <section id="categories" className="container-page py-8 md:py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Популярні напрямки
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Знайдіть роботу за категорією
        </h2>

        <p className="mt-4 text-lg leading-8 text-muted">
          Оберіть напрямок, щоб швидше перейти до релевантних вакансій.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobCategories.map((category) => (
          <Link
            key={category.value}
            to={`/partners/${category.partnerSlug}?category=${category.value}`}
            className="group rounded-2xl border border-border bg-surface p-5 transition-[transform, border-color, box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">{category.label}</h3>

              <span
                aria-hidden="true"
                className="text-lg text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
              >
                →
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">Переглянути вакансії</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
