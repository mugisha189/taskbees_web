
import { Table, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { QRCodeSVG } from "qrcode.react";

const JobStartComponent = () => {
  // Sample applicant data
  const applicants = [
    {
      key: "1",
      name: "moses",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male", // Placeholder avatar
      address: "—",
    },
  ];
  // const base  url
  const baseUrl = window.location.origin
  


  // Columns for the table
  const columns = [
    {
      title: "Applicant Names",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.avatar}
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div
      className="mt-[30px]"
      style={{ padding: "16px", background: "white", borderRadius: "8px" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2>Ready to start a job</h2>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          style={{
            fontSize: "16px",
            color: "#52c41a", // Green color for "Back"
          }}
        >
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div
        className="flex justify-between  md:items-start items-center md:flex-row flex-col"
        
      >
        {/* Applicant Table */}
        <Table
          className="w-full"
          dataSource={applicants}
          columns={columns}
          pagination={{ pageSize: 5 }}
          style={{ flex: 1, marginRight: "16px" }}
        />

        {/* QR Code */}
        <div
          className="w-full h-full max-w-[500px]"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            border: "1px solid #f0f0f0",
            borderRadius: "8px",
          }}
        >
          <QRCodeSVG
            value={`${baseUrl}/employer/job/1/working`}
            className="w-full h-full"
            level="H"
          />
          ,
        </div>
      </div>
    </div>
  );
};

export default JobStartComponent;
