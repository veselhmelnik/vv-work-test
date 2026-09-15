import { Link } from 'react-router-dom'

export function EmployerSection() {
  return (
    <section
      id="employers"
      className="container-page scroll-mt-20 py-8 md:py-12"
    >
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-10 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <div className="inline-flex rounded-full bg-dark px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Для роботодавців
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              Потрібні працівники?
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted">
              VV Work допомагає роботодавцям швидше знаходити кандидатів
              на відкриті позиції в Європі.
            </p>

            <Link
              to="/contacts"
              className="
                mt-7 inline-flex h-12 items-center justify-center
                rounded-control bg-primary px-6
                font-medium text-white
                transition-[background-color,transform]
                hover:-translate-y-px
                hover:bg-primary-hover
              "
            >
              Знайти працівника
            </Link>
          </div>

          <div className="grid gap-3">
            <EmployerBenefit
              number="01"
              title="Швидкий пошук"
              text="Допомагаємо швидше знаходити кандидатів під відкриті позиції."
            />

            <EmployerBenefit
              number="02"
              title="Релевантні кандидати"
              text="Фокусуємося на кандидатах, які відповідають вашим потребам."
            />

            <EmployerBenefit
              number="03"
              title="Підтримка VV Work"
              text="Супроводжуємо процес пошуку та комунікації з кандидатами."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

type EmployerBenefitProps = {
  number: string
  title: string
  text: string
}

function EmployerBenefit({
  number,
  title,
  text,
}: EmployerBenefitProps) {
  return (
    <div className="flex gap-4 rounded-2xl bg-surface-soft p-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dark text-xs font-semibold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted">
          {text}
        </p>
      </div>
    </div>
  )
}