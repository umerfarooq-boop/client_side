import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement,Elements } from '@stripe/react-stripe-js';
import axios from '../axios';
import stripeLogo from '../assets/Calendar.png'; // Add a Stripe logo image to your assets
import yourLogo from '../assets/Calendar.png'; 
const stripePromise = loadStripe('pk_test_51RCqM3FLwCatna2izHIeLWR95qU6VrL1TilF3Z5ElVzvmpohx5GbYxor6BgfgIa0dF7GGiBHtI9vjjRn6Kw7Ocv700P9Gb6P4h');
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('/create-payment-intent', { amount })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(err => {
        console.error('Stripe Error:', err);
        alert('Payment initialization failed.');
      });
  }, [amount]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardNumberElement);


    if (!stripe || !elements || !clientSecret) return;

    // const card = elements.getElement(CardElement);
    const name = localStorage.getItem('name');
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: name
        },
      },
    });
    const coach_record = localStorage.getItem('coach_record');
    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
        Swal.fire({
            title:'Payment',
            text: ' Successfully Paid ✅',
            icon:'success',
        });
      axios.post('/store-payment', {
        amount,
        payment_id: result.paymentIntent.id,
        email: localStorage.getItem('email') || 'unknown@example.com'
      });
      setTimeout(()=>{
        navigate(`/schedule/${coach_record}`);
      },2000);
    }
  };


  const elementStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#635bff] tracking-wide">
            stripe
        </h1>

        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Secure Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <div className="border rounded-md p-2 shadow-sm">
              <CardNumberElement options={elementStyle} />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <div className="border rounded-md p-2 shadow-sm">
                <CardExpiryElement options={elementStyle} />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">CVC</label>
              <div className="border rounded-md p-2 shadow-sm">
                <CardCvcElement options={elementStyle} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
          >
            Pay ${amount}
          </button>
        </form>
      </div>
    </div>
  );
};

const StripePaymentForm = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripePaymentForm;
