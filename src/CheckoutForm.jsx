import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  return (
    <div className="max-w-7xl mx-auto">
      <form>
        <PaymentElement />
        <button type="submit" >
          {loading ? "Processing…" : "Pay $10.99"}
        </button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
