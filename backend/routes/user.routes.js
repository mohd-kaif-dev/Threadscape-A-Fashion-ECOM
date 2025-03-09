import express from "express";

import { register, login, logout, profile } from "../controllers/user.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

// @route POST /api/users/login
// @desc Login user
// @access Public
router.post("/login", login);

//@route POST /api/users/logout
// @desc Logout user
// @access Public
router.post("/logout", logout);

//@route GET /api/users/profile
// @desc Get Logged In user's profile
// @access Private
router.get("/profile", protectRoute, profile);
export default router;