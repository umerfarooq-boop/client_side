import React, { useEffect, useState } from 'react'
import Dashboard from '../../Dashboard'
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { use } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
function Update_service() {
  const {handleSubmit,register,reset,watch} = useForm();
  const [slidder,setSlidder] = useState();
  const service_image = watch('service_image');
  const navigation = useNavigate();
  const {id} = useParams();
  const [data,setData] = useState([]);
    useEffect(() => {
        const getData = async () =>{
            try {
                const response = await axios.get(`/homeservice/${id}`);
                if(response.data && Array.isArray(response.data.service)){
                    setData(response.data.service)
                }else if(response.data && response.data.service){
                    setData([response.data.service]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    },[id]);

  const UpdateService = async (data) =>{
    const formData = new FormData();
    formData.append('service_text',data.service_text);
    formData.append('service_image',data.service_image[0]);
    try{
      const response = await axios.post(`/UpdateService/${id}`,formData,{
        headers:{
          'Content-Type' : 'multipart/form-data',
        },
      });
      reset();
      toast.success('Record Saved Successfully');
      setTimeout(() =>{
        navigation('/index_services');
      },1500)
    }catch(error){
      toast.error("Record Not Saved");
      console.log(error);
    }
  }

  return (
    <>
      <Dashboard>
        <ToastContainer/>
        <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
            <h1 className="text-2xl font-bold text-blue-900 text-center">Upload Slidder Image</h1>
            {
                data.map((index,key) =>(
                    <form onSubmit={handleSubmit(UpdateService)} key={key} className="mt-6 flex flex-col gap-4">
                      {/* Video Title */}
                      <input
                          type="text"
                          {...register('service_text')}
                          placeholder="Enter Slidder Text"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.service_text || ''}
                      />
                      
                      {/* Video File */}
                      <input
                          type="file"
                          {...register('service_image')}
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />
                      
                      {/* Submit Button */}
                      <button
                          type="submit"
                          className="w-full p-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition duration-300"
                      >
                          Submit
                      </button>
                    </form>
                ))
            }   
        </div>
      </Dashboard>
    </>
  )
}

export default Update_service