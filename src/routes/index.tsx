
import MainDashboard from "@/views/admin/default";
import Profile from "@/views/admin/profile";

import {
  MdHome,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import SettingPage from "@/views/settings";
import JobList from "@/views/jobs";
import { BriefcaseBusiness, Calendar, ChartArea, MapPin, MessageCircle } from "lucide-react";
import MapComponent from "@/views/map";
import BusinessPage from "@/views/business";
import JobDetail from "@/views/jobs/SingleJob";
import CalendarApp from "@/views/calendar";
import ChatApp from "@/views/chat";
import EditProfile from "@/views/admin/profile/EditProfile";
import AppliedJob from "@/views/jobs/AppliedJob";
import CandidateProfile from "@/views/admin/profile/CandidateProfile";

const routes = [
  {
    name: "Dashboard",
    layout: "/candidate",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/",
    path: "profile/edit",
    icon: <MdPerson className="h-6 w-6" />,
    component: <EditProfile />,
  },
  {
    name: "Profile",
    layout: "/candidate",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

  {
    name: "Jobs",
    layout: "/candidate",
    path: "jobs",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    component: <div className = "flex-1 w-full flex justify-center items-center">

      <JobList />,
    </div> 
   
  },
  {
    name: "Setting",
    layout: "/candidate",
    path: "setting",
    icon: <MdSettings className="h-6 w-6" />,
    component: <SettingPage />,
  },
  {
    name: "Map",
    layout: "/candidate",
    path: "map",
    icon: <MapPin className="h-6 w-6" />, 
    component: <MapComponent />,
  },
  {
    name: "Business",
    layout: "/candidate",
    path: "employer",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    component:<BusinessPage/>
  },
  {
    name: "Job Detail",
    layout: "/",
    path: "jobs/:id",
    icon: <BriefcaseBusiness className="h-6 w-6" />,

    component:<JobDetail/>
  },
  {
    name: "Events",
    layout: "/candidate",
    path: "events",
    icon: <Calendar className="h-6 w-6" />,

    component:<CalendarApp/>
  },
  {
    name: "Chat",
    layout: "/candidate",
    path: "chat",
    icon: <MessageCircle className="h-6 w-6" />,

    component:<ChatApp/>
  },
  {
    name: "Edit Profile",
    layout: "/",
    path: "profile/edit",
    icon: <ChartArea className="h-6 w-6" />,

    component:<EditProfile/>
  },
  {
    name: "Applied Jobs",
    layout: "/candidate",
    path: "jobs/applied",
    icon: <BriefcaseBusiness className="h-7 w-7" />,
    component: <AppliedJob />,
  },
  {
    name: "Candidate",
    layout: "/",
    path: "view/:id",
    icon: <MdPerson className="h-6 w-6" />,
    component:<CandidateProfile/>

  }
  
];
export default routes;
