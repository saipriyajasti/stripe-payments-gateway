import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        const { data } = await axios.post('YOUR_SERVER_ENDPOINT', {
          id: paymentMethod.id,
          amount: 1000, // example amount in cents
        });

        if (data.success) {
          setSuccess(true);
        }
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
