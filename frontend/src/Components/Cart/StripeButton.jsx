// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// Load Stripe (replace 'your_publishable_key' with your Stripe publishable key)

const StripeButton = ({ amount, handleSuccessPayment }) => {
  const navigate = useNavigate();
  // const stripe = useStripe();
  // const elements = useElements();
  const makePayment = async () => {
    // if (!stripe || !elements) {
    //   console.error("Stripe.js has not loaded yet.");
    //   return;
    // }

    // const cardElement = elements.getElement("card");

    // if (!cardElement) {
    //   console.error("CardElement not found!");
    //   return;
    // }

    // try {
    //   // Call your backend to create a payment intent
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-payment-intent`,
    //     { amount },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    //       },
    //     }
    //   );
    //   console.log(response);

    //   const { clientSecret } = await response.data;

    //   // Create a payment method
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: {
    //       name: "John Doe", // Replace with the customer's name
    //     },
    //   });

    //   if (error) {
    //     console.error("Error creating payment method:", error.message);
    //   } else {
    //     console.log("Payment method created:", paymentMethod.id);
    //   }

    //   // Confirm the payment
    //   const result = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: cardElement, // Replace with your card element
    //       billing_details: {
    //         name: "John Doe", // Replace with the customer's name
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     // Handle payment error
    //     console.error(result.error);
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       // Handle payment success and navigate
    //       handlePaymentSuccess();
    //       navigate("/order-confirmation"); // Redirect to order-confirmation page
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    console.log(amount);
    handleSuccessPayment({
      transaction_id: Math.random().toString(36).slice(2),
    });
    navigate("/order-confirmation");
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
    </div>
  );
};

export default StripeButton;
