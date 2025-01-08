import Pricing from "@/components/pricing/pricing";
import { DollarSign } from "lucide-react";

const BusinessBillingPage = () => {
  return (
    <div className="md:col-span-8 md:w-full w-[calc(100vw-80px)]  overflow-auto h-full rounded-xl sm:bg-gray-50 md:px-8 px-4 sm:shadow">
      <div className="pt-4 w-full">
        <h1 className="py-2 text-2xl font-semibold">Billing settings</h1>
        {/* <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
      </div>
      <hr className="mt-4 mb-8" />

      <div className="flex flex-col lg:flex-row gap-[30px]">
        <div className="bg-white rounded-xl flex-1 w-full md:min-w-[300px] h-[120px] p-4 ">
          <div className="flex justify-between">
            <div className="flex-col flex">
              <p className="text-[24px] text-gray-700 font-bold">Total job posts</p>
              <p className="text-[28px] font-[500]">56</p>
            </div>
            <div className="rounded-xl bg-[#000000] size-[50px] text-white flex items-center justify-center">
<DollarSign/>
            </div>
        </div>
        </div>
        <div className="bg-white rounded-xl flex-1 w-full md:min-w-[300px] h-[120px] p-4 ">
          <div className="flex justify-between">
            <div className="flex-col flex">
              <p className="text-[24px] text-gray-700 font-bold">Remaining job post</p>
              <p className="text-[28px] font-[500]">54</p>
            </div>
            <div className="rounded-xl bg-[#000000] size-[50px] text-white flex items-center justify-center">
<DollarSign/>
            </div>
        </div>
        </div>
   </div>
     


      <hr className="mt-4 mb-8" />

      <div className="mb-10">
        <p className="py-2 text-xl font-semibold">Purchase plan to post jon </p>
 
        <p className="mt-2 mb-2">
Buy plan to start posting jobs
        </p>
       <Pricing/>
      </div>
    </div>
  );
};

export default BusinessBillingPage;
