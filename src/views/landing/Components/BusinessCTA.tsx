

function BusinessCTA() {
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full max-w-[1600px] flex   items-center flex-col md:flex-row justify-center">
        <div className="flex w-full justify-between">

        <div className="flex max-[600px] flex-col gap-[20px] justify-between">

        <p className="text-[60px] max-w-[600px] font-bold"><span>Contact Us</span> to strengthen your team today.
          </p>
          <button className="bg-[#000000] w-fit py-[10px]  px-[30px] rounded-lg text-white">Contact us</button>
        </div>
        <img src="/contact_image.png" alt="" className="flex-1 h-[400px] w-full object-center" />
        </div>
      </div>
      </div>
  )
}

export default BusinessCTA