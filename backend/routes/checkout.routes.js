import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import { checkout, finalizePaymentandCreateOrder, getCheckout, successPayment } from "../controllers/checkout.controller.js";

const router = express.Router();

//@route POST api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protectRoute, checkout);

//@route PUT api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protectRoute, successPayment);

//@route POST api/checkout/:id/finalize
// @desc Finalize the checkout and create an order after successful payment
// @access Private  
router.post("/:id/finalize", protectRoute, finalizePaymentandCreateOrder)

// @route get api/checkout
// @desc Get checkout details
// @access Private
router.get("/:id", protectRoute, getCheckout);

export default router