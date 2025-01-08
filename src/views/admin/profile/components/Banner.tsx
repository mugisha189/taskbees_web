import banner from "@/assets//img/profile/banner.png";
import Card from "@/components/card";
import { socialMedia } from "@/variables/socials";

const Banner = ({user}:any) => {
  
  return (
    <Card extra={"items-center w-full h-fit p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={user?.profile?.profilePhoto} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {user?.profile.fullnames}       </h4>
        <p className="text-base font-normal text-gray-600">Product Manager</p>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2">
          {socialMedia.map((social) => {
            return (
              <div className="bg-white w-full h-auto py-8 flex items-center justify-center gap-4 flex-wrap">
<button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
{social.icon}
          </button>
          </div>
            )
          })}
        </div>
      
      </div>
     
    </Card>
  );
};

export default Banner;
