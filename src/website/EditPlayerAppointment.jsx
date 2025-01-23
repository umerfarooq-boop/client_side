import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import axios from "../axios";
import { useAppointments } from "../context/AppointmentContext";

function EditPlayerAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { updateAppointment,fetchAppointments,updateAppointmentStatus } = useAppointments();
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState([]);

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
          <ToastContainer />
          <div className="flex items-center justify-center mt-10">
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
          </div>
        </div>
      )}
    </>
  );
}

export default EditPlayerAppointment;
