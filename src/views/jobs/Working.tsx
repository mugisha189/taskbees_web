import {  CheckCircle } from "lucide-react";
import Countdown from "react-countdown";
import {} from "antd"

function Working() {
  return (
    <div className="flex justify-center h-[100vh] items-center w-full" >
      <Countdown className="text-[48px]" date={Date.now() + 6000}>
        <div className="w-full flex flex-col gap-[20px] justify-center items-center md:w-[500px]  rounded-[20px] bg-white p-6 shadow-lg">
          <CheckCircle className="text-[50px] text-green-400" size={80} />
          <p>You have completed your job Successfully,Salary was added to your account</p>
        </div>
    
  </Countdown>,
    </div>
  )
}

export default Working