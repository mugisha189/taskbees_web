
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import Spinner from "@/components/loader/Spinner";
import CustomInput from "@/components/ui/CustomInput";
import { useGoogleLoginHook } from "@/hooks/auth";
import { loginUser } from "@/store/actions/authAction";
import { clearError, setUser } from "@/store/reducer/authReducer";
import { AppDispatch, RootState } from "@/store/store";
import { AuthResponse } from "@/types/api";
import GoogleButton from "@/components/ui/GoogleButton";

function Login() {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  // Handle navigation based on role and `next` query parameter
  const handleNavigation = (role: string | undefined) => {
    const next = searchParams.get("next");
    if (next) {
      navigate(next);
    } else {
      if (role === "CANDIDATE") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/employer/dashboard");
      }
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Clear any existing errors before dispatch
      dispatch(clearError());

      try {
        const result = await dispatch(loginUser(values)).unwrap();
       localStorage.setItem("id",result.payload.user.id)
        if (result.payload.user) {
          handleNavigation(result.payload.user.role);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Invalid login credentials");
      }
    },
  });

  // Handle Google login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const data: AuthResponse | null = await useGoogleLoginHook();
      setGoogleLoading(false);

      if (data?.payload.user) {
        dispatch(setUser(data.payload.user));
        handleNavigation(data.payload.user.role);
      } else {
        throw new Error("Google login failed. Please try again.");
      }
    } catch (err) {
      setGoogleLoading(false);
      console.error(err);
      toast.error(err.message || "An unexpected error occurred during Google login.");
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
              <span className="sr-only">Home</span>
              <img src="/logo.png" className="w-[100px]" />
            </a>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-brand-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src="/logo.png" className="w-[100px]" />
              </a>
            </div>
            <div className="mt-8 w-full md:min-w-[400px] max-w-[500px] flex flex-col gap-6">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to TaskBees
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500">
                Log in to unlock access to exclusive job opportunities and
                manage your applications effortlessly. Keep track of your saved
                jobs and get personalized recommendations to speed up your job
                search. Don’t miss out on the perfect role waiting for you!
              </p>

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="col-span-6 w-full">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <CustomInput
                    type="email"
                    id="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <CustomInput
                    type="password"
                    id="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="flex justify-between">
                  <div className="col-span-6">
                    <label htmlFor="remember_me" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="remember_me"
                        name="remember_me"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <a href="/reset-password" className="text-sm text-gray-700">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="col-span-6 sm:flex flex-col sm:items-center sm:gap-4">
                  <button
                    disabled={googleLoading}
                    type="submit"
                    className="flex justify-center items-center shrink-0 w-full rounded-md border border-brand-400 bg-brand-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-brand-400 focus:outline-none focus:ring active:text-brand-500"
                  >
                    {loading ? <Spinner /> : "Login"}
                  </button>
                  <div className="flex font-poppins flex-col items-center justify-center w-full  text-[20px]">
                    <p>Or</p>
                    <GoogleButton
                      loading={googleLoading}
                      onClick={handleGoogleLogin}
                    />
                  </div>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-gray-700 underline">
                      Create account
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
