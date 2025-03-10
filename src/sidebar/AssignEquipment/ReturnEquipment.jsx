import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';

function ReturnEquipment() {
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
    <>
      <ToastContainer />
      <div>
        {equipment.map((item, index) => (
          <form key={index} onSubmit={handleSubmit(handleReturnEquipment)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Player Name</label>
                <input type="text" {...register("player_id")} defaultValue={item.player?.id} readOnly className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Coach Name</label>
                <input type="text" {...register("coach_id")} defaultValue={item.coach?.id} readOnly className="input-field" />
              </div>
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
  className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
/>

            <input type="hidden" value={id} {...register('equipment_request_id')} />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
                <input type="text" {...register("equipment_name")} defaultValue={item.equipment?.id} readOnly className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Return Note</label>
                <input type="text" {...register("return_note")} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Return Date</label>
                <input type="text" {...register("return_date_time")} value={item.return_date_time} readOnly className="input-field" />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button type="button" onClick={() => navigate(-1)} className="btn-cancel">Cancel</button>
              <button type="submit" className="btn-primary">Return</button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
}

export default ReturnEquipment;
