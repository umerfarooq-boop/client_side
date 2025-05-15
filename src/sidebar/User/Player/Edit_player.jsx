// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "../../../axios";
// import Dashboard from "../../Dashboard";
// import { RotatingLines } from "react-loader-spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Edit_player() {
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const navigation = useNavigate();
//   const {
//     handleSubmit,
//     register,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const [data, setData] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   let location = localStorage.getItem("location");
//   if (location) {
//     location = location.replace(/"/g, "").replace(/,/g, "");
//   }

//   useEffect(() => {
//     const getCategory = async () => {
//       try {
//         const sportCategory = await axios.get("/category");
//         if (sportCategory.data && Array.isArray(sportCategory.data.category)) {
//           setCategory(sportCategory.data.category);
//           setLoading(false);
//         } else if (sportCategory.data && sportCategory.data.category) {
//           setCategory([sportCategory.data.category]);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCategory();
//   }, []);

//   useEffect(() => {
//     const getCoachData = async () => {
//       try {
//         const response = await axios.get(`/player/${id}`);
//         if (response.data && Array.isArray(response.data.player_record)) {
//           setData(response.data.player_record);
//           setSelectedCategory(response.data.player_record.sport_category.id);
//         } else if (response.data && response.data.player_record) {
//           setData([response.data.player_record]);
//           setSelectedCategory(response.data.player_record.sport_category.id);
//         }
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

//   const editPlayerInfo = (data) => {
//     const formData = new FormData();
//     formData.append("player_name", data.player_name);
//     formData.append("player_phonenumber", data.player_phonenumber);
//     formData.append("player_gender", data.player_gender);
//     formData.append("cat_id", selectedCategory);

//     if (data.image[0]) {
//       formData.append("image", data.image[0]);
//     }

//     data.parent.forEach((parent, index) => {
//       formData.append(`parent[${index}][name]`, parent.name);
//       formData.append(`parent[${index}][cnic]`, parent.cnic);
//       formData.append(`parent[${index}][phone_number]`, parent.phone_number);
//     });

//     axios
//       .post(`/UpdatePlayerData/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then(() => {
//         toast.success("Record Updated Successfully");
//         navigation(-1);
//       })
//       .catch((error) => {
//         toast.error("Failed to Update Record");
//         console.error(error.response?.data || error.message);
//       });
//   };

//   const user_id = localStorage.getItem("user_id");

//   const onSubmit = (data) => {
//     axios
//       .post(`/UpdatePassword/${user_id}`, data)
//       .then(() => {
//         toast.success("Password updated successfully");
//         reset();
//       })
//       .catch((error) => {
//         toast.error("Failed to update password");
//         console.error(error.response?.data || error.message);
//       });
//   };

//   return (
//     <Dashboard>
//       {loading ? (
//         <div className="flex flex-col items-center justify-center h-screen">
//           <RotatingLines
//             visible={true}
//             height="96"
//             width="96"
//             color="grey"
//             strokeWidth="5"
//             animationDuration="0.75"
//             ariaLabel="rotating-lines-loading"
//           />
//         </div>
//       ) : (
//         <>
//           <ToastContainer />
//           <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
//           <div className="text-center mb-4">
//             <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Edit Player</h1>
//           </div>

//           {data.map((index, key) => (
//             <form key={key} onSubmit={handleSubmit(editPlayerInfo)} className="flex flex-col gap-6">
//               <div className="-mx-3 md:flex mb-6">
//                 <div className="md:w-1/2 px-3">
//                   <label className="block text-xs font-bold mb-2">Player Name</label>
//                   <input
//                     type="text"
//                     defaultValue={index.player_name}
//                     {...register("player_name", { required: "Player Name is required" })}
//                     className="w-full py-3 px-4 border rounded"
//                   />
//                 </div>
//                 <div className="md:w-1/2 px-3">
//                   <label className="block text-xs font-bold mb-2">Gender</label>
//                   <select
//                     {...register("player_gender", { required: "Gender is required" })}
//                     className="w-full py-3 px-4 border rounded"
//                   >
//                     <option value="male" selected={index.player_gender === "male"}>
//                       Male
//                     </option>
//                     <option value="female" selected={index.player_gender === "female"}>
//                       Female
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               <div className="-mx-3 md:flex mb-6">
//                 <div className="md:w-1/2 px-3">
//                   <label className="block text-xs font-bold mb-2">Sport Category</label>
//                   <select
//                     value={selectedCategory || ""}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="w-full py-3 px-4 border rounded"
//                   >
//                     {category.length > 0 ? (
//                       category.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option>Record not Found</option>
//                     )}
//                   </select>
//                 </div>
//                 <div className="md:w-1/2 px-3">
//                   <label className="block text-xs font-bold mb-2">Phone Number</label>
//                   <input
//                     type="text"
//                     defaultValue={index.player_phonenumber}
//                     {...register("player_phonenumber", { required: "Phone Number is required" })}
//                     className="w-full py-3 px-4 border rounded"
//                   />
//                 </div>
//               </div>

