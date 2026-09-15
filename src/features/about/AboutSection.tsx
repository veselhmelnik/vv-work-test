export function AboutSection() {
  return (
    <section
      id="about"
      className="container-page py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Про VV Work
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Простий шлях між кандидатом і роботодавцем
          </h2>
        </div>

        <div>
          <p className="text-lg leading-8 text-muted">
            VV Work створює зручний простір для пошуку роботи та працівників
            у Європі. Ми допомагаємо кандидатам швидше знаходити релевантні
            вакансії, а роботодавцям — виходити на потрібних спеціалістів.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <AboutPoint
              title="Прозоро"
              text="Зрозумілі вакансії та умови без зайвих кроків."
            />

            <AboutPoint
              title="Швидко"
              text="Пошук і фільтри допомагають швидше знайти потрібне."
            />

            <AboutPoint
              title="Зручно"
              text="Один простий сценарій для кандидатів і роботодавців."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

type AboutPointProps = {
  title: string
  text: string
}

function AboutPoint({
  title,
  text,
}: AboutPointProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted">
        {text}
      </p>
    </div>
  )
}