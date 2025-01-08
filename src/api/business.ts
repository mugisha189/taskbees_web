import { AxiosError } from "axios";
import { PROTECTED_API } from "./axios";
import {
  Business,
  BusinessPayload,
  BusinessStatistics,
  JobPostData,
} from "@/types/api";

// API Function
export const postJobApi = async (data: JobPostData): Promise<any> => {
  try {
    console.log(data);
    const formData = new FormData();
    data.uploadedFiles &&
      data.uploadedFiles.forEach((photo) => {
        formData.append("photos", photo);
      });

    // data.featured_image&&formData.append("featured_image", data.featured_image?data.featured_image:"");
    formData.append("career_level", data.career_level);
    formData.append(
      "max_salary",
      data.max_salary ? data.max_salary.toString() : "-"
    );
    formData.append("application_deadline", data.application_deadline);
    formData.append("experience", data.experience);
    formData.append("job_salary", data.job_salary);
    formData.append("job_apply_type", data.job_apply_type);
    formData.append("qualification", data.qualification);
    formData.append("location", data.location);
    formData.append("job_title", data.job_title);
    formData.append(
      "min_salary",
      data.min_salary ? data.min_salary.toString() : "0"
    );
    //   data.job_tag&&formData.append("job_tag", data.job_tag?data.job_tag.join(","):"");
    //   data.job_email&&formData.append("job_email", data.job_email?data.job_email:"");
    //  data.external_url&& formData.append("external_url", data.external_url?data.external_url:"");
    //   data.intro_url&& formData.append("intro_url", data.intro_url?data.intro_url:"");
    formData.append("job_type", data.job_type ? data.job_type : "");
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("skills", data.skills && data.skills.join(","));
    formData.append(
      "responsibilities",
      data.responsibilities && data.responsibilities.join(",")
    );

    // Make the Axios request
    const response = await PROTECTED_API.post(`/jobs/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Job posting failed"
        : error
    );
  }
};

export const getAllBusinesses = async (
  page: string,
  limit: string
): Promise<BusinessPayload> => {
  try {
    const response = await PROTECTED_API.get(`/business/businesses/all`, {
      params: { page, limit },
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getBusinessById = async (
  id: string | undefined
): Promise<Business> => {
  try {
    const response = await PROTECTED_API.get(`/business/businesses/${id}`);
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getBusinessStatistics = async (): Promise<
  BusinessStatistics["payload"]
> => {
  try {
    const response = await PROTECTED_API.get(`/business/company/statistics`);
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
