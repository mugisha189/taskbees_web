
import { RootState } from "@/store/store";
import { Mail, PhoneIcon } from "lucide-react";
import { GrLocation } from "react-icons/gr";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyBusinessProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate=useNavigate()
  console.log(user)
  return (
    <div className="flex flex-col h-[calc(100vh-100px)]  gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
           
          
            <img src={user?.cover_photo} alt="" className="w-full h-full rounded-full object-cover" />
          </div>

          {/* Company Info */}
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800">{ user?.company_name?user.company_name:""}</h2>
            <div className="flex gap-3 mt-3">
              <div className="flex gap-2 text-gray-500">
                <GrLocation/>
                <p className="text-gray-600">{user?.location?user.location:""}</p>
              </div>
              <div className="flex gap-2 text-gray-500">
              <PhoneIcon/>
                <p className="text-gray-600">{ user?.phone_number?user.phone_number[0]:""}</p>
              </div>
              <div className="flex gap-2 text-gray-500">
<Mail/>
                <p className="text-gray-600">{user?.company_email?user?.company_email:""}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Open Jobs – 0
          </button> */}
          <a href="/employer/profile/edit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Edit Profile
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col h-full flex-1 overflow-hidden bg-white  p-3 rounded-lg lg:flex-row gap-6">
        {/* About Text */}
        <div className="flex-1 p-6  overflow-auto no-scrollbar">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About {user?.company_name?user?.company_name:"Company"}</h3>
          <p className="text-gray-600 leading-relaxed">
            {
              user?.description?.map((desc) => (
                <p>{desc}</p>
              ))
            }
         
          </p>
          <div className="md:h-[500px] h-68 mt-[20px] rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
                            <MapContainer
                              center={[25.7617, -80.1918]} 
                              zoom={13}
                              scrollWheelZoom={false}
                              className="w-full h-full"
                            >
                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                              <Marker position={[25.7617, -80.1918]} />
                            </MapContainer>
                          </div>

        </div>


        {/* Company Details */}
        <div className="w-full lg:w-[350px] bg-gray-50    p-6 rounded-lg ">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Company Details</h3>
          <ul className="text-gray-600">
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Company size:</span>
            {user?.company_size}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Phone:</span> {user?.phone_number?user.phone_number[0]:"Not specified"}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Email:</span> {user?.company_email}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Location:</span>{user?.location}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Founded Date:</span>{user?.founded_date}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Website :</span>
              <a href={user?.website_url} target="_blank" rel="noreferrer">
                {user?.website_url?user?.website_url.split("/")[2]:"Not specified"}
              </a>
             
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="font-bold text-gray-800">Social Media:</span>
              {
                user.social_networks&&user.social_networks.length>0&&user.social_networks.map((social) => (
                  <div className="flex gap-2">
                    <a
                      href={social}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                      aria-label="Facebook"
                    >
                      <span className="text-gray-800">{social!=null?social.split("/")[3][0]:social}</span>
                    </a>
                  </div>
                ))
              }
            
              <div className="flex gap-2">
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="Facebook"
                >
                  F
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="Twitter"
                >
                  T
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="LinkedIn"
                >
                  L
                </a>
              </div>
                
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyBusinessProfile;
