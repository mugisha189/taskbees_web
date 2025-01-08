
import CustomInput from "@/components/ui/CustomInput";
import { confirmOTP, resetPassword, sendOTP } from "@/store/actions/authAction";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import cookieStorage from "@/utils/cookieStorage";

function ResetPassword() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); 
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [otp,setOTP]=useState("")

  // Step-wise validation schemas
  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be a 6-digit number")
      .required("Required"),
  });

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // Handle form submissions
  const handleEmailSubmit = async (values: { email: string }) => {
    try {
      await dispatch(sendOTP(values.email));
      if (!error && !loading) {
        console.log("OTP sent successfully!");
        localStorage.setItem("resetEmail", values.email);
        setCurrentStep(1); 
      } else {
        toast.error(error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const email=localStorage.getItem("resetEmail");
      await dispatch(confirmOTP({ email: email, otp: parseInt(otp, 10) }));
      if (!error && !loading) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("resetEmail");
        setCurrentStep(2); // Move to Password Reset step
      } else {
        toast.error(error || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handlePasswordReset = async (values: { password: string; confirmPassword: string }) => {
    try {
      const resetToken=cookieStorage.getItem("resetToken")
      const response = await dispatch(resetPassword({newPassword:values.password,resetToken:resetToken}))
      if(response.success){
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-start bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/auth.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <img src="/logo.png" className="w-[100px]" />
            </a>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to TaskBees
            </h1>
            <div className="mt-8 w-full md:min-w-[400px] max-w-[500px] flex flex-col gap-6">
              {currentStep === 0 && (
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={emailSchema}
                  onSubmit={handleEmailSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4">
                      <p className="leading-relaxed text-gray-500">
                        Don’t worry, it happens to the best of us! Enter your email address to receive a password reset link and regain access to your account.
                      </p>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                         className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                        />
                        {errors.email && touched.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-md bg-brand-400 px-4 py-2 text-white"
                      >
                        Send Reset Code
                      </button>
                    </Form>
                  )}
                </Formik>
              )}

              {currentStep == 1 && (
                <div
        
                  
                >
                  
                    <div className="flex flex-col gap-4">
                      <p className="leading-relaxed text-gray-500">
                        Enter the OTP sent to your email.
                      </p>
                      <div>
                        <InputOTP
                      
                          value={otp}
                          onChange={(value)=>{setOTP(value)}}
                          
                          maxLength={6}
                          
                       
                         
                        >
                          <InputOTPGroup className="flex gap-[10px] md:gap-[20px]">
                            {[...Array(6)].map((_, index) => (
                              <InputOTPSlot
                                
                                key={index}
                                className="!rounded-[11px] !h-[60px] !w-[60px] !border-l"
                                index={index}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      
                      </div>
                    <button
                      onClick={handleOTPSubmit}
                        type="submit"
                        className="w-full rounded-md bg-brand-400 px-4 py-2 text-white"
                      >
                        Verify OTP
                      </button>
                    </div>
                
                </div>
              )}

              {currentStep === 2 && (
                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  validationSchema={passwordSchema}
                  onSubmit={handlePasswordReset}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4">
                      <p className="leading-relaxed text-gray-500">
                        Use a strong password that is easy to remember.
                      </p>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <Field
                          name="password"
                          type="password"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                        />
                        {errors.password && touched.password && (
                          <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-md bg-brand-400 px-4 py-2 text-white"
                      >
                        Reset Password
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default ResetPassword;
