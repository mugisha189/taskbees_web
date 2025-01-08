import React from "react";

interface SectionData {
  title: string;
  items: { label: string; description: string }[];
}
interface CardData {
  title: string;
  subtitle: string;
  description: string;
  benefits: { label: string; description: string }[];
  footer: {
    question: string;
    buttonText: string;
  };
}
const HowTaskBeeWorks: React.FC = () => {
  const sections: SectionData[] = [
    {
      title: "For Job Seekers",
      items: [
        {
          label: "Create Your Profile",
          description:
            "Highlight your skills, interests, and availability.",
        },
        {
          label: "Browse Jobs",
          description:
            "Use our filters to find opportunities that match your preferences.",
        },
        {
          label: "Apply & Connect",
          description:
            "Send applications or express interest in jobs. Chat with employers directly.",
        },
        {
          label: "Work & Earn",
          description:
            "Complete the job, get paid securely, and receive feedback.",
        },
      ],
    },
    {
      title: "For Business",
      items: [
        {
          label: "Sign Up",
          description: "Register your business and create a profile.",
        },
        {
          label: "Post Jobs",
          description: "Describe the role, required skills, and pay rate.",
        },
        {
          label: "Find Talent",
          description:
            "Browse candidates or let us match you with the right fit.",
        },
        {
          label: "Hire & Manage",
          description:
            "Connect, interview, and manage payments all through our platform.",
        },
      ],
    },
  ];
  const cards: CardData[] = [
    {
      title: "For Job Seekers",
      subtitle: "Opportunities for Job Seekers",
      description:
        "At TaskBee, we offer a wide range of job opportunities tailored to your skills and interests. Whether you are a student looking for part-time work or a young professional seeking project-based gigs, TaskBee provides a flexible platform to find the right fit.",
      benefits: [
        { label: "Flexible Hours", description: "Work when it suits you." },
        {
          label: "Diverse Roles",
          description: "Explore various industries and gain valuable experience.",
        },
        {
          label: "Secure Payments",
          description:
            "Get paid promptly and securely through our system.",
        },
        {
          label: "Skill Development",
          description:
            "Enhance your resume and build a professional network.",
        },
      ],
      footer: {
        question: "Ready to find your next gig?",
        buttonText: "Join TaskBee Today",
      },
    },
    {
      title: "For Businesses",
      subtitle: "Solutions for Businesses",
      description:
        "TaskBee simplifies the process of finding reliable, skilled workers for your business. Whether you need extra hands for a busy period or specialized skills for a project, we connect you with motivated individuals ready to step in and contribute.",
      benefits: [
        { label: "Quick Hiring", description: "Post jobs and find suitable candidates fast." },
        { label: "Quality Talent", description: "Access a pool of skilled, young professionals." },
        {
          label: "Flexible Staffing",
          description: "Hire on-demand, from short-term gigs to longer projects.",
        },
        {
          label: "Cost-Effective",
          description:
            "Only pay for the hours worked, plus a small platform fee.",
        },
      ],
      footer: {
        question: "Need extra help?",
        buttonText: "Post a Job on TaskBee",
      },
    },
  ];

  return (
    <section className="bg-gradient-to-b w-full mt-[80px] from-[#f8faff] to-[#ffffff] py-16  ">
      <div className="container mx-auto text-center">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          How TaskBee Works
        </h1>
        {/* Breadcrumb */}
        <p className="text-gray-600 mb-12">
          <a href="/" className="text-blue-500 hover:underline">
            Home
          </a>{" "}
          / How TaskBee Works
        </p>
        </div>

        <div className="bg-white md:px-6 px-3 py-[30px] w-full">
           {sections.map((section, index) => (
          <div
            key={index}
            className={`max-w-4xl mx-auto text-left ${
              index !== 0 ? "mt-12" : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {section.title}
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <strong>{item.label}:</strong> {item.description}
                </li>
              ))}
            </ol>
          </div>
           ))}
     <div className="w-full flex mt-[30px] justify-center">
      <div className="flex flex-col md:flex-row w-full border md:p-[30px] p-[10px] rounded-lg max-w-[900px] justify-center gap-4">
      {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-lg shadow-white  rounded-lg p-6 border border-gray-200"
          >
            {/* Card Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {card.title}
            </h2>
            <h3 className="text-gray-600 font-medium mb-4">{card.subtitle}</h3>

            {/* Card Description */}
            <p className="text-gray-700 mb-4">{card.description}</p>

            {/* Benefits List */}
            <h4 className="text-gray-800 font-semibold mb-2">Benefits:</h4>
            <ul className="list-decimal pl-6 space-y-2 text-gray-700">
              {card.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex}>
                  <strong>{benefit.label}:</strong> {benefit.description}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <p className="text-gray-700 mt-6 mb-4">{card.footer.question}</p>
            <button className="bg-[#000000] text-white py-2 px-4 rounded hover:bg-gray-800">
              {card.footer.buttonText}
            </button>
          </div>
        ))}
      </div>
     </div>
          
        </div>
       
    
     
    </section>
  );
};

export default HowTaskBeeWorks;
