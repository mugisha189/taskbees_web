
import { Icon } from '@iconify-icon/react';

function Categories() {
  const categories = [
    { title: "HR", openPosition: 3, icon: <Icon icon="qlementine-icons:money-16" width="40" height="40"></Icon> },
    { title: "Customer Success", openPosition: 4, icon: <Icon icon="icon-park-twotone:success" width="32" height="32"></Icon> },
    { title: "Product & Tech", openPosition: 3, icon:<Icon icon="uil:technology" width="24" height="24"></Icon> },
    { title: "Marketing", openPosition: 3, icon:<Icon icon="et:search" width="33" height="32"></Icon> },
    {
      title: "Gastronomy", 
      openPosition: 2,
      icon:<Icon icon="ep:food" width="32" height="32" ></Icon>
    },
    { title: "Operations", openPosition: 2, icon: <Icon icon="hugeicons:promotion" width="34" height="34"></Icon> },
    { title: "Data", openPosition: 2, icon: <Icon icon="fluent:data-usage-48-regular" width="32" height="32"></Icon> },
    { title: "Legal", openPosition: 1, icon: <Icon icon="mingcute:vector-bezier-line" width="24" height="24"></Icon> },
    {
      title: "Finance",
      openPosition: 3,
      icon: <Icon icon="carbon:finance" width="32" height="32"></Icon>,
    },
  ];

  return (
    <div className="flex w-full px-[15px] bg-[#ecf6ff] flex-col items-center gap-[40px] py-[120px] justify-center">
      <p className="text-[40px] font-[400]">Popular Job Categories
      </p>

    <div
      className="grid w-full max-w-[1600px]  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white  rounded-lg p-6 flex gap-[30px] border  items-center text-center"
        >
          <div className="text-4xl bg-gray-200 size-[80px] hover:bg-[#000000] transition-all duration-200 text-gray-800 ease-in-out hover:scale-[1.02] hover:text-white rounded-md flex items-center justify-center mb-4">
           {category.icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {category.title}
            </h4>
            <p className="text-sm text-gray-500 mt-2">
              ({category.openPosition} open positions)
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Categories;