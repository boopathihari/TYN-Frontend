"use client";

import GroupBoxPlot from '../components/GroupBoxPlot';
import GroupedBar from '../components/GroupedBar';
import GroupedBarChart from '../components/GroupedBar';
import PieChart from '../components/Piechart';
import SemiCircularGauge from '../components/SemiCircularGauge';
import BoxPlot from '../components/SingleBoxPlot';
import StackedColumnChart from '../components/StackedColumnPlot';


export default function Home() {
  return (
        <div className="p-6 bg-[#f8f9fa]">
            <div className="flex flex-wrap gap-6">
                <div className='flex w-full gap-4'>
                <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
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
                    <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">User Personas</h2>
                        <PieChart 
                        endpoint="http://localhost:8000/api/user-persona-count/"
                        backgroundColors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
                        size={300}
                    />
                    </div>

                </div>
                    <div className="w-full md:w-1/2 lg:w-2/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">Invited and Accepted Enterprise users</h2>
                        <GroupedBar
                            endpoint="http://localhost:8000/api/industriesCount/"
                            categoryKey="industry"
                            invitedKey="invited_count"
                            acceptedKey="accepted_count"
                            chartHeight={500}
                        />
                    </div>

                    <div className="w-full md:w-1/2 lg:w-2/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">Average session by users</h2>
                        <GroupBoxPlot/>
                    </div>
                    
                    <div className="w-full md:w-1/2 lg:w-3/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">Startup categories</h2>
                        <StackedColumnChart apiUrl="http://localhost:8000/api/startup-category/" />
                    </div>

                 
            </div>
        </div>
  
);
}
