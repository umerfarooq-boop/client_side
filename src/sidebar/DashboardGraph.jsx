import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

function DashboardGraph() {

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Monthly Performance',
            data: [30, 15, 62, 65, 61, 6],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      // Options for the bar chart
      const barOptions = {
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#4285F4',
            },
          },
          y: {
            ticks: {
              color: '#f44242',
            },
          },
        },
      };
    
      // Data for the line chart
      const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Monthly Growth',
            data: [15, 30, 45, 50, 70, 90],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      };
    
      // Options for the line chart
      const lineOptions = {
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#4285F4',
            },
          },
          y: {
            ticks: {
              color: '#f44242',
            },
          },
        },
      };

  return (
    <div className="container mx-auto p-4">
      {/* Row with Bar and Line Charts */}
      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-12 gap-4">
        <div className="shadow-lg rounded-lg p-4 bg-white">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="shadow-lg rounded-lg p-4 bg-white">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
      
      {/* Full-width Line Chart Row */}
      <div className="mt-4 shadow-lg rounded-lg p-4 bg-white">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  )
}

export default DashboardGraph