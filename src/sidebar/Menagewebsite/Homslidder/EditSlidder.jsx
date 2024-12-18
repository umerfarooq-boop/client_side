import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dashboard from '../../Dashboard';
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
function EditSlidder() {
    const {id} = useParams();
    const [data,setData] = useState([]);
    const navigation = useNavigate();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/homeslidder/${id}`);
                if(response.data && Array.isArray(response.data.slide)){
                    setData(response.data.slide);
                }else if(response.data && response.data.slide){
                    setData([response.data.slide]);
                }
                setLoading(false);
                // console.log(response.data.slide);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id]);
    
    const {handleSubmit,reset,register} = useForm();
    const EditSlidder = async (data) =>{
        try{
            const formData = new FormData();
            formData.append('slidder_text',data.slidder_text);
            if(data.slidder_image[0]){
                formData.append('slidder_image',data.slidder_image[0]);
            }
            const response = await axios.post(`/updateSlidder/${id}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            }).then((response) => {
                toast.success("Record Updated Successfully");
                setTimeout(() =>{
                console.log(response.data); // Debug response if needed
                navigation('/index_slides');
                },2000)
              })
              .catch((error) => {
                toast.error("Failed to Update Record");
                console.error(error.response?.data || error.message);
              });
        }catch(error){
            console.log(error);
        }
    }

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
                ) : (
                    <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
            <h1 className="text-2xl font-bold text-blue-900 text-center">Upload Slidder Image</h1>
            {
                data.map((index,key) => (
                    <form onSubmit={handleSubmit(EditSlidder)} key={index} className="mt-6 flex flex-col gap-4">
                    {/* <form key={key} className="mt-6 flex flex-col gap-4"> */}
                    {/* Video Title */}
                    <input
                        type="text"
                        {...register('slidder_text')}
                        placeholder="Enter Slidder Text"
                        className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                        defaultValue={index.slidder_text || ''}
                    />
                    
                    {/* Video File */}
                    <input
                        type="file"
                        {...register('slidder_image')}
                        className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                        // defaultValue={index.slidder_image || ''}
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

export default EditSlidder