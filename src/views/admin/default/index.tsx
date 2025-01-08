

import JobCard from "@/components/job/JobCard";
import Widget from "@/components/widget/Widget";
import { useGetCandidateStatistics } from "@/hooks/candidate";
import { useGetAppliedJobs } from "@/hooks/job";
import DashboardSkeleton from "@/skeleton/Dashboard";

import ProfileViews from "@/views/admin/default/components/ProfileViews";
import { Empty } from "antd";
import {  BriefcaseBusiness, BriefcaseMedical, CircleCheck } from "lucide-react";

const Dashboard = () => {
  const { data: jobs, isLoading, isError } = useGetAppliedJobs(
    "1","12"
  );
  const {data:candidateStatistics,isLoading:isCandidateStatisticsLoading}=useGetCandidateStatistics()
  console.log(jobs)
    if(isLoading||isCandidateStatisticsLoading){
      return <DashboardSkeleton/>
  
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
          title={"Applied job"}
          subtitle={candidateStatistics?.payload.applied_jobs?candidateStatistics?.payload.applied_jobs.toString():"0"}
        />
        <Widget
          icon={<BriefcaseBusiness className="h-7 w-7 text-green-600" />}
          title={"Shortlisted Job"}
          subtitle={candidateStatistics?.payload.shortlisted_jobs?candidateStatistics?.payload.shortlisted_jobs.toString():"0"}
        />
        <Widget
          icon={<CircleCheck className="h-6 w-6 text-green-500" />}
          title={"Completed Job"}
          subtitle={candidateStatistics?.payload.completed_jobs?candidateStatistics?.payload.completed_jobs.toString():"0"}
        />
        <Widget
          icon={<BriefcaseMedical className="h-7 w-7" />}
          title={"Interview"}
          subtitle={candidateStatistics?.payload.interviewed_jobs?candidateStatistics?.payload.interviewed_jobs.toString():"0"}
        />
       
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 w-full aspect-[3]">
        <ProfileViews />
      
      </div>
      <div className="py-[20px] ">
      <div className="flex flex-col border shadow-sm  gap-[10px] rounded-md bg-white md:p-[30px] p-[10px]">
          <p className="text-[20px]">Jobs Applied Recently
          </p>
          {jobs?.items.length === 0 && (
            <div className="flex justify-center items-center">
              <div className="w-fit">

                <Empty children={<div className="text-center">No Jobs Applied</div>}/>
              </div>
            </div>
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

export default Dashboard;
