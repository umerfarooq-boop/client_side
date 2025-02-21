import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { ToastContainer,toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from '../axios'

function Equipment_Request() {
    const {handleSubmit,register,reset} = useForm();
    const [equipment,setEquipment] = useState([]);
    const player_id = localStorage.getItem('player_id');
    const coach_record = localStorage.getItem('coach_record');
    useEffect(()=>{
        const getEquipment = async () => {
            const response = await axios.get(`/assign_equipment/${coach_record}`);
            setEquipment(response.data.equipment);
            const equip = response.data.equipment;
            console.log(equip);
        }  
        getEquipment();
    },[player_id])

    
    const ReqEquip = async (data) => {
        try {
            // Format the return_date_time to match the backend's expected format
            if (data.return_date_time) {
                data.return_date_time = data.return_date_time.replace("T", " ") + ":00";
            }
    
            const response = await axios.post('/request_equipment', data);
            reset()
            // Show success message if the request is successful
            if (response.data && response.data.message) {
                toast.success(response.data.message);
            } else {
                toast.error("Unexpected response format");
            }
        } catch (error) {
            // Display backend validation errors or generic errors
            if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    const validationMessages = Object.values(error.response.data.errors)
                        .flat()
                        .join(", ");
                    toast.error(validationMessages);
                } else if (error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } else {
                toast.error("An error occurred. Please check your network connection.");
            }
        }
    }
    
    return (
    <>
      <Nav />
      <ToastContainer />
      <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-full mx-auto p-8 justify-center my-20">
        <h1 className="text-2xl font-bold text-blue-900 text-center">
            Equipment Request
        </h1>
        <form
          onSubmit={handleSubmit(ReqEquip)}
          className="mt-6 flex flex-col gap-4"
        >
          {/* Video Title */}
          <input
            type="hidden"
            {...register("player_id")}
            value={player_id}
            placeholder="Player ID"
            className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
          />
          <input
            type="hidden"
            {...register("coach_id")}
            value={coach_record}
            placeholder="Coach ID"
            className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
          />

          {/* Equipment Name */}

          <select {...register('equipment_name_id')} id="">
            {
                equipment.map((item,index)=>(
                    <option key={index} value={item.id}>{item.equipment_name}</option>
                ))
            }
          </select>

          {/* Equipment Name */}

          <input
            type="number"
            {...register("equipment_quantity")}
            min={0}
            placeholder="Quantity"
            className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
          />

          <input
            type="hidden"
            {...register("equipment_status")}
            value={"reject"}
            className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
          />

            <input type="datetime-local" {...register('return_date_time')} />

          <button
            type="submit"
            className="w-full p-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Equipment_Request;
