

import { useState, useEffect } from "react";
import CustomInput from "../admin/profile/components/CustomInput";
import FileUpload from "./FileUpload";
import Responsibilities from "./Responsibilities";
import Skill from "./Skill";
import { UploadedFile } from "@/types/upload";
import { base64ToFile } from "@/utils/formatter";
import { useNavigate } from "react-router-dom";

function EditJob() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    expirationDate: "",
    experience: "",
    qualification: "",
    careerLevel: "",
    jobDescription: "",
    keyResponsibilities: [""],
    skillExperience: [""],
    document: null,
  });
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("jobSubmission");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setFormData({
        jobTitle: parsedData.jobTitle || "",
        location: parsedData.location || "",
        expirationDate: parsedData.expirationDate || "",
        experience: parsedData.experience || "",
        qualification: parsedData.qualification || "",
        careerLevel: parsedData.careerLevel || "",
        jobDescription: parsedData.jobDescription || "",
        keyResponsibilities: parsedData.keyResponsibilities || [""],
        skillExperience: parsedData.skillExperience || [""],
        document: null, 
      });

      setResponsibilities(parsedData.keyResponsibilities || [""]);

      setSkills(parsedData.skillExperience || [""]);

      setFiles(parsedData.uploadedFiles.map((singleFile) => ({
        file: base64ToFile(singleFile.content, singleFile.name),
        id: singleFile.id,
      })));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filesInBase64 = await Promise.all(
        files.map(async (singleFile) => {
          return {
            name: singleFile.file.name,
            type: singleFile.file.type,
            size: singleFile.file.size,
            content: await fileToBase64(singleFile.file),
          };
        })
      );

      const updatedData = {
        ...formData,
        keyResponsibilities: responsibilities,
        skillExperience: skills,
        uploadedFiles: filesInBase64,
      };

      localStorage.setItem("jobSubmission", JSON.stringify(updatedData));
      console.log("Updated Data stored in localStorage:", updatedData);
      
      alert("Job Updated Successfully!");
      navigate("/employer/job/preview")
    } catch (error) {
      console.error("Error saving files:", error);
      alert("Failed to update job.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-[20px] mt-[30px] flex flex-col gap-[20px] max-w-[1600px] bg-white w-full p-6 border !rounded-xl shadow-md "
    >
      <div className="flex flex-col">
        <p className="font-[600] text-[20px] mb-[20px]">Edit Job</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="mb-4">
            <label className="block font-medium">Job Title:</label>
            <CustomInput
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Finance Manager & Health"
            />
          </div>
          <div>
            <label className="block font-medium">Location:</label>
            <CustomInput
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block font-medium">Expiration Date:</label>
            <CustomInput
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Experience:</label>
            <CustomInput
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="2 Years"
            />
          </div>
          <div>
            <label className="block font-medium">Qualification:</label>
            <CustomInput
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Associate Degree"
            />
          </div>
          <div>
            <label className="block font-medium">Career Level:</label>
            <CustomInput
              name="careerLevel"
              value={formData.careerLevel}
              onChange={handleChange}
              placeholder="Executive"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4 col-span-3">
          <label className="block font-medium">Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Enter Job Description..."
            rows={4}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
      </div>

      {/* Responsibilities and Skills */}
      <Responsibilities
        savedResponsibilitys={responsibilities}
        setSavedResponsibilities={setResponsibilities}
      />
      <Skill savedSkills={skills} setSavedSkills={setSkills} />

      {/* File Upload */}
      <p className="font-[600] text-[20px]">Additional Documents</p>
      <FileUpload files={files} setFiles={setFiles} />

      {/* Submit Button */}
      <button
        
        type="submit"
        className="bg-brand-400 max-w-fit text-white px-4 py-2 rounded hover:bg-brand-600"
      >
        Save
      </button>
    </form>
  );
}

export default EditJob;
