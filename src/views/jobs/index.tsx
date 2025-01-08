/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./Pagination";
import { BriefcaseBusiness, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import JobCard from "@/components/job/JobCard";
import Spinner from "@/components/loader/Spinner";
import { useGetJobs } from "@/hooks/job";
import JobListSkeleton from "@/skeleton/JobSKeleton";

const JobList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sorting, setSorting] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const filterRef = useRef(null);

  const {
    data: jobs,
    isLoading,
    isFetching,
  } = useGetJobs(currentPage.toString(), itemsPerPage.toString());

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isFirstLoad) {
      console.log("Data updated due to page size or sorting changes.");
    } else {
      console.log("First time load.");
    }
    if (!isLoading) {
      setIsFirstLoad(false);
    }
  }, [currentPage, itemsPerPage]);

  if (isLoading && isFirstLoad) {
    return <JobListSkeleton />;
  }

  return (
    <section className="flex flex-col w-full max-w-[1600px] gap-[20px] py-[80px]">
      {/* Header Section */}
      <div className="md:py-[40px] rounded-xl w-full flex gap-[20px] flex-col items-center justify-center">
        <p className="md:text-[50px] md:text-start text-center text-[35px] font-[600]">
          There Are <span className="text-brand-400">{jobs?.totalItems}</span>{" "}
          Postings Here For you!
        </p>
        <p>Find Jobs, Employment & Career Opportunities</p>
        <div className="bg-white md:flex hidden border px-[30px] gap-[10px] rounded-[8px] shadow-sm justify-center items-center w-full xl:max-w-[1600px] h-[100px]">
          <div className="flex-1 border-r-[1px] border-gray-400 flex items-center">
            <SearchIcon className="text-gray-400" />
            <input
              placeholder="Job Titles, keywords, ..."
              className="bg-transparent w-full h-[100%] px-[16px] py-[8px] rounded-[8px] focus:outline-none"
            />
          </div>
          <div className="flex-1 border-r-[1px] border-gray-400 flex items-center">
            <SlLocationPin className="text-gray-400 text-[25px]" />
            <input
              placeholder="Location"
              className="bg-transparent w-full h-[100%] px-[16px] py-[8px] rounded-[8px] focus:outline-none"
            />
          </div>
          <div className="flex-1 border-gray-400 flex items-center">
            <BriefcaseBusiness className="text-gray-400 text-[20px]" />
            <input
              placeholder="Job Category"
              className="bg-transparent w-full h-[100%] px-[16px] py-[8px] rounded-[8px] focus:outline-none"
            />
          </div>
          <button className="bg-brand-400 h-[50px] px-[30px] rounded-md text-white">
            Find Jobs
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="bg-white py-[20px] rounded-xl">
        <div className="flex w-full md:flex-row flex-col gap-[20px] justify-between">
          {/* Tab Navigation */}
          <div className="flex md:w-fit w-full gap-6 px-6 py-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`text-lg md:w-fit w-full font-semibold ${
                activeTab === "all" ? "border-b-2 border-brand-500" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`text-lg md:w-fit w-full font-semibold ${
                activeTab === "ongoing" ? "border-b-2 border-brand-500" : ""
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`text-lg md:w-fit w-full font-semibold ${
                activeTab === "completed" ? "border-b-2 border-brand-500" : ""
              }`}
            >
              Completed
            </button>
          </div>

          {/* Sorting and Items Per Page */}
          <div className="flex px-3 items-center gap-4">
            <Select onValueChange={(value) => setSorting(value)}>
              <SelectTrigger className="md:w-[180px] w-full outline-none bg-gray-200 border-none">
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

            <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="md:w-[180px] w-full outline-none bg-gray-200 border-none">
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

        {/* Jobs Grid */}
        <div className="md:p-6 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs?.items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center">
          <div className="w-fit">
            {jobs?.totalPages > 1 && (
              <Pagination
                totalPages={jobs?.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobList;
