import React, { ReactNode } from 'react';
import { Button, Modal } from 'antd';
const ApproveApplicantModal= ({isModalOpen,loading,handleSubmit,handleCancel,title}:{isModalOpen:boolean,setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>,showModal:any,loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,handleSubmit:any,handleCancel:any,title:ReactNode|string}) => {
  return (
    <>
  
      <Modal centered  footer={[
         <Button key="cancel" onClick={handleCancel}>
         Cancel
       </Button>,
       <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
         Confirm
       </Button>,
      ]} title="Approve Applicant" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
        <p>{title}</p>
        <p>Do you want to approve this applicant?</p>
        
      </Modal>
    </>
  );
};

export default ApproveApplicantModal;