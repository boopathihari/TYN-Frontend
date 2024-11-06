
import { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';

interface DataItem {
  category: string;
  type: string;
  value: number;
}

const data: DataItem[] = [
  { category: 'GenAI', type: 'Total Startups', value: 40 },
  { category: 'GenAI', type: 'Verified Startups', value: 30 },
  { category: 'ML', type: 'Total Startups', value: 35 },
  { category: 'ML', type: 'Verified Startups', value: 20 },
  { category: 'Software Dev', type: 'Total Startups', value: 50 },
  { category: 'Software Dev', type: 'Verified Startups', value: 25 },
  { category: 'Cybersec', type: 'Total Startups', value: 45 },
  { category: 'Cybersec', type: 'Verified Startups', value: 15 },
  { category: 'Connectivity', type: 'Total Startups', value: 30 },
  { category: 'Connectivity', type: 'Verified Startups', value: 10 },
  { category: 'AR/MR/VR', type: 'Total Startups', value: 28 },
  { category: 'AR/MR/VR', type: 'Verified Startups', value: 14 },
  { category: 'Cloud and Edge', type: 'Total Startups', value: 38 },
  { category: 'Cloud and Edge', type: 'Verified Startups', value: 22 },
  { category: 'Quantum Tech', type: 'Total Startups', value: 40 },
  { category: 'Quantum Tech', type: 'Verified Startups', value: 18 },
  { category: 'Robotics', type: 'Total Startups', value: 42 },
  { category: 'Robotics', type: 'Verified Startups', value: 20 },
];

const StackedColumnChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const stackedColumnPlot = new Column(containerRef.current, {
        data,
        isGroup: true,
        xField: 'category',
        yField: 'value',
        seriesField: 'type',
        color: ['#1ca9e6', '#f88c24'], 
        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ],
        },
      });

      stackedColumnPlot.render();

      return () => {
        stackedColumnPlot.destroy();
      };
    }
  }, []);

  return <div ref={containerRef} style={{
    width: '100%',
    // maxWidth: '1200px', // Set desired maximum width here
    margin: '0 auto', // Center align if needed
    height: '500px',  // Adjust height as needed
  }}
/>;
};

export default StackedColumnChart;
