import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js"
import { getOrderDetails, myOrders } from "../controllers/order.controller.js"

const router = express.Router();

//@route GET api/orders/my-orders
// @desc Get logged in user's orders
// @access Private
router.get("/my-orders", protectRoute, myOrders)

//@route GET api/orders/:id
// @desc Get order by id
// @access Private
router.get("/:id", protectRoute, getOrderDetails)
export default router