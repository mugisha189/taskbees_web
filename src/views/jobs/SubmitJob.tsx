import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../admin/profile/components/CustomInput";
import FileUpload from "./FileUpload";
import Responsibilities from "./Responsibilities";
import Skill from "./Skill";
import { UploadedFile } from "@/types/upload";
import { useNavigate } from "react-router-dom";
import { Select } from "antd/";
import { Option } from "antd/es/mentions";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function SubmitJob() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // Yup validation schema
  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job title is required"),
    location: Yup.string().required("Location is required"),
    skills: Yup.array().required("Skills are required"),
    responsibilities: Yup.array().required("Responsibilities are required"),

    max_salary: Yup.number().min(
      Yup.ref("min_salary"),
      "Max salary must be greater than min salary"
    ),
    min_salary: Yup.number()
      .required("Min salary is required")
      .min(1, "Min salary must be greater than 0"),
    job_salary: Yup.string()
      .required("Job salary is required")
      .oneOf(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    expirationDate: Yup.date()
      .required("Expiration date is required")

      .min(new Date(), "Expiration date must be in the future"),
    job_type: Yup.string()
      .required("Job type is required")
      .oneOf([
        "INTERNSHIP",
        "FULL_TIME",
        "PART_TIME",
        "FREELANCE",
        "TEMPORARY",
        "INTERNSHIP",
        "HYBRID",
        "ANY",
      ]),
    category: Yup.string()
      .required("Category is required")
      .oneOf([
        "DEVELOPMENT",
        "FINANCE",
        "ACCOUNTING",
        "DESIGN",
        "HEALTH_AND_CARE",
        "HUMAN_RESOURCES",
        "MARKETING",
        "OPERATIONS",
        "SALES",
        "TRAVEL",
        "PROJECT_MANAGEMENT",
      ]),
    experience: Yup.string().required("Experience is required"),
    qualification: Yup.string()
      .required("Qualification is required")
      .oneOf([
        "CERTIFICATE",
        "ASSOCIATE_DEGREE",
        "BACHELORS_DEGREE",
        "MASTERS_DEGREE",
        "DOCTORATE_DEGREE",
      ]),
    careerLevel: Yup.string()
      .required("Career level is required")
      .oneOf(["MANAGER", "OFFICER", "STUDENT", "EXECUTIVE", "OTHERS"]),
    jobApplyType: Yup.string()
      .required("Job apply type is required")
      .oneOf(["EXTERNAL_URL", "INTERNAL", "BY_EMAIL", "CALL_TO_APPLY"]),
    //if job apply type is external then it is required
    external_url: Yup.string().url("External url must be a valid URL"),
    job_email: Yup.string().email("Job Email must be a valid email"),
    jobDescription: Yup.string()

      .required("Job description is required")
      .min(50, "Description must be at least 50 characters"),
  });
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      location: "",
      expirationDate: "",
      job_salary: "MONTHLY",
      category: "",
      experience: "",
      qualification: "",
      careerLevel: "",
      jobDescription: "",
      min_salary: 0,
      jobApplyType: "INTERNAL",
      external_url: "",
      job_email: "",
      job_tags: [],
      max_salary: 0,
      job_type: "INTERNSHIP",
      skills: [] as string[],
      responsibilities: [] as string[],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        // Convert files to base64
        const filesInBase64 = await Promise.all(
          files &&
            files.map(async (singleFile) => {
              return {
                name: singleFile.file.name,
                type: singleFile.file.type,
                size: singleFile.file.size,
                id: singleFile.id,
                content: await fileToBase64(singleFile.file),
              };
            })
        );
        values.skills = skills;
        values.responsibilities = responsibilities;

        const submissionData = {
          ...values,
          keyResponsibilities: responsibilities,
          job_email: user?.profile?.email,
          skillExperience: skills,
          uploadedFiles: filesInBase64,
        };

        console.log("Data stored in localStorage:", submissionData);
        localStorage.setItem("jobSubmission", JSON.stringify(submissionData));

        navigate("/employer/job/preview");
      } catch (error) {
        console.error("Error saving files:", error);
      }
    },
  });

  const fileToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="py-[20px] mt-[30px] flex flex-col gap-[20px] max-w-[1600px] bg-white w-full p-6 border !rounded-xl shadow-md"
    >
      <div className="flex flex-col">
        <p className="font-[600] text-[20px] mb-[20px]">Job Description</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Job Title */}
          <div className="mb-4">
            <label className="block font-medium">Job Title:</label>
            <CustomInput
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Finance Manager & Health"
            />
            {formik.touched.jobTitle && formik.errors.jobTitle && (
              <p className="text-red-500 text-sm">{formik.errors.jobTitle}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium">Location:</label>
            <CustomInput
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="New York"
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500 text-sm">{formik.errors.location}</p>
            )}
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block font-medium">Expiration Date:</label>
            <CustomInput
              type="date"
              name="expirationDate"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expirationDate && formik.errors.expirationDate && (
              <p className="text-red-500 text-sm">
                {formik.errors.expirationDate}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Min Salary:</label>
            <CustomInput
              type="number"
              name="min_salary"
              value={formik.values.min_salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.min_salary && formik.errors.min_salary && (
              <p className="text-red-500 text-sm">{formik.errors.min_salary}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Max Salary:</label>
            <CustomInput
              type="number"
              name="max_salary"
              value={formik.values.max_salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.max_salary && formik.errors.max_salary && (
              <p className="text-red-500 text-sm">{formik.errors.max_salary}</p>
            )}
          </div>

          {/* Experience */}

          {/* Qualification */}
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Qualification
            </label>
            <Select
              value={formik.values.qualification}
              onChange={(value) => formik.setFieldValue("qualification", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="CERTIFICATE">Certificate</Option>
              <Option value="ASSOCIATE_DEGREE">Associate Degree</Option>
              <Option value="BACHELORS_DEGREE">Bachelor Degree</Option>
              <Option value="MASTERS_DEGREE">Master Degree</Option>
              <Option value="DOCTORATE_DEGREE">Doctorate Degree</Option>
            </Select>
          </div>

          {/* Career Level */}
          <div>
            <label className="block font-medium mb-2">Career Level:</label>
            <Select
              value={formik.values.careerLevel}
              onChange={(value) => formik.setFieldValue("careerLevel", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="MANAGER">Manager</Option>
              <Option value="OFFICER">Officer</Option>
              <Option value="STUDENT">Student</Option>
              <Option value="EXECUTIVE">Executive</Option>
              <Option value="OTHERS">Others</Option>
            </Select>
            {formik.errors.careerLevel && (
              <p className="text-red-500 text-sm">
                {formik.errors.careerLevel}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Job Apply Type:</label>
            <Select
              value={formik.values.jobApplyType}
              onChange={(value) => formik.setFieldValue("jobApplyType", value)}
              onBlur={formik.handleBlur}
              disabled
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              {/* <Option value="EXTERNAL_URL">External Url</Option> */}
              <Option value="INTERNAL" >Internal Application</Option>
              {/* <Option value="BY_EMAIL">By Email</Option>
              <Option value="CALL_TO_APPLY">Call To Apply</Option>
              <Option value="OTHER">Other</Option> */}
            </Select>
            {formik.errors.jobApplyType && (
              <p className="text-red-500 text-sm">
                {formik.errors.jobApplyType}
              </p>
            )}
          </div>
          {formik.values.jobApplyType == "EXTERNAL_URL" && (
            <div>
              <label className="block font-medium mb-2">External Url:</label>
              <CustomInput
                type="url"
                name="external_url"
                value={formik.values.external_url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.external_url && formik.errors.external_url && (
                <p className="text-red-500 text-sm">
                  {formik.errors.external_url}
                </p>
              )}
            </div>
          )}
          {formik.values.jobApplyType == "BY_EMAIL" && (
            <div>
              <label className="block font-medium mb-2">
                Application Email:
              </label>

              <CustomInput
                type="email"
                name="job_email"
                value={formik.values.job_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.job_email && formik.errors.job_email && (
                <p className="text-red-500 text-sm">
                  {formik.errors.job_email}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block font-medium mb-2">Job Salary Type:</label>
            <Select
              value={formik.values.job_salary}
              onChange={(value) => formik.setFieldValue("job_salary", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="HOURLY">Hourly</Option>
              <Option value="DAILY">Daily</Option>
              <Option value="WEEKLY">Weekly</Option>
              <Option value="MONTHLY">Monthly</Option>
              <Option value="YEARLY">Yearly</Option>
            </Select>
            {formik.errors.jobApplyType && (
              <p className="text-red-500 text-sm">
                {formik.errors.jobApplyType}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Experience:</label>

            <Select
              value={formik.values.experience}
              onChange={(value) => formik.setFieldValue("experience", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="FRESH">Less than 1 year</Option>
              <Option value="TWO_YEARS">2 Years</Option>
              <Option value="THREE_YEARS">3 Years</Option>
              <Option value="FOUR_YEARS">4 Years</Option>
              <Option value="FIVE_YEARS_PLUS">5 Years+</Option>
              <Option value="TEN_YEARS_PLUS">10 Years+</Option>
            </Select>
            {formik.errors.experience && (
              <p className="text-red-500 text-sm">{formik.errors.experience}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Category:</label>

            <Select
              value={formik.values.category}
              onChange={(value) => formik.setFieldValue("category", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="DEVELOPMENT">Development</Option>
              <Option value="FINANCE">Finance</Option>
              <Option value="ACCOUNTING">Accounting</Option>
              <Option value="DESIGN">Design</Option>
              <Option value="HEALTH_AND_CARE">Health and Care</Option>
              <Option value="HUMAN_RESOURCES">Human Resources</Option>
              <Option value="MARKETING">Marketing</Option>
              <Option value="OPERATIONS">Operations</Option>
              <Option value="SALES">Sales</Option>
              <Option value="TRAVEL">Travel</Option>
              <Option value="PROJECT_MANAGEMENT">Project Management</Option>
            </Select>
            {formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Job Type:</label>

            <Select
              value={formik.values.job_type}
              onChange={(value) => formik.setFieldValue("job_type", value)}
              onBlur={formik.handleBlur}
              className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <Option value="INTERNSHIP">Internaship</Option>
              <Option value="FULL_TIME">Full Time</Option>
              <Option value="PART_TIME">Part Time</Option>
              <Option value="FREELANCE">Freelance</Option>
              <Option value="TEMPORARY">Temporary</Option>
              <Option value="INTERNSHIP">Internship</Option>
              <Option value="HYBRID">Hybrid</Option>
              <Option value="ANY">Any</Option>
            </Select>
            {formik.errors.job_type && (
              <p className="text-red-500 text-sm">{formik.errors.job_type}</p>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4 col-span-3">
          <label className="block font-medium">Job Description:</label>
          <textarea
            name="jobDescription"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Job Description..."
            rows={4}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <p className="text-red-500 text-sm">
              {formik.errors.jobDescription}
            </p>
          )}
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
        className="bg-blue-600 max-w-fit text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Job
      </button>
    </form>
  );
}

export default SubmitJob;
