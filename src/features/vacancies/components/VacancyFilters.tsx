import { jobCategories } from '../../../mocks/mock-categories'

type VacancyFilterProps = {
  search: string
  category: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function VacancyFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: VacancyFilterProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_260px]">
      <div>
        <label htmlFor="vacancy-search" className="sr-only">
          Пошук вакансій
        </label>

        <input
          id="vacancy-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Пошук за назвою вакансії"
          className="h-12 w-full rounded-[10px] border border-border bg-surface px-4 outline-none transition-colors placeholder:text-muted focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="vacancy-category" className="sr-only">
          Категорія
        </label>

        <select
          id="vacancy-category"
          onChange={(e) => onCategoryChange(e.target.value)}
          value={category}
          className="h-12 w-full rounded-[10px] border border-border bg-surface px-4 outline-none transition-colors focus:border-primary"
        >
          <option value="">Всі категорії</option>
          {jobCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
