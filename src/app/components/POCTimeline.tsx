import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

// Define a type for the chart data
type ChartData = (string | Date)[][];

const TimelineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>([
    [
      "POC",
      "Task",
      "Start Date",
      "End Date"
    ],
  ]);
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch("http://localhost:8000/api/poc-data/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched data:", data);
    
        if (Array.isArray(data) && data.length > 0) {
          const transformedData = data.map((item: any) => [
            item.poc_name,
            item.task,
            new Date(item.start_date),
            new Date(item.end_date),
          ]);
          console.log("Transformed data:", transformedData);

          // Set the new data and mark data as fetched
          setChartData((prevData) => {
            const newData = [...prevData, ...transformedData];
            console.log("Updated chartData:", newData);
            return newData;
          });
          
        } else {
          console.warn("Received empty data array or invalid format");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []); // Add dataFetched as a dependency

  const options = {
    timeline: {
      colorByRowLabel: false,
    },
    backgroundColor: "#fff",
  };

  return (
    <Chart
      chartType="Timeline"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
    />
  );
};

export default TimelineChart;