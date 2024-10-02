import axios from '../axios'
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import {RotatingLines} from "react-loader-spinner";
import { useState } from 'react';
import Swal from 'sweetalert2';

function Signup() {
  const {register,handleSubmit, watch,reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const Signupuser = async (data) =>{
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    setLoading(true);
    axios.post('/signup',data).then((response)=>{
      // this lie i want use sweetalert
      console.log(response.data);
      if(response.data.User && response.data.User.email){
        localStorage.setItem('email',response.data.User.email);
        const email = localStorage.getItem('email',response.data.User.email);
        console.log(email);
      }Swal.fire({
        title: "Success!",
        text: "Account Created Verify Account",
        icon: "success",
        button: "OK",
      })
      reset();
      setLoading(false);
      navigate('/otp');
    }).catch((error)=>{
      console.log("The Error is "+error);
    })
  }
  
  return (
    <>
    {
      loading ? 
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
       : 

      
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
            <form onSubmit={handleSubmit(Signupuser)}>
      <div className="mx-auto max-w-xs flex flex-col gap-4">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
          type="text"
          placeholder="Enter your name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
          type="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Email is not valid'
            }
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            }
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
          type="password"
          placeholder="Confirm Password"
          {...register('password_confirmation', {
            validate: value => value === watch('password') || 'Passwords do not match'
          })}
        />
        {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}

        <select 
          {...register('role', { required: 'Role is required' })} 
          className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.role ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="player">Player</option>
          <option value="coach">User</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

        <button type='submit' className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
          <span className="ml-3">Sign Up</span>
        </button>

        <p className="mt-6 text-xs text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login">
            <span className="text-blue-900 font-semibold">Login</span>
          </a>
        </p>
      </div>
    </form>

            </div>
          </div>
        </div>
      </div>
    </div>
      
    }


    </>
  );
}

export default Signup;
