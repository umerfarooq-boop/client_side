// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "../../../axios";
// import Dashboard from "../../Dashboard";
// import loadingAnimation from '../../../loader/Animation - 1747181954747.json';
// import Lottie from 'lottie-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function EditCoach() {
//   const [loader, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const { id } = useParams();
//   const navigation = useNavigate();
//   const {
//     handleSubmit,
//     register,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const password = watch("password");

//   useEffect(() => {
//     const getCoachData = async () => {
//       try {
//         const response = await axios.get(`/coach/${id}`);
//         setData(response.data.coach_record);
//         setLoading(false);
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

//     if (data.image[0]) formData.append('image', data.image[0]);
//     if (data.certificate[0]) formData.append('certificate', data.certificate[0]);
//     if (data.academy_certificate[0]) formData.append('academy_certificate', data.academy_certificate[0]);

//     axios.post(`/updateRecord/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//       .then((response) => {
//         toast.success("Record Updated Successfully");
//         navigation(-1);
//       })
//       .catch((error) => {
//         toast.error("Failed to Update Record");
//         console.error(error.response?.data || error.message);
//       });
//   };

//   const user_id = localStorage.getItem('user_id');

//   const onSubmit = (data) => {
//     axios.post(`/UpdatePassword/${user_id}`, data)
//       .then(() => {
//         toast.success('Password updated successfully');
//         reset();
//       })
//       .catch((error) => {
//         toast.error('Failed to update password');
//         console.error(error.response?.data || error.message);
//       });
//   };

//   return (
//   <Dashboard>
//     <ToastContainer />
//     {loader ? (
//       <div style={{ width: 200, height: 200, margin: 'auto' }}>
//         <Lottie animationData={loadingAnimation} loop={true} />
//       </div>
//     ) : (
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
//         <div className="text-center mb-4">
//           <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Edit Coach</h1>
//         </div>

//         {data.map((coach, idx) => (
//           <form className="flex flex-col gap-6" key={coach.id || idx} onSubmit={handleSubmit(editCoachInfo)}>
//             <div className="md:flex -mx-3 mb-6">
//               {/* Coach Name */}
//               <div className="md:w-1/3 px-3 mb-4 md:mb-0">
//                 <label className="block uppercase text-xs font-bold mb-2">Coach Name</label>
//                 <input
//                   type="text"
//                   defaultValue={coach.name}
//                   {...register("name", {
//                     required: "Coach Name is required",
//                     minLength: { value: 2, message: "Name must be at least 2 characters" }
//                   })}
//                   className={`w-full border rounded py-3 px-4 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
//               </div>

//               {/* Experience */}
//               <div className="md:w-1/3 px-3 mb-4 md:mb-0">
//                 <label className="block uppercase text-xs font-bold mb-2">Experience</label>
//                 <select
//                   defaultValue={coach.experience}
//                   {...register("experience", { required: "Experience is required" })}
//                   className={`w-full border rounded py-3 px-4 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
//                 >
//                   {["1year", "2year", "3year", "4year", "5year", "6year"].map((year) => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//                 {errors.experience && <p className="text-red-500 text-xs italic">{errors.experience.message}</p>}
//               </div>

//               {/* Level */}
//               <div className="md:w-1/3 px-3">
//                 <label className="block uppercase text-xs font-bold mb-2">Level</label>
//                 <select
//                   defaultValue={coach.level}
//                   {...register("level", { required: "Level is required" })}
//                   className={`w-full border rounded py-3 px-4 ${errors.level ? 'border-red-500' : 'border-gray-300'}`}
//                 >
//                   {["level 1", "level 2", "level 3"].map((lvl) => (
//                     <option key={lvl} value={lvl}>{lvl}</option>
//                   ))}
//                 </select>
//                 {errors.level && <p className="text-red-500 text-xs italic">{errors.level.message}</p>}
//               </div>
//             </div>

//             <div className="-mx-3 md:flex mb-6">
//               <div className="md:w-1/2 px-3 hidden">
//                 <label className="block uppercase text-xs font-bold mb-2">Coach Location</label>
//                 <input
//                   type="text"
//                   defaultValue={coach.coach_location}
//                   {...register("coach_location", { required: "Location is required" })}
//                   className="w-full border rounded py-3 px-4"
//                 />
//               </div>

//               <div className="md:w-1/2 px-3">
//                 <label className="block uppercase text-xs font-bold mb-2">Session Charges</label>
//                 <input
//                   type="number"
//                   defaultValue={coach.per_hour_charges}
//                   {...register("per_hour_charges", {
//                     required: "Session charges are required",
//                     min: { value: 300, message: "Minimum charge is 300" },
//                     max: { value: 1000, message: "Maximum charge is 1000" }
//                   })}
//                   onInput={(e) => {
//                     if (e.target.value < 0) e.target.value = '';
//                   }}
//                   className={`w-full border rounded py-3 px-4 ${errors.per_hour_charges ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.per_hour_charges && <p className="text-red-500 text-xs italic">{errors.per_hour_charges.message}</p>}
//               </div>
//             </div>

