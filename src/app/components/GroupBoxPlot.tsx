import { useEffect, useRef } from 'react';
import { Box } from '@antv/g2plot';

interface ChartData {
  quarter: string;
  userType: 'Startup' | 'Enterprise';
  avgSession: number;
  sessions: number[];
}

const GroupBoxPlot: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const data: ChartData[] = [
        { quarter: 'Q1', userType: 'Startup', avgSession: 20, sessions: [10, 15, 20, 25, 30] },
        { quarter: 'Q1', userType: 'Enterprise', avgSession: 30, sessions: [20, 25, 30, 35, 40] },
        { quarter: 'Q2', userType: 'Startup', avgSession: 25, sessions: [15, 20, 25, 30, 35] },
        { quarter: 'Q2', userType: 'Enterprise', avgSession: 35, sessions: [25, 30, 35, 40, 45] },
        { quarter: 'Q3', userType: 'Startup', avgSession: 22, sessions: [12, 18, 22, 28, 34] },
        { quarter: 'Q3', userType: 'Enterprise', avgSession: 32, sessions: [22, 28, 32, 38, 42] },
        { quarter: 'Q4', userType: 'Startup', avgSession: 28, sessions: [18, 23, 28, 33, 38] },
        { quarter: 'Q4', userType: 'Enterprise', avgSession: 38, sessions: [28, 33, 38, 43, 48] },
      ];

      const groupBoxPlot = new Box(chartRef.current, {
        data,
        xField: 'quarter',
        yField: 'sessions',
        groupField: 'userType',
        boxStyle: {
          stroke: 'rgba(0, 0, 0, 0.45)',
          fill: '#5B8FF9',
        },
        color:['#5B8FF9', '#61DDAA'],
        animation:true,
        tooltip: {
          fields: ['quarter', 'userType', 'avgSession'],
          showMarkers: false,
        },
        legend: {
          position: 'top',
        },
      });

      groupBoxPlot.render();
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default GroupBoxPlot;

















// import { useEffect, useRef } from 'react';
// import { Box } from '@antv/g2plot';

// interface BoxPlotData {
//     quarter: string;
//       userType: 'Startup' | 'Enterprise';
//       avgSession: number;
//       sessions: number[];
// }

// const GroupedBoxPlot: React.FC = () => {
//   const chartRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const data: BoxPlotData[] = [
        
//         { quarter: 'Q1', userType: 'Startup', avgSession: 20, sessions: [10, 15, 20, 25, 30] },
//         { quarter: 'Q1', userType: 'Enterprise', avgSession: 30, sessions: [20, 25, 30, 35, 40] },
//                 { quarter: 'Q2', userType: 'Startup', avgSession: 25, sessions: [15, 20, 25, 30, 35] },
//                 { quarter: 'Q2', userType: 'Enterprise', avgSession: 35, sessions: [25, 30, 35, 40, 45] },
//                 { quarter: 'Q3', userType: 'Startup', avgSession: 22, sessions: [12, 18, 22, 28, 34] },
//                 { quarter: 'Q3', userType: 'Enterprise', avgSession: 32, sessions: [22, 28, 32, 38, 42] },
//                 { quarter: 'Q4', userType: 'Startup', avgSession: 28, sessions: [18, 23, 28, 33, 38] },
//                 { quarter: 'Q4', userType: 'Enterprise', avgSession: 38, sessions: [28, 33, 38, 43, 48] },
//       ];

//       const boxPlot = new Box(chartRef.current, {
//         width: 400,
//         height: 500,
//         data,
//         xField: 'quarter',
//         yField: 'sessions',
//         groupField: 'userType', 
//         boxStyle: {
//           stroke: 'black',
//           fill: '#4dabf7',
//         //   fillOpacity: 0.3,
//         },
//         animation: false,
//         tooltip: {
//           fields: ['region', 'userType', 'median'],
//         },
//         legend: {
//           position: 'top',
//         },
//       });

//       boxPlot.render();
//     }
//   }, []);

//   return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default GroupedBoxPlot;
