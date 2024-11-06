"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Define types for data
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const EnterpriseEngagementChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/enterprise-engagement/');
        const data = await response.json();

        console.log("Fetched data:", data);

        const labels = data.map((item: any) => item.industry);
        const engagementData = data.map((item: any) => item.engagement);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Engagement',
              data: engagementData,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#FF6384', '#36A2EB', '#FFCE56'
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };


  const options = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      datalabels: {
        color: 'black', // Text color
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
        borderRadius: 5, // Rounded corners for the badge effect
        padding: {
          top: 6,
          right: 6,
          bottom: 6,
          left: 6,
        },
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value: number) => value, // Show the count inside the pie
        anchor: 'center' as const, // Ensure the label is anchored inside the pie slice
        align: 'center' as const, // Center-align the label inside the pie
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio to control size
    responsive: true,
  };


  return (
    <div style={{ width: '600px', height: '400px' , margin:'0 auto'}}>
        <Bar data={chartData} options={options} />
    </div>
  );
};

export default EnterpriseEngagementChart;
