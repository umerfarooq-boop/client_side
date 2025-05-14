<<<<<<< HEAD
=======
  // import { useNavigate, useParams } from "react-router-dom";
  // import React, { useEffect, useState } from "react";
  // import { useForm } from "react-hook-form";
  // import axios from "../../../axios";
  // import Dashboard from "../../Dashboard";
  // import { RotatingLines } from 'react-loader-spinner';
  // import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
  // import "react-toastify/dist/ReactToastify.css";

  // function EditCoach() {
  //   const [loading, setLoading] = useState(true);
  //   const { id } = useParams(); // Get the coach ID from URL parameters
  //   const navigation = useNavigate();
  //   const {
  //     handleSubmit,
  //     register,
  //     reset,
  //     setValue,
  //     formState: { errors },
  //   } = useForm();
  //   const [data, setData] = useState([]);

  //   // Get



  //   let location = localStorage.getItem('location');
  //   if(location){
  //     location = location.replace(/"/g, '');
  //     location = location.replace(/,/g, '');
  //   }
    
  //   // Fetch existing coach data
  //   useEffect(() => {
  //     const getCoachData = async () => {
  //       try {
  //         const response = await axios.get(`/coach/${id}`);
  //         setData(response.data.coach_record); // Assuming this contains coach details
  //         setLoading(false)
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getCoachData();
  //   }, [id]);

  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       setImagePreview(URL.createObjectURL(file));
  //     }
  //   };

  //   const editCoachInfo = (data) => {
  //     const formData = new FormData();

  //     // Append form data for coach and academy
  //     formData.append('name', data.name);
  //     formData.append('experience', data.experience);
  //     formData.append('level', data.level);
  //     formData.append('phone_number', data.phone_number);
  //     formData.append('coach_location', data.coach_location);
  //     formData.append('academy_name', data.academy_name);
  //     formData.append('academy_location', data.academy_location);
  //     formData.append('address', data.address);
  //     formData.append('academy_phonenumber', data.academy_phonenumber);
  //     formData.append('per_hour_charges', data.per_hour_charges);
    
  //     // Append files conditionally
  //     if (data.image[0]) {
  //       formData.append('image', data.image[0]);
  //     }
  //     if (data.certificate[0]) {
  //       formData.append('certificate', data.certificate[0]);
  //     }
  //     if (data.academy_certificate[0]) {
  //       formData.append('academy_certificate', data.academy_certificate[0]);
  //     }

  //     // Make the API call to update coach and academy details
  //     axios
  //       .post(`/updateRecord/${id}`, formData,{
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       })
  //       .then((response) => {
  //         toast.success("Record Updated Successfully");
  //         console.log(response.data); // Debug response if needed
  //         navigation(-1);
  //       })
  //       .catch((error) => {
  //         toast.error("Failed to Update Record");
  //         console.error(error.response?.data || error.message);
  //       });
  //   };
    

  //   const user_id = localStorage.getItem('user_id');


  //     const onSubmit = (data) => {
  //       axios
  //         .post(`/UpdatePassword/${user_id}`, data)
  //         .then((response) => {
  //           toast.success('Password updated successfully');
  //           reset();
  //         })
  //         .catch((error) => {
  //           toast.error('Failed to update password');
  //           console.error(error.response?.data || error.message);
  //         });
  //     };

    
  //   return (
  //     <>
  //       <Dashboard>
  //         {
  //                     loading ? (
  //                       <div className="flex flex-col items-center justify-center h-screen">
  //                     <RotatingLines 
  //                       visible={true}
  //                       height="96"
  //                       width="96"
  //                       color="grey"
  //                       strokeWidth="5"
  //                       animationDuration="0.75"
  //                       ariaLabel="rotating-lines-loading"
  //                     />
  //                   </div>
  //                     ): (
  //                       <>
                      
  //         <ToastContainer />
  //         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  //           <div className="text-center mb-4">
  //             <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
  //               Edit Coach
  //             </h1>
  //           </div>
  //           {data.map((index, key) => (
  //             <form
  //               className="flex flex-col gap-6"
  //               key={index}
  //               onSubmit={handleSubmit(editCoachInfo)}
  //             >
  //               <div className="-mx-3 md:flex mb-6">
  //                 {/* Post Title */}
  //                 <div className="md:w-1/2 px-3 mb-6 md:mb-0">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_title"
  //                   >
  //                     Coach Name
  //                   </label>
  //                   <input
  //                     type="text"
  //                     id="name"
  //                     placeholder="Coach Name"
  //                     defaultValue={index.name}
  //                     {...register("name", { required: "Coach Name is required" })}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors.name ? "border-red-500" : "border-grey-lighter"} rounded py-3 px-4 mb-3`}
  //                   />
  //                   {errors.name && (
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
  //                     Experience
  //                   </label>
  //                   <select
  //                     {...register("experience", {
  //                       required: "Experience is required",
  //                     })}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.experience
  //                         ? "border-red-500"
  //                         : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   >
  //                     <option
  //                       value="1year" 
  //                       selected={index.experience === "1year"}
  //                     >
  //                       1year
  //                     </option>
  //                     <option
  //                       value="2year"
  //                       selected={index.experience === "2year"}
  //                     >
  //                       2year
  //                     </option>
  //                     <option
  //                       value="3year"
  //                       selected={index.experience === "3year"}
  //                     >
  //                       3year
  //                     </option>
  //                     <option
  //                       value="4year"
  //                       selected={index.experience === "4year"}
  //                     >
  //                       4year
  //                     </option>
  //                     <option
  //                       value="5year"
  //                       selected={index.experience === "5year"}
  //                     >
  //                       5year
  //                     </option>
  //                     <option
  //                       value="6year"
  //                       selected={index.experience === "6year"}
  //                     >
  //                       6year
  //                     </option>
  //                   </select>
  //                 </div>
  //               </div>

  //               <div className="-mx-3 md:flex mb-6">
  //                 {/* Post Description */}
  //                 <div className="md:w-1/2 px-3 mb-6 md:mb-0">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_description"
  //                   >
  //                     Level
  //                   </label>

  //                   <select
  //                     {...register("level", { required: "Level is required" })}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.level ? "border-red-500" : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   >
  //                     <option
  //                       value="level 1"
  //                       selected={index.level === "level 1"}
  //                     >
  //                       level 1
  //                     </option>
  //                     <option
  //                       value="level 2"
  //                       selected={index.level === "level 2"}
  //                     >
  //                       level 2
  //                     </option>
  //                     <option
  //                       value="level 3"
  //                       selected={index.level === "level 3"}
  //                     >
  //                       level 3
  //                     </option>
  //                   </select>
  //                 </div>

  //                 {/* Post Location */}
  //                 <div className="md:w-1/2 px-3">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_location"
  //                   >
  //                     Phone Number
  //                   </label>
  //                   <input
  //                     type="text"
  //                     id="phone_number"
  //                     defaultValue={index.phone_number}
  //                     placeholder="Phone Number"
  //                     {...register("phone_number", { required: "Coach Name is required" })}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.phone_number
  //                         ? "border-red-500"
  //                         : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   />
  //                 </div>
  //               </div>
  //                 <div className="-mx-3 md:flex mb-6">
  //               {/* Coach Location */}
  //               <div className="md:w-1/2 px-3">
  //                 <label
  //                   className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                   htmlFor="location"
  //                 >
  //                   Coach Location
  //                 </label>
  //                 <input
  //                   type="text"
  //                   defaultValue={index.coach_location}
  //                   id="location"
  //                   placeholder="Coach Location"
  //                   {...register("coach_location")}
  //                   className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                     errors.post_location ? "border-red-500" : "border-grey-lighter"
  //                   } rounded py-3 px-4`}
  //                 />
  //               </div>
  //               <div className="md:w-1/2 px-3">
  //                 <label
  //                   className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                   htmlFor="location"
  //                 >
  //                   Session Charges
  //                 </label>
  //                 <input
  //                   type="text"
  //                   defaultValue={index.per_hour_charges}
  //                   id="location"
  //                   placeholder="Coach Location"
  //                   {...register("per_hour_charges")}
  //                   className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                     errors.per_hour_charges ? "border-red-500" : "border-grey-lighter"
  //                   } rounded py-3 px-4`}
  //                 />
  //               </div>

  //               {/* Coach Image Upload */}
                
  //                 </div>


  //               <div className="-mx-3 md:flex mb-6">
  //                 {/* Post Image */}
                  

  //                 {/* Coach Certificate */}
  //                 <div className="md:w-1/2 px-3">
  //   <label
  //     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //     htmlFor="certificate"
  //   >
  //     Coach Certificate
  //   </label>

  //   {/* File Input Field */}
  //   <input
  //     type="file"
  //     {...register("certificate")}
  //     id="certificate"
  //     className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
  //   />

  //   {/* PDF Preview Link */}
  //   {index.certificate && (
  //     <div className="flex items-center mt-2">
  //       <a
  //         href={`http://127.0.0.1:8000/uploads/coach_certificate/${index.certificate}`}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="flex items-center text-blue-600 hover:underline"
  //       >
  //         <img
  //           src="https://img.icons8.com/fluency/48/pdf.png"
  //           alt="PDF Icon"
  //           className="w-6 h-6 mr-2"
  //         />
  //         View Certificate
  //       </a>
  //     </div>
  //   )}
  //                 </div>

  //                 <div className="md:w-1/2 px-3">
  //                 <label
  //                   className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                   htmlFor="image"
  //                 >
  //                   Coach Image
  //                 </label>
  //                 <input
  //                   type="file"
  //                   {...register("image")}
  //                   id="image"
  //                   onChange={handleImageChange}
  //                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
  //                 />

  //                 {/* Coach Image Preview */}
  //                 {index.image && (
  //                   <div className="flex items-center mt-2">
  //                     <img
  //                       src={`http://127.0.0.1:8000/uploads/coach_image/${index.image}`}
  //                       alt="Coach"
  //                       className="w-16 h-16 rounded border border-gray-300 p-1"
  //                     />
  //                   </div>
  //                 )}
  //   </div>

  //               </div>

  //               <div className="text-center mb-4">
  //                 <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
  //                   Edit Accademy Record
  //                 </h1>
  //               </div>
  
  //               <div className="-mx-3 md:flex mb-6">
  //                 {/* Post Description */}
  //                 <div className="md:w-1/2 px-3">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_location"
  //                   >
  //                     Academy Name
  //                   </label>
  //                   <input
  //                     type="text"
  //                     defaultValue={index.single_academy.academy_name}
  //                     id="academy_name"
  //                     placeholder="Academy Name"
  //                     {...register("academy_name")}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.academy_name
  //                         ? "border-red-500"
  //                         : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   />
  //                 </div>

  //                 {/* Post Location */}
  //                 <div className="md:w-1/2 px-3">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_location"
  //                   >
  //                     Phone Number
  //                   </label>
  //                   <input
  //                     type="text"
  //                     defaultValue={index.single_academy.academy_phonenumber}
  //                     id="phone_number"
  //                     placeholder="Phone Number"
  //                     {...register("academy_phonenumber")}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.post_location
  //                         ? "border-red-500"
  //                         : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   />
  //                 </div>
  //               </div>

  //               <div className="-mx-3 md:flex mb-6">
  //   {/* Address Field */}
  //                 <div className="md:w-1/2 px-3">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_location"
  //                   >
  //                     Address
  //                   </label>
  //                   <input
  //                     type="text"
  //                     defaultValue={index.single_academy.address}
  //                     id="address"
  //                     placeholder="Academy Address"
  //                     {...register("address")}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.address ? "border-red-500" : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   />
  //                 </div>

  //                 {/* Post Location */}
  //                 <div className="md:w-1/2 px-3 hidden">
  //                   <label
  //                     className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //                     htmlFor="post_location"
  //                   >
  //                     Academy Location
  //                   </label>
  //                   <input
  //                     type="hidden"
  //                     defaultValue={index.single_academy?.academy_location}
  //                     id="phone_number"
  //                     placeholder="Academy Location"
  //                     {...register("academy_location")}
  //                     className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
  //                       errors.academy_location
  //                         ? "border-red-500"
  //                         : "border-grey-lighter"
  //                     } rounded py-3 px-4`}
  //                   />
  //                 </div>

  //   {/* Coach Certificate Field */}
  //           <div className="md:w-1/2 px-3">
  //             <label
  //               className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  //               htmlFor="certificate"
  //             >
  //               Coach Certificate
  //             </label>
  //             <input
  //               type="file"
  //               id="certificate"
  //               {...register("academy_certificate")}
  //               className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
  //             />

  //             {/* View Certificate Link */}
  //             <div className="flex items-center mt-2">
  //               <a
  //                 href={`http://127.0.0.1:8000/uploads/academy_certificate/${index.single_academy.academy_certificate}`}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="flex items-center text-blue-600 hover:underline"
  //               >
  //                 <img
  //                   src="https://img.icons8.com/fluency/48/pdf.png"
  //                   alt="PDF Icon"
  //                   className="w-6 h-6 mr-2"
  //                 />
  //                 View Certificate
  //               </a>
  //             </div>
  //           </div>
  //           </div>
  //               <button
  //                 type="submit"
  //                 className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
  //               >
  //                 Submit
  //               </button>
  //             </form>
  //           ))}


  // <div >
  //               <div className="text-center mb-4 mt-10">
  //           <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
  //             Update Password
  //           </h1>
  //           <div className="border p-4 max-w-md mx-auto mt-4 rounded shadow">
  //             <form onSubmit={handleSubmit(onSubmit)}>
  //               <input
  //                 type="password"
  //                 placeholder="New Password"
  //                 {...register('password')}
  //                 className="w-full mb-3 p-2 border rounded"
  //                 required
  //               />
  //               <input
  //                 type="password"
  //                 placeholder="Confirm Password"
  //                 {...register('password_confirmation')}
  //                 className="w-full mb-3 p-2 border rounded"
  //                 required
  //               />
  //               <button
  //                 type="submit"
  //                 className="w-full mt-2 tracking-wide font-semibold bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
  //               >
  //                 Update Password
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //           </div>


  //         </div>
  //         </>
  //         )}
  //       </Dashboard>
  //     </>
  //   );
  // }

  // export default EditCoach;


