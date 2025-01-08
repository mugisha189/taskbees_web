import Footer from "@/components/footer"
import LandingNavbar from "@/components/navbar/Landing"
import { Outlet } from "react-router-dom"


function LandingLayout() {
  return (
    <div className="flex flex-col items-center justify-center">
      <LandingNavbar />
      
      <Outlet />
      <Footer />
    </div>
  )
}

export default LandingLayout