//               <div className="md:flex mb-6">
//                 <div className="md:w-1/2 px-3">
//                   <div className="flex items-center gap-4 mb-2">
//                     <img
//                       src={`http://127.0.0.1:8000/uploads/player_image/${index.image}`}
//                       alt="Player"
//                       className="w-20 h-20 rounded border"
//                     />
//                   </div>
//                   <label className="block text-xs font-bold mb-2">Player Image</label>
//                   <input
//                     type="file"
//                     {...register("image")}
//                     onChange={handleImageChange}
//                     className="w-full py-2 px-3 border rounded bg-gray-100"
//                   />
//                 </div>
//               </div>

//               <div className="text-center mb-6 mt-10">
//                 <h3 className="text-2xl font-extrabold text-gray-900">
//                   Edit <span className="text-indigo-600">Player Parent</span>
//                 </h3>
//               </div>

//               {index.player_parent.map((parent, key) => (
//                 <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4" key={key}>
//                   <div className="w-full md:w-1/3 px-3">
//                     <label className="block text-xs font-bold mb-2">Parent Name</label>
//                     <input
//                       type="text"
//                       defaultValue={parent.name}
//                       {...register(`parent[${key}].name`)}
//                       className="w-full py-3 px-4 border rounded"
//                     />
//                   </div>
//                   <div className="w-full md:w-1/3 px-3">
//                     <label className="block text-xs font-bold mb-2">Phone Number</label>
//                     <input
//                       type="text"
//                       defaultValue={parent.phone_number}
//                       {...register(`parent[${key}].phone_number`)}
//                       className="w-full py-3 px-4 border rounded"
//                     />
//                   </div>
//                   <div className="w-full md:w-1/3 px-3">
//                     <label className="block text-xs font-bold mb-2">CNIC</label>
//                     <input
//                       type="text"
//                       defaultValue={parent.cnic || "Cnic Not found"}
//                       {...register(`parent[${key}].cnic`, { required: "CNIC is required" })}
//                       className="w-full py-3 px-4 border rounded"
//                     />
//                     {errors?.parent?.[key]?.cnic && (
//                       <p className="text-red-500 text-xs italic">
//                         {errors.parent[key].cnic.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {/* Submit Button Aligned Left */}
//               <div className="flex justify-start px-3">
//                 <button
//                   type="submit"
//                   className="tracking-wide font-semibold bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           ))}

//           {/* Password Update Section */}
//           <div className="text-center mt-16 mb-6">
//             <h3 className="text-2xl font-extrabold text-gray-900">
//               Update <span className="text-indigo-600">Password</span>
//             </h3>
//           </div>

//           <div className="border p-4 max-w-md mx-auto rounded shadow">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 {...register("password")}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 {...register("password_confirmation")}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full tracking-wide font-semibold bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
//               >
//                 Update Password
//               </button>
//             </form>
//           </div>
//           </div>
//         </>
//       )}
//     </Dashboard>
//   );
// }

// export default Edit_player;

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import Dashboard from "../../Dashboard";
<<<<<<< HEAD
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
=======
<<<<<<< HEAD
import { RotatingLines } from 'react-loader-spinner';
=======
import loadingAnimation from '../../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
import "react-toastify/dist/ReactToastify.css";

