import axios from '../axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
function Login() {

  const {handleSubmit,reset,register} = useForm();
  const navigate = useNavigate();

  const Logiuser = async (data) =>{
    axios.post('/login',data).then((response)=>{
      reset();
      alert('Record Saved Successfully');
      console.log(response.data.user);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('role',response.data.user.role);
      localStorage.setItem('name',response.data.user.name);

      const role = localStorage.getItem('role');
      
      if(role === 'admin'){
        navigate('/admin-profile');
      }else if(role === 'coach'){
        navigate('/coach-profile');
      }else if(role === 'player'){
        navigate('/player-profile');
      }

    }).catch((error)=>{
      console.log("error"+error);
    })
  }
  return (
    <>
<section>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl">
          Login Account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(Logiuser)}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              {...register('email',{required:true})}
              className="bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5"
              placeholder="abc@example.com"
              required=""
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              {...register('password',{required:true})}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required=""
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500">
            Create an account? <a href="/" className="font-medium text-blue-600 hover:underline">Signup here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>


    </>
  )
}

export default Login