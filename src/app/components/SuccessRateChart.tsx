import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/poc/');
        const result = await response.json();

        // Assuming the result is an array of objects with status and count
        const labels = result.map((item: { status: string }) => item.status);
        const dataValues = result.map((item: { count: number }) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'POC Status',
              data: dataValues,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart options
  // const options: ChartOptions<'bar'> = {
  //   indexAxis: 'y', // This makes the chart horizontal
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };


  

  const options = {
    indexAxis: 'y', // For horizontal bar charts, adjust if needed
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
          size: 14,
        },
        formatter: (value: number) => value, // Show the count inside the pie
        anchor: 'center', // Ensure the label is anchored inside the pie slice
        align: 'center', // Center-align the label inside the pie
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio to control size
    responsive: true,
  };
  


  return (
    <div style={{ width: '600px', height: '400px' , margin:'0 auto'}}>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default HorizontalBarChart;
