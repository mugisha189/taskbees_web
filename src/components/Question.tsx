import { FC } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface QuestionProps {
  question: string;
  answer: string;
  handleChange: (isExpanded: boolean) => void;
  panel: string;
  expanded: boolean;
}

const Question: FC<QuestionProps> = ({
  question,
  answer,
  handleChange,
  panel,
  expanded,
}) => {
  return (
    <section
      className={`flex accordion h-full w-full flex-wrap box rounded-xl items-center justify-center gap-4 transition-all duration-1000 overflow-hidden ${
        expanded ? "shadow-xl shadow-gray-100" : "shadow-md shadow-gray-100"
      }`}
    >
      <Accordion collapsible className="w-full  " type="single" value={expanded ? panel : ""} onValueChange={(value) => handleChange(value === panel)}>
        <AccordionItem  value={panel}>
          <div
            className={`w-full rounded-xl p-2 transition-all duration-700 miniTablet:pb-[2rem] ${
              expanded ? "shadow-xl px-[10px] shadow-[#7065F0]/20" : "shadow-md shadow-[#080F34]/5"
            }`}
          >
            <AccordionTrigger className="flex hover:no-underline px-[10px] w-full justify-between items-center rounded-xl text-lg font-medium text-[#001209] transition-all duration-700">
              <span className="text-lg hover:no-underline text-start">{question}</span>
           
            </AccordionTrigger>
            <AccordionContent className="font-normal px-[10px] text-[#001209]/50 text-sm lg:text-md">
              {answer}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Question;
