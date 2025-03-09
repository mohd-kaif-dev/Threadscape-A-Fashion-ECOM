import Checkout from "../models/checkout.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    if (!checkoutItems || checkoutItems.length === 0) return res.status(400).json({ message: "No checkout items provided" });

    try {
        // Create a checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false
        });
        // console.log(`Checkout created for user: ${req.user._id}`);

        res.status(200).json(newCheckout);
    } catch (error) {
        console.error("Error in checkout controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export const successPayment = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) return res.status(404).json({ message: "Checkout not found" });

        if (paymentStatus.toLowerCase() === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();

            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" })
        }

    } catch (error) {
        console.error("Error in successPayment controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const finalizePaymentandCreateOrder = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) return res.status(404).json({ message: "Checkout not found" });

        if (checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,

            });

            // Update checkout to mark as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete cart items
            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout is already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid yet" });
        }
    } catch (error) {
        console.log("Error in finalizePaymentandCreateOrder controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

