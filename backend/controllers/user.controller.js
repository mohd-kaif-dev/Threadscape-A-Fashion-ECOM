import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };
        // Sign and return the token along with user data
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) throw err;

                // Send the user and token in response
                res.status(200).json({
                    message: "User logged in successfully",
                    user: {
                        ...user._doc,
                        password: undefined
                    },
                    token
                });
            })

    } catch (error) {
        console.log("Error in Login Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({
            name,
            email,
            password
        })

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };
        // Sign and return the token along with user data
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) throw err;

                // Send the user and token in response
                res.status(201).json({
                    message: "User Registerd successfully",
                    user: {
                        ...user._doc,
                        password: undefined
                    },
                    token
                });
            })
        await user.save();

    } catch (error) {
        console.log("Error in Register Controller", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    console.log("Logout")
}

export const profile = async (req, res) => {
    res.json(req.user);
}