import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BriefcaseBusiness, TimerIcon } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { usePostJob } from "@/hooks/business";
import { message } from "antd";
import Spinner from "@/components/loader/Spinner";

const JobPreview = () => {
  const [jobData, setJobData] = useState<any>({
    jobTitle: "",
    location: "",
    expirationDate: "",
    experience: "",
    qualification: "",
    careerLevel: "",
    jobDescription: "",
    keyResponsibilities: [],
    skillExperience: [],
    uploadedFiles: [],
    jobType: "",
    skills: [],
    responsibilities: [],
    external_url: "",
    job_email: "",
    aggreement: "I agree to the terms and conditions",
  });

  const navigate = useNavigate();
  const {
    mutate: createJob,
    isPending: isLoading,
    isError,
    isSuccess,
  } = usePostJob();

  // Fetch job data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("jobSubmission");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setJobData(parsedData);
      console.log("Job Data:", parsedData);
    }
  }, []);

  // Handle job creation
  const handleCreateJob = () => {
    if (!jobData.jobTitle || !jobData.location || !jobData.expirationDate) {
      message("Please ensure all required fields are filled.");
      return;
    }
    jobData.job_title = jobData.jobTitle;
    jobData.application_deadline = jobData.expirationDate;
    jobData.job_apply_type = jobData.jobApplyType;
    jobData.carrerExperience = jobData.careerLevel;
    jobData.aggreement = "I agree to the terms and conditions";

    jobData.career_level = jobData.careerLevel;
    jobData.description = jobData.jobDescription;

    // Submit the job data using the custom hook
    createJob(jobData, {

    });

    console.log(jobData);
  };

  return (
    <div className="mx-auto py-10 px-4">
      {/* Job Header */}
      <div className="bg-white border-b border rounded-lg p-6 mb-6">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{jobData.jobTitle}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex gap-2 ">
                <BriefcaseBusiness />
                {jobData.jobType || "Development"}
              </div>
              <span className="text-gray-500 flex gap-1">
                <MdLocationPin size={20} />
                {jobData.location || "Miami"}
              </span>
              <div className="text-gray-500 flex gap-1">
                <TimerIcon />
                {jobData.expirationDate || "April 23, 2021"}
              </div>
            </div>
            <span className="bg-brand-100 w-fit text-brand-600 px-3 py-1 rounded-full">
              {jobData.jobType || "Internship"}
            </span>
          </div>
          <div className="md:text-right text-start md:w-fit w-full">
            <p className="text-red-500 font-semibold">
              Application ends:{" "}
              <span className="text-black">{jobData.expirationDate || ""}</span>
            </p>
            <div className="flex justify-end gap-2 py-[20px]">
              <button
                onClick={() => navigate("/employer/job/edit")}
                className="bg-brand-500 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleCreateJob}
                className={`bg-blue-500 flex justify-center items-center gap-[8px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid border rounded-lg grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 mb-6">
              {jobData.jobDescription ||
                "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product, and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients."}
            </p>
            <h3 className="text-lg font-semibold mb-4">Key Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {jobData.keyResponsibilities.length > 0 ? (
                jobData.keyResponsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))
              ) : (
                <li>No responsibilities listed</li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Skill & Experience</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {jobData.skillExperience.length > 0 ? (
                jobData.skillExperience.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No skills listed</li>
              )}
            </ul>
          </div>
          <div className="mt-4 bg-white p-4 grid-cols-1 md:grid-cols-2 grid rounded-xl   gap-[10px]">
            <p className="font-bold md:col-span-2  text-[20px]">
              Additional Documents
            </p>
            {jobData.uploadedFiles.map((file, index) => (
              <div
                key={file.id}
                className="flex font-poppins relative border rounded-[5px] items-center justify-between  border-b"
              >
                <div className="flex items-center p-2">
                  <span className="text-sm w-full overflow-hidden text-ellipsis text-[#0F0F0F]">
                    {file.name}
                  </span>
                </div>

                <div className="absolute bottom-0 bg-[#4C95EB] rounded-[10px] w-[calc(100%-20px)] h-[4px]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Overview */}
        <div className="bg-white rounded-lg  h-full max-h-fit p-6">
          <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Date Posted:</span>{" "}
              {jobData.expirationDate || ""}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {jobData.location || ""}
            </p>
            <p>
              <span className="font-semibold">Expiration Date:</span>{" "}
              {jobData.expirationDate || ""}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {jobData.experience || ""}
            </p>
            <p>
              <span className="font-semibold">Qualification:</span>{" "}
              {jobData.qualification || ""}
            </p>
            <p>
              <span className="font-semibold">Career Level:</span>{" "}
              {jobData.careerLevel || ""}
            </p>
          </div>

          {/* Job Location Map */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Job Location</h3>
            <div className="h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={[25.7617, -80.1918]} // Miami coordinates
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[25.7617, -80.1918]} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
