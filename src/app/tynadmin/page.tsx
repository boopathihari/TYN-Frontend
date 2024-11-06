// tynadmin/page.tsx
"use client";

import GroupBoxPlot from '../../components/GroupBoxPlot';
import GroupedBarChart from '../../components/GroupedBar';
import PieChart from '../../components/Piechart';
import SemiCircularGauge from '../../components/SemiCircularGauge';
import BoxPlot from '../../components/SingleBoxPlot';
import StackedColumnChart from '../../components/StackedColumnPlot';
import QueryFocus from '../../components/QueryFocus';
import StartupAvgResponseTime from '../../components/StartupAvgResponseTime';

const dataValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 10];
const data = [
    { x: 'Startup Response', low: 7, q1: 14, median: 21, q3: 24, high: 28 },
];

export default function Home() {
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Invited and Accepted Enterprise users</h2>
          <GroupedBarChart/>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Query Focus</h2>
          <QueryFocus values={dataValues} />
        </div>


        <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Enterprise User Status</h2>
          <SemiCircularGauge
            endpoint="http://localhost:8000/api/userStatus/"
            labels={['Active', 'Inactive']}
            backgroundColors={['#4dabf7', '#dee2e6']}
            hoverBackgroundColors={['#4dabf7', '#dee2e6']}
            size={250}
            cutoutPercentage="70%"
            statusKeys={{ receivedKey: 'status_type', acceptedKey: 'status_type' }}
          />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">User Personas</h2>
          <PieChart 
            endpoint="http://localhost:8000/api/personasStatus/"
            backgroundColors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
            size={300}
          />
        </div>


        <div className="lg:col-span-2 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Average session by users</h2>
          <GroupBoxPlot/>
        </div>


        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Startups Avg Connection Response</h2>
          <StartupAvgResponseTime title="Startups Avg Connection Response" data={data} />
        </div>

        <div className="lg:col-span-3 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Startup categories</h2>
          <StackedColumnChart/>
        </div>

        
      </div>
    </div>
  );
}
