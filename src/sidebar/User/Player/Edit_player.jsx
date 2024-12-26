import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import Dashboard from "../../Dashboard";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

function Edit_player() {
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
  const [category,setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);



  let location = localStorage.getItem('location');
  if(location){
    location = location.replace(/"/g, '');
    location = location.replace(/,/g, '');
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        const sportCategory = await axios.get("/category");
        if (sportCategory.data && Array.isArray(sportCategory.data.category)) {
          setCategory(sportCategory.data.category);
        } else if (sportCategory.data && sportCategory.data.category) {
          setCategory([sportCategory.data.category]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  
  // Fetch existing coach data
  useEffect(() => {
    const getCoachData = async () => {
      try {
        const response = await axios.get(`/player/${id}`);
        if(response.data && Array.isArray(response.data.player_record)){
            setData(response.data.player_record);
            setSelectedCategory(response.data.player_record.sport_category.id);
        }else if(response.data && response.data.player_record){
            setData([response.data.player_record]);
            setSelectedCategory(response.data.player_record.sport_category.id);
        } 
        console.log(response.data.player_record.player_parent);
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
        navigation('/allcoach');
      })
      .catch((error) => {
        toast.error("Failed to Update Record");
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
              key={key}
              onSubmit={handleSubmit(editCoachInfo)}
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
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${
                      errors.player_phonenumber
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

              <div className="text-center mb-4">
                <h1 className="text-2xl xl:text-4xl font-bold text-blue-900">
                  Edit Parent Record
                </h1>
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
                className="mt-5 tracking-wide font-semibold bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              >
                Submit
              </button>
            </form>
          ))}
        </div>
      </Dashboard>
    </>
  );
}

export default Edit_player