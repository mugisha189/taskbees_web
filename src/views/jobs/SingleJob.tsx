import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BriefcaseBusiness, TimerIcon } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useApplyForJob, useGetJobById } from "@/hooks/job";
import { formatDateReadable, formatOptionValue } from "@/utils/formatter";
import Spinner from "@/components/loader/Spinner";

const JobDetail = () => {
  const id = useParams().id;
  console.log(id);
  const { data: job, isLoading, error } = useGetJobById(id);
  const { mutate: applyForJob, isPending: applicationPending } = useApplyForJob(
    job?.id
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleApplyForJob = async () => {
    await applyForJob({ jobId: job?.id });
  };

  console.log(job);

  return (
    <div className=" mx-auto w-full py-10 px-4">
      {/* Job Header */}
      <div className="bg-white w-full border-b border rounded-lg p-6 mb-6">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{job?.job_title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex capitalize gap-2 ">
                <BriefcaseBusiness />
                {job?.category.toLowerCase().replace("_", " ")}
              </div>
              <span className="text-gray-500 flex gap-1">
                <MdLocationPin size={20} />
                {job?.location}
              </span>
              <div className="text-gray-500 flex gap-1">
                <TimerIcon />
                April 23, 2021
              </div>
            </div>
            <span className=" bg-brand-100 w-fit text-brand-600 px-3 py-1 rounded-full">
              Internaship
            </span>
          </div>
          <div className="md:text-right text-start md:w-fit w-full">
            <p className="text-red-500 font-semibold">
              Application ends:{" "}
              <span className="text-black">
                {job &&
                  job.application_deadline &&
                  formatDateReadable(job.application_deadline)}
              </span>
            </p>
            {job?.has_applied}
            {!job?.has_applied && (
              <button
                onClick={handleApplyForJob}
                disabled={applicationPending}
                className="bg-yellow-400 md:w-fit w-full transition-all duration-100 hover:scale-[1.02] text-white font-semibold px-6 py-2 mt-2 rounded-lg hover:bg-yellow-500"
              >
                {applicationPending ? (
                  <div className="w-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Apply Now"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid border rounded-lg grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 mb-6">{job?.description}</p>
            <h3 className="text-lg font-semibold mb-4">Key Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job?.responsibilities && job?.responsibilities.length > 0 ? (
                job?.responsibilities.map((responsibility, index) => (
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
              {job?.skills && job?.skills.length > 0 ? (
                job?.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <li>No skills listed</li>
              )}
            </ul>
          </div>
        </div>

        {/* Job Overview */}
        <div className="bg-white  rounded-lg  p-6">
          <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Date Posted:</span>{" "}
              {job && job.updatedAt && formatDateReadable(job.updatedAt)}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {job && job.location}
            </p>
            <p>
              <span className="font-semibold">Expiration Date:</span>
              {job &&
                job.application_deadline &&
                formatDateReadable(job.application_deadline)}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {job?.experience && formatOptionValue(job.experience)}
            </p>
            {/* <p>
              <span className="font-semibold">Qualification:</span> {job&&job.qualification}
            </p> */}
            <p>
              <span className="font-semibold">Job Type:</span> {job && job.type}
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

export default JobDetail;
