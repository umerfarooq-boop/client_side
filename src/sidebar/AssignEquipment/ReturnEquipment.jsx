import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import Dashboard from '../Dashboard'
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

function ReturnEquipment() {
  const [loading, setLoading] = useState(true);
  const { handleSubmit, register, reset, watch, formState: { errors }, setError } = useForm();
  const { id } = useParams();
  const [equipment, setEquipment] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReturnEquipment = async () => {
      try {
        const response = await axios.get(`/show_return_equipment/${id}`);
        if (response.data && Array.isArray(response.data.equipment_return)) {
          setEquipment(response.data.equipment_return);
          setLoading(false)
        } else if (response.data && response.data.equipment_return) {
          setEquipment([response.data.equipment_return]);
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };
    fetchReturnEquipment();
  }, [id]);

  const handleReturnEquipment = async (data) => {
    try {
      setServerErrors(null);

      // Store return record
      const storeResponse = await axios.post("/return_equipment", data);
      if (storeResponse.status !== 201) {
        throw new Error("Failed to save return record");
      }

      // Update assigned and request tables
      const returnResponse = await axios.post(`/ReturnEquipment/${id}`, {
        equipment_quantity: data.quantity,
      });

      if (returnResponse.status === 200) {
        toast.success("Equipment Returned Successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(returnResponse.data.message || "Failed to return equipment");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setServerErrors(error.response.data.errors);
        Object.keys(error.response.data.errors).forEach((field) => {
          setError(field, { type: "server", message: error.response.data.errors[field][0] });
        });
      } else {
        toast.error("Failed to return equipment");
        console.error("Error:", error);
      }
    }
  };

  const location = useLocation();

  return (
    <Dashboard>
{/* {
  loading ? (
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
          ) :( */}

          <>

          <ToastContainer />
<div className="min-h-screen p-4">
  <div className="w-full max-w-4xl mx-auto">
    {equipment.map((item, index) => (


    <form 
      key={index} 
      onSubmit={handleSubmit(handleReturnEquipment)} 
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="text-center mb-10">
              <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                Return{" "}
                <span className="text-indigo-600">Equipment</span>
              </h3>
          </div>
      <div className="grid grid-cols-1 gap-4">
        
        {/* Player Name (Display Name, Store ID) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Player Name</label>
          <input 
            type="text" 
            defaultValue={item.player_name} 
            readOnly 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" 
          />
          <input 
            type="hidden" 
            {...register("player_id")} 
            defaultValue={item.player_id} 
          />
        </div>

        {/* Coach Name (Display Name, Store ID) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Coach Name</label>
          <input 
            type="text" 
            defaultValue={item.coach_name} 
            readOnly 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" 
          />
          <input 
            type="hidden" 
            {...register("coach_id")} 
            defaultValue={item.coach_id} 
          />
        </div>

        {/* Equipment Quantity (Editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input 
            type="number" 
            defaultValue={item.equipment_quantity} 
            {...register("quantity", { 
              required: "Quantity is required", 
              min: 1, 
              valueAsNumber: true // Ensures input is a number 
            })} 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
          />
          <input 
            type="hidden" 
            {...register("equipment_request_id")} 
            defaultValue={id} 
          />
        </div>

        {/* Equipment Name (Display Name) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
          <input 
            type="text" 
            defaultValue={item.equipment_name} 
            readOnly 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" 
          />
          <input 
            type="hidden" 
            defaultValue={item.equipment_name_id} 
            {...register('equipment_name')}
            readOnly 
            className="input-field" 
          />
        </div>

        {/* Return Note (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Return Note</label>
          <input 
            type="text" 
            {...register("return_note")} 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" 
          />
        </div>

        {/* Return Date (Editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <input 
            type="datetime-local" 
            defaultValue={item.return_date_time} 
            {...register("return_date_time")} 
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
          />
        </div>

      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button type="button" onClick={() => navigate(-1)} className="rounded-md px-4 py-2 hover:border-indigo-900 border">
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-indigo-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Return
        </button>
      </div>
    </form>
  ))}
  
        </div>
      </div>
      </>
      {/* )} */}
      </Dashboard>
    
  );
}

export default ReturnEquipment;
