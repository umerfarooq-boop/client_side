<<<<<<< HEAD
// import React, { useEffect, useState } from "react";
// import Dashboard from "../Dashboard";
// import { useParams } from "react-router-dom";
// import axios from "../../axios";
// import { ToastContainer, toast } from "react-toastify";
// import { useForm } from 'react-hook-form';
// import 'ckeditor5/ckeditor5.css';
// import { RotatingLines } from 'react-loader-spinner';

// function Updatenews() {
//   const [loading,setLoading] = useState(false);
//   const { id } = useParams();
//   const {
//     handleSubmit,
//     reset,
//     watch,
//     register,
//     formState: { errors },
//   } = useForm();
//   const location = localStorage.getItem("location" || "");
//   const [post, setPost] = useState([]);
//   useEffect(() => {
//     const getPost = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/posts/${id}`);
//         setPost(response.data.post);
//         console.log(response.data.post);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getPost();
//   }, [id]);
//   const updatePost = async (data) => {
//     try {
//       const formData = new FormData();
//       for (let key in data) {
//         formData.append(key, data[key]);
//       }
//       if (data.post_image[0]) {
//         formData.append("post_image", data.post_image[0]);
//       }

//       await axios.post(`/updatePost/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Post Updated Successfully");
//       reset();
//     } catch (error) {
//       console.error("Error updating post:", error);
//       toast.error("Failed to Update Post");
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <>
//       <>
//         <Dashboard>
//           <ToastContainer />
//           {/* <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-6"> */}
//           {
//             loading ? (
// <div className="flex flex-col items-center justify-center h-screen">
//             <RotatingLines 
//               visible={true}
//               height="96"
//               width="96"
//               color="grey"
//               strokeWidth="5"
//               animationDuration="0.75"
//               ariaLabel="rotating-lines-loading"
//             />
//           </div>
//             ) : (
//               <div>
//                           {post.map((index, key) => (
//             <form
//               className="flex flex-col gap-6"
//               onSubmit={handleSubmit(updatePost)}
//               key={index}
//             >
//               <div className="-mx-3 md:flex mb-6">
//                 {/* Post Title */}
//                 <div className="md:w-1/2 px-3 mb-6 md:mb-0">
//                   <label
//                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//                     htmlFor="post_title"
//                   >
//                     Post Title
//                   </label>
//                   <input
//                     type="text"
//                     id="post_title"
//                     placeholder="Post Title"
//                     defaultValue={index.post_title}
//                     {...register("post_title", {
//                       required: "Post Title is required",
//                     })}
//                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
//                       errors.post_title
//                         ? "border-red-500"
//                         : "border-grey-lighter"
//                     } rounded py-3 px-4 mb-3`}
//                   />
//                   {errors.post_title && (
//                     <p className="text-red text-xs italic">
//                       Please fill out this field.
//                     </p>
//                   )}
//                 </div>

//                 {/* Post Name */}
//                 <div className="md:w-1/2 px-3">
//                   <label
//                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//                     htmlFor="post_name"
//                   >
//                     Post Name
//                   </label>
//                   <input
//                     type="text"
//                     id="post_name"
//                     placeholder="Post Name"
//                     defaultValue={index.post_name}
//                     {...register("post_name", {
//                       required: "Post Name is required",
//                     })}
//                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
//                       errors.post_name
//                         ? "border-red-500"
//                         : "border-grey-lighter"
//                     } rounded py-3 px-4`}
//                   />
//                 </div>
//               </div>

//               <div className="-mx-3 md:flex mb-6">
//                 {/* Post Description */}
//                 <div className="md:w-full px-3 mb-6 md:mb-0">
//                 <label
//                   className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//                   htmlFor="post_description"
//                 >
//                   Post Description
//                 </label>
//                 <textarea
//                   id="post_description"
//                   placeholder="Post Description"
//                   defaultValue={index.post_description}
//                   {...register('post_description', { required: "Post Description is required" })}
//                   className={`appearance-none block w-full h-40 bg-grey-lighter text-grey-darker border ${
//                     errors.post_description
//                       ? "border-red-500"
//                       : "border-grey-lighter"
//                   } rounded py-3 px-4 mb-3`}
//                 />
//               </div>



//                 {/* Post Location */}
//                 {/* <div className="md:w-1/2 px-3"> */}
//                 {/* <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_location">
//           Post Location
//         </label> */}
//                 <input
//                   type="hidden"
//                   defaultValue={location}
//                   id="post_location"
//                   placeholder="Post Location"
//                   {...register("post_location")}
//                   className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
//                     errors.post_location
//                       ? "border-red-500"
//                       : "border-grey-lighter"
//                   } rounded py-3 px-4`}
//                 />
//               </div>
//               {/* </div> */}

