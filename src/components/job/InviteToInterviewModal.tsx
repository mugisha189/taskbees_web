import { Modal, Form, Input, Select, Button } from "antd";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";

const { Option } = Select;

interface Props {
  isModalOpen: boolean;
  applicant: any;
  loading: boolean;
  handleSubmit: (values: any) => void;
  handleCancel: () => void;
  title: ReactNode | string;
}

const InviteToInterviewModal: React.FC<Props> = ({
  isModalOpen,
  loading,
  applicant,
  handleSubmit,
  handleCancel,
  title,
}) => {
  const jobID = useParams().id;
  const validationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    startDate: Yup.date().required("Start date is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
    // url: Yup.string()
    //   .url("Invalid URL")
    //   .test(
    //     "url-required-based-on-location",
    //     "URL is required for Google Meet or Zoom",
    //     function (value) {
    //       const { location } = this.parent;
    //       if ((location === "GOOGLE" || location === "ZOOM") && !value) {
    //         return false; // Fail validation if location requires URL and it's empty
    //       }
    //       return true; // Pass validation otherwise
    //     }
    //   ),
    event_time: Yup.string().required("Event time is required"),
  });

  return (
    <Modal
      centered
      footer={[
        <Button disabled={loading} key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          disabled={loading}
          key="submit"
          type="primary"
          loading={loading}
          form="invite-form"
          htmlType="submit"
        >
          Confirm
        </Button>,
      ]}
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Formik
        initialValues={{
          location: "",
          startDate: null,
          duration: 0,
          // url: "",
          event_time: "MINUTES",
          jobId: jobID,
          applicantId: applicant.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <FormikForm id="invite-form" className="pt-[30px]">
            <Form.Item label="Location">
              <Select
                value={values.location}
                onChange={(value) => setFieldValue("location", value)}
              >
                <Option value="PHYSICAL">Physical</Option>
                <Option value="OTHER">Other</Option>
                {/* <Option value="GOOGLE">Google Meet</Option>
                <Option value="ZOOM">Zoom</Option> */}
              </Select>
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </Form.Item>
            <Form.Item label="Start Date">
              <Input
                type="datetime-local"
                name="startDate"
                step={1}
                value={values.startDate as any}
                onChange={(e) => setFieldValue("startDate", e.target.value)}
                placeholder="Enter start date"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
              />
              <ErrorMessage
                name="day"
                component="div"
                className="text-red-500 text-sm"
              />
            </Form.Item>
            <Form.Item label="Event Time">
              <Select
                value={values.event_time}
                onChange={(value) => setFieldValue("event_time", value)}
              >
                <Option value="MINUTES">Minutes</Option>
                <Option value="HOURS">Hours</Option>
              </Select>
              <ErrorMessage
                name="event_time"
                component="div"
                className="text-red-500 text-sm"
              />
            </Form.Item>
            <Form.Item label="Duration">
              <Input
                name="duration"
                value={values.duration}
                onChange={(e) => setFieldValue("duration", e.target.value)}
                placeholder="Enter duration"
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-500 text-sm"
              />
            </Form.Item>
            {/* {(values.location === "GOOGLE" || values.location === "ZOOM") && (
              <Form.Item label="URL">
                <Input
                  name="url"
                  value={values.url}
                  onChange={(e) => setFieldValue("url", e.target.value)}
                  placeholder="Enter meeting URL"
                />
                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </Form.Item>
            )} */}
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default InviteToInterviewModal;
