import React, { useEffect, useRef, useState } from 'react';
import { Column } from '@antv/g2plot';

interface DataItem {
  category: string;
  type: string;
  value: number;
}

interface StackedColumnChartProps {
  apiUrl: string;
}

const StackedColumnChart: React.FC<StackedColumnChartProps> = ({ apiUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        // Transform the API response to match the chart data format
        const transformedData: DataItem[] = result.flatMap((item: any) => [
          { category: item.category, type: 'Total Startups', value: item.total_startups },
          { category: item.category, type: 'Verified Startups', value: item.verified_startups },
        ]);

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (containerRef.current && data.length > 0) {
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
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        margin: '0 auto',
        height: '500px',
      }}
    />
  );
};

export default StackedColumnChart;
