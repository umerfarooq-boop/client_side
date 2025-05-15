import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import axios from "../axios";
import { useAppointments } from "../context/AppointmentContext";
<<<<<<< HEAD
import { useForm,Controller } from 'react-hook-form';
import Nav from "./Nav";
=======
import { useForm, Controller } from 'react-hook-form';
import Nav from "./Nav";
import loadingAnimation from '../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d


function EditPlayerAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();
<<<<<<< HEAD
  const { register, handleSubmit, reset,watch,control } =  useForm({
    defaultValues: {
      start_time: "",
      end_time:"", 
    },
  });
  const player_id = localStorage.getItem('player_id' || '');
  const { updateAppointment,fetchAppointments,updateAppointmentStatus } = useAppointments();
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const playwith = localStorage.getItem('playwith');
  const [category,setCategory] = useState([]);
=======
  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: {
      start_time: "",
      end_time: "",
    },
  });
  const player_id = localStorage.getItem('player_id' || '');
  const { updateAppointment, fetchAppointments, updateAppointmentStatus } = useAppointments();
  const [loader, setLoading] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const playwith = localStorage.getItem('playwith');
  const [category, setCategory] = useState([]);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const from_date = watch("from_date");
  const to_date = watch("to_date");
  const [bookedSlots, setBookedSlots] = useState([]);
  const coach_record = localStorage.getItem('coach_record');

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/editAppointmentDate/${id}`);
        const data = response.data?.caoch_schedule;
        setAppointment(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        toast.error("Failed to fetch appointment details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const DisableTime = (time) => {
    return bookedSlots.some((slot) => {
      const { start_time, bookings } = slot;
      return start_time === time && bookings >= 2;
    });
  };

<<<<<<< HEAD
    if(playwith === 'individual'){
      useEffect(() => {
        const fetchBookedSlots = async () => {
          if (from_date) {
            try {
              const response = await axios.get(`/fetchBookedSlots/${coach_record}?date=${from_date}`);
              setBookedSlots(response.data.bookedSlots || []);
            } catch (error) {
              console.error("Error fetching booked slots:", error);
            }
          }
        };
        fetchBookedSlots();
        
      }, [from_date, id]);
    
      
      
    }else if(playwith === 'team'){
      useEffect(() => {
        const fetchBookedSlots = async () => {
          if (from_date) {
            try {
              const response = await axios.get(`/fetchBookedSlots/${coach_record}?date=${from_date}`);
              setBookedSlots(response.data.bookedSlots || []);
            } catch (error) {
              console.error("Error fetching booked slots:", error);
            }
          }
        };
        fetchBookedSlots();
        
      }, [from_date, id]);
    }

    const isTimeSlotDisabled = (timeValue) => {
      const playwith = localStorage.getItem("playwith"); // "team" or "individual"
      if (!bookedSlots || bookedSlots.length === 0) return false;
    
      const [inputHour, inputMin] = timeValue.split(":").map(Number);
      const inputMinutes = inputHour * 60 + inputMin;
    
      // Get the current user's appointment time
      const [myStartHour, myStartMin] = appointment[0]?.start_time?.split(":").map(Number) || [];
      const [myEndHour, myEndMin] = appointment[0]?.end_time?.split(":").map(Number) || [];
    
      const myStartMinutes = myStartHour * 60 + myStartMin;
      const myEndMinutes = myEndHour * 60 + myEndMin;
    
      // ✅ If this time is inside user's original booking, allow it
      const isCurrentUserSlot = inputMinutes >= myStartMinutes && inputMinutes < myEndMinutes;
      if (isCurrentUserSlot) return false;
    
      let teamBookingCount = 0;
      let hasIndividualBooking = false;
    
      for (const slot of bookedSlots) {
        const [startHour, startMin] = slot.start_time.split(":").map(Number);
        const [endHour, endMin] = slot.end_time.split(":").map(Number);
    
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
    
        const overlaps = inputMinutes >= startMinutes && inputMinutes < endMinutes;
    
        // 💡 Ignore current user's own slot
        const isSameSlot =
          slot.id === appointment[0]?.id ||
          (
            slot.start_time === appointment[0]?.start_time &&
            slot.end_time === appointment[0]?.end_time &&
            slot.from_date === appointment[0]?.from_date
          );
    
        if (isSameSlot) continue;
    
        if (overlaps) {
          if (slot.playwith === "individual") hasIndividualBooking = true;
          if (slot.playwith === "team") teamBookingCount += slot.bookings;
        }
      }
    
      if (hasIndividualBooking) return true;
      if (playwith === "team" && teamBookingCount >= 2) return true;
      if (playwith === "individual" && teamBookingCount > 0) return true;
    
      return false;
    };
    
=======
  if (playwith === 'individual') {
    useEffect(() => {
      const fetchBookedSlots = async () => {
        if (from_date) {
          try {
            const response = await axios.get(`/fetchBookedSlots/${coach_record}?date=${from_date}`);
            setBookedSlots(response.data.bookedSlots || []);
          } catch (error) {
            console.error("Error fetching booked slots:", error);
          }
        }
      };
      fetchBookedSlots();

    }, [from_date, id]);



  } else if (playwith === 'team') {
    useEffect(() => {
      const fetchBookedSlots = async () => {
        if (from_date) {
          try {
            const response = await axios.get(`/fetchBookedSlots/${coach_record}?date=${from_date}`);
            setBookedSlots(response.data.bookedSlots || []);
          } catch (error) {
            console.error("Error fetching booked slots:", error);
          }
        }
      };
      fetchBookedSlots();

    }, [from_date, id]);
  }

  const isTimeSlotDisabled = (timeValue) => {
    const playwith = localStorage.getItem("playwith"); // "team" or "individual"
    if (!bookedSlots || bookedSlots.length === 0) return false;

    const [inputHour, inputMin] = timeValue.split(":").map(Number);
    const inputMinutes = inputHour * 60 + inputMin;

    // Get the current user's appointment time
    const [myStartHour, myStartMin] = appointment[0]?.start_time?.split(":").map(Number) || [];
    const [myEndHour, myEndMin] = appointment[0]?.end_time?.split(":").map(Number) || [];

    const myStartMinutes = myStartHour * 60 + myStartMin;
    const myEndMinutes = myEndHour * 60 + myEndMin;

    // ✅ If this time is inside user's original booking, allow it
    const isCurrentUserSlot = inputMinutes >= myStartMinutes && inputMinutes < myEndMinutes;
    if (isCurrentUserSlot) return false;

    let teamBookingCount = 0;
    let hasIndividualBooking = false;

    for (const slot of bookedSlots) {
      const [startHour, startMin] = slot.start_time.split(":").map(Number);
      const [endHour, endMin] = slot.end_time.split(":").map(Number);

      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      const overlaps = inputMinutes >= startMinutes && inputMinutes < endMinutes;

      // 💡 Ignore current user's own slot
      const isSameSlot =
        slot.id === appointment[0]?.id ||
        (
          slot.start_time === appointment[0]?.start_time &&
          slot.end_time === appointment[0]?.end_time &&
          slot.from_date === appointment[0]?.from_date
        );

      if (isSameSlot) continue;

      if (overlaps) {
        if (slot.playwith === "individual") hasIndividualBooking = true;
        if (slot.playwith === "team") teamBookingCount += slot.bookings;
      }
    }

    if (hasIndividualBooking) return true;
    if (playwith === "team" && teamBookingCount >= 2) return true;
    if (playwith === "individual" && teamBookingCount > 0) return true;

    return false;
  };

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`/updateAppointmentData/${id}`, data);
<<<<<<< HEAD
      localStorage.setItem('isEditPaid',false);
=======
      localStorage.setItem('isEditPaid', false);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      if (response.status === 200) {
        toast.success("Appointment updated successfully!");
        const updatedEvent = {
          id: id,
          title: data.event_name, // Assuming you have an event name
          start: new Date(`${data.from_date}T${data.start_time}`),
          end: new Date(`${data.to_date}T${data.end_time}`),
          status: data.status, // Include status update here
        };
<<<<<<< HEAD
        
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        fetchAppointments(); // Refresh the appointments
        navigate(`/editplayer_appointment_table/${player_id}`);
      }
    } catch (error) {
      toast.error("Failed to update the appointment.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };
<<<<<<< HEAD
  
  function checkPlayer(){
    if(player_id == null){
=======

  function checkPlayer() {
    if (player_id == null) {
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      navigate('/signup');
    }
  }

<<<<<<< HEAD
  const [coach,setCoach] = useState([]);
=======
  const [coach, setCoach] = useState([]);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/showCoachBookings/${id}`);
        const getCategory = await axios.get('/category');
        setCoach(response.data);
        setCategory(getCategory.data.category);
