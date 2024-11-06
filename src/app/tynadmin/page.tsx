"use client";

import GroupBoxPlot from '../../components/GroupBoxPlot';
import GroupedBarChart from '../../components/GroupedBar';
import PieChart from '../../components/Piechart';
import SemiCircularGauge from '../../components/SemiCircularGauge';
import BoxPlot from '../../components/SingleBoxPlot';
import StackedColumnChart from '../../components/StackedColumnPlot';
import QueryFocus from '../../components/QueryFocus';
import StartupAvgResponseTime from '../../components/StartupAvgResponseTime';
import GroupedBar from '../../components/GroupedBar';

const dataValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 10];
const data = [
    { x: 'Startup Response', low: 7, q1: 14, median: 21, q3: 24, high: 28 },
];

export default function Home() {
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="grid grid-cols-12 gap-6">

        {/* First Column: Invited and Accepted Enterprise users (4 grid span) */}
        <div className="col-span-4 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Invited and Accepted Enterprise users</h2>
          <GroupedBar
                            endpoint="http://localhost:8000/api/industriesCount/"
                            categoryKey="industry"
                            invitedKey="invited_count"
                            acceptedKey="accepted_count"
                            chartHeight={500}
            />
        </div>

        {/* Second Column: Query Focus (2 grid span) */}
        <div className="col-span-2 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Query Focus</h2>
          <QueryFocus values={dataValues} />
        </div>

        {/* Third Column: Enterprise User Status and Average session by users stacked vertically (3 grid span) */}
        <div className="col-span-3 flex flex-col gap-6">
          {/* Enterprise User Status */}
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Enterprise User Status</h2>
            <SemiCircularGauge
                    endpoint="http://localhost:8000/api/status-count/"
                    labels={['Active', 'Inactive']}
                    backgroundColors={['#4dabf7', '#dee2e6']}
                    hoverBackgroundColors={['#4dabf7', '#dee2e6']}
                    size={250}
                    cutoutPercentage="70%"
                    statusKeys={{ statusKey: 'status' }}
            />
          </div>
          {/* Average session by users */}
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Average session by users</h2>
            <GroupBoxPlot/>
          </div>
        </div>

        {/* Fourth Column: User Personas and Startups Avg Connection Response stacked vertically (3 grid span) */}
        <div className="col-span-3 flex flex-col gap-6">
          {/* User Personas */}
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">User Personas</h2>
            <PieChart 
                        endpoint="http://localhost:8000/api/user-persona-count/"
                        backgroundColors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
                        size={300}
            />
          </div>
          {/* Startups Avg Connection Response */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Startups Avg Connection Response</h2>
            <StartupAvgResponseTime title="Startups Avg Connection Response" data={data} />
          </div>
        </div>

        {/* Startup categories occupying the entire row, 6 vertical grid (12 grid span) */}
        <div className="col-span-12 bg-white p-4 shadow-md rounded-lg flex flex-col mt-6">
          <h2 className="text-xl font-bold mb-4 text-center">Startup categories</h2>
          <StackedColumnChart apiUrl="http://localhost:8000/api/startup-category/" />
        </div>

      </div>
    </div>
  );
}
