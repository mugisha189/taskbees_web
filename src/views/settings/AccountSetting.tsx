
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CustomInput from "@/components/ui/CustomInput";
import ConfirmDeletion from "./ConfirmDeletionModal";
import { changePassword } from "@/store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AccountSettings = () => {
  const dispatch=useDispatch()
  const [isChangeEmailModalOpen, setChangeEmailModalOpen] = useState(false);
  const {user}=useSelector((state:RootState)=>state.auth)
  const [newEmail, setNewEmail] = useState("");
  const [changeEmailStep, setChangeEmailStep] = useState(1);
  const [otp, setOTP] = useState("");
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSaveEmail = () => {
    // Logic to save the new email
    console.log("New Email:", newEmail);
    changeEmailStep > 2
      ? setChangeEmailModalOpen(false)
      : setChangeEmailStep((prev) => prev + 1);
  };
  const handleSavePassword = async (values:any) => {
    const response = await dispatch(changePassword({ newPassword: values.newPassword, currentPassword: values.currentPassword }))
    if(response.success){
      toast.success("Password changed successfully")
    }
    else {
      toast.error(response.message)
    }
  };

  return (
    <>
      <div className="col-span-8 flex-1 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        </div>
        <hr className="mt-4 mb-8" />

        {/* Email Section */}
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your email address is <strong>{user?.profile?.email||user?.company_email}</strong>
          </p>
          <button
            className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            onClick={() => setChangeEmailModalOpen(true)}
          >
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8" />

        {/* Password Section */}
        <p className="py-2 text-xl font-semibold">Password</p>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordValidationSchema}
          onSubmit={handleSavePassword}
        >
          {({ isSubmitting }) => (
            <Form className="flex w-full max-w-[600px] flex-col space-y-4">
              <label htmlFor="currentPassword">
                <span className="text-sm text-gray-500">Current Password</span>
                <Field
                  name="currentPassword"
                  type="password"
                  placeholder="Current password"
                  className="w-full border rounded-md border-gray-300 p-2"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-sm text-red-600"
                />
              </label>

              <label htmlFor="newPassword">
                <span className="text-sm text-gray-500">New Password</span>
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  className="w-full border rounded-md border-gray-300 p-2"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-sm text-red-600"
                />
              </label>

              <label htmlFor="confirmPassword">
                <span className="text-sm text-gray-500">Confirm Password</span>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full border rounded-md border-gray-300 p-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-sm text-red-600"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Save Password
              </button>
            </Form>
          )}
        </Formik>
        <hr className="mt-4 mb-8" />

        {/* Delete Account Section */}
        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">Delete Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            Proceed with caution
          </p>
          <p className="mt-2 mb-2">
            We will completely wipe your data. There is no way to access your
            account after this action.
          </p>
          <button
            onClick={() => setConfirmDeleteAccount(true)}
            className="ml-auto text-sm font-semibold bg-red-600 text-white rounded-xl h-[40px] px-[10px] decoration-2"
          >
            Continue with deletion
          </button>
        </div>
      </div>

      {/* Change Email Modal */}
      {isChangeEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] bg-opacity-30">
          <div className="w-full md:w-[500px] rounded-xl bg-white p-6">
            <h2 className="text-lg font-semibold">Change Email Address</h2>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailValidationSchema}
              onSubmit={(values) => {
                setNewEmail(values.email);
                handleSaveEmail();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {changeEmailStep === 1 && (
                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter new email"
                        className="mt-4 w-full border rounded-md border-gray-300 p-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-sm text-red-600"
                      />
                    </div>
                  )}
                  {changeEmailStep === 2 && (
                    <div className="flex py-[10px] flex-col gap-2">
                      <p>Enter code sent to your email</p>
                      <InputOTP
                        autoFocus
                        value={otp}
                        maxLength={6}
                        type="number"
                        onChange={(value: string) => setOTP(value)}
                      >
                        <InputOTPGroup className="flex gap-[10px] md:gap-[20px] focus:ring">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              className="!rounded-[11px] !size-[60px] !border-l"
                              index={index}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                  {changeEmailStep === 3 && (
                    <div className="flex flex-col pt-[20px] items-center gap-2">
                      <FaCheckCircle className="text-green-600" size={60} />
                      <p>Email Added Successfully</p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end space-x-4">
                    {changeEmailStep < 3 && (
                      <button
                        className="rounded-md flex-1 bg-gray-300 px-4 py-2 text-sm"
                        onClick={() => {
                          setChangeEmailModalOpen(false);
                          setChangeEmailStep(1);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md flex-1 bg-green-500 px-4 py-2 text-sm text-white"
                    >
                      {changeEmailStep < 3 ? "Next" : "Close"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteAccount && (
        <ConfirmDeletion
          closeModal={() => setConfirmDeleteAccount(false)}
          handleSubmit={() => {
            setDeleteAccount(true);
            setConfirmDeleteAccount(false);
          }}
        />
      )}
    </>
  );
};

export default AccountSettings;
