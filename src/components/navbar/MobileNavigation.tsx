import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { navigationItems } from "./data";
import { useNavigate } from "react-router-dom";

function MobileNavigation({
  showMobileNavigation,
  setShowMobileNavigation,
}: {
  showMobileNavigation: boolean;
  setShowMobileNavigation: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  console.log(setShowMobileNavigation)
  // State to track open/close status for each parent menu
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the menu's open/close state
    }));
  };

   const navigate=useNavigate()
  return (
    <div
      className={`flex md:hidden h-screen z-[300] fixed w-[85vw] transition-all duration-300 min-w-[280px] max-w-[300px] flex-col px-[30px] bg-white ${
        showMobileNavigation ? "translate-x-0" : "translate-x-[-700px]"
      }`}
    >
      <ul className="flex flex-col gap-[20px] py-[20px] w-full">
        {navigationItems.map((item, index) => (
          <li className="w-full flex flex-col items-start" key={index}>
            {item.children && item.children.length > 0 ? (
              <>
                {/* Parent Menu Item */}
                <button
                  onClick={() => toggleMenu(index)}
                  className="flex items-center justify-between w-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-in-out"
                >
                  {item.title}
                  <FiChevronDown
                    className={`text-navy-700 dark:text-white transform transition-transform ${
                      openMenus[index] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Child Menu */}
                {openMenus[index] && (
                  <ul className="bg-white rounded-lg w-full py-[10px] px-[10px] mt-[5px]">
                    {item.children.map((child, childIndex) => (
                      <li
                        className="flex items-center gap-[10px] py-[5px]"
                        key={childIndex}
                      >
                        <a
                          href={child.href}
                          className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-in-out"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Regular Menu Item (No Children)
              <a
                href={item.href}
                className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-in-out"
              >
                {item.title}
              </a>
            )}
          </li>
        ))}
          
      </ul>
      <button onClick={()=>{navigate("/login")}} className="bg-[#000000]  mt-2 text-white font-[600] hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-lg items-center justify-center px-6 py-3 text-sm">
          Get Started
        </button>
    </div>
  );
}

export default MobileNavigation;
