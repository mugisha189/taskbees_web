
import Card from "@/components/card";
import DocumentComponent from "@/components/document";
import TimeLine from "@/components/ui/TimeLine";
import { RootState } from "@/store/store";
import { Empty } from "antd";
import { useSelector } from "react-redux";

const General = ({user}:{user:any}) => {
  
  const formattedEducation =user?.educations? user?.educations.map((education) => ({
    title: education.institution,
    date: `${education.start_date} - ${education.end_date}`,
    description: education.description,
    
  })):[]
  const formattedExperience =user?.experiences? user.experiences.map((experience) => ({
    title: experience.institution,
    date: `${experience.start_date} - ${experience.end_date}`,
    description: experience.description,
    
  })):[]
  const formattedAward =user?.awards? user.awards.map((award) => ({
    title: award.title,
    date: `${award.award_date}`,
    description: award.description,
    
  })):[]
  const documents = [
    {
      title: "Resume",
      url: "Resume.pdf",
      createdAt: "2023-01-01",
    },

    {
      title: "Certificate",
      url: "Certificate.pdf",
      createdAt: "2023-01-01",
    },
    
  ]
  return (
    <Card extra={"w-full lg:max-h-[760px] h-full overflow-auto  p-3"}>
      {/* Header */}
      <div className="mt-2 mb-4 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Working Experience
        </h4>
       
      </div>
      
      <TimeLine data={{
            items: formattedExperience
            
      }} />
      {
        !formattedExperience.length > 0 && <Empty/>
      }
         <div className="mt-2 mb-4 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Education
        </h4>
      </div>
      {
        !formattedEducation.length > 0 && <Empty/>
      }
      <TimeLine data={{
            items:formattedEducation
      }} />
      <div className="mt-2 mb-4 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Awards
        </h4>
      </div>
     
      <TimeLine data={{
            items:formattedAward
      }} />
      {
        !formattedAward.length > 0 && <Empty/>
      }
      {/* <div className="mt-2 mb-4 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Documents
        </h4>
        <div className="flex justify-center  items-center">
        
      </div>
        <div className="grid  py-[10px] md:grid-cols-2 grid-cols-1 gap-[10px]">
          {documents.map((document, index) => (
            <div key={index} className="flex border flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <DocumentComponent document={document} />formattedAward
            </div>
          ))}
        </div>
      
      </div> */}
      
    </Card>
  );
};

export default General;
