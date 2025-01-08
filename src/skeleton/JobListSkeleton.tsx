
import { Skeleton } from "@/components/ui/skeleton"
import JobCardSkeleton from "./JobCardSkeleton"


function ListSkeleton() {
  return (
    <div className="bg-white py-[20px] rounded-xl">
        <div className="flex w-full md:flex-row flex-col gap-[20px] justify-between px-6">
          {/* Tab Navigation Skeleton */}
          <div className="flex md:w-fi w-fit flex-row  gap-6 py-3">
            <Skeleton className="h-[30px] w-[80px] rounded-md" />
            <Skeleton className="h-[30px] w-[80px] rounded-md" />
            <Skeleton className="h-[30px] w-[80px] rounded-md" />
          </div>

          {/* Sorting and Items Per Page Skeleton */}
          <div className="flex px-3 items-center gap-4">
            <Skeleton className="md:w-[180px] w-full h-[40px] rounded-md" />
            <Skeleton className="md:w-[180px] w-full h-[40px] rounded-md" />
          </div>
        </div>

        {/* Jobs Grid Skeleton */}
        <div className="md:p-6 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
          <JobCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center">
          <Skeleton className="h-[40px] w-[300px] rounded-md" />
        </div>
      </div>
  )
}

export default ListSkeleton