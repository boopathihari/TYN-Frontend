import React, { useEffect, useRef, useState } from 'react';
import D3Funnel from 'd3-funnel';

const FunnelChart: React.FC = () => {
  const funnelRef = useRef<HTMLDivElement>(null);
  const [funnelData, setFunnelData] = useState<{ request_received: number; poc_accepted: number; poc_delivered: number } | null>(null);

  useEffect(() => {
    const fetchFunnelData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/funnel/');
        const data = await response.json();
        setFunnelData(data);
      } catch (error) {
        console.error('Error fetching funnel data:', error);
      }
    };

    fetchFunnelData();
  }, []);

  useEffect(() => {
    if (funnelRef.current && funnelData) {
      const options = {
        chart: {
          bottomPinch: 0.2,
          curve: {
            enabled: true,
          },
        },
        block: {
          dynamicHeight: true,
          fill: {
            type: 'solid',
          },
          minHeight: 30,
        },
        label: {
          fontSize: '16px',
          color: '#000',
        },
      };

      const chart = new D3Funnel(funnelRef.current);
      chart.draw([
        ['Total no of request received', funnelData.request_received],
        ['POC Accepted', funnelData.poc_accepted],
        ['POC Delivered', funnelData.poc_delivered],
      ], options);
    }
  }, [funnelData]);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div ref={funnelRef}></div>
      {funnelData === null && <p>Loading funnel data...</p>}
    </div>
  );
};

export default FunnelChart;
