import express from "express";
import Subscriber from "../models/subscriber.model.js";

const router = express.Router();

//@route POST /api/subscribe
// @desc Subscribe to newsletter
// @access Public
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        // Check if the email is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) return res.status(400).json({ message: "Email is already subscribed" });

        // Create a new Subscriber
        const subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({ message: "Subscribed to newsletter successfully" });

    } catch (error) {
        console.error("Error in subscribe controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export default router;