// import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useState,useEffect} from 'react';

import CheckoutForm from "../../components/CheckoutForm";
import { ICartItem } from "@/types/page";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51N8e0eC0f4jOdq5ipAJGyM4FpwGfEltScI1jWf0UbnJNjIjr7FFUPtTFuhAM2OqExHxPwiKQvinRif6aiOPCGVUY00BkPCKZQn');
interface IPropType{
    cart:ICartItem[];
  }
export default  function App({cart}:IPropType) {
  const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{cart}] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  
  console.log(clientSecret);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret:'sk_test_51N8e0eC0f4jOdq5iAFKKwzuYeDS6Asp2LxcjCdX51K2WhfWhb47Jl5N8942Y7iJWve4NEUbv',
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}