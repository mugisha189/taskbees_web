import { ReactNode } from "react";
interface TimelineItem {
    date: string;
    title: string;
    description: string;
}

interface TimeLineProps {
    items: TimelineItem[];
    hideSeparator?: boolean;
}

function TimeLine({ data }: { data: TimeLineProps }) {
  return (
      <div className="flex gap-[10px] px-[10px] flex-col ">
          {
              data.items.map((item, index) => {
                  return (
                      <div className="flex gap-[20px]" key={index}>
                          <div className="flex min-h-[150px]  h-full flex-col gap-[2px] items-center ">
                              <TimeLineLabel>
                                  <div className="size-8 flex items-center justify-center rounded-full bg-brand-50  text-brand-400 py-[10px]">
                                      {index + 1}
                                      
                                  </div>
                              </TimeLineLabel>
                              <div className={`bg-gray-300 w-[1px] h-full  flex-1  ${(index+1)==data.items.length?"hidden":"block"} ${data.hideSeparator?"hidden":""}`}></div>
                          </div>
                          <div className="flex w-full flex-col gap-[10px]">
                              <div className="flex w-full justify-between">
                                  <p>{item.title}</p>
                                  <p>{item.date}</p>
                              </div>
                              <p>{item.description}</p>
                          </div>
                      </div>
                  )
          }
          )}
    </div>
  );
}
function TimeLineLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-gray-600">{children}</p>
    </div>
  );
}

export default TimeLine;
