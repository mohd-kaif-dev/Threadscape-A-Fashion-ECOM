import mongoose from "mongoose";
import Product from "./product.model.js";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String,
    image: String,
    color: String,
    price: Number,
    size: String,
    quantity: {
        type: Number,
        default: 1,
    }
}, { _id: false })

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: String,
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;