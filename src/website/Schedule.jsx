import React, { useState, useEffect } from "react";
import DirectionMap from "./DirectionMap";
import MyCalendar from "./MyCalendar";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { Bars } from "react-loader-spinner"; // Import provider
import { AppointmentProvider } from "../context/AppointmentContext";
import Appoinment from "./Appoinment";

function Schedule() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Initialize with `true` to show the loader initially
  const [data, setData] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // const { addAppointment, fetchAppointments } = useAppointments();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div>
      <AppointmentProvider id={id}> {/* Pass `id` to the provider */}
      <Nav />
      <div className="text-center mt-16 mb-5">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Schedule
          <span className="text-indigo-600">&nbsp;Booking</span>
        </h3>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 px-auto py-auto m-auto">
        <div className="p-4">
          <DirectionMap id={id} />
        </div>
        <div className="p-4">
          <Appoinment id={id} />
        </div>
      </div>
      <MyCalendar />
    </AppointmentProvider>
      </div>
    </>
  );
}

export default Schedule;