function Edit_player() {
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const { id } = useParams();
=======
=======
  const [loader, setLoading] = useState(true);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const { id } = useParams(); // Get the coach ID from URL parameters
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
  const navigation = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [data, setData] = useState([]);
<<<<<<< HEAD
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  let location = localStorage.getItem("location");
  if (location) {
    location = location.replace(/"/g, "").replace(/,/g, "");
=======
<<<<<<< HEAD
  const [category,setCategory] = useState([]);
=======
  const [category, setCategory] = useState([]);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const [selectedCategory, setSelectedCategory] = useState(null);



  let location = localStorage.getItem('location');
<<<<<<< HEAD
  if(location){
=======
  if (location) {
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    location = location.replace(/"/g, '');
    location = location.replace(/,/g, '');
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        const sportCategory = await axios.get("/category");
        if (sportCategory.data && Array.isArray(sportCategory.data.category)) {
          setCategory(sportCategory.data.category);
<<<<<<< HEAD
          setLoading(false);
=======
<<<<<<< HEAD
          setLoading(false)
=======
          setLoading(false);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
        } else if (sportCategory.data && sportCategory.data.category) {
          setCategory([sportCategory.data.category]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
<<<<<<< HEAD

=======
<<<<<<< HEAD
  
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  // Fetch existing coach data
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/player/${id}`);
<<<<<<< HEAD
        if (response.data && Array.isArray(response.data.player_record)) {
          setData(response.data.player_record);
          setSelectedCategory(response.data.player_record.sport_category.id);
=======
<<<<<<< HEAD
        if(response.data && Array.isArray(response.data.player_record)){
            setData(response.data.player_record);
            setSelectedCategory(response.data.player_record.sport_category.id);
        }else if(response.data && response.data.player_record){
            setData([response.data.player_record]);
            setSelectedCategory(response.data.player_record.sport_category.id);
        } 
=======
        if (response.data && Array.isArray(response.data.player_record)) {
          setData(response.data.player_record);
          setSelectedCategory(response.data.player_record.sport_category.id);
          setLoading(false);
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
        } else if (response.data && response.data.player_record) {
          setData([response.data.player_record]);
          setSelectedCategory(response.data.player_record.sport_category.id);
        }
<<<<<<< HEAD
=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        console.log(response.data.player_record.player_parent);
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
      } catch (error) {
        console.log(error);
      }
    };
    getCoachData();
  }, [id]);

<<<<<<< HEAD
  const editPlayerInfo = (data) => {
    const formData = new FormData();
    formData.append("player_name", data.player_name);
    formData.append("player_phonenumber", data.player_phonenumber);
    formData.append("player_gender", data.player_gender);
    formData.append("cat_id", selectedCategory);
    formData.append("play_with", data.play_with);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

=======
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // const editPlayerInfo = (data) => {
  //   const formData = new FormData();

  //   // Append form data for coach and academy
  //   formData.append('player_name', data.name);
  //   formData.append('player_phonenumber', data.player_phonenumber);
  //   formData.append('player_gender', data.player_gender);
  //   formData.append('cat_id', data.cat_id);
<<<<<<< HEAD
  
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  //   // Append files conditionally
  //   if (data.image[0]) {
  //     formData.append('image', data.image[0]);
  //   }

  //   // Make the API call to update coach and academy details
  //   axios
  //     .post(`/UpdatePlayerData/${id}`, formData,{
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((response) => {
  //       toast.success("Record Updated Successfully");
  //       console.log(response.data); // Debug response if needed
  //       navigation('/allcoach');
  //     })
  //     .catch((error) => {
  //       toast.error("Failed to Update Record");
  //       console.error(error.response?.data || error.message);
  //     });
  // };
<<<<<<< HEAD
  

  const editPlayerInfo = (data) => {
    const formData = new FormData();
  
=======


  const editPlayerInfo = (data) => {
    const formData = new FormData();

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    formData.append('player_name', data.player_name);
    formData.append('player_phonenumber', data.player_phonenumber);
    formData.append('player_gender', data.player_gender);
    formData.append('cat_id', selectedCategory);
<<<<<<< HEAD
  
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }
  
=======

    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    // Append parent info
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
    data.parent.forEach((parent, index) => {
      formData.append(`parent[${index}][name]`, parent.name);
      formData.append(`parent[${index}][cnic]`, parent.cnic);
      formData.append(`parent[${index}][phone_number]`, parent.phone_number);
    });
<<<<<<< HEAD

=======
<<<<<<< HEAD
  
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
    axios
      .post(`/UpdatePlayerData/${id}`, formData, {
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

<<<<<<< HEAD
  const onSubmit = (data) => {
    axios
      .post(`/UpdatePassword/${user_id}`, data)
      .then(() => {
        toast.success("Password updated successfully");
        reset();
      })
      .catch((error) => {
        toast.error("Failed to update password");
        console.error(error.response?.data || error.message);
      });
  };

  return (
    <Dashboard>
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
=======

<<<<<<< HEAD
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
  
=======
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

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d

  return (
    <>
      <Dashboard>
<<<<<<< HEAD
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
                   ) :
                   (
                    <>
        <ToastContainer />
         <div className="text-center mb-16 mt-16">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Edit{" "}
                <span className="text-indigo-600">Player</span>
              </h3>
          </div>
          {data.map((index, key) => (
            <form
              className="flex flex-col gap-6"
              key={key}
              onSubmit={handleSubmit(editPlayerInfo)}
            >
              <div className="-mx-3 md:flex mb-6">
                {/* Post Title */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="post_title"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Player Name"
                    defaultValue={index.player_name}
                    {...register("player_name", { required: "Player Name is required" })}
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
                    htmlFor="player_gender"
                  >
                    Gender
                  </label>
                  <select
                    {...register("player_gender", {
                      required: "Gender is required",
                    })}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.experience
                        ? "border-red-500"
                        : "border-grey-lighter"
                    } rounded py-3 px-4`}
                  >
                    <option
                      value="male" 
                      selected={index.player_gender === "male"}
                    >
                      Male
                    </option>
                    <option
                      value="female"
                      selected={index.player_gender === "female"}
                    >
                      Female
                    </option>
                  </select>
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                {/* Post Description */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Sport Category
                  </label>

                  <select
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
      value={selectedCategory || ""}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {category.length > 0 ? (
        category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
      ) : (
        <>
          <ToastContainer />
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="text-center mb-4">
              <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">Edit Player</h1>
            </div>

            {data.map((index, key) => (
              <form key={key} onSubmit={handleSubmit(editPlayerInfo)} className="flex flex-col gap-6">
                <div className="flex gap-4 mb-6">
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold mb-2">Player Name</label>
                    <input
                      type="text"
                      defaultValue={index.player_name}
                      {...register("player_name", { required: "Player Name is required" })}
                      className="w-full py-3 px-4 border rounded"
                    />
                    {errors.player_name && <p className="text-red-500 text-xs italic">{errors.player_name.message}</p>}
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold mb-2">Gender</label>
                    <select
                      {...register("player_gender", { required: "Gender is required" })}
                      className="w-full py-3 px-4 border rounded"
                      defaultValue={index.player_gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.player_gender && <p className="text-red-500 text-xs italic">{errors.player_gender.message}</p>}
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold mb-2">Sport Category</label>
                    <select
                      value={selectedCategory || ""}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      {...register("sport_category", { required: "Sport category is required" })}
                      className="w-full py-3 px-4 border rounded"
                    >
                      {category.length > 0 ? (
                        category.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option>Record not Found</option>
                      )}
                    </select>
                    {errors.sport_category && <p className="text-red-500 text-xs italic">{errors.sport_category.message}</p>}
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold mb-2">Phone Number</label>
                    <input
                      type="text"
                      defaultValue={index.player_phonenumber}
                      {...register("player_phonenumber", { required: "Phone Number is required" })}
                      className="w-full py-3 px-4 border rounded"
                    />
                    {errors.player_phonenumber && (
                      <p className="text-red-500 text-xs italic">{errors.player_phonenumber.message}</p>
                    )}
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold mb-2">Play With</label>
                    <select
                      defaultValue={index.playwith}
                      {...register("play_with", { required: "Play With is required" })}
                      className="w-full py-3 px-4 border rounded"
                    >
                      <option value="individual">Individual</option>
                      <option value="team">Team</option>
                    </select>
                    {errors.play_with && (
                      <p className="text-red-500 text-xs italic">{errors.play_with.message}</p>
                    )}
                  </div>
                </div>

                <div className="text-center mb-6 mt-10">
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Edit <span className="text-indigo-600">Player Parent</span>
                  </h3>
                </div>

                {index.player_parent.map((parent, key) => (
                  <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4" key={key}>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block text-xs font-bold mb-2">Parent Name</label>
                      <input
                        type="text"
                        defaultValue={parent.name}
                        {...register(`parent[${key}].name`, { required: "Parent name is required" })}
                        className="w-full py-3 px-4 border rounded"
                      />
                      {errors?.parent?.[key]?.name && (
                        <p className="text-red-500 text-xs italic">{errors.parent[key].name.message}</p>
                      )}
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block text-xs font-bold mb-2">Phone Number</label>
                      <input
                        type="text"
                        defaultValue={parent.phone_number}
                        {...register(`parent[${key}].phone_number`, { required: "Phone Number is required" })}
                        className="w-full py-3 px-4 border rounded"
                      />
                      {errors?.parent?.[key]?.phone_number && (
                        <p className="text-red-500 text-xs italic">{errors.parent[key].phone_number.message}</p>
                      )}
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block text-xs font-bold mb-2">CNIC</label>
                      <input
                        type="text"
                        defaultValue={parent.cnic || "Cnic Not found"}
                        {...register(`parent[${key}].cnic`, { required: "CNIC is required" })}
                        className="w-full py-3 px-4 border rounded"
                      />
                      {errors?.parent?.[key]?.cnic && (
                        <p className="text-red-500 text-xs italic">{errors.parent[key].cnic.message}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex justify-start px-3">
                  <button
                    type="submit"
                    className="tracking-wide font-semibold bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ))}

            {/* Password Update Section */}
            <div className="text-center mt-16 mb-6">
              <h3 className="text-2xl font-extrabold text-gray-900">
                Update <span className="text-indigo-600">Password</span>
              </h3>
            </div>

            <div className="border p-4 max-w-md mx-auto rounded shadow">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="password"
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic mb-2">{errors.password.message}</p>
                )}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("password_confirmation", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full mb-3 p-2 border rounded"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs italic mb-2">
                    {errors.password_confirmation.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full tracking-wide font-semibold bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
<<<<<<< HEAD
        </>
      )}
    </Dashboard>
=======

              {
  index.player_parent.map((parent, key) => (
    <div className="-mx-3 md:flex mb-6" key={key}>
      {/* Parent Name */}
      <div className="md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor={`name-${key}`}
        >
          Parent Name
        </label>
        <input
          type="text"
          defaultValue={parent.name}
          id={`name-${key}`}
          placeholder="Parent Name"
          {...register(`parent[${key}].name`)}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors?.parent?.[key]?.name
              ? "border-red-500"
              : "border-grey-lighter"
          } rounded py-3 px-4`}
        />
      </div>

      {/* Phone Number */}
      <div className="md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor={`phone_number-${key}`}
        >
          Phone Number
        </label>
        <input
          type="text"
          defaultValue={parent.phone_number}
          id={`phone_number-${key}`}
          placeholder="Phone Number"
          {...register(`parent[${key}].phone_number`)}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors?.parent?.[key]?.phone_number
              ? "border-red-500"
              : "border-grey-lighter"
          } rounded py-3 px-4`}
        />
      </div>

      {/* CNIC */}
      <div className="md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor={`cnic-${key}`}
        >
          CNIC
        </label>
        <input
          type="text"
          defaultValue={parent.cnic || "Cnic Not found"}
          id={`cnic-${key}`}
          placeholder="CNIC"
          {...register(`parent[${key}].cnic`, { required: "CNIC is required" })}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
            errors?.parent?.[key]?.cnic ? "border-red-500" : "border-grey-lighter"
          } rounded py-3 px-4`}
        />
        {errors?.parent?.[key]?.cnic && (
          <p className="text-red-500 text-xs italic">
            {errors.parent[key].cnic.message}
          </p>
        )}
      </div>
    </div>
  ))
}


              {/* Certificate Accademy */}

             <button
  type="submit"
  className="mt-5 tracking-wide font-semibold bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
>
  Submit
</button>

{/* <button
=======
        {loader ? (
          <div style={{ width: 200, height: 200, margin: 'auto' }}>
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        ) :
          (
            <>
              <ToastContainer />
              <div className="text-center mb-16 mt-16">
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                  Edit{" "}
                  <span className="text-indigo-600">Player</span>
                </h3>
              </div>
              {data.map((index, key) => (
                <form
                  className="flex flex-col gap-6"
                  key={key}
                  onSubmit={handleSubmit(editPlayerInfo)}
                >
                  <div className="-mx-3 md:flex mb-6">
                    {/* Post Title */}
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="post_title"
                      >
                        Player Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Player Name"
                        defaultValue={index.player_name}
                        {...register("player_name", { required: "Player Name is required" })}
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
                        htmlFor="player_gender"
                      >
                        Gender
                      </label>
                      <select
                        {...register("player_gender", {
                          required: "Gender is required",
                        })}
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors.experience
                          ? "border-red-500"
                          : "border-grey-lighter"
                          } rounded py-3 px-4`}
                      >
                        <option
                          value="male"
                          selected={index.player_gender === "male"}
                        >
                          Male
                        </option>
                        <option
                          value="female"
                          selected={index.player_gender === "female"}
                        >
                          Female
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-6">
                    {/* Post Description */}
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Sport Category
                      </label>

                      <select
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {category.length > 0 ? (
                          category.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        ) : (
                          <option>Record not Found</option>
                        )}
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
                        defaultValue={index.player_phonenumber}
                        placeholder="Phone Number"
                        {...register("player_phonenumber", { required: "Player Number is required" })}
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors.player_phonenumber
                          ? "border-red-500"
                          : "border-grey-lighter"
                          } rounded py-3 px-4`}
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-6">
                    {/* Post Image */}
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="flex items-center gap-4 mb-2">
                        <img
                          src={`http://127.0.0.1:8000/uploads/player_image/${index.image}`}
                          alt="Player"
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "5px",
                            padding: "5px",
                            border: "1px solid #ddd",
                          }}
                        />
                      </div>
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="image"
                      >
                        Player Image
                      </label>
                      <input
                        type="file"
                        {...register("image")}
                        id="image"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg file:py-2 file:px-4 file:border-0 file:mr-4 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-16 mt-16">
                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                      Edit{" "}
                      <span className="text-indigo-600">Player Parent</span>
                    </h3>
                  </div>

                  {
                    index.player_parent.map((parent, key) => (
                      <div className="-mx-3 md:flex mb-6" key={key}>
                        {/* Parent Name */}
                        <div className="md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor={`name-${key}`}
                          >
                            Parent Name
                          </label>
                          <input
                            type="text"
                            defaultValue={parent.name}
                            id={`name-${key}`}
                            placeholder="Parent Name"
                            {...register(`parent[${key}].name`)}
                            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors?.parent?.[key]?.name
                              ? "border-red-500"
                              : "border-grey-lighter"
                              } rounded py-3 px-4`}
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor={`phone_number-${key}`}
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            defaultValue={parent.phone_number}
                            id={`phone_number-${key}`}
                            placeholder="Phone Number"
                            {...register(`parent[${key}].phone_number`)}
                            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors?.parent?.[key]?.phone_number
                              ? "border-red-500"
                              : "border-grey-lighter"
                              } rounded py-3 px-4`}
                          />
                        </div>

                        {/* CNIC */}
                        <div className="md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor={`cnic-${key}`}
                          >
                            CNIC
                          </label>
                          <input
                            type="text"
                            defaultValue={parent.cnic || "Cnic Not found"}
                            id={`cnic-${key}`}
                            placeholder="CNIC"
                            {...register(`parent[${key}].cnic`, { required: "CNIC is required" })}
                            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${errors?.parent?.[key]?.cnic ? "border-red-500" : "border-grey-lighter"
                              } rounded py-3 px-4`}
                          />
                          {errors?.parent?.[key]?.cnic && (
                            <p className="text-red-500 text-xs italic">
                              {errors.parent[key].cnic.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  }


                  {/* Certificate Accademy */}

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    Submit
                  </button>

                  {/* <button
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  type="submit"
  className="mt-5 w-fit px-6 text-sm tracking-wide font-semibold bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300 ease-in-out"
>
  Submit
</button> */}

<<<<<<< HEAD
            </form>
          ))}

<div className="text-center mb-16 mt-16">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Update{" "}
                <span className="text-indigo-600">Password</span>
              </h3>
          </div>
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
  className="w-full mt-2 tracking-wide font-semibold bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
>
  Update Password
</button>

            </form>
          </div>


        
        </>
        )}      </Dashboard>
=======
                </form>
              ))}

              <div className="text-center mb-16 mt-16">
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                  Update{" "}
                  <span className="text-indigo-600">Password</span>
                </h3>
              </div>
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
                    className="w-full mt-2 tracking-wide font-semibold bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Update Password
                  </button>

                </form>
              </div>



            </>
          )}      </Dashboard>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    </>
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
  );
}

export default Edit_player;
