import React, { useState } from "react";
import { Table, Button, Select, Rate, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ApproveApplicantModal from "@/components/job/ApproveApplicantModal";
import DeclineApplicantModal from "@/components/job/DeclineApplicantModal";
import InviteToInterviewModal from "@/components/job/InviteToInterviewModal";
import { updateCandidate } from "@/api/candidate";
import {
  useAcceptCandidateApplication,
  useApproveForWork,
  useCreateInterview,
  useGetJobApplicants,
  useInviteCandidateToInterview,
  useRejectCandidateApplication,
} from "@/hooks/job";
import { InterviewRequestPayload } from "@/types/api";

const { Option } = Select;

const ApplicantTable = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState("Accounting Specialist");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showApproveToWorkModal, setShowApproveToWorkModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showInterViewModal, setShowInterViewModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [location, setLocation] = useState(null);
  const jobID = useParams().id;
  const { data: jobApplicants, isLoading, error } = useGetJobApplicants(jobID);
  const { mutate: acceptCandidate, isPending: isAcceptPending } =
    useAcceptCandidateApplication(jobID);
  const { mutate: rejectCandidate, isPending: isRejectPending } =
    useRejectCandidateApplication(jobID);
  const { mutate: approveForWork, isPending: isApprovePending } =
    useApproveForWork(jobID);
  const { mutate: inviteCandidate, isPending: isInvitePending } =
    useCreateInterview();

  console.log(jobApplicants);
  const [date, setDate] = useState(null);
  // State to store applicants

  // Handle accept modal
  const handleAcceptModal = (id) => {
    setSelectedCandidate(id);
  };

  // Handle submitting acceptance
  const handleAcceptSubmit = async (updatedCandidate) => {
    await acceptCandidate({ jobId: jobID, candidateId: updatedCandidate.id });
    setShowAcceptModal(false);
  };
  const handleAcceptStartWork = (updatedCandidate) => {
    approveForWork({ jobId: jobID, candidateId: updatedCandidate.id });
    setShowAcceptModal(false);
  };
  const handleInviteToInterview = async (data: InterviewRequestPayload) => {
    await inviteCandidate(data);
    setShowAcceptModal(false);
  };

  // Handle submitting rejection
  const handleDeclineSubmit = async (updatedCandidate) => {
    await rejectCandidate({ jobId: jobID, candidateId: updatedCandidate.id });
    setShowDeclineModal(false);
  };
  const handleAddInterview = (updateCandidate) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.key === updatedCandidate.key
          ? { ...applicant, isInvitedToInterview: true }
          : applicant
      )
    );
    setShowDeclineModal(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullnames",
      key: "fullnames",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.applicant_image}
            alt="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Performance (Ratings)",
      dataIndex: "performance",
      key: "performance",
      render: (rating) => (
        <Rate
          className="min-w-[230px] items-end text-center"
          disabled
          value={rating}
        />
      ),
    },
    {
      title: "Address",
      dataIndex: "location",
      key: "address",
      render: (location) => <span>{location != "None" ? location : "--"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="max-w-[450px]">
          <Button
            onClick={() => navigate(`/employer/view/${record.id}`)}
            type="primary"
            style={{ background: "black", border: "none" }}
          >
            View Applicant
          </Button>
          {record.status == "APPROVAL_WORK" && (
            <Button
              onClick={() =>
                navigate(`/employer/aggrement/${jobID}/to/${record.id}`)
              }
              type="primary"
            >
              Aggrement
            </Button>
          )}
          {record.status == "ONGOING" && (
            <Button
              onClick={() => {
                setSelectedCandidate(record);
                console.log(record);
                handleAcceptSubmit(record);
              }}
              type="primary"
            >
              Accept Application
            </Button>
          )}

          {record.status == "ACCEPTED" && (
            <Button
              onClick={() => {
                setSelectedCandidate(record);
                setShowInterViewModal(true);
              }}
              type="primary"
            >
              Invite To interview
            </Button>
          )}
          {(record.status == "ACCEPTED" || record.status == "SHORTLISTED") && (
            <Button
              onClick={() => {
                setSelectedCandidate(record);
                setShowAcceptModal(true);
              }}
              type="primary"
            >
              Approve for work
            </Button>
          )}
          {record.status == "ONGOING" && (
            <Button
              danger
              onClick={() => {
                setSelectedCandidate(record);
                console.log(record);
                setShowDeclineModal(true);
              }}
            >
              Reject Application
            </Button>
          )}
          {record.status == "APPROVAL_WORK" ||
            (record.status == "SHORTLISTED" && (
              <Button danger>Close Job</Button>
            ))}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{ padding: "16px", background: "white", borderRadius: "8px" }}
        className="mt-[20px]"
      >
        <h2 className="text-[20px] font-bold">All Applicants!</h2>

        {/* Dropdowns for job and status */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "16px",
            gap: "20px",
          }}
        >
          <Select
            value={selectedJob}
            onChange={(value) => setSelectedJob(value)}
            style={{ width: 200 }}
          >
            <Option value="Accounting Specialist">Accounting Specialist</Option>
            <Option value="Another Job">Another Job</Option>
          </Select>
          <Select
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            style={{ width: 200 }}
          >
            <Option value="All Status">All Status</Option>
            <Option value="Ongoing">Ongoing</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </div>
        <div className="flex w-full overflow-auto">
          {/* Table */}
          <Table
            loading={
              isLoading ||
              isAcceptPending ||
              isRejectPending ||
              isInvitePending ||
              isApprovePending
            }
            className="w-full"
            dataSource={jobApplicants ? jobApplicants.items : []}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      {/* Modals */}
      <ApproveApplicantModal
        handleCancel={() => {
          setShowAcceptModal(false);
        }}
        isModalOpen={showAcceptModal}
        handleSubmit={() => {
          handleAcceptStartWork(selectedCandidate);
        }}
        applicant={selectedCandidate}
        onClose={() => setShowAcceptModal(false)}
      />
      <DeclineApplicantModal
        handleCancel={() => {
          setShowDeclineModal(false);
        }}
        isModalOpen={showDeclineModal}
        handleSubmit={() => {
          handleDeclineSubmit(selectedCandidate);
        }}
        applicant={selectedCandidate}
        onClose={() => setShowDeclineModal(false)}
      />
      {selectedCandidate && (
        <InviteToInterviewModal
          loading={isInvitePending}
          applicant={selectedCandidate}
          isModalOpen={showInterViewModal}
          handleCancel={() => {
            setShowInterViewModal(false);
          }}
          handleSubmit={(data) => {
            console.log(data);
            handleInviteToInterview(data);
          }}
        />
      )}
    </>
  );
};

export default ApplicantTable;
