import { PROTECTED_API } from "@/api/axios";
import { getAllBusinesses, getBusinessById, getBusinessStatistics, postJobApi } from "@/api/business";
import { JobPostData } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export const usePostJob = () => {
  const navigate=useNavigate()
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postJob"],
    
    mutationFn: (data: JobPostData) => postJobApi(data),
    onSuccess: () => {
      toast.success("Job posted successfully");
      localStorage.removeItem("jobSubmission")
      queryClient.invalidateQueries({ queryKey: ["jobs", "1", "12"] });
      navigate("/employer/jobs")

      
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Error posting job")
      console.error(
        "Error posting job:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useUpdateEmployerProfile = () => {
  const updateEmployerProfile = async (userId: string, formData: FormData,) => {
    try {
      const response = await PROTECTED_API.patch(
        `/users/update-employer/${userId}`,
        formData,
        {
          headers: {
       
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating employer profile:', error);
      throw error;
    }
  };

  return { updateEmployerProfile };
};

export const useGetAllBusinesses = ({page,limit}:{page:string,limit:string}) => {
  return useQuery({
    queryKey: ["getAllBusinesses",page,limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getAllBusinesses(page, limit);
    },
   
  }
  )
}

  

export const useGetBusinessStatistics = () => {
  return useQuery({
    queryKey: ["getBusinessStatistics"],
    queryFn: () => {
      return getBusinessStatistics();
    },
  });
};
 

export const useGetBusinessById = (id:string|undefined) => {
  return useQuery({
    queryKey: ["getBusinessById",id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getBusinessById(id);
    },
  });
};

