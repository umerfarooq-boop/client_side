import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel,MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Nav from '../website/Nav';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import axios from '../axios'
import { useForm } from 'react-hook-form';
import { ToastContainer,toast } from 'react-toastify';
const CheckoutForm = () => {
    const [Pageloading,setPageLoading] = useState(false);
    const {register,handleSubmit,setValue} = useForm()
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        setPageLoading(true); // start loading immediately
      
        const timer = setTimeout(() => {
          setPageLoading(false); // stop loading after 1 second
        }, 1000);
      
        return () => clearTimeout(timer); // cleanup if component unmounts
      }, []);
      
    


    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleCheckboxChange = (event) => {
        setAgreed(event.target.checked);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     // Simulate payment logic
    //     setTimeout(() => {
    //         setLoading(false);
    //         console.log('Payment confirmed!');
    //     }, 2000);
    // };


    // Get Player Schedule Record
    
    localStorage.removeItem('total_charges');
    const AddRecord = async (formData) => {
        try {
            const response = await axios.post('/checkout_form', formData);
            if (response.data && response.status === 201) {
                const total_charges = response.data.data?.total_charges;
                toast.success(response.data.message);
                localStorage.setItem('total_charges', total_charges);
            
                setTimeout(() => {
                    navigate('/payment', {
                        state: { amount: total_charges}
                    });
                }, 1500); 
            } else {
                toast.error(response.data.message || 'Something went wrong'); 
            }
        } catch (error) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
            
        }
    };
    
    
    
    const [data,setData] = useState([]);
    const email = localStorage.getItem('email');
    const player_id = localStorage.getItem('player_id');
    useEffect(() => {
        const GetPlayerBooking = async () =>{
            const response = await axios.get(`/checkout_form/${player_id}`);
            if(response.data && Array.isArray(response.data.player_booking)){
                setData(response.data.player_booking);
            } else if(response.data && response.data.player_booking){
                setData([response.data.player_booking]);
            }
        }
        GetPlayerBooking();
    },[player_id]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).replace(":00", "");
    };
    const handleFieldChange = (fieldName, value) => {
        // Set the field's updated value in the form
        setValue(fieldName, value);
    };
    // const calculateTotalCharges = () => {
    //     const days = Math.ceil(
    //         (new Date(index.to_date) - new Date(index.from_date)) / (1000 * 60 * 60 * 24)
    //     );
    //     return days * index.coach?.per_hour_charges;
    // };

    // Get Player Schedule Record

    return (
        <>
            {
                Pageloading ? (
                <div className="flex flex-col items-center justify-center h-screen">
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
                    <div>
                        <Nav />
                        <ToastContainer />
                    <div className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
                    <div className="text-center mb-16 mt-16">
                            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                                Checkout{" "}
                                <span className="text-indigo-600">Form</span>
                            </h3>
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        {success && <div className="text-green-500 mb-4 text-center">{success} <CheckCircleOutlineIcon /></div>}

                        <form onSubmit={handleSubmit(AddRecord)} className="space-y-6">
                            {/* User Information */}
                            {
                                data.map((index,key)=>(
                                    <div kye={index}>
                                        <h3 className="font-semibold text-lg border-b pb-2 mb-4">Player Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <TextField
                            variant="outlined"
                            {...register('player_name')}
                            defaultValue={index.player?.player_name}
                            size="small"
                            label="Full Name"
                            name="player_name"
                            onChange={(e) => setValue('player_name', e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            {...register('player_email')}
                            defaultValue={email}
                            label="Email Address"
                            name="player_email"
                            onChange={(e) => setValue('player_email', e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            {...register('player_phone_number')}
                            defaultValue={index.player?.player_phonenumber}
                            label="Phone Number"
                            name="player_phone_number"
                            onChange={(e) => setValue('player_phone_number', e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            {...register('player_address')}
                            defaultValue={index.player?.player_address}
                            label="Address"
                            name="player_address"
                            onChange={(e) => setValue('player_address', e.target.value)}
                        />
                    </div>

                            {/* Booking Details */}
                            <h3 className="font-semibold text-lg border-b pb-2 mb-4 mt-2">Booking Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                {...register('coach_name')} 
                                label="Coach Name" 
                                defaultValue={index.coach?.name} 
                                InputProps={{ readOnly: true }} 
                            />
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                {...register('start_time')} 
                                label="Start Time" 
                                defaultValue={index.start_time} 
                                type="time" 
                                InputProps={{ readOnly: true }} 
                            />
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                {...register('end_time')} 
                                label="End Time" 
                                defaultValue={index.end_time} 
                                type="time" 
                                InputProps={{ readOnly: true }} 
                            />
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                {...register('to_date')} 
                                label="To Date" 
                                defaultValue={index.to_date} 
                                type="date" 
                                InputProps={{ readOnly: true }} 
                            />
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                {...register('from_date')} 
                                label="From Date" 
                                defaultValue={index.from_date} 
                                type="date" 
                                InputProps={{ readOnly: true }} 
                            />
                            </div>
                                    </div>
                                ))
                            }

                            {/* Payment Information */}
                            <h3 className="font-semibold text-xl text-gray-800 border-b pb-2 mb-4">
                                Payment Information
                            </h3>
                            <div className="space-y-4">
                                <TextField
                                    select
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    {...register('payment_type', { required: 'Payment Type is required' })}
                                    label="Payment Method"
                                    name="payment_type"
                                    className="bg-white"
                                >
                                    <MenuItem value="stripe" className="text-gray-700">
                                        Stripe
                                    </MenuItem>
                                </TextField>
                            </div>

                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Review Your Booking</h3>
                            <div className=" p-6 rounded-3xl shadow-sm max-w-md mx-auto border">
                                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">🧾 Booking Summary</h2>

                                <div className="space-y-5 text-gray-800">
                                        {
                                            data.map((index,key) => (
                                    <div>
                                        <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 font-semibold">
                                            🎓 Coach:
                                        </span>
                                                <div>
                                                    <span className="text-lg font-medium">{index.coach?.name}</span>
                                                </div>
                                            
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <span className="flex items-center gap-2 font-semibold">
                                            📅 Schedule:
                                        </span>
                                    <span className="text-lg font-medium">
                                    {index.to_date && index.from_date 
                                        ? `${Math.ceil(
                                            (new Date(index.to_date) - new Date(index.from_date)) / (1000 * 60 * 60 * 24)
                                        )} days`
                                        : "N/A"}
                                    </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        🕒 Time:
                                    </span>
                                        <span className="text-lg font-medium">
                                            {formatTime(index.start_time)} to {formatTime(index.end_time)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <span className="flex items-center gap-2 font-semibold">
                                            <span role="img" aria-label="clock">💰</span> Hourly Rate:
                                        </span>
                                        <span className="text-lg font-medium">
                                            {index.coach?.per_hour_charges}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-dashed pt-4 mt-4">
                                        <span className="flex items-center gap-2 text-lg font-bold text-yellow-600">
                                        💵 Total Amount:
                                        </span>
                                        <span className="text-xl font-extrabold text-black">
                                            {index.to_date && index.from_date && index.coach?.per_hour_charges
                                                ? `Rs ${Math.ceil(
                                                    (new Date(index.to_date) - new Date(index.from_date)) / (1000 * 60 * 60 * 24)
                                                ) * index.coach.per_hour_charges}`
                                                : "N/A"}
                                        </span>
                                    </div>
                                    {/* // Hidden fields */}

                                    <input type="hidden" {...register('per_hour_charges')} value={index.coach?.per_hour_charges} />
                                    
                                    <div className="hidden">
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        {...register('total_charges', { 
                                            required: "Total Charges is required",
                                            valueAsNumber: true,
                                        })}
                                        label="Total Charges"
                                        defaultValue={
                                            index.to_date && index.from_date && index.coach?.per_hour_charges
                                                ? Math.ceil(
                                                    (new Date(index.to_date) - new Date(index.from_date)) / (1000 * 60 * 60 * 24)
                                                ) * index.coach.per_hour_charges
                                                : 0
                                        }
                                        InputProps={{ readOnly: true }}
                                    />

                                    </div>



                                    <input type="hidden" className='text-black' {...register('player_id')} value={index.player?.id} />
                                    <input type="hidden" className='text-black'  {...register('coach_id')} value={index.coach?.id} />
                                    <input type="hidden" className='text-black'  {...register('booking_id')} value={index.id} />
                                                </div>
                                    ))
                                    }                



                                    
                                </div>
                            </div>


                            {/* Security Measures */}
                            <FormControlLabel
                                control={<Checkbox checked={agreed} onChange={handleCheckboxChange} />}
                                label="I agree to the Terms and Conditions"
                            />

                            {/* Buttons */}
                            <div className="flex justify-between mt-6">
                                <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                                    Cancel / Go Back
                                </Button>
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={!agreed}
                                >
                                    <ChevronRightIcon /> Confirm and Pay
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                    </div>
                )
            }
        </>
    );
};

export default CheckoutForm;