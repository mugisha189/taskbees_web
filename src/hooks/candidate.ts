import {
  getCandidateById,
  getCandidateStatistics,
  updateCandidate,
  updateCandidateAdditionalInfo,
} from "@/api/candidate";
import { RootState } from "@/store/store";
import { UpdateCandidateData } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateCandidateData) => updateCandidate(data),
    onSuccess: (data) => {
      toast.success(
        data.message ? data.message : "Profile updated successfully"
      );
    },
    onError: (error) => {
      toast.error(error.message ? error.message : "Error updating profile");
      console.error("Error:", error);
    },
  });
};

export const useUpdateAdditionalInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationKey: ["updated-additional-info"],
    mutationFn: (data: Partial<UpdateCandidateData>) =>
      updateCandidateAdditionalInfo({
        candidateId: user?.profile?.id ? user.profile.id : "",
        ...data,
      }),
    onSuccess: (data) => {
      toast.success(
        data.message ? data.message : "Profile updated successfully"
      );
    },
    onError: (error) => {
      toast.error(error.message ? error.message : "Error updating profile");
      console.error("Error:", error);
    },
  });
};

export const useGetCandidateStatistics = () => {
  return useQuery({
    queryKey: ["candidateStatistics"],
    queryFn: () => {
      return getCandidateStatistics();
    },
  });
};

export const useGetCandidateById = (candidateId: string | undefined) => {
  return useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: ({ queryKey }) => {
      const [, candidateId] = queryKey;
      return getCandidateById(candidateId);
    },
  });
};
