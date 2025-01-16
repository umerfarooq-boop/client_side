import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm,Controller } from 'react-hook-form';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner";
import Footer from './Footer'
import Notifications from './Notifications';
const localizer = momentLocalizer(moment);

function Appoinment() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset,watch,control } = useForm();
  const player_id = localStorage.getItem('player_id' || '');
  console.log("Player_id is "+player_id);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category,setCategory] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  // const coachid = localStorage.getItem('coach_id' || '');
  const role = localStorage.getItem('role' || '');

  const from_date = watch("from_date");
  const to_date = watch("to_date");


  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (from_date) {
        try {
          const response = await axios.get(`/fetchBookedSlots/${id}?date=${from_date}`);
          setBookedSlots(response.data.bookedSlots || []);
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      }
    };
    fetchBookedSlots();
  }, [from_date, id]);

  const isTimeDisabled = (time) => {
    const [inputHour] = time.split(":").map(Number);
  
    // Explicitly disable 3:00 AM to 4:00 AM
    if (inputHour === 3) return true;
  
    // Disable based on booked slots
    return bookedSlots.some((slot) => {
      const [startHour, startMin] = slot.start_time.split(":").map(Number);
      const [endHour, endMin] = slot.end_time.split(":").map(Number);
      const [inputHour, inputMin] = time.split(":").map(Number);
  
      const inputMinutes = inputHour * 60 + inputMin;
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
  
      return inputMinutes >= startMinutes && inputMinutes <= endMinutes;
    });
  };

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

  const [coach,setCoach] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/showCoachBookings/${id}`);
        const getCategory = await axios.get('/category');
        setCoach(response.data);
        setCategory(getCategory.data.category);
        
      } catch (error) {
        console.log("Error fetching coach schedule data:", error);
      }
    };
    getData();
  }, [id]);


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

          

          <div className="flex items-center justify-center">
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
                      {...register("from_date", { required: "From Date is required" })}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />  
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="start_time" className="mb-3 block text-base font-medium text-[#07074D]">
                        Start Time
                      </label>
                      {/* <input
                        type="time"
                        id="start_time"
                        {...register("start_time", { required: "Start Time is required" })}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        disabled={!from_date}
                        list="start-time-options"
                      /> */}
                       <Controller
  name="start_time"
  control={control}
  {...register("start_time", {
    required: "Start Time is required",
    validate: (value) => {
      const selectedDateTime = new Date(`${from_date}T${value}`);
      const currentDateTime = new Date();

      if (selectedDateTime < currentDateTime) {
        return "Please select a time in the future.";
      }
      return true;
    },
  })}
  render={({ field, fieldState }) => (
    <>
      <select
        {...field}
        className={`w-full rounded-md border bg-white py-3 px-6 text-base ${
          fieldState.error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={!from_date}
      >
        <option value="" disabled selected>⏰ Select Start time</option>
        {[...Array(16).keys()].map((index) => {
          const hour = index + 7; // Morning 7 AM to night 10 PM
          const isPM = hour >= 12;
          const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
          const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"}`;
          const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

          return (
            <option key={timeValue} value={timeValue} disabled={isTimeDisabled(timeValue)}>
              {timeLabel}
            </option>
          );
        })}
      </select>
      {fieldState.error && <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>}
    </>
  )}
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
                      {/* <input 
                        type="time" 
                        id="end_time" 
                        {...register('end_time', { required: 'End Time is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      /> */}
                      <Controller
  name="end_time"
  control={control}
  {...register("end_time", {
    required: "End Time is required",
    validate: (value) => {
      const selectedDateTime = new Date(`${from_date}T${value}`);
      const currentDateTime = new Date();

      if (selectedDateTime < currentDateTime) {
        return "Please select a time in the future.";
      }
      return true;
    },
  })}
  render={({ field, fieldState }) => (
    <>
      <select
        {...field}
        className={`w-full rounded-md border bg-white py-3 px-6 text-base ${
          fieldState.error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={!from_date}
      >
        <option value="" disabled selected>⏰ Select End time</option>
        {[...Array(16).keys()].map((index) => {
          const hour = index + 7; // Morning 7 AM to night 10 PM
          const isPM = hour >= 12;
          const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
          const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"}`;
          const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

          return (
            <option key={timeValue} value={timeValue} disabled={isTimeDisabled(timeValue)}>
              {timeLabel}
            </option>
          );
        })}
      </select>
      {fieldState.error && <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>}
    </>
  )}
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
        </div>

        
      )}
    </>
  );
}



export default Appoinment