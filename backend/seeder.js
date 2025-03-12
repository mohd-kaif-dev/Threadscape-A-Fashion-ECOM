import mongoose from "mongoose";

import dotenv from "dotenv";

import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Cart from "./models/cart.model.js"

import { products } from "./data/ProductData.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
        // Clear Existing Data
        await User.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany();

        // Create a default Admin user
        const adminUser = await User.create({
            name: "Mohd Kaif",
            email: "MK@gmail.com",
            password: "123456",
            role: "admin",
        })

        const userID = adminUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }
        })
        await Product.insertMany(sampleProducts);
        console.log("Product Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`Error seeding Data :${error}`);
        process.exit(1);
    }
}

seedData();