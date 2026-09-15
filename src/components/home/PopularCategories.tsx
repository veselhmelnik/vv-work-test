import { Link } from 'react-router-dom'
import { SectionHeader } from '../SectionHeader'
import { jobCategories } from '../../features/vacancies/categories'

export function PopularCategories() {
  return (
    <section id="categories" className="container-page py-8 md:py-16 lg:py-20">
      <SectionHeader
        eyebrow="Популярні напрямки"
        title="Знайдіть роботу за категорією"
        description="Оберіть напрямок, щоб швидше перейти до релевантних вакансій."
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobCategories.map((category) => (
          <Link
            key={category.value}
            to={`/vacancies?category=${category.value}`}
            className="group rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
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
