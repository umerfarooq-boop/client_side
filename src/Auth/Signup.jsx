import axios from "../axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import Swal from "sweetalert2";
import mainlogo from '../../public/mainlogo.png'
import signup from '../../public/Auth_Images/signup.png'

function Signup() {
  // localStorage.clear();
  // localStorage.removeItem('coach_record');
localStorage.removeItem('email');
localStorage.removeItem('role');
localStorage.removeItem('coach_id');
localStorage.removeItem('token');
// localStorage.removeItem('user_id');
localStorage.removeItem('mapbox.eventData.uuid:dW1lcndhbGk=');
localStorage.removeItem('mapbox.eventData:dW1lcndhbGk=');
localStorage.removeItem('name');
localStorage.removeItem('player_id');
localStorage.removeItem('playwith');
localStorage.removeItem('profile_location');

  const {
    register,
    handleSubmit,
    reset,watch,
    setError,trigger,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const Signupuser = async (data) => {
    // localStorage.removeItem('email');
    // localStorage.removeItem('token');
    // localStorage.removeItem('role');
    // localStorage.removeItem('name');

    setLoading(true);
    axios
      .post("/signup", data)
      .then((response) => {
        // this lie i want use sweetalert
        console.log(response.data);
        if (response.data.User && response.data.User.email) {
          localStorage.setItem("user_id", response.data.User.id);
          localStorage.setItem("email", response.data.User.email);
          localStorage.setItem("role", response.data.User.role);
          const email = localStorage.getItem("email", response.data.User.email);
          console.log(email);
        }
        Swal.fire({
          title: "Success!",
          text: "Account Created Verify Account",
          icon: "success",
          button: "OK",
        });
        reset();
        setLoading(false);
        navigate("/otp");
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
    
          // Map server errors to form fields
          Object.keys(serverErrors).forEach((field) => {
            setError(field, {
              type: "server",
              message: serverErrors[field],
            });
          });
        } else {
          // Handle general network or unexpected errors
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            button: "OK",
          });
        }
        setLoading(false);
      });
  };

  const nameValue = watch("name");

  return (
    <>
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
          <div className="max-w-screen-xl max-h-auto bg-white border shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${signup})`,
              }}
            ></div>

            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-10">
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <div className="flex items-center">
                  <h1 className="text-2xl font-extrabold text-blue-900">
                  Singup
                  </h1>&nbsp;&nbsp;
                  <img src={mainlogo} className="h-10 mt-5 w-10 m-auto" alt="" />
                  </div>
                  <p className="text-[12px] text-gray-500 mt-1">
                    From Pakistan
                  </p>
                </div>
                <div className="w-full flex-1 mt-10">
                  <form onSubmit={handleSubmit(Signupuser)}>
                    <div className="mx-auto max-w-screen-md flex flex-col gap-2">
                    {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
                    <input
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
            errors.name ? "border-red-500" : "border-gray-200"
          } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/, // Regex for strings with only letters and spaces
              message: "Name must contain only letters",
            },
          })}
          onKeyUpCapture={() => {
            setTimeout(()=>{
              trigger("name");
            },1000)
          }}
          onBlur={() => {
            setTimeout(()=>{
              trigger("name");
            },1000) 
          }}
        />
        
        {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    <input
                      className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "Email is not valid",
                        },
                      })}
                      onKeyUpCapture={() => {
                        setTimeout(()=>{
                          trigger("email");
                        },1000)
                      }}
                      onBlur={() => {
                        setTimeout(()=>{
                          trigger("email");
                        },1000) 
                      }}
                    />
                    


{errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                      <input
                        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                          errors.password ? "border-red-500" : "border-gray-200"
                        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}

                        onKeyUpCapture={() => {
                          setTimeout(()=>{
                            trigger("password");
                          },1000)
                        }}
                        onBlur={() => {
                          setTimeout(()=>{
                            trigger("password");
                          },1000) 
                        }}
                      />

                      

                      
{errors.password_confirmation && (
                        <p className="text-red-500 text-sm">
                          {errors.password_confirmation.message}
                        </p>
                      )}
                      <input
                        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                          errors.password_confirmation
                            ? "border-red-500"
                            : "border-gray-200"
                        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                        type="password"
                        placeholder="Confirm Password"
                        {...register("password_confirmation", {
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                      />
                      

                      <select
                        {...register("role")}
                        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      >
                        <option value="" disabled selected>Select Role</option>
                        {/* <option value="admin">Admin</option> */}
                        <option value="player">Player</option>
                        <option value="coach">Coach</option>
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-sm">
                          {errors.role.message}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <span className="ml-3">Singup</span>
                      </button>

                      <p className="mt-6 text-xs text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to={'/login'}>
                          <span className="text-blue-900 font-semibold">
                            Log-in
                          </span>
                        </Link> &nbsp;
                        <Link to={'/'}>
                          <span className="text-blue-900 font-semibold">
                            Guest
                          </span>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
