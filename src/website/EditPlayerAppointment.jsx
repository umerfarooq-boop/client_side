import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import axios from "../axios";
import { useAppointments } from "../context/AppointmentContext";
import { useForm,Controller } from 'react-hook-form';
import Nav from "./Nav";


function EditPlayerAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const from_date = watch("from_date");
  const to_date = watch("to_date");
  const [bookedSlots, setBookedSlots] = useState([]);


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

    if(playwith === 'individual'){
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
    
      
      
    }else if(playwith === 'team'){
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
    }

  const isTimeDisabled = (time) => {
    const [inputHour, inputMin] = time.split(":").map(Number);
    const inputMinutes = inputHour * 60 + inputMin;
  
    return bookedSlots.some((slot) => {
      const { start_time, end_time, from_date, to_date } = slot;
  
      const [startHour, startMin] = start_time.split(":").map(Number);
      const [endHour, endMin] = end_time.split(":").map(Number);
  
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
  
      const selectedDate = new Date(from_date).toISOString().split("T")[0];
      const selectedEndDate = new Date(to_date).toISOString().split("T")[0];
  
      // Check if the selected date falls within the booked date range
      if (from_date <= from_date && from_date <= selectedEndDate) {
        // Check if the time falls within the booked time slot
        return inputMinutes >= startMinutes && inputMinutes <= endMinutes;
      }
      return false;
    });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`/updateAppointmentData/${id}`, data);
      if (response.status === 200) {
        toast.success("Appointment updated successfully!");
        const updatedEvent = {
          id: id,
          title: data.event_name, // Assuming you have an event name
          start: new Date(`${data.from_date}T${data.start_time}`),
          end: new Date(`${data.to_date}T${data.end_time}`),
          status: data.status, // Include status update here
        };
        
        fetchAppointments(); // Refresh the appointments
        navigate(- 1);
      }
    } catch (error) {
      toast.error("Failed to update the appointment.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
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
        </div>
      ) : (
        <div>
          <ToastContainer />
          {/* <div className="flex items-center justify-center mt-10">
            <div className="mx-auto w-full max-w-[550px] bg-white shadow-lg p-8 rounded-lg">
              <h1 className="text-xl font-semibold mb-4">Edit Appointment</h1>
              {appointment.map((data, key) => (
                <form key={key} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                  <label
                      htmlFor="from_date"
                      className="block text-base font-medium text-gray-700"
                    >
                      From Date
                    </label>
                    <input
                      type="date"
                      defaultValue={data.from_date || ""}
                      {...register("from_date", { required: true })}
                      className="w-full mt-2 p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                  <label
                      htmlFor="to_date"
                      className="block text-base font-medium text-gray-700"
                    >
                      To Date
                    </label>
                    <input
                      type="date"
                      defaultValue={data.to_date || ""}
                      {...register("to_date", { required: true })}
                      className="w-full mt-2 p-2 border rounded"
                    />
                    </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Update Appointment
                  </button>
                </form>
              ))}
            </div>
          </div> */}

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
                        type="time"
                        id="start_time"
                        {...register("start_time", { required: "Start Time is required" })}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        disabled={!from_date}
                        list="start-time-options"
                      /> */}
                      {
                        playwith === 'individual' ? (
                          <div>
                            <Controller
                        name="start_time"
                        control={control}
                        defaultValue={data.start_time || ''}
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
                        ) : playwith === 'team' ? (
                            <div>
                               <Controller
          name="start_time"
          control={control}
          defaultValue={data.start_time || ''}
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
                  const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"}`;
                  const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

                  return (
                    <option key={timeValue} value={timeValue} disabled={DisableTime(timeValue)}>
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
                        ) : null
                      }


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
                        type="time" 
                        id="end_time" 
                        {...register('end_time', { required: 'End Time is required' })} 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                      /> */}
                      
                      {
                        playwith === 'individual' ? (<div>
                          <Controller
                        name="end_time"
                        control={control}
                        defaultValue={data.end_time || ''}
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
                        </div>) : playwith === 'team' ? (
                        <div>
                           <Controller
          name="end_time"
          control={control}
          defaultValue={data.end_time || ''}
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
                  ⏰ Select Ennd time
                </option>
                {[...Array(16).keys()].map((index) => {
                  const hour = index + 7; // Morning 7 AM to night 10 PM
                  const isPM = hour >= 12;
                  const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
                  const timeLabel = `${displayHour.toString().padStart(2, "0")}:00 ${isPM ? "PM" : "AM"}`;
                  const timeValue = `${hour.toString().padStart(2, "0")}:00`; // 24-hour format value

                  return (
                    <option key={timeValue} value={timeValue} disabled={DisableTime(timeValue)}>
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
                        ) : null  
                      }

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
