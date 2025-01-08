import JobCardSkeleton from "./JobCardSkeleton"


function AppliedJobDashboardSkeleton() {
  return (
    <div className="md:p-6 p-2 bg-white rounded-lg grid grid-cols-1 gap-[10px]  md:grid-cols-2">
    {[1,2,3,4].map((job) => (
            <JobCardSkeleton  key={job} />
    ))}
      
      </div>
  )
}

export default AppliedJobDashboardSkeleton