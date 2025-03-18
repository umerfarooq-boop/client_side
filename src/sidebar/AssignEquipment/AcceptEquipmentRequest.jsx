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

//   const handleReturnEquipment = async (data) => {
//     try {
//       setServerErrors(null);

//       // Store return record
//       const storeResponse = await axios.post("/return_equipment", data);
//       if (storeResponse.status !== 201) {
//         throw new Error("Failed to save return record");
//       }

//       // Update assigned and request tables
//       const returnResponse = await axios.post(`/ReturnEquipment/${id}`, {
//         equipment_quantity: data.quantity,
//       });

//       if (returnResponse.status === 200) {
//         toast.success("Equipment Returned Successfully");
//         reset();
//         navigate(-1);
//       } else {
//         toast.error(returnResponse.data.message || "Failed to return equipment");
//       }
//     } catch (error) {
//       if (error.response?.data?.errors) {
//         setServerErrors(error.response.data.errors);
//         Object.keys(error.response.data.errors).forEach((field) => {
//           setError(field, { type: "server", message: error.response.data.errors[field][0] });
//         });
//       } else {
//         toast.error("Failed to return equipment");
//         console.error("Error:", error);
//       }
//     }
//   };

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
      <div>
  {equipment.map((item, index) => (
    <form key={index} onSubmit={handleSubmit(AcceptNewEquipmentRequest)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Player Name</label>
          <input type="text" {...register("player_id")} value={item.player_name} readOnly className="input-field" />
          <input type="hidden" {...register("player_id")} value={item.player_id} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
          <input type="text" {...register("equipment_name_id")} value={item.equipment_name} readOnly className="input-field" />
          <input type="hidden" {...register("equipment_name_id")} value={item.equipment_name_id} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Quantity</label>
          <input 
            type="number" 
            defaultValue={item.equipment_quantity} 
            {...register("equipment_quantity", { required: "Quantity is required", min: 1 })}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <input 
            type="datetime-local"
            defaultValue={item.return_date_time} 
            {...register("return_date_time")} 
            className="input-field"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button type="button" onClick={() => navigate(-1)} className="btn-cancel">Cancel</button>
        <button type="submit" className="btn-primary">Accept</button>
      </div>
    </form>
  ))}
</div>

    </>
  );
}

export default AcceptEquipmentRequest