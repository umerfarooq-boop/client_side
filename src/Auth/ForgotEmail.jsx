import axios from '../axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import mainlogo from '../../public/mainlogo.png'
import login from '../../public/Auth_Images/login.png'
import Swal from "sweetalert2";

function ForgotEmail() {
  const {
    register,
    handleSubmit,
    reset,watch,
    setError,trigger,
    formState: { errors },
  } = useForm();

  const user_id = localStorage.getItem('user_id');

const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const StoreinLocalStorage = async () => {
    try{
      setLoading(true);
      
      const response = await axios.post(`/forgotOtp/${user_id}`);
        const email = response.data.email;

        if (email) {
            localStorage.setItem('email', email);
            console.log('Stored email:', email);
        }
      setLoading(false);
      // navigate();
      if(response){
        Swal.fire({
          title: "Success!",
          text: "Otp Send on Your Email",
          icon: "success",
          button: "OK",
        });
        navigate('/forgotPass/:user_id');
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
                    Sign in
                  </h1>&nbsp;&nbsp;
                  <img src={mainlogo} className="h-10 mt-5 w-10 m-auto" alt="" />
                  </div>
                  <p className="text-start text-sm text-gray-500 mt-1">
                    From Pakistan
                  </p>
                </div>
                <div className="w-full flex-1 mt-10">
                  <form onSubmit={handleSubmit(StoreinLocalStorage)}>
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

                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <span className="ml-3">Send</span>
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

export default ForgotEmail