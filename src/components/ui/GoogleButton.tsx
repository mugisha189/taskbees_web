import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"
import GoogleIcon from "/google_logo.svg"
import Spinner from "../loader/Spinner"


function GoogleButton({onClick,style,loading}:{onClick:MouseEventHandler<HTMLButtonElement>,style?:string,loading?:boolean}) {
  return (
    <button type="button" className={cn(`bg-transparent border-[1px] border-[#23326863] w-full rounded-[15px] gap-[10px] text-[#000D3B] font-poppins py-[14px] flex items-center justify-center text-[18px] font-[600] ${style}`)} onClick={onClick}>
     
      
      {loading ?
          <div className="relative flex items-center justify-center w-full">
            
                        <Spinner/>
                        <div className="flex items-center gap-[10px]">
            <img src={GoogleIcon} />
            Continue with Google
                     </div>
                   
          </div>
          
          : <div className="flex items-center gap-[10px]">
            <img src={GoogleIcon} />
            Continue with Google
                     </div>}
                   
                
   
    </button>
  )
}

export default GoogleButton