//               <div className="-mx-3 md:flex mb-6">
//                 {/* Post Image */}
//                 <div className="md:w-1/2 px-3 mb-6 md:mb-0">
//                   <label
//                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                     htmlFor="image"
//                   >
//                     Post Image
//                   </label>
//                   <input
//                     type="file"
//                     id="image"
//                     {...register("post_image")}
//                     onChange={handleImageChange}
//                     className="block w-full text-gray-700 bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
//                   />
//                 </div>


//                 {/* Post Status */}
//                 <div className="md:w-1/2 px-3">
//                   <label
//                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//                     htmlFor="post_status"
//                   >
//                     Post Status
//                   </label>
//                   <select
//                     id="post_status"
//                     defaultValue={index.post_status}
//                     {...register("post_status", {
//                       required: "Post Status is required",
//                     })}
//                     className={`block appearance-none w-full bg-grey-lighter border ${
//                       errors.post_status
//                         ? "border-red-500"
//                         : "border-grey-lighter"
//                     } text-grey-darker py-3 px-4 pr-8 rounded`}
//                   >
//                     <option selected disabled>
//                       Select Status
//                     </option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Coach ID (hidden) */}
//               <input
//                 type="hidden"
//                 {...register("coach_id")}
//                 value={index.coach_id}
//               />
//               {/* <input type="text"  value={index.coach_id} /> */}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
//               >
//                 Submit
//               </button>
//             </form>
//           ))}
//               </div>
//             )
//           }
//         </Dashboard>
//       </>
//     </>
//   );
// }

// export default Updatenews;


import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

function Updatenews() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate from react-router-dom

=======
import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import 'ckeditor5/ckeditor5.css';
import loadingAnimation from '../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import { useNavigate } from "react-router-dom";

function Updatenews() {
  const [loader,setLoading] = useState(false);
  const { id } = useParams();
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const {
    handleSubmit,
    reset,
    watch,
    register,
<<<<<<< HEAD
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const location = localStorage.getItem("location") || "";
  const [post, setPost] = useState([]);

=======
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = localStorage.getItem("location" || "");
  const [post, setPost] = useState([]);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data.post);
<<<<<<< HEAD
        const postData = response.data.post[0];
        setValue("post_title", postData.post_title);
        setValue("post_name", postData.post_name);
        setValue("post_description", postData.post_description);
        setValue("post_location", location);
        setValue("post_status", postData.post_status);
        setValue("coach_id", postData.coach_id);
        setImagePreview(postData.post_image_url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPost();
  }, [id, location, setValue]);

