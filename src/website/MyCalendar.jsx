import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RotatingLines } from "react-loader-spinner";
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarData } from '../Redux/slices/calenderSlice';
import { fetchBookedSlots } from '../Redux/slices/appointmentSlice';
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const { events = [], loading: calendarLoading } = useSelector((state) => state.calendar || {});
  const { bookedSlots = [], loading: appointmentLoading } = useSelector((state) => state.appointment || {});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');

  useEffect(() => {
    dispatch(fetchCalendarData(id));
    dispatch(fetchBookedSlots({ id, date: moment(selectedDate).format('YYYY-MM-DD') }));
  }, [dispatch, id, selectedDate]);

  const formattedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  
  
  const CustomAgendaEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <div>Player: {event.player_name}</div>
    </div>
  );

  const handleDrillDown = (date, view) => {
    if (view === 'agenda') {
      return;
    }
    setView('agenda');
    setSelectedDate(date);
  };




  return (
    <>
      {calendarLoading || appointmentLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RotatingLines 
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div>

<div className="text-center mt-16 mb-5">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Calen 
              <span className="text-indigo-600">&nbsp;der</span>
            </h3>
        </div>

          <div className="flex justify-between items-center px-10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="font-medium text-sm text-yellow-500">Processing</p>
            </div>
      
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="font-medium text-sm text-green-500">Booked</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <p className="font-medium text-sm text-red-600">Reject</p>
            </div>
          </div>

          <div style={{ height: '80vh', width: '100%', padding: '40px' }}>
          <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'agenda']}
        titleAccessor="title"
        style={{ height: 500 }}
        onNavigate={(newDate) => setSelectedDate(newDate)}
        onDrillDown={handleDrillDown}
        date={selectedDate}
        view={view}
        onView={(newView) => setView(newView)}
        components={{
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
        eventPropGetter={(event) => {
          let backgroundColor;
          if (event.status === 'processing') {
            backgroundColor = 'yellow';
          } else if (event.status === 'booked') {
            backgroundColor = '#22c55e';
          } else if(event.status === 'reject'){
            backgroundColor = 'red'
          }

          return {
            style: {
              backgroundColor: backgroundColor,
              color: 'black',
            },
          };
        }}
      />
          </div>
        </div>
      )}
    </>
  );
}

export default MyCalendar;
