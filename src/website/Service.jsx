import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';

function Service() {
  return (
    <>
      <div className="text-center mb-5">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Ser
              <span className="text-indigo-600">vices</span>
            </h3>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-gray-100 p-4 flex flex-col items-center">
          <FitnessCenterIcon style={{ fontSize: 60 }} className="text-blue-500" />
          <p className=" text-lg font-semibold">Coach Management</p>
        </div>
        <div className="bg-gray-100 p-4 flex flex-col items-center">
          <SportsSoccerIcon style={{ fontSize: 60 }} className="text-green-500" />
          <p className=" text-lg font-semibold">Team Management</p>
        </div>
        <div className="bg-gray-100 p-4 flex flex-col items-center">
          <EventIcon style={{ fontSize: 60 }} className="text-yellow-500" />
          <p className="text-lg font-semibold">Schedule & Booking</p>
        </div>
        <div className="bg-gray-100 p-4 flex flex-col items-center">
          <PaymentIcon style={{ fontSize: 60 }} className="text-red-500" />
          <p className="text-lg font-semibold">Payments & Invoicing</p>
        </div>
      </div>
    </>
  );
}

export default Service;
