import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const StripeIntegration = ({ handlePaymentSuccess }) => {
  const { cart } = useSelector((state) => state.cart);

  const makePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-stripe-session`,
        {
          products: cart.products,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      const session = res.data;
      if (session) {
        console.log("Runs");
        handlePaymentSuccess({ transactionId: session.id });
      }
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      console.log("In the Stripe Integration: ", result);
      localStorage.setItem("Stripe", result);

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={makePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default StripeIntegration;
