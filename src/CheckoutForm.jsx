import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements()



    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message || "Validation error");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success",
      },
    });

    if (error) setMessage(error.message || "Payment failed");
    setLoading(false);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" className="bg-green-300 px-4 py-2 mt-3" disabled={!stripe || loading}>
          {loading ? "Processing…" : "Pay $10.99"}
        </button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
