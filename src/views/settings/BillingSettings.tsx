import { DollarSign } from "lucide-react";

const BillingSettings = () => {
  return (
    <div className="col-span-8 overflow-hidden h-full rounded-xl w-full sm:bg-gray-50 sm:px-8 sm:shadow">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">Billing settings</h1>
        {/* <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
      </div>
      <hr className="mt-4 mb-8" />

      <div className="flex flex-col lg:flex-row lg:flex-wrap  gap-[30px]">
        <div className="bg-white rounded-xl flex-1 w-full md:min-w-[300px] h-[120px] p-4">
          <div className="flex justify-between">
            <div className="flex-col flex">
              <p className="text-[24px] text-gray-700 font-bold">Earning</p>
              <p className="text-[28px] font-[500]">$0</p>
            </div>
            <div className="rounded-xl bg-[#000000] size-[50px] text-white flex items-center justify-center">
<DollarSign/>
            </div>
        </div>
        </div>
        <div className="bg-white flex-1 rounded-xl md:min-w-[300px] w-full h-[120px] p-4">
          <div className="flex justify-between">
            <div className="flex-col flex">
              <p className="text-[24px] text-gray-700 font-bold">Available</p>
              <p className="text-[28px] font-[500]">$0</p>
            </div>
            <div className="rounded-xl bg-[#000000] size-[50px] text-white flex items-center justify-center">
<DollarSign/>
            </div>
        </div>
        </div>
   </div>
     


      <hr className="mt-4 mb-8" />

      <div className="mb-10">
        <p className="py-2 text-xl font-semibold">Withdraw fund </p>
 
        <p className="mt-2 mb-2">
           Withdrawal can take up to 3 business day to complete.
        </p>
        <button className="ml-auto bg-green-600 text-white h-[40px] rounded-md px-[10px] text-sm font-semibold">
        Withdraw
        </button>
      </div>
    </div>
  );
};

export default BillingSettings;
