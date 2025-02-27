import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { ToastContainer,toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from '../axios'
import Select from "react-select";
function Equipment_Request() {
    const [equipment,setEquipment] = useState([]);
    const player_id = localStorage.getItem('player_id');
    const coach_record = localStorage.getItem('coach_record');
    const { register, handleSubmit, reset, setValue } = useForm();
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [quantities, setQuantities] = useState({});
  
    useEffect(()=>{
        const getEquipment = async () => {
            const response = await axios.get(`/assign_equipment/${coach_record}`);
            setEquipment(response.data.equipment);
            const equip = response.data.equipment;
            console.log(equip);
        }  
        getEquipment();
    },[player_id])

    
    useEffect(() => {
      const getEquipment = async () => {
        const response = await axios.get(`/assign_equipment/${coach_record}`);
        const options = response.data.equipment.map((item) => ({
          value: item.id,
          label: item.equipment_name,
          maxQuantity: item.equipment_quantity,
        }));
        setEquipmentOptions(options);
      };
      getEquipment();
    }, [coach_record]);
  
    // Handle equipment selection
    const handleSelectChange = (selected) => {
      setSelectedEquipment(selected || []);
      const updatedQuantities = {};
      (selected || []).forEach((item) => {
        if (!quantities[item.value]) {
          updatedQuantities[item.value] = 0; // Default quantity
        } else {
          updatedQuantities[item.value] = quantities[item.value]; // Preserve existing values
        }
      });
      setQuantities(updatedQuantities);
    };
  
    // Handle quantity change
    const handleQuantityChange = (id, value) => {
      setQuantities({
        ...quantities,
        [id]: value,
      });
    };
  
    // Submit the request
    const ReqEquip = async (data) => {
      try {
        const payload = {
          player_id,
          coach_id: coach_record,
          equipment: selectedEquipment.map((item) => ({
            equipment_name_id: item.value,
            equipment_quantity: quantities[item.value],
          })),
          return_date_time: data.return_date_time.replace("T", " ") + ":00",
        };
  
        const response = await axios.post("/request_equipment", payload);
        reset();
        setSelectedEquipment([]);
        setQuantities({});
        if (response.data && response.data.message) {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const validationMessages = Object.values(error.response.data.errors)
            .flat()
            .join(", ");
          toast.error(validationMessages);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };
  
    
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

          <div className="mb-4">
        <label className="block font-medium">Select Equipment</label>
        <Select
          options={equipmentOptions}
          isMulti
          onChange={handleSelectChange}
        />
      </div>

      {/* Quantity Inputs */}
      {selectedEquipment.map((item) => (
        <div key={item.value} className="mb-2">
          <label className="block font-medium">
            {item.label} (Max: {item.maxQuantity})
          </label>
          <input
            type="number"
            min="1"
            max={item.maxQuantity}
            value={quantities[item.value] || ""}
            onChange={(e) => handleQuantityChange(item.value, e.target.value)}
            placeholder="Quantity"
            className="block w-full p-2 border rounded"
          />
        </div>
      ))}


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
