/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "@/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Progress } from "../ui/progress";
import { calculateProfileCompleteness } from "@/utils/formatter";
import { Link } from "react-router-dom";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  const { user } = useSelector((state: RootState) => state.auth);
  
  // const tourSteps: TourProps['steps'] =
  //   routes.filter((route) => route.tourDescription != null).map((route) => {
  //     title: route.tourTitle,
  //       description: route.tourDescription,
  //       target:()=>route.ref.current()
  //   }
  // )
  
   const profileCompleteness = calculateProfileCompleteness(user)
  return (
    <div
      className={`sm:none duration-175 min-w-[250px] linear justify-between fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 mb-[100px] h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
         <img src="/logo.png" alt="" className="w-[80px]" />
        </div>
      </div>
    
    

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      <Link to={`${window.location.pathname.includes("business")?"/employer/profile/edit":"/candidate/profile/edit"}`} className="flex border rounded-md mx-[20px] p-3 px-2 gap-2">
      <div
              className="h-10 w-10 text-[16px] font-semibold text-brand-800 flex items-center justify-center bg-brand-100 rounded-full"
             
        >
            {profileCompleteness.total.toFixed(0)}%
          </div>
        <div className="flex flex-1 flex-col justify-between">
        {Number(profileCompleteness.total.toFixed(0)) !== 100 ? "Profile incomplete " : "Profile complete"}
        <Progress className="h-[8px]" value={profileCompleteness.total}/>
        </div>
      </Link>

    </div>
  );
};

export default Sidebar;
