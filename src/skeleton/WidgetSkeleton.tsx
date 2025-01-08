import Card from "@/components/card";
import { Skeleton } from "@/components/ui/skeleton";

const WidgetSkeleton = () => {
  return (
    <Card extra="!flex-row flex-grow items-center h-[120px] rounded-[8px]">
      {/* Skeleton for the icon */}
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <Skeleton className="h-[50px]  w-[50px] rounded-md" />
      </div>

      {/* Skeleton for the text content */}
      <div className="h-50 ml-4 flex flex-1 flex-col justify-center">
        <Skeleton className="h-[16px] w-[90%] mb-2" />
        <Skeleton className="h-[24px] w-[60px]" />
      </div>
    </Card>
  );
};

export default WidgetSkeleton;
