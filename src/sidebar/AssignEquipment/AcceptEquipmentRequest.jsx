import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';

function AcceptEquipmentRequest() {
  const { handleSubmit, register, reset, watch, formState: { errors }, setError } = useForm();
  const [equipment, setEquipment] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchReturnEquipment = async () => {
      try {
        const response = await axios.get(`/request_equipment/${id}`);
        if (response.data && Array.isArray(response.data.requestequipment)) {
          setEquipment(response.data.requestequipment);
        } else if (response.data && response.data.requestequipment) {
          setEquipment([response.data.requestequipment]);
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };
    fetchReturnEquipment();
  }, [id]);

const AcceptNewEquipmentRequest = async (data) => {
    try {
      const response = await axios.post(`/AcceptEquipmentRequest/${id}`, data);
      
      if (response.status === 200 && response.data.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === data.equipment_request_id ? { ...item, equipment_status: response.data.acceptRequest.equipment_status } : item
          )
        );
        toast.success(response.data.message || "Status Updated Successfully");
        setTimeout(()=>{
            navigate(-1);
          },1000)
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred while updating status.");
      } else {
        toast.error("Network error, please try again.");
      }
    }
  };
  


  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <div className='justify-center items-center flex h-screen border-l-pink-600 shadow-2xl shadow-slate-900'>
      <div className='w-1/3'>
      {equipment.map((item, index) => (
        <form key={index} onSubmit={handleSubmit(AcceptNewEquipmentRequest)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="text-center mb-10">
              <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                Equipment{" "}
                <span className="text-indigo-600">Request</span>
              </h3>
          </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Player Name</label>
          <input type="text" {...register("player_id")} value={item.player_name} readOnly className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" />
          <input type="hidden" {...register("player_id")} value={item.player_id} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
          <input type="text" {...register("equipment_name_id")} value={item.equipment_name} readOnly className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" />
          <input type="hidden" {...register("equipment_name_id")} value={item.equipment_name_id} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Quantity</label>
          <input 
            type="number" 
            defaultValue={item.equipment_quantity} 
            {...register("equipment_quantity", { required: "Quantity is required", min: 1 })}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
          />
        </div>
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
        <button type="button" onClick={() => navigate(-1)} className="rounded-md px-4 py-2 hover:border-indigo-900 border">Cancel</button>
        <button type="submit" className="rounded-md bg-indigo-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Accept</button>
      </div>
    </form>
  ))}
      </div>
</div>

    </>
  );
}

export default AcceptEquipmentRequest