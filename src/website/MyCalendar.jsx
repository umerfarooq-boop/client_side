import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointments } from "../context/AppointmentContext";
import axios from "../axios";
import { useParams } from "react-router-dom";
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const {appointments,fetchAppointments} = useAppointments();
  const [category, setCategory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const {id} = useParams();
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const getCategory = await axios.get("/category");
        setCategory(getCategory.data.category);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getCategoryData();
  }, []);

  useEffect(()=>{
    console.log(appointments);
  },[fetchAppointments,id])

  return (
    <div style={{ height: "80vh", width: "100%", padding: "40px" }}>
      <Calendar
        localizer={localizer}
        events={appointments} // Appointments from context
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "agenda"]}
        titleAccessor="title"
        style={{ height: 500 }}
        onNavigate={(newDate) => setSelectedDate(newDate)}
        onDrillDown={(date, view) => {
          if (view === "agenda") return;
          setView("agenda");
          setSelectedDate(date);
        }}
        date={selectedDate}
        view={view}
        onView={(newView) => setView(newView)}
        components={{
          agenda: {
            event: ({ event }) => (
              <div>
                <strong>{event.title}</strong>
                <div>Player: {event.player_name}</div>
              </div>
            ),
          },
        }}
        eventPropGetter={(event) => {
          let backgroundColor;
          if (event.status === "processing") {
            backgroundColor = "yellow";
          } else if (event.status === "booked") {
            backgroundColor = "#22c55e";
          } else if (event.status === "reject") {
            backgroundColor = "red";
          }

          return {
            style: {
              backgroundColor,
              color: "black",
            },
          };
        }}
      />
    </div>
  );
}

export default MyCalendar;
