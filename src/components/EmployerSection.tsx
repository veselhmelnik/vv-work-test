import { Link } from 'react-router-dom'

export function EmployerSection() {
  return (
    <section id="employers" className="container-page py-16 md:py-20 lg:py-24">
      <div className="overflow-hidden rounded-3xl bg-dark px-6 py-10 text-white md:px-10 md:py-12 lg:px-14 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Для роботодавців
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
              Потрібні працівники?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-white/65">
              VV Work допомагає роботодавцям швидше знаходити кандидатів на
              відкриті позиції в Європі.
            </p>

            <Link
              to="/contacts"
              className="
                mt-7 inline-flex h-12 items-center justify-center
                rounded-[10px] bg-primary px-6
                font-medium text-white
                transition-[background-color,transform]
                hover:-translate-y-px
                hover:bg-primary-hover
              "
            >
              Знайти працівника
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <EmployerBenefit
              title="Швидкий пошук"
              text="Допомагаємо швидше знаходити кандидатів під відкриті позиції."
            />

            <EmployerBenefit
              title="Релевантні кандидати"
              text="Фокусуємося на кандидатах, які відповідають вашим потребам."
            />

            <EmployerBenefit
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
  title: string
  text: string
}

function EmployerBenefit({ title, text }: EmployerBenefitProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div
        className="
          flex size-9 items-center justify-center
          rounded-full bg-primary/20
          text-sm font-semibold text-white
        "
        aria-hidden="true"
      >
        ✓
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
    </div>
  )
}
