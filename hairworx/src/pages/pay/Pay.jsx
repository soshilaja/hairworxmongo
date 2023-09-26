import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from 'react-router-dom'
import './Pay.scss'
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe(
  "pk_test_51NXgjXFYcko1E9Vaw4TGXPwbIpx5lXGsRBtthqaNN5322YEIjz5qDcj4oeHv5vzRR62ppuRnUgbz3j8yYOnFIcC900S00hzxUE"
);

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");

    const {id} = useParams();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
       const makeRequest = async () => {
        try {
            const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
            setClientSecret(res.data.clientSecret);
        } catch (error) {
            return error;
        } 
       };
         makeRequest();
        }   
    , []);

    const appearance = {
      theme: "stripe",
    };
    const options = {
      clientSecret,
      appearance,
    };
    
  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Pay