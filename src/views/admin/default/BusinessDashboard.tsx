

import JobCard from "@/components/job/JobCard";
import Widget from "@/components/widget/Widget";
import { useGetBusinessStatistics } from "@/hooks/business";
import { useGetBusinessJobs } from "@/hooks/job";
import DashboardSkeleton from "@/skeleton/Dashboard";

import ProfileViews from "@/views/admin/default/components/ProfileViews";
import { Empty } from "antd";
import {  BriefcaseBusiness, BriefcaseMedical, CircleCheck } from "lucide-react";

const BusinessDashboard = () => {
    const { data: jobs, isLoading, isError } = useGetBusinessJobs(
  "1","12"
    );
  const { data: statistics, isLoading: isStatisticsLoading } = useGetBusinessStatistics() 
  if (isLoading || isStatisticsLoading) {
    return (
      
      <DashboardSkeleton/>
    )
    }
  if (isError) {
    return <div>Failed to load jobs</div>;
  }
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4">
        
        <Widget
          icon={<BriefcaseBusiness className="h-6 w-6" />}
          title={"Job posted"}
          subtitle={statistics?.posted_jobs.toString()}
        />
        <Widget
          icon={<BriefcaseBusiness className="h-7 w-7 text-green-600" />}
          title={"Upcoming Interview"}
          subtitle={statistics?.shortlisted.toString()}
        />
        <Widget
          icon={<CircleCheck className="h-6 w-6 text-green-500" />}
          title={"Total Job Posts"}
          subtitle={statistics?.applications.toString()}
        />
        <Widget
          icon={<BriefcaseMedical className="h-7 w-7" />}
          title={"Unread Messages"}
          subtitle={statistics?.messages.toString()}
        />
       
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 w-full aspect-[3]">
        <ProfileViews />
      
      </div>
      <div className="py-[20px] ">
      <div className="flex flex-col border shadow-sm  gap-[10px] rounded-md bg-white md:p-[30px] p-[10px]">
          <p className="text-[20px]">Posted Job
          </p>
          {jobs?.items.length === 0 && (
            <Empty/>
            )}
          <div className="md:p-6 p-2 grid grid-cols-1 gap-[10px]  md:grid-cols-2">
{jobs?.items.slice(0,4).map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      </div>
      </div>
      </div>

 

    
    </div>
  );
};

export default BusinessDashboard;
