

function TestimonialCard({testimonies}:{testimonies:any}) {
  return (
    <div className="p-[20px] md:w-[calc(100%-20px)] w-[calc(100%-10px)] h-[300px] shadow-xl shadow-[#f0ffff5] bg-white rounded-lg  border">
      <div className="flex  flex-col h-full justify-between">
        <div className="flex w-full py-[10px]  justify-between">
          <p className="font-[400] text-[18px]">
            {testimonies.title}
          </p>
          <img className="mt-[-20px] h-[30px]"  src="/quote-icon.png"/>
        </div>
        <div className="flex flex-1 pt-[20px] gap-[10px]">
        
          <p className="text-gray-600">
            {testimonies.description}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif" alt="" className="w-[80px] rounded-lg" />
            <div className="flex flex-col gap-2">
            <p className="text-gray-600">
            {testimonies.user.name}
              </p>
              <p className="text-gray-600">
            {testimonies.user.role}
          </p>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default TestimonialCard