//             <div className="-mx-3 md:flex mb-6">
//               <div className="md:w-1/2 px-3">
//                 <label className="block font-bold text-xs mb-2">Coach Certificate</label>
//                 <input type="file" {...register("certificate")} />
//                 {coach.certificate && (
//                   <a href={`http://127.0.0.1:8000/uploads/coach_certificate/${coach.certificate}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">View Certificate</a>
//                 )}
//               </div>

//               <div className="md:w-1/2 px-3">
//                 <label className="block font-bold text-xs mb-2">Coach Image</label>
//                 <input type="file" {...register("image")} onChange={handleImageChange} />
//                 {coach.image && (
//                   <img
//                     src={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`}
//                     alt="Coach"
//                     className="w-16 h-16 mt-2"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Academy Info */}
//             <div className="text-center mb-4 mt-8">
//               <h2 className="text-xl font-bold text-blue-900">Edit Academy Record</h2>
//             </div>

//             <div className="md:flex -mx-3 mb-6">
//               <div className="md:w-1/3 px-3 mb-4 md:mb-0">
//                 <label className="block font-bold text-xs mb-2">Academy Name</label>
//                 <input
//                   type="text"
//                   defaultValue={coach.single_academy.academy_name}
//                   {...register("academy_name", {
//                     required: "Academy name is required",
//                     minLength: { value: 3, message: "Academy name must be at least 3 characters" }
//                   })}
//                   className={`w-full border rounded py-3 px-4 ${errors.academy_name ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.academy_name && <p className="text-red-500 text-xs">{errors.academy_name.message}</p>}
//               </div>

//               <div className="md:w-1/3 px-3 mb-4 md:mb-0">
//                 <label className="block font-bold text-xs mb-2">Academy Phone</label>
//                 <input
//                   type="text"
//                   defaultValue={coach.single_academy.academy_phonenumber}
//                   {...register("academy_phonenumber", {
//                     required: "Phone number is required",
//                     pattern: {
//                       value: /^[0-9]{10,15}$/,
//                       message: "Enter a valid phone number (10–15 digits)"
//                     }
//                   })}
//                   className={`w-full border rounded py-3 px-4 ${errors.academy_phonenumber ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.academy_phonenumber && <p className="text-red-500 text-xs">{errors.academy_phonenumber.message}</p>}
//               </div>

//               <div className="md:w-1/3 px-3">
//                 <label className="block font-bold text-xs mb-2">Academy Address</label>
//                 <input
//                   type="text"
//                   defaultValue={coach.single_academy.address}
//                   {...register("address", {
//                     required: "Address is required",
//                     minLength: { value: 5, message: "Address must be at least 5 characters" }
//                   })}
//                   className={`w-full border rounded py-3 px-4 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
//               </div>
//             </div>

//             <div className="-mx-3 md:flex mb-6">
//               <div className="md:w-1/2 px-3">
//                 <label className="block font-bold text-xs mb-2">Academy Certificate</label>
//                 <input
//                   type="file"
//                   {...register("academy_certificate", {
//                     validate: {
//                       fileType: (fileList) => {
//                         if (fileList.length === 0) return true;
//                         const allowed = ["application/pdf", "image/jpeg", "image/png"];
//                         return allowed.includes(fileList[0].type) || "Only PDF, JPG, or PNG allowed";
//                       }
//                     }
//                   })}
//                 />
//                 {errors.academy_certificate && <p className="text-red-500 text-xs">{errors.academy_certificate.message}</p>}
//                 {coach.single_academy.academy_certificate && (
//                   <a href={`http://127.0.0.1:8000/uploads/academy_certificate/${coach.single_academy.academy_certificate}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">View Certificate</a>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-start">
//               <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 px-28 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
//                 Submit
//               </button>
//             </div>
//           </form>
//         ))}

//         {/* Password Section */}
//         <div className="text-center mb-4 mt-10">
//           <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Update Password</h1>
//           <div className="border p-4 max-w-md mx-auto mt-4 rounded shadow">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Minimum 6 characters" }
//                 })}
//                 className="w-full mb-3 p-2 border rounded"
//               />
//               {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 {...register("password_confirmation", {
//                   validate: (value) => value === password || "Passwords do not match"
//                 })}
//                 className="w-full mb-3 p-2 border rounded"
//               />
//               {errors.password_confirmation && <p className="text-red-500 text-xs">{errors.password_confirmation.message}</p>}

