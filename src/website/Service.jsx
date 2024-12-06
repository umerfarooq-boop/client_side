import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';

function Service() {
  return (
    <>
      <div className="text-center mt-16 mb-5">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Ser
              <span className="text-indigo-600">vices</span>
            </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
  {/* Card 1 */}
  <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <FitnessCenterIcon style={{ fontSize: 60 }} className="text-blue-500" />
    <p className="text-lg font-semibold mt-3 text-center">Coach Management</p>
  </div>

  {/* Card 2 */}
  <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <SportsSoccerIcon style={{ fontSize: 60 }} className="text-green-500" />
    <p className="text-lg font-semibold mt-3 text-center">Team Management</p>
  </div>

  {/* Card 3 */}
  <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <EventIcon style={{ fontSize: 60 }} className="text-yellow-500" />
    <p className="text-lg font-semibold mt-3 text-center">Schedule & Booking</p>
  </div>

  {/* Card 4 */}
  <div className="bg-gray-100 p-6 flex flex-col items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <PaymentIcon style={{ fontSize: 60 }} className="text-red-500" />
    <p className="text-lg font-semibold mt-3 text-center">Payments & Invoicing</p>
  </div>
</div>

    </>
  );
}

export default Service;
