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
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit_player() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  let location = localStorage.getItem("location");
  if (location) {
    location = location.replace(/"/g, "").replace(/,/g, "");
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        const sportCategory = await axios.get("/category");
        if (sportCategory.data && Array.isArray(sportCategory.data.category)) {
          setCategory(sportCategory.data.category);
          setLoading(false);
        } else if (sportCategory.data && sportCategory.data.category) {
          setCategory([sportCategory.data.category]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/player/${id}`);
        if (response.data && Array.isArray(response.data.player_record)) {
          setData(response.data.player_record);
          setSelectedCategory(response.data.player_record.sport_category.id);
        } else if (response.data && response.data.player_record) {
          setData([response.data.player_record]);
          setSelectedCategory(response.data.player_record.sport_category.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCoachData();
  }, [id]);

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

    data.parent.forEach((parent, index) => {
      formData.append(`parent[${index}][name]`, parent.name);
      formData.append(`parent[${index}][cnic]`, parent.cnic);
      formData.append(`parent[${index}][phone_number]`, parent.phone_number);
    });

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
        </>
      )}
    </Dashboard>
  );
}

export default Edit_player;
