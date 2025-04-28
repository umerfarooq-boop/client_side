import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements
} from '@stripe/react-stripe-js';
import axios from '../axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51RCqM3FLwCatna2izHIeLWR95qU6VrL1TilF3Z5ElVzvmpohx5GbYxor6BgfgIa0dF7GGiBHtI9vjjRn6Kw7Ocv700P9Gb6P4h');

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();

  const coach_userid = localStorage.getItem('coach_userid');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email') || 'unknown@example.com';
  const coach_record = localStorage.getItem('coach_record');
  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/create-payment-intent', {
          amount: amount * 100,
          coach_id: coach_userid, // ensure this is the coach ID
      });
      
          setClientSecret(response.data.clientSecret);
      } catch (error) {
          console.error('Error fetching client secret:', error);
      }
  };
  
    fetchClientSecret();
  }, [amount, coach_userid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
  
    const card = elements.getElement(CardNumberElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name,
        email,
      },
    });
  
    if (error) {
      Swal.fire('Payment Error', error.message, 'error');
      return;
    }
  
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });
  
    if (confirmError) {
      Swal.fire('Payment Confirmation Failed', confirmError.message, 'error');
      return;
    }
  
    if (paymentIntent.status === 'succeeded') {
      Swal.fire('Payment Successful', 'Your payment has been processed successfully!', 'success');
      try {
        await axios.post('http://localhost:8000/api/store-payment', {
          amount: amount,
          payment_id: paymentIntent.id,
          email: email,
          coach_id: coach_userid,
          user_id: user_id
        });
        // setTimeout(() => navigate(`/schedule/${coach_record}`), 2000);
      } catch (error) {
        console.error('Error storing payment info:', error);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#635bff] tracking-wide">stripe</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Secure Payment</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded bg-white space-y-4">
          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <CardNumberElement className="p-2 border rounded w-full" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Expiry</label>
              <CardExpiryElement className="p-2 border rounded w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">CVC</label>
              <CardCvcElement className="p-2 border rounded w-full" />
            </div>
          </div>
          <button type="submit" disabled={!stripe || !elements} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
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