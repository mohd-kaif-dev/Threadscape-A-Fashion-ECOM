import express from "express";
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import { protectRoute } from "../middlewares/protectRoute.js"
import { addProduct, deleteProduct, getProducts, mergeCarts, updateProduct } from "../controllers/cart.controller.js";

const router = express.Router();

//@route POST api/cart
//@desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", addProduct)

//@route PUT api/cart
//@desc Update a product in the cart for a guest or logged in user
// @access Public
router.put("/", updateProduct)

//@route DELETE api/cart
// @desc Delete a product from the cart for a guest or logged in user
// @access Public
router.delete("/", deleteProduct)

//@router GET api/cart
// @desc Get the cart for a guest or logged in user
// @access Public
router.get("/", getProducts)

//@route POST api/cart/merge
// @desc Merge the guest cart with the logged in user cart
// @access Private
router.post("/merge", protectRoute, mergeCarts)
export default router;