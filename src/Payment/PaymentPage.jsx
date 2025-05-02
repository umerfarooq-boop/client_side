import React from 'react';
import { useLocation } from 'react-router-dom';
import StripePaymentForm from './StripePaymentForm';

const PaymentPage = () => {
  const location = useLocation();
  const amount = location.state?.amount;

  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-6">Payment</h2>
      {amount ? <StripePaymentForm amount={amount} /> : <p>No amount to pay.</p>}
    </div>
  );
};

export default PaymentPage;
