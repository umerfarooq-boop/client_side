import React from 'react'
import Dashboard from '../Dashboard'
import { ToastContainer,toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from '../../axios'

function AddEquipment() {
    const {handleSubmit,register,reset} = useForm()
    const coach_id = localStorage.getItem('coach_id');

    const AddEquip = async (data) => {
        try {
            const response = await axios.post('/assign_equipment', data);
            
            if (response.data.success) {
                toast.success(response.data.message); // Display success message
            } else {
                toast.error(response.data.message); // Display error message from backend
            }
            reset();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Display backend validation error
            } else {
                toast.error("An error occurred. Please try again."); // Display generic error
            }
        }
    };

  return (
    <>
        <Dashboard>
        <ToastContainer />
        <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
                  <h1 className="text-2xl font-bold text-blue-900 text-center">Add Equipment</h1>
                  <form onSubmit={handleSubmit(AddEquip)} className="mt-6 flex flex-col gap-4">
                      {/* Video Title */}
                      <input
                          type="hidden"
                          {...register('coach_id')}
                          value={coach_id}
                          placeholder="Coach Name"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />

                        {/* Equipment Name */}

                        <input type="text" {...register('equipment_name')} placeholder='Equipment Name' className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white" />

                        {/* Equipment Name */}

                      <input
                          type="number"
                          {...register('equipment_quantity')}
                          min={0}
                          placeholder="Quantity"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />
                      
                      <input
                          type="hidden"
                          {...register('equipment_status')}
                          value={'reject'}
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />
                      
                      
                      <button
                          type="submit"
                          className="w-full p-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition duration-300"
                      >
                          Submit
                      </button>
                  </form>
        </div>
        </Dashboard>
    </>
  )
}

export default AddEquipment