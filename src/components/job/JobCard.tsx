import { Job } from '@/types/api';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoFlashOutline } from 'react-icons/io5';
import { LuCrown } from 'react-icons/lu';
import { Link } from 'react-router-dom';



interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const jobLink=window.location.href.includes("employer")?`/employer/job/${job.id}`:window.location.href.includes("candidate")?`/candidate/jobs/${job.id}`:`/job/${job.id}`
  return (
    <Link to={`${jobLink}`}
      key={job.id}
      className="border cursor-pointer hover:border-brand-500 hover:scale-[1.01] transition-all duration-200 rounded-xl md:p-4 p-2  md:h-fit"
    >
      <div className="flex md:flex-row flex-col gap-[10px]  w-full justify-between">
        <div className="flex items-center gap-4">
          {/* Job Logo */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {job.featured_image ? (
              <img className='rounded-full w-full h-full object-cover' src={job.featured_image} alt={`${job.companyName} logo`} />
            ) : (
              <span className="text-gray-400">No Logo</span>
            )}
          </div>
          {/* Job Info */}
          <div>
            <h3 className="md:text-[20px] text-[16px] w-full line-clamp-1 overflow-hidden text-ellipsis font-semibold">{job.job_title}</h3>
            <p className="text-sm text-gray-600">
              by <span className="font-[600] hover:text-brand-500 dark:hover:text-white text-[#000]">
                {job.companyName}
              </span> {job.category && `in ${job.category}`}
            </p>
          </div>
       
        </div>
        <div className="flex md:items-center   gap-2">
          {job.status == "ONGOING" ? <div className='bg-brand-400 px-[10px] rounded-md text-white'>
            Applied
          </div> :
            <div className="flex items-center gap-2">
              <LuCrown />
              <IoFlashOutline />
              <CiBookmark />


            </div>
          }
        </div>
      </div>
      {/* Job Type and Date */}
      <div className="mt-4 flex items-center gap-[10px]">
        {job.type && (
          <span className="text-sm capitalize font-[500] bg-[#fff6e3] text-yellow-600 px-2 py-1 rounded-full">
            {job.type.toLowerCase().replace('_'," ")}
          </span>
        )}
        {job.location && (
          <div className="text-sm px-2 py-1 rounded-full border">{job.location}</div>
        )}
        <span className="text-sm px-2 py-1 rounded-full border">{job.application_deadline?job.application_deadline.toString().split("T")[0]:""}</span>
      </div>
    </Link>
  );
};

export default JobCard;
