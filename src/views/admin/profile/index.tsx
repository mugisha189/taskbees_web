
import { RootState } from "@/store/store";
import Banner from "./components/Banner";
import General from "./components/General";
import Card from "@/components/card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileOverview = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  console.log(user)
  const navigate=useNavigate()
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-end px-2 pt-[20px]">
        <button className="bg-brand-400 text-white h-[40px] p-3 rounded-md items-center justify-center flex " onClick={()=>navigate("edit")}>Edit Profile</button>
      </div>
      <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid  lg:grid-cols-12">
        <div className="col-span-6 flex flex-col gap-[10px] max-h-[760px] lg:!mb-0">
          
          <Banner user={user} />
          <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8   w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
              <p className="mt-2 px-2  text-start w-full   text-base text-gray-600">
              
               {user?.profile?.description} 
                
         
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Education</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
                  {/* Stanford University */}
                 {user?.educations&&user?.educations.length>0?user?.educations[0].institution:"No education found"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Languages</p>
          <p className="text-base font-medium  line-clamp-1 text-navy-700 dark:text-white">
                  {/* English, Spanish, Italian */}
                 {user?.profile?.languages?user?.profile.languages.join(", "):"English"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Skills</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
                  {/* Product Design */}
                  {user?.profile.job_title?user?.profile.job_title:"No job title found"}
          </p>
        </div>

     

     

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Birthday</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
           {user?.profile?.date_of_birth}
          </p>
        </div>
      </div>
    
    </Card>
          {/* <Card className="w-full bg-white rounded-lg  p-6 flex flex-col gap-[20px]  items-start">
          <p className="text-[20px]">Applied Jobs</p>
        <div className="p-[10px] flex flex-col w-full  gap-[8px] h-[300px] hide-scroll-bar overflow-y-auto ">
{jobs.slice(0,4).map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      </div>
        </Card> */}
        </div>
        <div className="col-span-6 lg:col-span-6 lg:mb-0 mt-[60px] lg:mt-2 ">
          <General user={user}/>
          
        </div>

       
        
      </div>
      {/* all project & ... */}

      <div className="w-full grid grid-cols-2 gap-[20px]">
      </div>
    </div>
  );
};

export default ProfileOverview;
