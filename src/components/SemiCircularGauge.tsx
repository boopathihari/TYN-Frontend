import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

type SemiCircularGaugeProps = {
  endpoint: string;
  labels: string[];
  backgroundColors: string[];
  hoverBackgroundColors: string[];
  size?: number;
  cutoutPercentage?: string;
  statusKeys: { receivedKey: string; acceptedKey: string };
};

const SemiCircularGauge: React.FC<SemiCircularGaugeProps> = ({
  endpoint,
  labels,
  backgroundColors,
  hoverBackgroundColors,
  size = 300,
  cutoutPercentage = '70%',
  statusKeys,
}) => {
  const [data, setData] = useState<{ accepted: number; received: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        const accepted = result.find(
          (item: any) => item[statusKeys.acceptedKey]?.toLowerCase() === 'accepted' || item[statusKeys.acceptedKey]?.toLowerCase() === 'active'
        )?.count || 0;

        const received = result.find(
          (item: any) => item[statusKeys.receivedKey]?.toLowerCase() === 'received' || item[statusKeys.receivedKey]?.toLowerCase() === 'inactive'
        )?.count || 0;

        setData({ accepted, received });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint, statusKeys]);

  const chartData = {
    labels,
    datasets: [
      {
        label: '',
        data: data ? [data.accepted, data.received] : [0, 0],
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 0,
        cutout: cutoutPercentage,
        rotation: 270,
        circumference: 180,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: '#495057', 
        font: {
          weight: 600,
          size: 14, 
        },
        formatter: (value: number) => value, // Display only the count
        anchor: 'center',
        align: 'center',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        bottom: 10,
      },
    },
    cutout: cutoutPercentage,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: `${size}px`, height: `${size-90}px` }}>
        {data ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex justify-around w-full text-sm font-semibold text-gray-600">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: backgroundColors[index] }}
            ></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemiCircularGauge;
