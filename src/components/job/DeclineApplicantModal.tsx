import React, { ReactNode } from 'react';
import { Button, Modal } from 'antd';
const DeclineApplicantModal= ({isModalOpen,loading,handleSubmit,handleCancel,title}:{isModalOpen:boolean,setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>,showModal:any,loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,handleSubmit:any,handleCancel:any,title:ReactNode|string}) => {
  return (
    <>
  
      <Modal  centered footer={[
         <Button key="cancel" onClick={handleCancel}>
         Cancel
       </Button>,
       <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
         Confirm
       </Button>,
      ]} title="Decline Applicant" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
        <p>{title}</p>
        <p>Do you really want to reject this applicant application?</p>
        
      </Modal>
    </>
  );
};

export default DeclineApplicantModal;