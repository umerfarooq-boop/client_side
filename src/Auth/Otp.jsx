import React from 'react';
import axios from '../axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';

function Otp() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otp,setOtp] = useState('');
  const email = localStorage.getItem('email');

  // Function to verify OTP
  const loginOtp = async (data) => {
    // const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    
    const submissionData = { email, otp };
    setLoading(true);

    try {
      const response = await axios.post('/verify-otp', submissionData);
      toast.success('OTP is Verified');
      // alert("Found");
      reset();
      const localotp = localStorage.getItem('forgetOtp' || '');
      if(localotp){
        
      }else{
        navigate('/profile');
      }
      reset();
    } catch (error) {
      toast.error('Invalid OTP or Time Over');
      reset();
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to resend OTP
  const Resendemail = async (e) => {
    // e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem('email');
    const resendData = { email };

    try {
      const response = await axios.post('/resend-otp', resendData);
      toast.success('New OTP sent to your email');
    } catch (error) {
      toast.error('Failed to send OTP, please try again');
      console.error('Error resending OTP:', error);
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-lg h-full">
            <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
            <p className="text-sm font-semibold text-center mb-10">Otp Send on Your {email}</p>
      
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputType="number"
              renderSeparator={<span className="mx-4 text-green-500">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-20 h-20 text-center rounded-lg border-2 border-blue-500 bg-gray-200 text-blue-800 text-3xl font-semibold shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
              containerStyle="flex justify-center space-x-20 mb-10 text-5xl"
            />
            <button
              className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              onClick={loginOtp}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
      
            <div className="mt-4 flex justify-center text-gray-600">
              <p>Didn't receive a code?&nbsp;</p>
              <a
                href="#"
                onClick={Resendemail}
                className="text-blue-500 hover:underline"
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </>
      
      )}
      <ToastContainer /> 
    </>
  );
}

export default Otp;
