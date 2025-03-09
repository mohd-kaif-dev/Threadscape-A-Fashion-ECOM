import express from "express"
import { stripe } from "../lib/stripe.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router()


// Endpoint to create a payment intent
router.post("/create-payment-intent", protectRoute, async (req, res) => {
  const { amount } = req.body; // Amount should be in the smallest unit of the currency

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd", // Change to your preferred currency
    });

    const confirmPaymentIntent = async () => {
      try {
        const clientSecret = paymentIntent.client_secret;
        const paymentIntentId =
          clientSecret.split("_")[0] + "_" + clientSecret.split("_")[1];
        const paymentIntent = await stripe.paymentIntents.confirm(
          paymentIntentId, // Replace with your Payment Intent ID
          {
            payment_method: "pm_card_visa", // Replace with a valid payment method ID
          }
        );
        console.log("Payment Intent confirmed:", paymentIntent);
      } catch (error) {
        console.error("Error confirming Payment Intent:", error.message);
      }
    };

    confirmPaymentIntent();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create-stripe-session", protectRoute, async (req, res) => {
  try {
    const { products, checkoutId } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
      totalAmount += amount * product.quantity;
      // console.log(product)
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });





    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/purchase-cancel`,
      metadata: {
        userId: req.user._id.toString(),
        checkoutId: checkoutId,
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });

  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "Error processing checkout", error: error.message });
  }
});





export default router

