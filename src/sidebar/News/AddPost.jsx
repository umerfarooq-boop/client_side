import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from '../../axios'
import Dashboard from "../Dashboard";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
// import { AddressAutofill } from '@mapbox/search-js-react';
import { TextField, MenuItem, Grid, List, ListItem } from '@mui/material';
import { useNavigate } from "react-router-dom";


function AddPost() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
      } = useForm();

      const inputValue = watch('post_location', '');
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
            setTimeout(()=>{
              navigate(-1);
            },1000)
            reset();
          })
          .catch((error) => {
            toast.error("Failed to add Post");
            console.log(error);
          });
      };


      const [error, setErrors] = useState({ post_image: '' });
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;
    
        let errorMessage = '';
        if(name == 'post_image'){
            if(file.type === 'application/image'){
                return "Please Upload image png jpg file"
            }else if (name === 'post_image' && file.size > 180 * 1024) { // 180 KB limit
                errorMessage = 'Image size must be less than 180 KB.';
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };


    const [citySuggestions, setCitySuggestions] = useState([]);
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
            country: 'PK', // Restrict to Pakistan
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
    // setInputValue(query);
    setValue('post_location', query); // Sync with react-hook-form
    fetchCities(query);
    
  };

  const handleCitySelect = (city) => {
    // setInputValue(city);
    setValue('post_location', city); // Sync with react-hook-form
    setCitySuggestions([]);
    // const location = localStorage.setItem('post_location',JSON.stringify(city));
    // console.log(location);
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
  <div className="md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="post_title">
      Post Title
    </label>
    <input
      type="text"
      id="post_title"
      placeholder="Post Title"
      {...register('post_title', {
        required: "Post Title is required",
        maxLength: {
          value: 25,
          message: "Post Title cannot exceed 25 characters"
        }
      })}
      className={`appearance-none block w-full bg-white text-gray-700 border ${
        errors.post_title ? 'border-red-500' : 'border-gray-300'
      } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
      maxLength={25}
    />
    {errors.post_title && (
      <p className="text-red-500 text-xs italic">{errors.post_title.message}</p>
    )}
  </div>

  {/* City */}
  <div className="md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
      City
    </label>
    <input
      type="text"
      id="city"
      placeholder="Enter city name"
      value={inputValue}
      onChange={handleCityChange}
      className={`appearance-none block w-full bg-white text-gray-700 border ${
        errors.profile_location ? 'border-red-500' : 'border-gray-300'
      } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
    />
    {errors.profile_location && (
      <p className="text-red-500 text-xs italic">{errors.profile_location.message}</p>
    )}
    {citySuggestions.length > 0 && (
      <ul className="border border-gray-300 rounded mt-1 max-h-32 overflow-y-auto bg-white z-10">
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
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="post_name">
      Post Name
    </label>
    <input
      type="text"
      id="post_name"
      placeholder="Post Name"
      {...register('post_name', {
        required: "Post Name is required",
        maxLength: {
          value: 25,
          message: "Post Name cannot exceed 25 characters"
        }
      })}
      className={`appearance-none block w-full bg-white text-gray-700 border ${
        errors.post_name ? 'border-red-500' : 'border-gray-300'
      } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
      maxLength={25}
    />
    {errors.post_name && (
      <p className="text-red-500 text-xs italic">{errors.post_name.message}</p>
    )}
  </div>
</div>


    <div className="-mx-3 mb-6">
  {/* Post Description */}
  <div className="w-full px-3 mb-6 md:mb-0">
    <label 
      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" 
      htmlFor="post_description"
    >
      Post Description
    </label>
    <textarea
      id="post_description"
      placeholder="Post Description"
      {...register('post_description', { 
        required: "Post Description is required", 
        validate: {
          maxWords: (value) => {
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= 100 || "Post Description cannot exceed 100 words";
          }
        }
      })}
      className={`appearance-none h-28 block w-full bg-grey-lighter text-grey-darker border ${
        errors.post_description ? 'border-red-500' : 'border-grey-lighter'
      } rounded py-3 px-4 mb-3`}
    />
    {errors.post_description && (
      <p className="text-red-500 text-xs italic">
        {errors.post_description.message}
      </p>
    )}
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
      <div className="md:w-1/2 px-3 hidden">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_status">
          Post Status
        </label>
        <select
          id="post_status"
          {...register('post_status', { required: "Post Status is required" })}
          className={`hidden  appearance-none w-full bg-grey-lighter border ${
            errors.post_status ? 'border-red-500' : 'border-grey-lighter'
          } text-grey-darker py-3 px-4 pr-8 rounded`}
        >
          <option selected disabled>Select Status</option>
          <option value="active" selected>Active</option>
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