<<<<<<< HEAD
        
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      } catch (error) {
        console.log("Error fetching coach schedule data:", error);
      }
    };
    getData();
  }, [id]);

<<<<<<< HEAD
  const user_id = localStorage.getItem('user_id');

  return (
    <>
      <Nav />
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
=======
  return (
    <>
      <Nav />
      {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        </div>
      ) : (
        <div>
          <ToastContainer />
<<<<<<< HEAD
            <div className="text-center mt-9">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Edit{"   "}
                <span className="text-indigo-600">Appointment</span>
              </h3>
            </div>
          <div className="mt-16 flex items-center justify-center">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              {
                appointment.map((data,key)=>(
                  <form onSubmit={handleSubmit(onSubmit)} key={key}>
                    <input type="hidden" value={user_id} {...register('created_by')} />
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="from_date" className="mb-3 block text-base font-medium text-[#07074D]">
                        From Date
                      </label>
                      <input
                      type="date"
                      id="from_date"
                      defaultValue={data.from_date || ''}
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
=======
          <div className="text-center mt-9">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Edit{"   "}
              <span className="text-indigo-600">Appointment</span>
            </h3>
          </div>
          <div className="mt-16 flex items-center justify-center">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              {
                appointment.map((data, key) => (
                  <form onSubmit={handleSubmit(onSubmit)} key={key}>
                    <div className="-mx-3 flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                          <label htmlFor="from_date" className="mb-3 block text-base font-medium text-[#07074D]">
                            From Date
                          </label>
                          <input
                            type="date"
                            id="from_date"
                            defaultValue={data.from_date || ''}
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
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        type="time"
                        id="start_time"
                        {...register("start_time", { required: "Start Time is required" })}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        disabled={!from_date}
                        list="start-time-options"
                      /> */}
<<<<<<< HEAD
                      {playwith === "individual" || playwith === "team" ? (
  <div>
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
            <option value="" disabled selected>
              ⏰ Select Start time
            </option>
            {[...Array(16).keys()].map((index) => {
              const hour = index + 7; // Morning 7 AM to night 10 PM
              const isPM = hour >= 12;
              const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
              const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${
                isPM ? "PM" : "AM"
              }`;
              const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

              return (
                <option
                  key={timeValue}
                  value={timeValue}
                  disabled={isTimeSlotDisabled(timeValue)} // Use the same function to handle time disabling
                >
                  {timeLabel}
                </option>
              );
            })}
          </select>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-2">
              {fieldState.error.message}
            </p>
          )}
        </>
      )}
    />
  </div>
          ) : null}



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
                        defaultValue={data.to_date || ''}
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
=======
                          {playwith === "individual" || playwith === "team" ? (
                            <div>
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
                                      className={`w-full rounded-md border bg-white py-3 px-6 text-base ${fieldState.error ? "border-red-500" : "border-gray-300"
                                        }`}
                                      disabled={!from_date}
                                    >
                                      <option value="" disabled selected>
                                        ⏰ Select Start time
                                      </option>
                                      {[...Array(16).keys()].map((index) => {
                                        const hour = index + 7; // Morning 7 AM to night 10 PM
                                        const isPM = hour >= 12;
                                        const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
                                        const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"
                                          }`;
                                        const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

                                        return (
                                          <option
                                            key={timeValue}
                                            value={timeValue}
                                            disabled={isTimeSlotDisabled(timeValue)} // Use the same function to handle time disabling
                                          >
                                            {timeLabel}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm mt-2">
                                        {fieldState.error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          ) : null}



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
                            defaultValue={data.to_date || ''}
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
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        type="time" 
                        id="end_time" 
                        {...register('end_time', { required: 'End Time is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      /> */}
<<<<<<< HEAD
                      
                      {playwith === "individual" || playwith === "team" ? (
                        <div>
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
                                  <option value="" disabled selected>
                                    ⏰ Select End time
                                  </option>
                                  {[...Array(16).keys()].map((index) => {
                                    const hour = index + 7; // Morning 7 AM to night 10 PM
                                    const isPM = hour >= 12;
                                    const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
                                    const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${
                                      isPM ? "PM" : "AM"
                                    }`;
                                    const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

                                    return (
                                      <option
                                        key={timeValue}
                                        value={timeValue}
                                        disabled={isTimeSlotDisabled(timeValue)}
                                      >
                                        {timeLabel}
                                      </option>
                                    );
                                  })}
                                </select>
                                {fieldState.error && (
                                  <p className="text-red-500 text-sm mt-2">
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      ) : null}


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
                          defaultValue={data.event_name || ''}
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
                          <option value="">Select Category</option>
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
=======

                          {playwith === "individual" || playwith === "team" ? (
                            <div>
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
                                      className={`w-full rounded-md border bg-white py-3 px-6 text-base ${fieldState.error ? "border-red-500" : "border-gray-300"
                                        }`}
                                      disabled={!from_date}
                                    >
                                      <option value="" disabled selected>
                                        ⏰ Select End time
                                      </option>
                                      {[...Array(16).keys()].map((index) => {
                                        const hour = index + 7; // Morning 7 AM to night 10 PM
                                        const isPM = hour >= 12;
                                        const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
                                        const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"
                                          }`;
                                        const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

                                        return (
                                          <option
                                            key={timeValue}
                                            value={timeValue}
                                            disabled={isTimeSlotDisabled(timeValue)}
                                          >
                                            {timeLabel}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm mt-2">
                                        {fieldState.error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          ) : null}


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
                              defaultValue={data.event_name || ''}
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
                              <option value="">Select Category</option>
                              {
                                category.map((index) => (
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
                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform-gpu"                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                ))
              }
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default EditPlayerAppointment;
