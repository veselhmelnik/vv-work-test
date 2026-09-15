import { Link } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";

export function NotFoundPage() {
  return (
    <PageLayout>
      <section className="container-page py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Сторінку не знайдено
        </h1>

        <p className="mt-4 text-muted">
          Можливо, адресу було змінено або сторінка більше не існує.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-control bg-primary px-5 font-medium text-white hover:bg-primary-hover"
        >
          На головну
        </Link>
      </section>
    </PageLayout>
  )
}