
import { BriefcaseBusiness, Check, Mail, UploadCloud } from "lucide-react";
import FeaturedJob from "./Components/FeaturedJob";
import Testimonials from "./Components/Testimonial";
import FeaturedCompany from "./Components/FeaturedCompany";
import CTA from "./Components/CTA";
import FinalCTA from "./Components/FinalCTA";
import Categories from "./Components/Categories";

function LandingPage() {
  return (
   <>
      <div className="w-full bg-brand-300 px-[20px] flex-1 min-h-[1000px]   flex md:justify-center  flex-col md:flex-row">
        <div className="w-full max-w-[1600px] pt-[70px]">
          <div className=" w-full flex flex-col xl:flex-row items-center justify-between gap-10 mt-20">
            <div className="flex flex-col gap-[20px]">
              <h1 className="md:text-[92px] text-[60px] md:leading-[100px] leading-[60px] font-bold text-start text-slate-900 dark:text-white">
                Connecting talent with opportunity.
              </h1>
              <p className="text-gray-800">
                Join the vibrant community where businesses and opportunity
                seekers unite to create meaningful connections.
              </p>
              <p className="font-bold">Start your journey today!</p>
              <button className="bg-[#000000] w-fit text-white font-[600] hover:scale-[1.02] transition-all duration-300 ease-in-out  rounded-lg flex items-center justify-center px-6 py-3 text-sm">
                Get Started
              </button>
            </div>
            <div className="w-full flex relative z-[0]  items-center justify-center">
              <img
                src="/hero1.png"
                alt="hero"
                className="w-full max-w-[600px]"
              />
              <div className="absolute top-0 left-0 md:flex hidden bg-white p-[20px]  justify-between gap-[20px] rounded-md">
                <div className="rounded-md size-[50px] flex items-center justify-center bg-brand-100">
                  <Mail className="text-brand-600" />
                </div>
                <div className="">
                  <p>Work Inquiry From</p>
                  <p>Ali Tufan</p>
                </div>
              </div>
              <div className="absolute top-[20px] right-0 bg-white p-[20px] flex flex-col items-center  gap-[20px] rounded-md">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-center">10k+ Job seekers</p>
                  <img src="/multi-peoples.png" />
                </div>
              </div>
              <div className="absolute  md:flex hidden right-0 bg-white p-[20px]  justify-between items-center gap-[20px] rounded-md">
                <div className="rounded-full size-[50px] flex items-center justify-center bg-red-200">
                  <BriefcaseBusiness className="text-brand-600" />
                </div>
                <div className="">
                  <p>Creative Agency</p>
                  <p>Startup</p>
                </div>
                <div className="rounded-full size-[40px] flex items-center justify-center bg-red-200">
                  <Check className="text-brand-600" />
                </div>
              </div>
              <div className="rounded-md bg-white absolute bottom-[100px] shadow-md z-[20] left-0 size-[80px] flex items-center justify-center ">
                <UploadCloud />
              </div>
              <div className="absolute bottom-[40px] left-[20px] bg-white p-[20px] flex justify-between gap-[20px] rounded-md">
                <div className="rounded-md size-[40px] flex items-center justify-center "></div>
                <div className="">
                  <p className="font-[400]">Upload Your CV</p>
                  <p>It only takes a few seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Categories />
      <FeaturedJob />
      <CTA />
      <Testimonials />
      <FeaturedCompany />
      <FinalCTA />
    
    </>
  );
}

export default LandingPage;
