import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLayout from "@/layouts/admin";

import JobList from "./views/jobs";
import LandingLayout from "@/layouts/landing";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import ResetPassword from "./views/auth/ResetPassword";
import MapComponent from "./views/map";
import JobDetail from "./views/jobs/SingleJob";
import CalendarApp from "./views/calendar";
import ChatApp from "./views/chat";
import EditProfile from "./views/admin/profile/EditProfile";
import Pricing from "./components/pricing/pricing";
import BusinessLayout from "./layouts/business";
import CandidateList from "./views/candidate";
import ProfileOverview from "./views/admin/profile";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./routes/ProtectedRoutes";
// import LandingNavbar from "./components/navbar/Landing";
import LandingPage from "./views/landing";
import HowTaskBeeWorks from "./views/landing/HowItWorks";
import Faq from "./views/landing/FAQ";
import ForBusiness from "./views/landing/ForBusiness";
import VerifyOTP from "./views/auth/VerifyOTP";
import CandidateProfile from "./views/admin/profile/CandidateProfile";
import BusinessProfile from "./views/admin/profile/BusinessProfile";
import Aggrement from "./views/admin/aggrements";
const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
       <QueryClientProvider client={queryClient}>
    
       <Toaster />
    <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
          <Route path="candidate/*" element={<AdminLayout />} />
<Route path="employer/*" element={<BusinessLayout />} />
           

              
            </Route>
   
       
        {/* <Route path="/" element={<Navigate to="/candidate" replace />} /> */}
            <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
            
        <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Landing */}
        <Route path="/calendar" element={<CalendarApp />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/edit/profile" element={<EditProfile />} />
        <Route path="/pricing" element={<Pricing />} />
            <Route path="/candidates" element={<CandidateList />} />
            
            <Route path="/profile/:1" element={< ProfileOverview />} />
           
            <Route element={<LandingLayout />} >
              <Route path="/job/:id" element={
                <div className="w-full flex mt-[70px] justify-center items-center">
                  <div className="max-w-[1900px] w-full">

<JobDetail />
                  </div>
                </div>
                } />
        <Route path="/map" element={<MapComponent />} />
              
            <Route path="/" element={< LandingPage />} />
        <Route
          path="/jobs"
          element={
          
              <JobList />
            
          }
              />
      
               

              <Route path="/how-it-works" element={<HowTaskBeeWorks />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/for-business" element={<ForBusiness />} />
              
            </Route>
            <Route path="/business/:id" element={<BusinessProfile />}></Route>
            <Route path="/aggrement/:id/:jobId" element={<Aggrement />}></Route>
            

            <Route path="/view/candidate/:id" element={<CandidateProfile/>}></Route>

      </Routes>
        </BrowserRouter>
        </QueryClientProvider>
      </Provider>
  );
};

export default App;
