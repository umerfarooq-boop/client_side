import axios from '../axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import mainlogo from '../../public/mainlogo.png'
import login from '../../public/Auth_Images/login.png'
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import resetImage from '../../public/Auth_Images/reset.png'

    function ResetPassword() {
        const {
          register,
          handleSubmit,
          reset,watch,
          setError,trigger,
          formState: { errors },
        } = useForm();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const email = localStorage.getItem('email');
        const resetPassword = async (data) => {
            setLoading(true);
            try {
                const response = await axios.post(`/resetPassword`, data);
                reset();
                
                if(response.data.message){
                    Swal.fire({
                        title: "Success!",
                        text: "Password Reset Successfully",
                        icon: "success",
                        button: "OK",
                      });
                }
                
                // const role = localStorage.getItem('role');
                // if (role === 'player') {
                //     navigate('/coachpost');
                // } else if (role === 'coach' || role === 'admin') {
                //     navigate('/');
                // }
                navigate('/login');
        
            } catch (error) {
                alert(error.response?.data?.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };
        
      
        

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
                      backgroundImage: `url(${resetImage})`,
                    }}
                  ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-10">
                  <div className=" flex flex-col items-center">
                    <div className="text-center">
                      <div className="flex items-center">
                      <h1 className="text-3xl font-extrabold text-blue-900">
                        Reset Password
                      </h1>&nbsp;&nbsp;
                      <img src={mainlogo} className="h-10 mt-5 w-10 m-auto" alt="" />
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-5">
                        From Pakistan
                      </p>
                    </div>
                    <div className="w-full flex-1 mt-10">
                      <form onSubmit={handleSubmit(resetPassword)}>
                        <div className="mx-auto max-w-screen-md flex flex-col gap-4">
                        
            {errors.password && (
                          <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
    
                        <input
                          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                          type="text"
                          placeholder="Enter New Password"
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
                      <input type="hidden" value={email} {...register('email')} />
    
         
                          <button
                            type="submit"
                            className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          >
                            <span className="ml-3">Reset</span>
                          </button>
    
                          
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
export default ResetPassword


