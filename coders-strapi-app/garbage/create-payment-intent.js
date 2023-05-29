// This is your test secret API key.
const stripe = require("stripe")('sk_test_51N8e0eC0f4jOdq5iAFKKwzuYeDS6Asp2LxcjCdX51K2WhfWhb47Jl5N8942Y7iJWve4NEUbvhD6dhdH0vGY7olcU0029apL6NT');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the 
  
  return 1000;
};

export default async function handler(req, res) {
  const { items} = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};