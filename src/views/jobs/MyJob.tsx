
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from "./Pagination";
import { CiBookmark } from "react-icons/ci";
import { IoFlashOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { BriefcaseBusiness, Filter, LocateIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { MdLocationPin } from "react-icons/md";
import { TbLocationPin } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import JobCard from "@/components/job/JobCard";
import { jobs } from "@/variables/job";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const MyJob = () => {
 
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const filterRef = useRef(null);
  const [activeTab, setActiveTab] = useState<"ongoing" | "all" | "completed">("all");

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate=useNavigate()
  

  return (
    <section className=" flex flex-col gap-[20px] py-[80px]">
      <div className="flex justify-between items-center">

        <p className="px-[10px] font-[600] text-[20px]">MY JOBS</p>
        <button onClick={()=>{navigate("/employer/jobs/new")}} className="flex items-center justify-center bg-brand-400 p-2 rounded-xl text-white font-[600]"> 
          <AiOutlinePlus />
          Submit Job
        </button>
      </div>
      <div         ref={filterRef}
 className={`fixed bg-[#f0f4f6] top-0 h-screen  duration-150 transition-all ${showFilter?"translate-x-0":"translate-x-[-700px]"}  w-[400px] `}>
<p>Filter</p>
      </div>
      <div className="bg-white py-[20px] rounded-xl">
     
      <div className="w-full   justify-between flex px-[30px] py-[20px] gap-[8px]">
      <div className="flex w-full justify-between">
            {/* Tab Navigation */}
            <div className="flex gap-6 px-6 py-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`text-lg font-semibold ${
                  activeTab === "all" ? "border-b-2 border-brand-500" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`text-lg font-semibold ${
                  activeTab === "ongoing" ? "border-b-2 border-brand-500" : ""
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`text-lg font-semibold ${
                  activeTab === "completed" ? "border-b-2 border-brand-500" : ""
                }`}
              >
                Completed
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[180px] outline-none bg-gray-200 border-none">
                  <SelectValue placeholder="Sort By (Default)" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="default">Sort By (Default)</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px] outline-none bg-gray-200 border-none">
                  <SelectValue placeholder="12 Per page" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="12">12 Per page</SelectItem>
                    <SelectItem value="24">24 Per page</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>
        <div className="flex pr-2">
          <div className="flex flex-col">
          <div className="p-6 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
{jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      </div>
      <div className="flex justify-center items-center"> 

      <div className="w-fit">

      <Pagination totalPages={20} />
      </div>
      </div>
          </div>
          <div
          ref={filterRef}
          className={`fixed top-0 h-screen w-[300px] rounded-xl bg-gray-100 p-6 transition-transform duration-300 sm:relative sm:translate-x-0 ${
            showFilter ? "translate-x-0 z-50" : "-translate-x-full"
          }`}
        >
          <p className="text-lg font-semibold mb-4">Filters</p>

          {/* Search Filter */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium">
              Search
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Search candidates..."
            />
          </div>

          {/* Experience Filter */}
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium">
              Experience
            </label>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full mt-1 bg-white">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full bg-white  mt-1">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>
       
      </div>
     
    
    </section>
  );
};

export default MyJob;
