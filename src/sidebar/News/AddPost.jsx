import React from "react";
import { useForm } from "react-hook-form";
import axios from '../../axios'

function AddPost() {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
      } = useForm();
    
      const coach_id = localStorage.getItem('coach_id');
      const post_image = watch('post_image'); // Watch the file input for changes
    
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
            console.log('Record Saved Successfully', response.data);
            reset(); // Reset the form after submission
          })
          .catch((error) => {
            console.error('Error uploading post:', error);
          });
      };

  return (
    <>
 
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
          <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                    Add Post
                  </h1>
                </div>
                <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit(addPost)} >
  <div className="mx-auto max-w-md flex flex-col gap-4">
    {/* Post Title */}
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_title ? 'border-red-500' : 'border-gray-200'
        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        type="text"
        placeholder="Post Title"
        {...register('post_title', { required: "Post Title is required" })}
      />
      {errors.post_title && (
        <p className="text-red-500 text-xs mt-1">{errors.post_title.message}</p>
      )}
    </div>

    {/* Post Name */}
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_name ? 'border-red-500' : 'border-gray-200'
        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        type="text"
        placeholder="Post Name"
        {...register('post_name', { required: "Post Name is required" })}
      />
      {errors.post_name && (
        <p className="text-red-500 text-xs mt-1">{errors.post_name.message}</p>
      )}
    </div>

    {/* Post Description */}
    <div>
      <textarea
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_description ? 'border-red-500' : 'border-gray-200'
        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        placeholder="Post Description"
        {...register('post_description')}
      />
      {errors.post_description && (
        <p className="text-red-500 text-xs mt-1">
          {errors.post_description.message}
        </p>
      )}
    </div>

    {/* Post Image */}
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_image ? 'border-red-500' : 'border-gray-200'
        } text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        type="file"
        {...register('post_image')}
      />
      {errors.post_image && (
        <p className="text-red-500 text-xs mt-1">{errors.post_image.message}</p>
      )}
    </div>

    {/* Post Location */}
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_location ? 'border-red-500' : 'border-gray-200'
        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        type="text"
        placeholder="Post Location"
        {...register('post_location')}
      />
      {errors.post_location && (
        <p className="text-red-500 text-xs mt-1">{errors.post_location.message}</p>
      )}
    </div>

    {/* Post Status */}
    <div>
      <select
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
          errors.post_status ? 'border-red-500' : 'border-gray-200'
        } text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        {...register('post_status', { required: "Post Status is required" })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {errors.post_status && (
        <p className="text-red-500 text-xs mt-1">{errors.post_status.message}</p>
      )}
    </div>

    {/* Coach ID */}
    <div>
    <input
  type="hidden"
  {...register('coach_id')}
  value={coach_id}
/>

    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    >
      <span className="ml-3">Submit</span>
    </button>
  </div>
</form>

                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default AddPost
