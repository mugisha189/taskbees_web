
function FinalCTA() {
  const applicationAnalytics = [
    {
      title:"4M",
      description:"4 million daily active users"
    },
    {
      title: "12K",
      description:"Over 50 businesses register in a week"
    },
    {
      title: "20M",
      description:"Over 20 million stories shared"
    }
  ]
  return (
    <div className="flex p w-full lg:px-[100px]  py-[40px] px-[10px] flex-col items-center justify-center">
      <div className="flex md:flex-row flex-col gap-[30px] justify-between max-w-[1400px] border-b py-[120px]  w-full">
        {
          applicationAnalytics.map((analytic) => {
            return (
              <div className="flex flex-col items-center gap-[10px]">
                <p className="font-[500] text-[40px]">{analytic.title}</p>
                <p className="text-gray-600">{analytic.description}</p>

              </div>
            )
          })
      }
      </div>
      <div className="rounded-[40px]  flex justify-center mt-[40px] items-center bg-[url('/cta.png')] bg-no-repeat bg-cover w-full md:h-[500px] h-fit p-[20px]">
        <div className="flex justify-between max-w-[1500px] w-full items-center md:flex-row flex-col gap-[100px]">
          <div className="flex text-white flex-col gap-6">
            <p className="text-[40px]">Download App</p>
            <p className="max-w-[350px]">New features. New appearance. No risk and
credit card required.
            </p>
            <div className="flex gap-3">
              <button className="">
                <img src="/apple_store.svg" alt="" />
              </button>
              <button className="">
                <img src="/play_store.svg" alt="" />
              </button>

            </div>
          </div>
          <img src="/mobile_banner.png" alt="" className="max-w-[300px]" />
      </div>
      </div>
    </div>
  )
}

export default FinalCTA