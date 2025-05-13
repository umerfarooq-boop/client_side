import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';

function Service() {
  return (
    <>
      <div className="text-center py-10">  {/* Changed mt-16 mb-5 to py-16 */}
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          SER
          <span className="text-indigo-600">VICES</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {/* Card 1 */}
        <Link to="/" className="transform transition-transform duration-300 hover:scale-105">
          <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl">
            <FitnessCenterIcon style={{ fontSize: 60 }} className="text-blue-500" />
            <p className="text-lg font-semibold mt-3 text-center ">Coach Management</p>
          </div>
        </Link>

        <Link to="/" className="group">
          <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full">
            <SportsSoccerIcon style={{ fontSize: 60 }} className="text-green-500 group-hover:text-green-600 transition-colors" />
            <p className="text-lg font-semibold mt-3 text-center group-hover:text-gray-800 transition-colors">
              Team Management
            </p>
          </div>
        </Link>

        {/* Card 3 */}
        <Link to="/" className="group">
          <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full">
            <EventIcon style={{ fontSize: 60 }} className="text-yellow-500 group-hover:text-yellow-600 transition-colors" />
            <p className="text-lg font-semibold mt-3 text-center group-hover:text-gray-800 transition-colors">
              Schedule & Booking
            </p>
          </div>
        </Link>

        {/* Card 4 */}
        <Link to="/" className="group">
          <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full">
            <PaymentIcon style={{ fontSize: 60 }} className="text-red-500 group-hover:text-red-600 transition-colors" />
            <p className="text-lg font-semibold mt-3 text-center group-hover:text-gray-800 transition-colors">
              Payments & Invoicing
            </p>
          </div>
        </Link>
      </div>

    </>
  );
}

export default Service;
