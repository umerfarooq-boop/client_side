import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Nav from '../website/Nav';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        coachName: '',
        bookingDate: '',
        pickupLocation: '',
        dropoffLocation: '',
        paymentMethod: 'creditCard',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        couponCode: '',
        totalAmount: 0,
        agreedToTerms: false,
    });
    const [Pageloading,setPageLoading] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment logic
        setTimeout(() => {
            setLoading(false);
            console.log('Payment confirmed!');
        }, 2000);
    };

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
                    <div className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
                    <div className="text-center mb-16 mt-16">
                            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                                Checkout{" "}
                                <span className="text-indigo-600">Form</span>
                            </h3>
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        {success && <div className="text-green-500 mb-4 text-center">{success} <CheckCircleOutlineIcon /></div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User Information */}
                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Player Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField variant="outlined" size="small" label="Full Name" name="fullName" onChange={handleChange} />
                                <TextField variant="outlined" size="small" label="Email Address" name="email" onChange={handleChange} />
                                <TextField variant="outlined" size="small" label="Phone Number" name="phone" onChange={handleChange} />
                                <TextField variant="outlined" size="small" label="Address" name="address" onChange={handleChange} />
                            </div>

                            {/* Booking Details */}
                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Booking Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField variant="outlined" size="small" label="Coach Name" name="coachName" onChange={handleChange} />
                                <TextField variant="outlined" size="small" type="datetime-local" name="bookingDate" onChange={handleChange} />
                            </div>

                            {/* Payment Information */}
                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Payment Information</h3>
                            <TextField select variant="outlined" size="small" fullWidth label="Payment Method" name="paymentMethod" onChange={handleChange}>
                                <option value="creditCard">Stripe</option>
                            </TextField>
                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Review Your Booking</h3>
                            <div className=" p-6 rounded-3xl shadow-sm max-w-md mx-auto border">
                                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">🧾 Booking Summary</h2>

                                <div className="space-y-4 text-gray-800">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 font-semibold">
                                            🎓 Coach:
                                        </span>
                                        <span className="text-lg font-medium">fsafasfa</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 font-semibold">
                                            📅 Date/Time:
                                        </span>
                                        <span className="text-lg font-medium">fdsafdas</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 font-semibold">
                                            📍 Pickup:
                                        </span>
                                        <span className="text-lg font-medium">fasfasdf</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 font-semibold">
                                            🏁 Drop-off:
                                        </span>
                                        <span className="text-lg font-medium">fsafasd</span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-dashed pt-4 mt-4">
                                        <span className="flex items-center gap-2 text-lg font-bold text-yellow-600">
                                            💰 Total Amount:
                                        </span>
                                        <span className="text-xl font-extrabold text-black">3123123</span>
                                    </div>
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