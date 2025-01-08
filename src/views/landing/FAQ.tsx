;
import Question from '@/components/Question';
import { useState } from 'react';

const Faq = () => {
  const [questions] = useState([
    {
        question: "Why won't my payment go through?",
        answer:
            "Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.",
        panel: "panel1",
    },
    {
        question: "How do I get a refund?",
        answer:
            "Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.",
        panel: "panel2",
    },
    {
        question: "How do I redeem a coupon?",
        answer:
        "Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.",
        panel: "panel3",
    },
    {
        question: "Changing account name",
        answer:
            "Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.",
        panel: "panel4",
    },
    {
        question: "How does the platform ensure the privacy and security of user data during transactions?",
        answer:
  
        "Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.",
        panel: "panel5",
    },
]);

    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (panel: string) => (isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className='flex flex-col items-center relative pt-20 pb-20 md:gap-10  gap-2 px-6 overflow-hidden  '>
        <div className=" flex items-center w-full mt-[30px] flex-col">
            {/* Icons */}

          
            <div className=" w-full  flex md:flex-row flex-col gap-[20px] justify-between items-center">
              <div className='flex w-full flex-col items-center'>
                <h1 className=" text-dark mb-2 md:text-[30px] md:text-center text-start w-full font-[500] text-[25px]  ">
                Frequently Asked Questions
                </h1>
                <p className=" md:text-[30px] text-[20px]  font-[500] max-w-[1600px] text-light-gray-2 text-start w-full  ">
                Payments

                </p>
              </div>
             
            </div>
          </div>
          
            <div className="flex  max-w-[1600px] flex-wrap justify-center gap-5 w-full">
                {questions.map((question, idx) => (
                    <Question
                        key={idx}
                        expanded={expanded === question.panel}
                        handleChange={handleChange(question.panel)}
                        question={question.question}
                        panel={question.panel}
                        answer={question.answer}
                    />
                ))}
            </div>
        </div>
    );
}
export default Faq;