import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";

import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import checkoutRoutes from "./routes/checkout.routes.js"
import orderRoutes from "./routes/order.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import subscribeRoutes from "./routes/subscriber.routes.js"

import paymentRoutes from "./routes/payment.routes.js"

import analyticsRoutes from "./routes/analytics.routes.js"

import adminRoutes from "./routes/admin.routes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;


app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/subscribe", subscribeRoutes)


// Analytics Route
app.use("/api/admin/analytics", analyticsRoutes)

// ADMIN ROUTES
app.use("/api/admin", adminRoutes)

// PAYMENT ROUTE
app.use("/api/payment", paymentRoutes)



app.get("/", (req, res) => {
    res.send("Welcome to ThreadScape API!");
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB();
});