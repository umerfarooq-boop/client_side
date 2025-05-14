// AddHomeSliddder

import React, { useState } from 'react'
import Dashboard from '../../Dashboard'
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { use } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Add_about_question() {

  const {handleSubmit,register,reset,watch} = useForm();
  const [slidder,setSlidder] = useState();
  const image = watch('image');
  const navigation = useNavigate();
  const AddService = async (data) =>{
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('question',data.question);
    formData.append('description',data.description);
    formData.append('image',data.image[0]);
    try{
      const response = await axios.post('/frequentlyquestion',formData,{
        headers:{
          'Content-Type' : 'multipart/form-data',
        },
      });
      reset();
      toast.success('Record Saved Successfully');
      setTimeout(() =>{
        navigation('/index_about_question');
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
                  <h1 className="text-2xl font-bold text-blue-900 text-center">Add Feature Service</h1>
                  <form onSubmit={handleSubmit(AddService)} className="mt-6 flex flex-col gap-4">
                      {/* Video Title */}
                      <input
                          type="text"
                          {...register('title')}
                          placeholder="Title"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />
                      <input
                          type="text"
                          {...register('question')}
                          placeholder="Question.......?"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                      />
                      <input
                          type="text"
                          {...register('description')}
                          placeholder="Description"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
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
        </div>
      </Dashboard>
    </>
  )
}

export default Add_about_question