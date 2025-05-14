import React, { useEffect, useState } from 'react'
import Dashboard from '../../Dashboard'
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { use } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
function Update_about_question() {

  const {handleSubmit,register,reset,watch} = useForm();
  const [slidder,setSlidder] = useState();
  const image = watch('image');
  const [data,setData] = useState([]);
  const navigation = useNavigate();
  const [loading,setLoading] = useState(true);
  const {id} = useParams();
  const UpdateQuestion = async (data) =>{
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('question', data.question);
    formData.append('description', data.description);
    if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]); 
    }
    try{
      const response = await axios.post(`/UpdateFrequentlyQuestion/${id}`,formData,{
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

  useEffect(() =>{
    const getData = async () =>{
        try {
            const response = await axios.get(`/frequentlyquestion/${id}`);
            if (response.data && Array.isArray(response.data.frequentlyquestion)) {
                setData(response.data.frequentlyquestion);
            }else if(response.data && response.data.frequentlyquestion){
                setData([response.data.frequentlyquestion])
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    getData();
  },[id])

  return (
    <>
      <Dashboard>
        <ToastContainer/>
        {
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
            ): (
                <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
            <h1 className="text-2xl font-bold text-blue-900 text-center">Add Feature Service</h1>
            {
                data.map((index,key) =>(
                    <form onSubmit={handleSubmit(UpdateQuestion)} key={key} className="mt-6 flex flex-col gap-4">
                      {/* Video Title */}
                      <input
                          type="text"
                          {...register('title')}
                          placeholder="Title"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.title}
                      />
                      <input
                          type="text"
                          {...register('question')}
                          placeholder="Question.......?"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.question}
                      />
                      <input
                          type="text"
                          {...register('description')}
                          placeholder="Description"
                          className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                          defaultValue={index.description}
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
            )
        }
      </Dashboard>
    </>
  )
}

export default Update_about_question