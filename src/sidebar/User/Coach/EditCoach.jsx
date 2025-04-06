import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import Dashboard from "../../Dashboard";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

function EditCoach() {
  const { id } = useParams(); // Get the coach ID from URL parameters
  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
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
  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/coach/${id}`);
        setData(response.data.coach_record); // Assuming this contains coach details
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

    // Append form data for coach and academy
    formData.append('name', data.name);
    formData.append('experience', data.experience);
    formData.append('level', data.level);
    formData.append('phone_number', data.phone_number);
    formData.append('coach_location', data.coach_location);
    formData.append('academy_name', data.academy_name);
    formData.append('academy_location', data.academy_location);
    formData.append('address', data.address);
    formData.append('academy_phonenumber', data.academy_phonenumber);
  
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
        navigation(-1);
      })
      .catch((error) => {
        toast.error("Failed to Update Record");
        console.error(error.response?.data || error.message);
      });
  };
  

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

              {/* Coach Image Upload */}
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
      </Dashboard>
    </>
  );
}

export default EditCoach;
