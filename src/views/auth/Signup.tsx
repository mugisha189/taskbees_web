/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleRegisterHook } from "@/hooks/auth";
import { setUser } from "@/store/reducer/authReducer";
import { registerEmployee, registerUser } from "@/store/actions/authAction";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "@/components/loader/Spinner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoogleButton from "@/components/ui/GoogleButton";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [role, setRole] = React.useState("CANDIDATE");
  const [googleLoading, setGoogleLoading] = React.useState(false);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().when("role", {
    //   is: "talent",
    //   then: Yup.string().required("First name is required."),
    // }),
    // lastName: Yup.string().when("role", {
    //   is: "talent",
    //   then: Yup.string().required("Last name is required."),
    // }),
    company_name: Yup.string().test(
      "is-business",
      "Company name is required.",
      function (value) {
        if (role === "BUSINESS" && !value) {
          return false;
        }
        return true;
      }
    ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      )
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("Confirm Password is required."),

    // country: Yup.string().when("role", {
    //   is: "eMPLOYER",
    //   then: Yup.string().required("Country is required."),
    // }),
  });

  const handleRegister = async (values: any) => {
    try {
      console.log(role);
      if (role === "BUSINESS") {
        const resultAction = await dispatch(
          registerEmployee({
            company_name: values.company_name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role,
          })
        );
        if (registerEmployee.fulfilled.match(resultAction) && !loading) {
          localStorage.setItem("user_email", values.email);
          navigate("/employer/dashboard");
        }
        if (registerEmployee.rejected.match(resultAction) && !loading) {
          toast.error(resultAction.payload as string);
        }
      } else {
        const resultAction = await dispatch(
          registerUser({
            role,
            // firstName: values.firstName,
            // lastName: values.lastName,
            // company_name: values.company_name,
            // country: values.country,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          })
        );
        if (registerUser.fulfilled.match(resultAction) && !loading) {
          localStorage.setItem("user_email", values.email);
          navigate("/candidate/dashboard");
        }
        if (registerUser.rejected.match(resultAction) && !loading) {
          toast.error(resultAction.payload as string);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    const data = await useGoogleRegisterHook();
    setGoogleLoading(false);
    if (data?.payload.user) {
      dispatch(setUser(data.payload.user as any));
      if (data?.payload.user?.role == "EMPLOYER") {
        navigate("/employer/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section */}
        <section className="relative flex h-32 items-start bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/auth.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <img src="/logo.png" className="w-[100px]" alt="Logo" />
            </a>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-[600px] w-full">
            <div className="relative -mt-16 mb-[20px]">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to TaskBees
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500">
                Create an account to start your journey.
              </p>
            </div>

            <Tabs defaultValue="CANDIDATE" className="w-full">
              <TabsList className="w-full bg-brand-100">
                <TabsTrigger
                  onClick={() => setRole("CANDIDATE")}
                  className="flex-1 text-gray-500 data-[state=active]:text-gray-800"
                  value="CANDIDATE"
                >
                  Talent
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setRole("BUSINESS")}
                  className="flex-1 text-gray-500 data-[state=active]:text-gray-800"
                  value="BUSINESS"
                >
                  EMPLOYER
                </TabsTrigger>
              </TabsList>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",

                  country: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                {() => (
                  <Form>
                    {/* <TabsContent value="CANDIDATE">
                      <div className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <Field
                           className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <Field
                           className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </TabsContent> */}

                    <TabsContent value="BUSINESS">
                      <div className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="company_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Company Name
                          </label>
                          <Field
                            className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                            id="company_name"
                            name="company_name"
                            placeholder="Enter Company name"
                          />
                          <ErrorMessage
                            name="company_name"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* <div className="col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <Field
                           className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                            id="country"
                            name="country"
                            placeholder="Enter country"
                          />
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div> */}
                      </div>
                    </TabsContent>

                    <div className="mt-8">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <Field
                        className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Field
                        className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>{" "}
                      <Field
                        className="mt-1 w-full rounded-md border-gray-200 border-[1px] bg-white text-sm text-gray-700 shadow-sm h-[40px] px-[10px]"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                      />{" "}
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />{" "}
                    </div>
                    <div className="col-span-6 pt-[20px]">
                      <label htmlFor="MarketingAccept" className="flex gap-4">
                        <input
                          type="checkbox"
                          id="MarketingAccept"
                          name="marketing_accept"
                          className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                        />

                        <span className="text-sm text-gray-700">
                          I want to receive emails about events, product updates
                          and company announcements.
                        </span>
                      </label>
                    </div>

                    <div className="col-span-6 pt-[10px]">
                      <p className="text-sm text-gray-500">
                        By creating an account, you agree to our
                        <a href="#" className="text-gray-700 underline">
                          {" "}
                          terms and conditions{" "}
                        </a>
                        and
                        <a href="#" className="text-gray-700 underline">
                          privacy policy
                        </a>
                        .
                      </p>
                    </div>

                    <div className="col-span-6 sm:flex pt-[10px] flex-col sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        className=" flex justify-center items-center shrink-0 w-full rounded-md border border-brand-400 bg-brand-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text- focus:outline-none focus:ring active:text-brand-500"
                      >
                        {loading ? <Spinner /> : " Create an account"}
                      </button>
                      <div className="flex font-poppins flex-col items-center justify-center w-full  text-[20px]">
                        <p>Or</p>
                        <GoogleButton
                          loading={googleLoading}
                          onClick={handleGoogleRegister}
                        />
                      </div>

                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                        <a href="/login" className="text-gray-700 underline">
                          Log in
                        </a>
                        .
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </Tabs>
          </div>
        </main>
      </div>
    </section>
  );
}
export default Signup;
