import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import { OtpInput } from 'reactjs-otp-input';



function Otp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); 
  const [showResend, setShowResend] = useState(false); 
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  // Function to verify OTP
  const loginOtp = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    const submissionData = { email, otp };
    setLoading(true);

    try {
      const response = await axios.post('/verify-otp', submissionData);
      toast.success('OTP is Verified');
      navigate('/login');
    } catch (error) {
      toast.error('Invalid OTP or Time Over');
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };


  const Resendemail = async () => {
    setLoading(true);

    const resendData = { email };

    try {
      const response = await axios.post('/resend-otp', resendData);
      toast.success('New OTP sent to your email');
      setTimer(60); 
      setShowResend(false); 
    } catch (error) {
      toast.error('Failed to send OTP, please try again');
      console.error('Error resending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowResend(true); 
    }
    return () => clearInterval(interval); 
  }, [timer]);

  const handleChange = (otpValue) => setOtp(otpValue);

  const onSubmit = (e) => {
    e.preventDefault();
    loginOtp({ otp });
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
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email {email}</p>
                </div>
              </div>

              <div>
                
                <div className="text-center mb-5 text-blue-600 text-lg">
                  {timer > 0 ? (
                    <span>Resend available in {timer} seconds</span>
                  ) : null}
                </div>

                
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-col items-center justify-between mx-auto w-full max-w-xs">
                      <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4} 
                        separator={<span>-</span>}
                        inputStyle={{
                          width: '3rem',
                          height: '3rem',
                          margin: '0 0.5rem',
                          fontSize: '1.5rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.3)',
                        }}
                        focusStyle={{
                          border: '1px solid blue',
                        }}
                      />
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          type="submit"
                          className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                          <svg
                            className="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span className="ml-3">Verify OTP</span>
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive a code?</p>

                        {showResend ? (
                          <a
                            className="flex flex-row items-center text-blue-600 cursor-pointer"
                            onClick={Resendemail}
                          >
                            Resend
                          </a>
                        ) : (
                          <span className="text-gray-400">Resend in 1 minute</span>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Otp;
