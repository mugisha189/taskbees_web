/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// Pie chart options
const chartOptions = {
  labels: [],
  colors: ["#00B87C", "#EFF4FB"],
  chart: {
    type: "donut",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "75%",
        labels: {
          show: false,
        },
      },
      expandOnClick: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    colors: ["#00B87C", "#EFF4FB"],
  },
};

const ProfileCompletion = ({
  tasks,
  completeness,
}: {
  tasks: any[];
  completeness: {
    total: number;
    composition: Record<string, number>;
    missingFields: Record<string, string[]>;
  };
}) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const [chartData, setChartData] = useState([0, 100]);
  const [completionPercentage, setCompletionPercentage] = useState(
    Math.round((completeness.total / 100) * 100)
  );

  useEffect(() => {
    setCompletionPercentage(Math.round((completeness.total / 100) * 100));
    setChartData([completionPercentage, 100 - completionPercentage]);
  }, [completeness, tasks]);

  const toggleTask = (key: string) => {
    setExpandedTask((prev) => (prev === key ? null : key));
  };

  return (
    <div className="md:min-w-[300px] md:h-full h-fit md:w-[350px] p-6 bg-white mt-2 rounded-lg shadow-md font-sans">
      {/* Header */}
      <h3 className="text-lg font-semibold text-center mb-6">
        Complete your profile
      </h3>

      {/* Circular progress */}   
      <div className="relative flex items-center justify-center mx-auto">
        <Chart
          options={chartOptions as any}
          series={chartData}
          type="donut"
          width="200"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-green-500">
          {completionPercentage}%
        </div>
      </div>

      {/* Task List */}
      <div className="mt-8 space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-col">
            {/* Task Header */}
            <div
              onClick={() => toggleTask(task.key)}
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <span className="mr-2">{task.completed ? "✔️" : "❌"}</span>
              <span className="flex-1 ml-2">{task.name}</span>
              <span
                className={`ml-auto font-medium ${
                  task.completed ? "text-green-500" : "text-red-500"
                }`}
              >
                +{task.weight}%
              </span>
            </div>

            {/* Missing Fields */}
            {expandedTask === task.key && !task.completed && (
              <div className="ml-6 mt-2">
                {completeness.missingFields[task.key]?.length > 0 ? (
                  completeness.missingFields[task.key].map(
                    (field, fieldIndex) => (
                      <div key={fieldIndex} className="text-red-500 text-sm">
                        {field.replace(/_/g, " ").toLowerCase()}
                      </div>
                    )
                  )
                ) : (
                  <div className="text-gray-500 text-sm">Add {task}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletion;
