import { Popover } from "antd";
import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import MobileNavigation from "./MobileNavigation";
import { GrClose } from "react-icons/gr";
import { navigationItems } from "./data";
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <nav
      id="animated-navbar"
      className={`fixed z-[30] top-0 bg-white left-0 h-[90px]  py-[12px] w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto md:px-[60px] px-[20px] py-3 h-full flex items-center justify-between">
        <div className="flex items-center gap-[80px] font-[500]">
          <img src="/logo.png" alt="logo" className="size-14" />

          {/* Navigation Items */}
          <ul className="lg:flex hidden text-[#000000] gap-[10px] space-x-4">
            {navigationItems.map((item, index) => (
              <li
                className="w-full min-w-fit flex flex-col items-start"
                key={index}
              >
                {item.children && item.children.length > 0 ? (
                  <Popover
                    placement="bottom"
                    content={
                      <ul className="bg-white rounded-lg w-full py-[10px] px-[10px] mt-[5px]">
                        {item.children.map((child, childIndex) => (
                          <li
                            className="flex items-center gap-[10px] py-[5px]"
                            key={childIndex}
                          >
                            <a
                              href={child.href}
                              className="text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out"
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    }
                    trigger="hover"
                  >
                    <button className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out">
                      {item.title}
                      <FiChevronDown className="text-navy-700 transform transition-transform" />
                    </button>
                  </Popover>
                ) : (
                  // Regular Menu Item (No Children)
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out"
                  >
                    {item.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* "Get Started" Button */}
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-[#000000] lg:flex hidden text-white font-[600] hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-lg items-center justify-center px-6 py-3 text-sm"
        >
          Get Started
        </button>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden block"
          onClick={() => {
            setShowMobileNavigation(!showMobileNavigation);
          }}
        >
          {showMobileNavigation ? <GrClose /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        showMobileNavigation={showMobileNavigation}
        setShowMobileNavigation={setShowMobileNavigation}
      />
    </nav>
  );
};

export default LandingNavbar;
