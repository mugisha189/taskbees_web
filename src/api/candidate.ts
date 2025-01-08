
import { AxiosError } from 'axios';
import { PROTECTED_API } from './axios';
import { CandidateStatistics, UpdateCandidateData, User } from '@/types/api';



export const updateCandidate = async (
  data: UpdateCandidateData,
  
) => {
  const formData = new FormData();

  formData.append('gender', data.gender);
  formData.append('experience_time', data.experience_time);
  formData.append('date_of_birth', data.date_of_birth);
  formData.append('salary', data.salary?data.salary.toString():"0");
  formData.append('video_url', data.video_url);
  formData.append('salary_type', data.salary_type);
  formData.append('qualification', data.qualification);
  formData.append('profile_show', data.profile_show);
  formData.append('location', data.location);
  formData.append('job_title', data.job_title);
  formData.append('social_networks', data.social_networks);
  formData.append('phoneNumber', data.phoneNumber);
  formData.append('fullnames', data.fullnames);
  formData.append('languages', data.languages);
  formData.append('profile_photo', data.profile_photo); 
  formData.append('categories', data.categories);
  formData.append('email', data.email);
  formData.append('description', data.description);
  // formData.append("latitude", data.latitude);
  // formData.append("longitude", data.longitude);
  // Get age from date of birth
  formData.append('age', (new Date().getFullYear() - new Date(data.date_of_birth).getFullYear()).toString());
  // formData.append('age', data.age.toString());

  try {
    const response = await PROTECTED_API.patch(
      `/users/update-candidate/${data.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate:', error);
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Update candidate failed");
  }
};

export const updateCandidateAdditionalInfo = async ({
  candidateId,
  awards,
  education,
  experience,
  additional_info,
  resume,
  portifolio
}: {
  candidateId: string,
  awards?: object,
  education?: object,
  experience?: object,
  additional_info?: object,
  resume?: File,
  portifolio?: File[]
}
  
) => {
  const formData = new FormData();
  awards&&formData.append('awards', JSON.stringify(awards));
  education&&formData.append('education', JSON.stringify(education));
  experience&&formData.append('experience', JSON.stringify(experience));
  additional_info&&formData.append('additional_info', JSON.stringify(additional_info));
  resume && formData.append('resume', resume);
 portifolio&& portifolio.forEach((file) => {
    formData.append('portfolio', file);
  });

  try {
    const response = await PROTECTED_API.patch(
      `/users/update-candidate/additional/${candidateId}`,
      formData,
      {
        headers: {
       
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
       throw new Error(error.response?.data.message)
    }
    console.error('Error updating candidate additional info:', error);
    throw error;
  }
};


export const getCandidateStatistics = async ():Promise<CandidateStatistics> => {
  try {
    const response = await PROTECTED_API.get(`/users/user/statistics`, {
     
    });
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
       throw new Error(error.response?.data.message)
    }
    console.error('Error updating candidate additional info:', error);
    throw error;
  }
};




export const getCandidateById = async (candidateId: string|undefined):Promise<User> => {
  try {
    const response = await PROTECTED_API.get(`/jobs/job/applicant/${candidateId}`, {
      
    });
    return response.data.payload.candidate;
  } catch (error) {
    if(error instanceof AxiosError){
       throw new Error(error.response?.data.message)
    }
    console.error('Error getting candidate by id:', error);
    throw error;
  }
};