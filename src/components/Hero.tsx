import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { heroVacancies } from '../mocks/mock-hero-vacancies'
import { Button } from './ui/Button'

export function Hero() {
  return (
    <section className="container-page py-16 md:py-20 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Робота в Європі
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Робота в Європі без зайвих пошуків
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Перевірені вакансії від роботодавців та партнерів VV Work. Знайдіть
            роботу, яка вам підходить.
          </p>
          <form className="mt-8">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
              <div>
                <label htmlFor="job-search" className="sr-only">
                  Посада або ключове слово
                </label>

                <input
                  id="job-search"
                  type="search"
                  placeholder="Посада або ключове слово"
                  className="
          h-12 w-full rounded-[10px]
          border border-border
          bg-surface px-4
          text-foreground
          outline-none
          transition
          placeholder:text-muted
          focus:border-primary
        "
                />
              </div>

              <Button type="submit" className="h-12 px-6">
                Знайти роботу
              </Button>
            </div>

            <div className="mt-3">
              <label htmlFor="job-category" className="sr-only">
                Категорія
              </label>

              <select
                id="job-category"
                defaultValue=""
                className="
        h-12 w-full rounded-[10px]
        border border-border
        bg-surface px-4
        text-foreground
        outline-none
        transition
        focus:border-primary
      "
              >
                <option value="">Всі категорії</option>
                <option value="construction">Будівництво</option>
                <option value="manufacturing">Виробництво</option>
                <option value="logistics">Логістика</option>
                <option value="hospitality">Готельно-ресторанна сфера</option>
                <option value="it">IT</option>
                <option value="drivers">Водії</option>
              </select>
            </div>
          </form>
          <div className="mt-4 md:mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-xs text-primary">
                ✓
              </span>
              Перевірені роботодавці
            </span>
            <span className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-xs text-primary">
                ✓
              </span>
              Вакансії по всій Європі
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="grid gap-4 lg:hidden">
            <VacancyCard vacancy={heroVacancies[0]} />
            <VacancyCard vacancy={heroVacancies[1]} compact />
          </div>

          <div className="relative hidden min-h-107.5 lg:block">
            <div className="cursor-pointer absolute left-0 top-0 z-30 w-[88%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[0]} />
            </div>

            <div className="cursor-pointer absolute bottom-0 left-12 z-10 w-[68%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[2]} compact />
            </div>

            <div className="cursor-pointer absolute bottom-5 right-0 z-20 w-[68%] hover:z-40">
              <VacancyCard vacancy={heroVacancies[1]} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
