

import { useState, useEffect } from "react";
import { Table, DatePicker } from "antd";
import { useGetAppliedJobByStatus } from "@/hooks/job";
import { formatDateReadable } from "@/utils/formatter";

const { RangePicker } = DatePicker;

const AppliedJob = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [status, setStatus] = useState("ACTIVE");
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(12); 

  
  const { data: jobs, isLoading, error } = useGetAppliedJobByStatus(currentPage, pageSize);

  useEffect(() => {
   
  }, [status]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
    switch (key) {
      case "applied":
        setStatus("APPLIED");
        break;
      case "accepted":
        setStatus("ACCEPTED");
        break;
      case "rejected":
        setStatus("REJECTED");
        break;
      default:
        setStatus("APPLIED");
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); 
    setPageSize(pagination.pageSize); 
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="w-[60px] h-[60px]"
            src={record.featured_image?record.featured_image:"https://taskbee-fe.vercel.app/images/resource/company-logo/1-2.png"}
            alt="job icon"
            style={{ marginRight: 8 }}
          />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 12, color: "gray" }}>{record.location}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Applications",
      dataIndex: "applications",
      key: "applications",
    },
    {
      title: "Applied Date",
      key: "dates",
      render: (_, record) => (
        <div className="min-w-[200px]">
          <div>{record.date_applied}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const statusMessages = {
          ONGOING: "Applied",
          REJECTED: "Rejected",
          SHORTLISTED: "Shortlisted",
          ACCEPTED: "Accepted",
          APPROVAL_WORK: "Allowed to work",
        };

        const message = statusMessages[text] || text;

        const statusClass = {
          ONGOING: "text-orange-500 bg-orange-300",
          REJECTED: "text-red-500 bg-red-300",
          SHORTLISTED: "text-blue-500 bg-blue-300",
          ACCEPTED: "text-green-500 bg-green-300",
          APPROVAL_WORK: "text-purple-500 bg-purple-300",
        }[text] || "text-gray-500";

        return (
          <span className={`capitalize rounded-[20px] px-4 py-1 ${statusClass}`}>
            {message}
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 16 }} className="bg-white rounded-lg mt-[20px]">
      <div className="text-start mb-4 md:text-end">
        <RangePicker />
      </div>
      <div className="w-full overflow-auto">
        <Table
          dataSource={jobs?.items.map((job) => ({
            key: job.id,
            title: job.job_title,
            location: job.location,
            applications: job.applications ? job.applications : 0,
            date_applied: formatDateReadable(job.date_applied),
            status: job.status,
            featured_image:job.featured_image,
          }))}
          columns={columns}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: jobs?.totalItems || 0, 
            
          }}
          onChange={handleTableChange} 
        />
      </div>
    </div>
  );
};

export default AppliedJob;
