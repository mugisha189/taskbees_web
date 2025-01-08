import {
  acceptCandidateApplication,
  applyForJob,
  approveForWork,
  createInterview,
  deleteJob,
  getAppliedJobs,
  getBusinessJobs,
  getJobApplicants,
  getJobById,
  getJobs,
  getJobsByStatus,
  inviteCandidateToInterview,
  publishJob,
  rejectCandidateApplication,
  signAgreement,
} from "@/api/job";
import { InterviewRequestPayload, SignAgreementPayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetJobs = (page: string, limit: string) => {
  return useQuery({
    queryKey: ["jobs", page, limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getJobs(page, limit);
    },
  });
};

export const useGetJobById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getJobById(id);
    },
  });
};

export const useGetBusinessJobs = (page: string, limit: string) => {
  return useQuery({
    queryKey: ["business-jobs", page, limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getBusinessJobs(page, limit);
    },
  });
};

export const usePublishJob = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["publishJob", id],

    mutationFn: (id: string | undefined) => publishJob(id),
    onSuccess: () => {
      toast.success("Job published successfully!");
      navigate("/employer/jobs");
      queryClient.invalidateQueries({ queryKey: ["business-jobs", "1", "12"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Error posting job");
      console.error(
        "Error posting job:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useGetAppliedJobs = (page: string, limit: string) => {
  return useQuery({
    queryKey: ["applied-jobs", page, limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getAppliedJobs(page, limit);
    },
  });
};

export const useDeleteJob = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteJob", id],

    mutationFn: (id: string | undefined) => deleteJob(id),
    onSuccess: () => {
      toast.success("Job deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs", "1", "12"] });
      queryClient.invalidateQueries({ queryKey: ["business-jobs", "1", "12"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error Deleting job");
      console.error(
        "Error deleting job:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useGetJobsByStatus = (
  status: string,
  page: string,
  limit: string
) => {
  return useQuery({
    queryKey: ["jobs", status, page, limit],
    queryFn: ({ queryKey }) => {
      const [, status, page, limit] = queryKey;
      return getJobsByStatus(status, page, limit);
    },
  });
};

export const useGetAppliedJobByStatus = (page: string, limit: string) => {
  return useQuery({
    queryKey: ["appliedJobs", page, limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getAppliedJobs(page, limit);
    },
  });
};
export const useGetJobApplicants = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ["jobApplicants", jobId],
    queryFn: ({ queryKey }) => {
      const [, jobId] = queryKey;
      return getJobApplicants(jobId);
    },
  });
};

export const useAcceptCandidateApplication = (
  jobId: string | undefined,
  candidateId: string | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["acceptCandidateApplication", jobId, candidateId],

    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string | undefined;
      candidateId: string | undefined;
    }) => acceptCandidateApplication(jobId, candidateId),
    onSuccess: () => {
      toast.success("Application accepted successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error accepting application");
      console.error(
        "Error accepting application:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useApproveForWork = (
  jobId: string | undefined,
  candidateId: string | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["approveForWork", jobId, candidateId],

    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string | undefined;
      candidateId: string | undefined;
    }) => approveForWork(jobId, candidateId),
    onSuccess: () => {
      toast.success("Candidate approved for work successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Error approving candidate application");
      console.error(
        "Error accepting application:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useRejectCandidateApplication = (
  jobId: string | undefined,
  candidateId: string | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rejectCandidateApplication", jobId, candidateId],

    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string | undefined;
      candidateId: string | undefined;
    }) => rejectCandidateApplication(jobId, candidateId),
    onSuccess: () => {
      toast.success("Application rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error rejecting application");
      console.error(
        "Error rejecting application:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useInviteCandidateToInterview = (
  jobId: string | undefined,
  candidateId: string | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["inviteCandidateToInterview", jobId, candidateId],

    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string | undefined;
      candidateId: string | undefined;
    }) => inviteCandidateToInterview(jobId, candidateId),
    onSuccess: () => {
      toast.success("Invitation sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error inviting to interview");
      console.error(
        "Error inviting to interview:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useApplyForJob = (jobId: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["applyForJob", jobId],

    mutationFn: ({ jobId }: { jobId: string | undefined }) =>
      applyForJob(jobId),
    onSuccess: () => {
      toast.success("Job applied successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs", "1", "12"] });
      queryClient.invalidateQueries({ queryKey: ["applied-jobs", "1", "12"] });
      navigate("/candidate/jobs/applied");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Error applying job");
      console.error(
        "Error applying job:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useCreateInterview = () => {
  return useMutation({
    mutationKey: ["createInterview"],
    mutationFn: (data: InterviewRequestPayload) => createInterview(data),
    onSuccess: () => {
      toast.success("Interview created successfully!");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error creating interview");
      console.error(
        "Error creating interview:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useSignAgreement = () => {
  return useMutation({
    mutationKey: ["signAgreement"],
    mutationFn: (data: SignAgreementPayload) => signAgreement(data),
    onSuccess: () => {
      toast.success("Agreement signed successfully!");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error signing agreement");
      console.error(
        "Error signing agreement:",
        error instanceof Error ? error.message : error
      );
    },
  });
};
