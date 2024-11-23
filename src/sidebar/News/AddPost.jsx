import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from '../../axios'
import Dashboard from "../Dashboard";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling


function AddPost() {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
      } = useForm();
    
      const coach_id = localStorage.getItem('coach_id');
      const location = localStorage.getItem('location');
      const post_image = watch('post_image');
    
      const addPost = (data) => {
        const formData = new FormData();
    
        // Append form data
        formData.append('post_title', data.post_title);
        formData.append('post_name', data.post_name);
        formData.append('post_description', data.post_description || '');
        formData.append('post_location', data.post_location || '');
        formData.append('post_status', data.post_status);
        formData.append('coach_id', coach_id);
    
        // Append file if available
        if (post_image && post_image[0]) {
          formData.append('post_image', post_image[0]); // First file from input
        }
    
        axios
          .post('/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            toast.success("Post Add Successfully");
            // console.log(response.data.vedio);
            reset();
          })
          .catch((error) => {
            toast.error("Failed to add Post");
            console.log(error);
          });
      };


      

  return (
    <>
      <Dashboard>
        <ToastContainer />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  <div className="text-center mb-4">
    <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Add Post</h1>
  </div>
  <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-6">
    <div className="-mx-3 md:flex mb-6">
      {/* Post Title */}
      <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_title">
          Post Title
        </label>
        <input
          type="text"
          id="post_title"
          placeholder="Post Title"
          {...register('post_title', { required: "Post Title is required" })}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors.post_title ? 'border-red-500' : 'border-grey-lighter'
          } rounded py-3 px-4 mb-3`}
        />
        {errors.post_title && <p className="text-red text-xs italic">Please fill out this field.</p>}
      </div>
      
      {/* Post Name */}
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_name">
          Post Name
        </label>
        <input
          type="text"
          id="post_name"
          placeholder="Post Name"
          {...register('post_name', { required: "Post Name is required" })}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors.post_name ? 'border-red-500' : 'border-grey-lighter'
          } rounded py-3 px-4`}
        />
      </div>
    </div>

    <div className="-mx-3 md:flex mb-6">
      {/* Post Description */}
      <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_description">
          Post Description
        </label>
        <textarea
          id="post_description"
          placeholder="Post Description"
          {...register('post_description')}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors.post_description ? 'border-red-500' : 'border-grey-lighter'
          } rounded py-3 px-4 mb-3`}
        />
      </div>

      {/* Post Location */}
      <div className="md:w-1/2 px-3">
        {/* <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_location">
          Post Location
        </label> */}
        <input
          type="hidden"
          value={location}
          id="post_location"
          placeholder="Post Location"
          {...register('post_location')}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors.post_location ? 'border-red-500' : 'border-grey-lighter'
          } rounded py-3 px-4`}
        />
      </div>
    </div>

    <div className="-mx-3 md:flex mb-6">
      {/* Post Image */}
      <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_image">
          Post Image
        </label>
        <input
          type="file"
          id="post_image"
          {...register('post_image')}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors.post_image ? 'border-red-500' : 'border-grey-lighter'
          } rounded py-3 px-4`}
        />
      </div>

      {/* Post Status */}
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_status">
          Post Status
        </label>
        <select
          id="post_status"
          {...register('post_status', { required: "Post Status is required" })}
          className={`block appearance-none w-full bg-grey-lighter border ${
            errors.post_status ? 'border-red-500' : 'border-grey-lighter'
          } text-grey-darker py-3 px-4 pr-8 rounded`}
        >
          <option selected disabled>Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    {/* Coach ID (hidden) */}
    <input type="hidden" {...register('coach_id')} value={coach_id} />

    {/* Submit Button */}
    <button
      type="submit"
      className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
    >
      Submit
    </button>
  </form>
</div>

      </Dashboard>
    </>
  );
}

export default AddPost
