
import Profile from "@/views/admin/profile";

import {
  MdHome,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { BriefcaseBusiness, BriefcaseBusinessIcon, Calendar, ChartArea, MapPin, MessageCircle } from "lucide-react";
import JobDetail from "@/views/jobs/SingleJob";
import CalendarApp from "@/views/calendar";
import ChatApp from "@/views/chat";
import BusinessDashboard from "@/views/admin/default/BusinessDashboard";
import CandidateMap from "@/views/map/CandidateMap";
import BusinessSettingPage from "@/views/settings/BusinessSetting";
import SubmitJob from "@/views/jobs/SubmitJob";
import CandidateList from "@/views/candidate";
import { BsPeople } from "react-icons/bs";
import JobPreview from "@/views/jobs/JobPreview";
import EditJob from "@/views/jobs/JobEdit";
import JobManagement from "@/views/jobs/BusinessJobList";
import ApplicantTable from "@/views/jobs/JobCandidateList";
import JobStartComponent from "@/views/jobs/StartJob";
import Working from "@/views/jobs/Working";
import EditEmployerProfile from "@/views/admin/profile/EditEmployerProfile";
import CandidateProfile from "@/views/admin/profile/CandidateProfile";
import Aggrement from "@/views/admin/aggrements";
import MyBusinessProfile from "@/views/admin/profile/MyBusinessProfile";


const businessRoutes = [
  {
    name: "Dashboard",
    layout: "/employer",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <BusinessDashboard />,
    
  },
  {
    name: "Jobs",
    layout: "/employer",
    path: "jobs",
    icon: <BriefcaseBusinessIcon className="h-6 w-6" />,
    component: <JobManagement />,
   
  },
  {
    name: "Job Candidates",
    layout: "/",
    path: "job/:id/candidates",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ApplicantTable />,
   
  },
  {
    name: "Profile",
    layout: "/employer",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <MyBusinessProfile />,
  },
  {
    name: "Job",
    layout: "/",
    path: "job/:id/start",
    icon: <MdPerson className="h-6 w-6" />,
    component: <JobStartComponent />,
   
  },
  
  {
    name: "Candidates",
    layout: "/",
    path: "candidates",
    icon: <BsPeople className="h-6 w-6" />,
    component: <CandidateList />,
   
},
  {
    name: "Map",
    layout: "/employer",
    path: "map",
    icon: <MapPin className="h-6 w-6" />, 
    component: <CandidateMap />,
   
  },

  {
    name: "Events",
    layout: "/employer",
    path: "events",
    icon: <Calendar className="h-6 w-6" />,

    component: <CalendarApp />,
   
  },
  {
    name: "Chat",
    layout: "/employer",
    path: "chat",
    icon: <MessageCircle className="h-6 w-6" />,
    component: <ChatApp />,
   
  },
  {
    name: "Profile",
    layout: "/",
    path: "profile/edit",
    icon: <MdPerson className="h-6 w-6" />,

    component: <EditEmployerProfile />,
   
  }, {
    name: "Submit Job",
    layout: "/",
    path: "jobs/new",
    icon: <ChartArea className="h-6 w-6" />,
    component: <SubmitJob />,
   
  },
  {
    name: "Setting",
    layout: "/employer",
    path: "setting",
    icon: <MdSettings className="h-6 w-6" />,
    component: <BusinessSettingPage />,
   
  },
  {
    name: "Candidate",
    layout: "/",
    path: "candidates/profile",
    icon: <ChartArea className="h-6 w-6" />,
    component: <Profile />,
   
  },
  {
    name: "Job Preview",
    layout: "/",
    path: "job/preview",
    icon: <ChartArea className="h-6 w-6" />,
    component: <JobPreview />,
   
  },
  {
    name: "Job Edit",
    layout: "/",
    path: "job/edit",
    icon: <ChartArea className="h-6 w-6" />,
    component: <EditJob />,
   
  },
  {
    name: "Working",
    layout: "/",
    path: "job/:id/working",
    icon: <ChartArea className="h-6 w-6" />,
    component: <Working />,
   
  },
  {
    name: "Candidate",
    layout: "/",  
    path: "/view/:id",
    icon: <ChartArea className="h-6 w-6" />,
    component: <CandidateProfile />,
  },
  {
    name: "Job Detail",
    layout: "/",
    path: "job/:id",
    icon: <BriefcaseBusiness className="h-6 w-6" />,

    component:<JobDetail/>
  },
  {
    name: "Agreement",
    layout: "/",
    path: "aggrement/:jobId/to/:id",
    icon: <BriefcaseBusiness className="h-6 w-6" />,

    component:<Aggrement/>
  },
  
];
export default businessRoutes;
