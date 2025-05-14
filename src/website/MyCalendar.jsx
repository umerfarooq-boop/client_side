import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointments } from "../context/AppointmentContext";
import axios from "../axios";
import { RotatingLines } from "react-loader-spinner";
import Chat from "../Chat/Chat";
import loadingAnimation from '../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';

const localizer = momentLocalizer(moment);

function MyCalendar({ id }) {   // ✅ receive id here
  const { appointments, fetchAppointments } = useAppointments();
  const [category, setCategory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [loader, setLoading] = useState(false);

  const player_id = localStorage.getItem('player_id');
  const coach_record = localStorage.getItem('coach_record');
  const currentUser = localStorage.getItem('user_id');
  const coach_userid = localStorage.getItem('coach_userid');

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

  const loadAppointments = async () => {
    setLoading(true);
    await fetchAppointments();
    setLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div style={{ height: "80vh", width: "100%", padding: "40px" }}>
      {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <div>
          <Calendar
            localizer={localizer}
            events={appointments}
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
      )
      }
    </div>
  );
}

export default MyCalendar;
