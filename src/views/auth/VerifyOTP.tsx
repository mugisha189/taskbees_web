
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

function VerifyOTP() {
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
            Verify Your account
            </h1>
            <div className="mt-8 w-full md:min-w-[400px] max-w-[500px] items-start  flex flex-col gap-6">
             

              
                <div
                >
                  
                    <div className="flex flex-col items-start">
                      <p className="leading-relaxed text-[18px] text-gray-500">
                      We’ve sent a One-Time Password (OTP) to your registered email address: user@example.com.
Please check your inbox 

This step helps us ensure the security of your account and verify your identity. If you didn’t receive the OTP, you can request a new one.
                  </p>
                  <button className="mb-4 mt-2">
                    Resend OTP
                    </button>
                      <div className="mb-4">
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
            

            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default VerifyOTP;
