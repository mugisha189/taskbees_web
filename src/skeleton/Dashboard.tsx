import WidgetSkeleton from "@/skeleton/WidgetSkeleton"

import ProfileViewsSkeleton from "./ProfileVIewSKeleton"
import AppliedJobDashboardSkeleton from "./AppliedJobDashboardSkeleton"


function DashboardSkeleton() {
  return (
    <div className="flex  flex-col gap-2" >
      
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4">
        
        <WidgetSkeleton
          
        />
        <WidgetSkeleton
          
        />
        <WidgetSkeleton
          
        />
        <WidgetSkeleton
         
        />
       
      </div>
      <ProfileViewsSkeleton />
      <AppliedJobDashboardSkeleton/>
    </div>
  )
}

export default DashboardSkeleton