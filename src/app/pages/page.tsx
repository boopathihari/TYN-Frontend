// pages/page.tsx
"use client";

import ConnectionRequestChart from '../../components/SemiCircularGauge';
import SuccessRateChart from '../../components/SuccessRateChart';
import ConversionRateChart from '../../components/ConversionRateChart';
import EnterpriseEngagementChart from '../../components/EnterpriseEngagementChart';
import TimelinePOCChart from '../../components/POCTimeline';
import HorizontalBarChart from '../../components/SuccessRateChart';
import SemiCircularGauge from '../../components/SemiCircularGauge';
import TimelineChart from '../../components/POCTimeline';
import PieChart from '../../components/Piechart';

const Dashboard = () => (
  <div className="p-6 bg-[#f8f9fa]">
    <div className="flex flex-wrap gap-6">
      {/* Top Row */}
      <div className='flex w-full gap-4'>
        <div className="w-full md:w-1/2 lg:w-2/3 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4">Success Rate</h2>
          <HorizontalBarChart />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4">Conversion Rate</h2>
          <ConversionRateChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className='flex w-full gap-4'>
        <div className="w-full md:w-1/2 lg:w-1/2 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4">Enterprise Engagement</h2>
          <EnterpriseEngagementChart />
        </div>
          <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4">Overall Request Status</h2>
            <PieChart 
            endpoint="http://localhost:8000/api/request-status/"
            backgroundColors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
            size={300}
          />

          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-center">Connection Request</h2>
          <SemiCircularGauge
          endpoint="http://localhost:8000/api/connection-requests/"
          labels={['Total Requests', 'Successful Connections']}
          backgroundColors={['#FF6384', '#36A2EB']}
          hoverBackgroundColors={['#FF4B6E', '#2896DB']}
          size={250}
          cutoutPercentage="70%"
          statusKeys={{ receivedKey: 'status', acceptedKey: 'status' }}
        />


        </div>
        </div>

          <div className="w-full md:w-1/2 lg:w-2/3 bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Timeline for POCs</h2>
            <TimelineChart />
        </div>


    </div>
  </div>
);

export default Dashboard;
