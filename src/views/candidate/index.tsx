

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../jobs/Pagination";
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import candidates from "@/variables/candidates";
import CandidateCard from "@/components/candidates/CandidateCard";

const CandidateList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "shortlisted">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shortlistedCandidates = candidates.filter(candidate => candidate.shortlisted);

  // Apply search filter
  const filteredBySearch = (candidate: any) => {
    return candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Apply experience filter
  const filteredByExperience = (candidate: any) => {
    return experienceFilter ? candidate.experience === experienceFilter : true;
  };

  // Apply location filter
  const filteredByLocation = (candidate: any) => {
    return locationFilter ? candidate.location === locationFilter : true;
  };

  // Conditional rendering based on the active tab
  const filteredCandidates =
    activeTab === "all" ? candidates : shortlistedCandidates;

  const finalFilteredCandidates = candidates

  return (
    <section className="flex flex-col gap-5">
      {/* Filter Button */}

      {/* Main Content */}
      <div className="bg-white mt-[20px] py-5 rounded-xl">
        {/* Header with Filter Button and Sorting */}
        <div className="w-full flex justify-between  px-6 py-3 gap-4">
          {/* Toggle Filter Sidebar on Mobile */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-brand-50 flex items-center gap-2 text-brand-400 px-4 py-2 rounded-md sm:hidden"
          >
            <Filter />
            Filters
          </button>

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
                onClick={() => setActiveTab("shortlisted")}
                className={`text-lg font-semibold ${
                  activeTab === "shortlisted" ? "border-b-2 border-brand-500" : ""
                }`}
              >
                Shortlisted
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
        <div className="flex gap-2 flex-row-reverse pr-[20px]">
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

        {/* Candidate Cards */}
        <div className="flex flex-1 flex-col w-full">
          <div className="p-6 grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalFilteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="flex w-fit justify-center items-center">
              <Pagination totalPages={20} />
            </div>
          </div>
        </div>
       </div>
        {/* Filters Sidebar */}
        
      </div>
    </section>
  );
};

export default CandidateList;
