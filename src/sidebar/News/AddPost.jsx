import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from '../../axios'; // Make sure this has a working baseURL
import Dashboard from "../Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const coach_id = localStorage.getItem('coach_id');
  const post_image = watch('post_image');
  const inputValue = watch('post_location', '');

  // Fetch city suggestions from Mapbox API
  const fetchCities = async (query) => {
    if (!query) {
      setCitySuggestions([]);
      return;
    }

    const accessToken = 'pk.eyJ1IjoidW1lcndhbGkiLCJhIjoiY20ycGM0aWRrMGxmYjJtc2N2eWRvZHNpNiJ9._eLwWDk871QbnYrq8lcOkw';
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token: accessToken,
            country: 'PK',
            types: 'place',
          },
        }
      );
      const cities = response.data.features.map((feature) => feature.place_name);
      setCitySuggestions(cities);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleCityChange = (event) => {
    const query = event.target.value;
    setValue('post_location', query);
    fetchCities(query);
  };

  const handleCitySelect = (city) => {
    setValue('post_location', city);
    setCitySuggestions([]);
  };

  // Form submit handler
  const addPost = async (data) => {
    const formData = new FormData();
    formData.append('post_title', data.post_title);
    formData.append('post_name', data.post_name);
    formData.append('post_description', data.post_description || '');
    formData.append('post_location', data.post_location || '');
    formData.append('post_status', data.post_status);
    formData.append('coach_id', coach_id);

    if (data.post_image && data.post_image.length > 0) {
      formData.append('post_image', data.post_image[0]);
    }

    try {
      await axios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Post added successfully");
      reset();
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      toast.error("Failed to add post");
      console.error(error);
    }
  };

  return (
    <Dashboard>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="text-center mb-4">
          <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Add Post</h1>
        </div>

        <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-6">
          <div className="-mx-3 md:flex mb-6">
            {/* Post Title */}
            <div className="md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-xs font-bold mb-2">Post Title</label>
              <input
                type="text"
                {...register('post_title', {
                  required: "Post Title is required",
                  maxLength: { value: 25, message: "Max length is 25 characters" }
                })}
                className={`w-full bg-white border ${errors.post_title ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
                placeholder="Post Title"
              />
              {errors.post_title && <p className="text-red-500 text-xs italic">{errors.post_title.message}</p>}
            </div>

            {/* City */}
            <div className="md:w-1/3 px-3 mb-6 md:mb-0 relative">
              <label className="block text-gray-700 text-xs font-bold mb-2">City</label>
              <input
                type="text"
                value={inputValue}
                onChange={handleCityChange}
                className={`w-full bg-white border ${errors.post_location ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
                placeholder="Enter city name"
              />
              {citySuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-32 overflow-y-auto">
                  {citySuggestions.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleCitySelect(city)}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Post Name */}
            <div className="md:w-1/3 px-3">
              <label className="block text-gray-700 text-xs font-bold mb-2">Post Name</label>
              <input
                type="text"
                {...register('post_name', {
                  required: "Post Name is required",
                  maxLength: { value: 25, message: "Max length is 25 characters" }
                })}
                className={`w-full bg-white border ${errors.post_name ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
                placeholder="Post Name"
              />
              {errors.post_name && <p className="text-red-500 text-xs italic">{errors.post_name.message}</p>}
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            {/* Post Description */}
            <div className="md:w-full px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-xs font-bold mb-2">Post Description</label>
              <textarea
                rows={3}
                {...register('post_description', {
                  required: "Post Description is required",
                  validate: (value) =>
                    value.trim().split(/\s+/).length <= 120 || "Post Description cannot exceed 120 words",
                })}
                className={`w-full resize-none bg-white border ${errors.post_description ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
                placeholder="Post Description"
              />
              {errors.post_description && (
                <p className="text-red-500 text-xs italic">{errors.post_description.message}</p>
              )}
            </div>

            {/* Post Image */}
            
          </div>
          <div className="-mx-3 md:flex mb-6">
            {/* Post Description */}
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-xs font-bold mb-2">Post Image</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                {...register('post_image', {
                  validate: (files) => {
                    const file = files?.[0];
                    if (!file) return true; // allow optional
                    const isValidType = ["image/png", "image/jpeg"].includes(file.type);
                    const isValidSize = file.size <= 180 * 1024;
                    if (!isValidType) return "Only PNG or JPG allowed";
                    if (!isValidSize) return "Image must be less than 180 KB";
                    return true;
                  },
                })}
                className="w-full py-3 px-4 border border-gray-300 rounded"
              />
              {errors.post_image && (
                <p className="text-red-500 text-xs italic">{errors.post_image.message}</p>
              )}
            </div>

            {/* Post Image */}
            
          </div>

          {/* Hidden Fields */}
          <input type="hidden" {...register('post_status')} value="active" />
          <input type="hidden" {...register('coach_id')} value={coach_id} />

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 px-28 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}

export default AddPost;
