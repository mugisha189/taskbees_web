import { InterviewRequestPayload, Job, JobApplicantPayload, JobPayload } from "@/types/api";
import { PROTECTED_API } from "./axios";
import { AxiosError } from "axios";

export const getJobs = async (page: string, limit: string):Promise<JobPayload> => {
  try {
    const response = await PROTECTED_API.get(`/jobs/jobs`, {
      params: { page, limit },
    
    });
    return response.data.payload;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};  


export const getJobById = async (id:string|undefined):Promise<Job> => {
  try {
    const response = await PROTECTED_API.get(`/jobs/jobs/${id}`);
    return response.data.payload.job;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getBusinessJobs = async (page: string, limit: string): Promise<JobPayload> => {
  try {
    const response = await PROTECTED_API.get(`/business/business/jobs`, {
      params: { page, limit },
    });
    return response.data.payload;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export const publishJob = async (id:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/business/job/publish/${id}`);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export const getAppliedJobs = async (page: string, limit: string):Promise<JobPayload> => {
  try {
    const response = await PROTECTED_API.get(`/users/applied/jobs`, {
      params: { page, limit },
     
    });
    return response.data.payload;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};






export const deleteJob = async (id: string | undefined) => {
  try { 
    const response = await PROTECTED_API.delete(`/jobs/job/delete/${id}`);
    return response.data.payload;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};


export const getJobsByStatus = async (status:string,page: string, limit: string) => {
  try {
    const response = await PROTECTED_API.get(`/business/business/jobs/view/`, {
      params: {
        job_status: status 
        ,page 
        ,limit
      },
    });
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error fetching jobs:', error);
    throw error;
  }
};


export const getJobApplicants = async (jobId:string|undefined):Promise<JobApplicantPayload> => {
  try {
    const response = await PROTECTED_API.get(`/jobs/job/applicants/${jobId}`);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error fetching applicants:', error);
    throw error;
  }
};



export const acceptCandidateApplication = async (jobId:string|undefined,candidateId:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/business/business/applications/accept`, {
      applicantId: candidateId,
      jobId: jobId,
    });
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Accepting jobs:', error);
    throw error;
  }
};

export const rejectCandidateApplication = async (jobId:string|undefined,candidateId:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/business/business/applications/reject`, {
      applicantId: candidateId,
      jobId: jobId,
    });
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Rejecting jobs:', error);
    throw error;
  }
};

export const inviteCandidateToInterview = async (jobId:string|undefined,candidateId:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/business/business/interview`, {
      applicantId: candidateId,
      jobId: jobId,
    });
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Inviting jobs:', error);
    throw error;
  }
};

export const approveForWork = async (jobId:string|undefined,candidateId:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/business/business/applications/approve`, {
      applicantId: candidateId,
      jobId: jobId,
    });
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Inviting jobs:', error);
    throw error;
  }
};

export const applyForJob = async (jobId:string|undefined) => {
  try {
    const response = await PROTECTED_API.patch(`/jobs/job/apply/${jobId}`);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Applying jobs:', error);
    throw error;
  }
};




export const createInterview=async(data:InterviewRequestPayload)=>{
  try {
    
    await PROTECTED_API.patch(`/business/business/applications/interview`, {
      applicantId: data.applicantId,
      jobId: data.jobId,
    });
  console.log(data)
   const interviewResponse= await PROTECTED_API.post(`/business/interview`, {
     
      start_date: data.startDate.split("T")[0],
      
      event_time: data.event_time,
      start_time: data.startDate.split("T")[1],
      duration: data.duration,
      location: data.location,
      // url: data.url,
   });
    const interviewId=interviewResponse.data.payload.interview.id
    const response=await PROTECTED_API.post(`/business/sync/interviews/${interviewId}`,{userIds:[data.applicantId]});
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error Applying jobs:', error);
    throw error;
  }
};