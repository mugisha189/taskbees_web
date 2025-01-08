

import AccountSettings from "@/views/settings/AccountSetting";
import BillingSettings from "@/views/settings/BillingSettings";
import BusinessBillingPage from "@/views/settings/BusinessBilling";
import NotificationSettings from "@/views/settings/NotificationSetting";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function BusinessSettingLayout() {
  const location = useLocation();
  const [activeLink,setActiveLink]=useState("Account")

  const links = [
    { name: "Account", path: "/settings/account" },
    { name: "Billing", path: "/settings/billing" },
    { name: "Notification", path: "/settings/notification" },
   
  ];

  return (
    <div className="flex md:pt-[40px] pt-0  items-start md:h-[calc(100vh-115px)] h-[calc(100vh-120px)]">
     
      <div className="flex md:flex-row flex-col gap-[20px] md:py-[15px]   px-2 items-start md:bg-white w-full md:shadow-sm md:border rounded-xl md:h-full h-[100%]">
      <div className="flex sticky top-[60px] bg-white md:rounded-none  rounded-lg left-0 lg:min-w-[200px] w-full  md:max-w-fit md:h-full  md:py-[40px] py-[20px]  md:pb-[40px]  flex-col">
        <ul className="md:flex-col md:max-w-[300px] flex-row w-full  md:gap-[20px] gap-[5px]  flex">
          {links.map((link, index) => {
            
            const isActive =
              activeLink==link.name 


            return (
              <div key={index}  className="w-full" >
                <div className="relative  flex hover:cursor-pointer">
                  <li
                    className={`my-[3px] flex cursor-pointer items-center md:px-8 px-2 ${
                      isActive
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    <button onClick={() => {
                      setActiveLink(link.name)
                      
                    } } className="leading-1 ml-4">{link.name}</button>
                  </li>
                  {isActive && (
                    <div className="absolute md:block hidden right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                  )}
                </div>
              </div>
            );
          })}
        </ul>
        </div>
        <div className="md:flex-1 md:h-full px-[10px] overflow-auto no-scroll-bar">
          {activeLink == "Account" && <AccountSettings />}
          {activeLink == "Billing" && <BusinessBillingPage />}
          {activeLink=="Notification"&&<NotificationSettings/>}
       
        
        </div>
        
      </div>
    

      {/* Main content */}
   
    </div>
  );
}

export default BusinessSettingLayout;
