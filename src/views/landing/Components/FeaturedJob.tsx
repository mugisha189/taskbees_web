import JobCard from "@/components/job/JobCard";
import Spinner from "@/components/loader/Spinner";
import { useGetJobs } from "@/hooks/job";


function FeaturedJob() {
  const { data: jobs, isLoading} = useGetJobs(
      "1",
    "6",
  );
  if (isLoading) {
    return (
      <div className="flex w-full  items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex py-[80px] w-full items-center flex-col gap-[20px]">

      <p  className="font-bold text-[24px]">Featured Job</p>
      <p className="text-center">Know your worth and find the job that qualify your life
      </p>
      <div className="flex w-full flex-col justify-center items-center">
      <div className="md:p-6 p-2  max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2  gap-6">
          {jobs?.items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="md:p-6 p-2  max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2  gap-6">
          {jobs?.items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="md:p-6 p-2  max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2  gap-6">
          {jobs?.items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <button className="border-[#000000] border rounded-md hover:scale-[1.02] py-[10px] px-[20px]">
          Load More Jobs
        </button>
      </div>
      
      
    </div>
  )
}

export default FeaturedJob