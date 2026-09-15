import { Skeleton } from "../../../components/ui/Skeleton";

export function VacanciesSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-4 w-32"/>
            <Skeleton className="h-12 w-72 max-w-full"/>
            <Skeleton className="h-5 w-full max-w-2xl"/>
            <Skeleton className="h-5 w-2/3 max-w-xl"/>
        </div>
    )
}