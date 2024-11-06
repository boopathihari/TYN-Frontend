// components/GroupedBar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Bar } from '@antv/g2plot';

interface DataItem {
  category: string;
  type: string;
  value: number;
}

interface GroupedBarProps {
  endpoint: string;
  categoryKey: string;
  invitedKey: string;
  acceptedKey: string;
  chartHeight?: number;
}

const GroupedBar: React.FC<GroupedBarProps> = ({
  endpoint,
  categoryKey = 'industry',
  invitedKey = 'invited_count',
  acceptedKey = 'accepted_count',
  chartHeight = 600,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        // Format data for the chart
        const formattedData: DataItem[] = result.flatMap((item: any) => [
          { category: item[categoryKey], type: 'Invited', value: item[invitedKey] },
          { category: item[categoryKey], type: 'Accepted', value: item[acceptedKey] },
        ]);

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint, categoryKey, invitedKey, acceptedKey]);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const groupedBarPlot = new Bar(chartRef.current, {
        data,
        isGroup: true,
        xField: 'value',
        yField: 'category',
        seriesField: 'type',
        marginRatio: 0,
        label: {
          position: 'right',
          offset: 4,
        },
        barStyle: { radius: [2, 2, 0, 0] },
      });

      groupedBarPlot.render();

      // Clean up function to destroy the chart on unmount
      return () => {
        groupedBarPlot.destroy();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: `${chartHeight}px` }} />;
};

export default GroupedBar;
