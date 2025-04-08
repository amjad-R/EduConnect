import { Skeleton } from "@/components/ui/skeleton"

export default function DocumentsLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="mt-2 h-4 w-[450px]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-96" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      <Skeleton className="mb-6 h-10 w-[400px]" />

      <Skeleton className="h-[500px] w-full rounded-lg" />
    </div>
  )
}
