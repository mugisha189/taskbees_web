import FeaturedCard from "@/components/business/FeaturedCard"


function FeaturedCompany() {
  const data = [
    {
      company_name: "Izzy",
      cover_image: "https://res.cloudinary.com/dxpspmyig/image/upload/v1723063925/d6anwhhandv26jfkqbxf.png",
      open_positions: 1,
      location: "New York, USA",
    },
    {
      company_name: "SW Engineers Ltd.",
      cover_image: "https://res.cloudinary.com/dxpspmyig/image/upload/v1722884008/svu9wkgscl0jxxsto1pn.png",
      open_positions: 1,
      location: "Kigali-ville ~ Rwanda",
    },
    {
      company_name: "Izzy",
      cover_image: "https://res.cloudinary.com/dxpspmyig/image/upload/v1723063925/d6anwhhandv26jfkqbxf.png",
      open_positions: 1,
      location: "New York, USA",
    },
    {
      company_name: "SW Engineers Ltd.",
      cover_image: "https://res.cloudinary.com/dxpspmyig/image/upload/v1722884008/svu9wkgscl0jxxsto1pn.png",
      open_positions: 1,
      location: "Kigali-ville ~ Rwanda",
    },
  
  ]
  return (
    <div className="w-full bg-[#f5f2ef] px-[15px] flex flex-col justify-center gap-[40px] items-center py-[80px]">
     <p className=" font-semibold text-[34px] w-full text-start max-w-[1600px]">Featured Companies</p>
    <div className="grid xl:grid-cols-4  lg:grid-cols-3 gap-[20px] w-full max-w-[1600px] ">
      {
        data.map((item, index) => {
          return (
            <FeaturedCard key={index} company={item} />
          )
        }
      )
      }

    </div>
    </div>
  )
}

export default FeaturedCompany