import Card from "@/components/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileViewsSkeleton = () => {
  return (
    <Card extra="!p-[20px] text-center">
      {/* Header buttons skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-[40px] w-[140px] rounded-lg" />
        <Skeleton className="h-[40px] w-[40px] rounded-lg" />
      </div>

      {/* Main content skeleton */}
      <div className="flex h-full w-full md:flex-row flex-col justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden mt-6 gap-[40px]">
        {/* Left section (text placeholders) */}
        <div className="flex flex-col items-start">
          <Skeleton className="h-[36px] w-[120px] mt-[20px]" /> {/* Placeholder for total views */}
          <div className="flex flex-col items-start">
            <Skeleton className="h-[16px] w-[80px] mt-2" /> {/* Placeholder for "Total Views" */}
            <div className="flex flex-row items-center justify-center mt-2">
              <Skeleton className="h-[20px] w-[20px] rounded-full" /> {/* Arrow icon */}
              <Skeleton className="h-[16px] w-[60px] ml-2" /> {/* Percentage */}
            </div>
          </div>
        </div>

        {/* Right section (chart placeholder) */}
        <div className="h-full w-full">
          <Skeleton className="h-[calc(100vh-360px)] w-full rounded-md" /> {/* Chart placeholder */}
        </div>
      </div>
    </Card>
  );
};

export default ProfileViewsSkeleton;
