import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];


            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Invalid Token" });

            req.user = await User.findById(decoded.user.id).select("-password");

            next();
        } catch (error) {
            console.log("Token Verification failed:", error)
            res.status(401).json({ message: "Not authorized: Token Failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized: No Token Provided" });
    }
}

export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") next();
    else return res.status(403).json({ message: "Not authorized: Not Admin" });
}