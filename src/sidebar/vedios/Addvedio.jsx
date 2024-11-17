import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Dashboard from '../Dashboard';

function Addvedio() {
    const { register, handleSubmit, reset, watch } = useForm();
    const vedios = watch('vedio');

    const Addvedio = async (data) => {
        const formData = new FormData();
        formData.append('vedio_title', data.vedio_title);
        formData.append('vedio', data.vedio[0]);

        try {
            const response = await axios.post('/vedio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Show success notification
            toast.success("Vedio Post Successfully");
            console.log(response.data.vedio);
            reset();
        } catch (error) {
            // Show error notification
            toast.error("Failed to add video");
            console.log(error);
        }
    }

    return (
        <>  
            {/* <Dashboard */}
            <Dashboard>
            <ToastContainer /> {/* Include the ToastContainer */}
            <div className="bg-white border shadow sm:rounded-lg max-w-md mx-auto p-8">
                <h1 className="text-2xl font-bold text-blue-900 text-center">Upload Video</h1>
                <form onSubmit={handleSubmit(Addvedio)} className="mt-6 flex flex-col gap-4">
                    {/* Video Title */}
                    <input
                        type="text"
                        {...register('vedio_title')}
                        placeholder="Enter Video Title"
                        className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                    />
                    
                    {/* Video File */}
                    <input
                        type="file"
                        {...register('vedio')}
                        className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white"
                    />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
            </Dashboard>
        </>
    );
}

export default Addvedio;
