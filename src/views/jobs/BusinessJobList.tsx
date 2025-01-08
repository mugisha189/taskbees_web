
import React, { useState, useEffect } from "react";
import { Tabs, Table, Switch, Button, DatePicker, Space, Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDeleteJob, useGetBusinessJobs, useGetJobsByStatus, usePublishJob } from "@/hooks/job";
import { formatDateReadable } from "@/utils/formatter";

const { RangePicker } = DatePicker;

const JobManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [status, setStatus] = useState("ACTIVE");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  // const { data: jobs, isLoading, error } = useGetBusinessJobs("1", "12");
  const { data: jobs, isLoading, error } = useGetJobsByStatus(status, currentPage, pageSize);
  
  const { mutate: publishJob, isPending: publishPending, isSuccess, isError } = usePublishJob();
  const { mutate: deleteJob, isPending: deletePending, isSuccess: deleteSuccess, isError: deleteError } = useDeleteJob();

  useEffect(() => {

  }, [status]);

  const handleDelete = (key) => {
    deleteJob(key);
    
  };

  const handleUpdatePublished = (key, published) => {
    publishJob(key);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case "active":
        setStatus("ACTIVE");
        break;
      case "drafted":
        setStatus("DUE");
        break;
      case "expired":
        setStatus("EXPIRED");
        break;
      default:
        setStatus("ACTIVE");
    }
  };
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.featured_image?record.featured_image:"https://taskbee-fe.vercel.app/images/resource/company-logo/1-2.png"}
            alt="job icon"
            className="h-[60px]"
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
      title: "Created & Expired",
      key: "dates",
      render: (_, record) => (
        <div className="min-w-[200px]">
          <div>{record.created}</div>
          <div>{record.expired}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span style={{ color: text === "Expired" ? "red" : "green" }}>{text}</span>
      ),
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (published, record) => (
        <Switch
          checked={published}
          onChange={(checked) => handleUpdatePublished(record.key, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/employer/job/${record.key}/candidates`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<Trash2 />}
              danger
              onClick={() => handleDelete(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }} className="bg-white rounded-lg mt-[20px]">
      {/* Tabs for Job Status */}
      <div className="flex mb-2 justify-between items-center">
        <Tabs
          type="card"
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            { key: "active", label: "Active Jobs" },
            { key: "drafted", label: "Drafted Jobs" },
            { key: "expired", label: "Expired Jobs" },
          ]}
        />
        <button
          onClick={() => { navigate("/employer/jobs/new") }}
          className="flex items-center justify-center bg-brand-400 p-2 rounded-xl text-white font-[600]"
        >
          <AiOutlinePlus />
          Submit Job
        </button>
      </div>

      {/* Date Filter */}
      <div className="text-start md:text-end">
        <RangePicker />
      </div>
      <div className="w-full overflow-auto">
        <Table
          dataSource={jobs?.items.map((job) => ({
            key: job.id,
            title: job.job_title,
            location: job.location,
            applications: job.applications ? job.applications : 0,
            created: formatDateReadable(job.createdAt),
            expired: formatDateReadable(job.application_deadline),
            status: job.creation_status,
            featured_image:job.featured_image,
            published: (job.creation_status === "PUBLISHED"||job.published=="PUBLISHED") ? true : false,
          }))}
          columns={columns}
          loading={isLoading || publishPending || deletePending}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: jobs?.totalItems || 0,

            

          }}
          onChange={handleTableChange}
        />
      </div>
      {/* Table */}
    </div>
  );
};

export default JobManagement;