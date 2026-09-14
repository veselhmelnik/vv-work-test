import { PageLayout } from '../components/layout/PageLayout'

export function ContactsPage() {
  return (
    <PageLayout>
      <section className="container-page py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Контакти
            </p>

            <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight md:text-5xl">
              Зв’яжіться з VV Work
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              Маєте питання щодо вакансій, співпраці або пошуку працівників?
              Напишіть нам зручним для вас способом.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard
              title="Email"
              value="hello@vvwork.example"
              href="mailto:hello@vvwork.example"
            />

            <ContactCard
              title="Telegram"
              value="@vvwork"
              href="https://t.me/vvwork"
            />

            <ContactCard
              title="Для роботодавців"
              value="partners@vvwork.example"
              href="mailto:partners@vvwork.example"
            />

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-sm font-medium text-primary">
                Графік відповіді
              </p>

              <h2 className="mt-2 text-lg font-semibold">Пн–Пт, 09:00–18:00</h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Зазвичай відповідаємо протягом одного робочого дня.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container-page pb-16 md:pb-20 lg:pb-24">
        <div className="rounded-3xl bg-primary-soft p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Для роботодавців
          </p>

          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Шукаєте працівників?
          </h2>

          <p className="mt-3 max-w-2xl text-muted">
            Напишіть нам коротко, кого шукаєте, і команда VV Work зв’яжеться з
            вами.
          </p>

          <a
            href="mailto:partners@vvwork.example"
            className="
        mt-6 inline-flex h-12 items-center justify-center
        rounded-[10px] bg-primary px-6
        font-medium text-white
        hover:bg-primary-hover
      "
          >
            Написати команді
          </a>
        </div>
      </section>
    </PageLayout>
  )
}

type ContactCardProps = {
  title: string
  value: string
  href: string
}

function ContactCard({ title, value, href }: ContactCardProps) {
  return (
    <a
      href={href}
      className="
        group rounded-2xl border border-border
        bg-surface p-6
        transition-[transform,border-color,box-shadow]
        duration-200
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg
      "
    >
      <p className="text-sm font-medium text-primary">{title}</p>

      <div className="mt-2 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{value}</h2>

        <span
          aria-hidden="true"
          className="
            text-muted transition-transform
            group-hover:translate-x-1
            group-hover:text-primary
          "
        >
          →
        </span>
      </div>
    </a>
  )
}
