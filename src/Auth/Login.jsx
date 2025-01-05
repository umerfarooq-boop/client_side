import axios from '../axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import mainlogo from '../../public/mainlogo.png'
import login from '../../public/Auth_Images/login.png'
import Swal from "sweetalert2";

function Login() {
  const {
    register,
    handleSubmit,
    reset,watch,
    setError,trigger,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem('user_id');
  const Loginuser = async (data) => {
    setLoading(true);
    axios
      .post('/login', data)
      .then((response) => {
        reset();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('name', response.data.user.name);
  
        const role = localStorage.getItem('role');

        if(role === 'player'){
          navigate('/coachpost');
        }else if(role === 'coach'){
          navigate('/')
        }else if(role === 'admin'){
          navigate('/');
        }

        setLoading(false);
        // navigate('/dashboard'); // Use the existing navigate instance
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || 'An error occurred.',
          icon: "error",
          button: "OK",
        });
      });
  };

  const StoreinLocalStorage = async () => {
    try{
      setLoading(true);
      const response = await axios.post(`/forgotOtp/${user_id}`)
      setLoading(false);
      // navigate();
      if(response){
        Swal.fire({
          title: "Success!",
          text: "Otp Send on Your Email",
          icon: "success",
          button: "OK",
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          button: "OK",
        });
      }
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <>
      {loading ? (
        <div className="justify-center items-center flex flex-col h-screen">
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
          <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
          <div className="max-w-screen-lg bg-white border shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 bg-blue-900 text-center hidden md:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${login})`,
                }}
              ></div>
            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-10">
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <div className="flex items-center">
                  <h1 className="text-3xl font-extrabold text-blue-900">
                    Login
                  </h1>&nbsp;&nbsp;
                  <img src={mainlogo} className="h-10 mt-5 w-10 m-auto" alt="" />
                  </div>
                  <p className="text-start text-sm text-gray-500 mt-1">
                    From Pakistan
                  </p>
                </div>
                <div className="w-full flex-1 mt-10">
                  <form onSubmit={handleSubmit(Loginuser)}>
                    <div className="mx-auto max-w-screen-md flex flex-col gap-2">
                    
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

     
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <span className="ml-3">Login</span>
                      </button>

                      <p className="mt-6 text-xs text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to={'/signup'}>
                          <span className="text-blue-900 font-semibold">
                            Singup
                          </span>
                        </Link> &nbsp;
                        <Link to={`/forgotPass/${user_id}`} onClick={StoreinLocalStorage}>
                          <span className="text-blue-900 font-semibold">
                            Forget Password
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
        </>
      )}
    </>
  );
}

export default Login;
