import { Skeleton } from "@/components/ui/skeleton"

export default function ParametresLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="mt-2 h-4 w-[450px]" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-[500px]" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[250px] w-full rounded-lg" />
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}
