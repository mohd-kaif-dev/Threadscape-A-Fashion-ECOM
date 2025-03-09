import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const StripeIntegration = ({ handlePaymentSuccess }) => {
  const { cart } = useSelector((state) => state.cart);

  const makePayment = async () => {
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
      handlePaymentSuccess({ transactionId: session.id });
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  const onStripeSuccess = async (result) => {
    if (result.error) {
      console.error("Error:", result.error);
    } else {
      handlePaymentSuccess({ transactionId: result.sessionId });
    }
  };

  return (
    <div className="mt-5">
      <button
        type="submit"
        onClick={makePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pay with Stripe
      </button>
      <script src="https://js.stripe.com/v3/" onLoad={onStripeSuccess}></script>
    </div>
  );
};

export default StripeIntegration;