//               <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-700">Update Password</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )}
//   </Dashboard>
// );

// }

// export default EditCoach;


import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import Dashboard from "../../Dashboard";
import loadingAnimation from '../../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCoach() {
  const [loader, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const navigation = useNavigate();

  // Coach Form
  const {
    handleSubmit: handleCoachSubmit,
    register: registerCoach,
    reset: resetCoach,
    formState: { errors: coachErrors },
  } = useForm({ mode: "onChange" });

  // Password Form
  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({ mode: "onChange" });

  const password = watchPassword("password");

  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/coach/${id}`);
        setData(response.data.coach_record);
        setLoading(false);
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

  const editCoachInfo = (formData) => {
    const dataToSend = new FormData();

    dataToSend.append("name", formData.name);
    dataToSend.append("experience", formData.experience);
    dataToSend.append("level", formData.level);
    dataToSend.append("phone_number", formData.phone_number);
    dataToSend.append("coach_location", formData.coach_location);
    dataToSend.append("academy_name", formData.academy_name);
    dataToSend.append("academy_location", formData.academy_location);
    dataToSend.append("address", formData.address);
    dataToSend.append("academy_phonenumber", formData.academy_phonenumber);
    dataToSend.append("per_hour_charges", formData.per_hour_charges);

    if (formData.image[0]) dataToSend.append("image", formData.image[0]);
    if (formData.certificate[0]) dataToSend.append("certificate", formData.certificate[0]);
    if (formData.academy_certificate[0]) dataToSend.append("academy_certificate", formData.academy_certificate[0]);

    axios.post(`/updateRecord/${id}`, dataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        toast.success("Record Updated Successfully");
        navigation(-1);
      })
      .catch((error) => {
        toast.error("Failed to Update Record");
        console.error(error.response?.data || error.message);
      });
  };

  const user_id = localStorage.getItem("user_id");

  const updatePassword = (data) => {
    axios.post(`/UpdatePassword/${user_id}`, data)
      .then(() => {
        toast.success("Password updated successfully");
        resetPassword();
      })
      .catch((error) => {
        toast.error("Failed to update password");
        console.error(error.response?.data || error.message);
      });
  };

  return (
    <Dashboard>
      <ToastContainer />
      {loader ? (
        <div style={{ width: 200, height: 200, margin: "auto" }}>
          <Lottie animationData={loadingAnimation} loop />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="text-center mb-4">
            <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Edit Coach</h1>
          </div>

          {data.map((coach, idx) => (
            <form key={coach.id || idx} onSubmit={handleCoachSubmit(editCoachInfo)} className="flex flex-col gap-6">
              {/* Coach Info */}
              <div className="md:flex -mx-3 mb-6">
                <div className="md:w-1/3 px-3 mb-4 md:mb-0">
                  <label className="block uppercase text-xs font-bold mb-2">Coach Name</label>
                  <input
                    type="text"
                    defaultValue={coach.name}
                    {...registerCoach("name", {
                      required: "Coach Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                    })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {coachErrors.name && <p className="text-red-500 text-xs italic">{coachErrors.name.message}</p>}
                </div>

                <div className="md:w-1/3 px-3 mb-4 md:mb-0">
                  <label className="block uppercase text-xs font-bold mb-2">Experience</label>
                  <select
                    defaultValue={coach.experience}
                    {...registerCoach("experience", { required: "Experience is required" })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.experience ? "border-red-500" : "border-gray-300"}`}
                  >
                    {["1year", "2year", "3year", "4year", "5year", "6year"].map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {coachErrors.experience && <p className="text-red-500 text-xs italic">{coachErrors.experience.message}</p>}
                </div>

                <div className="md:w-1/3 px-3">
                  <label className="block uppercase text-xs font-bold mb-2">Level</label>
                  <select
                    defaultValue={coach.level}
                    {...registerCoach("level", { required: "Level is required" })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.level ? "border-red-500" : "border-gray-300"}`}
                  >
                    {["level 1", "level 2", "level 3"].map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                  {coachErrors.level && <p className="text-red-500 text-xs italic">{coachErrors.level.message}</p>}
                </div>
              </div>

              {/* Additional Fields */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 hidden">
                  <label className="block uppercase text-xs font-bold mb-2">Coach Location</label>
                  <input
                    type="text"
                    defaultValue={coach.coach_location}
                    {...registerCoach("coach_location", { required: "Location is required" })}
                    className="w-full border rounded py-3 px-4"
                  />
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase text-xs font-bold mb-2">Session Charges</label>
                  <input
                    type="number"
                    defaultValue={coach.per_hour_charges}
                    {...registerCoach("per_hour_charges", {
                      required: "Session charges are required",
                      min: { value: 300, message: "Minimum charge is 300" },
                      max: { value: 1000, message: "Maximum charge is 1000" },
                    })}
                    onInput={(e) => {
                      if (e.target.value < 0) e.target.value = "";
                    }}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.per_hour_charges ? "border-red-500" : "border-gray-300"}`}
                  />
                  {coachErrors.per_hour_charges && (
                    <p className="text-red-500 text-xs italic">{coachErrors.per_hour_charges.message}</p>
                  )}
                </div>
              </div>

              {/* Certificates and Images */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3">
                  <label className="block font-bold text-xs mb-2">Coach Certificate</label>
                  <input type="file" {...registerCoach("certificate")} />
                  {coach.certificate && (
                    <a href={`http://127.0.0.1:8000/uploads/coach_certificate/${coach.certificate}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mt-1 block">View Certificate</a>
                  )}
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block font-bold text-xs mb-2">Coach Image</label>
                  <input type="file" {...registerCoach("image")} onChange={handleImageChange} />
                  {coach.image && (
                    <img
                      src={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`}
                      alt="Coach"
                      className="w-16 h-16 mt-2"
                    />
                  )}
                </div>
              </div>

              {/* Academy Info */}
              <div className="text-center mb-4 mt-8">
                <h2 className="text-xl font-bold text-blue-900">Edit Academy Record</h2>
              </div>

              <div className="md:flex -mx-3 mb-6">
                <div className="md:w-1/3 px-3 mb-4 md:mb-0">
                  <label className="block font-bold text-xs mb-2">Academy Name</label>
                  <input
                    type="text"
                    defaultValue={coach.single_academy.academy_name}
                    {...registerCoach("academy_name", {
                      required: "Academy name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                    })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.academy_name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {coachErrors.academy_name && <p className="text-red-500 text-xs">{coachErrors.academy_name.message}</p>}
                </div>

                <div className="md:w-1/3 px-3 mb-4 md:mb-0">
                  <label className="block font-bold text-xs mb-2">Academy Phone</label>
                  <input
                    type="text"
                    defaultValue={coach.single_academy.academy_phonenumber}
                    {...registerCoach("academy_phonenumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Enter a valid phone number (10–15 digits)",
                      },
                    })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.academy_phonenumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {coachErrors.academy_phonenumber && <p className="text-red-500 text-xs">{coachErrors.academy_phonenumber.message}</p>}
                </div>

                <div className="md:w-1/3 px-3">
                  <label className="block font-bold text-xs mb-2">Academy Address</label>
                  <input
                    type="text"
                    defaultValue={coach.single_academy.address}
                    {...registerCoach("address", {
                      required: "Address is required",
                      minLength: { value: 5, message: "Minimum 5 characters" },
                    })}
                    className={`w-full border rounded py-3 px-4 ${coachErrors.address ? "border-red-500" : "border-gray-300"}`}
                  />
                  {coachErrors.address && <p className="text-red-500 text-xs">{coachErrors.address.message}</p>}
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3">
                  <label className="block font-bold text-xs mb-2">Academy Certificate</label>
                  <input
                    type="file"
                    {...registerCoach("academy_certificate", {
                      validate: {
                        fileType: (fileList) => {
                          if (fileList.length === 0) return true;
                          const allowed = ["application/pdf", "image/jpeg", "image/png"];
                          return allowed.includes(fileList[0].type) || "Only PDF, JPG, or PNG allowed";
                        },
                      },
                    })}
                  />
                  {coachErrors.academy_certificate && <p className="text-red-500 text-xs">{coachErrors.academy_certificate.message}</p>}
                  {coach.single_academy.academy_certificate && (
                    <a href={`http://127.0.0.1:8000/uploads/academy_certificate/${coach.single_academy.academy_certificate}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mt-1 block">View Certificate</a>
                  )}
                </div>
              </div>

              <div className="flex justify-start">
                <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 px-28 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                  Submit
                </button>
              </div>
            </form>
          ))}

          {/* Password Form */}
          <div className="text-center mb-4 mt-10">
            <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Update Password</h1>
            <div className="border p-4 max-w-md mx-auto mt-4 rounded shadow">
              <form onSubmit={handlePasswordSubmit(updatePassword)}>
                <input
                  type="password"
                  placeholder="New Password"
                  {...registerPassword("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {passwordErrors.password && <p className="text-red-500 text-xs">{passwordErrors.password.message}</p>}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...registerPassword("password_confirmation", {
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {passwordErrors.password_confirmation && <p className="text-red-500 text-xs">{passwordErrors.password_confirmation.message}</p>}

                <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-700">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  );
}

export default EditCoach;
