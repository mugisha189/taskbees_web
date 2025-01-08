import { Icon } from '@iconify-icon/react';

function HowSystemWork() {
  const steps = [
    { title: "Register With Us", openPosition: "The first thing to do is to register your business and create a profile.", icon: <Icon icon="qlementine-icons:money-16" width="40" height="40"></Icon> },
    { title: "Post Jobs", openPosition: "Describe the role, required skills, and pay rate.", icon: <Icon icon="icon-park-twotone:success" width="32" height="32"></Icon> },
    { title: "Find Talent", openPosition: "Browse candidates or let us match you with the right fit.", icon:<Icon icon="uil:technology" width="24" height="24"></Icon> },
    { title: "Hire & Manage", openPosition: "Connect, interview, and manage payments all through our platform.", icon:<Icon icon="et:search" width="33" height="32"></Icon> },
   
  ];

  return (
    <div className="flex w-full px-[15px] bg-[#ecf6ff] flex-col items-center gap-[20px] py-[120px] justify-center">
      <p className="text-[40px] font-[400]">How System Works

      </p>
      <p>
      How TaskBee Works in the reality

</p>
    <div
      className="grid w-full max-w-[1600px]  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className="p-6 flex flex-col gap-[20px]   items-center text-center"
        >
          <div className="text-4xl bg-white size-[100px] hover:bg-[#000000] transition-all duration-200 text-gray-800 ease-in-out hover:scale-[1.02] hover:text-white rounded-full flex items-center justify-center mb-4">
           {step.icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {step.title}
            </h4>
            <p className="text-sm text-gray-500 mt-2">
              {step.openPosition} 
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default HowSystemWork;