>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import Dashboard from "../../Dashboard";
<<<<<<< HEAD
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

function EditCoach() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the coach ID from URL parameters
=======
import loadingAnimation from '../../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCoach() {
  const [loader, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
<<<<<<< HEAD
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);

  // Get



  let location = localStorage.getItem('location');
  if(location){
    location = location.replace(/"/g, '');
    location = location.replace(/,/g, '');
  }
  
  // Fetch existing coach data
=======
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password");

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/coach/${id}`);
<<<<<<< HEAD
        setData(response.data.coach_record); // Assuming this contains coach details
        setLoading(false)
=======
        setData(response.data.coach_record);
        setLoading(false);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      } catch (error) {
        console.log(error);
      }
    };
    getCoachData();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const editCoachInfo = (data) => {
    const formData = new FormData();

<<<<<<< HEAD
    // Append form data for coach and academy
=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    formData.append('name', data.name);
    formData.append('experience', data.experience);
    formData.append('level', data.level);
    formData.append('phone_number', data.phone_number);
    formData.append('coach_location', data.coach_location);
    formData.append('academy_name', data.academy_name);
    formData.append('academy_location', data.academy_location);
    formData.append('address', data.address);
    formData.append('academy_phonenumber', data.academy_phonenumber);
    formData.append('per_hour_charges', data.per_hour_charges);
<<<<<<< HEAD
  
    // Append files conditionally
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }
    if (data.certificate[0]) {
      formData.append('certificate', data.certificate[0]);
    }
    if (data.academy_certificate[0]) {
      formData.append('academy_certificate', data.academy_certificate[0]);
    }

    // Make the API call to update coach and academy details
    axios
      .post(`/updateRecord/${id}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success("Record Updated Successfully");
        console.log(response.data); // Debug response if needed
=======

    if (data.image[0]) formData.append('image', data.image[0]);
    if (data.certificate[0]) formData.append('certificate', data.certificate[0]);
    if (data.academy_certificate[0]) formData.append('academy_certificate', data.academy_certificate[0]);

    axios.post(`/updateRecord/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        toast.success("Record Updated Successfully");
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        navigation(-1);
      })
      .catch((error) => {
        toast.error("Failed to Update Record");
        console.error(error.response?.data || error.message);
      });
  };
<<<<<<< HEAD
  

  const user_id = localStorage.getItem('user_id');


    const onSubmit = (data) => {
      axios
        .post(`/UpdatePassword/${user_id}`, data)
        .then((response) => {
          toast.success('Password updated successfully');
          reset();
        })
        .catch((error) => {
          toast.error('Failed to update password');
          console.error(error.response?.data || error.message);
        });
    };

  
  return (
    <>
      <Dashboard>
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
                      <>
                    
        <ToastContainer />
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="text-center mb-4">
            <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
              Edit Coach
            </h1>
          </div>
          {data.map((index, key) => (
            <form
              className="flex flex-col gap-6"
              key={index}
              onSubmit={handleSubmit(editCoachInfo)}
            >
              <div className="-mx-3 md:flex mb-6">
                {/* Post Title */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_title"
                  >
                    Coach Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Coach Name"
                    defaultValue={index.name}
                    {...register("name", { required: "Coach Name is required" })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors.name ? "border-red-500" : "border-grey-lighter"} rounded py-3 px-4 mb-3`}
                  />
                  {errors.name && (
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
                    Experience
                  </label>
                  <select
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.experience
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  >
                    <option
                      value="1year" 
                      selected={index.experience === "1year"}
                    >
                      1year
                    </option>
                    <option
                      value="2year"
                      selected={index.experience === "2year"}
                    >
                      2year
                    </option>
                    <option
                      value="3year"
                      selected={index.experience === "3year"}
                    >
                      3year
                    </option>
                    <option
                      value="4year"
                      selected={index.experience === "4year"}
                    >
                      4year
                    </option>
                    <option
                      value="5year"
                      selected={index.experience === "5year"}
                    >
                      5year
                    </option>
                    <option
                      value="6year"
                      selected={index.experience === "6year"}
                    >
                      6year
                    </option>
                  </select>
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                {/* Post Description */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_description"
                  >
                    Level
                  </label>

                  <select
                    {...register("level", { required: "Level is required" })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.level ? "border-red-500" : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  >
                    <option
                      value="level 1"
                      selected={index.level === "level 1"}
                    >
                      level 1
                    </option>
                    <option
                      value="level 2"
                      selected={index.level === "level 2"}
                    >
                      level 2
                    </option>
                    <option
                      value="level 3"
                      selected={index.level === "level 3"}
                    >
                      level 3
                    </option>
                  </select>
                </div>

                {/* Post Location */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_location"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    defaultValue={index.phone_number}
                    placeholder="Phone Number"
                    {...register("phone_number", { required: "Coach Name is required" })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.phone_number
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                </div>
              </div>
                <div className="-mx-3 md:flex mb-6">
              {/* Coach Location */}
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="location"
                >
                  Coach Location
                </label>
                <input
                  type="text"
                  defaultValue={index.coach_location}
                  id="location"
                  placeholder="Coach Location"
                  {...register("coach_location")}
                  className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                    errors.post_location ? "border-red-500" : "border-grey-lighter"
                  } rounded py-3 px-4`}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="location"
                >
                  Session Charges
                </label>
                <input
                  type="text"
                  defaultValue={index.per_hour_charges}
                  id="location"
                  placeholder="Coach Location"
                  {...register("per_hour_charges")}
                  className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                    errors.per_hour_charges ? "border-red-500" : "border-grey-lighter"
                  } rounded py-3 px-4`}
                />
              </div>

              {/* Coach Image Upload */}
              
                </div>


              <div className="-mx-3 md:flex mb-6">
                {/* Post Image */}
                

                {/* Coach Certificate */}
                <div className="md:w-1/2 px-3">
  <label
    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
    htmlFor="certificate"
  >
    Coach Certificate
  </label>

  {/* File Input Field */}
  <input
    type="file"
    {...register("certificate")}
    id="certificate"
    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
  />

  {/* PDF Preview Link */}
  {index.certificate && (
    <div className="flex items-center mt-2">
      <a
        href={`http://127.0.0.1:8000/uploads/coach_certificate/${index.certificate}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:underline"
      >
        <img
          src="https://img.icons8.com/fluency/48/pdf.png"
          alt="PDF Icon"
          className="w-6 h-6 mr-2"
        />
        View Certificate
      </a>
    </div>
  )}
                </div>

                <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="image"
                >
                  Coach Image
                </label>
                <input
                  type="file"
                  {...register("image")}
                  id="image"
                  onChange={handleImageChange}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                />

                {/* Coach Image Preview */}
                {index.image && (
                  <div className="flex items-center mt-2">
                    <img
                      src={`http://127.0.0.1:8000/uploads/coach_image/${index.image}`}
                      alt="Coach"
                      className="w-16 h-16 rounded border border-gray-300 p-1"
                    />
                  </div>
                )}
  </div>

              </div>

              <div className="text-center mb-4">
                <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
                  Edit Accademy Record
                </h1>
              </div>
 
              <div className="-mx-3 md:flex mb-6">
                {/* Post Description */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_location"
                  >
                    Academy Name
                  </label>
                  <input
                    type="text"
                    defaultValue={index.single_academy.academy_name}
                    id="academy_name"
                    placeholder="Academy Name"
                    {...register("academy_name")}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.academy_name
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                  {/* <input
                    type="text"
                    value="active"
                    id="academy_name"
                    placeholder="Academy Name"
                    {...register("status")}
                   
                  />
                  <input
                    type="text"
                    value="active"
                    id="academy_name"
                    placeholder="Academy Name"
                    {...register("status")}
                   
                  /> */}
                </div>

                {/* Post Location */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_location"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    defaultValue={index.single_academy.academy_phonenumber}
                    id="phone_number"
                    placeholder="Phone Number"
                    {...register("academy_phonenumber")}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.post_location
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
  {/* Address Field */}
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_location"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={index.single_academy.address}
                    id="address"
                    placeholder="Academy Address"
                    {...register("address")}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.address ? "border-red-500" : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                </div>

                {/* Post Location */}
                <div className="md:w-1/2 px-3 hidden">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_location"
                  >
                    Academy Location
                  </label>
                  <input
                    type="hidden"
                    defaultValue={index.single_academy?.academy_location}
                    id="phone_number"
                    placeholder="Academy Location"
                    {...register("academy_location")}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.academy_location
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  />
                </div>

  {/* Coach Certificate Field */}
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="certificate"
            >
              Coach Certificate
            </label>
            <input
              type="file"
              id="certificate"
              {...register("academy_certificate")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />

            {/* View Certificate Link */}
            <div className="flex items-center mt-2">
              <a
                href={`http://127.0.0.1:8000/uploads/academy_certificate/${index.single_academy.academy_certificate}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <img
                  src="https://img.icons8.com/fluency/48/pdf.png"
                  alt="PDF Icon"
                  className="w-6 h-6 mr-2"
                />
                View Certificate
              </a>
            </div>
          </div>
          </div>


              {/* Certificate Accademy */}

              {/* <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="flex items-center gap-4 mb-2">
                    <a
                      href={`http://127.0.0.1:8000/uploads/academy_certificate/${index.single_academy.academy_certificate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#007bff",
                      }}
                    >
                      <img
                        src="https://img.icons8.com/fluency/48/pdf.png"
                        alt="PDF Icon"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      View Certificate
                    </a>
                  </div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="certificate"
                  >
                    Coach Certificate
                  </label>
                  <input
                    type="file"
                    id="certificate"
                    {...register("academy_certificate")}
                    className="block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg file:py-2 file:px-4 file:border-0 file:mr-4 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div> */}

              {/* Certificate Accademy */}

              {/* Coach ID (hidden) */}
              {/* <input type="hidden" {...register('coach_id')} value={coach_id} /> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              >
                Submit
              </button>
            </form>
          ))}


<div >
              <div className="text-center mb-4 mt-10">
          <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
            Update Password
          </h1>
          <div className="border p-4 max-w-md mx-auto mt-4 rounded shadow">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="password"
                placeholder="New Password"
                {...register('password')}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('password_confirmation')}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full mt-2 tracking-wide font-semibold bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
          </div>


        </div>
        </>
        )}
      </Dashboard>
    </>
=======

  const user_id = localStorage.getItem('user_id');

  const onSubmit = (data) => {
    axios.post(`/UpdatePassword/${user_id}`, data)
      .then(() => {
        toast.success('Password updated successfully');
        reset();
      })
      .catch((error) => {
        toast.error('Failed to update password');
        console.error(error.response?.data || error.message);
      });
  };

  return (
    <Dashboard>
      <ToastContainer />
      {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="text-center mb-4">
            <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Edit Coach</h1>
          </div>

          {data.map((index) => (
            <form className="flex flex-col gap-6" key={index} onSubmit={handleSubmit(editCoachInfo)}>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-xs font-bold mb-2">Coach Name</label>
                  <input
                    type="text"
                    defaultValue={index.name}
                    {...register("name", { required: "Coach Name is required", minLength: 2 })}
                    className={`w-full border rounded py-3 px-4 ${errors.name ? 'border-red-500' : 'border-grey-lighter'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase text-xs font-bold mb-2">Experience</label>
                  <select
                    {...register("experience", { required: "Experience is required" })}
                    className={`w-full border rounded py-3 px-4 ${errors.experience ? 'border-red-500' : 'border-grey-lighter'}`}
                  >
                    {["1year", "2year", "3year", "4year", "5year", "6year"].map((year) => (
                      <option key={year} value={year} selected={index.experience === year}>{year}</option>
                    ))}
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs italic">{errors.experience.message}</p>}
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-xs font-bold mb-2">Level</label>
                  <select
                    {...register("level", { required: "Level is required" })}
                    className={`w-full border rounded py-3 px-4 ${errors.level ? 'border-red-500' : 'border-grey-lighter'}`}
                  >
                    {["level 1", "level 2", "level 3"].map((lvl) => (
                      <option key={lvl} value={lvl} selected={index.level === lvl}>{lvl}</option>
                    ))}
                  </select>
                  {errors.level && <p className="text-red-500 text-xs italic">{errors.level.message}</p>}
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase text-xs font-bold mb-2">Phone Number</label>
                  <input
                    type="text"
                    defaultValue={index.phone_number}
                    {...register("phone_number", { required: "Phone Number is required" })}
                    className={`w-full border rounded py-3 px-4 ${errors.phone_number ? 'border-red-500' : 'border-grey-lighter'}`}
                  />
                  {errors.phone_number && <p className="text-red-500 text-xs italic">{errors.phone_number.message}</p>}
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 hidden">
                  <label className="block uppercase text-xs font-bold mb-2">Coach Location</label>
                  <input
                    type="text"
                    defaultValue={index.coach_location}
                    {...register("coach_location", { required: "Location is required" })}
                    className="w-full border rounded py-3 px-4"
                  />
                </div>

                <div className="md:w-1/2 px-3">
  <label className="block uppercase text-xs font-bold mb-2">Session Charges</label>
  <input
    type="number"
    defaultValue={index.per_hour_charges}
    {...register("per_hour_charges", {
      required: "Session charges are required",
      min: { value: 300, message: "Minimum charge is 300" },
      max: { value: 1000, message: "Maximum charge is 1000" }
    })}
    onInput={(e) => {
      // Restrict input to positive integers only
      if (e.target.value < 0) e.target.value = '';
    }}
    className={`w-full border rounded py-3 px-4 ${
      errors.per_hour_charges ? 'border-red-500' : 'border-grey-lighter'
    }`}
  />
  {errors.per_hour_charges && (
    <p className="text-red-500 text-xs italic">{errors.per_hour_charges.message}</p>
  )}
</div>

              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3">
                  <label className="block font-bold text-xs mb-2">Coach Certificate</label>
                  <input type="file" {...register("certificate")} />
                  {index.certificate && (
                    <a href={`http://127.0.0.1:8000/uploads/coach_certificate/${index.certificate}`} target="_blank" className="text-blue-600 hover:underline mt-1 block">View Certificate</a>
                  )}
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block font-bold text-xs mb-2">Coach Image</label>
                  <input type="file" {...register("image")} onChange={handleImageChange} />
                  {index.image && (
                    <img src={`http://127.0.0.1:8000/uploads/coach_image/${index.image}`} alt="Coach" className="w-16 h-16 mt-2" />
                  )}
                </div>
              </div>

              {/* Academy Info */}
             <div className="text-center mb-4 mt-8">
  <h2 className="text-xl font-bold text-blue-900">Edit Academy Record</h2>
</div>

<div className="-mx-3 md:flex mb-6">
  <div className="md:w-1/2 px-3">
    <label className="block font-bold text-xs mb-2">Academy Name</label>
    <input
      type="text"
      defaultValue={index.single_academy.academy_name}
      {...register("academy_name", {
        required: "Academy name is required",
        minLength: {
          value: 3,
          message: "Academy name must be at least 3 characters",
        },
      })}
      className="w-full border rounded py-3 px-4"
    />
    {errors.academy_name && <p className="text-red-500 text-xs">{errors.academy_name.message}</p>}
  </div>

  <div className="md:w-1/2 px-3">
    <label className="block font-bold text-xs mb-2">Academy Phone</label>
    <input
      type="text"
      defaultValue={index.single_academy.academy_phonenumber}
      {...register("academy_phonenumber", {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]{10,15}$/,
          message: "Enter a valid phone number (10–15 digits)",
        },
      })}
      className="w-full border rounded py-3 px-4"
    />
    {errors.academy_phonenumber && <p className="text-red-500 text-xs">{errors.academy_phonenumber.message}</p>}
  </div>
</div>

<div className="-mx-3 md:flex mb-6">
  <div className="md:w-1/2 px-3">
    <label className="block font-bold text-xs mb-2">Academy Address</label>
    <input
      type="text"
      defaultValue={index.single_academy.address}
      {...register("address", {
        required: "Address is required",
        minLength: {
          value: 5,
          message: "Address must be at least 5 characters",
        },
      })}
      className="w-full border rounded py-3 px-4"
    />
    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
  </div>

  <div className="md:w-1/2 px-3">
    <label className="block font-bold text-xs mb-2">Academy Certificate</label>
    <input
      type="file"
      {...register("academy_certificate", {
        validate: {
          fileType: (fileList) => {
            if (fileList.length === 0) return true; // No upload is okay
            const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
            return allowedTypes.includes(fileList[0].type) || "Only PDF, JPG, or PNG allowed";
          },
        },
      })}
    />
    {errors.academy_certificate && <p className="text-red-500 text-xs">{errors.academy_certificate.message}</p>}

    {index.single_academy.academy_certificate && (
      <a
        href={`http://127.0.0.1:8000/uploads/academy_certificate/${index.single_academy.academy_certificate}`}
        target="_blank"
        className="text-blue-600 hover:underline mt-1 block"
      >
        View Certificate
      </a>
    )}
  </div>
</div>

<div className="flex justify-start">
              <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 px-28 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
            </div>
            </form>
          ))}

          {/* Password Section */}
          <div className="text-center mb-4 mt-10">
            <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Update Password</h1>
            <div className="border p-4 max-w-md mx-auto mt-4 rounded shadow">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="password"
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("password_confirmation", {
                    validate: (value) => value === password || "Passwords do not match"
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {errors.password_confirmation && <p className="text-red-500 text-xs">{errors.password_confirmation.message}</p>}

                <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-700">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  );
}

export default EditCoach;
