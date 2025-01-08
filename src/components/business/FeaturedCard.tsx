import { IoLocationOutline } from "react-icons/io5";
function FeaturedCard({company,key}:{company:any,key:any}) {
  return (
    <div key={key} className=' border  p-[30px] bg-white items-center flex rounded-lg  w-full h-fit  flex-col gap-[30px] '>
      <div className="">
        <img src={company.cover_image} className='w-[100px]' />
        
      </div>
      <p>
        {company.company_name}
      </p>
      <div className="flex gap-2 items-center">
        <IoLocationOutline />
        <p>{company.location}</p>

      </div>
      <button className="bg-[#e2ebf9] text-[#000000]  hover:scale-[1.02] hover:bg-[#000000] hover:text-white transition-all duration-300 ease-in-out w-full  rounded-lg flex items-center justify-center px-6 py-5 text-sm">
        {company.open_positions} Open Positions
      </button>
    </div>
  )
}

export default FeaturedCard