=======
        console.log(response.data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const updatePost = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
<<<<<<< HEAD
        if (key !== "post_image") {
          formData.append(key, data[key]);
        }
      }
      if (data.post_image && data.post_image[0]) {
=======
        formData.append(key, data[key]);
      }
      if (data.post_image[0]) {
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        formData.append("post_image", data.post_image[0]);
      }

      await axios.post(`/updatePost/${id}`, formData, {
<<<<<<< HEAD
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post Updated Successfully");

      // Redirect to the previous page after successful post update
      navigate(-1); // -1 goes back to the previous page in the browser history

      reset(); // Reset the form state
=======
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post Updated Successfully");
      reset();
      setTimeout(() => navigate(-1), 1000);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to Update Post");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

<<<<<<< HEAD
  // Custom validator to ensure input is not just whitespace
  const notEmpty = value => value?.trim() !== '' || "This field cannot be empty";

  return (
    <Dashboard>
      <ToastContainer />
      {loading ? (
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
        <form onSubmit={handleSubmit(updatePost)} className="flex flex-col gap-6 p-6">
          {/* Post Title */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2">Post Title</label>
            <input
              type="text"
              {...register("post_title", {
                required: "Post Title is required",
                validate: notEmpty,
              })}
              className={`w-full bg-white border ${errors.post_title ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
            />
            {errors.post_title && (
              <p className="text-red-600 text-xs italic font-bold">{errors.post_title.message}</p>
            )}
          </div>

          {/* Post Name */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2">Post Name</label>
            <input
              type="text"
              {...register("post_name", {
                required: "Post Name is required",
                validate: notEmpty,
              })}
              className={`w-full bg-white border ${errors.post_name ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
            />
            {errors.post_name && (
              <p className="text-red-600 text-xs italic font-bold">{errors.post_name.message}</p>
            )}
          </div>

          {/* Post Description */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2">Post Description</label>
            <textarea
              rows={4}
              {...register("post_description", {
                required: "Post Description is required",
                validate: notEmpty,
              })}
              className={`w-full resize-none bg-white border ${errors.post_description ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4`}
            />
            {errors.post_description && (
              <p className="text-red-600 text-xs italic font-bold">{errors.post_description.message}</p>
            )}
          </div>

          {/* Post Image and Post Status in Same Row */}
          <div className="flex flex-wrap gap-4">
            {/* Post Image */}
            <div className="w-full md:w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                Post Image
              </label>
              <input
                type="file"
                id="image"
                {...register("post_image")}
                onChange={handleImageChange}
                className="block w-full text-gray-700 bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-1/2" />}
            </div>

            {/* Post Status */}
            <div className="w-full md:w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_status">
                Post Status
              </label>
              <select
                id="post_status"
                {...register("post_status", {
                  required: "Post Status is required",
                })}
                className={`block appearance-none w-full bg-grey-lighter border ${errors.post_status ? "border-red-500" : "border-grey-lighter"} text-grey-darker py-3 px-4 pr-8 rounded`}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.post_status && (
                <p className="text-red-600 text-xs italic font-bold">{errors.post_status.message}</p>
              )}
            </div>
          </div>

          {/* Hidden Fields */}
          <input type="hidden" {...register("post_location")} value={location} />
          <input type="hidden" {...register("coach_id")} />

          {/* Submit */}
          <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 px-10 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Update Post
          </button>
        </form>
      )}
    </Dashboard>
=======
  return (
    <>
      <>
        <Dashboard>
          <ToastContainer />
          {/* <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-6"> */}
         {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
              <div>
                          {post.map((index, key) => (
            <form
              className="flex flex-col gap-6 px-6 py-4"
              onSubmit={handleSubmit(updatePost)}
              key={index}
            >
             
              <div className="md:flex md:space-x-4">
                {/* Post Title */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_title"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="post_title"
                    placeholder="Post Title"
                    defaultValue={index.post_title}
                    {...register("post_title", {
                      required: "Post Title is required",
                    })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.post_title
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4 mb-3`}
                  />
                  {errors.post_title && (
                    <p className="text-red text-xs italic">
                      Please fill out this field.
                    </p>
                  )}
                </div>

                {/* Post Name */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_name"
                  >
                    Post Name
                  </label>
                  <input
                    type="text"
                    id="post_name"
                    placeholder="Post Name"
                    defaultValue={index.post_name}
                    {...register("post_name", {
                      required: "Post Name is required",
                    })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.post_name
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                {/* Post Description */}
                <div className="md:w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="post_description"
                >
                  Post Description
                </label>
                <textarea
                  id="post_description"
                  placeholder="Post Description"
                  defaultValue={index.post_description}
                  {...register('post_description', { required: "Post Description is required" })}
                  className={`appearance-none block w-full h-40 bg-grey-lighter text-grey-darker border ${
                    errors.post_description
                      ? "border-red-500"
                      : "border-grey-lighter"
                  } rounded py-3 px-4 mb-3`}
                />
              </div>



                {/* Post Location */}
                {/* <div className="md:w-1/2 px-3"> */}
                {/* <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="post_location">
          Post Location
        </label> */}
                <input
                  type="hidden"
                  defaultValue={location}
                  id="post_location"
                  placeholder="Post Location"
                  {...register("post_location")}
                  className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                    errors.post_location
                      ? "border-red-500"
                      : "border-grey-lighter"
                  } rounded py-3 px-4`}
                />
              </div>
              {/* </div> */}

              <div className="-mx-3 md:flex mb-6">
                {/* Post Image */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="image"
                  >
                    Post Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    {...register("post_image")}
                    onChange={handleImageChange}
                    className="block w-full text-gray-700 bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  />
                </div>


                {/* Post Status */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_status"
                  >
                    Post Status
                  </label>
                  <select
                    id="post_status"
                    defaultValue={index.post_status}
                    {...register("post_status", {
                      required: "Post Status is required",
                    })}
                    className={`block appearance-none w-full bg-grey-lighter border ${
                      errors.post_status
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } text-grey-darker py-3 px-4 pr-8 rounded`}
                  >
                    <option selected disabled>
                      Select Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Coach ID (hidden) */}
              <input
                type="hidden"
                {...register("coach_id")}
                value={index.coach_id}
              />
              {/* <input type="text"  value={index.coach_id} /> */}

              {/* Submit Button */}
              <div className="flex justify-start mt-6">
              <button
                type="submit"
                 className="bg-blue-700 text-white py-3 px-6 rounded hover:bg-blue-800 transition duration-200"
              >
                Submit
              </button>
              </div>
            </form>
          ))}
              </div>
            )
          }
        </Dashboard>
      </>
    </>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  );
}

export default Updatenews;
