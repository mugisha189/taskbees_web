import { Skeleton } from "@/components/ui/skeleton";

const CandidateProfileSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header Section */}
      <div className="flex justify-end px-2 pt-[20px]">
        <Skeleton className="h-[40px] w-[100px] rounded-md" />
      </div>

      {/* Main Content */}
      <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        {/* Left Section */}
        <div className="col-span-6 flex flex-col gap-[10px] max-h-[760px] lg:!mb-0">
          {/* Banner */}
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[87px] w-[87px] rounded-full mx-auto mt-[-40px]" />

          {/* General Information Card */}
          <div className="p-3">
            <Skeleton className="h-[24px] w-[200px] mb-4" />
            <Skeleton className="h-[16px] w-full mb-2" />
            <Skeleton className="h-[16px] w-2/3" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4 px-2">
            <Skeleton className="h-[80px] w-full rounded-2xl" />
            <Skeleton className="h-[80px] w-full rounded-2xl" />
            <Skeleton className="h-[80px] w-full rounded-2xl" />
            <Skeleton className="h-[80px] w-full rounded-2xl" />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-6 flex flex-col gap-4 mt-[60px] lg:mt-2">
          {/* Timeline */}
          <Skeleton className="h-[24px] w-[200px] mb-4" />
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-[16px] w-1/2 mb-2" />
                <Skeleton className="h-[16px] w-full" />
              </div>
            </div>
          ))}
          <Skeleton className="h-[24px] w-[200px] mb-4" />

            {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-[16px] w-1/2 mb-2" />
                <Skeleton className="h-[16px] w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileSkeleton;
