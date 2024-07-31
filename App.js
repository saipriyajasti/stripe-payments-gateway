import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './App.css';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <h1>Stripe Checkout</h1>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default App;
