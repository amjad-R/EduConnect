import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[400px] mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-px bg-muted text-center text-sm">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="py-2">
                  <Skeleton className="h-4 w-8 mx-auto" />
                </div>
              ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-muted">
            {Array(35)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="min-h-[100px] bg-background p-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-4" />
                    {Math.random() > 0.7 && <Skeleton className="h-4 w-4" />}
                  </div>
                  <div className="mt-1 space-y-1">
                    {Math.random() > 0.5 && <Skeleton className="h-3 w-full max-w-[80px]" />}
                    {Math.random() > 0.7 && <Skeleton className="h-3 w-full max-w-[60px]" />}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start justify-between border-b pb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-20" />
                      {Math.random() > 0.5 && <Skeleton className="h-5 w-20" />}
                    </div>
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

