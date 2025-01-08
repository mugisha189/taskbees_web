import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ListSkeleton from "./JobListSkeleton";



const JobListSkeleton: React.FC = () => {
  return (
    <section className="flex flex-col w-full max-w-[1600px]  gap-[20px] py-[80px]">
      {/* Header Section Skeleton */}
      <div className="md:py-[40px] rounded-xl w-full flex gap-[20px] flex-col items-center justify-center">
        <Skeleton className="md:h-[50px] bg-white h-[35px] md:w-[600px] w-[300px] rounded-md" />
        <Skeleton className="h-[20px] w-[300px] bg-white rounded-md" />
        <div className="bg-white md:flex hidden border px-[30px] gap-[10px] rounded-[8px] shadow-sm justify-center items-center w-full xl:max-w-[1600px] h-[100px]">
          <Skeleton className="flex-1 h-[50px] w-full rounded-md" />
          <Skeleton className="flex-1 h-[50px] w-full rounded-md" />
          <Skeleton className="flex-1 h-[50px] w-full rounded-md" />
          <Skeleton className="h-[50px] w-[120px] rounded-md" />
        </div>
      </div>

      {/* Job List Skeleton */}
   <ListSkeleton/>
    </section>
  );
};

export default JobListSkeleton;
