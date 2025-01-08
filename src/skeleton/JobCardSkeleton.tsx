import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="border bg-white rounded-xl p-4 md:h-fit animate-pulse">
      <div className="flex md:flex-row flex-col gap-[10px] w-full justify-between">
        
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />

        
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[20px] w-[150px] rounded" />
            <Skeleton className="h-[16px] w-[200px] rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
        </div>
      </div>

      {/* Job Type, Location, and Date */}
      <div className="mt-4 flex items-center gap-[10px]">
        <Skeleton className="h-[24px] w-[80px] rounded-full" /> {/* Job Type */}
        <Skeleton className="h-[24px] w-[100px] rounded-full" /> {/* Location */}
        <Skeleton className="h-[24px] w-[80px] rounded-full" /> {/* Deadline */}
      </div>
    </div>
  );
};

export default JobCardSkeleton;
