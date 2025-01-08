import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pricingPlans = [
  {
    name: "Free Trial",
    price: "Free",
    features: [
      "5 job posting",
      "3 featured job",
      "Job displayed for 15 days",
      "Premium Support 24/7",
    ],
  },
 
  {
    name: "Premium (Medium)",
    price: "€9.99",
    features: [
      "70 job posting",
      "5 featured job",
      "Job displayed for 30 days",
      "Premium Support 24/7",
    ],
    recommended: true,
  },
  {
    name: "Silver (Small)",
    price: "€4.99",
    features: [
      "30 job posting",
      "3 featured job",
      "Job displayed for 15 days",
      "Premium Support 24/7",
    ],
  },
  {
    name: "Gold (Large)",
    price: "€24.99",
    features: [
      "100 job posting",
      "10 featured job",
      "Job displayed for 60 days",
      "Premium Support 24/7",
    ],
  },
  {
    name: "Flexi-Package",
    price: "€34.99",
    features: [
      "150 job posting",
      "15 featured job",
      "Job displayed for 30 days",
      "Premium Support 24/7",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "€40.00",
    features: [
      "Unlimited job posting",
      "Unlimited featured job",
      "Job displayed for Unlimited days",
      "Premium Support 24/7",
    ],
  },
];

function Pricing() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="w-full flex justify-center items-center">
        <Tabs defaultValue="basic" className="w-full flex flex-col items-center ">
          <TabsList className="w-full max-w-[600px] bg-brand-200">
            <TabsTrigger className="w-full flex-1" value="basic">
              Basic
            </TabsTrigger>
            <TabsTrigger className="w-full flex-1" value="advanced">
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="w-full">
          <div className="grid grid-cols-1 pt-[20px] gap-4 lg:grid-cols-2 3xl:grid-cols-3 sm:items-center md:gap-8">
        {pricingPlans.slice(0,3).map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 shadow-sm sm:px-8 lg:p-12 ${
              plan.recommended ? "ring-2 h-[450px] ring-brand-600" : "border-gray-200"
            }`}
          >
            <div className="text-center">
              <h2
                className={`text-lg font-medium ${
                  plan.recommended ? "text-brand-700" : "text-gray-900"
                }`}
              >
                {plan.name}
                {plan.recommended && (
                  <p className="ml-2 text-sm text-brand-500">
                   Recommended
                  </p>
                )}
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong
                  className={`text-3xl font-bold ${
                    plan.recommended ? "text-brand-500" : "text-gray-900"
                  } sm:text-4xl`}
                >
                  {plan.price}
                </strong>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-brand-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`mt-8 block rounded-full px-12 py-3 text-center text-sm font-medium ${
                plan.recommended
                  ? "border border-brand-500 bg-brand-500 text-white hover:ring-1 hover:ring-brand-300"
                  : "border border-brand-600 bg-white text-brand-600 hover:ring-1 hover:ring-brand-600"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
          </TabsContent>
          <TabsContent value="advanced" className="w-full">
          <div className="grid grid-cols-1 pt-[20px] gap-4 lg:grid-cols-2 3xl:grid-cols-3 sm:items-center md:gap-8">
        {pricingPlans.slice(3,6).map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 shadow-sm sm:px-8 lg:p-12 ${
              plan.recommended ? "ring-2 h-[450px] ring-brand-600" : "border-gray-200"
            }`}
          >
            <div className="text-center">
              <h2
                className={`text-lg font-medium ${
                  plan.recommended ? "text-brand-700" : "text-gray-900"
                }`}
              >
                {plan.name}
                {plan.recommended && (
                  <p className="ml-2 text-sm text-brand-500">
                   Recommended
                  </p>
                )}
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong
                  className={`text-3xl font-bold ${
                    plan.recommended ? "text-brand-500" : "text-gray-900"
                  } sm:text-4xl`}
                >
                  {plan.price}
                </strong>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-brand-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`mt-8 block rounded-full px-12 py-3 text-center text-sm font-medium ${
                plan.recommended
                  ? "border border-brand-500 bg-brand-500 text-white hover:ring-1 hover:ring-brand-300"
                  : "border border-brand-600 bg-white text-brand-600 hover:ring-1 hover:ring-brand-600"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
          </TabsContent>
        </Tabs>
      </div>

   
    </div>
  );
}

export default Pricing;
