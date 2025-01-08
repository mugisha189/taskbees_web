import { Skeleton } from "@/components/ui/skeleton"


function EventSkeleton() {
  return (
    <div className="w-full h-screen flex py-[40px] flex-col gap-[20px] ">
      <div className="flex justify-end">
         
        <Skeleton  className="px-4 py-2 w-[100px] h-[50px] bg-white  hover:scale-[1.02] text-white rounded-xl " />
      </div>

      <Skeleton className="flex-1 h-[calc(100vh-350px)] bg-white w-full rounded-md"></Skeleton>

    </div>
  )
}

export default EventSkeleton