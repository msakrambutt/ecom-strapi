// import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useState,useEffect} from 'react';
import { ICartItem } from "@/types/page";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe('pk_test_51N8e0eC0f4jOdq5ipAJGyM4FpwGfEltScI1jWf0UbnJNjIjr7FFUPtTFuhAM2OqExHxPwiKQvinRif6aiOPCGVUY00BkPCKZQn');
interface IPropType{
    cart:ICartItem[];
  }
export default  function App({cart}:IPropType) {
 

  return (
    <div className="App">
      
    </div>
  );
}