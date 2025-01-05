import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner";
import Footer from './Footer'
import Notifications from './Notifications';
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const player_id = localStorage.getItem('player_id' || '');
  console.log("Player_id is "+player_id);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category,setCategory] = useState([]);


  const Addevent = (eventData) => {
    // setLoading(true);

    axios.post('/coachschedule', eventData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Record Saved Successfully");
          toast.success("Schedule Created Successfully");
          
          reset();

          const newEvent = {
            title: eventData.event_name,
            start: new Date(`${eventData.from_date}T${eventData.start_time}`),
            end: new Date(`${eventData.to_date}T${eventData.end_time}`),
            status: eventData.status,
          };

          setData((prevData) => [...prevData, newEvent]);
        }
      })
      .catch((error) => {
        console.log("Error response:", error.response); // Log the error response
        if (error.response && error.response.status === 409) {
          toast.error("This time slot is already booked. Please choose a different time.");
        } else {
          toast.error("Failed to add schedule");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function checkPlayer(){
    if(player_id == null){
      navigate('/signup');
    }
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/coachschedule');
        const getCategory = await axios.get('/category');

        setCategory(getCategory.data.category);
        // console.log(getCategory.data.category);

        // console.log(getCategory);
        console.log("API Response:", response.data);
        
        const formattedData = response.data.coach.map((item) => ({
          title: item.event_name,
          start: new Date(`${item.from_date}T${item.start_time}`),
          end: new Date(`${item.to_date}T${item.end_time}`),
          status: item.status,
        }));

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.log("Error fetching coach schedule data:", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
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
          <ToastContainer /><br /><br />

          <div className="text-center mt-16 mb-5">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Schedule 
              <span className="text-indigo-600">&nbsp;Booking</span>
            </h3>
        </div>

          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              <form onSubmit={handleSubmit(Addevent)}>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="from_date" className="mb-3 block text-base font-medium text-[#07074D]">
                        From Date
                      </label>
                      <input 
                        type="date" 
                        id="from_date" 
                        {...register('from_date', { required: 'From Date is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="start_time" className="mb-3 block text-base font-medium text-[#07074D]">
                        Start Time
                      </label>
                      <input 
                        type="time" 
                        id="start_time" 
                        {...register('start_time', { required: 'Start Time is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="to_date" className="mb-3 block text-base font-medium text-[#07074D]">
                        To Date
                      </label>
                      <input 
                        type="date" 
                        id="to_date" 
                        {...register('to_date', { required: 'To Date is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="end_time" className="mb-3 block text-base font-medium text-[#07074D]">
                        End Time
                      </label>
                      <input 
                        type="time" 
                        id="end_time" 
                        {...register('end_time', { required: 'End Time is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5 pt-3">
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <input 
                          type="text" 
                          placeholder="Event Name" 
                          {...register('event_name', { required: 'Event Name is required' })} 
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        {/* it is Category of Sport */}
                        <select
                          type="text" 
                          placeholder="Booking Slot" 
                          {...register('booking_slot', { required: 'Booking Slot is required' })} 
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                        >
                          {
                            category.map((index)=>(
                             <option key={index.id} value={index.id}>{index.name}</option> 
                            ))
                          }
                          </select> 
                      </div>
                    </div>
                  </div>
                </div>

                <input type="hidden" {...register('player_id')} value={player_id} />
                <input type="hidden" {...register('coach_id')} value={id} />
                <input type="hidden" {...register('status')} value={'processing'} />

                <div>
                  <button 
                    type="submit"
                    onClick={checkPlayer} 
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-between items-center px-10">

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="font-medium text-sm text-yellow-500">Processing</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="font-medium text-sm text-red-500">Booked</p>
            </div>
          </div>

          <div style={{ height: '80vh', width: '100%', padding: '40px' }}>
            <Calendar
              localizer={localizer}
              events={data}
              startAccessor="start"
              endAccessor="end"
              views={['month', 'week', 'agenda']}
              titleAccessor="title"
              style={{ height: 500 }}
              eventPropGetter={(event) => {
                let backgroundColor;
                if (event.status === 'processing') {
                  backgroundColor = 'yellow';
                } else {
                  backgroundColor = 'red';
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
