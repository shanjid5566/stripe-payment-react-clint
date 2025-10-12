import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Create PaymentIntent on the server using axios POST
    axios
      .post("http://localhost:4000/create-payment-intent", {
        amount: 11099,
        currency: "usd",
      })
      .then((res) => {
        // Grab clientSecret for Elements initialization
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        // Show server error if something failed
        setError(err?.response?.data?.error || err.message);
        setLoading(false);
      });
  }, []);
  if (!clientSecret) return <div>Loading…</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: "stripe" },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default App;
