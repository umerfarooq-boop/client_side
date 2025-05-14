// import React from 'react'
// import { useParams } from 'react-router-dom'
// import PlayerRequest from '../../website/PlayerRequest';
// import ChangeRequest from '../ChangeRequest';
// import { AppointmentProvider } from '../../context/AppointmentContext';
// import Show_EditAppointment from './Show_EditAppointment';
// import { RotatingLines } from 'react-loader-spinner';
// import Dashboard from '../Dashboard';

// function AllAppointment() {
//     const [loading, setLoading] = useState(true);
//     const {id} = useParams();
//     return (
//          {loading ? (
//                 <div className="flex flex-col items-center justify-center h-screen">
//                   <RotatingLines
//                     visible={true}
//                     height="96"
//                     width="96"
//                     color="grey"
//                     strokeWidth="5"
//                     animationDuration="0.75"
//                     ariaLabel="rotating-lines-loading"
//                   />
//                 </div>
//               ) : (
//     <>
//         <Dashboard>
//             <div>
//                 <div>
//                     <AppointmentProvider>
//                     <ChangeRequest id={id}/>
//                     </AppointmentProvider>
//                 </div>
//                 <div>
//                     <Show_EditAppointment />
//                 </div>
//                 <div></div>
//             </div>
//               )}
//         </Dashboard>
//     </>
//   )
// }

// export default AllAppointment

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerRequest from '../../website/PlayerRequest';
import ChangeRequest from '../ChangeRequest';
import { AppointmentProvider } from '../../context/AppointmentContext';
import Show_EditAppointment from './Show_EditAppointment';
import loadingAnimation from '../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import Dashboard from '../Dashboard';

function AllAppointment() {
  const [loader, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Simulate loading (replace with actual data fetching if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dashboard>
    {/* {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      )  */}
      : (
        <div className="p-4">
          <AppointmentProvider>
            <ChangeRequest id={id} />
          </AppointmentProvider>
          <Show_EditAppointment />
        </div>
      )
    </Dashboard>
  );
}

export default AllAppointment;
