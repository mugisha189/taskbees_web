/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import businessRoutes from "@/routes/businessroutes";

const BusinessSidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
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
        <Links routes={businessRoutes} />
      </ul>


    </div>
  );
};

export default BusinessSidebar;
