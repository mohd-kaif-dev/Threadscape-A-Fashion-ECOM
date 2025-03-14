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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://threadscape-kai.vercel.app'); // Allow only the production frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If cookies or credentials are used
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});


// app.use(cors({ origin: [process.env.FRONTEND_URL, 'https://threadscape-kai.vercel.app', 'http://localhost:5173'], credentials: true }));
const allowedOrigins = [
    'http://192.168.98.98:5173',
    'https://threadscape-kai.vercel.app',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
];



app.options('*', cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            console.log("origin", origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));


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