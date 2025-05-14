import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children, id }) => { // Receive `id` as a prop
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (!id) return; // Exit early if `id` is not available
    try {
      const response = await axios.get(`/showCoachBookings/${id}`);
      const formattedData = response.data.coach.flatMap((item) => {
        const dailyEvents = [];
        const currentDate = new Date(item.from_date);
        const endDate = new Date(item.to_date);

        while (currentDate <= endDate) {
          dailyEvents.push({
            title: item.event_name,
            start: new Date(
              `${currentDate.toISOString().split("T")[0]}T${item.start_time}`
            ),
            end: new Date(
              `${currentDate.toISOString().split("T")[0]}T${item.end_time}`
            ),
            status: item.status,
            player_name: item.player.player_name,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dailyEvents;
      });

      setAppointments(formattedData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };



  useEffect(() => {
    fetchAppointments();
  }, [id]); // Refetch when `id` changes

  const addAppointment = (newEvent) => {
    setAppointments((prevAppointments) => [...prevAppointments, newEvent]);
  };

  const updateAppointmentStatus = (updatedEvent) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.title === updatedEvent.title ? updatedEvent : appointment
      )
    );
  };

  const updateStatus = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };


  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointmentStatus,
        fetchAppointments,
        updateStatus,
        
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
