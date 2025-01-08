import { PlayCircle } from "lucide-react";
import Testimonials from "./Components/Testimonial";
import FinalCTA from "./Components/FinalCTA";
import HowSystemWork from "./Components/HowSystemWork";
import BusinessCTA from "./Components/BusinessCTA";

function ForBusiness() {
  return (
   <>
      <div className="w-full bg-[#000000] text-white px-[20px] flex-1 min-h-[1000px]   flex md:justify-center  flex-col md:flex-row">
        <div className="w-full max-w-[1600px] pt-[70px]">
          <div className=" w-full flex flex-col xl:flex-row items-center justify-between gap-10 mt-20">
            <div className="flex flex-col gap-[20px]">
              <h1 className="md:text-[92px] text-[60px] md:leading-[100px] leading-[60px] font-bold text-start text-slate-900 dark:text-white">
              Connecting Talent with Opportunity

              </h1>
              <p className="text-white opacity-50 font-[500]">
              Discover your next great hire on TaskBee by connecting Talent with Opportunity.


              </p>
              <p className="font-bold text-brand-500">Start your journey today!</p>
              <div className="flex gap-6">

              <button className="bg-brand-500 w-fit text-[#000000] font-[600] hover:scale-[1.02] transition-all duration-300 ease-in-out  rounded-lg flex items-center justify-center px-6 py-3 text-sm">
                Post Job Now
                </button>
                <button className="flex gap-[20px] items-center justify-center text-brand-400 ">
                  <PlayCircle className="text-[40px]" size={40} />
                  <p className="font-semibold">Watch Video</p>
                </button>
              </div>
            </div>
            <div className="w-full flex relative z-[0]  items-center justify-center">
              <img
                src="/business_hero.svg"
                alt="hero"
                className="w-full max-w-[700px]"
              />
      
            </div>
          </div>
        </div>
      </div>
      <HowSystemWork />
      <Testimonials />
      <BusinessCTA/>
      <FinalCTA />
    
    </>
  );
}

export default ForBusiness;
