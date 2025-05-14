// AddHomeSliddder

import React, { useState,useEffect } from 'react'
import Dashboard from '../../Dashboard'
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { use } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
function Update_about_service() {

  const {handleSubmit,register,reset,watch} = useForm();
  const [slidder,setSlidder] = useState();
  const image = watch('image');
  const navigation = useNavigate();
  const [data,setData] = useState([]);
  const {id} = useParams();
  const AddService = async (data) =>{
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    if (formData.image && formData.image.length > 0) {
        requestData.append('image', formData.image[0]);
      }
    try{
      const response = await axios.post(`/UpdateFeatureService/${id}`,formData,{
        headers:{
          'Content-Type' : 'multipart/form-data',
        },
      });
      reset();
      toast.success('Record Update Successfully');
      setTimeout(() =>{
        navigation('/index_about_services');
      },1500)
    }catch(error){
      toast.error("Record Not Saved");
      console.log(error);
    }
  }

  useEffect(() => {
    const getFormData = async () => {
        try {
            const response = await axios.get(`/featureservice/${id}`);
            if (response.data && Array.isArray(response.data.feature_service)) {
                setData(response.data.feature_service);
            } else if (response.data && response.data.feature_service) {
                setData([response.data.feature_service]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    getFormData();
}, [id]);


  return (
    <>
      <Dashboard>
        <ToastContainer/>
        <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
            <h1 className="text-2xl font-bold text-blue-900 text-center">Update Feature Service</h1>
            {
                data.map((index,key) => (
                    <form onSubmit={handleSubmit(AddService)} key={key} className="mt-6 flex flex-col gap-4">
                      {/* Video Title */}
                      <input
                          type="text"
                          {...register('title')}
                          placeholder="Enter Service Text"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.title || ''}
                      />
                      <input
                          type="text"
                          {...register('description')}
                          placeholder="Enter Description Text"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.description || ''}
                      />
                      
                      {/* Video File */}
                      <input
                          type="file"
                          {...register('image')}
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

export default Update_about_service